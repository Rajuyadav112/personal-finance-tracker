import { useContext, useMemo } from 'react';
import { DashboardContext } from '../context/DashboardContext';

export function useDashboardData() {
  const { state } = useContext(DashboardContext);
  const transactions = state.transactions;

  const summary = useMemo(() => {
    let income = 0;
    let expenses = 0;

    transactions.forEach(t => {
      if (t.type === 'income') income += Number(t.amount);
      if (t.type === 'expense') expenses += Number(t.amount);
    });

    return { totalBalance: income - expenses, income, expenses };
  }, [transactions]);

  const categoryData = useMemo(() => {
    const categories = {};
    transactions.forEach(t => {
      if (t.type === 'expense') {
        categories[t.category] = (categories[t.category] || 0) + Number(t.amount);
      }
    });
    return Object.keys(categories).map(key => ({
      name: key,
      value: categories[key]
    })).sort((a, b) => b.value - a.value); // Sort highest spending first
  }, [transactions]);

  const trendData = useMemo(() => {
    // Sort transactions chronologically
    const sorted = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));
    let runningBalance = 0;
    const trendMap = {};

    sorted.forEach(t => {
      if (t.type === 'income') runningBalance += Number(t.amount);
      if (t.type === 'expense') runningBalance -= Number(t.amount);
      trendMap[t.date] = runningBalance;
    });

    return Object.keys(trendMap).map(date => ({
      date,
      balance: trendMap[date]
    }));
  }, [transactions]);
  
  const highestSpendingCategory = categoryData.length > 0 ? categoryData[0] : null;

  return { summary, categoryData, trendData, highestSpendingCategory, transactions, role: state.role };
}
