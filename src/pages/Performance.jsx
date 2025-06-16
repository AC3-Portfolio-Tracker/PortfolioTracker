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
  useTheme,
} from "@mui/material";
import dayjs from "dayjs";
import groupBy from "lodash.groupby";

// Import useNavigate for navigation
import { useNavigate } from "react-router-dom";

const PerformancePage = () => {
  const [snapshots, setSnapshots] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [granularity, setGranularity] = useState("1D");

  const theme = useTheme(); // Access system theme
  const navigate = useNavigate(); // Hook for navigation

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

    if (granularity === "1D") {
      const today = dayjs().format("YYYY-MM-DD");
      const todayData = snapshots.filter((s) =>
        dayjs(s.date).isSame(today, "day")
      );
      setFilteredData(todayData);
      return;
    }

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
      default: // "ALL"
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

  // Total value logic for all granularities
  let latest = 0;

  if (granularity === "1D") {
    latest = filteredData.reduce((sum, d) => sum + d.value, 0);
  } else if (granularity === "1W") {
    latest = filteredData.reduce((sum, d) => sum + d.value, 0);
  } else if (granularity === "1M") {
    latest = filteredData.reduce((sum, d) => sum + d.value, 0);
  } else if (granularity === "1Y") {
    latest = filteredData.reduce((sum, d) => sum + d.value, 0);
  } else {
    // "ALL"
    latest = filteredData.reduce((sum, d) => sum + d.value, 0);
  }

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
      {/*Back to Reports Button */}
      <Box sx={{ mb: 2 }}>
        <Button variant="outlined" onClick={() => navigate("/reports")}>
          ← Back to Reports
        </Button>
      </Box>

      <Typography variant="h4" gutterBottom>
        Brokers Performance
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
        <Typography variant="h5">
          {granularity === "1D"
            ? "Today's Total: "
            : granularity === "1W"
            ? "This Week's Total: "
            : granularity === "1M"
            ? "This Month's Total: "
            : granularity === "1Y"
            ? "This Year's Total: "
            : "Total: "}
          ${latest.toFixed(2)}
        </Typography>

        <Typography sx={{ color: change >= 0 ? "#4caf50" : "#f44336" }}>
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
                    backgroundColor: theme.palette.background.paper,
                    border: `1px solid ${theme.palette.divider}`,
                    color: theme.palette.text.primary,
                  }}
                  labelStyle={{ color: theme.palette.text.secondary }}
                  formatter={(value) => [`$${value.toFixed(2)}`, "Value"]}
                  labelFormatter={(label) =>
                    `Date: ${dayjs(label).format("YYYY-MM-DD")}`
                  }
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={theme.palette.primary.main}
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
              color="primary"
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
