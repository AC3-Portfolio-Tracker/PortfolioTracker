import React from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@mui/material";

function Header() {
  const { isAuthenticated, signOut, user } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          Portfolio Tracker
        </Link>
      </div>
      <nav className="nav">
        {isAuthenticated ? (
          <ul>
            <li>
              <Link to="/" activeClassName="active">
                Home
              </Link>
            </li>
            <li>
              <Link to="/brokers" activeClassName="active">
                Brokers
              </Link>
            </li>
            <li>
              <Link to="/holdings" activeClassName="active">
                Holdings
              </Link>
            </li>
            <li>
              <Link to="/performance" activeClassName="active">
                Performance
              </Link>
            </li>
            <li>
            <Link to="/pricing" activeClassName="active">
              Pricing
            </Link>
          </li>
          <li>
            <Link to="/features" activeClassName="active">
              Features
            </Link>
          </li>

            <li>
              <Link to="/income" activeClassName="active">
                Income
              </Link>
            </li>
            <li>
              <Link to="/activities" activeClassName="active">
                Activities
              </Link>
            </li>
            <li>
              <Link to="/settings" activeClassName="active">
                Settings
              </Link>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <Link to="/login" activeClassName="active">
                Login
              </Link>
            </li>
            <li>
              <Link to="/signup" activeClassName="active">
                Sign Up
              </Link>
            </li>
          </ul>
        )}
      </nav>
      <div className="user-controls">
        {isAuthenticated ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>{user?.email}</span>
            <Button 
              variant="outlined" 
              size="small" 
              onClick={handleSignOut}
              sx={{ ml: 1 }}
            >
              Sign Out
            </Button>
          </div>
        ) : (
          <div className="code-icon">&lt;/&gt;</div>
        )}
      </div>
    </header>
  );
}

export default Header;