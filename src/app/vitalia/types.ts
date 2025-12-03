export type Language = "en" | "fr" | "ro";

export interface DifferentialDiagnosisEntry {
  hypothesis: string;
  probability: number;
}

export interface MedicationInsight {
  name: string;
  dosage?: string;
  usage?: string;
  warnings?: string;
}

export interface DrugInteraction {
  drugs: string[];
  interaction: string;
}

export interface GeoHospital {
  name: string;
  address?: string;
  distanceMinutes?: number;
  mapUrl?: string;
}

export interface MedicalAnalysisResponse {
  urgencyLevel: number;
  clinicalSummary: string;
  differentialDiagnosis: DifferentialDiagnosisEntry[];
  redFlags: string[];
  actionPlan: string[];
  prePrescription: MedicationInsight[];
  drugInteractions: DrugInteraction[];
  geolocatedHospitals: GeoHospital[];
  interviewQuestions?: string[];
  rawText?: string;
}

export interface BodyMetrics {
  weightKg: number;
  heightCm: number;
  age: number;
  activityLevel?: string;
  photoDataUrl?: string;
}

export interface UploadedMedia {
  name: string;
  type: string;
  previewUrl?: string;
}

export interface InteractionRecord {
  id: string;
  createdAt: number;
  userText?: string;
  attachments: UploadedMedia[];
  response?: MedicalAnalysisResponse;
  category:
    | "clinical"
    | "medication"
    | "voice"
    | "vision"
    | "body";
}

export interface OfflineGuide {
  title: string;
  steps: string[];
  code: "CPR" | "CHOKING" | "BLEEDING" | "UNCONSCIOUS";
}
