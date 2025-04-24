import React from "react";
import "../components/PortfolioSettings.css";

function PortfolioSettings() {
  return (
    <div className="portfolio-settings">
      <div className="portfolio-header">
        <h2>Your Portfolio</h2>
        <p>Manage your investment and saving accounts.</p>
        <button className="add-portfolio-button">
          <span role="img" aria-label="add">
            ➕
          </span>{" "}
          Add a Portfolio
        </button>
      </div>

      <div className="portfolio-list">
        <div className="portfolio-item">
          <div className="portfolio-details">
            <h3>Test 01</h3>
            <p>AUD - Retirement 01</p>
          </div>
          <button className="reorder-button">☰</button>
        </div>

        <div className="portfolio-item">
          <div className="portfolio-details">
            <h3>Test 12</h3>
            <p>AUD - Bitcoin</p>
          </div>
          <button className="reorder-button">☰</button>
        </div>

        {/* More portfolio items will go here */}
      </div>
    </div>
  );
}

export default PortfolioSettings;
