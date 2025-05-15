import React, { useEffect, useState } from 'react';

const SoldSecurities = () => {
  const [securities, setSecurities] = useState([]);

  useEffect(() => {
    // fetch("/api/sold-securities").then(res => res.json()).then(setSecurities);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Sold Securities</h2>
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Symbol</th>
            <th className="border px-4 py-2">Qty</th>
            <th className="border px-4 py-2">Capital Gains</th>
            <th className="border px-4 py-2">Dividends</th>
            <th className="border px-4 py-2">Return</th>
          </tr>
        </thead>
        <tbody>
          {securities.length === 0 ? (
            <tr><td colSpan="5" className="text-center py-4">No data found</td></tr>
          ) : (
            securities.map((s, i) => (
              <tr key={i}>
                <td className="border px-4 py-2">{s.symbol}</td>
                <td className="border px-4 py-2">{s.qty}</td>
                <td className="border px-4 py-2">{s.capitalGain}</td>
                <td className="border px-4 py-2">{s.dividend}</td>
                <td className="border px-4 py-2">{s.return}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SoldSecurities;
