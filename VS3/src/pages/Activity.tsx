import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Expand, Info, MoreHorizontal, Timer, Zap } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import ProgressRing from '../components/common/ProgressRing';
import { activityData } from '../data/mockData';
import { formatDate } from '../utils/dateUtils';

const Activity: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const handlePrevDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 1);
    setSelectedDate(newDate);
  };
  
  const handleNextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 1);
    setSelectedDate(newDate);
  };
  
  // Mock workout data
  const workouts = [
    {
      id: '1',
      type: 'Running',
      duration: 32,
      distance: 5.2,
      calories: 320,
      time: '7:30 AM',
      icon: <Zap size={18} />
    },
    {
      id: '2',
      type: 'Yoga',
      duration: 45,
      calories: 180,
      time: '6:15 PM',
      icon: <Timer size={18} />
    }
  ];
  
  // Fake steps data throughout the day
  const hourlySteps = Array.from({ length: 24 }, (_, i) => {
    // More steps during day, fewer at night
    let baseSteps = 0;
    if (i >= 7 && i <= 22) {
      baseSteps = Math.floor(Math.random() * 1000) + 200;
      if (i >= 12 && i <= 14) baseSteps += 500; // More during lunch
      if (i >= 17 && i <= 19) baseSteps += 700; // More during evening
    } else {
      baseSteps = Math.floor(Math.random() * 100);
    }
    return {
      hour: i,
      steps: baseSteps
    };
  });
  
  const totalSteps = hourlySteps.reduce((acc, hour) => acc + hour.steps, 0);
  const stepsProgress = Math.round((totalSteps / activityData.goal.steps) * 100);
  
  const maxSteps = Math.max(...hourlySteps.map(h => h.steps));
  
  return (
    <div className="pb-24 sm:pb-0">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Activity</h1>
          <p className="text-gray-400">{formatDate(selectedDate)}</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handlePrevDay}
            icon={<ChevronLeft size={18} />}
          />
          <Button 
            variant="outline" 
            size="sm" 
            icon={<Calendar size={18} />}
          >
            Today
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleNextDay}
            icon={<ChevronRight size={18} />}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <Card className="p-5 flex items-center">
          <ProgressRing 
            progress={stepsProgress} 
            size={100} 
            strokeWidth={10}
            color="#6366F1"
          >
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-white">{totalSteps.toLocaleString()}</span>
            </div>
          </ProgressRing>
          
          <div className="ml-4">
            <h3 className="text-lg font-medium text-white">Steps</h3>
            <p className="text-sm text-gray-400">Goal: {activityData.goal.steps.toLocaleString()}</p>
            <p className="text-sm text-indigo-400 mt-1">{stepsProgress}% completed</p>
          </div>
        </Card>
        
        <Card className="p-5 flex items-center">
          <ProgressRing 
            progress={Math.round((activityData.exerciseMinutes / activityData.goal.exerciseMinutes) * 100)} 
            size={100} 
            strokeWidth={10}
            color="#10B981"
          >
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-white">{activityData.exerciseMinutes}</span>
            </div>
          </ProgressRing>
          
          <div className="ml-4">
            <h3 className="text-lg font-medium text-white">Exercise Minutes</h3>
            <p className="text-sm text-gray-400">Goal: {activityData.goal.exerciseMinutes} minutes</p>
            <p className="text-sm text-green-400 mt-1">
              {Math.round((activityData.exerciseMinutes / activityData.goal.exerciseMinutes) * 100)}% completed
            </p>
          </div>
        </Card>
        
        <Card className="p-5 flex items-center">
          <ProgressRing 
            progress={Math.round((activityData.activeCalories / activityData.goal.activeCalories) * 100)} 
            size={100} 
            strokeWidth={10}
            color="#EF4444"
          >
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-white">{activityData.activeCalories}</span>
            </div>
          </ProgressRing>
          
          <div className="ml-4">
            <h3 className="text-lg font-medium text-white">Active Calories</h3>
            <p className="text-sm text-gray-400">Goal: {activityData.goal.activeCalories} kcal</p>
            <p className="text-sm text-red-400 mt-1">
              {Math.round((activityData.activeCalories / activityData.goal.activeCalories) * 100)}% completed
            </p>
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-white">Hourly Steps</h3>
            <Button variant="ghost" size="sm" icon={<Expand size={16} />} />
          </div>
          
          <div className="h-64 flex items-end">
            {hourlySteps.map((hour, index) => (
              <div 
                key={index} 
                className="flex-1 flex flex-col items-center justify-end h-full"
              >
                <div 
                  className="w-full max-w-[8px] mx-auto bg-indigo-500 rounded-t-sm transition-all duration-500 ease-out"
                  style={{ 
                    height: `${(hour.steps / maxSteps) * 100}%`,
                    opacity: hour.steps > 0 ? 1 : 0.2
                  }}
                ></div>
                <span className="text-[10px] text-gray-500 mt-1">
                  {hour.hour === 0 ? '12a' : hour.hour === 12 ? '12p' : hour.hour > 12 ? `${hour.hour - 12}p` : `${hour.hour}a`}
                </span>
              </div>
            ))}
          </div>
        </Card>
        
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-white">Workouts</h3>
            <Button variant="outline" size="sm">
              Add Workout
            </Button>
          </div>
          
          <div className="space-y-4">
            {workouts.map(workout => (
              <div key={workout.id} className="flex items-center p-3 bg-gray-800 rounded-lg">
                <div className="p-2 bg-indigo-500/20 rounded-md text-indigo-400 mr-3">
                  {workout.icon}
                </div>
                
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-white">{workout.type}</h4>
                  <p className="text-xs text-gray-400">{workout.time}</p>
                </div>
                
                <div className="text-right">
                  <p className="text-sm font-medium text-white">{workout.duration} min</p>
                  <p className="text-xs text-gray-400">{workout.calories} kcal</p>
                </div>
                
                <button className="ml-2 p-1 text-gray-400 hover:text-white">
                  <MoreHorizontal size={16} />
                </button>
              </div>
            ))}
            
            {workouts.length === 0 && (
              <div className="flex flex-col items-center justify-center py-6">
                <Info size={24} className="text-gray-500 mb-2" />
                <p className="text-sm text-gray-400">No workouts recorded today</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Activity;