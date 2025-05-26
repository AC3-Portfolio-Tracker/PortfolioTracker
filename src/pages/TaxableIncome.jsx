import React, { useEffect, useState } from "react";
import {
  Typography,
  CircularProgress,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  useTheme,
  IconButton,
  Tooltip,
} from "@mui/material";
import { ArrowBack, Download } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import * as XLSX from "xlsx";

const TaxableIncome = () => {
  const [incomeRows, setIncomeRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    const fetchDividendData = async () => {
      setLoading(true);
      const { data: userData } = await supabase.auth.getUser();
      const user = userData?.user;

      if (!user) {
        console.error("User not logged in.");
        return;
      }

      const { data, error } = await supabase
        .from("activities")
        .select(`
          id, date, total_amount, quantity, price, notes, security_id,
          securities (symbol)
        `)
        .eq("type", "Dividend")
        .eq("user_id", user.id);

      if (error) {
        console.error("Error fetching dividend data:", error);
        setLoading(false);
        return;
      }

      const formatted = data.map((row) => {
        const total = parseFloat(row.total_amount ?? row.quantity * row.price ?? 0);
        const franking = parseFloat(row.notes?.match(/\d+(\.\d+)?/)?.[0] ?? 0);
        return {
          holding: row.securities?.symbol || row.security_id,
          paidDate: new Date(row.date).toLocaleDateString("en-AU", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
          totalIncome: total,
          franked: total,
          unfranked: 0,
          withholdingTax: 0,
          frankingCredits: franking,
          grossIncome: total + franking,
        };
      });

      setIncomeRows(formatted);
      setLoading(false);
    };

    fetchDividendData();
  }, []);

  const total = (key) => incomeRows.reduce((sum, r) => sum + r[key], 0);

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(incomeRows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "TaxableIncome");
    XLSX.writeFile(workbook, "TaxableIncomeReport.xlsx");
  };

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={() => navigate("/reports")}
            sx={{ mr: 2 }}
          >
            Back to Reports
          </Button>
          <Typography variant="h4" component="h1" fontWeight="bold">
            Taxable Income
          </Typography>
        </Box>
        <Tooltip title="Download as XLSX">
          <IconButton onClick={exportToExcel}>
            <Download />
          </IconButton>
        </Tooltip>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Paper elevation={3}>
          <TableContainer sx={{ maxHeight: 600 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Holding</TableCell>
                  <TableCell>Paid Date</TableCell>
                  <TableCell align="right">Total Income</TableCell>
                  <TableCell align="right">Franked</TableCell>
                  <TableCell align="right">Unfranked</TableCell>
                  <TableCell align="right">Withholding Tax</TableCell>
                  <TableCell align="right">Franking Credits</TableCell>
                  <TableCell align="right">Gross Income</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {incomeRows.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} align="center">
                      No income data available
                    </TableCell>
                  </TableRow>
                ) : (
                  incomeRows.map((row, i) => (
                    <TableRow key={i} hover>
                      <TableCell>{row.holding}</TableCell>
                      <TableCell>{row.paidDate}</TableCell>
                      <TableCell align="right">${row.totalIncome.toFixed(2)}</TableCell>
                      <TableCell align="right">${row.franked.toFixed(2)}</TableCell>
                      <TableCell align="right">${row.unfranked.toFixed(2)}</TableCell>
                      <TableCell align="right">${row.withholdingTax.toFixed(2)}</TableCell>
                      <TableCell align="right">${row.frankingCredits.toFixed(2)}</TableCell>
                      <TableCell align="right" style={{ color: "lightgreen", fontWeight: 600 }}>
                        ${row.grossIncome.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))
                )}

                {incomeRows.length > 0 && (
                  <TableRow
                    sx={(theme) => ({
                      backgroundColor: theme.palette.mode === "dark" ? "#1f1f1f" : "#e0e0e0",
                    })}
                  >
                    <TableCell><b>Total</b></TableCell>
                    <TableCell />
                    <TableCell align="right"><b>${total("totalIncome").toFixed(2)}</b></TableCell>
                    <TableCell align="right"><b>${total("franked").toFixed(2)}</b></TableCell>
                    <TableCell align="right"><b>${total("unfranked").toFixed(2)}</b></TableCell>
                    <TableCell align="right"><b>${total("withholdingTax").toFixed(2)}</b></TableCell>
                    <TableCell align="right"><b>${total("frankingCredits").toFixed(2)}</b></TableCell>
                    <TableCell align="right" sx={{ color: "lightgreen", fontWeight: 600 }}>
                      ${total("grossIncome").toFixed(2)}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </Box>
  );
};

export default TaxableIncome;
