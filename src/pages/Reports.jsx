// src/pages/Reports.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/Reports.css"; // your CSS is in components
import Modal from "../components/Modal";

const reportSections = [
  {
    category: "Performance",
    reports: [
      {
        title: "Sold Securities",
        description: "Shows capital gains, dividends, and return values for sold holdings.",
        route: "sold-securities",
      },
      {
        title: "Performance",
        description: "Track portfolio performance over time.",
        route: "performance",
      },
    ],
  },
  {
    category: "Tax & Compliance",
    reports: [
  //    {
  //      title: "All Trades",
  //      description: "Lists all trades over the selected date range.",
  //      route: "all-trades",
  //    },
      {
        title: "Taxable Income",
        description: "Summarizes dividend and interest payments for tax purposes.",
        route: "taxable-income",
      },
      {
        title: "Historic Cost",
        description: "Displays the historic cost basis of investments.",
        route: "historic-cost",
      },
    ],
  },
];

function Reports() {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const handleOpen = (report) => setSelected(report);
  const handleClose = () => setSelected(null);
  const handleRunReport = () => {
    if (selected) {
      navigate(`/reports/${selected.route}`);
      handleClose();
    }
  };

  return (
    <div className="reports-container">
      <h1 className="reports-title">Reports</h1>
      {reportSections.map((section, idx) => (
        <div key={idx}>
          <h2 className="category-title">{section.category}</h2>
          <div className="report-card-container">
            {section.reports.map((report, index) => (
              <div key={index} className="report-card">
                <h3>{report.title}</h3>
                <p>{report.description}</p>
                <button onClick={() => handleOpen(report)}>View Report</button>
              </div>
            ))}
          </div>
        </div>
      ))}

      {selected && (
        <Modal onClose={handleClose}>
          <h2>{selected.title}</h2>
          <p>{selected.description}</p>
          <button onClick={handleRunReport}>Run Report</button>
        </Modal>
      )}
    </div>
  );
}

export default Reports;
