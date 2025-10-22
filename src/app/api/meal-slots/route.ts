import { NextResponse } from "next/server";
import { updateMealSlots } from "@/app/lib/data";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const mealSlots = updateMealSlots(payload);
    return NextResponse.json({ mealSlots });
  } catch (error: any) {
    console.error("Failed to update meal slot", error);
    return NextResponse.json(
      { error: error?.message ?? "Unable to update meal slot" },
      { status: 400 }
    );
  }
}
