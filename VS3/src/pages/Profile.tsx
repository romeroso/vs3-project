import React from 'react';
import { Edit2, LogOut, ChevronRight, Shield, Bell, Moon, Smartphone, Globe, HelpCircle } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { userProfile } from '../data/mockData';

const Profile: React.FC = () => {
  const heightInFeet = Math.floor(userProfile.height / 30.48);
  const heightInInches = Math.round((userProfile.height / 2.54) % 12);
  const heightDisplay = `${heightInFeet}'${heightInInches}"`;
  
  const settings = [
    { 
      group: 'Account', 
      items: [
        { name: 'Personal Information', icon: <Edit2 size={18} />, color: 'text-indigo-400 bg-indigo-500/10' },
        { name: 'Privacy', icon: <Shield size={18} />, color: 'text-green-400 bg-green-500/10' },
        { name: 'Notifications', icon: <Bell size={18} />, color: 'text-yellow-400 bg-yellow-500/10' }
      ] 
    },
    { 
      group: 'Preferences', 
      items: [
        { name: 'Appearance', icon: <Moon size={18} />, color: 'text-purple-400 bg-purple-500/10' },
        { name: 'Devices', icon: <Smartphone size={18} />, color: 'text-blue-400 bg-blue-500/10' },
        { name: 'Language', icon: <Globe size={18} />, color: 'text-pink-400 bg-pink-500/10' }
      ] 
    },
    { 
      group: 'Support', 
      items: [
        { name: 'Help Center', icon: <HelpCircle size={18} />, color: 'text-teal-400 bg-teal-500/10' }
      ] 
    }
  ];
  
  return (
    <div className="pb-24 sm:pb-0">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Profile</h1>
        <p className="text-gray-400">Manage your account and settings</p>
      </div>
      
      <Card className="p-6 mb-8">
        <div className="flex flex-col sm:flex-row items-center">
          <div className="h-24 w-24 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold mb-4 sm:mb-0">
            EN
          </div>
          
          <div className="sm:ml-6 text-center sm:text-left">
            <h2 className="text-xl font-bold text-white">Egg Nogs</h2>
            <p className="text-gray-400">Age: {userProfile.age} • {userProfile.gender}</p>
            
            <div className="flex flex-wrap justify-center sm:justify-start mt-2 gap-4">
              <div>
                <p className="text-xs text-gray-500">Height</p>
                <p className="text-sm text-white">{userProfile.height} cm ({heightDisplay})</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Weight</p>
                <p className="text-sm text-white">{userProfile.weight} kg</p>
              </div>
              <div className="ml-auto sm:ml-0">
                <Button 
                  variant="outline" 
                  size="sm"
                  icon={<Edit2 size={16} />}
                >
                  Edit Profile
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
      
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-4">Health Goals</h2>
        <Card className="p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-400">Daily Steps</p>
              <p className="text-xl font-semibold text-white mt-1">{userProfile.goals.dailySteps.toLocaleString()}</p>
            </div>
            
            <div className="p-4 bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-400">Sleep Hours</p>
              <p className="text-xl font-semibold text-white mt-1">{userProfile.goals.sleepHours} hours</p>
            </div>
            
            <div className="p-4 bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-400">Daily Calories</p>
              <p className="text-xl font-semibold text-white mt-1">{userProfile.goals.calories} kcal</p>
            </div>
            
            <div className="p-4 border border-dashed border-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-800 cursor-pointer transition-colors">
              <Button 
                variant="ghost" 
                icon={<Plus size={16} />}
              >
                Add Goal
              </Button>
            </div>
          </div>
        </Card>
      </div>
      
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">Settings</h2>
        <div className="space-y-6">
          {settings.map((group, idx) => (
            <Card key={idx} className="overflow-hidden">
              <div className="px-5 py-3 border-b border-gray-800 bg-gray-900">
                <h3 className="font-medium text-white">{group.group}</h3>
              </div>
              
              <div>
                {group.items.map((item, itemIdx) => (
                  <button
                    key={itemIdx}
                    className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center">
                      <div className={`p-2 rounded-md mr-3 ${item.color}`}>
                        {item.icon}
                      </div>
                      <span className="text-white">{item.name}</span>
                    </div>
                    <ChevronRight size={18} className="text-gray-500" />
                  </button>
                ))}
              </div>
            </Card>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <Button 
            variant="outline" 
            icon={<LogOut size={16} />}
          >
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;