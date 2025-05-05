import React from "react";
import "./Header.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@mui/material";

function Header() {
  const { isAuthenticated, signOut, user } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  // Function to determine active link class
  const getLinkClass = ({ isActive }) => isActive ? "active" : "";

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
              <NavLink to="/home" className={getLinkClass}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/brokers" className={getLinkClass}>
                Brokers
              </NavLink>
            </li>
            <li>
              <NavLink to="/holdings" className={getLinkClass}>
                Holdings
              </NavLink>
            </li>
            <li>
              <NavLink to="/performance" className={getLinkClass}>
                Performance
              </NavLink>
            </li>
            <li>
              <NavLink to="/pricing" className={getLinkClass}>
                Pricing
              </NavLink>
            </li>
            <li>
              <NavLink to="/features" className={getLinkClass}>
                Features
              </NavLink>
            </li>
            <li>
              <NavLink to="/income" className={getLinkClass}>
                Income
              </NavLink>
            </li>
            <li>
              <NavLink to="/activities" className={getLinkClass}>
                Activities
              </NavLink>
            </li>
            <li>
              <NavLink to="/settings" className={getLinkClass}>
                Settings
              </NavLink>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <NavLink to="/login" className={getLinkClass}>
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to="/signup" className={getLinkClass}>
                Sign Up
              </NavLink>
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