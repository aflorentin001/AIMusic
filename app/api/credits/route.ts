import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { sunoAPIClient } from '@/lib/sunoapi-client';
import type { CreditsResponse, SunoAPIError } from '@/types/sunoapi';

export const runtime = 'nodejs';

export async function GET() {
  try {
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
