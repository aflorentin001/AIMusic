'use client';

import { motion } from 'framer-motion';
import { Music2, Sparkles, Bug, Zap, Shield } from 'lucide-react';
import Link from 'next/link';

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
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-purple-50">
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Music2 className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold">AI Music Studio</span>
          </Link>
          <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium">
            ← Back to Home
          </Link>
        </div>
      </header>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold mb-6 text-center"
          >
            Changelog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 text-center mb-16"
          >
            Latest updates and improvements to AI Music Studio
          </motion.p>

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
      </section>
    </div>
  );
}
