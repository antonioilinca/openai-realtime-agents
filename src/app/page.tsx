import React from "react";
import { getDashboardData } from "./lib/data";
import FitCoachDashboard from "./components/fit-coach-dashboard";

export default async function Page() {
  const initialData = getDashboardData();
  return <FitCoachDashboard initialData={initialData} />;
}
