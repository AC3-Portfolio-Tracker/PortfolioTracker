import React from 'react';
import HoldingsChart from './components/HoldingsChart';
import CountryChart from './components/CountryChart';
import CurrencyChart from './components/CurrencyChart';
import ClassChart from './components/ClassChart';
import SectorChart from './components/SectorChart';
//import TotalHoldingsCard from './components/TotalHoldingsCard';

const HoldingsPage = () => {
  // Sample holdings data
  const holdings = [
    { symbol: 'AAPL', name: 'Apple Inc.', quantity: 10, price: 180, class: 'Equity', currency: 'EURO', country: 'Italy', sector: 'Technology' },
    { symbol: 'TSLA', name: 'Tesla Inc.', quantity: 5, price: 260, class: 'Equity', currency: 'USD', country: 'USA', sector: 'Automotive' },
    { symbol: 'BHP', name: 'BHP Group', quantity: 20, price: 50, class: 'Equity', currency: 'AUD', country: 'Australia', sector: 'Mining' },
    { symbol: 'CBA', name: 'Commonwealth Bank', quantity: 15, price: 100, class: 'Equity', currency: 'AUD', country: 'Australia', sector: 'Finance' },
    { symbol: 'GOVT', name: 'US Treasury Bond ETF', quantity: 30, price: 25, class: 'Fixed Income', currency: 'USD', country: 'USA', sector: 'Government' },
  ];

  // Aggregation helpers
  const aggregateByKey = (key) => {
    const map = {};
    holdings.forEach(item => {
      const total = item.price * item.quantity;
      map[item[key]] = (map[item[key]] || 0) + total;
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  };

  const classData = aggregateByKey('class');
  const currencyData = aggregateByKey('currency');
  const countryData = aggregateByKey('country');
  const sectorData = aggregateByKey('sector');

  return (
    <div style={{ padding: '20px' }}>
      <h2>Holdings Summary</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <ClassChart data={classData} />
        <CurrencyChart data={currencyData} />
        <CountryChart data={countryData} />
        <SectorChart data={sectorData} />
        {/*<TotalHoldingsCard holdings={holdings} />*/}
      </div>

      <h2>My Holdings</h2>
      <HoldingsChart /> {/* You can customize this if needed */}

      <table style={{ borderCollapse: 'collapse', width: '100%', marginTop: '20px' }}>
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
      </table>
    </div>
  );
};

const cellStyle = {
  border: '1px solid #ddd',
  padding: '8px',
  textAlign: 'center',
};

export default HoldingsPage;
