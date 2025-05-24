// import React from 'react';
// import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

// const COLORS = ['#4CAF50', '#F44336', '#2196F3', '#FF9800', '#9C27B0'];

// const CountryChart = ({ data }) => {
//   return (
//     <div>
//       <h3>By Country</h3>
//       <PieChart width={300} height={250}>
//         <Pie
//           data={data}
//           dataKey="value"
//           nameKey="name"
//           cx="50%"
//           cy="50%"
//           outerRadius={80}
//           fill="#8884d8"
//           label
//         >
//           {data.map((entry, index) => (
//             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//           ))}
//         </Pie>
//         <Tooltip />
//         <Legend verticalAlign="bottom" height={36} />
//       </PieChart>
//     </div>
//   );
// };

// export default CountryChart;

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';

const COLORS = ['#4CAF50', '#F44336', '#2196F3', '#FF9800', '#9C27B0'];

const CountryChart = ({ data }) => {
  return (
    <div>
      <h3 style={{ textAlign: 'center' }}>By Code</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 30 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="value"
            name="Holdings by Code"
            fill={COLORS[0]}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CountryChart;
