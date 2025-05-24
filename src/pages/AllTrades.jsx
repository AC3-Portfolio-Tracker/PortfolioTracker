import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const AllTrades = () => {
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrades = async () => {
      setLoading(true);
      const { data: userData } = await supabase.auth.getUser();
      const user = userData?.user;

      if (!user) {
        alert("You must be logged in.");
        return;
      }

      const { data, error } = await supabase
        .from("activities")
        .select(`
          id, type, date, quantity, price, fees, total_amount, user_id,
          securities (
            symbol
          )
        `)
        .in("type", ["Buy", "Sell"])
        .eq("user_id", user.id)
        .order("date", { ascending: false });

      if (error) {
        console.error("Supabase fetch error:", error);
        setLoading(false);
        return;
      }

      const formatted = data.map((t) => {
        const qty = t.quantity;
        const value = t.total_amount || (qty * t.price);
        return {
          symbol: t.securities?.symbol || "N/A",
          date: new Date(t.date).toLocaleDateString(),
          type: t.type,
          qty,
          price: t.price,
          brokerage: t.fees || 0,
          exchRate: "1.00 AUD/AUD", // Static for now
          value,
        };
      });

      setTrades(formatted);
      setLoading(false);
    };

    fetchTrades();
  }, []);

  return (
    <div className="p-8 text-white">
      <h2 className="text-3xl font-bold mb-6">All Trades</h2>
      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full border-separate border-spacing-x-6 border-spacing-y-2 text-sm bg-[#1e1e1e]">
            <thead className="bg-gray-100 text-xs text-gray-700 uppercase">
              <tr>
                <th className="px-4 py-2 text-left">ASX</th>
                <th className="px-4 py-2 text-center">Date</th>
                <th className="px-4 py-2 text-center">Type</th>
                <th className="px-4 py-2 text-right">Qty</th>
                <th className="px-4 py-2 text-right">Price</th>
                <th className="px-4 py-2 text-right">Brokerage</th>
                <th className="px-4 py-2 text-center">Exch. Rate</th>
                <th className="px-4 py-2 text-right">Value</th>
              </tr>
            </thead>
            <tbody>
              {trades.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center text-gray-400 py-4">
                    No trades found.
                  </td>
                </tr>
              ) : (
                trades.map((t, i) => (
                  <tr key={i} className="hover:bg-gray-800 transition">
                    <td className="px-4 py-2 text-blue-400 font-medium">{t.symbol}</td>
                    <td className="px-4 py-2 text-center">{t.date}</td>
                    <td className={`px-4 py-2 text-center font-semibold ${t.type === 'Sell' ? 'text-red-400' : 'text-green-400'}`}>{t.type}</td>
                    <td className="px-4 py-2 text-right">{t.qty}</td>
                    <td className="px-4 py-2 text-right">${t.price?.toFixed(2)}</td>
                    <td className="px-4 py-2 text-right">${t.brokerage?.toFixed(2)}</td>
                    <td className="px-4 py-2 text-center">{t.exchRate}</td>
                    <td className={`px-4 py-2 text-right ${t.value < 0 ? 'text-red-400' : 'text-white'}`}>
                      ${t.value.toFixed(2)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllTrades;
