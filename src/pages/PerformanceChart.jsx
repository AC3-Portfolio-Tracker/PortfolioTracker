import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { month: "Jan", value: 5 },
  { month: "Feb", value: 10 },
  { month: "Mar", value: 7 },
  { month: "Apr", value: 15 },
  { month: "May", value: 11 },
];

const PerformanceChart = () => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
      <XAxis dataKey="month" stroke="#ccc" />
      <YAxis stroke="#ccc" />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="value" name="Cumulative Returns" stroke="#3b82f6" strokeWidth={2} />
    </LineChart>
  </ResponsiveContainer>
);

export default PerformanceChart;
