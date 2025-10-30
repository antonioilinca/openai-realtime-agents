import { motion } from "framer-motion";
import { cn } from "./cn";

interface StepBadgeProps {
  index: number;
  label: string;
  active?: boolean;
  completed?: boolean;
}

export function StepBadge({ index, label, active, completed }: StepBadgeProps) {
  return (
    <div className="flex items-center gap-3">
      <motion.span
        layout
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-full border text-sm font-medium",
          active && "border-primary bg-primary/20 text-primary",
          completed && !active && "border-success/60 bg-success/10 text-success",
          !active && !completed && "border-muted/40 bg-surface text-muted",
        )}
      >
        {index}
      </motion.span>
      <div className="flex flex-col">
        <span className="text-sm uppercase tracking-[0.2em] text-muted">Étape</span>
        <span className="text-base font-semibold text-white">{label}</span>
      </div>
    </div>
  );
}
