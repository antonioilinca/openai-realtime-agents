export type ProfileInput = {
  weight: number;
  height: number;
  age: number;
  activityLevel: number;
  goal: "fat_loss" | "cutting" | "muscle_gain";
  location: "home" | "gym";
};

export type NutritionTargets = {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  water: number;
};

const activityFactorMap: Record<number, number> = {
  1: 1.2,
  2: 1.3,
  3: 1.375,
  4: 1.45,
  5: 1.55,
  6: 1.725,
  7: 1.9,
};

const goalAdjustments: Record<ProfileInput["goal"], number> = {
  fat_loss: 0.8,
  cutting: 0.9,
  muscle_gain: 1.1,
};

export function calculateNutritionTargets(
  profile: ProfileInput
): NutritionTargets {
  const activityFactor = activityFactorMap[profile.activityLevel] || 1.2;
  const bmr =
    10 * profile.weight + 6.25 * profile.height - 5 * profile.age + 5;
  const tdee = bmr * activityFactor;
  const adjustment = goalAdjustments[profile.goal] ?? 1;
  const calories = Math.round(tdee * adjustment);

  const protein = Math.round(profile.weight * 2);
  const fats = Math.max(45, Math.round(profile.weight * 0.8));
  const remainingCalories = calories - (protein * 4 + fats * 9);
  const carbs = Math.max(0, Math.round(remainingCalories / 4));
  const water = parseFloat((profile.weight * 0.035).toFixed(1));

  return {
    calories,
    protein,
    carbs,
    fats,
    water,
  };
}
