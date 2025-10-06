'use client';

import { motion } from 'framer-motion';
import { Music2, Users, Award, Target, Heart, Zap } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <>
      <style jsx global>{`
        body {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
          min-height: 100vh;
        }
      `}</style>

      <div style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        minHeight: '100vh'
      }}>
        {/* Header */}
        <header style={{
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
          padding: '1rem 1.5rem',
          position: 'sticky',
          top: 0,
          zIndex: 50
        }}>
          <div style={{
            maxWidth: '80rem',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
              <Music2 style={{ width: '2rem', height: '2rem', color: '#3b82f6' }} />
              <span style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827' }}>AI Music Studio</span>
            </Link>
            <Link href="/" style={{ 
              color: '#3b82f6', 
              fontWeight: 500,
              textDecoration: 'none'
            }}>
              ← Back to Home
            </Link>
          </div>
        </header>

        {/* Content */}
        <main style={{
          maxWidth: '80rem',
          margin: '0 auto',
          padding: '2rem 1.5rem'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: '1.5rem',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
            padding: '3rem'
          }}>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: 700,
              marginBottom: '1rem',
              color: '#111827',
              textAlign: 'center'
            }}>
              About AI Music Studio
            </h1>
            <p style={{
              fontSize: '1.25rem',
              color: '#6b7280',
              textAlign: 'center',
              marginBottom: '3rem'
            }}>
              We're on a mission to democratize music creation through AI, making professional-quality music accessible to everyone.
            </p>

            {/* Mission & Vision */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
              <div style={{ background: '#f9fafb', borderRadius: '1rem', padding: '2rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                <Target style={{ width: '3rem', height: '3rem', color: '#3b82f6', marginBottom: '1rem' }} />
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>Our Mission</h2>
                <p style={{ color: '#6b7280', lineHeight: 1.6 }}>
                  To empower creators worldwide with AI-powered music generation tools that are intuitive, affordable, and produce professional-quality results.
                </p>
              </div>

              <div style={{ background: '#f9fafb', borderRadius: '1rem', padding: '2rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                <Zap style={{ width: '3rem', height: '3rem', color: '#9333ea', marginBottom: '1rem' }} />
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>Our Vision</h2>
                <p style={{ color: '#6b7280', lineHeight: 1.6 }}>
                  To become the world's leading AI music platform, fostering a global community of creators who push the boundaries.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div style={{ 
              background: 'linear-gradient(135deg, #3b82f6, #9333ea)', 
              borderRadius: '1rem', 
              padding: '3rem 2rem',
              marginBottom: '3rem'
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '2rem', textAlign: 'center', color: 'white' }}>
                <div>
                  <div style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '0.5rem' }}>50K+</div>
                  <div style={{ color: 'rgba(255,255,255,0.8)' }}>Active Creators</div>
                </div>
                <div>
                  <div style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '0.5rem' }}>2M+</div>
                  <div style={{ color: 'rgba(255,255,255,0.8)' }}>Songs Generated</div>
                </div>
                <div>
                  <div style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '0.5rem' }}>150+</div>
                  <div style={{ color: 'rgba(255,255,255,0.8)' }}>Countries</div>
                </div>
                <div>
                  <div style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '0.5rem' }}>99.9%</div>
                  <div style={{ color: 'rgba(255,255,255,0.8)' }}>Uptime</div>
                </div>
              </div>
            </div>

            {/* Values */}
            <h2 style={{ fontSize: '2rem', fontWeight: 700, textAlign: 'center', marginBottom: '2rem' }}>Our Values</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
              {[
                { icon: Heart, title: 'Creator-First', description: 'We build for creators, listening to their needs and feedback.' },
                { icon: Award, title: 'Quality', description: 'We never compromise on the quality of our AI-generated music.' },
                { icon: Users, title: 'Community', description: 'We foster a supportive community of creators helping each other.' },
              ].map((value, index) => {
                const Icon = value.icon;
                return (
                  <div key={index} style={{ background: '#f9fafb', borderRadius: '0.75rem', padding: '1.5rem' }}>
                    <Icon style={{ width: '2.5rem', height: '2.5rem', color: '#3b82f6', marginBottom: '1rem' }} />
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>{value.title}</h3>
                    <p style={{ color: '#6b7280', fontSize: '0.9375rem' }}>{value.description}</p>
                  </div>
                );
              })}
            </div>

            {/* Team */}
            <h2 style={{ fontSize: '2rem', fontWeight: 700, textAlign: 'center', marginBottom: '1rem' }}>Our Team</h2>
            <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '2rem' }}>
              A diverse team of AI researchers, musicians, and engineers passionate about making music creation accessible to all.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
              {[
                { name: 'Sarah Chen', role: 'CEO & Co-Founder', initial: 'SC' },
                { name: 'Marcus Rodriguez', role: 'CTO & Co-Founder', initial: 'MR' },
                { name: 'Emily Watson', role: 'Head of AI Research', initial: 'EW' },
                { name: 'James Park', role: 'Head of Product', initial: 'JP' },
              ].map((member, index) => (
                <div key={index} style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '8rem',
                    height: '8rem',
                    margin: '0 auto 1rem',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #3b82f6, #9333ea)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '2rem',
                    fontWeight: 700
                  }}>
                    {member.initial}
                  </div>
                  <h3 style={{ fontWeight: 700, fontSize: '1.125rem', marginBottom: '0.25rem' }}>{member.name}</h3>
                  <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>{member.role}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
              <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' }}>Join Our Journey</h2>
              <p style={{ fontSize: '1.125rem', color: '#6b7280', marginBottom: '2rem' }}>
                Be part of the AI music revolution. Start creating today.
              </p>
              <Link href="/signup">
                <button style={{
                  padding: '1rem 2rem',
                  background: 'linear-gradient(135deg, #3b82f6, #9333ea)',
                  color: 'white',
                  fontWeight: 600,
                  borderRadius: '0.75rem',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  transition: 'all 0.2s'
                }}>
                  Get Started Free
                </button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
