import { useContext, useMemo } from 'react';
import { DashboardContext } from '../context/DashboardContext';

export function useDashboardData() {
  const { state } = useContext(DashboardContext);
  const transactions = state.transactions;
  
  const targetYear = parseInt(state.selectedMonth.split('-')[0]);
  const targetMonth = parseInt(state.selectedMonth.split('-')[1]) - 1;

  const currentMonthTransactions = useMemo(() => {
    return transactions.filter(t => {
      const d = new Date(t.date);
      return d.getFullYear() === targetYear && d.getMonth() === targetMonth;
    });
  }, [transactions, targetYear, targetMonth]);

  const summary = useMemo(() => {
    let income = 0;
    let expenses = 0;

    currentMonthTransactions.forEach(t => {
      if (t.type === 'income') income += Number(t.amount);
      if (t.type === 'expense') expenses += Number(t.amount);
    });

    return { totalBalance: income - expenses, income, expenses };
  }, [currentMonthTransactions]);

  const categoryData = useMemo(() => {
    const categories = {};
    currentMonthTransactions.forEach(t => {
      if (t.type === 'expense') {
        categories[t.category] = (categories[t.category] || 0) + Number(t.amount);
      }
    });
    const sorted = Object.keys(categories).map(key => ({
      name: key,
      value: categories[key]
    })).sort((a, b) => b.value - a.value); // Sort highest spending first

    // Limit to top 5 to prevent legend overflow on UI
    if (sorted.length > 5) {
      const top5 = sorted.slice(0, 5);
      const others = sorted.slice(5).reduce((acc, curr) => acc + curr.value, 0);
      top5.push({ name: 'Others', value: others });
      return top5;
    }
    return sorted;
  }, [currentMonthTransactions]);

  const trendData = useMemo(() => {
    // Sort transactions chronologically
    const sorted = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));
    let runningBalance = 0;
    const trendMap = {};

    sorted.forEach(t => {
      if (t.type === 'income') runningBalance += Number(t.amount);
      if (t.type === 'expense') runningBalance -= Number(t.amount);
      
      const d = new Date(t.date);
      if (d.getFullYear() === targetYear && d.getMonth() === targetMonth) {
        trendMap[t.date] = runningBalance;
      }
    });

    return Object.keys(trendMap).map(date => ({
      date,
      balance: trendMap[date]
    }));
  }, [transactions, targetYear, targetMonth]);
  
  const monthlyComparison = useMemo(() => {
    let currentExpense = 0;
    let prevExpense = 0;

    transactions.forEach(t => {
      if (t.type === 'expense') {
        const d = new Date(t.date);
        
        if (d.getFullYear() === targetYear && d.getMonth() === targetMonth) {
          currentExpense += Number(t.amount);
        } else if (
          (targetMonth > 0 && d.getFullYear() === targetYear && d.getMonth() === targetMonth - 1) ||
          (targetMonth === 0 && d.getFullYear() === targetYear - 1 && d.getMonth() === 11)
        ) {
          prevExpense += Number(t.amount);
        }
      }
    });

    const diff = currentExpense - prevExpense;
    const isHigher = diff > 0;
    
    return {
      currentExpense,
      prevExpense,
      diff: Math.abs(diff),
      isHigher
    };
  }, [transactions, targetYear, targetMonth]);
  
  const highestSpendingCategory = categoryData.length > 0 ? categoryData[0] : null;

  return { summary, categoryData, trendData, highestSpendingCategory, monthlyComparison, transactions: currentMonthTransactions, role: state.role, currency: state.currency };
}
