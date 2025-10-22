import { z } from "zod";
import db from "./db";
export { DAY_LABELS, MEAL_SLOTS } from "./schema";

import {
  calculateNutritionTargets,
  type ProfileInput,
} from "./calculations";
import { generateWorkoutPlan } from "./workout";
import { getDefaultMeals } from "./meals";
import {
  MEAL_SLOTS,
  type DashboardData,
  type Meal,
  type MealSlot,
  type MealSlotKey,
  type Profile,
  type Workout,
  type WorkoutSchedule,
} from "./schema";

const mealSlotValues = MEAL_SLOTS.map((slot) => slot.key) as [
  MealSlotKey,
  ...MealSlotKey[],
];
const mealSlotEnum = z.enum(mealSlotValues);

type ProfileRow = {
  id: number;
  weight: number;
  height: number;
  age: number;
  activity_level: number;
  goal: ProfileInput["goal"];
  location: ProfileInput["location"];
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  water: number;
};

function parseMeal(row: any): Meal {
  return {
    id: row.id,
    name: row.name,
    type: row.type,
    ingredients: row.ingredients,
    protein: row.protein,
    carbs: row.carbs,
    fats: row.fats,
    calories: row.calories,
    substitutions: row.substitutions ? JSON.parse(row.substitutions) : [],
    notes: row.notes,
    origin: (row.origin as Meal["origin"]) ?? "custom",
  };
}

function parseWorkout(row: any): Workout {
  return {
    id: row.id,
    name: row.name,
    equipment: row.equipment ?? null,
    sets: row.sets ?? null,
    reps: row.reps ?? null,
    duration: row.duration ?? null,
    rest: row.rest ?? null,
    notes: row.notes ?? null,
    focus: row.focus ?? null,
    location: row.location ?? null,
    origin: (row.origin as Workout["origin"]) ?? "custom",
  };
}

function getMeals(): Meal[] {
  const rows = db
    .prepare(
      `SELECT id, name, type, ingredients, protein, carbs, fats, calories, substitutions, notes, origin
       FROM meals
       ORDER BY type, name`
    )
    .all();
  return rows.map(parseMeal);
}

function getMealSlots(): MealSlot[] {
  const rows = db
    .prepare(
      `SELECT
         ms.id as slot_id,
         ms.day_index,
         ms.slot_type,
         ms.meal_id,
         m.id as meal_id,
         m.name as meal_name,
         m.type as meal_type,
         m.ingredients as meal_ingredients,
         m.protein as meal_protein,
         m.carbs as meal_carbs,
         m.fats as meal_fats,
         m.calories as meal_calories,
         m.substitutions as meal_substitutions,
         m.notes as meal_notes,
         m.origin as meal_origin
       FROM meal_slots ms
       LEFT JOIN meals m ON ms.meal_id = m.id
       ORDER BY ms.day_index, ms.slot_type`
    )
    .all();

  return rows.map((row: any) => ({
    id: row.slot_id,
    dayIndex: row.day_index,
    slotType: row.slot_type,
    mealId: row.meal_id ?? null,
    meal:
      row.meal_id != null
        ? parseMeal({
            id: row.meal_id,
            name: row.meal_name,
            type: row.meal_type,
            ingredients: row.meal_ingredients,
            protein: row.meal_protein,
            carbs: row.meal_carbs,
            fats: row.meal_fats,
            calories: row.meal_calories,
            substitutions: row.meal_substitutions,
            notes: row.meal_notes,
            origin: row.meal_origin,
          })
        : null,
  }));
}

function getWorkouts(): Workout[] {
  const rows = db
    .prepare(
      `SELECT id, name, equipment, sets, reps, duration, rest, notes, focus, location, origin
       FROM workouts
       ORDER BY origin DESC, name`
    )
    .all();
  return rows.map(parseWorkout);
}

function getWorkoutSchedule(): WorkoutSchedule[] {
  const rows = db
    .prepare(
      `SELECT
         ws.day_index,
         ws.workout_id,
         ws.source,
         w.id as workout_id,
         w.name as workout_name,
         w.equipment as workout_equipment,
         w.sets as workout_sets,
         w.reps as workout_reps,
         w.duration as workout_duration,
         w.rest as workout_rest,
         w.notes as workout_notes,
         w.focus as workout_focus,
         w.location as workout_location,
         w.origin as workout_origin
       FROM workout_schedule ws
       LEFT JOIN workouts w ON ws.workout_id = w.id
       ORDER BY ws.day_index`
    )
    .all();

  return rows.map((row: any) => ({
    dayIndex: row.day_index,
    workoutId: row.workout_id ?? null,
    source: (row.source as WorkoutSchedule["source"]) ?? "rest",
    workout:
      row.workout_id != null
        ? parseWorkout({
            id: row.workout_id,
            name: row.workout_name,
            equipment: row.workout_equipment,
            sets: row.workout_sets,
            reps: row.workout_reps,
            duration: row.workout_duration,
            rest: row.workout_rest,
            notes: row.workout_notes,
            focus: row.workout_focus,
            location: row.workout_location,
            origin: row.workout_origin,
          })
        : null,
  }));
}

export function getDashboardData(): DashboardData {
  const profileRow = db
    .prepare(
      `SELECT id, weight, height, age, activity_level, goal, location,
              calories, protein, carbs, fats, water
       FROM profile WHERE id = 1`
    )
    .get() as ProfileRow | undefined;

  const profile: Profile | null = profileRow
    ? {
        id: profileRow.id,
        weight: profileRow.weight,
        height: profileRow.height,
        age: profileRow.age,
        activity_level: profileRow.activity_level,
        goal: profileRow.goal,
        location: profileRow.location,
        calories: profileRow.calories,
        protein: profileRow.protein,
        carbs: profileRow.carbs,
        fats: profileRow.fats,
        water: profileRow.water,
      }
    : null;

  return {
    profile,
    meals: getMeals(),
    mealSlots: getMealSlots(),
    workouts: getWorkouts(),
    workoutSchedule: getWorkoutSchedule(),
  };
}

const profileSchema = z.object({
  weight: z.number().positive(),
  height: z.number().positive(),
  age: z.number().min(12).max(90),
  activityLevel: z.number().min(1).max(7),
  goal: z.enum(["fat_loss", "cutting", "muscle_gain"]),
  location: z.enum(["home", "gym"]),
});

type ProfilePayload = z.infer<typeof profileSchema>;

function resetAutoMeals(goal: ProfileInput["goal"]) {
  const autoMeals = db
    .prepare(`SELECT id FROM meals WHERE origin = 'auto'`)
    .all() as { id: number }[];
  if (autoMeals.length) {
    const ids = autoMeals.map((m) => m.id);
    const placeholders = ids.map(() => "?").join(",");
    db.prepare(
      `UPDATE meal_slots SET meal_id = NULL WHERE meal_id IN (${placeholders})`
    ).run(...ids);
    db.prepare(`DELETE FROM meals WHERE id IN (${placeholders})`).run(...ids);
  }

  const insert = db.prepare(
    `INSERT INTO meals
      (name, type, ingredients, protein, carbs, fats, calories, substitutions, notes, origin)
     VALUES (@name, @type, @ingredients, @protein, @carbs, @fats, @calories, @substitutions, @notes, 'auto')`
  );
  const defaults = getDefaultMeals(goal);
  defaults.forEach((meal) =>
    insert.run({
      ...meal,
      substitutions: JSON.stringify(meal.substitutions ?? []),
    })
  );
}

function resetAutoWorkouts(profile: ProfileInput) {
  const autoWorkouts = db
    .prepare(`SELECT id FROM workouts WHERE origin = 'auto'`)
    .all() as { id: number }[];
  if (autoWorkouts.length) {
    const ids = autoWorkouts.map((w) => w.id);
    const placeholders = ids.map(() => "?").join(",");
    db.prepare(
      `UPDATE workout_schedule SET workout_id = NULL, source = 'rest'
       WHERE workout_id IN (${placeholders})`
    ).run(...ids);
    db.prepare(`DELETE FROM workouts WHERE id IN (${placeholders})`).run(...ids);
  }

  const { workouts, trainingDays } = generateWorkoutPlan(profile);
  const insert = db.prepare(
    `INSERT INTO workouts
      (name, equipment, sets, reps, duration, rest, notes, focus, location, origin)
     VALUES (@name, @equipment, @sets, @reps, @duration, @rest, @notes, @focus, @location, 'auto')`
  );

  const created: { id: number; dayIndex: number }[] = [];
  workouts.forEach((workout, index) => {
    const result = insert.run({
      name: workout.name,
      equipment: workout.equipment,
      sets: workout.sets,
      reps: workout.reps ?? null,
      duration: workout.duration ?? null,
      rest: workout.rest,
      notes: workout.notes,
      focus: workout.focus,
      location: workout.location,
    });
    created.push({
      id: Number(result.lastInsertRowid),
      dayIndex: trainingDays[index] ?? trainingDays[trainingDays.length - 1] ?? 0,
    });
  });

  const updateSchedule = db.prepare(
    `INSERT INTO workout_schedule (day_index, workout_id, source)
     VALUES (?, ?, 'auto')
     ON CONFLICT(day_index) DO UPDATE SET workout_id = excluded.workout_id, source = 'auto'`
  );

  created.forEach((entry) => updateSchedule.run(entry.dayIndex, entry.id));

  const restDays = [0, 1, 2, 3, 4, 5, 6].filter(
    (day) => !trainingDays.includes(day)
  );
  const setRest = db.prepare(
    `UPDATE workout_schedule SET workout_id = NULL, source = 'rest' WHERE day_index = ?`
  );
  restDays.forEach((day) => setRest.run(day));
}

export function saveProfile(payload: ProfilePayload): DashboardData {
  const data = profileSchema.parse(payload);
  const targets = calculateNutritionTargets(data);

  db.prepare(
    `INSERT INTO profile
      (id, weight, height, age, activity_level, goal, location, calories, protein, carbs, fats, water, updated_at)
     VALUES (1, @weight, @height, @age, @activity_level, @goal, @location, @calories, @protein, @carbs, @fats, @water, CURRENT_TIMESTAMP)
     ON CONFLICT(id) DO UPDATE SET
       weight = excluded.weight,
       height = excluded.height,
       age = excluded.age,
       activity_level = excluded.activity_level,
       goal = excluded.goal,
       location = excluded.location,
       calories = excluded.calories,
       protein = excluded.protein,
       carbs = excluded.carbs,
       fats = excluded.fats,
       water = excluded.water,
       updated_at = CURRENT_TIMESTAMP`
  ).run({
    weight: data.weight,
    height: data.height,
    age: data.age,
    activity_level: data.activityLevel,
    goal: data.goal,
    location: data.location,
    calories: targets.calories,
    protein: targets.protein,
    carbs: targets.carbs,
    fats: targets.fats,
    water: targets.water,
  });

  resetAutoMeals(data.goal);
  resetAutoWorkouts(data);

  return getDashboardData();
}

const createMealSchema = z.object({
  name: z.string().min(2),
  type: mealSlotEnum,
  ingredients: z.string().min(2),
  protein: z.number().min(0),
  carbs: z.number().min(0),
  fats: z.number().min(0),
  calories: z.number().min(0),
  substitutions: z.array(z.string()).optional(),
  notes: z.string().optional(),
});

type CreateMealPayload = z.infer<typeof createMealSchema>;

export function createMeal(payload: CreateMealPayload): Meal {
  const data = createMealSchema.parse(payload);
  const result = db.prepare(
    `INSERT INTO meals
      (name, type, ingredients, protein, carbs, fats, calories, substitutions, notes, origin)
     VALUES (@name, @type, @ingredients, @protein, @carbs, @fats, @calories, @substitutions, @notes, 'custom')`
  ).run({
    ...data,
    substitutions: JSON.stringify(data.substitutions ?? []),
    notes: data.notes ?? "",
  });

  return {
    ...data,
    id: Number(result.lastInsertRowid),
    substitutions: data.substitutions ?? [],
    notes: data.notes ?? "",
    origin: "custom",
  };
}

const createWorkoutSchema = z.object({
  name: z.string().min(2),
  equipment: z.string().optional(),
  sets: z.string().optional(),
  reps: z.string().optional(),
  duration: z.string().optional(),
  rest: z.string().optional(),
  notes: z.string().optional(),
  focus: z.string().optional(),
  location: z.enum(["home", "gym"]).optional(),
});

type CreateWorkoutPayload = z.infer<typeof createWorkoutSchema>;

export function createWorkout(payload: CreateWorkoutPayload): Workout {
  const data = createWorkoutSchema.parse(payload);
  const result = db.prepare(
    `INSERT INTO workouts
      (name, equipment, sets, reps, duration, rest, notes, focus, location, origin)
     VALUES (@name, @equipment, @sets, @reps, @duration, @rest, @notes, @focus, @location, 'custom')`
  ).run({
    ...data,
    location: data.location ?? null,
  });

  return {
    id: Number(result.lastInsertRowid),
    name: data.name,
    equipment: data.equipment ?? null,
    sets: data.sets ?? null,
    reps: data.reps ?? null,
    duration: data.duration ?? null,
    rest: data.rest ?? null,
    notes: data.notes ?? null,
    focus: data.focus ?? null,
    location: (data.location as Workout["location"]) ?? null,
    origin: "custom",
  };
}

const mealSlotActionSchema = z.discriminatedUnion("action", [
  z.object({
    action: z.literal("assign"),
    dayIndex: z.number().min(0).max(6),
    slotType: mealSlotEnum,
    mealId: z.number().positive(),
  }),
  z.object({
    action: z.literal("move"),
    from: z.object({
      dayIndex: z.number().min(0).max(6),
      slotType: mealSlotEnum,
    }),
    to: z.object({
      dayIndex: z.number().min(0).max(6),
      slotType: mealSlotEnum,
    }),
  }),
  z.object({
    action: z.literal("clear"),
    dayIndex: z.number().min(0).max(6),
    slotType: mealSlotEnum,
  }),
]);

type MealSlotAction = z.infer<typeof mealSlotActionSchema>;

export function updateMealSlots(action: MealSlotAction): MealSlot[] {
  const payload = mealSlotActionSchema.parse(action);

  if (payload.action === "assign") {
    db.prepare(
      `UPDATE meal_slots SET meal_id = @mealId
       WHERE day_index = @dayIndex AND slot_type = @slotType`
    ).run(payload);
    return getMealSlots();
  }

  if (payload.action === "clear") {
    db.prepare(
      `UPDATE meal_slots SET meal_id = NULL
       WHERE day_index = @dayIndex AND slot_type = @slotType`
    ).run(payload);
    return getMealSlots();
  }

  const fromSlot = db
    .prepare(
      `SELECT id, meal_id FROM meal_slots
       WHERE day_index = @dayIndex AND slot_type = @slotType`
    )
    .get(payload.from) as { id: number; meal_id: number | null } | undefined;
  const toSlot = db
    .prepare(
      `SELECT id, meal_id FROM meal_slots
       WHERE day_index = @dayIndex AND slot_type = @slotType`
    )
    .get(payload.to) as { id: number; meal_id: number | null } | undefined;

  if (!fromSlot) {
    throw new Error("Source slot not found");
  }

  if (!fromSlot.meal_id) {
    return getMealSlots();
  }

  if (!toSlot) {
    throw new Error("Target slot not found");
  }

  const updateSlot = db.prepare(`UPDATE meal_slots SET meal_id = ? WHERE id = ?`);

  if (toSlot.meal_id && toSlot.meal_id !== fromSlot.meal_id) {
    const tempMealId = toSlot.meal_id;
    updateSlot.run(fromSlot.meal_id, toSlot.id);
    updateSlot.run(tempMealId, fromSlot.id);
  } else {
    updateSlot.run(fromSlot.meal_id, toSlot.id);
    updateSlot.run(null, fromSlot.id);
  }

  return getMealSlots();
}

const workoutScheduleSchema = z.object({
  dayIndex: z.number().min(0).max(6),
  workoutId: z.number().nullable(),
  origin: z.enum(["auto", "custom"]).optional(),
});

type WorkoutSchedulePayload = z.infer<typeof workoutScheduleSchema>;

export function updateWorkoutSchedule(
  payload: WorkoutSchedulePayload
): WorkoutSchedule[] {
  const data = workoutScheduleSchema.parse(payload);
  const source = data.workoutId ? data.origin ?? "custom" : "rest";
  db.prepare(
    `INSERT INTO workout_schedule (day_index, workout_id, source)
     VALUES (@dayIndex, @workoutId, @source)
     ON CONFLICT(day_index) DO UPDATE SET workout_id = excluded.workout_id, source = excluded.source`
  ).run({ ...data, source });

  return getWorkoutSchedule();
}
