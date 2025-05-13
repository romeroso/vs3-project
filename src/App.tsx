import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Navigation from './components/common/Navigation';
import Dashboard from './pages/Dashboard';
import Activity from './pages/Activity';
import Metrics from './pages/Metrics';
import Profile from './pages/Profile';
import Devices from './pages/Devices';
import AuthForm from './components/auth/AuthForm';
import { supabase } from './lib/supabase';

function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <AuthForm onSuccess={() => {}} />
        <Toaster position="top-center" />
      </div>
    );
  }

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
      <Toaster position="top-center" />
    </div>
  );
}

export default App;