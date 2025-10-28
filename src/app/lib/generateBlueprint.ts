import { format } from "date-fns";
import { fr } from "date-fns/locale";

export type BusinessStage = "idee" | "lancement" | "croissance";
export type ObjectiveKey = "valider" | "lancer" | "acquerir" | "optimiser";
export type TeamSize = "solo" | "petite" | "moyenne";
export type AutomationPriority = "faible" | "moyenne" | "elevee";

export interface BlueprintInputs {
  companyName: string;
  founderName: string;
  sector: string;
  businessStage: BusinessStage;
  objective: ObjectiveKey;
  budget: number;
  targetAudience: string;
  valueProposition: string;
  teamSize: TeamSize;
  preferredChannels: string[];
  automationPriority: AutomationPriority;
  painPoints: string;
  strengths: string;
}

export interface BusinessModelSection {
  title: string;
  description: string;
  bullets: string[];
}

export interface ActionWeek {
  week: string;
  priority: "Critique" | "Haute" | "Modérée";
  focus: string;
  actions: string[];
  deliverables: string[];
  successMetrics: string[];
}

export interface BudgetLine {
  label: string;
  amount: number;
  details: string;
  frequency?: "unique" | "mensuel";
}

export interface AutomationStack {
  category: string;
  tools: string[];
  notes: string;
}

export interface GrowthInitiative {
  title: string;
  description: string;
  expectedImpact: string;
}

interface GrowthPlan {
  differentiators: string[];
  roadmap: GrowthInitiative[];
  riskMitigation: string[];
}

export interface BlueprintPlan {
  generatedAt: string;
  summary: string;
  headline: string;
  keyResults: string[];
  businessModel: BusinessModelSection[];
  actionPlan: ActionWeek[];
  budget: {
    investment: BudgetLine[];
    operations: BudgetLine[];
    guardrails: string[];
    commentary: string;
  };
  automation: {
    stack: AutomationStack[];
    workflows: string[];
    campaigns: string[];
    kpis: string[];
  };
  growth: GrowthPlan;
  exportPayload: {
    markdown: string;
    csv: string;
  };
}

const budgetFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

const channelLabels: Record<string, string> = {
  email: "Email marketing & nurturing",
  social: "Réseaux sociaux (LinkedIn, Instagram, TikTok)",
  seo: "Référencement & contenu long format",
  events: "Évènements, webinaires, partenariats physiques",
  paid: "Acquisition payante (Meta Ads, Google Ads)",
  affiliates: "Affiliation & programmes d'ambassadeurs",
};

const stageNarratives: Record<BusinessStage, string> = {
  idee:
    "Valider rapidement la proposition de valeur, sécuriser les premiers retours utilisateurs et structurer un positionnement différenciant.",
  lancement:
    "Industrialiser l'acquisition des premiers clients, mettre en place les fondations opérationnelles et accélérer la crédibilité de marque.",
  croissance:
    "Scaler les canaux performants, renforcer les revenus récurrents et optimiser la marge par l'automatisation avancée.",
};

const objectiveNarratives: Record<ObjectiveKey, string> = {
  valider:
    "Structurer une phase d'exploration rapide avec tests marché et itérations produit alignées aux retours terrain.",
  lancer:
    "Mettre sur orbite l'offre avec un mix acquisition + activation pour signer les premiers clients rentables.",
  acquerir:
    "Multiplier les points de contacts qualifiés et construire des campagnes multi-canales pilotées par la donnée.",
  optimiser:
    "Améliorer la rentabilité, réduire les coûts d'acquisition et consolider l'expérience client pour augmenter la LTV.",
};

const objectiveFocus: Record<ObjectiveKey, { focus: string; metrics: string[] }> = {
  valider: {
    focus: "Validation marché & preuve de concept",
    metrics: [
      "Nombre d'entretiens utilisateurs réalisés",
      "Taux de conversion landing page",
      "Temps moyen entre feedback et itération",
    ],
  },
  lancer: {
    focus: "Acquisition initiale & onboarding",
    metrics: [
      "Nombre de clients signés",
      "Panier moyen",
      "Taux d'activation post-onboarding",
    ],
  },
  acquerir: {
    focus: "Accélération de l'acquisition",
    metrics: [
      "Coût par lead/inscription",
      "Taux de transformation lead → client",
      "Croissance du MRR ou CA mensuel",
    ],
  },
  optimiser: {
    focus: "Optimisation rentabilité & rétention",
    metrics: [
      "Taux de rétention",
      "Marge nette",
      "Coût d'acquisition client",
    ],
  },
};

function computeInvestmentSplit(
  totalBudget: number,
  priority: AutomationPriority,
): { investment: BudgetLine[]; operations: BudgetLine[]; commentary: string } {
  const safeBudget = Number.isFinite(totalBudget) && totalBudget > 0 ? totalBudget : 4500;
  const automationMultiplier = priority === "elevee" ? 0.28 : priority === "moyenne" ? 0.2 : 0.12;
  const operationsBase = safeBudget * 0.48;

  const investment: BudgetLine[] = [
    {
      label: "Audit stratégique & alignement offre",
      amount: safeBudget * 0.18,
      details:
        "Ateliers fondateurs, clarification de la proposition de valeur, segmentation client et définition des messages clés.",
      frequency: "unique",
    },
    {
      label: "Production de contenus & branding",
      amount: safeBudget * 0.2,
      details: "Création landing page, storytelling, kits commerciaux, ressources lead magnet.",
      frequency: "unique",
    },
    {
      label: "Implémentation automatisations",
      amount: safeBudget * automationMultiplier,
      details: "Paramétrage CRM, scénarios nurturing, automatisations internes (reporting, onboarding).",
      frequency: "unique",
    },
  ];

  const operations: BudgetLine[] = [
    {
      label: "Acquisition payante & retargeting",
      amount: operationsBase * 0.4,
      details: "Campagnes tests sur les canaux prioritaires avec revues hebdomadaires.",
      frequency: "mensuel",
    },
    {
      label: "Outils SaaS & licences",
      amount: operationsBase * automationMultiplier,
      details: "CRM, marketing automation, analytics, productivité.",
      frequency: "mensuel",
    },
    {
      label: "Production de contenu & freelances",
      amount: operationsBase * 0.22,
      details: "Rédaction, design, montage vidéo et support ponctuel.",
      frequency: "mensuel",
    },
    {
      label: "Support & succès client",
      amount: operationsBase * 0.18,
      details: "Support en ligne, success kits, automatisation du suivi.",
      frequency: "mensuel",
    },
  ];

  const commentary =
    priority === "elevee"
      ? "Accent fort sur l'automatisation pour gagner du temps dès le lancement et disposer de dashboards en temps réel."
      : priority === "moyenne"
        ? "Équilibre entre dépenses marketing et industrialisation interne pour soutenir l'accélération."
        : "Priorité à l'acquisition rapide tout en posant les briques d'automatisation essentielles.";

  return { investment, operations, commentary };
}

function buildBusinessModel(
  inputs: BlueprintInputs,
  objectiveDetails: { focus: string; metrics: string[] },
): BusinessModelSection[] {
  const channelsDescription = inputs.preferredChannels
    .map((channel) => (channelLabels[channel] ? channelLabels[channel] : channel))
    .join(", ");

  const teamDescription =
    inputs.teamSize === "solo"
      ? "Solopreneur"
      : inputs.teamSize === "petite"
        ? "2-5 personnes"
        : "6-10 personnes";

  return [
    {
      title: "Vision & ambition",
      description: stageNarratives[inputs.businessStage],
      bullets: [
        "Nom du projet : " + (inputs.companyName || "Projet"),
        "Ambition principale : " + objectiveNarratives[inputs.objective],
        "Forces différenciantes actuelles : " + (inputs.strengths || "à préciser"),
      ],
    },
    {
      title: "Segments clients prioritaires",
      description: "Cible cœur : " + (inputs.targetAudience || "à définir") + ".",
      bullets: [
        "Personas détaillés, problématiques et déclencheurs d'achat",
        "Analyse concurrence directe vs alternatives informelles",
        "Définition des signaux d'intention et des scénarios d'activation",
      ],
    },
    {
      title: "Proposition de valeur",
      description: inputs.valueProposition,
      bullets: [
        "Pain points principaux : " + (inputs.painPoints || "à clarifier"),
        "Promesse : gains tangibles mesurables pour le client",
        "Éléments de preuve : cas clients, maquettes, résultats chiffrés",
      ],
    },
    {
      title: "Revenus & pricing",
      description: "Modèle de revenus calibré pour la traction",
      bullets: [
        "Structure tarifaire par offre/cohorte",
        "Stratégie de promotions & offres d'essai",
        "Upsell & cross-sell intégrés dès l'onboarding",
      ],
    },
    {
      title: "Canaux d'acquisition",
      description: channelsDescription || "Sélectionner 2 à 3 canaux piliers pour démarrer",
      bullets: [
        "Matrice TOFU/MOFU/BOFU avec contenus adaptés",
        "Calendrier éditorial agile et gouvernance de la brand",
        "Trackers de performance connectés au CRM",
      ],
    },
    {
      title: "Activités clés",
      description: "Rituels hebdomadaires pour garder le rythme",
      bullets: [
        objectiveDetails.focus + " avec revues hebdo",
        "Sprint commercial & marketing tous les lundis",
        "Comité produit/expérience client toutes les 2 semaines",
      ],
    },
    {
      title: "Ressources & partenaires",
      description: "Capital humain + stack technologique modulable",
      bullets: [
        "Équipe actuelle : " + teamDescription,
        "Compétences critiques : growth, contenu, data, relation client",
        "Partenaires prioritaires : experts sectoriels, influenceurs, incubateurs",
      ],
    },
  ];
}

function buildActionPlan(inputs: BlueprintInputs): ActionWeek[] {
  const focusMap: Record<ObjectiveKey, string[]> = {
    valider: [
      "Interviews clients & sondages ciblés",
      "Prototypage rapide et landing page de test",
      "Collecte de preuves et préparation pitch investisseurs",
    ],
    lancer: [
      "Structure d'offre et tunnel de conversion",
      "Campagnes acquisition pilote & onboarding",
      "Boucle feedback client + amélioration produit",
    ],
    acquerir: [
      "Optimisation funnel multi-canaux",
      "Nurturing automatisé et scoring leads",
      "Boucle referrals & expansion partenariats",
    ],
    optimiser: [
      "Audit rentabilité et parcours client",
      "Upsell / cross-sell & automatisation du support",
      "Expansion de la LTV et communauté clients",
    ],
  };

  const focus = focusMap[inputs.objective];
  const mainChannel = inputs.preferredChannels.length > 0 ? inputs.preferredChannels[0] : "";
  const channelFocus = mainChannel
    ? "Renforcer la présence sur " + (channelLabels[mainChannel] || mainChannel) + "."
    : "Sélectionner les 2 canaux les plus prometteurs par persona.";
  const persona = inputs.targetAudience || "vos clients cibles";

  return [
    {
      week: "Semaine 1",
      priority: "Critique",
      focus: focus[0] + " & alignement stratégique",
      actions: [
        "Atelier vision + message clé (3h) avec l'équipe cœur",
        "Création du blueprint persona + carte d'empathie pour " + persona,
        "Préparation des scripts d'interview et scoring de qualification",
      ],
      deliverables: [
        "Vision board, brand voice, pitch deck",
        "Dashboard Notion/Sheets centralisé avec objectifs SMART",
        "Calendrier des 4 prochaines semaines validé",
      ],
      successMetrics: [
        "50% des interviews planifiées",
        "Roadmap priorisée validée",
      ],
    },
    {
      week: "Semaine 2",
      priority: "Haute",
      focus: focus[1] + " & production contenus clés",
      actions: [
        channelFocus,
        "Création des assets marketing (landing, emails, scripts ventes)",
        "Implémentation CRM + pipeline + automatisations de base",
      ],
      deliverables: [
        "Landing page optimisée conversion",
        "Séquence email onboarding/nurturing",
        "Tableau de bord reporting (notion + looker studio)",
      ],
      successMetrics: [
        "Mise en ligne du funnel complet",
        "Premier lot de contenus validés",
      ],
    },
    {
      week: "Semaine 3",
      priority: "Haute",
      focus: focus[2] + " & tests d'acquisition",
      actions: [
        "Lancement des campagnes pilotes (budget test 20% du total)",
        "Suivi quotidien KPIs et ajustements créatifs",
        "Collecte feedback clients + révision proposition de valeur",
      ],
      deliverables: [
        "Rapport expérimentation acquisition",
        "Matrice objections + réponses commerciales",
        "Workflow d'onboarding automatisé",
      ],
      successMetrics: [
        "Minimum 2 canaux au-dessus du benchmark",
        "Taux de conversion lead>client >= objectif",
      ],
    },
    {
      week: "Semaine 4",
      priority: "Modérée",
      focus: "Industrialisation & passage à l'échelle",
      actions: [
        "Revue 360° : stratégie, marketing, produit, finances",
        "Formalisation playbook vente + success client",
        "Plan de contenu 90 jours & roadmap croissance",
      ],
      deliverables: [
        "Plan de scaling avec scénarios budgétaires",
        "Scorecard hebdomadaire et modèle de reporting",
        "Liste priorisée des recrutements/freelances clés",
      ],
      successMetrics: [
        "Processus documentés",
        "Projection CA + marge sur 6 mois",
      ],
    },
  ];
}

function buildAutomationStack(inputs: BlueprintInputs): {
  stack: AutomationStack[];
  workflows: string[];
  campaigns: string[];
  kpis: string[];
} {
  const automationTools = inputs.automationPriority === "elevee" ? "Make + ActiveCampaign" : "Brevo (ex Sendinblue)";

  const stack: AutomationStack[] = [
    {
      category: "CRM & pipeline",
      tools: [inputs.teamSize === "solo" ? "HubSpot Starter" : "Pipedrive Growth", "Notion CRM Template"],
      notes: "Centraliser les leads, pipeline et tâches avec automatisations d'assignation.",
    },
    {
      category: "Marketing automation",
      tools: [automationTools, "Clay.com pour enrichissement leads"],
      notes: "Scénarios nurturing multi-canaux et scoring basé sur engagement.",
    },
    {
      category: "Analytics & pilotage",
      tools: ["Looker Studio", "Fathom Analytics", "Mixpanel"],
      notes: "Dashboards temps réel reliés aux campagnes et ventes.",
    },
    {
      category: "Productivité & IA",
      tools: ["Notion AI", "ChatGPT / Gemini Business", "Miro"],
      notes: "Production de contenus, synthèse feedback, brainstorming assisté IA.",
    },
  ];

  const workflows: string[] = [
    "Onboarding client automatisé (email + ressources + prise de rendez-vous)",
    "Nurturing post-webinaire avec segmentation dynamique",
    "Score lead basé sur engagement + MQL → SQL automatique",
    "Reporting hebdomadaire envoyé sur Slack/Email avec KPI clés",
  ];

  const campaigns: string[] = [
    "Séquence email welcome en 4 étapes + CTA découverte",
    "Campagne social proof (témoignages, études de cas, avant/après)",
    "Mini-série vidéo sur les problèmes prioritaires du marché",
    "Offre limitée / bundle lancement pour déclencher les ventes",
  ];

  const kpis: string[] = [
    "Taux de conversion par canal",
    "Coût par lead qualifié",
    "Cycle de vente moyen",
    "Taux de rétention / réachat",
  ];

  if (inputs.objective === "valider") {
    workflows.unshift("Boucle feedback automatisée (formulaire + tagging insights)");
    kpis.unshift("Nombre d'apprentissages actionnables / semaine");
  }

  if (inputs.objective === "optimiser") {
    campaigns.push("Programme referral & ambassadeurs avec récompenses graduées");
    workflows.push("Alertes churn & offres de réengagement automatiques");
  }

  return { stack, workflows, campaigns, kpis };
}

function buildGrowthPlan(inputs: BlueprintInputs): GrowthPlan {
  let sectorNarrative = "vertical";
  if (inputs.sector) {
    sectorNarrative = "spécifique au secteur " + inputs.sector;
  }

  let automationDescriptor = "essentielles";
  if (inputs.automationPriority === "elevee") {
    automationDescriptor = "avancées";
  }

  const audienceDescriptor = inputs.targetAudience || "clients";

  const differentiators = [
    "Positionnement " + sectorNarrative + " avec preuves sociales renforcées",
    "Expérience client orchestrée de bout en bout avec automatisations " + automationDescriptor,
    "Communauté d'utilisateurs impliquée (" + audienceDescriptor + ") pour co-construire les évolutions",
  ];

  const roadmap: GrowthInitiative[] = [
    {
      title: "Pilier visibilité & crédibilité",
      description:
        "Développer un portefeuille de contenus signature (livre blanc, masterclass, toolkit) et organiser 1 évènement phare/mois.",
      expectedImpact: "+30% trafic qualifié et multiplication par 2 des demandes entrantes en 90 jours.",
    },
    {
      title: "Pilier conversion & monétisation",
      description:
        "Structurer un tunnel evergreen avec offres différenciées (essai, pack premium, accompagnement).",
      expectedImpact: "Augmentation du taux de transformation global de 20% et panier moyen +15%.",
    },
    {
      title: "Pilier fidélisation & expansion",
      description:
        "Mise en place d'un programme ambassadeurs + customer success proactif (QBR, communauté privée, upsell personnalisé).",
      expectedImpact: "Réduction churn de 25% et hausse LTV de 18% sur 6 mois.",
    },
  ];

  const riskMitigation = [
    "Mettre en place un plan de contingence budgétaire (-30% budget acquisition) et scénarios de priorisation.",
    "Audit juridique & conformité RGPD sur les outils utilisés.",
    "Veille concurrentielle bi-mensuelle avec tableau comparatif prix/offres.",
  ];

  if (inputs.objective === "valider") {
    roadmap[1].description = "Formaliser des offres bêta/alpha avec cohortes limitées et feedback structuré.";
    roadmap[1].expectedImpact = "Validation de 3 segments clients et génération des premiers revenus récurrents.";
  }

  if (inputs.objective === "acquerir") {
    roadmap[0].description = "Lancer 3 campagnes multi-canales orchestrées avec scoring et personnalisation avancée.";
    roadmap[0].expectedImpact = "Doublement du pipeline commercial et baisse de 15% du coût par lead.";
  }

  return { differentiators, roadmap, riskMitigation };
}

function buildMarkdownExport(
  inputs: BlueprintInputs,
  plan: Omit<BlueprintPlan, "exportPayload">,
): string {
  const lines: string[] = [];
  lines.push("Business Launch Blueprint - " + (inputs.companyName || "Projet"));
  lines.push("_Généré le " + plan.generatedAt + "_");
  lines.push("\n## Synthèse exécutive");
  lines.push(plan.summary);
  lines.push("\n### Résultats attendus");
  plan.keyResults.forEach((kr) => lines.push("- " + kr));

  lines.push("\n## Business Model");
  plan.businessModel.forEach((section) => {
    lines.push("\n### " + section.title);
    lines.push(section.description);
    section.bullets.forEach((bullet) => lines.push("- " + bullet));
  });

  lines.push("\n## Plan d'action 30 jours");
  plan.actionPlan.forEach((week) => {
    lines.push("\n### " + week.week + " - " + week.focus);
    lines.push("Priorité : " + week.priority);
    lines.push("**Actions clés**");
    week.actions.forEach((action) => lines.push("- " + action));
    lines.push("**Livrables**");
    week.deliverables.forEach((deliverable) => lines.push("- " + deliverable));
    lines.push("**KPIs**");
    week.successMetrics.forEach((metric) => lines.push("- " + metric));
  });

  lines.push("\n## Budget prévisionnel");
  plan.budget.investment.forEach((line) => {
    lines.push("- " + line.label + " (" + budgetFormatter.format(line.amount) + ") - " + line.details);
  });
  plan.budget.operations.forEach((line) => {
    lines.push(
      "- " +
        line.label +
        " (" +
        budgetFormatter.format(line.amount) +
        "/mois) - " +
        line.details,
    );
  });
  lines.push("\nCommentaire : " + plan.budget.commentary);

  lines.push("\n## Automatisation & Marketing");
  plan.automation.stack.forEach((stack) => {
    lines.push("- **" + stack.category + "** : " + stack.tools.join(", ") + " - " + stack.notes);
  });
  lines.push("\nWorkflows prioritaires");
  plan.automation.workflows.forEach((wf) => lines.push("- " + wf));
  lines.push("\nCampagnes");
  plan.automation.campaigns.forEach((campaign) => lines.push("- " + campaign));
  lines.push("\nKPIs");
  plan.automation.kpis.forEach((kpi) => lines.push("- " + kpi));

  lines.push("\n## Croissance & différenciation");
  plan.growth.differentiators.forEach((diff) => lines.push("- " + diff));
  plan.growth.roadmap.forEach((item) => {
    lines.push(
      "- **" +
        item.title +
        "** : " +
        item.description +
        " (Impact : " +
        item.expectedImpact +
        ")",
    );
  });
  plan.growth.riskMitigation.forEach((risk) => lines.push("- " + risk));

  return lines.join("\n");
}

function buildCsvExport(plan: Omit<BlueprintPlan, "exportPayload">): string {
  const rows: string[][] = [];
  rows.push(["Catégorie", "Libellé", "Montant", "Détails", "Fréquence"]);

  plan.budget.investment.forEach((line) => {
    rows.push([
      "Investissement",
      line.label,
      budgetFormatter.format(line.amount),
      line.details,
      line.frequency === "unique" ? "Unique" : "",
    ]);
  });

  plan.budget.operations.forEach((line) => {
    rows.push([
      "Opérations",
      line.label,
      budgetFormatter.format(line.amount),
      line.details,
      "Mensuel",
    ]);
  });

  plan.actionPlan.forEach((week) => {
    rows.push([
      "Plan 30 jours",
      week.week + " - " + week.priority,
      "-",
      week.focus + " | Actions : " + week.actions.join("; "),
      "Hebdomadaire",
    ]);
  });

  return rows
    .map((cols) => cols.map((value) => '"' + value.replace(/"/g, '""') + '"').join(","))
    .join("\n");
}

export function generateBlueprint(inputs: BlueprintInputs): BlueprintPlan {
  const totalBudget = Number.isFinite(inputs.budget) ? inputs.budget : 0;
  const objectiveDetails = objectiveFocus[inputs.objective];
  const budgetSplit = computeInvestmentSplit(totalBudget, inputs.automationPriority);

  const planWithoutExports: Omit<BlueprintPlan, "exportPayload"> = {
    generatedAt: format(new Date(), "dd MMMM yyyy", { locale: fr }),
    summary:
      "Votre plan " +
      (inputs.objective === "valider" ? "de validation" : "de déploiement") +
      " est calibré pour " +
      objectiveDetails.focus.toLowerCase() +
      " avec un budget prévisionnel de " +
      budgetFormatter.format(totalBudget) +
      " et une feuille de route opérationnelle sur 30 jours.",
    headline: "Accélérer " + (inputs.companyName || "votre projet") + " avec un plan d'action piloté par la donnée",
    keyResults: [
      "Atteindre " + objectiveDetails.metrics[0].toLowerCase() + " sous 30 jours",
      "Aligner l'équipe sur une roadmap priorisée et mesurable",
      "Mettre en place une stack d'automatisation adaptée au profil " + inputs.teamSize,
    ],
    businessModel: buildBusinessModel(inputs, objectiveDetails),
    actionPlan: buildActionPlan(inputs),
    budget: {
      investment: budgetSplit.investment,
      operations: budgetSplit.operations,
      guardrails: [
        "Réaffecter 15% du budget vers les canaux les plus rentables chaque semaine",
        "Stopper toute campagne sous-performante après 5 jours consécutifs sans amélioration",
        "Maintenir 20% du budget en réserve pour opportunités ou imprévus",
      ],
      commentary: budgetSplit.commentary,
    },
    automation: buildAutomationStack(inputs),
    growth: buildGrowthPlan(inputs),
  };

  const markdown = buildMarkdownExport(inputs, planWithoutExports);
  const csv = buildCsvExport(planWithoutExports);

  return {
    ...planWithoutExports,
    exportPayload: { markdown, csv },
  };
}

export function formatCurrency(value: number): string {
  return budgetFormatter.format(value);
}
