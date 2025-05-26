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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { supabase } from "../lib/supabase";

const AllTrades = () => {
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("All");

  useEffect(() => {
    const fetchTrades = async () => {
      setLoading(true);
      const { data: userData } = await supabase.auth.getUser();
      const user = userData?.user;

      if (!user) {
        alert("You must be logged in.");
        return;
      }

      const { data, error } = await supabase
        .from("activities")
        .select(`
          id, type, date, quantity, price, fees, total_amount, user_id,
          securities (
            symbol
          )
        `)
        .in("type", ["Buy", "Sell"])
        .eq("user_id", user.id)
        .order("date", { ascending: false });

      if (error) {
        console.error("Supabase fetch error:", error);
        setLoading(false);
        return;
      }

      const formatted = data.map((t) => {
        const qty = t.quantity;
        const value = t.total_amount || qty * t.price;
        return {
          symbol: t.securities?.symbol || "N/A",
          date: new Date(t.date).toLocaleDateString(),
          type: t.type,
          qty,
          price: t.price,
          brokerage: t.fees || 0,
          exchRate: "1.00 AUD/AUD",
          value,
        };
      });

      setTrades(formatted);
      setLoading(false);
    };

    fetchTrades();
  }, []);

  const filteredTrades =
    filterType === "All"
      ? trades
      : trades.filter((t) => t.type === filterType);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        All Trades
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <FormControl
            sx={{
              minWidth: 220,
              mb: 3,
              bgcolor: "#1e1e1e",
              color: "white",
              "& .MuiInputBase-root": {
                color: "white",
              },
              "& .MuiSvgIcon-root": {
                color: "white",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "& .MuiInputLabel-root": {
                color: "white",
              },
            }}
            size="small"
          >
            <InputLabel id="type-filter-label">Filter by Type</InputLabel>
            <Select
              labelId="type-filter-label"
              value={filterType}
              label="Filter by Type"
              onChange={(e) => setFilterType(e.target.value)}
            >
              <MenuItem value="All">All Transactions</MenuItem>
              <MenuItem value="Buy">Buy</MenuItem>
              <MenuItem value="Sell">Sell</MenuItem>
              
            </Select>
          </FormControl>

          <Paper elevation={3}>
            <TableContainer sx={{ maxHeight: 600 }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>ASX</TableCell>
                    <TableCell align="center">Date</TableCell>
                    <TableCell align="center">Type</TableCell>
                    <TableCell align="right">Qty</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Brokerage</TableCell>
                    <TableCell align="center">Exch. Rate</TableCell>
                    <TableCell align="right">Value</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredTrades.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} align="center">
                        No trades found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredTrades.map((t, i) => (
                      <TableRow key={i} hover>
                        <TableCell>{t.symbol}</TableCell>
                        <TableCell align="center">{t.date}</TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            color:
                              t.type === "Sell"
                                ? "error.main"
                                : t.type === "Buy"
                                ? "success.main"
                                : "warning.main",
                            fontWeight: 600,
                          }}
                        >
                          {t.type}
                        </TableCell>
                        <TableCell align="right">{t.qty}</TableCell>
                        <TableCell align="right">
                          ${t.price.toFixed(2)}
                        </TableCell>
                        <TableCell align="right">
                          ${t.brokerage.toFixed(2)}
                        </TableCell>
                        <TableCell align="center">{t.exchRate}</TableCell>
                        <TableCell
                          align="right"
                          sx={{
                            color: t.value < 0 ? "error.main" : "text.primary",
                          }}
                        >
                          ${t.value.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </>
      )}
    </Box>
  );
};

export default AllTrades;
