import { NextResponse } from "next/server";
import { saveProfile } from "@/app/lib/data";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const data = saveProfile({
      weight: Number(payload.weight),
      height: Number(payload.height),
      age: Number(payload.age),
      activityLevel: Number(payload.activityLevel),
      goal: payload.goal,
      location: payload.location,
    });
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Failed to save profile", error);
    return NextResponse.json(
      { error: error?.message ?? "Unable to save profile" },
      { status: 400 }
    );
  }
}
