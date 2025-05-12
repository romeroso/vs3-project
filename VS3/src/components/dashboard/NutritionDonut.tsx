import React from 'react';
import { Apple } from 'lucide-react';
import Card from '../common/Card';
import { NutritionData } from '../../types/health';

interface NutritionDonutProps {
  data: NutritionData;
}

const NutritionDonut: React.FC<NutritionDonutProps> = ({ data }) => {
  const caloriesPercentage = Math.min(100, Math.round((data.calories / data.goal.calories) * 100));
  
  // Calculate the percentage of each macro
  const totalGrams = data.carbs + data.protein + data.fat;
  const carbsPercentage = Math.round((data.carbs / totalGrams) * 100);
  const proteinPercentage = Math.round((data.protein / totalGrams) * 100);
  const fatPercentage = Math.round((data.fat / totalGrams) * 100);
  
  // Calculate the angle for each segment
  const carbsAngle = (carbsPercentage / 100) * 360;
  const proteinAngle = (proteinPercentage / 100) * 360;
  const fatAngle = (fatPercentage / 100) * 360;
  
  return (
    <Card className="p-5 h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">Nutrition</h2>
        <Apple className="text-green-400" size={20} />
      </div>
      
      <div className="flex flex-col items-center">
        <div className="relative w-32 h-32">
          {/* Donut chart */}
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#1F2937"
              strokeWidth="16"
            />
            
            {/* Carbs segment */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#3B82F6"
              strokeWidth="16"
              strokeDasharray={`${(carbsAngle / 360) * 251.2} 251.2`}
              transform="rotate(-90 50 50)"
            />
            
            {/* Protein segment */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#10B981"
              strokeWidth="16"
              strokeDasharray={`${(proteinAngle / 360) * 251.2} 251.2`}
              transform={`rotate(${carbsAngle - 90} 50 50)`}
            />
            
            {/* Fat segment */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#F59E0B"
              strokeWidth="16"
              strokeDasharray={`${(fatAngle / 360) * 251.2} 251.2`}
              transform={`rotate(${carbsAngle + proteinAngle - 90} 50 50)`}
            />
            
            {/* Inner text */}
            <text
              x="50"
              y="50"
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-2xl font-bold"
              fill="white"
            >
              {caloriesPercentage}%
            </text>
          </svg>
        </div>
        
        <div className="mt-2 text-center">
          <p className="text-sm text-gray-400">Daily Calories</p>
          <p className="text-lg font-medium text-white">
            {data.calories} / {data.goal.calories}
          </p>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-800">
        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col items-center">
            <div className="w-4 h-4 bg-blue-500 rounded-sm mb-1"></div>
            <p className="text-xs text-gray-400">Carbs</p>
            <p className="text-sm font-medium text-white">{data.carbs}g</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-4 h-4 bg-green-500 rounded-sm mb-1"></div>
            <p className="text-xs text-gray-400">Protein</p>
            <p className="text-sm font-medium text-white">{data.protein}g</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-4 h-4 bg-yellow-500 rounded-sm mb-1"></div>
            <p className="text-xs text-gray-400">Fat</p>
            <p className="text-sm font-medium text-white">{data.fat}g</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default NutritionDonut;