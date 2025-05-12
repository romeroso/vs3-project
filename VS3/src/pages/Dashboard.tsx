import React from 'react';
import { formatDate } from '../utils/dateUtils';
import ActivitySummary from '../components/dashboard/ActivitySummary';
import SleepChart from '../components/dashboard/SleepChart';
import NutritionDonut from '../components/dashboard/NutritionDonut';
import VitalStats from '../components/dashboard/VitalStats';
import { activityData, nutritionData, sleepData, vitalStats } from '../data/mockData';

const Dashboard: React.FC = () => {
  const today = new Date();
  
  return (
    <div className="pb-24 sm:pb-0">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400">{formatDate(today)}</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ActivitySummary data={activityData} />
        <VitalStats data={vitalStats} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SleepChart data={sleepData} />
        <NutritionDonut data={nutritionData} />
      </div>
    </div>
  );
};

export default Dashboard;