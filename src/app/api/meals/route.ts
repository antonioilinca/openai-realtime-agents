import { NextResponse } from "next/server";
import { createMeal } from "@/app/lib/data";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const meal = createMeal({
      name: payload.name,
      type: payload.type,
      ingredients: payload.ingredients,
      protein: Number(payload.protein ?? 0),
      carbs: Number(payload.carbs ?? 0),
      fats: Number(payload.fats ?? 0),
      calories: Number(payload.calories ?? 0),
      substitutions: Array.isArray(payload.substitutions)
        ? payload.substitutions
        : typeof payload.substitutions === "string" && payload.substitutions.length
        ? payload.substitutions.split(",").map((item: string) => item.trim())
        : [],
      notes: payload.notes ?? "",
    });

    return NextResponse.json(meal);
  } catch (error: any) {
    console.error("Failed to create meal", error);
    return NextResponse.json(
      { error: error?.message ?? "Unable to create meal" },
      { status: 400 }
    );
  }
}
