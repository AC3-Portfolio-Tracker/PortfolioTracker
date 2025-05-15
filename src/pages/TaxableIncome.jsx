import React, { useEffect, useState } from 'react';

const TaxableIncome = () => {
  const [incomeRows, setIncomeRows] = useState([]);

  useEffect(() => {
    // fetch("/api/taxable-income").then(res => res.json()).then(setIncomeRows);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Taxable Income</h2>
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Holding</th>
            <th className="border px-4 py-2">Paid Date</th>
            <th className="border px-4 py-2">Total Income</th>
            <th className="border px-4 py-2">Franked</th>
            <th className="border px-4 py-2">Unfranked</th>
            <th className="border px-4 py-2">Withholding Tax</th>
            <th className="border px-4 py-2">Franking Credits</th>
            <th className="border px-4 py-2">Gross Income</th>
          </tr>
        </thead>
        <tbody>
          {incomeRows.length === 0 ? (
            <tr><td colSpan="8" className="text-center py-4">No income data available</td></tr>
          ) : (
            incomeRows.map((row, i) => (
              <tr key={i}>
                <td className="border px-4 py-2">{row.holding}</td>
                <td className="border px-4 py-2">{row.paidDate}</td>
                <td className="border px-4 py-2">{row.totalIncome}</td>
                <td className="border px-4 py-2">{row.franked}</td>
                <td className="border px-4 py-2">{row.unfranked}</td>
                <td className="border px-4 py-2">{row.withholdingTax}</td>
                <td className="border px-4 py-2">{row.frankingCredits}</td>
                <td className="border px-4 py-2">{row.grossIncome}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TaxableIncome;
