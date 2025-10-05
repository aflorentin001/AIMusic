import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { sunoAPIClient } from '@/lib/sunoapi-client';
import type { GenerationResponse, SunoAPIError } from '@/types/sunoapi';

export const runtime = 'nodejs';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check if user is authenticated
    const session = await auth();
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized', message: 'You must be logged in to check music status' },
        { status: 401 }
      );
    }

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: 'Validation Error', message: 'Generation ID is required' },
        { status: 400 }
      );
    }

    // Get generation status
    const status = await sunoAPIClient.getGenerationStatus(id);

    return NextResponse.json<GenerationResponse>(status);
  } catch (error: any) {
    console.error('Status check error:', error);
    
    const apiError: SunoAPIError = {
      error: 'Status Check Failed',
      message: error.message || 'Unable to check generation status',
      status: error.status || 500,
    };

    return NextResponse.json(apiError, { status: apiError.status });
  }
}
