import axios, { AxiosInstance, AxiosError, AxiosRequestConfig } from 'axios';
import type {
  GenerationRequest,
  GenerationResponse,
  CreditsResponse,
  SunoAPIError,
} from '@/types/sunoapi';

class SunoAPIClient {
  private client: AxiosInstance;
  private maxRetries = 3;
  private retryDelay = 1000; // 1 second

  constructor() {
    const baseURL = process.env.SUNOAPI_BASE_URL || 'https://api.sunoapi.com/api/v1';
    const apiKey = process.env.SUNOAPI_KEY;

    if (!apiKey) {
      throw new Error('SUNOAPI_KEY is not configured in environment variables');
    }

    this.client = axios.create({
      baseURL,
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      timeout: 30000, // 30 seconds
    });

    // Request interceptor for logging
    this.client.interceptors.request.use(
      (config) => {
        console.log(`[SunoAPI] ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => {
        console.error('[SunoAPI] Request error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor for logging and error handling
    this.client.interceptors.response.use(
      (response) => {
        console.log(`[SunoAPI] Response ${response.status}:`, response.data);
        return response;
      },
      async (error: AxiosError) => {
        const config = error.config as AxiosRequestConfig & { _retry?: number };
        
        // Log error details
        console.error('[SunoAPI] Error:', {
          status: error.response?.status,
          message: error.message,
          data: error.response?.data,
        });

        // Retry logic for transient failures (5xx errors or network issues)
        if (
          config &&
          !config._retry &&
          (error.code === 'ECONNABORTED' ||
            error.code === 'ETIMEDOUT' ||
            (error.response?.status && error.response.status >= 500))
        ) {
          config._retry = (config._retry || 0) + 1;

          if (config._retry <= this.maxRetries) {
            console.log(`[SunoAPI] Retrying request (${config._retry}/${this.maxRetries})...`);
            await this.delay(this.retryDelay * config._retry);
            return this.client(config);
          }
        }

        return Promise.reject(this.formatError(error));
      }
    );
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private formatError(error: AxiosError): SunoAPIError {
    const response = error.response;
    
    if (response) {
      return {
        error: 'API Error',
        message: (response.data as any)?.message || error.message,
        status: response.status,
      };
    }

    if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
      return {
        error: 'Timeout Error',
        message: 'Request timed out. Please try again.',
        status: 408,
      };
    }

    return {
      error: 'Network Error',
      message: error.message || 'An unexpected error occurred',
      status: 500,
    };
  }

  // Validate API key
  async validateAPIKey(): Promise<boolean> {
    try {
      const response = await this.client.get('/get-credits');
      return response.status === 200;
    } catch (error) {
      return false;
    }
  }

  // Get credits balance
  async getCredits(): Promise<CreditsResponse> {
    const response = await this.client.get<{ credits: number; extra_credits: number }>('/get-credits');
    // Transform to match our interface
    return {
      credits: response.data.credits + response.data.extra_credits,
      total_credits: response.data.credits + response.data.extra_credits,
      credits_used: 0,
    };
  }

  // Generate music
  async generateMusic(request: GenerationRequest): Promise<GenerationResponse> {
    const response = await this.client.post<{ message: string; task_id: string }>('/suno/create', request);
    // Return task_id as the generation ID
    return {
      id: response.data.task_id,
      status: 'pending',
    };
  }

  // Get generation status
  async getGenerationStatus(id: string): Promise<GenerationResponse> {
    console.log(`[SunoAPI] Checking status for task: ${id}`);
    
    try {
      const response = await this.client.get<{
        code: number;
        data: Array<{
          clip_id: string;
          state: string;
          title: string;
          tags: string;
          audio_url?: string;
          video_url?: string;
          duration?: number;
        }>;
        message: string;
      }>(`/suno/task/${id}`);
      
      console.log(`[SunoAPI] Task response:`, response.data);
      
      // Transform to match our interface
      const track = response.data.data?.[0];
      if (!track) {
        console.warn(`[SunoAPI] No track data found for task ${id}`);
        // Return processing status if no data yet
        return {
          id: id,
          status: 'processing',
        };
      }
      
      const status = track.state === 'succeeded' ? 'completed' : 
                     track.state === 'failed' ? 'failed' : 
                     'processing';
      
      console.log(`[SunoAPI] Track status: ${status}, state: ${track.state}`);
      
      return {
        id: track.clip_id,
        status: status,
        audio_url: track.audio_url,
        video_url: track.video_url,
        title: track.title,
        tags: track.tags,
        duration: track.duration,
      };
    } catch (error: any) {
      console.error(`[SunoAPI] Status check failed for task ${id}:`, error.message);
      throw error;
    }
  }

  // Download music
  async downloadMusic(id: string): Promise<Blob> {
    // First get the track info to get the audio URL
    const trackInfo = await this.getGenerationStatus(id);
    
    if (!trackInfo.audio_url) {
      throw new Error('Audio URL not available');
    }
    
    // Download directly from the CDN URL
    const response = await axios.get(trackInfo.audio_url, {
      responseType: 'blob',
    });
    
    return response.data;
  }
}

// Export singleton instance
export const sunoAPIClient = new SunoAPIClient();
