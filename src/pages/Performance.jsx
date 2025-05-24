import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { supabase } from "../lib/supabase";
import {
  Box,
  Typography,
  Button,
  Stack,
  Paper,
} from "@mui/material";
import dayjs from "dayjs";
import groupBy from "lodash.groupby";

const PerformancePage = () => {
  const [snapshots, setSnapshots] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [granularity, setGranularity] = useState("1D");

  useEffect(() => {
    const fetchSnapshots = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from("portfolio_snapshots")
        .select("date, total_value")
        .eq("user_id", user.id)
        .order("date", { ascending: true });

      if (error) {
        console.error("Fetch error:", error);
        return;
      }

      const formatted = data.map((row) => ({
        date: row.date,
        value: parseFloat(row.total_value),
      }));
      setSnapshots(formatted);
      setFilteredData(formatted);
    };

    fetchSnapshots();
  }, []);

  useEffect(() => {
    if (!snapshots.length) return;

    let grouped;
    switch (granularity) {
      case "1W":
        grouped = groupBy(snapshots, (s) =>
          dayjs(s.date).startOf("week").format("YYYY-MM-DD")
        );
        break;
      case "1M":
        grouped = groupBy(snapshots, (s) =>
          dayjs(s.date).format("YYYY-MM")
        );
        break;
      case "1Y":
        grouped = groupBy(snapshots, (s) =>
          dayjs(s.date).format("YYYY")
        );
        break;
      default: // "1D" or "ALL"
        setFilteredData(snapshots);
        return;
    }

    const aggregated = Object.entries(grouped).map(([period, entries]) => {
      const avg =
        entries.reduce((sum, d) => sum + d.value, 0) / entries.length;
      return { date: period, value: parseFloat(avg.toFixed(2)) };
    });

    setFilteredData(aggregated);
  }, [granularity, snapshots]);

  const latest = filteredData[filteredData.length - 1]?.value || 0;
  const start = filteredData[0]?.value || 0;
  const change = latest - start;
  const percentChange = start ? (change / start) * 100 : 0;

  return (
    <Box
      sx={{
        padding: 4,
        minHeight: "100vh",
        backgroundColor: "background.default",
        color: "text.primary",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Performance
      </Typography>

      <Paper
        elevation={3}
        sx={{
          backgroundColor: "background.paper",
          padding: 4,
          borderRadius: 3,
          width: "100%",
        }}
      >
        <Typography variant="h5">${latest.toFixed(2)}</Typography>
        <Typography
          sx={{ color: change >= 0 ? "#4caf50" : "#f44336" }}
        >
          {change.toFixed(2)} {change >= 0 ? "↑" : "↓"}{" "}
          {percentChange.toFixed(2)}%
        </Typography>

        {/* Scrollable wider chart box */}
        <Box sx={{ overflowX: "auto", mt: 3 }}>
          <Box sx={{ width: "1150px" }}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
               <XAxis
  dataKey="date"
  stroke="#aaa"
  tickFormatter={(tick) => {
    //  Format X-axis labels based on granularity
    switch (granularity) {
      case "1Y":
        return dayjs(tick).format("YYYY"); 
      case "1M":
        return dayjs(tick).format("MMM YYYY"); 
      case "1W":
      case "1D":
      default:
        return dayjs(tick).format("MMM D"); 
    }
  }}
  minTickGap={20}
/>

                <YAxis
                  stroke="#aaa"
                  label={{
                    value: "Total Value",
                    angle: -90,
                    position: "insideLeft",
                    dx: -5,
                    style: {
                      textAnchor: "middle",
                      fill: "#aaa",
                      fontSize: 14,
                    },
                  }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#333",
                    border: "none",
                    color: "#fff",
                  }}
                  labelStyle={{ color: "#ccc" }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#00e676"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Box>

        <Stack direction="row" spacing={2} justifyContent="center" mt={3}>
          {["1D", "1W", "1M", "1Y", "ALL"].map((range) => (
            <Button
              key={range}
              variant={granularity === range ? "contained" : "outlined"}
              color="success"
              size="small"
              onClick={() => setGranularity(range)}
            >
              {range}
            </Button>
          ))}
        </Stack>
      </Paper>
    </Box>
  );
};

export default PerformancePage;
