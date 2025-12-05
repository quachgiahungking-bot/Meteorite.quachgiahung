export enum AppState {
  IDLE = 'IDLE',
  CAPTURING = 'CAPTURING',
  ANALYZING = 'ANALYZING',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
  ERROR = 'ERROR'
}

export interface AnalysisResult {
  isMeteorite: boolean;
  classification: string;
  confidence: number;
  details: string;
  reasoning: string;
}

export interface GeneratedImage {
  url: string;
  angle: string;
}

export interface CheckpointLog {
  id: number;
  message: string;
  status: 'pending' | 'active' | 'completed';
}