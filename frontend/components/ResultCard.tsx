import { ReactNode } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface ResultCardProps {
  title: string;
  description?: string;
  defaultOpen?: boolean;
  children: ReactNode;
}

// Carte repliable pour afficher les différentes sections du rapport juridique.
export default function ResultCard({ title, description, defaultOpen = false, children }: ResultCardProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section className="card-shadow mb-4 overflow-hidden rounded-2xl border border-primary/10 bg-white dark:bg-slate-900">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between px-6 py-4 text-left"
      >
        <div>
          <h3 className="text-lg font-semibold text-primary">{title}</h3>
          {description && <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>}
        </div>
        {open ? <ChevronUp className="text-primary" /> : <ChevronDown className="text-primary" />}
      </button>
      {open && <div className="border-t border-primary/10 px-6 py-4 text-sm leading-relaxed">{children}</div>}
    </section>
  );
}
