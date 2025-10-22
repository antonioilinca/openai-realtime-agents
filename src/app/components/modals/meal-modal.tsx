"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { MEAL_SLOTS, type MealSlotKey } from "@/app/lib/schema";
import { cn } from "@/app/lib/utils";

export type MealFormState = {
  name: string;
  type: MealSlotKey;
  ingredients: string;
  protein: string;
  carbs: string;
  fats: string;
  calories: string;
  substitutions: string;
  notes: string;
};

type MealModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: MealFormState) => Promise<void> | void;
};

const defaultState: MealFormState = {
  name: "",
  type: "breakfast",
  ingredients: "",
  protein: "0",
  carbs: "0",
  fats: "0",
  calories: "0",
  substitutions: "",
  notes: "",
};

export function MealModal({ open, onOpenChange, onSubmit }: MealModalProps) {
  const [form, setForm] = useState<MealFormState>(defaultState);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetForm = () => {
    setForm(defaultState);
    setError(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await onSubmit(form);
      resetForm();
      onOpenChange(false);
    } catch (err: any) {
      setError(err?.message ?? "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const handleOpenChange = (value: boolean) => {
    if (!value) {
      resetForm();
    }
    onOpenChange(value);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogTitle>Create a new meal</DialogTitle>
        <DialogDescription className="mt-2">
          Capture the key details, macros, and any smart substitutions for this
          meal.
        </DialogDescription>
        <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
          <div className="grid gap-3">
            <Label htmlFor="meal-name">Meal name</Label>
            <Input
              id="meal-name"
              value={form.name}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, name: event.target.value }))
              }
              placeholder="e.g. High protein berry smoothie"
              required
            />
          </div>
          <div className="grid gap-3">
            <Label>Meal type</Label>
            <Select
              value={form.type}
              onValueChange={(value) =>
                setForm((prev) => ({ ...prev, type: value as MealSlotKey }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a meal slot" />
              </SelectTrigger>
              <SelectContent>
                {MEAL_SLOTS.map((slot) => (
                  <SelectItem key={slot.key} value={slot.key}>
                    {slot.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="ingredients">Ingredients</Label>
            <Textarea
              id="ingredients"
              value={form.ingredients}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, ingredients: event.target.value }))
              }
              placeholder="List the core ingredients and quantities"
              required
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
            {(
              [
                { key: "protein", label: "Protein (g)" },
                { key: "carbs", label: "Carbs (g)" },
                { key: "fats", label: "Fats (g)" },
                { key: "calories", label: "Calories" },
              ] as const
            ).map((field) => (
              <div className="grid gap-2" key={field.key}>
                <Label htmlFor={field.key}>{field.label}</Label>
                <Input
                  id={field.key}
                  type="number"
                  inputMode="decimal"
                  value={form[field.key]}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      [field.key]: event.target.value,
                    }))
                  }
                  min="0"
                  step="0.1"
                  required
                />
              </div>
            ))}
          </div>
          <div className="grid gap-3">
            <Label htmlFor="substitutions">Allowed substitutions</Label>
            <Input
              id="substitutions"
              value={form.substitutions}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  substitutions: event.target.value,
                }))
              }
              placeholder="Comma separated list (e.g. salmon, grilled chicken, tofu)"
            />
            <p className={cn("text-xs text-slate-500")}>We will match these to
              other meals of the same type when cycling options.</p>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="meal-notes">Notes</Label>
            <Textarea
              id="meal-notes"
              value={form.notes}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, notes: event.target.value }))
              }
              placeholder="Preparation cues, timing tips, or substitution guidance"
            />
          </div>
          {error ? (
            <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-2 text-sm text-red-200">
              {error}
            </div>
          ) : null}
          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => handleOpenChange(false)}
              disabled={saving}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save meal"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
