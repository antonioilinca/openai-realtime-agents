import { ProfileInput } from "./calculations";

type MealSeed = {
  name: string;
  type: "breakfast" | "snack_am" | "lunch" | "snack_pm" | "dinner";
  ingredients: string;
  protein: number;
  carbs: number;
  fats: number;
  calories: number;
  substitutions: string[];
  notes: string;
};

const goalNote: Record<ProfileInput["goal"], string> = {
  fat_loss: "Focus on higher fiber foods to keep you full while leaning out.",
  cutting: "Keep portions consistent and time carbs around training windows.",
  muscle_gain: "Add a small side of carbs if you need more fuel for hypertrophy.",
};

const baseMeals: MealSeed[] = [
  {
    name: "Protein Oatmeal Bowl",
    type: "breakfast",
    ingredients: "Rolled oats, whey protein, blueberries, almond butter",
    protein: 32,
    carbs: 48,
    fats: 12,
    calories: 420,
    substitutions: ["Greek Yogurt Power Parfait", "Egg White Veggie Scramble"],
    notes: "Warm start with complex carbs and slow-digesting fats.",
  },
  {
    name: "Greek Yogurt Power Parfait",
    type: "breakfast",
    ingredients: "Low-fat Greek yogurt, granola, chia seeds, strawberries",
    protein: 30,
    carbs: 42,
    fats: 10,
    calories: 390,
    substitutions: ["Protein Oatmeal Bowl", "Egg White Veggie Scramble"],
    notes: "Fast assembly breakfast loaded with probiotics.",
  },
  {
    name: "Egg White Veggie Scramble",
    type: "breakfast",
    ingredients: "Egg whites, spinach, mushrooms, feta, sprouted toast",
    protein: 34,
    carbs: 28,
    fats: 11,
    calories: 360,
    substitutions: ["Protein Oatmeal Bowl", "Greek Yogurt Power Parfait"],
    notes: "High-protein savory option to anchor the morning.",
  },
  {
    name: "Nut Butter Banana Snack",
    type: "snack_am",
    ingredients: "Banana, almond butter, hemp seeds",
    protein: 12,
    carbs: 26,
    fats: 14,
    calories: 260,
    substitutions: ["Citrus Cottage Cheese Cup"],
    notes: "Quick energy with satiating fats between meals.",
  },
  {
    name: "Citrus Cottage Cheese Cup",
    type: "snack_am",
    ingredients: "Low-fat cottage cheese, orange segments, pumpkin seeds",
    protein: 18,
    carbs: 22,
    fats: 9,
    calories: 240,
    substitutions: ["Nut Butter Banana Snack"],
    notes: "Refreshing protein boost that travels well.",
  },
  {
    name: "Teriyaki Salmon Bowl",
    type: "lunch",
    ingredients: "Grilled salmon, jasmine rice, edamame, pickled veggies",
    protein: 42,
    carbs: 55,
    fats: 18,
    calories: 560,
    substitutions: ["Citrus Chicken Grain Bowl", "Steak & Farro Salad"],
    notes: "Omega-3 rich option with balanced macros.",
  },
  {
    name: "Citrus Chicken Grain Bowl",
    type: "lunch",
    ingredients: "Citrus-marinated chicken, quinoa, arugula, avocado",
    protein: 38,
    carbs: 48,
    fats: 17,
    calories: 520,
    substitutions: ["Teriyaki Salmon Bowl", "Steak & Farro Salad"],
    notes: "Light yet satisfying plate ideal for midday fuel.",
  },
  {
    name: "Steak & Farro Salad",
    type: "lunch",
    ingredients: "Flank steak, farro, roasted peppers, chimichurri",
    protein: 40,
    carbs: 45,
    fats: 19,
    calories: 540,
    substitutions: ["Teriyaki Salmon Bowl", "Citrus Chicken Grain Bowl"],
    notes: "Iron-rich option with hearty grains.",
  },
  {
    name: "Matcha Protein Latte",
    type: "snack_pm",
    ingredients: "Matcha, almond milk, collagen protein, cashews",
    protein: 18,
    carbs: 20,
    fats: 12,
    calories: 240,
    substitutions: ["Mediterranean Snack Box"],
    notes: "Steady energy lift before evening training.",
  },
  {
    name: "Mediterranean Snack Box",
    type: "snack_pm",
    ingredients: "Hummus, carrots, cucumber, turkey roll-ups",
    protein: 20,
    carbs: 24,
    fats: 11,
    calories: 250,
    substitutions: ["Matcha Protein Latte"],
    notes: "Crunchy savory bite packed with protein.",
  },
  {
    name: "Herb Roasted Chicken Dinner",
    type: "dinner",
    ingredients: "Herbed chicken thighs, sweet potato mash, broccoli",
    protein: 44,
    carbs: 52,
    fats: 16,
    calories: 560,
    substitutions: ["Miso Glazed Cod Plate", "Lean Steak Fajitas"],
    notes: "Classic recovery dinner with micronutrient variety.",
  },
  {
    name: "Miso Glazed Cod Plate",
    type: "dinner",
    ingredients: "Miso cod, brown rice, bok choy, sesame seeds",
    protein: 40,
    carbs: 48,
    fats: 15,
    calories: 520,
    substitutions: ["Herb Roasted Chicken Dinner", "Lean Steak Fajitas"],
    notes: "Lean protein with umami-rich glaze for variety.",
  },
  {
    name: "Lean Steak Fajitas",
    type: "dinner",
    ingredients: "Sirloin strips, peppers, onions, whole wheat tortillas",
    protein: 42,
    carbs: 50,
    fats: 14,
    calories: 540,
    substitutions: ["Herb Roasted Chicken Dinner", "Miso Glazed Cod Plate"],
    notes: "High-iron dinner ideal post-strength session.",
  },
];

export function getDefaultMeals(goal: ProfileInput["goal"]): MealSeed[] {
  return baseMeals.map((meal) => ({
    ...meal,
    notes: `${meal.notes} ${goalNote[goal]}`.trim(),
  }));
}
