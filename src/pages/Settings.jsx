import React, { useState } from "react";
import "../components/Settings.css"; // Or './SettingsPage.css'
import PortfolioSettings from "./PortfolioSettings";
import LimitsSettings from "./LimitsSettings";

function SettingsPage() {
  const [activeTab, setActiveTab] = useState("General");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

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
            <li
              className={activeTab === "General" ? "active" : ""}
              onClick={() => handleTabClick("General")}
            >
              General
            </li>
            <li
              className={activeTab === "Portfolio" ? "active" : ""}
              onClick={() => handleTabClick("Portfolio")}
            >
              Portfolio
            </li>
            <li
              className={activeTab === "Limits" ? "active" : ""}
              onClick={() => handleTabClick("Limits")}
            >
              Limits
            </li>
            <li
              className={activeTab === "Goals" ? "active" : ""}
              onClick={() => handleTabClick("Goals")}
            >
              Goals
            </li>
            <li
              className={activeTab === "Appearance" ? "active" : ""}
              onClick={() => handleTabClick("Appearance")}
            >
              Appearance
            </li>
            <li
              className={activeTab === "Data Export" ? "active" : ""}
              onClick={() => handleTabClick("Data Export")}
            >
              Data Export
            </li>
            <li
              className={activeTab === "Your Profile" ? "active" : ""}
              onClick={() => handleTabClick("Your Profile")}
            >
              Your Profile
            </li>
          </ul>
        </div>

        <div className="main-content">
          {activeTab === "General" && (
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
          )}

          {activeTab === "Portfolio" && <PortfolioSettings />}
          {activeTab === "Limits" && <LimitsSettings />}

          {/* Add other tab content here based on activeTab */}
          {activeTab === "Goals" && <div>Goals Settings</div>}
          {activeTab === "Appearance" && <div>Appearance Settings</div>}
          {activeTab === "Data Export" && <div>Data Export Settings</div>}
          {activeTab === "Your Profile" && <div>Your Profile Settings</div>}
        </div>
      </div>
    </div>
  );
}

export default SettingsPage; // Or export default Settings; if your filename is Settings.jsx
