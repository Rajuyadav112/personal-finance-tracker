import React from 'react';
import { DashboardProvider } from './context/DashboardContext';
import Layout from './components/Layout/Layout';
import DashboardOverview from './components/DashboardOverview/DashboardOverview';
import TransactionList from './components/Transactions/TransactionList';

function App() {
  return (
    <DashboardProvider>
      <Layout>
        <DashboardOverview />
        <TransactionList />
      </Layout>
    </DashboardProvider>
  );
}

export default App;
