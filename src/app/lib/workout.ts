import { ProfileInput } from "./calculations";

type WorkoutSeed = {
  name: string;
  equipment: string;
  sets: string;
  reps?: string;
  duration?: string;
  rest: string;
  notes: string;
  focus: string;
  location: "home" | "gym";
};

const gymSequence: WorkoutSeed[] = [
  {
    name: "Full Body Power Day",
    equipment: "Barbell, dumbbells, cable machines",
    sets: "4",
    reps: "5-6 reps on compounds",
    rest: "120s",
    notes:
      "Heavy compound lifts to drive overall strength; finish with core stabilization work.",
    focus: "Full Body",
    location: "gym",
  },
  {
    name: "Upper Body Strength",
    equipment: "Bench, dumbbells, cable row",
    sets: "3-4",
    reps: "6-10",
    rest: "90s",
    notes: "Emphasis on pushing and pulling balance with accessory supersets.",
    focus: "Upper Strength",
    location: "gym",
  },
  {
    name: "Lower Body Strength",
    equipment: "Squat rack, leg press, hamstring curl",
    sets: "4",
    reps: "8-12",
    rest: "90s",
    notes: "Glute and hamstring bias to complement quad work; finish with calf raises.",
    focus: "Lower Strength",
    location: "gym",
  },
  {
    name: "Push Hypertrophy",
    equipment: "Bench, cables, dumbbells",
    sets: "3",
    reps: "10-12",
    rest: "75s",
    notes: "High volume chest, shoulders, and triceps with tempo work.",
    focus: "Push",
    location: "gym",
  },
  {
    name: "Pull Hypertrophy",
    equipment: "Pull-up bar, cable row, dumbbells",
    sets: "3",
    reps: "10-12",
    rest: "75s",
    notes: "Back thickness and width pairing with posterior-chain accessories.",
    focus: "Pull",
    location: "gym",
  },
  {
    name: "Lower Body Volume",
    equipment: "Hack squat, smith machine, sled",
    sets: "4",
    reps: "12-15",
    rest: "75s",
    notes: "Higher rep lower-body finisher with unilateral stability work.",
    focus: "Lower Hypertrophy",
    location: "gym",
  },
  {
    name: "Conditioning & Mobility",
    equipment: "Rower, kettlebell, mat",
    sets: "Circuit",
    duration: "30-35 minutes",
    rest: "Minimal",
    notes: "Interval conditioning followed by full-body mobility flow.",
    focus: "Conditioning",
    location: "gym",
  },
];

const homeSequence: WorkoutSeed[] = [
  {
    name: "Full Body Minimal Equipment",
    equipment: "Resistance bands, chair",
    sets: "4",
    reps: "12-15",
    rest: "60s",
    notes: "Bodyweight and banded supersets targeting all major muscle groups.",
    focus: "Full Body",
    location: "home",
  },
  {
    name: "Upper Body Push/Pull",
    equipment: "Bands, doorway pull-up bar",
    sets: "3",
    reps: "10-15",
    rest: "60s",
    notes: "Alternating pushing and pulling ladders with band-resisted core work.",
    focus: "Upper Body",
    location: "home",
  },
  {
    name: "Lower Body Strength",
    equipment: "Dumbbells or weighted backpack",
    sets: "4",
    reps: "12-15",
    rest: "60s",
    notes: "Tempo squats, lunges, and hinge variations to keep intensity high.",
    focus: "Lower Body",
    location: "home",
  },
  {
    name: "Core & Conditioning",
    equipment: "Yoga mat",
    sets: "Circuit",
    duration: "25-30 minutes",
    rest: "Minimal",
    notes: "AMRAP style intervals with focus on trunk stability and heart rate.",
    focus: "Core",
    location: "home",
  },
  {
    name: "Glute & Hamstring Bias",
    equipment: "Mini bands",
    sets: "3",
    reps: "15-20",
    rest: "60s",
    notes: "Posterior chain burnout to support hip stability and sprint work.",
    focus: "Posterior Chain",
    location: "home",
  },
  {
    name: "Upper Body Volume",
    equipment: "Light dumbbells",
    sets: "3",
    reps: "15-20",
    rest: "45s",
    notes: "High-rep circuits for shoulder health and arm pump.",
    focus: "Upper Pump",
    location: "home",
  },
  {
    name: "Mobility & Recovery",
    equipment: "Foam roller, mat",
    sets: "Flow",
    duration: "20 minutes",
    rest: "Controlled",
    notes: "Recovery flow with breathing resets and active mobility drills.",
    focus: "Recovery",
    location: "home",
  },
];

const trainingDayTemplates: Record<number, number[]> = {
  1: [0],
  2: [0, 3],
  3: [0, 2, 4],
  4: [0, 1, 3, 5],
  5: [0, 1, 3, 4, 6],
  6: [0, 1, 2, 3, 5, 6],
  7: [0, 1, 2, 3, 4, 5, 6],
};

const trainingDaysByFrequency: Record<number, number[]> = {
  1: [0],
  2: [0, 3],
  3: [0, 2, 4],
  4: [0, 1, 3, 5],
  5: [0, 1, 3, 4, 6],
  6: [0, 1, 2, 3, 5, 6],
  7: [0, 1, 2, 3, 4, 5, 6],
};

export function selectTrainingDays(days: number): number[] {
  const bounded = Math.min(Math.max(days, 1), 7);
  return trainingDaysByFrequency[bounded] ?? [0];
}

export function generateWorkoutPlan(profile: ProfileInput) {
  const boundedDays = Math.min(Math.max(profile.activityLevel, 1), 7);
  const library = profile.location === "gym" ? gymSequence : homeSequence;
  const template = trainingDayTemplates[boundedDays] ?? trainingDayTemplates[1];

  const workouts = template.map((index) => library[index % library.length]);
  const trainingDays = selectTrainingDays(boundedDays);

  return { workouts, trainingDays };
}
