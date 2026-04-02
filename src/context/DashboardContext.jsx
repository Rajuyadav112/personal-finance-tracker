import React, { createContext, useReducer, useEffect } from 'react';
import { initialTransactions } from '../utils/mockData';

export const DashboardContext = createContext();

const initialState = {
  transactions: JSON.parse(localStorage.getItem('transactions')) || initialTransactions,
  role: localStorage.getItem('role') || 'Viewer', // 'Viewer' or 'Admin'
  currency: localStorage.getItem('currency') || '$',
  selectedMonth: new Date().toISOString().slice(0, 7),
};

function dashboardReducer(state, action) {
  switch (action.type) {
    case 'ADD_TRANSACTION':
      return { ...state, transactions: [action.payload, ...state.transactions] };
    case 'EDIT_TRANSACTION':
      return { ...state, transactions: state.transactions.map(t => t.id === action.payload.id ? action.payload : t) };
    case 'DELETE_TRANSACTION':
      return { ...state, transactions: state.transactions.filter(t => t.id !== action.payload) };
    case 'SET_ROLE':
      return { ...state, role: action.payload };
    case 'SET_CURRENCY':
      return { ...state, currency: action.payload };
    case 'SET_SELECTED_MONTH':
      return { ...state, selectedMonth: action.payload };
    default:
      return state;
  }
}

export const DashboardProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dashboardReducer, initialState);

  // Persist to local storage
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(state.transactions));
    localStorage.setItem('role', state.role);
    localStorage.setItem('currency', state.currency);
  }, [state.transactions, state.role, state.currency]);

  return (
    <DashboardContext.Provider value={{ state, dispatch }}>
      {children}
    </DashboardContext.Provider>
  );
};
