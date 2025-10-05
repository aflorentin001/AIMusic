import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { sunoAPIClient } from '@/lib/sunoapi-client';
import type { SunoAPIError } from '@/types/sunoapi';

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
        { error: 'Unauthorized', message: 'You must be logged in to download music' },
        { status: 401 }
      );
    }

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: 'Validation Error', message: 'Track ID is required' },
        { status: 400 }
      );
    }

    // Download music file
    const blob = await sunoAPIClient.downloadMusic(id);

    // Return the blob as a downloadable file
    return new NextResponse(blob, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Disposition': `attachment; filename="track-${id}.mp3"`,
      },
    });
  } catch (error: any) {
    console.error('Download error:', error);
    
    const apiError: SunoAPIError = {
      error: 'Download Failed',
      message: error.message || 'Unable to download music file',
      status: error.status || 500,
    };

    return NextResponse.json(apiError, { status: apiError.status });
  }
}
