import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { sunoAPIClient } from '@/lib/sunoapi-client';
import { rateLimit } from '@/lib/rate-limit';
import type { GenerationRequest, GenerationResponse, SunoAPIError } from '@/types/sunoapi';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    // Rate limiting: 5 requests per minute
    const rateLimitResponse = await rateLimit(request, {
      interval: 60 * 1000, // 1 minute
      uniqueTokenPerInterval: 5, // 5 music generations per minute
    });
    
    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    // Check if user is authenticated
    const session = await auth();
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized', message: 'You must be logged in to generate music' },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await request.json();
    
    // Validate required fields
    if (!body.mv) {
      return NextResponse.json(
        { error: 'Validation Error', message: 'Model version (mv) is required' },
        { status: 400 }
      );
    }

    if (!body.custom_mode && !body.gpt_description_prompt) {
      return NextResponse.json(
        { error: 'Validation Error', message: 'Either custom_mode or gpt_description_prompt is required' },
        { status: 400 }
      );
    }

    // Create generation request
    const generationRequest: GenerationRequest = {
      custom_mode: body.custom_mode || false,
      gpt_description_prompt: body.gpt_description_prompt,
      prompt: body.prompt,
      tags: body.tags,
      title: body.title,
      make_instrumental: body.make_instrumental || false,
      mv: body.mv,
    };

    // Check credits before generating
    try {
      const credits = await sunoAPIClient.getCredits();
      if (credits.credits <= 0) {
        return NextResponse.json(
          { error: 'Insufficient Credits', message: 'You do not have enough credits to generate music' },
          { status: 402 }
        );
      }
    } catch (error) {
      console.error('Credits check failed:', error);
      // Continue anyway - let the API handle it
    }

    // Generate music - this returns a task_id
    const result = await sunoAPIClient.generateMusic(generationRequest);
    
    console.log('[Generate API] Task created:', result.id);
    
    // Poll for completion with optimized timing
    const maxAttempts = 60; // 60 attempts max
    let attempts = 0;
    let taskResult;
    
    while (attempts < maxAttempts) {
      // Aggressive polling: 1s for first 20 attempts, then 2s, then 3s
      const delay = attempts < 20 ? 1000 : attempts < 40 ? 2000 : 3000;
      await new Promise(resolve => setTimeout(resolve, delay));
      
      try {
        taskResult = await sunoAPIClient.getGenerationStatus(result.id);
        console.log(`[Generate API] Attempt ${attempts + 1}/${maxAttempts}, Status: ${taskResult.status}`);
        
        if (taskResult.status === 'completed' && taskResult.audio_url) {
          // Return the completed track with clips format
          console.log('[Generate API] Generation complete!');
          return NextResponse.json({
            clips: [{
              id: taskResult.id,
              title: taskResult.title,
              audio_url: taskResult.audio_url,
              video_url: taskResult.video_url,
              tags: taskResult.tags,
              status: 'complete',
              metadata: {
                duration_formatted: taskResult.duration ? `${Math.floor(taskResult.duration / 60)}:${String(taskResult.duration % 60).padStart(2, '0')}` : '2:32'
              }
            }]
          });
        } else if (taskResult.status === 'failed') {
          console.error('[Generate API] Generation failed');
          throw new Error('Music generation failed');
        }
        
        // Still processing, continue polling
        console.log('[Generate API] Still processing, waiting...');
      } catch (error) {
        console.error(`[Generate API] Error checking status:`, error);
        // Continue polling even if there's an error
      }
      
      attempts++;
    }
    
    // If we timeout after 3 minutes, something is wrong
    console.error('[Generate API] Timeout after 3 minutes');
    throw new Error('Music generation timed out. Please try again or contact support if credits were deducted.');
  } catch (error: any) {
    console.error('Music generation error:', error);
    
    const apiError: SunoAPIError = {
      error: 'Generation Failed',
      message: error.message || 'Unable to generate music',
      status: error.status || 500,
    };

    return NextResponse.json(apiError, { status: apiError.status });
  }
}
