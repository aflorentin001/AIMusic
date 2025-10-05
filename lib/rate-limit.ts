/**
 * Rate Limiting Utility
 * Prevents API abuse by limiting requests per IP address
 */

import { NextRequest, NextResponse } from 'next/server';

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

// In-memory store (for production, use Redis or similar)
const rateLimitStore: RateLimitStore = {};

// Clean up old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  Object.keys(rateLimitStore).forEach((key) => {
    if (rateLimitStore[key].resetTime < now) {
      delete rateLimitStore[key];
    }
  });
}, 5 * 60 * 1000);

export interface RateLimitConfig {
  interval: number; // Time window in milliseconds
  uniqueTokenPerInterval: number; // Max requests per interval
}

/**
 * Rate limit middleware
 * @param request - Next.js request object
 * @param config - Rate limit configuration
 * @returns Response if rate limited, null if allowed
 */
export async function rateLimit(
  request: NextRequest,
  config: RateLimitConfig = {
    interval: 60 * 1000, // 1 minute
    uniqueTokenPerInterval: 10, // 10 requests per minute
  }
): Promise<NextResponse | null> {
  // Get client IP
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
  const now = Date.now();
  const resetTime = now + config.interval;

  // Initialize or get existing rate limit data
  if (!rateLimitStore[ip] || rateLimitStore[ip].resetTime < now) {
    rateLimitStore[ip] = {
      count: 1,
      resetTime,
    };
    return null; // Allow request
  }

  // Increment counter
  rateLimitStore[ip].count += 1;

  // Check if limit exceeded
  if (rateLimitStore[ip].count > config.uniqueTokenPerInterval) {
    const retryAfter = Math.ceil((rateLimitStore[ip].resetTime - now) / 1000);
    
    return NextResponse.json(
      {
        error: 'Too Many Requests',
        message: 'You have exceeded the rate limit. Please try again later.',
        retryAfter: `${retryAfter} seconds`,
      },
      {
        status: 429,
        headers: {
          'Retry-After': retryAfter.toString(),
          'X-RateLimit-Limit': config.uniqueTokenPerInterval.toString(),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': rateLimitStore[ip].resetTime.toString(),
        },
      }
    );
  }

  // Request allowed
  return null;
}

/**
 * Get remaining rate limit for an IP
 */
export function getRateLimitStatus(ip: string, config: RateLimitConfig) {
  const now = Date.now();
  const data = rateLimitStore[ip];

  if (!data || data.resetTime < now) {
    return {
      limit: config.uniqueTokenPerInterval,
      remaining: config.uniqueTokenPerInterval,
      reset: now + config.interval,
    };
  }

  return {
    limit: config.uniqueTokenPerInterval,
    remaining: Math.max(0, config.uniqueTokenPerInterval - data.count),
    reset: data.resetTime,
  };
}
