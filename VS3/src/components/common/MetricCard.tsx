import React from 'react';
import { Sparkles } from 'lucide-react';
import Card from './Card';

interface MetricCardProps {
  title: string;
  value: number | string;
  unit?: string;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'stable';
  percentage?: number;
  color?: string;
  onClick?: () => void;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  unit,
  icon,
  trend,
  percentage,
  color = 'indigo',
  onClick,
}) => {
  const trendColors = {
    up: 'text-green-500',
    down: 'text-red-500',
    stable: 'text-yellow-500',
  };

  const iconColors = {
    indigo: 'text-indigo-400 bg-indigo-500/10',
    green: 'text-green-400 bg-green-500/10',
    blue: 'text-blue-400 bg-blue-500/10',
    red: 'text-red-400 bg-red-500/10',
    purple: 'text-purple-400 bg-purple-500/10',
    yellow: 'text-yellow-400 bg-yellow-500/10',
  };

  return (
    <Card 
      className="h-full" 
      hover={!!onClick} 
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className={`p-3 rounded-lg ${iconColors[color as keyof typeof iconColors]}`}>
          {icon}
        </div>
        
        {trend && (
          <div className={`flex items-center ${trendColors[trend]}`}>
            {trend === 'up' && <span className="text-sm">↑</span>}
            {trend === 'down' && <span className="text-sm">↓</span>}
            {trend === 'stable' && <span className="text-sm">→</span>}
            {percentage && <span className="text-sm ml-1">{percentage}%</span>}
          </div>
        )}
      </div>
      
      <div className="mt-3">
        <h3 className="text-sm font-medium text-gray-400">{title}</h3>
        <div className="flex items-baseline mt-1">
          <p className="text-2xl font-semibold text-white">{value}</p>
          {unit && <p className="ml-1 text-sm text-gray-400">{unit}</p>}
        </div>
      </div>
    </Card>
  );
};

export default MetricCard;