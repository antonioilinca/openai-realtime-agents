"use client";

import { useMemo, useState, type ReactNode } from "react";

type Goal =
  | "perte_poids"
  | "prise_muscle"
  | "seche"
  | "reforme"
  | "performance";

type ActivityLevel =
  | "sedentaire"
  | "leger"
  | "modere"
  | "actif"
  | "athlete";

type TrainingExperience = "debutant" | "intermediaire" | "avance";

type DietaryPreference =
  | "equilibree"
  | "vegetarien"
  | "mediterraneen"
  | "flexitarien"
  | "hyperproteine";

interface UserProfile {
  name: string;
  age: number;
  weight: number;
  height: number;
  gender: "homme" | "femme";
  activityLevel: ActivityLevel;
  goal: Goal;
  trainingExperience: TrainingExperience;
  availableDays: number;
  dietaryPreference: DietaryPreference;
  focusAreas: string[];
  wakeTime: string;
  sleepTime: string;
  hydrationGoal: number;
}

interface MacroBreakdown {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  fiber: number;
}

interface WorkoutSession {
  title: string;
  description: string;
  duration: string;
  intensity: string;
  extras?: string;
}

interface WorkoutDay {
  day: string;
  focus: string;
  highlight: string;
  sessions: WorkoutSession[];
  recovery: string;
  mindset: string;
}

interface MealPlanEntry {
  name: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  extras: string;
}

const goalLabels: Record<Goal, string> = {
  perte_poids: "Perte de poids",
  prise_muscle: "Prise de muscle",
  seche: "Sèche / Définition",
  reforme: "Remise en forme",
  performance: "Performance ciblée",
};

const experienceLabels: Record<TrainingExperience, string> = {
  debutant: "Débutant",
  intermediaire: "Intermédiaire",
  avance: "Avancé",
};

const activityMultipliers: Record<ActivityLevel, number> = {
  sedentaire: 1.2,
  leger: 1.375,
  modere: 1.55,
  actif: 1.725,
  athlete: 1.9,
};

const activityLabels: Record<ActivityLevel, string> = {
  sedentaire: "Sédentaire",
  leger: "Léger (1-2 séances/semaine)",
  modere: "Modéré (3-4 séances/semaine)",
  actif: "Actif (5 séances et +)",
  athlete: "Athlète / double séances",
};

const activityOrder: ActivityLevel[] = [
  "sedentaire",
  "leger",
  "modere",
  "actif",
  "athlete",
];

const goalAdjustments: Record<Goal, number> = {
  perte_poids: -450,
  prise_muscle: 350,
  seche: -250,
  reforme: -100,
  performance: 150,
};

const dietaryLabels: Record<DietaryPreference, string> = {
  equilibree: "Équilibrée",
  vegetarien: "Végétarienne",
  mediterraneen: "Méditerranéenne",
  flexitarien: "Flexitarienne",
  hyperproteine: "Hyperprotéinée",
};

const focusOptions = [
  { value: "fullbody", label: "Full body" },
  { value: "cardio", label: "Cardio & Endurance" },
  { value: "force", label: "Force & Puissance" },
  { value: "mobilite", label: "Mobilité & Souplesse" },
  { value: "core", label: "Sangle abdominale" },
  { value: "bienetre", label: "Bien-être & Récup" },
];

const goalOrder: Goal[] = [
  "perte_poids",
  "prise_muscle",
  "seche",
  "reforme",
  "performance",
];

const experienceOrder: TrainingExperience[] = [
  "debutant",
  "intermediaire",
  "avance",
];

const dietaryOrder: DietaryPreference[] = [
  "equilibree",
  "vegetarien",
  "mediterraneen",
  "flexitarien",
  "hyperproteine",
];

const defaultProfile: UserProfile = {
  name: "Alex",
  age: 32,
  weight: 72,
  height: 178,
  gender: "homme",
  activityLevel: "modere",
  goal: "prise_muscle",
  trainingExperience: "intermediaire",
  availableDays: 5,
  dietaryPreference: "equilibree",
  focusAreas: ["force", "core"],
  wakeTime: "06:45",
  sleepTime: "22:45",
  hydrationGoal: 3,
};

const dayNames = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
];

const intensityMap: Record<TrainingExperience, string> = {
  debutant: "Progressive",
  intermediaire: "Dynamique",
  avance: "Intense",
};

const restPreferenceOrder = [6, 3, 1, 4, 2, 5, 0];

const gradientMap: Record<Goal, string> = {
  perte_poids: "from-rose-500/20 via-purple-500/10 to-blue-500/30",
  prise_muscle: "from-emerald-500/20 via-sky-500/10 to-indigo-500/30",
  seche: "from-amber-500/20 via-pink-500/10 to-red-500/30",
  reforme: "from-teal-500/20 via-lime-500/10 to-emerald-500/30",
  performance: "from-blue-500/20 via-fuchsia-500/10 to-violet-500/30",
};

const goalAffirmations: Record<Goal, string> = {
  perte_poids:
    "On affine la silhouette en douceur, avec un accompagnement métabolique et mindset solide.",
  prise_muscle:
    "On construit des muscles denses et fonctionnels, avec une récupération millimétrée.",
  seche:
    "Objectif définition : chaque détail compte pour révéler la musculature.",
  reforme:
    "On retrouve des sensations positives, une énergie stable et une hygiène durable.",
  performance:
    "On booste la performance, la technique et la capacité à encaisser la charge.",
};

function computeMacros(profile: UserProfile): MacroBreakdown {
  const bmr =
    profile.gender === "femme"
      ? 10 * profile.weight + 6.25 * profile.height - 5 * profile.age - 161
      : 10 * profile.weight + 6.25 * profile.height - 5 * profile.age + 5;

  const tdee = bmr * activityMultipliers[profile.activityLevel];
  const adjustedCalories = Math.max(
    1400,
    Math.round(tdee + goalAdjustments[profile.goal])
  );

  const proteinPerKg =
    profile.goal === "prise_muscle"
      ? 2.1
      : profile.goal === "seche"
      ? 2.2
      : profile.goal === "perte_poids"
      ? 1.9
      : 1.7;

  const protein = Math.round(proteinPerKg * profile.weight);
  const fats = Math.round((adjustedCalories * 0.25) / 9);
  const carbs = Math.max(
    90,
    Math.round((adjustedCalories - protein * 4 - fats * 9) / 4)
  );

  const fiber = profile.dietaryPreference === "hyperproteine" ? 32 : 28;

  return {
    calories: adjustedCalories,
    protein,
    carbs,
    fats,
    fiber,
  };
}

const workoutTemplates: Record<Goal, Omit<WorkoutDay, "day" | "focus">[]> = {
  perte_poids: [
    {
      focus: "Cardio métabolique & full body",
      highlight: "Fractionnés + renforcement",
      sessions: [
        {
          title: "Bloc HIIT bas du corps",
          description:
            "Circuit de 4 mouvements (squat, fente, montée de genoux, planche) x 3 rounds",
          duration: "28 min",
          intensity: "Cardio élevé",
          extras: "Finir par 5 min de respiration cohérente",
        },
        {
          title: "Cardio zone 2",
          description: "40 min en endurance fondamentale (vélo ou course)",
          duration: "40 min",
          intensity: "Zone 2",
        },
      ],
      recovery: "Auto-massage jambes + bain contrasté",
      mindset: "Visualiser l’énergie post-séance et l’objectif silhouette",
    },
    {
      focus: "Core & mobilité active",
      highlight: "Stabilité + conscience respiratoire",
      sessions: [
        {
          title: "Pilates dynamique",
          description: "Bloc de gainage profond + contrôle respiratoire",
          duration: "24 min",
          intensity: "Contrôle",
        },
        {
          title: "Marche rapide / rucking",
          description: "6 km à allure soutenue avec charge légère",
          duration: "45 min",
          intensity: "Cardio modéré",
        },
      ],
      recovery: "Étirements chaîne postérieure + hydratation citronnée",
      mindset: "Ancrer la sensation de sangle solide toute la journée",
    },
    {
      focus: "Renforcement fonctionnel haut du corps",
      highlight: "Push/Pull + cardio flash",
      sessions: [
        {
          title: "Superset push/pull",
          description: "Développé incliné + tirage horizontal en tempo 3-1-1",
          duration: "32 min",
          intensity: "Résistance",
        },
        {
          title: "Finisher métabolique",
          description: "Rameur ou battle rope : 10 x 45 sec / 15 sec",
          duration: "15 min",
          intensity: "All-out",
        },
      ],
      recovery: "Gainage anti-rotation + douche froide 1 min",
      mindset: "Se féliciter sur 3 points positifs",
    },
  ],
  prise_muscle: [
    {
      focus: "Push (pectoraux / épaules / triceps)",
      highlight: "Volume contrôlé + drop set",
      sessions: [
        {
          title: "Développés & poussées",
          description: "Bench press, haltères inclinés, dips lestés",
          duration: "45 min",
          intensity: "Hypertrophie",
          extras: "Tempo 3-1-2 et contraction volontaire",
        },
        {
          title: "Finisher metabolic",
          description: "Plyo push-up + planche dynamique",
          duration: "12 min",
          intensity: "Explosif",
        },
      ],
      recovery: "Étirements actifs pectoraux + rouleau",
      mindset: "Visualiser la posture ouverte et puissante",
    },
    {
      focus: "Pull (dos / biceps)",
      highlight: "Tirages multi-angles",
      sessions: [
        {
          title: "Tirages progressifs",
          description:
            "Tractions lestées ou assistées, rowing unilatéral, face pull",
          duration: "46 min",
          intensity: "Hypertrophie",
        },
        {
          title: "Conditioning postural",
          description: "Farmer walk + YTWI sur swiss ball",
          duration: "18 min",
          intensity: "Stabilité",
        },
      ],
      recovery: "Respiration box 4-4-4-4",
      mindset: "Noter 1 progression technique",
    },
    {
      focus: "Lower body force & puissance",
      highlight: "Chaîne postérieure dominante",
      sessions: [
        {
          title: "Bilatéral + unilatéral",
          description: "Back squat, hip thrust, fentes bulgares",
          duration: "48 min",
          intensity: "Lourde",
        },
        {
          title: "Finisher sprint / sled",
          description: "6 x 20 m sled push modéré",
          duration: "15 min",
          intensity: "Explosif",
        },
      ],
      recovery: "Compression + mobilité hanches",
      mindset: "Respirer profondément pour activer le système parasympa",
    },
  ],
  seche: [
    {
      focus: "Full body tension",
      highlight: "Supersets antagonistes",
      sessions: [
        {
          title: "Superset push/pull",
          description: "Pecs vs dos avec repos actif corde à sauter",
          duration: "38 min",
          intensity: "Hypertrophie",
        },
        {
          title: "Cardio zone 3",
          description: "20 min vélo elliptique RPE 7",
          duration: "20 min",
          intensity: "Cardio",
        },
      ],
      recovery: "Sauna sec 10 min + hydratation électrolytes",
      mindset: "Focus sur la constance nutrition + sommeil",
    },
    {
      focus: "Lower body sculpt",
      highlight: "Accent postérieur + isométrie",
      sessions: [
        {
          title: "Complexe jambes",
          description: "Soulevé roumain, leg curl, walking lunges",
          duration: "40 min",
          intensity: "Modérée",
        },
        {
          title: "Finisher HIIT stair",
          description: "10 x 30 sec on / 30 sec off escalier",
          duration: "12 min",
          intensity: "Elevée",
        },
      ],
      recovery: "Bain contrasté + compression",
      mindset: "Soutenir la motivation avec playlist dédiée",
    },
    {
      focus: "Core shred + mobilité",
      highlight: "Gainage multi-plan",
      sessions: [
        {
          title: "Core circuit",
          description: "Planche, hollow body, pallof press, rotations",
          duration: "28 min",
          intensity: "Brûlure maîtrisée",
        },
        {
          title: "Yoga flow défini",
          description: "Flow 25 min accent mobilité thoracique",
          duration: "25 min",
          intensity: "Mindful",
        },
      ],
      recovery: "Respiration diaphragmatique + journal",
      mindset: "S’auto-féliciter pour la discipline",
    },
  ],
  reforme: [
    {
      focus: "Réveil musculaire global",
      highlight: "Mouvements fondamentaux",
      sessions: [
        {
          title: "Circuit mobilité",
          description: "Articulations + activation légère bandes",
          duration: "25 min",
          intensity: "Légère",
        },
        {
          title: "Cardio basse intensité",
          description: "Marche active ou vélo 35 min",
          duration: "35 min",
          intensity: "Conversation",
        },
      ],
      recovery: "Étirements doux + hydratation",
      mindset: "Noter 3 sensations positives",
    },
    {
      focus: "Renforcement postural",
      highlight: "Stabilité + gainage",
      sessions: [
        {
          title: "Renfo poids du corps",
          description: "Squat, tirage élastique, push-up surélevé",
          duration: "30 min",
          intensity: "Accessible",
        },
        {
          title: "Respiration + mobilité",
          description: "15 min respiration, 10 min stretching",
          duration: "25 min",
          intensity: "Calme",
        },
      ],
      recovery: "Auto-massage doux + sommeil régulier",
      mindset: "Se concentrer sur la fluidité des mouvements",
    },
    {
      focus: "Cardio fun & ludique",
      highlight: "Jeu + plaisir",
      sessions: [
        {
          title: "Cardio ludique",
          description: "Danse, corde, sport collectif",
          duration: "35 min",
          intensity: "Playful",
        },
        {
          title: "Stretch global",
          description: "Séance de stretching guidée",
          duration: "20 min",
          intensity: "Relax",
        },
      ],
      recovery: "Hydratation aromatisée + marche détente",
      mindset: "Célébrer les petites victoires",
    },
  ],
  performance: [
    {
      focus: "Force max + vitesse",
      highlight: "Contrast training",
      sessions: [
        {
          title: "Force 1-3 reps",
          description: "Back squat lourd + contrast jump",
          duration: "50 min",
          intensity: "Max effort",
        },
        {
          title: "Conditioning puissance",
          description: "Assault bike : 10 x 20 sec / 100 sec",
          duration: "20 min",
          intensity: "Anaérobie",
        },
      ],
      recovery: "Bains froids + protocole mobilité hanches",
      mindset: "Visualiser la prochaine compétition",
    },
    {
      focus: "Endurance spécifique",
      highlight: "Travail zone 3-4",
      sessions: [
        {
          title: "Interval training",
          description: "4 x 6 min au seuil + 2 min récupération",
          duration: "48 min",
          intensity: "Seuil",
        },
        {
          title: "Pliométrie contrôle",
          description: "Drop jumps + bounds",
          duration: "18 min",
          intensity: "Réactif",
        },
      ],
      recovery: "Compression + nutrition ciblée",
      mindset: "Suivi data : RPE, FC, sommeil",
    },
    {
      focus: "Technique & mobilité",
      highlight: "Prévention blessures",
      sessions: [
        {
          title: "Drills techniques",
          description: "Travail technique spécifique sport",
          duration: "35 min",
          intensity: "Technique",
        },
        {
          title: "Mobility flow",
          description: "20 min mobilité hanches/épaules",
          duration: "20 min",
          intensity: "Contrôlée",
        },
      ],
      recovery: "Normatec ou jambes en l’air",
      mindset: "Respiration box + visualisation",
    },
  ],
};

const mealTemplates: Record<
  DietaryPreference,
  Omit<MealPlanEntry, "calories" | "protein" | "carbs" | "fats">[]
> = {
  equilibree: [
    {
      name: "Petit-déjeuner booster",
      description: "Porridge avoine, yaourt grec, fruits rouges, graines de chia",
      extras: "Ajouter cannelle + shot de collagène",
    },
    {
      name: "Déjeuner énergie stable",
      description: "Poulet rôti, quinoa tricolore, brocolis vapeur, huile d’olive",
      extras: "Assaisonner avec citron + herbes fraîches",
    },
    {
      name: "Collation focus",
      description: "Smoothie protéiné épinard, banane, beurre d’amande",
      extras: "Ajouter 5 g de créatine si objectif force",
    },
    {
      name: "Dîner récupération",
      description: "Saumon au four, patate douce, asperges, salade verte",
      extras: "Infusion relax + 5 g glycine",
    },
  ],
  vegetarien: [
    {
      name: "Petit-déjeuner protéiné",
      description: "Tofu brouillé, tartine complète, avocat, tomates",
      extras: "Saupoudrer de levure maltée",
    },
    {
      name: "Déjeuner végétal équilibré",
      description: "Buddha bowl lentilles corail, quinoa, légumes rôtis",
      extras: "Sauce tahini citron",
    },
    {
      name: "Collation omega-3",
      description: "Chia pudding lait d’amande + fruits",
      extras: "Parsemer de noix",
    },
    {
      name: "Dîner récupération",
      description: "Curry de pois chiches, riz basmati, épinards",
      extras: "Curcuma + poivre noir",
    },
  ],
  mediterraneen: [
    {
      name: "Petit-déjeuner vibrant",
      description: "Yaourt grec, granola, figues fraîches, miel, pistaches",
      extras: "Shot de jus de citron tiède",
    },
    {
      name: "Déjeuner soleil",
      description: "Dorade grillée, boulgour, ratatouille, huile d’olive",
      extras: "Herbes de Provence + olives",
    },
    {
      name: "Collation fraîche",
      description: "Houmous, crudités, crackers complets",
      extras: "Ajouter menthe fraîche",
    },
    {
      name: "Dîner léger",
      description: "Poulet citronné, salade de pois chiches, roquette",
      extras: "Terminer par infusion verveine",
    },
  ],
  flexitarien: [
    {
      name: "Petit-déjeuner modulable",
      description: "Pain complet, beurre de cacahuète, œuf mollet, kiwi",
      extras: "Shot de gingembre",
    },
    {
      name: "Déjeuner flex",
      description: "Bœuf maigre, riz complet, légumes croquants",
      extras: "Sauce soja réduite",
    },
    {
      name: "Collation protéinée",
      description: "Skyr, amandes, myrtilles",
      extras: "Pincée de maca",
    },
    {
      name: "Dîner réconfort",
      description: "Tacos de poisson, salsa mangue, chou rouge",
      extras: "Yaourt grec citronné",
    },
  ],
  hyperproteine: [
    {
      name: "Petit-déjeuner performance",
      description: "Omelette 4 blancs + 2 œufs entiers, flocons avoine",
      extras: "Shot de café filtre",
    },
    {
      name: "Déjeuner musculation",
      description: "Dinde grillée, riz jasmin, brocoli vapeur",
      extras: "Sauce yaourt moutarde",
    },
    {
      name: "Collation anabolique",
      description: "Shake whey + banane + beurre de cacahuète",
      extras: "Creatine 5 g + sodium",
    },
    {
      name: "Dîner récupération",
      description: "Bœuf maigre, quinoa, légumes verts, huile MCT",
      extras: "Magnesium bisglycinate",
    },
  ],
};

function generateMealPlan(
  profile: UserProfile,
  macros: MacroBreakdown
): MealPlanEntry[] {
  const template = mealTemplates[profile.dietaryPreference];
  const distribution = [0.25, 0.3, 0.2, 0.25];

  return template.map((entry, index) => ({
    ...entry,
    calories: Math.round(macros.calories * distribution[index]),
    protein: Math.round(macros.protein * distribution[index]),
    carbs: Math.max(10, Math.round(macros.carbs * distribution[index])),
    fats: Math.round(macros.fats * distribution[index]),
  }));
}

function generateWeeklyPlan(profile: UserProfile): WorkoutDay[] {
  const template = workoutTemplates[profile.goal];
  const restDays = Math.max(0, 7 - profile.availableDays);
  const restSlots = new Set(restPreferenceOrder.slice(0, restDays));

  return dayNames.map((day, index) => {
    if (restSlots.has(index)) {
      return {
        day,
        focus: "Récupération active",
        highlight: "Mobilité + soin",
        sessions: [
          {
            title: "Mobility flow",
            description: "20 min d’ouverture articulaire douce",
            duration: "20 min",
            intensity: "Récup",
            extras: "Bain de pieds ou automassage",
          },
          {
            title: "Cardio doux",
            description: "Marche consciente 25 min + respiration",
            duration: "25 min",
            intensity: "Très léger",
          },
        ],
        recovery: "Sieste flash 20 min ou lecture",
        mindset: "Reconnaître l’importance du repos dans la progression",
      };
    }

    const base = template[index % template.length];
    const focusAreas = profile.focusAreas.length
      ? ` + focus ${profile.focusAreas.map((f) => formatFocusLabel(f)).join(" / ")}`
      : "";

    const experienceIntensity = intensityMap[profile.trainingExperience];

    return {
      day,
      focus: `${base.focus}${focusAreas}`,
      highlight: base.highlight,
      sessions: base.sessions.map((session) => ({
        ...session,
        intensity: `${experienceIntensity} · ${session.intensity}`,
      })),
      recovery: `${base.recovery}. Ajouter ${profile.hydrationGoal}L d’eau sur la journée`,
      mindset: base.mindset,
    };
  });
}

function formatFocusLabel(value: string) {
  switch (value) {
    case "fullbody":
      return "full body";
    case "cardio":
      return "cardio";
    case "force":
      return "force";
    case "mobilite":
      return "mobilité";
    case "core":
      return "core";
    case "bienetre":
      return "bien-être";
    default:
      return value;
  }
}

function generateAIInsight(
  profile: UserProfile,
  macros: MacroBreakdown,
  selectedDay: WorkoutDay
) {
  const readinessScore = Math.min(
    98,
    Math.round(
      60 +
        profile.availableDays * 4 +
        (profile.trainingExperience === "avance"
          ? 8
          : profile.trainingExperience === "intermediaire"
          ? 5
          : 2)
    )
  );

  const hydrationMessage =
    profile.hydrationGoal >= 3
      ? "Hydratation premium : continue sur cette routine riche en minéraux."
      : "Pense à renforcer l’apport hydrique avec électrolytes pour soutenir la récupération.";

  return `Assistant IA : niveau de préparation estimé ${readinessScore}%. ${hydrationMessage} Objectif ${goalLabels[profile.goal]} confirmé, macros alignées à ${macros.calories} kcal. Concentre-toi sur ${selectedDay.highlight.toLowerCase()} aujourd’hui et note ton ressenti dans ton journal énergétique.`;
}

const SectionCard = ({
  title,
  description,
  accent,
  children,
}: {
  title: string;
  description?: string;
  accent?: string;
  children: ReactNode;
}) => {
  return (
    <section
      className={`relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_25px_80px_-30px_rgba(0,0,0,0.65)] backdrop-blur-2xl transition hover:border-white/20 hover:bg-white/10`}
    >
      <div className="relative z-10 space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-white drop-shadow-md">
            {title}
          </h2>
          {description && (
            <p className="mt-2 max-w-2xl text-sm text-white/70">
              {description}
            </p>
          )}
        </div>
        {children}
      </div>
      {accent && (
        <div
          className={`absolute -top-16 -right-16 h-48 w-48 rounded-full bg-gradient-to-br ${accent} opacity-60 blur-3xl`}
        />
      )}
    </section>
  );
};

function ToggleChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 ${
        active
          ? "border-white/40 bg-white/20 text-white shadow-[0_0_25px_rgba(255,255,255,0.25)]"
          : "border-white/10 bg-white/5 text-white/70 hover:border-white/30 hover:text-white"
      }`}
    >
      {label}
    </button>
  );
}

function GradientBackground({ goal }: { goal: Goal }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br ${gradientMap[goal]} opacity-70 blur-3xl`}
    />
  );
}

export default function FitnessCoachApp() {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  const macros = useMemo(() => computeMacros(profile), [profile]);
  const weeklyPlan = useMemo(() => generateWeeklyPlan(profile), [profile]);
  const mealPlan = useMemo(
    () => generateMealPlan(profile, macros),
    [profile, macros]
  );

  const heavyTrainingDays = useMemo(() => {
    const primary = weeklyPlan[0]?.day;
    const secondary = weeklyPlan[2]?.day ?? weeklyPlan[1]?.day ?? weeklyPlan[0]?.day;
    return [primary, secondary].filter(Boolean).join(", ");
  }, [weeklyPlan]);

  const aiInsight = useMemo(
    () => generateAIInsight(profile, macros, weeklyPlan[selectedDayIndex]),
    [profile, macros, selectedDayIndex, weeklyPlan]
  );

  const handleInputChange = <K extends keyof UserProfile>(
    key: K,
    value: UserProfile[K]
  ) => {
    setProfile((prev) => ({ ...prev, [key]: value }));
  };

  const toggleFocusArea = (value: string) => {
    setProfile((prev) => {
      const exists = prev.focusAreas.includes(value);
      return {
        ...prev,
        focusAreas: exists
          ? prev.focusAreas.filter((item) => item !== value)
          : [...prev.focusAreas, value],
      };
    });
  };

  return (
    <div className="relative min-h-screen bg-[#050510] text-white">
      <GradientBackground goal={profile.goal} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.15),_transparent_55%)]" />
      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col gap-10 px-6 py-16 lg:px-12">
        <header className="space-y-6 text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs uppercase tracking-[0.3em] text-white/70">
            IA Coach
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white drop-shadow-sm sm:text-5xl">
            Programme quotidien intelligent
          </h1>
          <p className="mx-auto max-w-3xl text-base text-white/70 sm:text-lg">
            Une expérience immersive qui fusionne entraînement, nutrition et coaching
            mental. Réponds aux questions, laisse l’IA modéliser tes besoins et
            suis un plan vibrant, ajusté au millimètre près à tes objectifs.
          </p>
          <div className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-gradient-to-r from-white/10 via-white/5 to-transparent px-6 py-4 text-sm text-white/70 shadow-[0_20px_70px_-40px_rgba(15,118,110,0.7)]">
            {goalAffirmations[profile.goal]}
          </div>
        </header>

        <SectionCard
          title="Profil & objectifs"
          description="Nous personnalisons la stratégie d’entraînement et l’alimentation selon ton rythme de vie, ton vécu sportif et ta disponibilité réelle."
          accent="from-cyan-400/40 via-blue-400/30 to-indigo-500/30"
        >
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="space-y-4">
              <label className="block text-sm font-medium text-white/80">
                Prénom
              </label>
              <input
                type="text"
                value={profile.name}
                onChange={(event) => handleInputChange("name", event.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition focus:border-white/40 focus:bg-black/30"
              />
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-white/60">Âge</span>
                  <input
                    type="number"
                    value={profile.age}
                    min={16}
                    max={75}
                    onChange={(event) =>
                      handleInputChange("age", Number(event.target.value) || 0)
                    }
                    className="mt-1 w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 outline-none focus:border-white/40"
                  />
                </div>
                <div>
                  <span className="text-white/60">Sexe</span>
                  <div className="mt-1 flex gap-2">
                    {["homme", "femme"].map((gender) => (
                      <ToggleChip
                        key={gender}
                        label={gender === "homme" ? "H" : "F"}
                        active={profile.gender === gender}
                        onClick={() =>
                          handleInputChange(
                            "gender",
                            gender as UserProfile["gender"]
                          )
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-white/60">Poids (kg)</span>
                  <input
                    type="number"
                    value={profile.weight}
                    min={40}
                    max={180}
                    onChange={(event) =>
                      handleInputChange("weight", Number(event.target.value) || 0)
                    }
                    className="mt-1 w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 outline-none focus:border-white/40"
                  />
                </div>
                <div>
                  <span className="text-white/60">Taille (cm)</span>
                  <input
                    type="number"
                    value={profile.height}
                    min={140}
                    max={220}
                    onChange={(event) =>
                      handleInputChange("height", Number(event.target.value) || 0)
                    }
                    className="mt-1 w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 outline-none focus:border-white/40"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <span className="text-sm font-medium text-white/80">
                  Objectif principal
                </span>
                <div className="mt-3 grid grid-cols-1 gap-2 text-sm">
                  {goalOrder.map((goalKey) => (
                    <button
                      key={goalKey}
                      type="button"
                      onClick={() => handleInputChange("goal", goalKey)}
                      className={`flex items-center justify-between rounded-2xl border px-4 py-3 transition ${
                        profile.goal === goalKey
                          ? "border-white/50 bg-white/15 text-white shadow-[0_0_25px_rgba(59,130,246,0.35)]"
                          : "border-white/10 bg-white/5 text-white/70 hover:border-white/30"
                      }`}
                    >
                      <span>{goalLabels[goalKey]}</span>
                      <span className="text-xs uppercase tracking-widest text-white/40">
                        {goalKey === profile.goal ? "Sélectionné" : "Choisir"}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-sm font-medium text-white/80">
                  Expérience sportive
                </span>
                <div className="mt-3 flex flex-wrap gap-2">
                  {experienceOrder.map((level) => (
                    <ToggleChip
                      key={level}
                      label={experienceLabels[level]}
                      active={profile.trainingExperience === level}
                      onClick={() => handleInputChange("trainingExperience", level)}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <span className="text-sm font-medium text-white/80">
                  Niveau d’activité
                </span>
                <div className="mt-3 space-y-2 text-sm">
                  {activityOrder.map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => handleInputChange("activityLevel", level)}
                      className={[
                        "w-full rounded-xl border px-4 py-3 text-left transition",
                        profile.activityLevel === level
                          ? "border-white/50 bg-white/15 text-white"
                          : "border-white/10 bg-white/5 text-white/70 hover:border-white/30",
                      ].join(" ")}
                    >
                      <div className="font-medium">{activityLabels[level]}</div>
                      <div className="text-xs text-white/50">
                        {activityMultipliers[level]}x métabolique
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-sm font-medium text-white/80">
                  Centres d’intérêt
                </span>
                <div className="mt-3 flex flex-wrap gap-2">
                  {focusOptions.map((focus) => (
                    <ToggleChip
                      key={focus.value}
                      label={focus.label}
                      active={profile.focusAreas.includes(focus.value)}
                      onClick={() => toggleFocusArea(focus.value)}
                    />
                  ))}
                </div>
              </div>
              <div>
                <span className="text-sm font-medium text-white/80">
                  Préférence alimentaire
                </span>
                <div className="mt-3 grid grid-cols-1 gap-2 text-sm">
                  {dietaryOrder.map((diet) => (
                    <button
                      key={diet}
                      type="button"
                      onClick={() => handleInputChange("dietaryPreference", diet)}
                      className={[
                        "w-full rounded-xl border px-4 py-3 text-left transition",
                        profile.dietaryPreference === diet
                          ? "border-white/50 bg-white/15 text-white"
                          : "border-white/10 bg-white/5 text-white/70 hover:border-white/30",
                      ].join(" ")}
                    >
                      <div className="font-medium">{dietaryLabels[diet]}</div>
                      <div className="text-xs text-white/50">
                        Menus ajustés automatiquement
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs uppercase text-white/50">Disponibilité</div>
              <div className="mt-2 flex items-center justify-between text-sm">
                <span>Nombre de jours d’entraînement</span>
                <span className="text-lg font-semibold text-white">
                  {profile.availableDays}
                </span>
              </div>
              <input
                type="range"
                min={2}
                max={7}
                value={profile.availableDays}
                onChange={(event) =>
                  handleInputChange(
                    "availableDays",
                    Number(event.target.value) as UserProfile["availableDays"]
                  )
                }
                className="mt-4 w-full accent-sky-400"
              />
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs uppercase text-white/50">
                Fênetre de sommeil
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                <label className="flex flex-col gap-2">
                  <span className="text-white/60">Réveil</span>
                  <input
                    type="time"
                    value={profile.wakeTime}
                    onChange={(event) =>
                      handleInputChange("wakeTime", event.target.value)
                    }
                    className="rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-white focus:border-white/40"
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-white/60">Coucher</span>
                  <input
                    type="time"
                    value={profile.sleepTime}
                    onChange={(event) =>
                      handleInputChange("sleepTime", event.target.value)
                    }
                    className="rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-white focus:border-white/40"
                  />
                </label>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs uppercase text-white/50">
                Hydratation cible
              </div>
              <div className="mt-2 flex items-end justify-between">
                <div>
                  <div className="text-sm text-white/70">
                    Litres / jour recommandés
                  </div>
                  <div className="text-2xl font-semibold text-white">
                    {profile.hydrationGoal.toFixed(1)} L
                  </div>
                </div>
                <div className="text-xs text-white/40">
                  Ajusté selon charge d’entraînement
                </div>
              </div>
              <input
                type="range"
                min={1.5}
                max={4.5}
                step={0.1}
                value={profile.hydrationGoal}
                onChange={(event) =>
                  handleInputChange(
                    "hydrationGoal",
                    Number(event.target.value) as UserProfile["hydrationGoal"]
                  )
                }
                className="mt-4 w-full accent-emerald-400"
              />
            </div>
          </div>
        </SectionCard>

        <SectionCard
          title="Analyse calorique & macros"
          description="Calcul métabolique dynamique basé sur Mifflin-St Jeor, ajusté avec la stratégie IA selon ton objectif."
          accent="from-purple-500/40 via-blue-500/20 to-cyan-400/30"
        >
          <div className="grid gap-6 md:grid-cols-4">
            {[
              { label: "Calories quotidiennes", value: `${macros.calories} kcal` },
              { label: "Protéines", value: `${macros.protein} g` },
              { label: "Glucides", value: `${macros.carbs} g` },
              { label: "Lipides", value: `${macros.fats} g` },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 via-transparent to-white/5 p-5 shadow-[0_25px_50px_-30px_rgba(147,197,253,0.7)]"
              >
                <div className="text-xs uppercase tracking-widest text-white/60">
                  {item.label}
                </div>
                <div className="mt-3 text-2xl font-semibold text-white">
                  {item.value}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-lg font-semibold text-white">
                Répartition journalière
              </h3>
              <p className="text-sm text-white/70">
                Macrocycle pensé pour stabiliser la glycémie, soutenir la récupération
                musculaire et optimiser la synthèse protéique.
              </p>
              <div className="grid gap-3 text-sm">
                {mealPlan.map((meal) => (
                  <div
                    key={meal.name}
                    className="rounded-xl border border-white/5 bg-white/5 p-4"
                  >
                    <div className="flex items-center justify-between text-white">
                      <span className="font-medium">{meal.name}</span>
                      <span className="text-xs text-white/50">
                        {meal.calories} kcal
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-white/60">
                      {meal.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-3 text-xs text-white/70">
                      <span>⚡ {meal.protein} g prot</span>
                      <span>🌾 {meal.carbs} g glucides</span>
                      <span>🥑 {meal.fats} g lipides</span>
                      <span className="text-white/50">{meal.extras}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-lg font-semibold text-white">
                Guides & astuces IA
              </h3>
              <ul className="space-y-3 text-sm text-white/70">
                <li>
                  ✅ Prends <strong>30 g de protéines</strong> dans l’heure suivant ton
                  entraînement pour accentuer la synthèse musculaire.
                </li>
                <li>
                  💧 Fractionne l’hydratation en 4 prises (matin, pré-workout, post-workout,
                  soirée) avec {profile.hydrationGoal.toFixed(1)} L cumulés.
                </li>
                <li>
                  🥗 Garde un apport de <strong>{macros.fiber} g de fibres</strong> via légumes,
                  légumineuses et fruits pour soutenir ta satiété et ton microbiote.
                </li>
                <li>
                  🌙 Fenêtre de sommeil {profile.sleepTime} → {profile.wakeTime} : vise 90 min
                  de préparation sans écran.
                </li>
                <li>
                  🍽️ Réserve la portion la plus glucidique sur les jours de charge lourde
                  ({heavyTrainingDays}).
                </li>
              </ul>
              <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-indigo-500/20 via-purple-500/10 to-sky-500/20 p-5 text-sm text-white shadow-[0_20px_60px_-30px_rgba(99,102,241,0.7)]">
                {aiInsight}
              </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard
          title="Agenda d’entraînement 7 jours"
          description="Un plan adapté à ton volume hebdomadaire, alternant charges, récupération active et rituels bien-être."
          accent="from-emerald-500/40 via-teal-400/20 to-sky-400/30"
        >
          <div className="flex flex-wrap gap-3">
            {weeklyPlan.map((dayPlan, index) => (
              <button
                key={dayPlan.day}
                type="button"
                onClick={() => setSelectedDayIndex(index)}
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  selectedDayIndex === index
                    ? "border-white/60 bg-white/15 text-white shadow-[0_0_25px_rgba(16,185,129,0.5)]"
                    : "border-white/10 bg-white/5 text-white/60 hover:border-white/30"
                }`}
              >
                {dayPlan.day}
              </button>
            ))}
          </div>
          <div className="mt-6 grid gap-6 lg:grid-cols-5">
            <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6 lg:col-span-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase text-white/50">
                    Focus du jour
                  </div>
                  <div className="text-xl font-semibold text-white">
                    {weeklyPlan[selectedDayIndex].focus}
                  </div>
                </div>
                <div className="rounded-full bg-gradient-to-r from-emerald-400/40 via-sky-400/20 to-indigo-500/30 px-4 py-2 text-xs text-white/80">
                  {weeklyPlan[selectedDayIndex].highlight}
                </div>
              </div>
              <div className="space-y-4">
                {weeklyPlan[selectedDayIndex].sessions.map((session) => (
                  <div
                    key={session.title}
                    className="rounded-2xl border border-white/5 bg-white/5 p-5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3 text-white">
                      <div className="text-lg font-semibold">{session.title}</div>
                      <div className="text-xs uppercase tracking-widest text-white/50">
                        {session.duration}
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-white/70">
                      {session.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-3 text-xs text-white/60">
                      <span>🔥 {session.intensity}</span>
                      {session.extras && <span>✨ {session.extras}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4 lg:col-span-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="text-xs uppercase text-white/50">Récupération</div>
                <p className="mt-2 text-sm text-white/70">
                  {weeklyPlan[selectedDayIndex].recovery}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="text-xs uppercase text-white/50">Mindset</div>
                <p className="mt-2 text-sm text-white/70">
                  {weeklyPlan[selectedDayIndex].mindset}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-6 text-sm text-white">
                <div className="text-xs uppercase text-white/40">Routine+</div>
                <p className="mt-2 text-white/70">
                  Booster du jour :
                  <span className="pl-1 text-white">
                    {selectedDayIndex % 2 === 0
                      ? "5 minutes de respiration box + 10 affirmations positives"
                      : "Réveil musculaire express avec bande élastique au lever"}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard
          title="Suivi & rituels quotidiens"
          description="Optimise ton quotidien avec des micro-habitudes guidées, des scores bien-être et une check-list intelligente."
          accent="from-fuchsia-500/30 via-purple-500/20 to-blue-500/20"
        >
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Scores du jour</h3>
                <span className="text-xs text-white/50">Analyse IA</span>
              </div>
              <div className="grid gap-4 text-sm">
                <div className="flex items-center justify-between rounded-xl bg-white/5 p-4">
                  <div>
                    <div className="text-white/60">Énergie</div>
                    <div className="text-2xl font-semibold text-white">
                      {Math.min(10, 6 + Math.round(profile.availableDays / 2))}/10
                    </div>
                  </div>
                  <div className="text-xs text-white/40">
                    Impact sommeil + nutrition
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-white/5 p-4">
                  <div>
                    <div className="text-white/60">Stress</div>
                    <div className="text-2xl font-semibold text-white">
                      {profile.trainingExperience === "avance" ? "3/10" : "4/10"}
                    </div>
                  </div>
                  <div className="text-xs text-white/40">
                    Gestion respiration & focus
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-white/5 p-4">
                  <div>
                    <div className="text-white/60">Récupération</div>
                    <div className="text-2xl font-semibold text-white">
                      {profile.goal === "perte_poids" ? "7/10" : "8/10"}
                    </div>
                  </div>
                  <div className="text-xs text-white/40">
                    Basé sur routines actuelles
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-lg font-semibold text-white">Checklist premium</h3>
              <ul className="space-y-3 text-sm text-white/70">
                <li>☀️ Exposition à la lumière naturelle dans l’heure suivant le réveil.</li>
                <li>🥤 Préparer {profile.hydrationGoal.toFixed(1)} L d’eau aromatisée pour la journée.</li>
                <li>📝 Journaliser ton ressenti post-entraînement (RPE, humeur, énergie).</li>
                <li>🧊 Bain de contraste ou douche froide 60 sec sur les jours lourds.</li>
                <li>🧘‍♀️ 5 min de cohérence cardiaque avant le coucher.</li>
              </ul>
            </div>

            <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-lg font-semibold text-white">Ajustements IA</h3>
              <p className="text-sm text-white/70">
                L’assistant détecte ton intention et ajuste la stratégie en temps réel.
                Change un paramètre et observe comment les recommandations évoluent.
              </p>
              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-5 text-sm text-white/70">
                <strong>Suggestion immédiate :</strong> programme un <em>check-in</em> rapide
                le {dayNames[(selectedDayIndex + 2) % 7]} pour valider ton ressenti et
                re-synchroniser le plan alimentaire.
              </div>
              <button
                type="button"
                className="group flex items-center justify-between rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/20"
                onClick={() => setSelectedDayIndex((prev) => (prev + 1) % 7)}
              >
                Lancer un scan bien-être
                <span className="text-xs uppercase text-emerald-300/80 transition group-hover:translate-x-1">
                  →
                </span>
              </button>
            </div>
          </div>
        </SectionCard>

        <footer className="pb-10 text-center text-xs text-white/40">
          Conçu avec passion pour délivrer une expérience immersive, dynamique et
          radicalement personnalisée. Active ton potentiel chaque jour.
        </footer>
      </div>
    </div>
  );
}
