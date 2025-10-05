// ============================================================================
// User & Authentication Types
// ============================================================================

export interface User {
  id: string;
  email: string;
  name?: string;
  image?: string;
  createdAt: Date;
}

export interface Session {
  user: User;
  expires: string;
}

// ============================================================================
// SunoAPI Types
// ============================================================================

export type ModelVersion = 'chirp-v3-5' | 'chirp-v4' | 'chirp-v4-5' | 'chirp-v4-5-plus' | 'chirp-v5';
export type VocalGender = 'f' | 'm';
export type TaskType = 'create_music' | 'extend_music' | 'concat_music' | 'cover_music' | 'cover_upload_music' | 'extend_upload_music' | 'persona_music';
export type TrackStatus = 'pending' | 'processing' | 'completed' | 'failed';

export interface GenerationRequest {
  custom_mode: boolean;
  gpt_description_prompt?: string;
  prompt?: string;
  tags?: string;
  title?: string;
  make_instrumental?: boolean;
  mv: ModelVersion;
  style_weight?: number;
  weirdness_constraint?: number;
  negative_tags?: string;
  vocal_gender?: VocalGender;
  auto_lyrics?: boolean;
  task_type?: TaskType;
  continue_clip_id?: string;
  continue_at?: number;
  persona_id?: string;
}

export interface GenerationResponse {
  message: string;
  task_id: string;
}

export interface TrackData {
  id: string;
  status: TrackStatus;
  audio_url?: string;
  video_url?: string;
  title?: string;
  tags?: string;
  duration?: number;
  created_at?: string;
  model_name?: string;
  gpt_description_prompt?: string;
  prompt?: string;
  type?: string;
  error_message?: string;
}

export interface CreditsResponse {
  credits: number;
  extra_credits: number;
}

// ============================================================================
// Music Generation Types
// ============================================================================

export interface MusicGenerationForm {
  description: string;
  customMode: boolean;
  lyrics?: string;
  title?: string;
  style?: string;
  instrumental: boolean;
  modelVersion: ModelVersion;
  vocalGender?: VocalGender;
  styleWeight?: number;
  weirdnessConstraint?: number;
  negativePrompt?: string;
}

export interface GeneratedTrack {
  id: string;
  title: string;
  audioUrl: string;
  videoUrl?: string;
  duration: number;
  style: string;
  createdAt: Date;
  status: TrackStatus;
  userId: string;
  projectId?: string;
}

// ============================================================================
// Project Management Types
// ============================================================================

export interface Project {
  id: string;
  name: string;
  description?: string;
  userId: string;
  tracks: GeneratedTrack[];
  createdAt: Date;
  updatedAt: Date;
  thumbnail?: string;
  tags: string[];
}

export interface ProjectTemplate {
  id: string;
  name: string;
  description: string;
  icon: string;
  defaultSettings: Partial<MusicGenerationForm>;
}

// ============================================================================
// UI Component Types
// ============================================================================

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export interface CardProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  footer?: React.ReactNode;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

// ============================================================================
// API Response Types
// ============================================================================

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

// ============================================================================
// Analytics & Stats Types
// ============================================================================

export interface UsageStats {
  totalTracks: number;
  totalProjects: number;
  creditsUsed: number;
  creditsRemaining: number;
  popularGenres: { genre: string; count: number }[];
  recentActivity: {
    date: string;
    tracksGenerated: number;
    creditsUsed: number;
  }[];
}

// ============================================================================
// Feature Types
// ============================================================================

export interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface PricingTier {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  popular?: boolean;
  credits: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  content: string;
  avatar: string;
  rating: number;
}
