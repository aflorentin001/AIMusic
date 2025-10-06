'use client';

import { Music2 } from 'lucide-react';
import Link from 'next/link';
import { ReactNode } from 'react';

interface PublicPageLayoutProps {
  children: ReactNode;
  title?: string;
}

export default function PublicPageLayout({ children, title }: PublicPageLayoutProps) {
  return (
    <>
      <style jsx global>{`
        body {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
          min-height: 100vh;
        }
      `}</style>

      <div className="min-h-screen" style={{ 
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
              textDecoration: 'none',
              transition: 'color 0.2s'
            }}>
              ← Back to Home
            </Link>
          </div>
        </header>

        {/* Content */}
        <main style={{
          maxWidth: '80rem',
          margin: '0 auto',
          padding: '2rem 1.5rem',
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: '1.5rem',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            padding: '3rem',
            minHeight: 'calc(100vh - 10rem)'
          }}>
            {title && (
              <h1 style={{
                fontSize: '2.5rem',
                fontWeight: 700,
                marginBottom: '2rem',
                color: '#111827'
              }}>
                {title}
              </h1>
            )}
            {children}
          </div>
        </main>
      </div>
    </>
  );
}
