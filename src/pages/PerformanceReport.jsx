import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Treemap, ResponsiveContainer } from "recharts";

const PerformanceReport = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPerformanceData = async () => {
      setLoading(true);

      const { data: userRes } = await supabase.auth.getUser();
      const userId = userRes?.user?.id;
      if (!userId) return;
      console.log("user id",userId)
      const { data: activities, error } = await supabase
        .from("activities")
        .select(`
          id, user_id, type, quantity, price, fees, security_id,
          securities:security_id(symbol)
        `)
        .eq("user_id", userId);

      if (error || !activities) {
        console.error("Error fetching activities 1111:", error);
        setLoading(false);
        return;
      }

      const performanceMap = {};

      console.log("aa",activities)

      activities.forEach((row) => {
        const security = row.securities;
        const symbol =
          security?.symbol
            ? `${security.symbol}`
            : "Unknown";

        if (!performanceMap[symbol]) {
          performanceMap[symbol] = {
            symbol,
            quantity: 0,
            capitalGains: 0,
            dividends: 0,
            price: 0,
            totalBuyCost: 0,
            totalSellValue: 0,
          };
        }

        const p = performanceMap[symbol];
        const qty = parseFloat(row.quantity || 0);
        const price = parseFloat(row.price || 0);
        const fees = parseFloat(row.fees || 0);

        if (row.type === "Buy") {
          p.quantity += qty;
          p.totalBuyCost += qty * price + fees;
          p.price = price; // last known price
        } else if (row.type === "Sell") {
          p.quantity -= qty;
          p.totalSellValue += qty * price - fees;
        } else if (row.type === "Dividend") {
          p.dividends += qty * price;
        }
      });

      const result = Object.values(performanceMap).map((p) => {
        const capitalGains = p.totalSellValue - p.totalBuyCost;
        const returnValue = capitalGains + p.dividends;
        return {
          ...p,
          capitalGains,
          return: returnValue,
          value: p.quantity * p.price,
        };
      });

      setData(result);
      setLoading(false);
    };

    fetchPerformanceData();
  }, []);

  const total = data.reduce(
    (acc, d) => {
      acc.value += d.value;
      acc.capitalGains += d.capitalGains;
      acc.dividends += d.dividends;
      acc.return += d.return;
      return acc;
    },
    { value: 0, capitalGains: 0, dividends: 0, return: 0 }
  );

  return (
    <div className="p-8 text-white">
      <h2 className="text-3xl font-bold mb-6">Performance</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="bg-white rounded-md p-4 mb-6">
            <ResponsiveContainer width="100%" height={300}>
              <Treemap
                data={data.map((d) => ({ name: d.symbol, size: 100 }))}
                dataKey="size"
                nameKey="name"
                stroke="#fff"
                fill="#86efac"
              />
            </ResponsiveContainer>
          </div>

          <table className="min-w-full border-separate border-spacing-x-6 border-spacing-y-2 bg-[#1e1e1e] text-sm">
            <thead className="text-gray-300 uppercase text-xs border-b border-gray-600">
              <tr>
                <th className="text-left px-4 py-2">ASX</th>
                <th className="text-right px-4 py-2">Price</th>
                <th className="text-right px-4 py-2">Quantity</th>
                <th className="text-right px-4 py-2">Value</th>
                <th className="text-right px-4 py-2">Capital Gains</th>
                <th className="text-right px-4 py-2">Dividends</th>
                <th className="text-right px-4 py-2">Return</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr key={i} className="hover:bg-gray-800 transition">
                  {console.log("symboles:",row)}
                  <td className="px-4 py-2 text-blue-400">{row.symbol}</td>
                  <td className="px-4 py-2 text-right">${row.price.toFixed(2)}</td>
                  <td className="px-4 py-2 text-right">{row.quantity}</td>
                  <td className="px-4 py-2 text-right">${row.value.toFixed(2)}</td>
                  <td className="px-4 py-2 text-right">${row.capitalGains.toFixed(2)}</td>
                  <td className="px-4 py-2 text-right">${row.dividends.toFixed(2)}</td>
                  <td className="px-4 py-2 text-right text-green-400">${row.return.toFixed(2)}</td>
                </tr>
              ))}
              <tr className="bg-[#0d0d0d] font-semibold">
                <td className="px-4 py-2">Grand Total</td>
                <td></td>
                <td></td>
                <td className="px-4 py-2 text-right">${total.value.toFixed(2)}</td>
                <td className="px-4 py-2 text-right">${total.capitalGains.toFixed(2)}</td>
                <td className="px-4 py-2 text-right">${total.dividends.toFixed(2)}</td>
                <td className="px-4 py-2 text-right text-green-400">${total.return.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default PerformanceReport;
