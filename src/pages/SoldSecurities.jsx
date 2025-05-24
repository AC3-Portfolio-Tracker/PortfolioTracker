import React, { useEffect, useState } from 'react';
<<<<<<< HEAD

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
=======
import { supabase } from "../lib/supabase";


const SoldSecurities = () => {
  const [securities, setSecurities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      setLoading(true);

      const { data: userData, error: userError } = await supabase.auth.getUser();
      const user = userData?.user;
      if (!user) {
        alert("You must be logged in.");
        return;
      }

      // Fetch Sell activities
      const { data: sellData, error: sellError } = await supabase
        .from("activities")
        .select(`
          id, type, date, quantity, price, total_amount, security_id, user_id,
          securities (symbol)
        `)
        .eq("type", "Sell")
        .eq("user_id", user.id);

      if (sellError) {
        console.error("Error fetching sell data:", sellError);
        return;
      }

      // Fetch Dividend activities
      const { data: dividendData, error: dividendError } = await supabase
        .from("activities")
        .select(`
          id, type, date, quantity, price, total_amount, security_id, user_id,
          securities (symbol)
        `)
        .eq("type", "Dividend")
        .eq("user_id", user.id);

      if (dividendError) {
        console.error("Error fetching dividends:", dividendError);
        return;
      }

      // Group dividends by symbol
      const dividendsMap = {};
      dividendData.forEach((div) => {
        const symbol = div.securities?.symbol || div.security_id;
        const amount = div.total_amount || ((div.quantity || 0) * (div.price || 0));
        dividendsMap[symbol] = (dividendsMap[symbol] || 0) + amount;
      });

      // Group sell data by symbol
      const reportMap = {};
      sellData.forEach((sell) => {
        const symbol = sell.securities?.symbol || sell.security_id;
        const quantity = Math.abs(sell.quantity || 0);
        const value = sell.total_amount || ((sell.quantity || 0) * (sell.price || 0));
        const capitalGain = value - 8; // example fee/cost basis, replace with actual logic

        if (!reportMap[symbol]) {
          reportMap[symbol] = { qty: 0, value: 0, capitalGain: 0 };
        }

        reportMap[symbol].qty += quantity;
        reportMap[symbol].value += value;
        reportMap[symbol].capitalGain += capitalGain;
      });

      // Final result for rendering
      const finalReport = Object.entries(reportMap).map(([symbol, data]) => {
        const dividend = dividendsMap[symbol] || 0;
        const totalReturn = data.capitalGain + dividend;
        return {
          symbol,
          qty: data.qty,
          capitalGain: data.capitalGain,
          dividend,
          return: totalReturn,
        };
      });

      setSecurities(finalReport);
      setLoading(false);
    };

    fetchReport();
  }, []);

  // Calculate grand totals
  const totals = securities.reduce(
    (acc, s) => {
      acc.qty += s.qty;
      acc.capitalGain += s.capitalGain;
      acc.dividend += s.dividend;
      acc.return += s.return;
      return acc;
    },
    { qty: 0, capitalGain: 0, dividend: 0, return: 0 }
  );

  return (
    <div className="p-8 text-white">
      <h2 className="text-3xl font-bold mb-6">Sold Securities</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto rounded-md shadow-md">
          <table className="min-w-full border-separate border-spacing-x-6 border-spacing-y-2 text-sm bg-[#1e1e1e]">
            <thead className="bg-gray-100 text-xs text-gray-700 uppercase">
              <tr>
                <th className="px-4 py-2 text-left">Symbol</th>
                <th className="px-4 py-2 text-right">Qty</th>
                <th className="px-4 py-2 text-right">Capital Gains</th>
                <th className="px-4 py-2 text-right">Dividends</th>
                <th className="px-4 py-2 text-right">Return</th>
              </tr>
            </thead>
            <tbody>
              {securities.map((s, i) => (
                <tr key={i} className="hover:bg-gray-800">
                  <td className="px-4 py-2 text-blue-400 font-medium">{s.symbol}</td>
                  <td className="px-4 py-2 text-right">{s.qty}</td>
                  <td className="px-4 py-2 text-right">${s.capitalGain.toFixed(2)}</td>
                  <td className="px-4 py-2 text-right">${s.dividend.toFixed(2)}</td>
                  <td className="px-4 py-2 text-right">${s.return.toFixed(2)}</td>
                </tr>
              ))}
              <tr className="bg-[#161616] font-bold border-t border-gray-400">
                <td className="px-4 py-2">Grand Total</td>
                <td className="px-4 py-2 text-right">{totals.qty}</td>
                <td className="px-4 py-2 text-right">${totals.capitalGain.toFixed(2)}</td>
                <td className="px-4 py-2 text-right">${totals.dividend.toFixed(2)}</td>
                <td className="px-4 py-2 text-right">${totals.return.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
>>>>>>> my-backup
    </div>
  );
};

export default SoldSecurities;
