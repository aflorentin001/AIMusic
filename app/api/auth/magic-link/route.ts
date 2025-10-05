import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';

export const runtime = 'nodejs'; // Force Node.js runtime for nodemailer

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Generate a secure token
    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Store token in database
    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token,
        expires,
      },
    });

    // Create magic link
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const magicLink = `${baseUrl}/api/auth/callback/email?token=${token}&email=${encodeURIComponent(email)}`;

    // Configure nodemailer with Gmail SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: Number(process.env.EMAIL_SERVER_PORT),
      secure: false,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Sign in to AI Music Studio',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f7fafc;">
            <div style="max-width: 600px; margin: 40px auto; background-color: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              
              <!-- Header -->
              <div style="background-color: #5b6ff5; padding: 40px; text-align: center;">
                <h1 style="margin: 0; color: white; font-size: 28px; font-weight: 700;">🎵 AI Music Studio</h1>
              </div>
              
              <!-- Content -->
              <div style="padding: 40px;">
                <h2 style="margin: 0 0 16px; color: #1a202c; font-size: 24px; font-weight: 600;">Sign in to your account</h2>
                <p style="margin: 0 0 24px; color: #718096; font-size: 16px; line-height: 1.6;">
                  Click the button below to sign in to AI Music Studio. This link will expire in 24 hours.
                </p>
                
                <!-- Button -->
                <div style="text-align: center; padding: 20px 0;">
                  <a href="${magicLink}" style="display: inline-block; background-color: #5b6ff5; color: white; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: 600; font-size: 16px;">
                    Sign In to AI Music Studio
                  </a>
                </div>
                
                <p style="margin: 24px 0 0; color: #a0aec0; font-size: 14px; line-height: 1.6;">
                  If you didn't request this email, you can safely ignore it.
                </p>
                
                <p style="margin: 16px 0 0; color: #a0aec0; font-size: 12px; line-height: 1.6;">
                  Or copy and paste this link: <br/>
                  <a href="${magicLink}" style="color: #5b6ff5; word-break: break-all;">${magicLink}</a>
                </p>
              </div>
              
              <!-- Footer -->
              <div style="background-color: #f7fafc; padding: 24px; text-align: center; border-top: 1px solid #e2e8f0;">
                <p style="margin: 0; color: #a0aec0; font-size: 13px;">
                  © 2025 AI Music Studio. All rights reserved.
                </p>
              </div>
              
            </div>
          </body>
        </html>
      `,
      text: `Sign in to AI Music Studio\n\nClick this link to sign in: ${magicLink}\n\nThis link will expire in 24 hours.\n\nIf you didn't request this email, you can safely ignore it.`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Magic link error:', error);
    return NextResponse.json(
      { error: 'Failed to send magic link' },
      { status: 500 }
    );
  }
}
