import React, { useState } from "react";
import "./Header.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import ThemeToggle from "./ThemeToggle";
import {
  Button,
  Menu,
  MenuItem,
  Avatar,
  Divider,
  ListItemIcon,
  IconButton,
  Typography,
} from "@mui/material";
import {
  Person as PersonIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Dashboard as DashboardIcon,
} from "@mui/icons-material";

function Header() {
  const { isAuthenticated, signOut, user } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // Check if user is admin - we'll treat role === 'admin' as admin user
  const isAdmin = user?.role === "admin";

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
    handleClose();
  };

  const handleProfileOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigateToProfile = () => {
    navigate("/settings");
    // Pass state to Settings page to activate the "Your Profile" tab
    navigate("/settings", { state: { activeTab: "Your Profile" } });
    handleClose();
  };

  const navigateToDashboard = () => {
    navigate("/admin");
    handleClose();
  };

  // Function to determine active link class
  const getLinkClass = ({ isActive }) => (isActive ? "active" : "");

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
            {/* Settings moved to dropdown menu */}
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
        <ThemeToggle />
        {isAuthenticated ? (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <IconButton
              onClick={handleProfileOpen}
              size="small"
              aria-controls={open ? "profile-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar sx={{ width: 32, height: 32, bgcolor: "primary.main" }}>
                {user?.email?.charAt(0).toUpperCase() || "U"}
              </Avatar>
            </IconButton>
            <Menu
              id="profile-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handleClose} disabled>
                <Typography variant="body2" color="text.secondary">
                  {user?.email}
                </Typography>
              </MenuItem>
              <Divider />
              {isAdmin && (
                <MenuItem onClick={navigateToDashboard}>
                  <ListItemIcon>
                    <DashboardIcon fontSize="small" />
                  </ListItemIcon>
                  Admin Dashboard
                </MenuItem>
              )}
              <MenuItem onClick={navigateToProfile}>
                <ListItemIcon>
                  <PersonIcon fontSize="small" />
                </ListItemIcon>
                Your Profile
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate("/settings");
                  handleClose();
                }}
              >
                <ListItemIcon>
                  <SettingsIcon fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>
              <MenuItem onClick={handleSignOut}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                Sign Out
              </MenuItem>
            </Menu>
          </div>
        ) : (
          <div className="code-icon">&lt;/&gt;</div>
        )}
      </div>
    </header>
  );
}

export default Header;
