import React from 'react';
import { Activity, Flame, Timer, Wallet as Walk } from 'lucide-react';
import Card from '../common/Card';
import ProgressRing from '../common/ProgressRing';
import { ActivityData } from '../../types/health';

interface ActivitySummaryProps {
  data: ActivityData;
}

const ActivitySummary: React.FC<ActivitySummaryProps> = ({ data }) => {
  const stepsProgress = Math.round((data.steps / data.goal.steps) * 100);
  const caloriesProgress = Math.round((data.activeCalories / data.goal.activeCalories) * 100);
  const exerciseProgress = Math.round((data.exerciseMinutes / data.goal.exerciseMinutes) * 100);
  
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">Activity Summary</h2>
        <Activity className="text-indigo-400" size={20} />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Steps */}
        <div className="flex flex-col items-center">
          <ProgressRing progress={stepsProgress} color="#6366F1">
            <div className="flex flex-col items-center">
              <Walk size={24} className="text-indigo-400 mb-1" />
              <span className="text-lg font-bold text-white">{data.steps.toLocaleString()}</span>
            </div>
          </ProgressRing>
          <div className="mt-3 text-center">
            <h3 className="text-sm font-medium text-white">Steps</h3>
            <p className="text-xs text-gray-400">Goal: {data.goal.steps.toLocaleString()}</p>
          </div>
        </div>
        
        {/* Calories */}
        <div className="flex flex-col items-center">
          <ProgressRing progress={caloriesProgress} color="#EF4444">
            <div className="flex flex-col items-center">
              <Flame size={24} className="text-red-400 mb-1" />
              <span className="text-lg font-bold text-white">{data.activeCalories}</span>
            </div>
          </ProgressRing>
          <div className="mt-3 text-center">
            <h3 className="text-sm font-medium text-white">Calories</h3>
            <p className="text-xs text-gray-400">Goal: {data.goal.activeCalories}</p>
          </div>
        </div>
        
        {/* Exercise */}
        <div className="flex flex-col items-center">
          <ProgressRing progress={exerciseProgress} color="#10B981">
            <div className="flex flex-col items-center">
              <Timer size={24} className="text-green-400 mb-1" />
              <span className="text-lg font-bold text-white">{data.exerciseMinutes} min</span>
            </div>
          </ProgressRing>
          <div className="mt-3 text-center">
            <h3 className="text-sm font-medium text-white">Exercise</h3>
            <p className="text-xs text-gray-400">Goal: {data.goal.exerciseMinutes} min</p>
          </div>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-800">
        <div className="flex justify-between">
          <div>
            <p className="text-sm text-gray-400">Distance</p>
            <p className="text-base font-medium text-white">{data.distance} km</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Standing Hours</p>
            <p className="text-base font-medium text-white">{data.standingHours}/12 hrs</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ActivitySummary;