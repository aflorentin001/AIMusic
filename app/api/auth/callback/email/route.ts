import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { signIn } from '@/auth';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get('token');
  const email = searchParams.get('email');

  if (!token || !email) {
    return NextResponse.redirect(new URL('/auth/error?error=Verification', request.url));
  }

  try {
    // Find and verify token
    const verificationToken = await prisma.verificationToken.findUnique({
      where: {
        identifier_token: {
          identifier: email,
          token,
        },
      },
    });

    if (!verificationToken) {
      return NextResponse.redirect(new URL('/auth/error?error=Verification', request.url));
    }

    // Check if token is expired
    if (verificationToken.expires < new Date()) {
      await prisma.verificationToken.delete({
        where: {
          identifier_token: {
            identifier: email,
            token,
          },
        },
      });
      return NextResponse.redirect(new URL('/auth/error?error=Verification', request.url));
    }

    // Delete the used token
    await prisma.verificationToken.delete({
      where: {
        identifier_token: {
          identifier: email,
          token,
        },
      },
    });

    // Find or create user
    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          emailVerified: new Date(),
        },
      });
    } else {
      // Update email verified
      await prisma.user.update({
        where: { email },
        data: { emailVerified: new Date() },
      });
    }

    // Redirect to dashboard with success
    // Note: In a production app, you'd create a proper session here
    return NextResponse.redirect(new URL('/dashboard', request.url));
  } catch (error) {
    console.error('Magic link verification error:', error);
    return NextResponse.redirect(new URL('/auth/error?error=Verification', request.url));
  }
}
