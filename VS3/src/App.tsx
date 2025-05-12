import React, { useState } from 'react';
import Navigation from './components/common/Navigation';
import Dashboard from './pages/Dashboard';
import Activity from './pages/Activity';
import Metrics from './pages/Metrics';
import Profile from './pages/Profile';
import Devices from './pages/Devices';

function App() {
  const [activePage, setActivePage] = useState('dashboard');

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />;
      case 'activity':
        return <Activity />;
      case 'metrics':
        return <Metrics />;
      case 'devices':
        return <Devices />;
      case 'profile':
        return <Profile />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex">
      <Navigation activePage={activePage} setActivePage={setActivePage} />
      
      <main className="flex-1 pt-16 sm:pt-6 pb-6 sm:ml-64 px-4 sm:px-6">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;