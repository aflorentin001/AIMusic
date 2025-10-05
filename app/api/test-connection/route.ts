import { NextResponse } from 'next/server';
import { sunoAPIClient } from '@/lib/sunoapi-client';

export const runtime = 'nodejs';

interface TestResult {
  test: string;
  status: 'success' | 'failed';
  message: string;
  data?: any;
  error?: string;
}

interface TestConnectionResponse {
  overall_status: 'success' | 'partial' | 'failed';
  timestamp: string;
  tests: TestResult[];
  summary: {
    total: number;
    passed: number;
    failed: number;
  };
}

export async function GET() {
  const results: TestResult[] = [];
  let passedTests = 0;

  // Test 1: API Key Validation
  try {
    const isValid = await sunoAPIClient.validateAPIKey();
    
    if (isValid) {
      results.push({
        test: 'API Key Validation',
        status: 'success',
        message: 'API key is valid and authenticated',
      });
      passedTests++;
    } else {
      results.push({
        test: 'API Key Validation',
        status: 'failed',
        message: 'API key is invalid or not working',
      });
    }
  } catch (error: any) {
    results.push({
      test: 'API Key Validation',
      status: 'failed',
      message: 'Failed to validate API key',
      error: error.message,
    });
  }

  // Test 2: Credits Fetch
  try {
    const credits = await sunoAPIClient.getCredits();
    
    results.push({
      test: 'Credits Fetch',
      status: 'success',
      message: 'Successfully fetched credits balance',
      data: credits,
    });
    passedTests++;
  } catch (error: any) {
    results.push({
      test: 'Credits Fetch',
      status: 'failed',
      message: 'Failed to fetch credits',
      error: error.message,
    });
  }

  // Test 3: Test Generation Request (Simple)
  try {
    const testRequest = {
      custom_mode: false,
      gpt_description_prompt: 'A short happy melody for testing',
      mv: 'chirp-v3-5',
      make_instrumental: true,
    };

    const result = await sunoAPIClient.generateMusic(testRequest);
    
    results.push({
      test: 'Test Generation Request',
      status: 'success',
      message: 'Successfully initiated test music generation',
      data: {
        id: result.id,
        status: result.status,
      },
    });
    passedTests++;
  } catch (error: any) {
    results.push({
      test: 'Test Generation Request',
      status: 'failed',
      message: 'Failed to initiate test generation',
      error: error.message,
    });
  }

  // Determine overall status
  const totalTests = results.length;
  let overallStatus: 'success' | 'partial' | 'failed';
  
  if (passedTests === totalTests) {
    overallStatus = 'success';
  } else if (passedTests > 0) {
    overallStatus = 'partial';
  } else {
    overallStatus = 'failed';
  }

  const response: TestConnectionResponse = {
    overall_status: overallStatus,
    timestamp: new Date().toISOString(),
    tests: results,
    summary: {
      total: totalTests,
      passed: passedTests,
      failed: totalTests - passedTests,
    },
  };

  const statusCode = overallStatus === 'success' ? 200 : overallStatus === 'partial' ? 207 : 500;

  return NextResponse.json(response, { status: statusCode });
}
