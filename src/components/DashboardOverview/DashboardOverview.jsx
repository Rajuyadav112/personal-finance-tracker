import React from 'react';
import { useDashboardData } from '../../hooks/useDashboardData';
import SummaryCards from './SummaryCards';
import BalanceTrendChart from './BalanceTrendChart';
import SpendingBreakdownChart from './SpendingBreakdownChart';

const DashboardOverview = () => {
  const { summary, trendData, categoryData, highestSpendingCategory } = useDashboardData();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h2>
        {highestSpendingCategory && (
          <div className="hidden sm:flex items-center gap-2 bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 px-4 py-2 rounded-lg text-sm font-medium">
            🔥 Highest Spend: {highestSpendingCategory.name} (${highestSpendingCategory.value})
          </div>
        )}
      </div>

      <SummaryCards summary={summary} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <BalanceTrendChart data={trendData} />
        </div>
        <div>
          <SpendingBreakdownChart data={categoryData} />
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
