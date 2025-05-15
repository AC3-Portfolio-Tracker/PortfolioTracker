// src/pages/ReportRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import AllTrades from "./AllTrades";
import TaxableIncome from "./TaxableIncome";
import SoldSecurities from "./SoldSecurities";
import FutureIncome from "./FutureIncome";
import Exposure from "./Exposure";

function ReportRoutes() {
  return (
    <Routes>
      <Route path="all-trades" element={<AllTrades />} />
      <Route path="taxable-income" element={<TaxableIncome />} />
      <Route path="sold-securities" element={<SoldSecurities />} />
      <Route path="future-income" element={<FutureIncome />} />
      <Route path="exposure" element={<Exposure />} />
    </Routes>
  );
}

export default ReportRoutes;
