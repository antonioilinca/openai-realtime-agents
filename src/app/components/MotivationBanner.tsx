"use client";

import React from "react";
import { LearnerProfile } from "@/app/types";

interface MotivationBannerProps {
  profile: LearnerProfile;
  overallPercent: number;
  activeModuleTitle: string;
}

const MotivationBanner: React.FC<MotivationBannerProps> = ({
  profile,
  overallPercent,
  activeModuleTitle,
}) => {
  return (
    <section className="card-surface relative overflow-hidden">
      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-mint-100" />
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-mint-600">
            Bravo ! {overallPercent}% du parcours terminé
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Cap sur « {activeModuleTitle} »
          </h1>
          <p className="mt-3 max-w-2xl text-base text-slate-600">
            {profile.momentumMessage}
          </p>
        </div>
        <div className="rounded-2xl bg-white/80 p-4 text-sm shadow-inner">
          <p className="font-semibold text-slate-700">Focus personnalisé</p>
          <p className="mt-2 text-slate-500">{profile.focusArea}</p>
          <p className="mt-4 text-xs uppercase tracking-widest text-mint-600">
            Étapes validées : {profile.totalCompleted}
          </p>
        </div>
      </div>
    </section>
  );
};

export default MotivationBanner;
