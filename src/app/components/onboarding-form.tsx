"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";

const activityLevels = [
  { value: 1, label: "1 day / wk - getting started" },
  { value: 2, label: "2 days / wk" },
  { value: 3, label: "3 days / wk" },
  { value: 4, label: "4 days / wk" },
  { value: 5, label: "5 days / wk" },
  { value: 6, label: "6 days / wk" },
  { value: 7, label: "7 days / wk" },
];

const goals = [
  { value: "fat_loss", label: "Fat loss" },
  { value: "cutting", label: "Cutting" },
  { value: "muscle_gain", label: "Muscle gain" },
];

type OnboardingPayload = {
  weight: string;
  height: string;
  age: string;
  activityLevel: number;
  goal: "fat_loss" | "cutting" | "muscle_gain";
  location: "home" | "gym";
  notes: string;
};

type OnboardingFormProps = {
  onComplete: (payload: OnboardingPayload) => Promise<void> | void;
};

const defaultState: OnboardingPayload = {
  weight: "",
  height: "",
  age: "",
  activityLevel: 3,
  goal: "fat_loss",
  location: "gym",
  notes: "",
};

export function OnboardingForm({ onComplete }: OnboardingFormProps) {
  const [form, setForm] = useState(defaultState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      await onComplete(form);
    } catch (err: any) {
      setError(err?.message ?? "Unable to create your profile. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-4xl items-center justify-center px-6 py-16">
      <Card className="w-full border-slate-800/70 bg-slate-900/80 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-3xl font-semibold text-slate-50">
            Welcome to Fit Coach
          </CardTitle>
          <p className="mt-3 text-sm text-slate-400">
            Answer a few quick questions so we can personalize your nutrition
            targets and build a training split that fits your schedule.
          </p>
        </CardHeader>
        <CardContent>
          <form className="grid gap-6" onSubmit={handleSubmit}>
            <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
              <div className="grid gap-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  inputMode="decimal"
                  value={form.weight}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, weight: event.target.value }))
                  }
                  placeholder="e.g. 78"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  inputMode="decimal"
                  value={form.height}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, height: event.target.value }))
                  }
                  placeholder="e.g. 180"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  inputMode="numeric"
                  value={form.age}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, age: event.target.value }))
                  }
                  placeholder="e.g. 30"
                  required
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="grid gap-2">
                <Label>Training days per week</Label>
                <Select
                  value={String(form.activityLevel)}
                  onValueChange={(value) =>
                    setForm((prev) => ({ ...prev, activityLevel: Number(value) }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select activity level" />
                  </SelectTrigger>
                  <SelectContent>
                    {activityLevels.map((level) => (
                      <SelectItem
                        key={level.value}
                        value={String(level.value)}
                      >
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Primary goal</Label>
                <Select
                  value={form.goal}
                  onValueChange={(value) =>
                    setForm((prev) => ({ ...prev, goal: value as typeof prev.goal }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your goal" />
                  </SelectTrigger>
                  <SelectContent>
                    {goals.map((goal) => (
                      <SelectItem key={goal.value} value={goal.value}>
                        {goal.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Where will you train?</Label>
              <Select
                value={form.location}
                onValueChange={(value) =>
                  setForm((prev) => ({ ...prev, location: value as "home" | "gym" }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a training location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="home">Mostly at home</SelectItem>
                  <SelectItem value="gym">Primarily at the gym</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="notes">Any additional context?</Label>
              <Textarea
                id="notes"
                value={form.notes}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, notes: event.target.value }))
                }
                placeholder="Movement limitations, preferred training times, or nutrition preferences"
              />
              <p className="text-xs text-slate-500">
                Notes stay on your dashboard to remind you and your coach what to
                prioritize.
              </p>
            </div>
            {error ? (
              <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-2 text-sm text-red-200">
                {error}
              </div>
            ) : null}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-slate-500">
                You can adjust these numbers anytime as your plan evolves.
              </p>
              <Button type="submit" size="lg" disabled={isSubmitting}>
                {isSubmitting ? "Calculating plan..." : "Generate my plan"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
