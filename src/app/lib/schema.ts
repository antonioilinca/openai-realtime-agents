import type { NutritionTargets, ProfileInput } from "./calculations";

export const DAY_LABELS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

export const MEAL_SLOTS = [
  { key: "breakfast", label: "Breakfast" },
  { key: "snack_am", label: "10am Snack" },
  { key: "lunch", label: "Lunch" },
  { key: "snack_pm", label: "4pm Snack" },
  { key: "dinner", label: "Dinner" },
] as const;

export type MealSlotKey = (typeof MEAL_SLOTS)[number]["key"];

export type Profile = {
  id: number;
  weight: number;
  height: number;
  age: number;
  activity_level: number;
  goal: ProfileInput["goal"];
  location: ProfileInput["location"];
} & NutritionTargets;

export type Meal = {
  id: number;
  name: string;
  type: MealSlotKey;
  ingredients: string;
  protein: number;
  carbs: number;
  fats: number;
  calories: number;
  substitutions: string[];
  notes: string;
  origin: "auto" | "custom";
};

export type MealSlot = {
  id: number;
  dayIndex: number;
  slotType: MealSlotKey;
  mealId: number | null;
  meal: Meal | null;
};

export type Workout = {
  id: number;
  name: string;
  equipment: string | null;
  sets: string | null;
  reps: string | null;
  duration: string | null;
  rest: string | null;
  notes: string | null;
  focus: string | null;
  location: ProfileInput["location"] | null;
  origin: "auto" | "custom";
};

export type WorkoutSchedule = {
  dayIndex: number;
  workoutId: number | null;
  workout: Workout | null;
  source: "auto" | "custom" | "rest";
};

export type DashboardData = {
  profile: Profile | null;
  meals: Meal[];
  mealSlots: MealSlot[];
  workouts: Workout[];
  workoutSchedule: WorkoutSchedule[];
};
