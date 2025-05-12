import { ActivityData, HealthMetric, NutritionData, SleepData, UserProfile, VitalStat } from '../types/health';

// Mock user profile
export const userProfile: UserProfile = {
  name: 'Alex Johnson',
  age: 32,
  height: 175,
  weight: 70,
  gender: 'non-binary',
  goals: {
    dailySteps: 10000,
    sleepHours: 8,
    calories: 2200
  }
};

// Mock health metrics
export const healthMetrics: HealthMetric[] = [
  {
    id: '1',
    name: 'Heart Rate',
    value: 72,
    unit: 'bpm',
    date: new Date(),
    icon: 'heart'
  },
  {
    id: '2',
    name: 'Blood Pressure',
    value: 120,
    unit: 'mmHg',
    date: new Date(),
    icon: 'activity'
  },
  {
    id: '3',
    name: 'Blood Oxygen',
    value: 98,
    unit: '%',
    date: new Date(),
    icon: 'droplets'
  },
  {
    id: '4',
    name: 'Body Temperature',
    value: 36.6,
    unit: '°C',
    date: new Date(),
    icon: 'thermometer'
  }
];

// Mock activity data
export const activityData: ActivityData = {
  steps: 8743,
  activeCalories: 420,
  standingHours: 10,
  exerciseMinutes: 45,
  distance: 5.2,
  goal: {
    steps: 10000,
    activeCalories: 600,
    standingHours: 12,
    exerciseMinutes: 30
  }
};

// Mock sleep data for the past week
export const sleepData: SleepData[] = Array.from({ length: 7 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - i);
  
  const totalSleep = Math.floor(Math.random() * 120) + 360; // 6-8 hours in minutes
  const deepSleep = Math.floor(totalSleep * 0.2);
  const remSleep = Math.floor(totalSleep * 0.25);
  const lightSleep = Math.floor(totalSleep * 0.45);
  const awake = Math.floor(totalSleep * 0.1);
  
  return {
    date,
    duration: totalSleep,
    deepSleep,
    remSleep,
    lightSleep,
    awake
  };
});

// Mock vital stats
export const vitalStats: VitalStat[] = [
  {
    id: '1',
    name: 'Resting Heart Rate',
    value: 62,
    unit: 'bpm',
    range: { min: 60, max: 100 },
    trend: 'down',
    icon: 'heart'
  },
  {
    id: '2',
    name: 'Systolic Pressure',
    value: 118,
    unit: 'mmHg',
    range: { min: 90, max: 120 },
    trend: 'stable',
    icon: 'activity'
  },
  {
    id: '3',
    name: 'Diastolic Pressure',
    value: 78,
    unit: 'mmHg',
    range: { min: 60, max: 80 },
    trend: 'up',
    icon: 'activity'
  },
  {
    id: '4',
    name: 'Body Temperature',
    value: 36.7,
    unit: '°C',
    range: { min: 36.1, max: 37.2 },
    trend: 'stable',
    icon: 'thermometer'
  }
];

// Mock nutrition data
export const nutritionData: NutritionData = {
  calories: 1850,
  carbs: 220,
  protein: 95,
  fat: 55,
  goal: {
    calories: 2200,
    carbs: 275,
    protein: 110,
    fat: 73
  }
};