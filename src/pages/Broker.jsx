import React from "react";
import "../components/Broker.css";

function Broker() {
  return (
    <div className="broker-upload-page">
      <div className="broker-upload-header">
        {/* <div className="breadcrumb">
          <span className="home-icon">🏠</span>{" "}
          <span className="arrow">&gt;</span> Add Investment{" "}
          <span className="arrow">&gt;</span> Upload via broker
        </div> */}
        <h1>Upload via broker</h1>
      </div>

      <div className="broker-search-section">
        <p>
          Search and choose one of our supported brokers to begin.{" "}
          <a href="#">Learn more</a>
        </p>
        <div className="search-input">
          <span className="search-icon">🔍</span>
          <input type="text" placeholder="Search for your broker by name..." />
        </div>
        <div className="search-results-info">
          Showing 127 of 244
          <div className="sort-by">
            Sort by:
            <select>
              <option>A - Z</option>
              {/* Add other sorting options */}
            </select>
          </div>
        </div>
      </div>

      <div className="broker-grid">
        <div className="broker-card">
          <img
            src="https://via.placeholder.com/150/ffffff/000000?Text=180MARKETS"
            alt="180MARKETS"
          />
        </div>
        <div className="broker-card">
          <div className="broker-logo-text">
            708 <span className="secondary-text">WEALTH MANAGEMENT</span>
          </div>
        </div>
        <div className="broker-card">
          <div className="broker-logo-text">
            <span className="acumen-ac">ACUMEN</span>{" "}
            <span className="acumen-investors">INVESTORS</span>
          </div>
        </div>
        <div className="broker-card">
          <img
            src="https://via.placeholder.com/100/ffcc00/000000?Text=Alpaca"
            alt="Alpaca"
            style={{ borderRadius: "50%" }}
          />
        </div>
        <div className="broker-card">
          <img
            src="https://via.placeholder.com/120/f0ad4e/ffffff?Text=ALPINE%20CAPITAL&style=round"
            alt="ALPINE CAPITAL"
            style={{ borderRadius: "5px" }}
          />
        </div>
        <div className="broker-card">
          <div className="broker-logo-text">
            ALTO <span className="secondary-text">CAPITAL</span>
          </div>
        </div>
        <div className="broker-card">
          <div className="broker-logo-text" style={{ color: "#a94442" }}>
            Amscot
          </div>
        </div>
        <div className="broker-card">
          <div className="broker-logo-text" style={{ color: "#007bff" }}>
            ANZ{" "}
            <span className="secondary-text" style={{ fontSize: "0.7rem" }}>
              Share Investing
            </span>
          </div>
        </div>
        {/* Add more broker cards here */}
      </div>
    </div>
  );
}

export default Broker;
