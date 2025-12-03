import { OfflineGuide } from "./types";

export const OFFLINE_GUIDES: OfflineGuide[] = [
  {
    code: "CPR",
    title: "CPR (Adult)",
    steps: [
      "Check responsiveness and call emergency services immediately.",
      "Begin chest compressions at 100-120 per minute, 5-6 cm depth.",
      "After 30 compressions, give 2 rescue breaths if trained.",
      "Continue cycles of 30:2 until help arrives or victim breathes.",
    ],
  },
  {
    code: "CHOKING",
    title: "Choking",
    steps: [
      "Ask if the person can cough or speak; encourage coughing.",
      "If ineffective, deliver 5 back blows between shoulder blades.",
      "Follow with 5 abdominal thrusts (Heimlich) for adults/children.",
      "Alternate back blows and thrusts; call emergency services if unrelieved.",
    ],
  },
  {
    code: "BLEEDING",
    title: "Severe Bleeding",
    steps: [
      "Apply firm direct pressure with clean cloth or gauze.",
      "Elevate the injured limb if no fracture is suspected.",
      "If bleeding persists, apply a tourniquet above the wound, note time.",
      "Monitor for shock; keep patient warm and call emergency services.",
    ],
  },
  {
    code: "UNCONSCIOUS",
    title: "Unconscious / Recovery Position",
    steps: [
      "Ensure airway is clear; tilt head back, lift chin.",
      "Roll person onto side with top leg bent to stabilize position.",
      "Monitor breathing; if absent, start CPR and call emergency immediately.",
      "Keep checking for responsiveness until professionals arrive.",
    ],
  },
];
