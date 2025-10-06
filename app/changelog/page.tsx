'use client';

import { motion } from 'framer-motion';
import { Sparkles, Bug, Zap, Shield } from 'lucide-react';
import PublicHeader from '@/components/PublicHeader';

const updates = [
  {
    version: 'v2.5.0',
    date: 'January 5, 2025',
    type: 'feature',
    items: [
      { icon: Sparkles, text: 'New AI model v5 with improved audio quality' },
      { icon: Zap, text: 'Faster generation times (30% improvement)' },
      { icon: Shield, text: 'Enhanced security with rate limiting' },
    ],
  },
  {
    version: 'v2.4.2',
    date: 'December 28, 2024',
    type: 'improvement',
    items: [
      { icon: Zap, text: 'Improved dashboard performance' },
      { icon: Bug, text: 'Fixed audio playback issues on Safari' },
    ],
  },
  {
    version: 'v2.4.0',
    date: 'December 20, 2024',
    type: 'feature',
    items: [
      { icon: Sparkles, text: 'Added stem separation feature' },
      { icon: Sparkles, text: 'New genre: Lo-Fi Hip Hop' },
      { icon: Zap, text: 'Improved mobile experience' },
    ],
  },
  {
    version: 'v2.3.5',
    date: 'December 15, 2024',
    type: 'improvement',
    items: [
      { icon: Bug, text: 'Fixed credit calculation bug' },
      { icon: Zap, text: 'Optimized database queries' },
    ],
  },
  {
    version: 'v2.3.0',
    date: 'December 10, 2024',
    type: 'feature',
    items: [
      { icon: Sparkles, text: 'Added dark mode support' },
      { icon: Sparkles, text: 'New track library with advanced filters' },
      { icon: Shield, text: 'Two-factor authentication' },
    ],
  },
];

export default function ChangelogPage() {
  return (
    <>
      <style jsx global>{`
        body {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
          min-height: 100vh;
        }
      `}</style>

      <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', minHeight: '100vh' }}>
        <PublicHeader />

        <main style={{ maxWidth: '80rem', margin: '0 auto', padding: '2rem 1.5rem' }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: '1.5rem',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
            padding: '3rem'
          }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem', color: '#111827', textAlign: 'center' }}>
              Changelog
            </h1>
            <p style={{ fontSize: '1.25rem', color: '#6b7280', textAlign: 'center', marginBottom: '3rem' }}>
              Latest updates and improvements to AI Music Studio
            </p>

          <div className="space-y-8">
            {updates.map((update, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200"
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold">{update.version}</h2>
                    <p className="text-gray-500">{update.date}</p>
                  </div>
                  <span className={`px-4 py-2 rounded-full font-semibold text-sm ${
                    update.type === 'feature' 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'bg-green-100 text-green-600'
                  }`}>
                    {update.type === 'feature' ? '✨ New Features' : '⚡ Improvements'}
                  </span>
                </div>
                <ul className="space-y-3">
                  {update.items.map((item, itemIndex) => {
                    const Icon = item.icon;
                    return (
                      <li key={itemIndex} className="flex items-start gap-3">
                        <Icon className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{item.text}</span>
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            ))}
          </div>
          </div>
        </main>
      </div>
    </>
  );
}
