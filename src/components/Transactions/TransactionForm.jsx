import React, { useState, useContext } from 'react';
import { X } from 'lucide-react';
import { DashboardContext } from '../../context/DashboardContext';

const TransactionForm = ({ onClose, initialData }) => {
  const { state, dispatch } = useContext(DashboardContext);
  
  const [formData, setFormData] = useState(initialData || {
    description: '',
    amount: '',
    category: '',
    type: 'expense',
    date: new Date().toISOString().split('T')[0]
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.description || !formData.amount || !formData.category) return;
    
    const newTransaction = {
      ...formData,
      id: Date.now().toString(),
      amount: parseFloat(formData.amount)
    };

    if (initialData) {
      dispatch({ type: 'EDIT_TRANSACTION', payload: { ...newTransaction, id: initialData.id } });
    } else {
      dispatch({ type: 'ADD_TRANSACTION', payload: newTransaction });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{initialData ? 'Edit' : 'Add'} Transaction</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  value="expense"
                  checked={formData.type === 'expense'}
                  onChange={handleChange}
                  className="text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Expense</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  value="income"
                  checked={formData.type === 'income'}
                  onChange={handleChange}
                  className="text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Income</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
            <input
              type="text"
              name="description"
              required
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white sm:text-sm"
              placeholder="e.g. Grocery Shop"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Amount</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">{state.currency}</span>
                </div>
                <input
                  type="number"
                  name="amount"
                  required
                  min="0"
                  step="0.01"
                  value={formData.amount}
                  onChange={handleChange}
                  className="w-full pl-7 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white sm:text-sm"
                  placeholder="0.00"
                />
              </div>
            </div>
            
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date</label>
              <input
                type="date"
                name="date"
                required
                value={formData.date}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white sm:text-sm [&::-webkit-calendar-picker-indicator]:dark:filter [&::-webkit-calendar-picker-indicator]:dark:invert"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
            <input
              type="text"
              name="category"
              required
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white sm:text-sm"
              placeholder="e.g. Food, Salary, Rent"
            />
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              {initialData ? 'Update' : 'Save'} Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;
