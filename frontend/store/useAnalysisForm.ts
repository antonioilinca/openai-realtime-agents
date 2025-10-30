import { create } from "zustand";

export type ProblemCategory =
  | "civil"
  | "pénal"
  | "travail"
  | "immobilier"
  | "administratif"
  | "commercial"
  | "fiscal"
  | "autre";

interface AnalysisFormState {
  step: number;
  subject: string;
  context: string;
  problemType: ProblemCategory;
  details: string;
  setSubject: (value: string) => void;
  setContext: (value: string) => void;
  setProblemType: (value: ProblemCategory) => void;
  setDetails: (value: string) => void;
  nextStep: () => void;
  previousStep: () => void;
  reset: () => void;
}

// Stocke l'état du formulaire multi-étapes avec Zustand.
export const useAnalysisForm = create<AnalysisFormState>((set) => ({
  step: 1,
  subject: "",
  context: "",
  problemType: "autre",
  details: "",
  setSubject: (value) => set({ subject: value }),
  setContext: (value) => set({ context: value }),
  setProblemType: (value) => set({ problemType: value }),
  setDetails: (value) => set({ details: value }),
  nextStep: () => set((state) => ({ step: Math.min(4, state.step + 1) })),
  previousStep: () => set((state) => ({ step: Math.max(1, state.step - 1) })),
  reset: () => set({ step: 1, subject: "", context: "", problemType: "autre", details: "" })
}));
