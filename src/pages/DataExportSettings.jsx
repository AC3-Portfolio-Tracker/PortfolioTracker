import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Typography,
  Box,
  Paper,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  CircularProgress,
  Divider,
} from "@mui/material";
import { 
  FileDownload as FileDownloadIcon,
  TableChart as TableIcon,
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
  Timeline as TimelineIcon
} from "@mui/icons-material";
import { useAuth } from "../contexts/AuthContext";
import { 
  holdings as holdingsAPI, 
  activities as activitiesAPI, 
  brokers as brokersAPI, 
  settings as settingsAPI 
} from "../lib/supabase";

function DataExportSettings({ userSettings, setError, setSuccess }) {
  const { user } = useAuth();
  const [selectedExports, setSelectedExports] = useState({
    accounts: true,
    activities: true,
    holdings: true,
    goals: false,
    snapshots: false,
  });
  const [exportFormat, setExportFormat] = useState("json");
  const [loading, setLoading] = useState(false);

  const handleExportTypeChange = (event) => {
    setSelectedExports({
      ...selectedExports,
      [event.target.name]: event.target.checked,
    });
  };

  const handleFormatChange = (event) => {
    setExportFormat(event.target.value);
  };

  const prepareExportData = async () => {
    const exportData = {};
    
    try {
      // Fetch accounts (brokers)
      if (selectedExports.accounts) {
        const { data: accountsData, error: accountsError } = await brokersAPI.getBrokers(user.id);
        if (accountsError) throw accountsError;
        exportData.accounts = accountsData;
      }
      
      // Fetch activities
      if (selectedExports.activities) {
        const { data: activitiesData, error: activitiesError } = await activitiesAPI.getActivities(user.id);
        if (activitiesError) throw activitiesError;
        exportData.activities = activitiesData;
      }
      
      // Fetch holdings
      if (selectedExports.holdings) {
        const { data: holdingsData, error: holdingsError } = await holdingsAPI.getHoldings(user.id);
        if (holdingsError) throw holdingsError;
        exportData.holdings = holdingsData;
      }
      
      // Fetch goals from settings
      if (selectedExports.goals) {
        const { data: settingsData, error: settingsError } = await settingsAPI.getSettings(user.id);
        if (settingsError) throw settingsError;
        
        exportData.goals = settingsData?.notification_preferences?.investment_goals || [];
      }
      
      // Fetch portfolio snapshots
      if (selectedExports.snapshots) {
        const { data: settingsData, error: settingsError } = await settingsAPI.getSettings(user.id);
        if (settingsError) throw settingsError;
        
        // This is a placeholder - in a real app, you'd fetch from portfolio_snapshots table
        exportData.snapshots = [];
      }
      
      return exportData;
    } catch (error) {
      throw error;
    }
  };

  const handleExport = async () => {
    if (!Object.values(selectedExports).some(Boolean)) {
      setError("Please select at least one data type to export");
      return;
    }
    
    setLoading(true);
    try {
      const exportData = await prepareExportData();
      
      // Convert to selected format
      let dataStr, fileExt, contentType;
      
      switch (exportFormat) {
        case "json":
          dataStr = JSON.stringify(exportData, null, 2);
          fileExt = "json";
          contentType = "application/json";
          break;
        case "csv":
          // This is a simple implementation - for a real app, 
          // you'd want a more sophisticated CSV conversion logic
          dataStr = convertToCSV(exportData);
          fileExt = "csv";
          contentType = "text/csv";
          break;
        case "sql":
          dataStr = convertToSQL(exportData);
          fileExt = "sql";
          contentType = "application/sql";
          break;
        default:
          dataStr = JSON.stringify(exportData, null, 2);
          fileExt = "json";
          contentType = "application/json";
      }
      
      // Create and download the file
      const dataBlob = new Blob([dataStr], { type: contentType });
      const url = window.URL.createObjectURL(dataBlob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `portfolio_export_${new Date().toISOString().slice(0,10)}.${fileExt}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      setSuccess("Data exported successfully");
    } catch (err) {
      console.error("Error exporting data:", err);
      setError("Failed to export data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const convertToCSV = (data) => {
    const csvParts = [];
    
    // For each data type, convert to CSV
    Object.entries(data).forEach(([key, records]) => {
      if (!records || records.length === 0) return;
      
      // Add section header
      csvParts.push(`\n# ${key.toUpperCase()}\n`);
      
      // Get headers from first record
      const headers = Object.keys(records[0]);
      csvParts.push(headers.join(",") + "\n");
      
      // Add data rows
      records.forEach(record => {
        const row = headers.map(header => {
          const value = record[header];
          // Handle nested objects, arrays, and complex values
          if (typeof value === 'object' && value !== null) {
            return `"${JSON.stringify(value).replace(/"/g, '""')}"`;
          }
          // Handle strings with commas
          if (typeof value === 'string' && value.includes(',')) {
            return `"${value}"`;
          }
          return value ?? '';
        }).join(",");
        csvParts.push(row + "\n");
      });
    });
    
    return csvParts.join("");
  };

  const convertToSQL = (data) => {
    const sqlParts = [];
    
    // Add header comment
    sqlParts.push(`-- Portfolio Tracker Export\n-- Generated: ${new Date().toISOString()}\n\n`);
    
    // For each data type, generate INSERT statements
    Object.entries(data).forEach(([tableName, records]) => {
      if (!records || records.length === 0) return;
      
      // Add section header
      sqlParts.push(`-- ${tableName.toUpperCase()} Table\n`);
      
      records.forEach(record => {
        const columns = Object.keys(record);
        const values = Object.values(record).map(value => {
          if (value === null || value === undefined) return 'NULL';
          if (typeof value === 'string') return `'${value.replace(/'/g, "''")}'`;
          if (typeof value === 'object') return `'${JSON.stringify(value).replace(/'/g, "''")}'`;
          return value;
        });
        
        sqlParts.push(`INSERT INTO ${tableName} (${columns.join(", ")}) VALUES (${values.join(", ")});\n`);
      });
      
      sqlParts.push("\n");
    });
    
    return sqlParts.join("");
  };

  const selectAll = () => {
    setSelectedExports({
      accounts: true,
      activities: true,
      holdings: true,
      goals: true,
      snapshots: true,
    });
  };

  const selectNone = () => {
    setSelectedExports({
      accounts: false,
      activities: false,
      holdings: false,
      goals: false,
      snapshots: false,
    });
  };

  return (
    <div className="data-export-settings">
      <div className="data-export-header">
        <h2>Data Export</h2>
        <p>Export your portfolio data in various formats.</p>
      </div>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Select Data to Export
            </Typography>
            
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Button size="small" onClick={selectAll}>Select All</Button>
              <Button size="small" onClick={selectNone}>Clear All</Button>
            </Box>
            
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={selectedExports.accounts} 
                    onChange={handleExportTypeChange} 
                    name="accounts" 
                  />
                }
                label={
                  <Box display="flex" alignItems="center">
                    <SettingsIcon fontSize="small" sx={{ mr: 1 }} />
                    <span>Accounts</span>
                  </Box>
                }
              />
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={selectedExports.holdings} 
                    onChange={handleExportTypeChange} 
                    name="holdings" 
                  />
                }
                label={
                  <Box display="flex" alignItems="center">
                    <TableIcon fontSize="small" sx={{ mr: 1 }} />
                    <span>Holdings</span>
                  </Box>
                }
              />
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={selectedExports.activities} 
                    onChange={handleExportTypeChange} 
                    name="activities" 
                  />
                }
                label={
                  <Box display="flex" alignItems="center">
                    <BarChartIcon fontSize="small" sx={{ mr: 1 }} />
                    <span>Activities</span>
                  </Box>
                }
              />
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={selectedExports.goals} 
                    onChange={handleExportTypeChange} 
                    name="goals" 
                  />
                }
                label={
                  <Box display="flex" alignItems="center">
                    <BarChartIcon fontSize="small" sx={{ mr: 1 }} />
                    <span>Goals</span>
                  </Box>
                }
              />
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={selectedExports.snapshots} 
                    onChange={handleExportTypeChange} 
                    name="snapshots" 
                  />
                }
                label={
                  <Box display="flex" alignItems="center">
                    <TimelineIcon fontSize="small" sx={{ mr: 1 }} />
                    <span>Portfolio History</span>
                  </Box>
                }
              />
            </FormGroup>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" gutterBottom>
              Export Settings
            </Typography>
            
            <Box>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Export Format</InputLabel>
                <Select
                  value={exportFormat}
                  onChange={handleFormatChange}
                  label="Export Format"
                >
                  <MenuItem value="json">JSON - Structured Data</MenuItem>
                  <MenuItem value="csv">CSV - Spreadsheet Compatible</MenuItem>
                  <MenuItem value="sql">SQL - Database Import Script</MenuItem>
                </Select>
              </FormControl>
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ mt: 'auto', textAlign: 'center' }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <FileDownloadIcon />}
                onClick={handleExport}
                disabled={loading || !Object.values(selectedExports).some(Boolean)}
                fullWidth
                sx={{ mt: 2 }}
              >
                {loading ? "Exporting..." : "Export Data"}
              </Button>
              
              <Typography variant="caption" display="block" sx={{ mt: 2, color: 'text.secondary' }}>
                Your data will be exported locally to your device.
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default DataExportSettings; 