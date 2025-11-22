import React from "react";
import { cn } from "./cn";

export default function PrimaryButton({
  children,
  className,
  icon: Icon,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { icon?: React.ComponentType<{ className?: string }> }) {
  return (
    <button
      className={cn(
        "flex items-center gap-2 rounded-3xl px-5 py-3 text-sm font-semibold text-[#003366] shadow-lg transition hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#d4af37]/70 active:scale-[0.98]",
        "bg-gradient-to-r from-[#f8e7a2] via-[#d4af37] to-[#c69c1f] text-slate-900",
        className,
      )}
      {...props}
    >
      {Icon && <Icon className="h-4 w-4" />} {children}
    </button>
  );
}
