import React, { useState } from 'react';
import { Activity, BarChart2, Home, Menu, User, X, Smartphone } from 'lucide-react';

interface NavigationProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activePage, setActivePage }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', name: 'Dashboard', icon: <Home size={20} /> },
    { id: 'activity', name: 'Activity', icon: <Activity size={20} /> },
    { id: 'metrics', name: 'Metrics', icon: <BarChart2 size={20} /> },
    { id: 'devices', name: 'Devices', icon: <Smartphone size={20} /> },
    { id: 'profile', name: 'Profile', icon: <User size={20} /> },
  ];

  return (
    <>
      {/* Mobile Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 flex justify-around py-2 sm:hidden z-10">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActivePage(item.id)}
            className={`flex flex-col items-center justify-center p-2 rounded-md transition-colors ${
              activePage === item.id 
                ? 'text-indigo-400' 
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            {item.icon}
            <span className="text-xs mt-1">{item.name}</span>
          </button>
        ))}
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden sm:flex flex-col fixed h-full w-64 bg-gray-900 border-r border-gray-800 p-4">
        <div className="flex items-center space-x-3 mb-8">
          <Activity size={28} className="text-indigo-400" />
          <h1 className="text-xl font-bold text-white">MyHealth</h1>
        </div>
        
        <nav className="flex-1">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActivePage(item.id)}
                  className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors ${
                    activePage === item.id
                      ? 'bg-indigo-500/10 text-indigo-400'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="mt-auto pt-4 border-t border-gray-800">
          <div className="flex items-center px-4 py-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold">
              AJ
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">EggNogs</p>
              <p className="text-xs text-gray-400">View Profile</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <header className="sm:hidden fixed top-0 left-0 right-0 bg-gray-900 border-b border-gray-800 px-4 py-3 flex items-center justify-between z-10">
        <div className="flex items-center space-x-2">
          <Activity size={24} className="text-indigo-400" />
          <h1 className="text-lg font-bold text-white">MyHealth</h1>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-20 sm:hidden">
          <div className="flex flex-col h-full bg-gray-900 w-3/4 max-w-xs p-4">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-2">
                <Activity size={24} className="text-indigo-400" />
                <h1 className="text-lg font-bold text-white">MyHealth</h1>
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-md text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>
            
            <nav>
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        setActivePage(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors ${
                        activePage === item.id
                          ? 'bg-indigo-500/10 text-indigo-400'
                          : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                      }`}
                    >
                      <span className="mr-3">{item.icon}</span>
                      <span>{item.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
            
            <div className="mt-auto pt-4 border-t border-gray-800">
              <div className="flex items-center px-4 py-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                  AJ
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">EggNogs</p>
                  <p className="text-xs text-gray-400">View Profile</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;