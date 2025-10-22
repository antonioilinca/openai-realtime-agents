import { NextResponse } from "next/server";
import { getDashboardData } from "@/app/lib/data";

export async function GET() {
  return NextResponse.json(getDashboardData());
}
