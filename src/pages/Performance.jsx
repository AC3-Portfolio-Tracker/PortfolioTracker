import React from "react";
import TimeFilters from "./TimeFilters";
import Dropdowns from "./Dropdowns";
import ModeToggle from "./ModeToggle";
import PerformanceChart from "./PerformanceChart";
import AssetsTable from "./AssetsTable";
import "../components/Performance.css";

const Performance = () => {
  return (
    <div>
      <div className="performance-container">
        {/* Top Navbar */}
        <div className="navbar">
          <div className="navbar-title">Your Portfolio</div>
          <div className="navbar-right">
            <div className="portfolio-value">
              <p className="portfolio-label">Current Portfolio Value</p>
              <p className="portfolio-amount">$0.00</p>
            </div>
            <div className="account-info">Account ▾</div>
          </div>
        </div>

        {/* Page Content Wrapper */}
        <div className="content-wrapper">
          {/* Filters Section */}
          <div className="filters-section">
            {/* <TimeFilters /> */}
            <Dropdowns />
          </div>

          {/* Toggles Section */}
          <div className="toggles-section">
            <div className="toggle-card">
              <span className="toggle-label">Open & Closed Positions</span>
              <ModeToggle />
            </div>
            <div className="toggle-card">
              <span className="toggle-label">Percentage Gains</span>
              <ModeToggle />
            </div>
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
      <footer className="footer">
        <div className="footer-content">
          <p>
            &copy; {new Date().getFullYear()} PortfolioTracker. All rights reserved.
          </p>
          <div className="footer-links">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
            <a href="/contact">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Performance;
