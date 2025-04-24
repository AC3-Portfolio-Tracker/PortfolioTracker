import React from "react";
import "./Settings.css";

function Settings() {
  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1>Settings</h1>
        <p className="settings-subheader">
          Manage your general portfolio settings & preferences.
        </p>
      </div>

      <div className="settings-content">
        <div className="sidebar">
          <ul>
            <li className="active">General</li>
            <li>Portfolio</li>
            <li>Limits</li>
            <li>Goals</li>
            <li>Appearance</li>
            <li>Data Export</li>
            <li>Your Profile</li>
          </ul>
        </div>

        <div className="main-content">
          <div className="general-settings">
            <div className="base-currency-card">
              <h3>Base Currency</h3>
              <p>Select your portfolio base currency.</p>
              <div className="currency-selector">
                <select>
                  <option>United States Dollar (USD)</option>
                  {/* Add more currency options here */}
                </select>
              </div>
              <button className="save-button">Save</button>
            </div>

            <div className="exchange-rates-card">
              <h3>Exchange Rates</h3>
              <p>Manage exchange rates for currencies in your portfolio.</p>
              <p className="no-rates">No exchange rates defined!</p>
              <button className="add-rate-button">Add Rate</button>
            </div>
          </div>

          <div className="added-exchange-rates">
            <h3>Added Exchange Rates</h3>
            <table className="exchange-rates-table">
              <thead>
                <tr>
                  <th>From</th>
                  <th>To</th>
                  <th>Source</th>
                  <th>Rate</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>AUD - Australia Dollar</td>
                  <td>USD - United States Dollar</td>
                  <td>Manual</td>
                  <td>0.6500</td>
                  <td>
                    <span role="img" aria-label="edit">
                      ✍️
                    </span>
                  </td>
                  <td>
                    <span role="img" aria-label="delete">
                      🗑️
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>AUD - Australia Dollar</td>
                  <td>LKR - Sri Lankan Rupee</td>
                  <td>Manual</td>
                  <td>185.9200</td>
                  <td>
                    <span role="img" aria-label="edit">
                      ✍️
                    </span>
                  </td>
                  <td>
                    <span role="img" aria-label="delete">
                      🗑️
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>AUD - Australia Dollar</td>
                  <td>EUR - European Euro</td>
                  <td>Manual</td>
                  <td>0.5629</td>
                  <td>
                    <span role="img" aria-label="edit">
                      ✍️
                    </span>
                  </td>
                  <td>
                    <span role="img" aria-label="delete">
                      🗑️
                    </span>
                  </td>
                </tr>
                {/* More rows will go here */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
