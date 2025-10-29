"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";

const InteractiveDashboard = dynamic(() => import("./screens/InteractiveDashboard"), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-screen items-center justify-center bg-surface-primary text-lg font-medium text-primary-900">
      Préparation de l’interface stratégique…
    </div>
  ),
});

export default function Page() {
  return (
    <Suspense>
      <InteractiveDashboard />
    </Suspense>
  );
}
