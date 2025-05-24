import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const HistoricCost = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHistoricCost = async () => {
    setLoading(true);

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      console.error("User not authenticated:", authError);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from('activities')
      .select(`
        *,
        securities:security_id (symbol)
      `)
      .eq('user_id', user.id)
      .eq('type', 'Buy');

    if (error) {
      console.error("Supabase fetch error:", error);
      setLoading(false);
      return;
    }

    const grouped = {};

    data.forEach((row) => {
      const symbol = row.securities?.symbol || row.security_id;
      const qty = row.quantity || 0;
      const price = row.price || 0;
      const fees = row.fees || 0;
      const cost = (qty * price) + fees;

      if (!grouped[symbol]) {
        grouped[symbol] = {
          symbol,
          allocation: 'FIFO',
          openingBalance: 0,
          openingQty: 0,
          openingMarketValue: 0, // leave as 0 for now
          purchases: 0,
        };
      }

      grouped[symbol].openingBalance += cost;
      grouped[symbol].openingQty += qty;
      grouped[symbol].purchases += cost;
    });

    setRows(Object.values(grouped));
    setLoading(false);
  };

  useEffect(() => {
    fetchHistoricCost();
  }, []);

  const totalOpening = rows.reduce((sum, r) => sum + r.openingBalance, 0);
  const totalQty = rows.reduce((sum, r) => sum + r.openingQty, 0);
  const totalPurchases = rows.reduce((sum, r) => sum + r.purchases, 0);

  return (
    <div className="p-8 text-white">
      <h2 className="text-3xl font-bold mb-6">Historic Cost</h2>
      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full border-separate border-spacing-x-6 border-spacing-y-2 text-sm bg-[#1e1e1e]">
            <thead className="bg-gray-100 text-xs text-gray-700 uppercase">
              <tr>
                <th className="px-4 py-2 text-left">ASX</th>
                <th className="px-4 py-2 text-center">Allocation Method</th>
                <th className="px-4 py-2 text-right">Opening Balance</th>
                <th className="px-4 py-2 text-right">Opening Market Value</th>
                <th className="px-4 py-2 text-right">Opening Quantity</th>
                <th className="px-4 py-2 text-right">Purchases</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-400">
                    No historic cost data found.
                  </td>
                </tr>
              ) : (
                rows.map((r, i) => (
                  <tr key={i} className="hover:bg-gray-800">
                    <td className="px-4 py-2 text-blue-400 font-medium">{r.symbol}</td>
                    <td className="px-4 py-2 text-center">{r.allocation}</td>
                    <td className="px-4 py-2 text-right">${r.openingBalance.toFixed(2)}</td>
                    <td className="px-4 py-2 text-right">$0.00</td> {/* optional */}
                    <td className="px-4 py-2 text-right">{r.openingQty}</td>
                    <td className="px-4 py-2 text-right">${r.purchases.toFixed(2)}</td>
                  </tr>
                ))
              )}
            </tbody>
            {rows.length > 0 && (
              <tfoot className="text-sm font-semibold text-white border-t border-gray-600">
                <tr className="bg-[#0d0d0d]">
                  <td className="px-4 py-2">Total</td>
                  <td></td>
                  <td className="px-4 py-2 text-right">${totalOpening.toFixed(2)}</td>
                  <td className="px-4 py-2 text-right">$0.00</td>
                  <td className="px-4 py-2 text-right">{totalQty}</td>
                  <td className="px-4 py-2 text-right">${totalPurchases.toFixed(2)}</td>
                </tr>
                <tr className="bg-[#161616]">
                  <td className="px-4 py-2 font-bold text-white">Grand total</td>
                  <td></td>
                  <td className="px-4 py-2 text-right font-bold">${totalOpening.toFixed(2)}</td>
                  <td className="px-4 py-2 text-right font-bold">$0.00</td>
                  <td className="px-4 py-2 text-right font-bold">{totalQty}</td>
                  <td className="px-4 py-2 text-right font-bold text-green-400">${totalPurchases.toFixed(2)}</td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      )}
    </div>
  );
};

export default HistoricCost;
