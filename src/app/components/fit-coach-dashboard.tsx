"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useDroppable,
  useDraggable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import {
  DAY_LABELS,
  MEAL_SLOTS,
  type DashboardData,
  type Meal,
  type MealSlot,
  type MealSlotKey,
  type Workout,
  type WorkoutSchedule,
} from "@/app/lib/schema";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { OnboardingForm } from "./onboarding-form";
import { MealModal, type MealFormState } from "./modals/meal-modal";
import { ExerciseModal } from "./modals/exercise-modal";
import { cn } from "@/app/lib/utils";
import { DotsVerticalIcon, LightningBoltIcon } from "@radix-ui/react-icons";

const slotLabels = MEAL_SLOTS.reduce<Record<MealSlotKey, string>>(
  (acc, slot) => {
    acc[slot.key] = slot.label;
    return acc;
  },
  {} as Record<MealSlotKey, string>
);

type DragMeal = {
  type: "meal";
  mealId: number;
  fromSlot?: {
    dayIndex: number;
    slotType: MealSlotKey;
  };
};

type DragWorkout = {
  type: "workout";
  workoutId: number;
  fromDay?: number;
};

type ActiveDrag = DragMeal | DragWorkout | null;

const feedbackStyles = {
  success: "bg-emerald-500/10 border-emerald-500/30 text-emerald-200",
  error: "bg-rose-500/10 border-rose-500/30 text-rose-200",
} as const;

function useBanner() {
  const [banner, setBanner] = useState<
    { type: keyof typeof feedbackStyles; message: string } | null
  >(null);

  useEffect(() => {
    if (!banner) return;
    const timeout = setTimeout(() => setBanner(null), 4200);
    return () => clearTimeout(timeout);
  }, [banner]);

  const showBanner = (type: keyof typeof feedbackStyles, message: string) => {
    setBanner({ type, message });
  };

  return { banner, showBanner, clearBanner: () => setBanner(null) };
}

type FitCoachDashboardProps = {
  initialData: DashboardData;
};

export default function FitCoachDashboard({
  initialData,
}: FitCoachDashboardProps) {
  const [profile, setProfile] = useState(initialData.profile);
  const [meals, setMeals] = useState<Meal[]>(initialData.meals);
  const [mealSlots, setMealSlots] = useState<MealSlot[]>(initialData.mealSlots);
  const [workouts, setWorkouts] = useState<Workout[]>(initialData.workouts);
  const [workoutSchedule, setWorkoutSchedule] = useState<
    WorkoutSchedule[]
  >(initialData.workoutSchedule);
  const [isMealModalOpen, setMealModalOpen] = useState(false);
  const [isExerciseModalOpen, setExerciseModalOpen] = useState(false);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  );
  const { banner, showBanner, clearBanner } = useBanner();
  const [activeDrag, setActiveDrag] = useState<ActiveDrag>(null);
  const [isLoading, setIsLoading] = useState(false);

  const mealsById = useMemo(() => {
    return new Map(meals.map((meal) => [meal.id, meal]));
  }, [meals]);

  const workoutsById = useMemo(() => {
    return new Map(workouts.map((workout) => [workout.id, workout]));
  }, [workouts]);

  const slotsByDay = useMemo(() => {
    return DAY_LABELS.map((_, dayIndex) =>
      MEAL_SLOTS.map((slot) =>
        mealSlots.find(
          (entry) =>
            entry.dayIndex === dayIndex && entry.slotType === (slot.key as MealSlotKey)
        )
      ).filter(Boolean) as MealSlot[]
    );
  }, [mealSlots]);

  const scheduleByDay = useMemo(() => {
    return workoutSchedule.reduce<Record<number, WorkoutSchedule>>((acc, item) => {
      acc[item.dayIndex] = item;
      return acc;
    }, {});
  }, [workoutSchedule]);

  const trainingDays = useMemo(() => {
    return workoutSchedule
      .filter((entry) => entry.workoutId != null)
      .map((entry) => entry.dayIndex);
  }, [workoutSchedule]);

  const handleProfileComplete = async (values: {
    weight: string;
    height: string;
    age: string;
    activityLevel: number;
    goal: "fat_loss" | "cutting" | "muscle_gain";
    location: "home" | "gym";
  }) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          weight: Number(values.weight),
          height: Number(values.height),
          age: Number(values.age),
          activityLevel: values.activityLevel,
          goal: values.goal,
          location: values.location,
        }),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error?.error ?? "Unable to save profile");
      }
      const data: DashboardData = await response.json();
      setProfile(data.profile);
      setMeals(data.meals);
      setMealSlots(data.mealSlots);
      setWorkouts(data.workouts);
      setWorkoutSchedule(data.workoutSchedule);
      showBanner("success", "Plan generated! Drag meals and workouts into your week.");
    } catch (error: any) {
      showBanner("error", error?.message ?? "Failed to generate plan");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const createMeal = async (values: MealFormState) => {
    const response = await fetch("/api/meals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...values,
        protein: Number(values.protein),
        carbs: Number(values.carbs),
        fats: Number(values.fats),
        calories: Number(values.calories),
        substitutions: values.substitutions
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error?.error ?? "Unable to create meal");
    }
    const meal: Meal = await response.json();
    setMeals((prev) => [...prev, meal]);
    showBanner("success", "Meal added to your library");
  };

  const createWorkout = async (values: {
    name: string;
    equipment: string;
    sets: string;
    reps: string;
    duration: string;
    rest: string;
    notes: string;
    focus: string;
    location: "home" | "gym" | "";
  }) => {
    const response = await fetch("/api/workouts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: values.name,
        equipment: values.equipment,
        sets: values.sets,
        reps: values.reps,
        duration: values.duration,
        rest: values.rest,
        notes: values.notes,
        focus: values.focus,
        location: values.location || undefined,
      }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error?.error ?? "Unable to create workout");
    }
    const workout: Workout = await response.json();
    setWorkouts((prev) => [...prev, workout]);
    showBanner("success", "Workout added to your planner");
  };

  const assignMeal = async (
    slot: { dayIndex: number; slotType: MealSlotKey },
    mealId: number
  ) => {
    const response = await fetch("/api/meal-slots", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "assign",
        dayIndex: slot.dayIndex,
        slotType: slot.slotType,
        mealId,
      }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error?.error ?? "Unable to assign meal");
    }
    const data = await response.json();
    setMealSlots(data.mealSlots);
  };

  const moveMeal = async (
    from: { dayIndex: number; slotType: MealSlotKey },
    to: { dayIndex: number; slotType: MealSlotKey }
  ) => {
    const response = await fetch("/api/meal-slots", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "move",
        from,
        to,
      }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error?.error ?? "Unable to move meal");
    }
    const data = await response.json();
    setMealSlots(data.mealSlots);
  };

  const clearMeal = async (slot: {
    dayIndex: number;
    slotType: MealSlotKey;
  }) => {
    const response = await fetch("/api/meal-slots", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "clear",
        dayIndex: slot.dayIndex,
        slotType: slot.slotType,
      }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error?.error ?? "Unable to clear slot");
    }
    const data = await response.json();
    setMealSlots(data.mealSlots);
  };

  const updateWorkoutDay = async (
    payload: { dayIndex: number; workoutId: number | null; origin?: "auto" | "custom" }
  ) => {
    const response = await fetch("/api/workout-schedule", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error?.error ?? "Unable to update workout schedule");
    }
    const data = await response.json();
    setWorkoutSchedule(data.workoutSchedule);
  };

  const handleChangeFood = async (
    slot: MealSlot,
    direction: 1 | -1 = 1
  ) => {
    if (!slot.meal) return;
    const currentMeal = mealsById.get(slot.mealId ?? 0);
    if (!currentMeal) return;
    const pool: Meal[] = [];
    const seen = new Set<number>();
    const normalizedNames = new Set(
      [currentMeal.name, ...currentMeal.substitutions].map((name) =>
        name.toLowerCase()
      )
    );

    meals.forEach((meal) => {
      if (meal.type !== slot.slotType) return;
      if (normalizedNames.has(meal.name.toLowerCase())) {
        if (!seen.has(meal.id)) {
          pool.push(meal);
          seen.add(meal.id);
        }
      }
    });

    if (pool.length === 0) {
      // fallback to all meals of same type
      meals.forEach((meal) => {
        if (meal.type === slot.slotType && !seen.has(meal.id)) {
          pool.push(meal);
          seen.add(meal.id);
        }
      });
    }

    if (pool.length === 0) return;
    const currentIndex = pool.findIndex((meal) => meal.id === currentMeal.id);
    const nextIndex = (currentIndex + direction + pool.length) % pool.length;
    const nextMeal = pool[nextIndex];
    if (!nextMeal || nextMeal.id === currentMeal.id) return;
    await assignMeal({ dayIndex: slot.dayIndex, slotType: slot.slotType }, nextMeal.id);
    showBanner("success", `${slotLabels[slot.slotType]} swapped to ${nextMeal.name}`);
  };

  const handleWorkoutClear = async (dayIndex: number) => {
    await updateWorkoutDay({ dayIndex, workoutId: null });
    showBanner("success", "Workout removed from that day");
  };

  const handleDragStart = (event: DragStartEvent) => {
    const data = event.active.data.current as ActiveDrag | undefined;
    if (data) {
      setActiveDrag(data);
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const activeData = event.active.data.current as ActiveDrag | undefined;
    const overData = event.over?.data.current as
      | { type: "meal-slot"; dayIndex: number; slotType: MealSlotKey }
      | { type: "workout-day"; dayIndex: number }
      | undefined;

    setActiveDrag(null);

    if (!activeData || !overData) {
      return;
    }

    try {
      if (activeData.type === "meal" && overData.type === "meal-slot") {
        const meal = mealsById.get(activeData.mealId);
        if (!meal) return;
        if (meal.type !== overData.slotType) {
          showBanner(
            "error",
            `${meal.name} is designed for the ${slotLabels[meal.type]} slot.`
          );
          return;
        }

        if (
          activeData.fromSlot &&
          activeData.fromSlot.dayIndex === overData.dayIndex &&
          activeData.fromSlot.slotType === overData.slotType
        ) {
          return;
        }

        if (activeData.fromSlot) {
          await moveMeal(activeData.fromSlot, {
            dayIndex: overData.dayIndex,
            slotType: overData.slotType,
          });
          showBanner("success", "Meal moved");
        } else {
          await assignMeal(
            { dayIndex: overData.dayIndex, slotType: overData.slotType },
            meal.id
          );
          showBanner("success", `${meal.name} added to ${DAY_LABELS[overData.dayIndex]}`);
        }
      }

      if (activeData.type === "workout" && overData.type === "workout-day") {
        const workout = workoutsById.get(activeData.workoutId);
        if (!workout) return;
        if (activeData.fromDay === overData.dayIndex) {
          return;
        }
        await updateWorkoutDay({
          dayIndex: overData.dayIndex,
          workoutId: workout.id,
          origin: workout.origin,
        });
        if (activeData.fromDay != null) {
          await updateWorkoutDay({ dayIndex: activeData.fromDay, workoutId: null });
        }
        showBanner("success", `${workout.name} scheduled for ${DAY_LABELS[overData.dayIndex]}`);
      }
    } catch (error: any) {
      console.error(error);
      showBanner("error", error?.message ?? "Drag action failed");
    }
  };

  const renderMealOverlay = () => {
    if (!activeDrag || activeDrag.type !== "meal") return null;
    const meal = mealsById.get(activeDrag.mealId);
    if (!meal) return null;
    return <MealCardPreview meal={meal} />;
  };

  const renderWorkoutOverlay = () => {
    if (!activeDrag || activeDrag.type !== "workout") return null;
    const workout = workoutsById.get(activeDrag.workoutId);
    if (!workout) return null;
    return <WorkoutCardPreview workout={workout} />;
  };

  if (!profile) {
    return (
      <OnboardingForm
        onComplete={async (values) => {
          await handleProfileComplete(values);
        }}
      />
    );
  }

  return (
    <div className="pb-20">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
              Fit Coach Plan
            </p>
            <h1 className="mt-2 text-4xl font-semibold text-slate-50">
              Your personalized training & nutrition map
            </h1>
            <p className="mt-4 max-w-2xl text-sm text-slate-400">
              Drag meals into each slot to match your macros and align workouts
              with the days you prefer to train. Update cards anytime and we keep
              everything synced in your local plan.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="sky" className="text-xs uppercase tracking-wide">
              {profile.goal.replace("_", " ")}
            </Badge>
            <Badge variant="outline">
              {profile.activity_level} day split · {profile.location === "gym" ? "Gym" : "Home"}
            </Badge>
          </div>
        </div>
        {banner ? (
          <div
            className={cn(
              "mt-6 flex items-center justify-between rounded-2xl border px-5 py-3 text-sm",
              feedbackStyles[banner.type]
            )}
          >
            <span>{banner.message}</span>
            <button
              className="text-xs uppercase tracking-wide text-slate-400 hover:text-slate-200"
              onClick={clearBanner}
            >
              Dismiss
            </button>
          </div>
        ) : null}
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          <MacroCard label="Daily calories" value={profile.calories} suffix="kcal" accent="bg-sky-500/10 text-sky-200" />
          <MacroCard label="Protein" value={profile.protein} suffix="g" accent="bg-emerald-500/10 text-emerald-200" />
          <MacroCard label="Carbs" value={profile.carbs} suffix="g" accent="bg-blue-500/10 text-blue-200" />
          <MacroCard label="Fats" value={profile.fats} suffix="g" accent="bg-amber-500/10 text-amber-200" />
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-400">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-700/60 px-3 py-1">
            <LightningBoltIcon className="h-3 w-3 text-sky-400" /> Hydration target: {profile.water} L / day
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-700/60 px-3 py-1">
            Training days: {trainingDays.length ? trainingDays.map((day) => DAY_LABELS[day].slice(0, 3)).join(" · ") : "None scheduled yet"}
          </span>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 lg:flex-row">
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="flex-1 space-y-6">
            <CalendarGrid
              slotsByDay={slotsByDay}
              mealsById={mealsById}
              scheduleByDay={scheduleByDay}
              workoutsById={workoutsById}
              onChangeFood={handleChangeFood}
              onClearMeal={clearMeal}
              onClearWorkout={handleWorkoutClear}
            />
          </div>
          <SidePanel
            meals={meals}
            workouts={workouts}
            onOpenMealModal={() => setMealModalOpen(true)}
            onOpenExerciseModal={() => setExerciseModalOpen(true)}
          />
          <DragOverlay modifiers={[]}>
            {renderMealOverlay() ?? renderWorkoutOverlay()}
          </DragOverlay>
        </DndContext>
      </div>

      <MealModal
        open={isMealModalOpen}
        onOpenChange={setMealModalOpen}
        onSubmit={createMeal}
      />
      <ExerciseModal
        open={isExerciseModalOpen}
        onOpenChange={setExerciseModalOpen}
        onSubmit={createWorkout}
      />

      {isLoading ? (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm">
          <div className="rounded-2xl border border-slate-700/60 bg-slate-900/90 px-8 py-6 text-sm text-slate-200 shadow-lg">
            Calculating your plan...
          </div>
        </div>
      ) : null}
    </div>
  );
}

type MacroCardProps = {
  label: string;
  value: number;
  suffix: string;
  accent: string;
};

function MacroCard({ label, value, suffix, accent }: MacroCardProps) {
  return (
    <Card className="border-slate-800/80 bg-slate-900/60">
      <CardHeader className="pb-3">
        <span className="text-xs uppercase tracking-wide text-slate-500">
          {label}
        </span>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="text-3xl font-semibold text-slate-50">
          {value}
          <span className="ml-1 text-base font-medium text-slate-400">
            {suffix}
          </span>
        </div>
        <div className={cn("mt-3 inline-flex items-center rounded-full px-3 py-1 text-xs", accent)}>
          target synced daily
        </div>
      </CardContent>
    </Card>
  );
}

type CalendarGridProps = {
  slotsByDay: MealSlot[][];
  mealsById: Map<number, Meal>;
  scheduleByDay: Record<number, WorkoutSchedule>;
  workoutsById: Map<number, Workout>;
  onChangeFood: (slot: MealSlot) => Promise<void> | void;
  onClearMeal: (slot: { dayIndex: number; slotType: MealSlotKey }) => Promise<void> | void;
  onClearWorkout: (dayIndex: number) => Promise<void> | void;
};

function CalendarGrid({
  slotsByDay,
  mealsById,
  scheduleByDay,
  workoutsById,
  onChangeFood,
  onClearMeal,
  onClearWorkout,
}: CalendarGridProps) {
  return (
    <div className="grid gap-4 xl:grid-cols-7">
      {DAY_LABELS.map((day, index) => {
        const workoutEntry = scheduleByDay[index];
        const workout = workoutEntry?.workoutId
          ? workoutsById.get(workoutEntry.workoutId) ?? null
          : null;
        return (
          <div
            key={day}
            className="flex flex-col gap-3 rounded-3xl border border-slate-800/70 bg-slate-900/50 p-4 backdrop-blur"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                  {`Day ${index + 1}`}
                </p>
                <h3 className="text-lg font-semibold text-slate-100">{day}</h3>
              </div>
              {workout ? (
                <Badge variant="sky" className="text-[10px] uppercase">
                  Training
                </Badge>
              ) : null}
            </div>
            <WorkoutDropZone
              dayIndex={index}
              workout={workout}
              onClear={() => onClearWorkout(index)}
            />
            <Separator className="bg-slate-800/60" />
            <div className="flex flex-col gap-3">
              {slotsByDay[index].map((slot) => (
                <MealDropZone
                  key={`${slot.dayIndex}-${slot.slotType}`}
                  slot={slot}
                  meal={slot.mealId != null ? mealsById.get(slot.mealId) ?? null : null}
                  onClear={() =>
                    onClearMeal({
                      dayIndex: slot.dayIndex,
                      slotType: slot.slotType,
                    })
                  }
                  onChange={() => onChangeFood(slot)}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

type MealDropZoneProps = {
  slot: MealSlot;
  meal: Meal | null;
  onClear: () => void;
  onChange: () => void;
};

function MealDropZone({ slot, meal, onClear, onChange }: MealDropZoneProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: `meal-slot-${slot.dayIndex}-${slot.slotType}`,
    data: {
      type: "meal-slot" as const,
      dayIndex: slot.dayIndex,
      slotType: slot.slotType,
    },
  });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "rounded-2xl border border-dashed border-slate-800/80 bg-slate-900/60 p-4",
        isOver && "border-sky-500/60 bg-slate-900/80"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-wide text-slate-500">
            {slotLabels[slot.slotType]}
          </p>
          {meal ? (
            <MealCard
              meal={meal}
              slot={slot}
              onClear={onClear}
              onChange={onChange}
            />
          ) : (
            <p className="mt-3 text-xs text-slate-500">
              Drag a {slotLabels[slot.slotType].toLowerCase()} option here.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

type MealCardProps = {
  meal: Meal;
  slot?: MealSlot;
  onClear?: () => void;
  onChange?: () => void;
  compact?: boolean;
  showHandle?: boolean;
};

function MealCard({
  meal,
  slot,
  onClear,
  onChange,
  compact = false,
  showHandle = true,
}: MealCardProps) {
  const id = slot
    ? `meal-slot-card-${slot.dayIndex}-${slot.slotType}`
    : `meal-card-${meal.id}`;
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
    data: {
      type: "meal" as const,
      mealId: meal.id,
      fromSlot: slot
        ? { dayIndex: slot.dayIndex, slotType: slot.slotType }
        : undefined,
    },
  });

  const style = transform
    ? {
        transform: CSS.Translate.toString(transform),
      }
    : undefined;

  const macroBadges = (
    <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-slate-300">
      <Badge variant="outline">P {meal.protein}g</Badge>
      <Badge variant="outline">C {meal.carbs}g</Badge>
      <Badge variant="outline">F {meal.fats}g</Badge>
      <Badge variant="outline">{meal.calories} kcal</Badge>
    </div>
  );

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "mt-2 rounded-2xl border border-slate-800/70 bg-slate-950/60 p-4 shadow-md shadow-slate-950/40",
        isDragging && "opacity-60"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <h4 className="text-sm font-semibold text-slate-100">{meal.name}</h4>
          {!compact ? (
            <p className="text-xs text-slate-400 line-clamp-2">
              {meal.ingredients}
            </p>
          ) : null}
        </div>
        {showHandle ? (
          <button
            className="rounded-full border border-slate-700/70 bg-slate-800/80 p-1 text-slate-400 hover:text-slate-100"
            {...listeners}
            {...attributes}
            onMouseDown={(event) => event.stopPropagation()}
            onTouchStart={(event) => event.stopPropagation()}
          >
            <DotsVerticalIcon className="h-4 w-4" />
          </button>
        ) : null}
      </div>
      {!compact ? macroBadges : null}
      {!compact && meal.notes ? (
        <p className="mt-3 text-[11px] text-slate-500 line-clamp-2">
          {meal.notes}
        </p>
      ) : null}
      {!compact && (onClear || onChange) ? (
        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          {onChange ? (
            <Button
              size="sm"
              variant="ghost"
              onClick={(event) => {
                event.stopPropagation();
                void Promise.resolve(onChange()).catch((error) =>
                  console.error(error)
                );
              }}
            >
              Change food
            </Button>
          ) : null}
          {onClear ? (
            <Button
              size="sm"
              variant="outline"
              onClick={(event) => {
                event.stopPropagation();
                void Promise.resolve(onClear()).catch((error) =>
                  console.error(error)
                );
              }}
            >
              Remove
            </Button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

type WorkoutDropZoneProps = {
  dayIndex: number;
  workout: Workout | null;
  onClear: () => void;
};

function WorkoutDropZone({ dayIndex, workout, onClear }: WorkoutDropZoneProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: `workout-day-${dayIndex}`,
    data: {
      type: "workout-day" as const,
      dayIndex,
    },
  });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4",
        isOver && "border-sky-500/60 bg-slate-900/80"
      )}
    >
      <div className="flex items-center justify-between">
        <p className="text-[11px] uppercase tracking-wide text-slate-500">
          Workout focus
        </p>
        {workout ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={(event) => {
              event.stopPropagation();
              void Promise.resolve(onClear()).catch((error) =>
                console.error(error)
              );
            }}
          >
            Clear
          </Button>
        ) : null}
      </div>
      {workout ? (
        <WorkoutCard workout={workout} dayIndex={dayIndex} />
      ) : (
        <p className="mt-3 text-xs text-slate-500">
          Drag a workout block here to anchor today&apos;s training.
        </p>
      )}
    </div>
  );
}

type WorkoutCardProps = {
  workout: Workout;
  dayIndex?: number;
  compact?: boolean;
  showHandle?: boolean;
};

function WorkoutCard({
  workout,
  dayIndex,
  compact = false,
  showHandle = true,
}: WorkoutCardProps) {
  const id = dayIndex != null ? `workout-day-card-${dayIndex}` : `workout-card-${workout.id}`;
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
    data: {
      type: "workout" as const,
      workoutId: workout.id,
      fromDay: dayIndex,
    },
  });

  const style = transform
    ? {
        transform: CSS.Translate.toString(transform),
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "mt-3 rounded-2xl border border-slate-800/70 bg-slate-950/60 p-4 shadow-md shadow-slate-950/40",
        isDragging && "opacity-60"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4 className="text-sm font-semibold text-slate-100">{workout.name}</h4>
          {!compact && workout.focus ? (
            <p className="text-[11px] uppercase tracking-wide text-slate-500">
              {workout.focus}
            </p>
          ) : null}
        </div>
        {showHandle ? (
          <button
            className="rounded-full border border-slate-700/70 bg-slate-800/80 p-1 text-slate-400 hover:text-slate-100"
            {...listeners}
            {...attributes}
            onMouseDown={(event) => event.stopPropagation()}
            onTouchStart={(event) => event.stopPropagation()}
          >
            <DotsVerticalIcon className="h-4 w-4" />
          </button>
        ) : null}
      </div>
      {!compact ? (
        <div className="mt-3 grid gap-2 text-xs text-slate-300">
          {workout.sets ? <p>Sets: {workout.sets}</p> : null}
          {workout.reps ? <p>Reps/Time: {workout.reps}</p> : null}
          {workout.duration ? <p>Duration: {workout.duration}</p> : null}
          {workout.rest ? <p>Rest: {workout.rest}</p> : null}
          {workout.equipment ? <p>Equipment: {workout.equipment}</p> : null}
          {workout.notes ? (
            <p className="text-[11px] text-slate-500">{workout.notes}</p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

type SidePanelProps = {
  meals: Meal[];
  workouts: Workout[];
  onOpenMealModal: () => void;
  onOpenExerciseModal: () => void;
};

function SidePanel({ meals, workouts, onOpenMealModal, onOpenExerciseModal }: SidePanelProps) {
  return (
    <aside className="w-full shrink-0 lg:w-80">
      <div className="sticky top-10 flex flex-col gap-6">
        <Card className="border-slate-800/80 bg-slate-900/60">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-slate-100">Plan builder</CardTitle>
            <p className="text-xs text-slate-500">
              Drag meal and workout cards into the calendar to build your week.
            </p>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full" onClick={onOpenMealModal}>
              New Meal
            </Button>
            <Button className="w-full" variant="secondary" onClick={onOpenExerciseModal}>
              New Exercise
            </Button>
          </CardContent>
        </Card>
        <Card className="border-slate-800/80 bg-slate-900/60">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-slate-200">Meal library</CardTitle>
            <p className="text-xs text-slate-500">
              These are matched to their meal slots to keep macros aligned.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {MEAL_SLOTS.map((slot) => (
              <div key={slot.key} className="space-y-2">
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  {slot.label}
                </p>
                <div className="space-y-2">
                  {meals
                    .filter((meal) => meal.type === slot.key)
                    .map((meal) => (
                      <MealCard key={meal.id} meal={meal} compact />
                    ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="border-slate-800/80 bg-slate-900/60">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-slate-200">Workout plan</CardTitle>
            <p className="text-xs text-slate-500">
              Use the generated split or add your own training sessions.
            </p>
          </CardHeader>
          <CardContent className="space-y-2">
            {workouts.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} compact />
            ))}
          </CardContent>
        </Card>
      </div>
    </aside>
  );
}

function MealCardPreview({ meal }: { meal: Meal }) {
  return (
    <div className="mt-2 rounded-2xl border border-slate-800/70 bg-slate-950/60 p-4 shadow-md shadow-slate-950/40">
      <h4 className="text-sm font-semibold text-slate-100">{meal.name}</h4>
      <p className="mt-2 text-xs text-slate-400 line-clamp-2">{meal.ingredients}</p>
      <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-slate-300">
        <Badge variant="outline">P {meal.protein}g</Badge>
        <Badge variant="outline">C {meal.carbs}g</Badge>
        <Badge variant="outline">F {meal.fats}g</Badge>
        <Badge variant="outline">{meal.calories} kcal</Badge>
      </div>
    </div>
  );
}

function WorkoutCardPreview({ workout }: { workout: Workout }) {
  return (
    <div className="mt-3 rounded-2xl border border-slate-800/70 bg-slate-950/60 p-4 shadow-md shadow-slate-950/40">
      <h4 className="text-sm font-semibold text-slate-100">{workout.name}</h4>
      {workout.focus ? (
        <p className="text-[11px] uppercase tracking-wide text-slate-500 mt-1">
          {workout.focus}
        </p>
      ) : null}
      <div className="mt-3 grid gap-2 text-xs text-slate-300">
        {workout.sets ? <p>Sets: {workout.sets}</p> : null}
        {workout.reps ? <p>Reps/Time: {workout.reps}</p> : null}
        {workout.duration ? <p>Duration: {workout.duration}</p> : null}
        {workout.rest ? <p>Rest: {workout.rest}</p> : null}
      </div>
    </div>
  );
}
