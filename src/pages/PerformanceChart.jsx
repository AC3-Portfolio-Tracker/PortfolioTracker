import React from "react";
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const diversificationData = [
  { date: "13 Oct 18", ASX: 20, LSE: 30, NASDAQ: 25, NZX: 15, TSE: 10 },
  { date: "16 Oct 19", ASX: 25, LSE: 32, NASDAQ: 28, NZX: 17, TSE: 12 },
  { date: "18 Oct 20", ASX: 22, LSE: 35, NASDAQ: 26, NZX: 18, TSE: 14 },
  { date: "21 Oct 21", ASX: 28, LSE: 37, NASDAQ: 30, NZX: 20, TSE: 16 },
  { date: "24 Oct 22", ASX: 26, LSE: 36, NASDAQ: 29, NZX: 19, TSE: 15 },
];

const portfolioValueData = [
  { date: "13 Oct 18", value: 10000 },
  { date: "16 Oct 19", value: 12500 },
  { date: "18 Oct 20", value: 14000 },
  { date: "21 Oct 21", value: 17000 },
  { date: "24 Oct 22", value: 16500 },
];

const sectorAllocationData = [
  { sector: "Tech", value: 2000 },
  { sector: "Healthcare", value: 3000 },
  { sector: "Finance", value: 2500 },
  { sector: "Energy", value: 1500 },
  { sector: "Real Estate", value: 1000 },
];

const currentHoldingsData = [
  { name: "AAPL", value: 30 },
  { name: "GOOGL", value: 25 },
  { name: "MSFT", value: 20 },
  { name: "TSLA", value: 15 },
  { name: "Others", value: 10 },
];

const COLORS = ["#fbbf24", "#f87171", "#a78bfa", "#818cf8", "#60a5fa"];

const PerformanceChart = () => (
  <div style={{ padding: 20, display: "grid", gap: 40 }}>
    {/* Diversification Chart */}
    <h2>Portfolio Diversification Over Time</h2>
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={diversificationData} stackOffset="expand">
        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
        <XAxis dataKey="date" stroke="#ccc" />
        <YAxis
          tickFormatter={(v) => `${(v * 100).toFixed(0)}%`}
          stroke="#ccc"
        />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="ASX"
          stackId="1"
          stroke="#fbbf24"
          fill="#fbbf24"
        />
        <Area
          type="monotone"
          dataKey="LSE"
          stackId="1"
          stroke="#f87171"
          fill="#f87171"
        />
        <Area
          type="monotone"
          dataKey="NASDAQ"
          stackId="1"
          stroke="#a78bfa"
          fill="#a78bfa"
        />
        <Area
          type="monotone"
          dataKey="NZX"
          stackId="1"
          stroke="#818cf8"
          fill="#818cf8"
        />
        <Area
          type="monotone"
          dataKey="TSE"
          stackId="1"
          stroke="#60a5fa"
          fill="#60a5fa"
        />
      </AreaChart>
    </ResponsiveContainer>

    {/* Line Chart */}
    <h2>Total Portfolio Value Over Time</h2>
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={portfolioValueData}>
        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
        <XAxis dataKey="date" stroke="#ccc" />
        <YAxis stroke="#ccc" />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#34d399"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>

    {/* Bar Chart */}
    <h2>Asset Allocation by Sector</h2>
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={sectorAllocationData}>
        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
        <XAxis dataKey="sector" stroke="#ccc" />
        <YAxis stroke="#ccc" />
        <Tooltip />
        <Bar dataKey="value" fill="#6366f1" />
      </BarChart>
    </ResponsiveContainer>

    {/* Pie Chart */}
    <h2>Current Holdings Snapshot</h2>
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Tooltip />
        <Legend />
        <Pie
          data={currentHoldingsData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          label
        >
          {currentHoldingsData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  </div>
);

export default PerformanceChart;
