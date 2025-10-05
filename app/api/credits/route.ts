import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { sunoAPIClient } from '@/lib/sunoapi-client';
import { rateLimit } from '@/lib/rate-limit';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try {
    // Rate limiting: 30 requests per minute
    const rateLimitResponse = await rateLimit(request, {
      interval: 60 * 1000, // 1 minute
      uniqueTokenPerInterval: 30, // 30 credit checks per minute
    });
    
    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    // Check if user is authenticated
    const session = await auth();
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized', message: 'You must be logged in to view credits' },
        { status: 401 }
      );
    }

    // Fetch credits from SunoAPI
    const credits = await sunoAPIClient.getCredits();
    return NextResponse.json<CreditsResponse>(credits);
  } catch (error: any) {
    console.error('Credits fetch error:', error);
    
    const apiError: SunoAPIError = {
      error: 'Credits Fetch Failed',
      message: error.message || 'Unable to fetch credits balance',
      status: error.status || 500,
    };

    return NextResponse.json(apiError, { status: apiError.status });
  }
}
