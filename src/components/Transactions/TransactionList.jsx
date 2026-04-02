import React, { useState } from 'react';
import { useDashboardData } from '../../hooks/useDashboardData';
import TransactionForm from './TransactionForm';
import { Plus, Trash2, ArrowUpRight, ArrowDownRight, Filter } from 'lucide-react';
import { DashboardContext } from '../../context/DashboardContext';

const TransactionList = () => {
  const { transactions, role } = useDashboardData();
  const { dispatch } = React.useContext(DashboardContext);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // all, income, expense
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          t.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || t.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleDelete = (id) => {
    dispatch({ type: 'DELETE_TRANSACTION', payload: id });
  };

  return (
    <div className="mt-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Transactions</h2>
        
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="pl-9 pr-8 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 max-w-[150px]"
          />

          {role === 'Admin' && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add New
            </button>
          )}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-700">
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Description</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Category</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-right">Amount</th>
                {role === 'Admin' && (
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-right">Actions</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={role === 'Admin' ? 5 : 4} className="py-8 text-center text-gray-500 dark:text-gray-400">
                    No transactions found.
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((t) => (
                  <tr key={t.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors group">
                    <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap">{t.date}</td>
                    <td className="py-4 px-6 text-sm font-medium text-gray-900 dark:text-white">{t.description}</td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                        {t.category}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                      <div className={`flex items-center justify-end gap-1 ${t.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-900 dark:text-white'}`}>
                        {t.type === 'income' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4 text-rose-500" />}
                        ${Number(t.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </div>
                    </td>
                    {role === 'Admin' && (
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => handleDelete(t.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <TransactionForm onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default TransactionList;
