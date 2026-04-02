import React from 'react';
import { ArrowUpRight, ArrowDownRight, DollarSign } from 'lucide-react';

const SummaryCards = ({ summary, currency }) => {
  const cards = [
    {
      title: 'Total Balance',
      amount: summary.totalBalance,
      icon: DollarSign,
      color: 'text-indigo-600 dark:text-indigo-400',
      bgColor: 'bg-indigo-100 dark:bg-indigo-900/50',
    },
    {
      title: 'Total Income',
      amount: summary.income,
      icon: ArrowUpRight,
      color: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-emerald-100 dark:bg-emerald-900/50',
    },
    {
      title: 'Total Expenses',
      amount: summary.expenses,
      icon: ArrowDownRight,
      color: 'text-rose-600 dark:text-rose-400',
      bgColor: 'bg-rose-100 dark:bg-rose-900/50',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      {cards.map((card, idx) => (
        <div key={idx} className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">{card.title}</h3>
            <div className={`p-2 rounded-xl ${card.bgColor}`}>
              <card.icon className={`w-5 h-5 ${card.color}`} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              {currency}{card.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
