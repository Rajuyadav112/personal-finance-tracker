import React, { useContext } from 'react';
import { DashboardContext } from '../../context/DashboardContext';
import { useDashboardData } from '../../hooks/useDashboardData';
import { TrendingUp, TrendingDown } from 'lucide-react';
import SummaryCards from './SummaryCards';
import BalanceTrendChart from './BalanceTrendChart';
import SpendingBreakdownChart from './SpendingBreakdownChart';

const DashboardOverview = () => {
  const { state, dispatch } = useContext(DashboardContext);
  const { summary, trendData, categoryData, highestSpendingCategory, monthlyComparison, currency } = useDashboardData();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h2>
        
        <div className="flex flex-col sm:flex-row gap-3 items-center">
          <input 
            type="month" 
            value={state.selectedMonth} 
            onChange={(e) => dispatch({ type: 'SET_SELECTED_MONTH', payload: e.target.value })}
            className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 [&::-webkit-calendar-picker-indicator]:dark:filter [&::-webkit-calendar-picker-indicator]:dark:invert"
          />
          {monthlyComparison && (
            <div className={`hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${monthlyComparison.isHigher ? 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300' : 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'}`}>
              {monthlyComparison.isHigher ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              {monthlyComparison.isHigher ? 'Up' : 'Down'} {currency}{monthlyComparison.diff} from last month
            </div>
          )}
          {highestSpendingCategory && (
            <div className="hidden sm:flex items-center gap-2 bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 px-4 py-2 rounded-lg text-sm font-medium">
              🔥 Highest Spend: {highestSpendingCategory.name} ({currency}{highestSpendingCategory.value})
            </div>
          )}
        </div>
      </div>

      <SummaryCards summary={summary} currency={currency} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <BalanceTrendChart data={trendData} currency={currency} />
        </div>
        <div>
          <SpendingBreakdownChart data={categoryData} currency={currency} />
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
