import React from 'react';

const AllTrades = () => {
  return (
    <div className="report-page">
      <h1>All Trades Report</h1>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Symbol</th>
            <th>Type</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {/* Dynamic rows will be rendered here once backend connects */}
        </tbody>
      </table>
    </div>
  );
};

export default AllTrades;
