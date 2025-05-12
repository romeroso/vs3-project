export interface HealthMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  date: Date;
  icon: string;
}

export interface ActivityData {
  steps: number;
  activeCalories: number;
  standingHours: number;
  exerciseMinutes: number;
  distance: number;
  goal: {
    steps: number;
    activeCalories: number;
    standingHours: number;
    exerciseMinutes: number;
  };
}

export interface SleepData {
  date: Date;
  duration: number; // in minutes
  deepSleep: number; // in minutes
  remSleep: number; // in minutes
  lightSleep: number; // in minutes
  awake: number; // in minutes
}

export interface VitalStat {
  id: string;
  name: string;
  value: number;
  unit: string;
  range: {
    min: number;
    max: number;
  };
  trend: "up" | "down" | "stable";
  icon: string;
}

export interface NutritionData {
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
  goal: {
    calories: number;
    carbs: number;
    protein: number;
    fat: number;
  };
}

export interface UserProfile {
  name: string;
  age: number;
  height: number;
  weight: number;
  gender: string;
  goals: {
    dailySteps: number;
    sleepHours: number;
    calories: number;
    weight?: number;
  };
}