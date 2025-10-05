import { NextResponse } from 'next/server';
import { sunoAPIClient } from '@/lib/sunoapi-client';
import type { APIValidationResponse } from '@/types/sunoapi';

export const runtime = 'nodejs';

export async function GET() {
  try {
    // Validate API key by attempting to fetch credits
    const isValid = await sunoAPIClient.validateAPIKey();

    if (!isValid) {
      return NextResponse.json<APIValidationResponse>(
        {
          valid: false,
          message: 'Invalid API key or unable to connect to SunoAPI',
        },
        { status: 401 }
      );
    }

    // If valid, also fetch credits info
    const credits = await sunoAPIClient.getCredits();

    return NextResponse.json<APIValidationResponse>({
      valid: true,
      message: 'API key is valid and working',
      credits,
    });
  } catch (error) {
    console.error('API validation error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to validate API key';
    
    return NextResponse.json<APIValidationResponse>(
      {
        valid: false,
        message: errorMessage,
      },
      { status: 500 }
    );
  }
}
