import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          Home
        </Link>
      </div>
      <nav className="nav">
        <ul>
          <li>
            <Link to="/" activeClassName="active">
              Home
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
      </nav>
      <div className="code-icon">&lt;/&gt;</div>
    </header>
  );
}

export default Header;
