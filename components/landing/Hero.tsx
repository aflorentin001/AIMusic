'use client';

import { motion } from 'framer-motion';
import { Sparkles, Play } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section 
      className="relative flex items-center justify-center overflow-hidden" 
      style={{ minHeight: '100vh', paddingTop: '10vh', paddingBottom: '1rem', background: 'linear-gradient(to bottom, #ffffff, #82cde0)' }}
      aria-label="Hero section"
    >
      {/* Content */}
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-16 flex items-center justify-center">
        <div className="w-full max-w-5xl text-center flex flex-col items-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 rounded-full bg-white/90 backdrop-blur-sm border-2 border-blue-500/30 font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            style={{ marginBottom: '4rem', paddingLeft: '2rem', paddingRight: '2rem', paddingTop: '1rem', paddingBottom: '1rem' }}
          >
            <Sparkles className="w-5 h-5 text-blue-600 animate-pulse flex-shrink-0" />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold whitespace-nowrap" style={{ fontSize: '1.125rem', lineHeight: '1.75rem' }}>
              Join 50,000+ creators • 2M+ songs generated
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-bold text-gray-900 leading-[1.1] tracking-tight text-center w-full"
            style={{ 
              fontSize: 'clamp(2.25rem, 6vw, 4rem)',
              marginBottom: '2rem'
            }}
          >
            Create Professional Music
            <br />
            with <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">AI</span> in Seconds
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-600 max-w-3xl mx-auto leading-relaxed px-4 text-center w-full"
            style={{ 
              fontSize: 'clamp(0.9375rem, 1.5vw, 1rem)',
              marginBottom: '2.5rem'
            }}
          >
            Transform your ideas into studio-quality music instantly. No musical experience required. Perfect for content creators, podcasters, marketers, and musicians who need professional soundtracks fast.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full"
            style={{ marginBottom: '4rem' }}
          >
            <Link 
              href="/signup"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-200 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300" 
              style={{ minWidth: '240px', paddingLeft: '2rem', paddingRight: '2rem', paddingTop: '1rem', paddingBottom: '1rem', fontSize: '1.125rem' }}
              aria-label="Start creating music with AI"
            >
              <Sparkles className="w-5 h-5" aria-hidden="true" />
              Start Creating Music
            </Link>
            <button 
              className="inline-flex items-center justify-center gap-2 bg-white text-gray-700 font-semibold rounded-lg border-2 border-gray-300 hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-gray-300" 
              style={{ minWidth: '240px', paddingLeft: '2rem', paddingRight: '2rem', paddingTop: '1rem', paddingBottom: '1rem', fontSize: '1.125rem' }}
              aria-label="Watch demo video"
            >
              <Play className="w-5 h-5" aria-hidden="true" />
              Watch Demo
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap justify-center items-start text-center w-full"
            style={{ gap: 'clamp(2.5rem, 6vw, 4rem)', marginBottom: '1.5rem' }}
          >
            <div className="flex flex-col" style={{ gap: '0.5rem' }}>
              <span className="font-bold text-blue-600" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}>60s</span>
              <span className="text-xs text-gray-500 font-normal">Average generation time</span>
            </div>
            <div className="flex flex-col" style={{ gap: '0.5rem' }}>
              <span className="font-bold text-purple-600" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}>50K+</span>
              <span className="text-xs text-gray-500 font-normal">Active creators</span>
            </div>
            <div className="flex flex-col" style={{ gap: '0.5rem' }}>
              <span className="font-bold text-blue-600" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}>2M+</span>
              <span className="text-xs text-gray-500 font-normal">Songs generated</span>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center p-1">
                <motion.div
                  className="w-1 h-2 bg-gray-400 rounded-full"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
