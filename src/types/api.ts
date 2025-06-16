export interface PatientData {
  age: number;
  gender: 'Male' | 'Female';
  smoking: 'Never' | 'Former' | 'Current';
  alcohol_intake: 'None' | 'Light' | 'Moderate' | 'Heavy';
  exercise_hours: number;
  diabetes: 'Yes' | 'No';
  family_history: 'Yes' | 'No';
  obesity: 'Yes' | 'No';
  stress_level: number;
}

export interface PredictionResponse {
  risk_prediction: string;
  risk_probability: number;
  confidence_interval: [number, number];
  risk_factors: Record<string, string>;
  recommendations: string[];
  disclaimer: string;
}

export interface HealthResponse {
  status: string;
  models_loaded: boolean;
  timestamp: string;
}

export type RiskLevel = 'Alto Riesgo' | 'Riesgo Moderado' | 'Bajo Riesgo';