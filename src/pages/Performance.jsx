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
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#82ca9d" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
          <div className="time-filters">
            {["1W", "1M", "3M", "1Y", "ALL"].map(range => (
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
      </div>
    </div>
  );
};

export default PerformancePage;
