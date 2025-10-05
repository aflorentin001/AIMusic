// SunoAPI TypeScript Interfaces

export interface GenerationRequest {
  custom_mode: boolean;
  gpt_description_prompt?: string;
  prompt?: string;
  tags?: string;
  title?: string;
  make_instrumental?: boolean;
  mv: string; // Model version
}

export interface GenerationResponse {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  audio_url?: string;
  video_url?: string;
  title?: string;
  tags?: string;
  duration?: number;
  created_at?: string;
  error_message?: string;
}

export interface CreditsResponse {
  credits: number;
  total_credits: number;
  credits_used: number;
}

export interface APIValidationResponse {
  valid: boolean;
  message: string;
  credits?: CreditsResponse;
}

export interface MusicGenerationStatus {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress?: number;
  audio_url?: string;
  video_url?: string;
  title?: string;
  tags?: string;
  error?: string;
}

export interface SunoAPIError {
  error: string;
  message: string;
  status: number;
}
