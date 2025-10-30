import { MarketAnalysis, MarketCompetitorInsight, ProductivityInput } from "./types";

/**
 * Market Scanner module
 * ---------------------
 * Simulates an automated benchmark by combining a lightweight static knowledge
 * base with contextual transformations based on the selected industry. The
 * output keeps the tone actionable so recommendations can be plugged directly
 * into the strategy engine.
 */
export function scanMarket(input: ProductivityInput): MarketAnalysis {
  const sectorPlaybooks: Record<
    string,
    {
      narrative: string;
      competitors: MarketCompetitorInsight[];
      opportunities: string[];
    }
  > = {
    SaaS: {
      narrative:
        "Leaders in SaaS accelerate productivity by automating customer success, usage analytics and renewal workflows.",
      competitors: [
        {
          name: "ScaleFlow",
          positioning: "Product-led growth with AI driven onboarding",
          differentiator: "Automated in-app guidance boosting activation by 32%",
          priorityAction: "Deploy product analytics loop to surface friction in user journeys",
        },
        {
          name: "NimbleStack",
          positioning: "Enterprise collaboration suite",
          differentiator: "Integrated AI summaries embedded in executive dashboards",
          priorityAction: "Launch executive briefing automation to reclaim leadership time",
        },
      ],
      opportunities: [
        "Double down on lifecycle automation to reduce manual success touchpoints",
        "Create freemium-to-paid conversion experiments using behavioural data",
      ],
    },
    Retail: {
      narrative:
        "Retail disruptors outperform by blending predictive inventory planning with unified commerce experiences.",
      competitors: [
        {
          name: "OmniWave",
          positioning: "Direct-to-consumer lifestyle brand",
          differentiator: "Dynamic pricing engine reacting to local demand signals",
          priorityAction: "Pilot demand sensing models to decrease stock-outs",
        },
        {
          name: "FulfillNow",
          positioning: "3PL partner with robotics",
          differentiator: "Automated warehouses hitting 98% on-time delivery",
          priorityAction: "Explore micro-fulfilment partnerships for urban markets",
        },
      ],
      opportunities: [
        "Synchronise e-commerce and store analytics for unified margin view",
        "Adopt last-mile experience tracking to boost NPS and repeat rate",
      ],
    },
    Manufacturing: {
      narrative:
        "Manufacturers leading the market pair digital twins with lean rituals to eliminate downtime.",
      competitors: [
        {
          name: "ProtoMakers",
          positioning: "High-mix low-volume specialist",
          differentiator: "Predictive maintenance preventing 48 hours of downtime monthly",
          priorityAction: "Instrument critical machines with IoT sensors and alerting",
        },
        {
          name: "FactoryIQ",
          positioning: "Global OEM",
          differentiator: "Closed-loop quality analytics reducing scrap by 18%",
          priorityAction: "Deploy quality dashboards to expose top recurring defects",
        },
      ],
      opportunities: [
        "Map energy consumption by line to surface immediate cost savings",
        "Introduce digital SOPs with AR assistance for rapid onboarding",
      ],
    },
  };

  const defaultPlaybook = {
    narrative:
      "Top performers leverage data orchestration, automation and empowered teams to deliver measurable productivity gains.",
    competitors: [
      {
        name: "Benchmark Leader",
        positioning: "Data-driven operator",
        differentiator: "Runs weekly improvement sprints aligned to board KPIs",
        priorityAction: "Adopt continuous improvement rituals anchored in live dashboards",
      },
    ],
    opportunities: [
      "Establish an experimentation culture with transparent ROI tracking",
      "Consolidate tooling stack to remove duplicate workflows and licenses",
    ],
  };

  const playbook = sectorPlaybooks[input.industry] || defaultPlaybook;

  return {
    summary: playbook.narrative,
    competitorInsights: playbook.competitors,
    opportunitySignals: playbook.opportunities,
  };
}
