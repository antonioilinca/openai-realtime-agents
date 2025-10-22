import { NextResponse } from "next/server";
import { createWorkout } from "@/app/lib/data";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const workout = createWorkout({
      name: payload.name,
      equipment: payload.equipment ?? null,
      sets: payload.sets ?? null,
      reps: payload.reps ?? null,
      duration: payload.duration ?? null,
      rest: payload.rest ?? null,
      notes: payload.notes ?? null,
      focus: payload.focus ?? null,
      location: payload.location ?? undefined,
    });

    return NextResponse.json(workout);
  } catch (error: any) {
    console.error("Failed to create workout", error);
    return NextResponse.json(
      { error: error?.message ?? "Unable to create workout" },
      { status: 400 }
    );
  }
}
