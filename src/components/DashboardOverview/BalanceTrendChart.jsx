import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const BalanceTrendChart = ({ data }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm h-96">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Balance Trend</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" className="dark:stroke-gray-700" />
          <XAxis 
            dataKey="date" 
            tickLine={false} 
            axisLine={false} 
            tick={{ fill: '#6b7280', fontSize: 12 }} 
            dy={10} 
          />
          <YAxis 
            tickLine={false} 
            axisLine={false} 
            tick={{ fill: '#6b7280', fontSize: 12 }} 
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip 
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            labelStyle={{ color: '#4b5563', fontWeight: 600, marginBottom: '4px' }}
            itemStyle={{ color: '#4f46e5', fontWeight: 500 }}
          />
          <Line 
            type="monotone" 
            dataKey="balance" 
            stroke="#4f46e5" 
            strokeWidth={3}
            dot={{ r: 4, fill: '#4f46e5', strokeWidth: 2, stroke: '#fff' }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BalanceTrendChart;
