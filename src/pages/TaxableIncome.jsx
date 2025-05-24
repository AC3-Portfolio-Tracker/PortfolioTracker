import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const TaxableIncome = () => {
  const [incomeRows, setIncomeRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDividendData = async () => {
      setLoading(true);

      const { data: userData, error: userError } = await supabase.auth.getUser();
      const user = userData?.user;

      if (!user) {
        console.error("User not logged in.");
        return;
      }

      const { data, error } = await supabase
        .from("activities")
        .select(`
          id, date, total_amount, quantity, price, notes, security_id,
          securities (symbol)
        `)
        .eq("type", "Dividend")
        .eq("user_id", user.id);

      if (error) {
        console.error("Error fetching dividend data:", error);
        setLoading(false);
        return;
      }

      const formatted = data.map((row) => {
        const total = parseFloat(row.total_amount ?? (row.quantity * row.price) ?? 0);
        const franking = parseFloat(row.notes?.match(/\d+(\.\d+)?/)?.[0] ?? 0);
        return {
          holding: row.securities?.symbol || row.security_id,
          paidDate: new Date(row.date).toLocaleDateString("en-AU", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
          totalIncome: total,
          franked: total,
          unfranked: 0,
          withholdingTax: 0,
          frankingCredits: franking,
          grossIncome: total + franking,
        };
      });

      setIncomeRows(formatted);
      setLoading(false);
    };

    fetchDividendData();
  }, []);

  const total = (key) => incomeRows.reduce((sum, r) => sum + r[key], 0);

  return (
    <div className="p-8 text-white">
      <h2 className="text-3xl font-bold mb-6">Taxable Income</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="min-w-full text-left border-separate border-spacing-x-4 border-spacing-y-2">
            <thead className="bg-gray-100 text-sm uppercase text-gray-700">
              <tr>
                <th className="px-4 py-3">Holding</th>
                <th className="px-4 py-3">Paid Date</th>
                <th className="px-4 py-3">Total Income</th>
                <th className="px-4 py-3">Franked</th>
                <th className="px-4 py-3">Unfranked</th>
                <th className="px-4 py-3">Withholding Tax</th>
                <th className="px-4 py-3">Franking Credits</th>
                <th className="px-4 py-3">Gross Income</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {incomeRows.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-4 text-gray-400">
                    No income data available
                  </td>
                </tr>
              ) : (
                incomeRows.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-800">
                    <td className="px-4 py-2 text-blue-400 font-medium">{row.holding}</td>
                    <td className="px-4 py-2">{row.paidDate}</td>
                    <td className="px-4 py-2">${row.totalIncome.toFixed(2)}</td>
                    <td className="px-4 py-2">${row.franked.toFixed(2)}</td>
                    <td className="px-4 py-2">${row.unfranked.toFixed(2)}</td>
                    <td className="px-4 py-2">${row.withholdingTax.toFixed(2)}</td>
                    <td className="px-4 py-2">${row.frankingCredits.toFixed(2)}</td>
                    <td className="px-4 py-2 text-green-400 font-semibold">${row.grossIncome.toFixed(2)}</td>
                  </tr>
                ))
              )}
            </tbody>
            {incomeRows.length > 0 && (
              <tfoot className="text-sm font-semibold text-white border-t border-gray-600">
                <tr className="bg-[#0d0d0d]">
                  <td className="px-4 py-2">Grand total</td>
                  <td></td>
                  <td className="px-4 py-2">${total("totalIncome").toFixed(2)}</td>
                  <td className="px-4 py-2">${total("franked").toFixed(2)}</td>
                  <td className="px-4 py-2">${total("unfranked").toFixed(2)}</td>
                  <td className="px-4 py-2">${total("withholdingTax").toFixed(2)}</td>
                  <td className="px-4 py-2">${total("frankingCredits").toFixed(2)}</td>
                  <td className="px-4 py-2 text-green-400">${total("grossIncome").toFixed(2)}</td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      )}
    </div>
  );
};

export default TaxableIncome;
