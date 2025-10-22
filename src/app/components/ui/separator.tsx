import * as React from "react";
import { cn } from "@/app/lib/utils";

const Separator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("h-px w-full bg-slate-800/80", className)}
    {...props}
  />
));
Separator.displayName = "Separator";

export { Separator };
