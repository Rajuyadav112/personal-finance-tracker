import React, { useContext, useEffect, useState } from 'react';
import { Bell, Search, User, Moon, Sun } from 'lucide-react';
import { DashboardContext } from '../../context/DashboardContext';

const Header = () => {
  const { state, dispatch } = useContext(DashboardContext);
  const [isDark, setIsDark] = useState(
    localStorage.getItem('theme') === 'dark' || 
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const toggleRole = () => {
    dispatch({ type: 'SET_ROLE', payload: state.role === 'Admin' ? 'Viewer' : 'Admin' });
  };

  return (
    <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6 transition-colors duration-300">
      <div className="flex items-center flex-1">
        <div className="relative w-full max-w-md hidden md:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg leading-5 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all"
            placeholder="Search transactions..."
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        {/* Role Toggle Switch */}
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
          <button
            onClick={() => dispatch({ type: 'SET_ROLE', payload: 'Viewer' })}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
              state.role === 'Viewer' 
                ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm' 
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
            }`}
          >
            Viewer
          </button>
          <button
            onClick={() => dispatch({ type: 'SET_ROLE', payload: 'Admin' })}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
              state.role === 'Admin' 
                ? 'bg-white dark:bg-gray-600 text-indigo-600 dark:text-indigo-400 shadow-sm' 
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
            }`}
          >
            Admin
          </button>
        </div>

        <button 
          onClick={toggleTheme}
          className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>

        <button className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white dark:ring-gray-800" />
        </button>

        <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-medium text-sm overflow-hidden border-2 border-indigo-200 dark:border-indigo-800">
          <User className="h-4 w-4" />
        </div>
      </div>
    </header>
  );
};

export default Header;
