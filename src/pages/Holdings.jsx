<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import CountryChart from "../components/CountryChart";
import CurrencyChart from "../components/CurrencyChart";
import ClassChart from "../components/ClassChart";
import SectorChart from "../components/SectorChart";

const Holdings = () => {
  const [transactions, setTransactions] = useState([]);
  const [total, setTotal] = useState(0);

  const loadTransactions = async () => {
    try {
      const { data, error } = await supabase
        .from("activities")
        .select(
          `
            *,
            securities:security_id (
              symbol,
              name,
              exchange,
              currency
            ),
            brokers:broker_id (
              name
            )
          `
        )
        .order("date", { ascending: false });

      if (error) throw error;

      const formattedTransactions = data.map((tx) => ({
        id: tx.id,
        type: tx.type,
        date: new Date(tx.date).toLocaleDateString(),
        market: tx.securities?.exchange || "",
        code: tx.securities?.symbol || "",
        securityName: tx.securities?.name || tx.securities?.symbol || "",
        quantity: tx.quantity,
        price: tx.price,
        brokerage: tx.fees,
        currency: tx.currency,
        totalAmount: tx.total_amount,
        broker: tx.brokers?.name || "",
        notes: tx.notes,
      }));

      const totalAmountSum = formattedTransactions.reduce(
        (sum, tx) => sum + (tx.totalAmount || 0),
        0
      );

      setTotal(totalAmountSum);

      setTransactions(formattedTransactions);
    } catch (error) {
      console.error("Error loading transactions:", error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await loadTransactions();
      } catch (error) {
        console.error("Error in initial data loading:", error);
      }
    };

    fetchData();
    return () => {};
  }, []);

  // Aggregation helpers
  const aggregateByKey = (key) => {
    const map = {};
    transactions.forEach((item) => {
      const total = item.price * item.quantity;
      map[item[key]] = (map[item[key]] || 0) + total;
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  };

  const classData = aggregateByKey("market");
  const currencyData = aggregateByKey("currency");
  const countryData = aggregateByKey("code");
  const sectorData = aggregateByKey("broker");

  return (
    <div style={{ padding: "20px" }}>
      <h2>Holdings Summary</h2>

      <h1>CASH: {total.toFixed(2)}</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <ClassChart data={classData} />
        <CurrencyChart data={currencyData} />
        <CountryChart data={countryData} />
        <SectorChart data={sectorData} />
      </div>

      {/* <table style={{ borderCollapse: 'collapse', width: '100%', marginTop: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={cellStyle}>Symbol</th>
            <th style={cellStyle}>Company</th>
            <th style={cellStyle}>Quantity</th>
            <th style={cellStyle}>Price</th>
            <th style={cellStyle}>Total Value</th>
          </tr>
        </thead>
        <tbody>
          {holdings.map((stock, index) => (
            <tr key={index}>
              <td style={cellStyle}>{stock.symbol}</td>
              <td style={cellStyle}>{stock.name}</td>
              <td style={cellStyle}>{stock.quantity}</td>
              <td style={cellStyle}>${stock.price.toFixed(2)}</td>
              <td style={cellStyle}>${(stock.quantity * stock.price).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
};

const cellStyle = {
  border: "1px solid #ddd",
  padding: "8px",
  textAlign: "center",
};

export default Holdings;
=======
import React, { useState, useEffect } from 'react';
import { supabase } from "../lib/supabase";
import CountryChart from '../components/CountryChart';
import CurrencyChart from '../components/CurrencyChart';
import ClassChart from '../components/ClassChart';
import SectorChart from '../components/SectorChart';

const Holdings = () => {

  const [transactions, setTransactions] = useState([]);
  const [total, setTotal] = useState(0);

    const loadTransactions = async () => {
      try {
        const { data, error } = await supabase
          .from("activities")
          .select(`
            *,
            securities:security_id (
              symbol,
              name,
              exchange,
              currency
            ),
            brokers:broker_id (
              name
            )
          `)
          .order("date", { ascending: false });
  
        if (error) throw error;
        
        const formattedTransactions = data.map(tx => ({
          id: tx.id,
          type: tx.type,
          date: new Date(tx.date).toLocaleDateString(),
          market: tx.securities?.exchange || "",
          code: tx.securities?.symbol || "",
          securityName: tx.securities?.name || tx.securities?.symbol || "",
          quantity: tx.quantity,
          price: tx.price,
          brokerage: tx.fees,
          currency: tx.currency,
          totalAmount: tx.total_amount,
          broker: tx.brokers?.name || "",
          notes: tx.notes,
        }));
      
        const totalAmountSum = formattedTransactions.reduce((sum, tx) => sum + (tx.totalAmount || 0), 0);
        
        setTotal(totalAmountSum);

        setTransactions(formattedTransactions);
      } catch (error) {
        console.error("Error loading transactions:", error);
        throw error;
      }
    };
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          await loadTransactions();
        } catch (error) {
          console.error("Error in initial data loading:", error);
        }
      };
  
      fetchData();
      return () => {
      };
    }, []);

  // Aggregation helpers
  const aggregateByKey = (key) => {
    const map = {};
    transactions.forEach(item => {
      const total = item.price * item.quantity;
      map[item[key]] = (map[item[key]] || 0) + total;
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  };

  const classData = aggregateByKey('market');
  const currencyData = aggregateByKey('currency');
  const countryData = aggregateByKey('code');
  const sectorData = aggregateByKey('broker');

  return (
    <div style={{ padding: '20px' }}>
      <h2>Holdings Summary</h2>

      <h1>CASH: {total.toFixed(2)}</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '20px', marginBottom: '30px' }}>
        <ClassChart data={classData} />
        <CurrencyChart data={currencyData} />
        <CountryChart data={countryData} />
        <SectorChart data={sectorData} />
      </div>

      {/* <table style={{ borderCollapse: 'collapse', width: '100%', marginTop: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={cellStyle}>Symbol</th>
            <th style={cellStyle}>Company</th>
            <th style={cellStyle}>Quantity</th>
            <th style={cellStyle}>Price</th>
            <th style={cellStyle}>Total Value</th>
          </tr>
        </thead>
        <tbody>
          {holdings.map((stock, index) => (
            <tr key={index}>
              <td style={cellStyle}>{stock.symbol}</td>
              <td style={cellStyle}>{stock.name}</td>
              <td style={cellStyle}>{stock.quantity}</td>
              <td style={cellStyle}>${stock.price.toFixed(2)}</td>
              <td style={cellStyle}>${(stock.quantity * stock.price).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
};

const cellStyle = {
  border: '1px solid #ddd',
  padding: '8px',
  textAlign: 'center',
};

export default Holdings;
>>>>>>> my-backup
