import React, { useState } from 'react';
import { Heart, Activity, Brain, ChevronRight, Plus, ThermometerSnowflake, Droplets, Settings as Lungs, FileText, Scale, Moon, Zap } from 'lucide-react';
import Card from '../components/common/Card';
import MetricCard from '../components/common/MetricCard';
import Button from '../components/common/Button';
import { healthMetrics, vitalStats } from '../data/mockData';

const Metrics: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>('vitals');
  
  const categories = [
    { id: 'vitals', name: 'Vital Signs', icon: <Heart size={20} /> },
    { id: 'workouts', name: 'Workouts', icon: <Activity size={20} /> },
    { id: 'weight', name: 'Weight', icon: <Scale size={20} /> },
    { id: 'sleep', name: 'Sleep', icon: <Moon size={20} /> },
    { id: 'stress', name: 'Stress', icon: <Brain size={20} /> },
    { id: 'hrv', name: 'Heart Rate Variability', icon: <Zap size={20} /> },
    { id: 'blood', name: 'Blood', icon: <Droplets size={20} /> },
    { id: 'respiratory', name: 'Respiratory', icon: <Lungs size={20} /> }
  ];

  // Mock workout data
  const workouts = [
    { 
      id: '1',
      type: 'Running',
      duration: '45 min',
      calories: 450,
      date: '2024-03-15',
      distance: '5.2 km'
    },
    { 
      id: '2',
      type: 'Strength Training',
      duration: '60 min',
      calories: 320,
      date: '2024-03-14'
    }
  ];

  // Mock weight data
  const weightData = [
    { date: '2024-03-15', weight: 70.5 },
    { date: '2024-03-14', weight: 70.7 },
    { date: '2024-03-13', weight: 70.8 }
  ];

  // Mock sleep data
  const sleepData = [
    { 
      date: '2024-03-15',
      duration: '7h 45m',
      quality: 85,
      deepSleep: '2h 15m',
      remSleep: '1h 45m'
    }
  ];

  // Mock stress data
  const stressLevel = {
    current: 'Low',
    score: 32,
    trend: 'down'
  };

  // Mock HRV data
  const hrvData = {
    current: 65,
    average: 62,
    trend: 'up'
  };
  
  return (
    <div className="pb-24 sm:pb-0">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Health Metrics</h1>
          <p className="text-gray-400">Track your health data</p>
        </div>
        
        <Button
          variant="primary"
          icon={<Plus size={16} />}
        >
          Add Data
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`
              flex items-center p-4 rounded-lg border transition-colors
              ${selectedCategory === category.id
                ? 'bg-indigo-600/20 border-indigo-600 text-white'
                : 'bg-gray-900 border-gray-800 text-gray-400 hover:bg-gray-800 hover:text-white'
              }
            `}
          >
            <span className={`mr-3 ${selectedCategory === category.id ? 'text-indigo-400' : ''}`}>
              {category.icon}
            </span>
            <span className="font-medium">{category.name}</span>
          </button>
        ))}
      </div>

      {selectedCategory === 'workouts' && (
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-white">Recent Workouts</h2>
            <Button variant="outline" size="sm" icon={<Plus size={16} />}>
              Add Workout
            </Button>
          </div>
          <div className="space-y-4">
            {workouts.map(workout => (
              <div key={workout.id} className="p-4 bg-gray-800 rounded-lg flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">{workout.type}</h3>
                  <p className="text-gray-400 text-sm">{workout.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-white">{workout.duration}</p>
                  <p className="text-gray-400 text-sm">{workout.calories} kcal</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {selectedCategory === 'weight' && (
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-white">Weight Tracking</h2>
            <Button variant="outline" size="sm" icon={<Plus size={16} />}>
              Add Weight
            </Button>
          </div>
          <div className="space-y-4">
            {weightData.map((entry, index) => (
              <div key={index} className="p-4 bg-gray-800 rounded-lg flex justify-between">
                <span className="text-gray-400">{entry.date}</span>
                <span className="text-white font-medium">{entry.weight} kg</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {selectedCategory === 'sleep' && (
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-white">Sleep Analysis</h2>
            <Button variant="outline" size="sm" icon={<Plus size={16} />}>
              Add Sleep Data
            </Button>
          </div>
          {sleepData.map((entry, index) => (
            <div key={index} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-800 rounded-lg">
                  <p className="text-gray-400">Duration</p>
                  <p className="text-white text-xl font-medium">{entry.duration}</p>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <p className="text-gray-400">Quality</p>
                  <p className="text-white text-xl font-medium">{entry.quality}%</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-800 rounded-lg">
                  <p className="text-gray-400">Deep Sleep</p>
                  <p className="text-white text-xl font-medium">{entry.deepSleep}</p>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <p className="text-gray-400">REM Sleep</p>
                  <p className="text-white text-xl font-medium">{entry.remSleep}</p>
                </div>
              </div>
            </div>
          ))}
        </Card>
      )}

      {selectedCategory === 'stress' && (
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-white mb-6">Stress Level</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-800 rounded-lg">
              <p className="text-gray-400">Current Level</p>
              <p className="text-white text-xl font-medium">{stressLevel.current}</p>
            </div>
            <div className="p-4 bg-gray-800 rounded-lg">
              <p className="text-gray-400">Stress Score</p>
              <p className="text-white text-xl font-medium">{stressLevel.score}</p>
            </div>
          </div>
        </Card>
      )}

      {selectedCategory === 'hrv' && (
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-white mb-6">Heart Rate Variability</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-800 rounded-lg">
              <p className="text-gray-400">Current HRV</p>
              <p className="text-white text-xl font-medium">{hrvData.current} ms</p>
            </div>
            <div className="p-4 bg-gray-800 rounded-lg">
              <p className="text-gray-400">7-Day Average</p>
              <p className="text-white text-xl font-medium">{hrvData.average} ms</p>
            </div>
          </div>
        </Card>
      )}

      {selectedCategory === 'vitals' && (
        <>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white mb-2">Recent Measurements</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {healthMetrics.map(metric => (
                <MetricCard
                  key={metric.id}
                  title={metric.name}
                  value={metric.value}
                  unit={metric.unit}
                  icon={<Heart size={20} />}
                  color="indigo"
                />
              ))}
            </div>
          </div>
          
          <h2 className="text-xl font-semibold text-white mb-4">Health Categories</h2>
          <div className="space-y-4">
            {vitalStats.map(stat => (
              <Card key={stat.id} className="p-4 hover:bg-gray-800">
                <div className="flex items-center">
                  <div className="p-2 bg-indigo-500/20 rounded-md text-indigo-400 mr-3">
                    <Heart size={20} />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-base font-medium text-white">{stat.name}</h3>
                    <div className="flex items-baseline">
                      <p className="text-xl font-semibold text-white mt-1">{stat.value}</p>
                      <span className="ml-1 text-sm text-gray-400">{stat.unit}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="mr-4">
                      <p className="text-xs text-gray-400">Normal Range</p>
                      <p className="text-sm text-white">{stat.range.min} - {stat.range.max} {stat.unit}</p>
                    </div>
                    <ChevronRight size={20} className="text-gray-500" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Metrics;