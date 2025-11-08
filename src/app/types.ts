export interface LessonSection {
  title: string;
  body: string[];
  analogies?: string[];
  highlights?: string[];
}

export interface Demonstration {
  code: string;
  explanation: string[];
  callToAction: string;
}

export interface CodeTest {
  code: string;
  description: string;
}

export interface Exercise {
  id: string;
  title: string;
  instructions: string;
  starterCode: string;
  defaultCode?: string;
  tests: CodeTest[];
  successMessage: string;
  hints: {
    baseline: string;
    remedial: string;
    advanced: string;
  };
}

export interface Challenge extends Exercise {
  reflection: string;
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  questions: QuizQuestion[];
}

export interface BonusLesson {
  title: string;
  description: string;
  resources: {
    label: string;
    url: string;
  }[];
}

export interface ModuleDefinition {
  id: string;
  title: string;
  duration: string;
  objective: string;
  motivation: string;
  concept: LessonSection;
  demonstration: Demonstration;
  exercise: Exercise;
  challenge: Challenge;
  quiz: Quiz;
  bonus: BonusLesson;
}

export interface ProgressRecord {
  moduleId: string;
  steps: {
    introduction: boolean;
    demonstration: boolean;
    exercise: boolean;
    challenge: boolean;
    quiz: boolean;
  };
  attempts: {
    exercise: number;
    challenge: number;
  };
}

export interface LearnerProfile {
  focusArea: string;
  momentumMessage: string;
  totalCompleted: number;
}
