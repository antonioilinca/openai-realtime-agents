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

type ExerciseFormState = {
  name: string;
  equipment: string;
  sets: string;
  reps: string;
  duration: string;
  rest: string;
  notes: string;
  focus: string;
  location: "home" | "gym" | "";
};

type ExerciseModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: ExerciseFormState) => Promise<void> | void;
};

const defaultState: ExerciseFormState = {
  name: "",
  equipment: "",
  sets: "",
  reps: "",
  duration: "",
  rest: "",
  notes: "",
  focus: "",
  location: "",
};

export function ExerciseModal({ open, onOpenChange, onSubmit }: ExerciseModalProps) {
  const [form, setForm] = useState<ExerciseFormState>(defaultState);
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
      setError(err?.message ?? "Unable to create workout");
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
        <DialogTitle>New exercise or training block</DialogTitle>
        <DialogDescription className="mt-2">
          Add a workout card with sets, reps, rest targets, and notes to drag
          into the weekly split.
        </DialogDescription>
        <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
          <div className="grid gap-3">
            <Label htmlFor="exercise-name">Title</Label>
            <Input
              id="exercise-name"
              value={form.name}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, name: event.target.value }))
              }
              placeholder="e.g. Upper body power"
              required
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
            <div className="grid gap-2">
              <Label htmlFor="sets">Sets</Label>
              <Input
                id="sets"
                value={form.sets}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, sets: event.target.value }))
                }
                placeholder="e.g. 4"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="reps">Reps / Time</Label>
              <Input
                id="reps"
                value={form.reps}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, reps: event.target.value }))
                }
                placeholder="e.g. 10-12 or 45 sec"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                value={form.duration}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, duration: event.target.value }))
                }
                placeholder="Optional session duration"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="rest">Rest</Label>
              <Input
                id="rest"
                value={form.rest}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, rest: event.target.value }))
                }
                placeholder="e.g. 90 sec"
              />
            </div>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="equipment">Equipment</Label>
            <Input
              id="equipment"
              value={form.equipment}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, equipment: event.target.value }))
              }
              placeholder="List the primary equipment"
            />
          </div>
          <div className="grid gap-3">
            <Label>Preferred location</Label>
            <Select
              value={form.location}
              onValueChange={(value) =>
                setForm((prev) => ({ ...prev, location: value as ExerciseFormState["location"] }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Use profile default" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Profile default</SelectItem>
                <SelectItem value="home">Home</SelectItem>
                <SelectItem value="gym">Gym</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="focus">Focus</Label>
            <Input
              id="focus"
              value={form.focus}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, focus: event.target.value }))
              }
              placeholder="e.g. Push, posterior chain, conditioning"
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="exercise-notes">Notes</Label>
            <Textarea
              id="exercise-notes"
              value={form.notes}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, notes: event.target.value }))
              }
              placeholder="Coaching cues, tempo directives, or substitutions"
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
              {saving ? "Saving..." : "Save workout"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
