<<<<<<< HEAD
# Financial Dashboard

A modern, responsive financial dashboard built for users to track their financial activity. It provides a visual overview of income, expenses, and insights.

## Technologies Used
- React (Vite)
- Tailwind CSS (v4)
- Recharts
- Lucide React

## Features
- **Dashboard Overview**: See Total Balance, Total Income, and Total Expenses at a glance.
- **Visualizations**: 
  - A Balance Trend line chart to track balance over time.
  - A Spending Breakdown pie chart to analyze where money is going.
- **Transactions Management**:
  - Filter transactions by type (All, Income, Expense).
  - Search transactions by description or category.
- **Role-Based Access**:
  - Toggle between **Viewer** and **Admin**. 
  - **Admin** role enables adding and deleting transactions.
- **Dark Mode**: System-aware and manually toggleable Dark/Light modes.
- **Data Persistence**: Uses `localStorage` to keep transaction data persistent across reloads.

## Getting Started

1. Navigate to the project directory:
   ```bash
   cd dashboard
   ```
2. Install dependencies (if you haven't already):
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## State Management
State is managed globally using React's `Context API` combined with `useReducer` for robust, action-based state updates (like Redux). A custom `useDashboardData` hook retrieves context data and computes derived analytics (Totals, Trends, Spending categories) seamlessly.
=======
# personal-finance-tracker
Personal Finance Tracker — built with Vite, React, Recharts, and Tailwind CSS. Includes dark mode, dynamic searching/filtering, and mocked RBAC functionality.
>>>>>>> 2147a1b57b011758ebbf51305a2c76491e2a0cea
