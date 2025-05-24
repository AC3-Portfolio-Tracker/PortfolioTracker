<<<<<<< HEAD
import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import "../components/Performance.css";

const allData = {
  "3M": [
    { date: "Week 1", value: 21000 },
    { date: "Week 2", value: 19000 },
    { date: "Week 3", value: 22000 },
    { date: "Week 4", value: 24000 },
    { date: "Week 5", value: 26000 },
    { date: "Week 6", value: 25000 },
    { date: "Week 7", value: 27000 },
    { date: "Week 8", value: 29000 },
    { date: "Week 9", value: 30000 },
    { date: "Week 10", value: 31000 },
    { date: "Week 11", value: 31500 },
    { date: "Week 12", value: 31618 },
  ],
  "1Y": [
    { date: "Month 1", value: 18000 },
    { date: "Month 3", value: 22000 },
    { date: "Month 6", value: 26000 },
    { date: "Month 9", value: 29000 },
    { date: "Month 12", value: 31618 },
  ],
  ALL: [
    { date: "Year 1", value: 10000 },
    { date: "Year 2", value: 18000 },
    { date: "Year 3", value: 24000 },
    { date: "Year 4", value: 28000 },
    { date: "Year 5", value: 31618 },
  ],
};

const PerformancePage = () => {
  const [timeRange, setTimeRange] = useState("3M");

  const getFilteredData = () => {
    const baseData = allData["3M"];
    switch (timeRange) {
      case "1W":
        return baseData.slice(0, 1); // Show Week 1 only
      case "1M":
        return baseData.slice(0, 4); // Weeks 1–4
      case "3M":
        return baseData; // All 12 weeks
      case "1Y":
        return allData["1Y"];
      case "ALL":
        return allData["ALL"];
      default:
        return baseData;
    }
  };

  const filteredData = getFilteredData();

  return (
    <div className="dashboard-container">
      <div className="header">
        <h2>Performance</h2>
      </div>

      <div className="main-content">
        <div className="chart-section">
          <div className="chart-header">
            <h3>$31,618.52</h3>
            <p className="return-text">6,362.48 ↑ 25.19%</p>
          </div>

=======
import React, { useState, useEffect } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from "recharts";
import "../components/Performance.css";
import { supabase } from "../lib/supabase";

const PerformancePage = () => {
  const [snapshots, setSnapshots] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [timeRange, setTimeRange] = useState("3M");

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

      const formatted = data.map(row => ({
        date: row.date,
        value: parseFloat(row.total_value),
      }));
      setSnapshots(formatted);
      setFilteredData(formatted);
    };

    fetchSnapshots();
  }, []);

  useEffect(() => {
    const now = new Date();
    let cutoff;
    switch (timeRange) {
      case "1W": cutoff = new Date(now.setDate(now.getDate() - 7)); break;
      case "1M": cutoff = new Date(now.setMonth(now.getMonth() - 1)); break;
      case "3M": cutoff = new Date(now.setMonth(now.getMonth() - 3)); break;
      case "1Y": cutoff = new Date(now.setFullYear(now.getFullYear() - 1)); break;
      default: setFilteredData(snapshots); return;
    }

    setFilteredData(snapshots.filter(d => new Date(d.date) >= cutoff));
  }, [timeRange, snapshots]);

  const latest = snapshots[snapshots.length - 1]?.value || 0;
  const start = snapshots[0]?.value || 0;
  const change = latest - start;
  const percentChange = start ? (change / start) * 100 : 0;

  return (
    <div className="dashboard-container">
      <div className="header"><h2>Performance</h2></div>
      <div className="main-content">
        <div className="chart-section">
          <div className="chart-header">
            <h3>${latest.toFixed(2)}</h3>
            <p className="return-text">{change.toFixed(2)} {change >= 0 ? "↑" : "↓"} {percentChange.toFixed(2)}%</p>
          </div>
>>>>>>> my-backup
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#82ca9d" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
<<<<<<< HEAD

          <div className="time-filters">
            {["1W", "1M", "3M", "1Y", "ALL"].map((range) => (
=======
          <div className="time-filters">
            {["1W", "1M", "3M", "1Y", "ALL"].map(range => (
>>>>>>> my-backup
              <button
                key={range}
                className={timeRange === range ? "active" : ""}
                onClick={() => setTimeRange(range)}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
<<<<<<< HEAD

        <div className="info-section">
          <div className="cash-balance">
            <h4>Balance</h4>
            <p>$202.39</p>
          </div>
          <ul className="summary">
            <li>Investments: $31,416.13</li>
            <li>Book Cost: $9,566.68</li>
            <li>Net Deposit: $25,256.04</li>
            <li>% of my portfolio: 9.96%</li>
            <li>Today's return: $15.06 (0.05%)</li>
            <li>Total return: $6,362.48 (25.19%)</li>
          </ul>
          <div className="contribution-warning">
            <p>
              You've contributed <strong>AU$9,020.94</strong> to this account in 2024. Your total is{" "}
              <span className="over-limit">AU$9,020.94</span> which is over the AU$7,000.00 limit.
            </p>
            <div className="progress-bar">
              <div className="filled" style={{ width: "129%" }}></div>
            </div>
          </div>
        </div>
=======
>>>>>>> my-backup
      </div>
    </div>
  );
};

export default PerformancePage;
<<<<<<< HEAD


=======
>>>>>>> my-backup
