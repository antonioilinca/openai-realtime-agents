import React from "react";
import { cn } from "./cn";

export default function GlassCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("glass-panel rounded-3xl p-6 soft-shadow", className)}>
      {children}
    </div>
  );
}
