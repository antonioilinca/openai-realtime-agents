import { ReactNode } from "react";
import { cn } from "./cn";

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: "md" | "lg";
}

export function Card({ children, className, padding = "lg" }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[1.2rem] border border-surface/60 bg-surface/80 p-6 shadow-lexora",
        padding === "lg" ? "p-6 md:p-8" : "p-4",
        className,
      )}
    >
      {children}
    </div>
  );
}
