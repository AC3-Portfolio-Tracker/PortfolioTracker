import React from "react";
import PerformanceChart from "./PerformanceChart";
import AssetsTable from "./AssetsTable";
import "../components/Performance.css";

const Performance = () => {
  return (
    <div className="performance-container">
      {/* Page Heading */}
      <h2 className="performance-heading">Your Portfolio</h2>

      {/* Page Content Wrapper */}
      <div className="content-wrapper">
        {/* Filters Section */}
        <div className="filters-section">
          <select className="simple-dropdown">
            <option>In the last 5 years</option>
            <option>In the last 3 years</option>
            <option>In the last year</option>
            <option>In the last 6 months</option>
            <option>In the last month</option>
          </select>
        </div>

        {/* Performance Chart Card */}
        <div className="chart-card">
          <PerformanceChart />
        </div>

        {/* Assets Table Card */}
        <div className="assets-table-card">
          <AssetsTable />
        </div>
      </div>
    </div>
  );
};

export default Performance;
