export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Remedy {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  warnings?: string[];
  effectiveness: number;
}

export interface Condition {
  id: string;
  name: string;
  description: string;
  confidence: number;
  remedies: Remedy[];
  urgencyLevel: UrgencyLevel;
  seekMedicalAttention: boolean;
  preventionTips: string[];
}

export type UrgencyLevel = 'low' | 'medium' | 'high' | 'emergency';

export interface SymptomAnalysisResult {
  symptoms: string;
  conditions: Condition[];
  urgencyLevel: UrgencyLevel;
  generalAdvice: string[];
}