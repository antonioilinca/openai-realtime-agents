import { cn } from "./cn";

interface StatusPillProps {
  label: string;
  tone?: "info" | "success" | "warning" | "danger";
}

const toneToColor: Record<Required<StatusPillProps>["tone"], string> = {
  info: "bg-primary/20 text-primary border border-primary/40",
  success: "bg-success/15 text-success border border-success/40",
  warning: "bg-warning/15 text-warning border border-warning/40",
  danger: "bg-danger/15 text-danger border border-danger/40",
};

export function StatusPill({ label, tone = "info" }: StatusPillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide",
        toneToColor[tone],
      )}
    >
      {label}
    </span>
  );
}
