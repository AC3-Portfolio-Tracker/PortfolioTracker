import React, { useState, useEffect } from "react";
import "../components/Settings.css"; // Or './SettingsPage.css'
import PortfolioSettings from "./PortfolioSettings";
import LimitsSettings from "./LimitsSettings";
import GoalsSettings from "./GoalsSettings";
import DataExportSettings from "./DataExportSettings";
import { useAuth } from "../contexts/AuthContext";
import { settings } from "../lib/supabase";
import { TextField, MenuItem, Button, Alert, CircularProgress } from "@mui/material";

function SettingsPage() {
  const [activeTab, setActiveTab] = useState("General");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userSettings, setUserSettings] = useState({
    default_currency: "USD",
    theme: "dark",
    notification_preferences: {},
  });
  const [currencies, setCurrencies] = useState([
    { code: "USD", name: "United States Dollar" },
    { code: "EUR", name: "Euro" },
    { code: "GBP", name: "British Pound" },
    { code: "JPY", name: "Japanese Yen" },
    { code: "AUD", name: "Australian Dollar" },
    { code: "CAD", name: "Canadian Dollar" },
    { code: "CHF", name: "Swiss Franc" },
    { code: "CNY", name: "Chinese Yuan" },
    { code: "INR", name: "Indian Rupee" },
  ]);
  const [exchangeRates, setExchangeRates] = useState([]);
  const [newExchangeRate, setNewExchangeRate] = useState({ currency: "", rate: "" });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchSettings = async () => {
      if (!user) return;
      
      setLoading(true);
      try {
        const { data, error } = await settings.getSettings(user.id);
        if (error) throw error;
        
        if (data) {
          setUserSettings(data);
          // If exchange rates exist in notification_preferences, load them
          if (data.notification_preferences?.exchange_rates) {
            setExchangeRates(data.notification_preferences.exchange_rates || []);
          }
        }
      } catch (err) {
        console.error("Error fetching settings:", err);
        setError("Failed to load settings. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, [user]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    // Clear any success/error messages when changing tabs
    setSuccess(null);
    setError(null);
  };

  const handleCurrencyChange = (e) => {
    setUserSettings({
      ...userSettings,
      default_currency: e.target.value
    });
  };

  const handleAddExchangeRate = () => {
    if (!newExchangeRate.currency || !newExchangeRate.rate) {
      setError("Please select a currency and enter a rate");
      return;
    }

    if (isNaN(parseFloat(newExchangeRate.rate)) || parseFloat(newExchangeRate.rate) <= 0) {
      setError("Please enter a valid positive number for the rate");
      return;
    }

    // Check if currency already exists
    if (exchangeRates.some(rate => rate.currency === newExchangeRate.currency)) {
      setError("This currency already has an exchange rate");
      return;
    }

    setExchangeRates([...exchangeRates, newExchangeRate]);
    setNewExchangeRate({ currency: "", rate: "" });
    setError(null);
  };

  const handleRemoveExchangeRate = (currency) => {
    setExchangeRates(exchangeRates.filter(rate => rate.currency !== currency));
  };

  const saveGeneralSettings = async () => {
    if (!user) return;
    
    setSaving(true);
    setError(null);
    setSuccess(null);
    
    try {
      // Update notification_preferences to include exchange rates
      const updatedSettings = {
        ...userSettings,
        notification_preferences: {
          ...userSettings.notification_preferences,
          exchange_rates: exchangeRates
        }
      };
      
      const { error } = await settings.updateSettings(user.id, updatedSettings);
      if (error) throw error;
      
      setUserSettings(updatedSettings);
      setSuccess("Settings saved successfully");
    } catch (err) {
      console.error("Error saving settings:", err);
      setError("Failed to save settings. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleThemeChange = (theme) => {
    setUserSettings({
      ...userSettings,
      theme
    });
  };

  // Function to share with child components
  const updateUserSettings = (newSettings) => {
    setUserSettings({
      ...userSettings,
      ...newSettings
    });
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1>Settings</h1>
        <p className="settings-subheader">
          Manage your general portfolio settings & preferences.
        </p>
      </div>

      {loading && (
        <div className="loading-container">
          <CircularProgress />
        </div>
      )}

      {!loading && (
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
                className={activeTab === "Accounts" ? "active" : ""}
                onClick={() => handleTabClick("Accounts")}
              >
                Accounts
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
            {success && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {success}
              </Alert>
            )}
            
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            
            {activeTab === "General" && (
              <div className="general-settings">
                <div className="base-currency-card">
                  <h3>Base Currency</h3>
                  <p>Select your portfolio base currency.</p>
                  <div className="currency-selector">
                    <TextField
                      select
                      label="Currency"
                      value={userSettings.default_currency}
                      onChange={handleCurrencyChange}
                      fullWidth
                      variant="outlined"
                      margin="normal"
                    >
                      {currencies.map((currency) => (
                        <MenuItem key={currency.code} value={currency.code}>
                          {currency.name} ({currency.code})
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={saveGeneralSettings}
                    disabled={saving}
                  >
                    {saving ? "Saving..." : "Save"}
                  </Button>
                </div>

                <div className="exchange-rates-card">
                  <h3>Exchange Rates</h3>
                  <p>Manage exchange rates for currencies in your portfolio.</p>
                  
                  {exchangeRates.length === 0 ? (
                    <p className="no-rates">No exchange rates defined!</p>
                  ) : (
                    <div className="exchange-rates-list">
                      {exchangeRates.map((rate) => (
                        <div key={rate.currency} className="exchange-rate-item">
                          <div>
                            <strong>{rate.currency}</strong>: {rate.rate} per {userSettings.default_currency}
                          </div>
                          <Button 
                            size="small" 
                            color="error" 
                            onClick={() => handleRemoveExchangeRate(rate.currency)}
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="add-exchange-rate">
                    <TextField
                      select
                      label="Currency"
                      value={newExchangeRate.currency}
                      onChange={(e) => setNewExchangeRate({...newExchangeRate, currency: e.target.value})}
                      sx={{ mr: 2, minWidth: 150 }}
                    >
                      {currencies
                        .filter(c => c.code !== userSettings.default_currency)
                        .filter(c => !exchangeRates.some(r => r.currency === c.code))
                        .map((currency) => (
                          <MenuItem key={currency.code} value={currency.code}>
                            {currency.name} ({currency.code})
                          </MenuItem>
                        ))}
                    </TextField>
                    
                    <TextField
                      label="Rate"
                      type="number"
                      value={newExchangeRate.rate}
                      onChange={(e) => setNewExchangeRate({...newExchangeRate, rate: e.target.value})}
                      sx={{ mr: 2, minWidth: 100 }}
                      inputProps={{ min: 0, step: "0.0001" }}
                    />
                    
                    <Button 
                      variant="outlined" 
                      onClick={handleAddExchangeRate}
                    >
                      Add Rate
                    </Button>
                  </div>
                  
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={saveGeneralSettings}
                    disabled={saving}
                    sx={{ mt: 2 }}
                  >
                    {saving ? "Saving..." : "Save Exchange Rates"}
                  </Button>
                </div>
              </div>
            )}

            {activeTab === "Accounts" && (
              <PortfolioSettings 
                userSettings={userSettings} 
                updateUserSettings={updateUserSettings} 
                setError={setError}
                setSuccess={setSuccess}
              />
            )}
            
            {activeTab === "Limits" && (
              <LimitsSettings 
                userSettings={userSettings} 
                updateUserSettings={updateUserSettings}
                setError={setError}
                setSuccess={setSuccess}
              />
            )}

            {activeTab === "Goals" && (
              <GoalsSettings 
                userSettings={userSettings} 
                updateUserSettings={updateUserSettings}
                setError={setError}
                setSuccess={setSuccess}
              />
            )}
            
            {activeTab === "Appearance" && (
              <div className="appearance-settings">
                <h3>Theme Settings</h3>
                <p>Choose your preferred application theme.</p>
                
                <div className="theme-options">
                  <div 
                    className={`theme-option ${userSettings.theme === 'light' ? 'selected' : ''}`}
                    onClick={() => handleThemeChange('light')}
                  >
                    <div className="theme-preview light-theme"></div>
                    <p>Light Mode</p>
                  </div>
                  
                  <div 
                    className={`theme-option ${userSettings.theme === 'dark' ? 'selected' : ''}`}
                    onClick={() => handleThemeChange('dark')}
                  >
                    <div className="theme-preview dark-theme"></div>
                    <p>Dark Mode</p>
                  </div>
                </div>
                
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={saveGeneralSettings}
                  disabled={saving}
                  sx={{ mt: 2 }}
                >
                  {saving ? "Saving..." : "Save Theme Preferences"}
                </Button>
              </div>
            )}
            
            {activeTab === "Data Export" && (
              <DataExportSettings 
                userSettings={userSettings}
                setError={setError}
                setSuccess={setSuccess}
              />
            )}
            
            {activeTab === "Your Profile" && (
              <div className="profile-settings">
                <h3>Your Profile</h3>
                <p>Manage your account information and preferences.</p>
                
                {/* Display user information */}
                <div className="user-info">
                  <p><strong>Email:</strong> {user?.email}</p>
                </div>
                
                <Button 
                  variant="outlined" 
                  color="primary" 
                  onClick={() => window.open('https://supabase.com/dashboard/project/wpaqgnxpzktnsppagtyr/auth/users', '_blank')}
                  sx={{ mt: 2 }}
                >
                  Manage Account Details
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default SettingsPage; // Or export default Settings; if your filename is Settings.jsx
