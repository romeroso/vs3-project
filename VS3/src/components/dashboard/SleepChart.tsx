import React from 'react';
import { Moon } from 'lucide-react';
import Card from '../common/Card';
import { SleepData } from '../../types/health';
import { getDayShort } from '../../utils/dateUtils';

interface SleepChartProps {
  data: SleepData[];
}

const SleepChart: React.FC<SleepChartProps> = ({ data }) => {
  // Sort data by date
  const sortedData = [...data].sort((a, b) => a.date.getTime() - b.date.getTime());
  
  // Calculate total height of bars (8 hours = 100% height)
  const maxHeight = 8 * 60; // 8 hours in minutes
  
  return (
    <Card className="p-5 h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">Sleep Analysis</h2>
        <Moon className="text-indigo-400" size={20} />
      </div>
      
      <div className="flex items-end justify-between h-36 mt-4">
        {sortedData.map((day, index) => {
          const totalHeight = Math.min(100, (day.duration / maxHeight) * 100);
          const deepPercent = (day.deepSleep / day.duration) * 100;
          const remPercent = (day.remSleep / day.duration) * 100;
          const lightPercent = (day.lightSleep / day.duration) * 100;
          const awakePercent = (day.awake / day.duration) * 100;
          
          return (
            <div key={index} className="flex flex-col items-center flex-1">
              <div className="w-full relative flex flex-col-reverse" style={{ height: '100%' }}>
                <div 
                  className="w-full bg-gradient-to-b from-purple-700 to-indigo-900 rounded-t-sm relative overflow-hidden"
                  style={{ height: `${totalHeight}%` }}
                >
                  {/* Deep sleep */}
                  <div 
                    className="absolute bottom-0 w-full bg-indigo-800" 
                    style={{ height: `${deepPercent}%` }} 
                  />
                  {/* REM sleep */}
                  <div 
                    className="absolute bottom-0 w-full bg-indigo-600" 
                    style={{ height: `${deepPercent + remPercent}%` }} 
                  />
                  {/* Light sleep */}
                  <div 
                    className="absolute bottom-0 w-full bg-indigo-400" 
                    style={{ height: `${deepPercent + remPercent + lightPercent}%` }} 
                  />
                  {/* Awake */}
                  <div 
                    className="absolute bottom-0 w-full bg-gray-500" 
                    style={{ height: `${deepPercent + remPercent + lightPercent + awakePercent}%` }} 
                  />
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-400">{getDayShort(day.date)}</div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-800">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-400">Average</p>
            <p className="text-base font-medium text-white">
              {Math.round(data.reduce((acc, day) => acc + day.duration, 0) / data.length / 60)} hrs
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Deep Sleep</p>
            <p className="text-base font-medium text-white">
              {Math.round(data.reduce((acc, day) => acc + day.deepSleep, 0) / data.length / 60)} hrs
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-4 flex flex-wrap gap-2">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-indigo-800 rounded-sm mr-1"></div>
          <span className="text-xs text-gray-400">Deep</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-indigo-600 rounded-sm mr-1"></div>
          <span className="text-xs text-gray-400">REM</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-indigo-400 rounded-sm mr-1"></div>
          <span className="text-xs text-gray-400">Light</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-gray-500 rounded-sm mr-1"></div>
          <span className="text-xs text-gray-400">Awake</span>
        </div>
      </div>
    </Card>
  );
};

export default SleepChart;