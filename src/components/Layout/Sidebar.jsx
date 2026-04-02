import React from 'react';
import { LayoutDashboard, Receipt, PieChart, BarChart3 } from 'lucide-react';

const navItems = [
  { name: 'Overview', icon: LayoutDashboard, active: true },
  { name: 'Transactions', icon: Receipt, active: false },
  { name: 'Insights', icon: PieChart, active: false },
  { name: 'Reports', icon: BarChart3, active: false },
];

const Sidebar = () => {
  return (
    <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 hidden md:flex flex-col transition-colors duration-300">
      <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
          <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center">
            <span className="font-bold text-xl">F</span>
          </div>
          <span className="text-xl font-bold text-gray-900 dark:text-white">FinDash</span>
        </div>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <a
            key={item.name}
            href="#"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
              item.active
                ? 'bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 font-medium'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            <item.icon className={`w-5 h-5 ${item.active ? 'text-indigo-600 dark:text-indigo-400' : ''}`} />
            {item.name}
          </a>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-4 text-white shadow-lg shadow-indigo-500/20">
          <h4 className="font-semibold text-sm mb-1">Upgrade to Pro</h4>
          <p className="text-xs text-indigo-100 mb-3">Get advanced analytics and reports.</p>
          <button className="w-full bg-white text-indigo-600 text-sm font-medium py-1.5 rounded-lg hover:bg-indigo-50 transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
