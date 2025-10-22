import { NextResponse } from "next/server";
import { updateWorkoutSchedule } from "@/app/lib/data";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const workoutSchedule = updateWorkoutSchedule(payload);
    return NextResponse.json({ workoutSchedule });
  } catch (error: any) {
    console.error("Failed to update workout schedule", error);
    return NextResponse.json(
      { error: error?.message ?? "Unable to update workout schedule" },
      { status: 400 }
    );
  }
}
