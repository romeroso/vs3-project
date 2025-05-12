import React from 'react';
import { Heart } from 'lucide-react';
import Card from '../common/Card';
import MetricCard from '../common/MetricCard';
import { VitalStat } from '../../types/health';

interface VitalStatsProps {
  data: VitalStat[];
}

const VitalStats: React.FC<VitalStatsProps> = ({ data }) => {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">Vital Stats</h2>
        <Heart className="text-pink-400" size={20} />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.map((stat) => (
          <MetricCard
            key={stat.id}
            title={stat.name}
            value={stat.value}
            unit={stat.unit}
            icon={<Heart size={20} />}
            trend={stat.trend}
            color={
              stat.trend === 'up' 
                ? 'green' 
                : stat.trend === 'down' 
                ? 'red' 
                : 'indigo'
            }
          />
        ))}
      </div>
    </Card>
  );
};

export default VitalStats;