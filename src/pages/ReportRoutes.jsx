// src/pages/ReportRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import AllTrades from "./AllTrades";
import TaxableIncome from "./TaxableIncome";
import SoldSecurities from "./SoldSecurities";
<<<<<<< HEAD
import FutureIncome from "./FutureIncome";
import Exposure from "./Exposure";
=======
import HistoricCost from "./HistoricCost";
import PerformanceReport from "./PerformanceReport";


>>>>>>> my-backup

function ReportRoutes() {
  return (
    <Routes>
      <Route path="all-trades" element={<AllTrades />} />
      <Route path="taxable-income" element={<TaxableIncome />} />
      <Route path="sold-securities" element={<SoldSecurities />} />
<<<<<<< HEAD
      <Route path="future-income" element={<FutureIncome />} />
      <Route path="exposure" element={<Exposure />} />
=======
      <Route path="historic-cost" element={<HistoricCost />} />
      <Route path="performance" element={<PerformanceReport />} />


>>>>>>> my-backup
    </Routes>
  );
}

export default ReportRoutes;
