import React, { useState, useEffect } from "react";
import "../components/LimitsSettings.css";
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Grid,
  CircularProgress,
  Typography,
  Box,
  Card,
  CardContent,
  Divider,
  IconButton,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { useAuth } from "../contexts/AuthContext";
import { settings, brokers } from "../lib/supabase";

function LimitsSettings({ userSettings, updateUserSettings, setError, setSuccess }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [limits, setLimits] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentLimit, setCurrentLimit] = useState({
    group_name: "",
    contribution_year: new Date().getFullYear(),
    limit_amount: "",
    assigned_accounts: [],
    contribution_amount: 0,
  });
  const [selectedAccountId, setSelectedAccountId] = useState("");

  useEffect(() => {
    fetchData();
  }, [user]);

  const fetchData = async () => {
    if (!user) return;

    setLoading(true);
    try {
      // Fetch user settings first to get any saved limits
      const { data: settingsData, error: settingsError } = await settings.getSettings(user.id);
      if (settingsError) throw settingsError;

      // Fetch accounts
      const { data: accountsData, error: accountsError } = await brokers.getBrokers(user.id);
      if (accountsError) throw accountsError;

      setAccounts(accountsData || []);

      // Extract limits from settings
      if (settingsData?.notification_preferences?.contribution_limits) {
        setLimits(settingsData.notification_preferences.contribution_limits);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load contribution limits. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = (limit = null) => {
    if (limit) {
      setCurrentLimit({
        ...limit,
        contribution_year: limit.contribution_year || new Date().getFullYear(),
        assigned_accounts: limit.assigned_accounts || [],
      });
      setEditMode(true);
    } else {
      setCurrentLimit({
        group_name: "",
        contribution_year: new Date().getFullYear(),
        limit_amount: "",
        assigned_accounts: [],
        contribution_amount: 0,
      });
      setEditMode(false);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedAccountId("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "limit_amount" && value && isNaN(parseFloat(value))) {
      return; // Allow only numbers for limit amount
    }
    setCurrentLimit({
      ...currentLimit,
      [name]: value,
    });
  };

  const handleAddAssignedAccount = () => {
    if (!selectedAccountId) return;
    
    // Check if account is already assigned
    if (currentLimit.assigned_accounts.includes(selectedAccountId)) {
      setError("This account is already assigned to this limit");
      return;
    }
    
    setCurrentLimit({
      ...currentLimit,
      assigned_accounts: [...currentLimit.assigned_accounts, selectedAccountId],
    });
    setSelectedAccountId("");
  };

  const handleRemoveAssignedAccount = (accountId) => {
    setCurrentLimit({
      ...currentLimit,
      assigned_accounts: currentLimit.assigned_accounts.filter(id => id !== accountId),
    });
  };

  const saveLimit = async () => {
    if (!currentLimit.group_name || !currentLimit.limit_amount) {
      setError("Group name and limit amount are required");
      return;
    }

    setSaving(true);
    try {
      let updatedLimits = [...limits];
      
      if (editMode) {
        const index = limits.findIndex(l => l.group_name === currentLimit.group_name);
        if (index >= 0) {
          updatedLimits[index] = currentLimit;
        }
      } else {
        // Check for duplicate group name
        if (limits.some(l => l.group_name === currentLimit.group_name)) {
          setError("A limit with this group name already exists");
          setSaving(false);
          return;
        }
        updatedLimits.push(currentLimit);
      }
      
      // Update in Supabase
      const updatedPreferences = {
        ...userSettings.notification_preferences,
        contribution_limits: updatedLimits,
      };
      
      const { error } = await settings.updateSettings(user.id, {
        notification_preferences: updatedPreferences,
      });
      
      if (error) throw error;
      
      // Update local state
      setLimits(updatedLimits);
      updateUserSettings({
        notification_preferences: updatedPreferences,
      });
      
      setSuccess(editMode ? "Limit updated successfully" : "Limit added successfully");
      handleClose();
    } catch (err) {
      console.error("Error saving limit:", err);
      setError("Failed to save contribution limit");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteLimit = async (groupName) => {
    if (!window.confirm("Are you sure you want to delete this contribution limit?")) return;
    
    try {
      const updatedLimits = limits.filter(l => l.group_name !== groupName);
      
      // Update in Supabase
      const updatedPreferences = {
        ...userSettings.notification_preferences,
        contribution_limits: updatedLimits,
      };
      
      const { error } = await settings.updateSettings(user.id, {
        notification_preferences: updatedPreferences,
      });
      
      if (error) throw error;
      
      // Update local state
      setLimits(updatedLimits);
      updateUserSettings({
        notification_preferences: updatedPreferences,
      });
      
      setSuccess("Limit deleted successfully");
    } catch (err) {
      console.error("Error deleting limit:", err);
      setError("Failed to delete contribution limit");
    }
  };

  const renderLimits = () => {
    const currentYear = new Date().getFullYear();
    const currentYearLimits = limits.filter(limit => limit.contribution_year === currentYear);
    
    if (currentYearLimits.length === 0) {
      return (
        <Typography variant="body1" color="textSecondary" align="center" sx={{ my: 4 }}>
          No contribution limits set for the current year.
        </Typography>
      );
    }
    
    return (
      <div className="limits-container">
        <Typography variant="h6" gutterBottom>
          Current Year ({currentYear})
        </Typography>
        
        <Grid container spacing={3}>
          {currentYearLimits.map((limit) => {
            // Calculate progress percentage
            const contribution = parseFloat(limit.contribution_amount || 0);
            const limitAmount = parseFloat(limit.limit_amount);
            const percentage = limitAmount ? Math.min(100, (contribution / limitAmount) * 100) : 0;
            
            return (
              <Grid item xs={12} md={6} key={limit.group_name}>
                <Card className="limit-card">
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography variant="h6">{limit.group_name}</Typography>
                      <Box>
                        <IconButton size="small" onClick={() => handleOpen(limit)}>
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" onClick={() => handleDeleteLimit(limit.group_name)}>
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                    
                    <Divider sx={{ my: 1 }} />
                    
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                      <div>
                        <Typography variant="body2">
                          <strong>Your Limit:</strong> ${parseFloat(limit.limit_amount).toFixed(2)}
                        </Typography>
                        <Typography variant="body2" color={contribution > 0 ? "primary" : "textSecondary"}>
                          <strong>Contributed:</strong> ${contribution.toFixed(2)}
                        </Typography>
                      </div>
                      
                      <Box position="relative" display="inline-flex">
                        <div className="progress-circle">
                          <div className="progress-circle-inner" style={{ 
                            background: `conic-gradient(
                              #1976d2 ${percentage * 3.6}deg, 
                              #e0e0e0 ${percentage * 3.6}deg
                            )`
                          }}>
                            <div className="progress-circle-content">
                              {percentage.toFixed(0)}%
                            </div>
                          </div>
                        </div>
                      </Box>
                    </Box>
                    
                    {limit.assigned_accounts && limit.assigned_accounts.length > 0 ? (
                      <div>
                        <Typography variant="subtitle2" gutterBottom>
                          Assigned Accounts:
                        </Typography>
                        <Box className="account-chips">
                          {limit.assigned_accounts.map(accountId => {
                            const account = accounts.find(a => a.id === accountId);
                            return account ? (
                              <span key={accountId} className="account-chip">
                                {account.name}
                              </span>
                            ) : null;
                          })}
                        </Box>
                      </div>
                    ) : (
                      <Typography variant="body2" color="textSecondary">
                        No accounts assigned
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
  };

  return (
    <div className="limits-settings">
      <div className="limits-header">
        <h2>Contribution Limits</h2>
        <p>Manage your contribution limits on your portfolio.</p>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<span>+</span>}
          onClick={() => handleOpen()}
        >
          Add Contribution Limit
        </Button>
      </div>

      {loading ? (
        <Box display="flex" justifyContent="center" py={4}>
          <CircularProgress />
        </Box>
      ) : (
        renderLimits()
      )}

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          {editMode ? "Edit Contribution Limit" : "Add Contribution Limit"}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={8}>
              <TextField
                name="group_name"
                label="Group Name"
                value={currentLimit.group_name}
                onChange={handleChange}
                fullWidth
                required
                disabled={editMode} // Don't allow changing the group name in edit mode to maintain unique identifiers
              />
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <TextField
                name="contribution_year"
                label="Contribution Year"
                type="number"
                value={currentLimit.contribution_year}
                onChange={handleChange}
                fullWidth
                required
                inputProps={{ min: 2000, max: 2100 }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                name="limit_amount"
                label="Limit Amount ($)"
                value={currentLimit.limit_amount}
                onChange={handleChange}
                fullWidth
                required
                inputProps={{ min: 0, step: "0.01" }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Divider sx={{ my: 1 }} />
              <Typography variant="subtitle1" gutterBottom>
                Assign Accounts to This Limit
              </Typography>
            </Grid>
            
            {accounts.length === 0 ? (
              <Grid item xs={12}>
                <Typography variant="body2" color="textSecondary">
                  No accounts available. Please add accounts first.
                </Typography>
              </Grid>
            ) : (
              <>
                <Grid item xs={9}>
                  <FormControl fullWidth>
                    <InputLabel>Select Account</InputLabel>
                    <Select
                      value={selectedAccountId}
                      onChange={(e) => setSelectedAccountId(e.target.value)}
                      label="Select Account"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {accounts
                        .filter(account => !currentLimit.assigned_accounts.includes(account.id))
                        .map(account => (
                          <MenuItem key={account.id} value={account.id}>
                            {account.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={3}>
                  <Button
                    variant="outlined"
                    onClick={handleAddAssignedAccount}
                    fullWidth
                    sx={{ height: '100%' }}
                    disabled={!selectedAccountId}
                  >
                    Assign
                  </Button>
                </Grid>
                
                {currentLimit.assigned_accounts.length > 0 && (
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" gutterBottom>
                      Assigned Accounts:
                    </Typography>
                    <Box className="assigned-accounts-list">
                      {currentLimit.assigned_accounts.map(accountId => {
                        const account = accounts.find(a => a.id === accountId);
                        return account ? (
                          <div key={accountId} className="assigned-account-item">
                            <span>{account.name}</span>
                            <IconButton 
                              size="small" 
                              onClick={() => handleRemoveAssignedAccount(accountId)}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </div>
                        ) : null;
                      })}
                    </Box>
                  </Grid>
                )}
              </>
            )}
            
            {editMode && (
              <Grid item xs={12}>
                <Divider sx={{ my: 1 }} />
                <Typography variant="subtitle1" gutterBottom>
                  Track Contributions
                </Typography>
                <TextField
                  name="contribution_amount"
                  label="Current Contribution Amount ($)"
                  type="number"
                  value={currentLimit.contribution_amount || 0}
                  onChange={handleChange}
                  fullWidth
                  inputProps={{ min: 0, step: "0.01" }}
                />
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button 
            onClick={saveLimit} 
            variant="contained" 
            color="primary"
            disabled={saving}
          >
            {saving ? "Saving..." : editMode ? "Update Limit" : "Add Limit"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default LimitsSettings;
