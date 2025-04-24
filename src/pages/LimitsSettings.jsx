import React from "react";
import "../components/LimitsSettings.css";

function LimitsSettings() {
  return (
    <div className="limits-settings">
      <div className="limits-header">
        <h2>Contribution Limits</h2>
        <p>Manage your Contribution Limits on your Portfolio.</p>
        <button className="add-limit-button">
          <span role="img" aria-label="add">
            ➕
          </span>{" "}
          Add a Contribution Limit
        </button>
      </div>

      <div className="current-year-limits">
        <h3>Current Year (2025)</h3>
        <div className="limit-group">
          <h4>Group 01</h4>
          <div className="limit-details">
            <p>Your Limit: $1,000.00</p>
            <p className="contributed">Your have contributed $300.00</p>
            <div className="progress-circle-container">
              <div className="progress-circle">
                <div className="progress-value">30%</div>
              </div>
              {/* You'll need to add CSS to visually represent the progress */}
            </div>
          </div>
          <div className="select-accounts">
            <p>Select Accounts</p>
            <label className="checkbox-label">
              <input type="radio" name="account" value="Test01" />
              Test01
            </label>
            <label className="checkbox-label">
              <input type="radio" name="account" value="Test12" />
              Test12
            </label>
          </div>
          <button className="save-select-account-button">
            Save Select Account
          </button>
        </div>
        {/* More limit groups can be added here */}
      </div>
    </div>
  );
}

export default LimitsSettings;
