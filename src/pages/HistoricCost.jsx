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
  Tooltip
} from "@mui/material";
import { ArrowBack, Download } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import * as XLSX from "xlsx";

const HistoricCost = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    const fetchHistoricCost = async () => {
      setLoading(true);
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) {
        console.error("User not authenticated:", authError);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("activities")
        .select(`*, securities:security_id (symbol)`)
        .eq("user_id", user.id)
        .eq("type", "Buy");

      if (error) {
        console.error("Supabase fetch error:", error);
        setLoading(false);
        return;
      }

      const grouped = {};

      data.forEach((row) => {
        const symbol = row.securities?.symbol || row.security_id;
        const qty = row.quantity || 0;
        const price = row.price || 0;
        const fees = row.fees || 0;
        const cost = qty * price + fees;

        if (!grouped[symbol]) {
          grouped[symbol] = {
            symbol,
            allocation: "FIFO",
            openingBalance: 0,
            openingQty: 0,
            openingMarketValue: 0,
            purchases: 0,
          };
        }

        grouped[symbol].openingBalance += cost;
        grouped[symbol].openingQty += qty;
        grouped[symbol].purchases += cost;
      });

      setRows(Object.values(grouped));
      setLoading(false);
    };

    fetchHistoricCost();
  }, []);

  const totalOpening = rows.reduce((sum, r) => sum + r.openingBalance, 0);
  const totalQty = rows.reduce((sum, r) => sum + r.openingQty, 0);
  const totalPurchases = rows.reduce((sum, r) => sum + r.purchases, 0);

  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "HistoricCost");
    XLSX.writeFile(workbook, "historic_cost_report.xlsx");
  };

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={() => navigate("/reports")}
          sx={{ mr: 2 }}
        >
          Back to Reports
        </Button>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Historic Cost
        </Typography>
        <Tooltip title="Download as XLSX">
          <IconButton
            onClick={handleExport}
            sx={{ ml: "auto", backgroundColor: "#90caf9", color: "white", borderRadius: "50%", width: 40, height: 40 }}
          >
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
                  <TableCell>ASX</TableCell>
                  <TableCell align="center">Allocation Method</TableCell>
                  <TableCell align="right">Opening Balance</TableCell>
                  <TableCell align="right">Opening Market Value</TableCell>
                  <TableCell align="right">Opening Quantity</TableCell>
                  <TableCell align="right">Purchases</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No historic cost data found.
                    </TableCell>
                  </TableRow>
                ) : (
                  rows.map((r, i) => (
                    <TableRow key={i} hover>
                      <TableCell>{r.symbol}</TableCell>
                      <TableCell align="center">{r.allocation}</TableCell>
                      <TableCell align="right">${r.openingBalance.toFixed(2)}</TableCell>
                      <TableCell align="right">$0.00</TableCell>
                      <TableCell align="right">{r.openingQty}</TableCell>
                      <TableCell align="right">${r.purchases.toFixed(2)}</TableCell>
                    </TableRow>
                  ))
                )}

                {rows.length > 0 && (
                  <>
                    <TableRow
                      sx={(theme) => ({
                        backgroundColor: theme.palette.mode === "dark" ? "#151515" : "#f5f5f5",
                      })}
                    >
                      <TableCell><b>Total</b></TableCell>
                      <TableCell />
                      <TableCell align="right"><b>${totalOpening.toFixed(2)}</b></TableCell>
                      <TableCell align="right">$0.00</TableCell>
                      <TableCell align="right"><b>{totalQty}</b></TableCell>
                      <TableCell align="right"><b>${totalPurchases.toFixed(2)}</b></TableCell>
                    </TableRow>
                    <TableRow
                      sx={(theme) => ({
                        backgroundColor: theme.palette.mode === "dark" ? "#1f1f1f" : "#e0e0e0",
                      })}
                    >
                      <TableCell><b>Grand Total</b></TableCell>
                      <TableCell />
                      <TableCell align="right"><b>${totalOpening.toFixed(2)}</b></TableCell>
                      <TableCell align="right">$0.00</TableCell>
                      <TableCell align="right"><b>{totalQty}</b></TableCell>
                      <TableCell align="right" sx={{ color: "lightgreen", fontWeight: 600 }}>
                        ${totalPurchases.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  </>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </Box>
  );
};

export default HistoricCost;
