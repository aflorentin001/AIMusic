'use client';

import { Music2 } from 'lucide-react';
import Link from 'next/link';

export default function PublicHeader() {
  return (
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
  );
}
