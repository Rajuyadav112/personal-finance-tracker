import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const COLORS = ['#4f46e5', '#ec4899', '#f59e0b', '#10b981', '#6366f1'];

const SpendingBreakdownChart = ({ data }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm h-96">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Spending Breakdown</h3>
      {data.length === 0 ? (
        <div className="h-full flex items-center justify-center text-gray-500">No expenses yet</div>
      ) : (
        <ResponsiveContainer width="100%" height="85%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => `$${value}`}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default SpendingBreakdownChart;
