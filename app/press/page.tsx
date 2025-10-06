'use client';

import { motion } from 'framer-motion';
import { Music2, Award, Download, Mail } from 'lucide-react';
import Link from 'next/link';

const accolades = [
  { title: 'Best AI Music Tool 2024', organization: 'TechCrunch', year: '2024' },
  { title: 'Innovation Award', organization: 'SXSW', year: '2024' },
  { title: 'Top 10 AI Startups', organization: 'Forbes', year: '2024' },
  { title: 'Product of the Year', organization: 'Product Hunt', year: '2024' },
  { title: 'Best Music Technology', organization: 'NAMM', year: '2024' },
  { title: 'Editors Choice Award', organization: 'The Verge', year: '2024' },
];

export default function PressPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-purple-50">
      {/* Header */}
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

      {/* Hero */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            Press Kit
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600"
          >
            Media resources, company information, and brand assets
          </motion.p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold mb-6">Company Overview</h2>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              <strong className="text-gray-900">AI Music Studio</strong> is a leading AI-powered music generation platform that enables creators worldwide to produce professional-quality music in seconds. Founded in 2023, we've helped over 50,000 creators generate more than 2 million songs.
            </p>
            <p>
              Our mission is to democratize music creation, making it accessible to content creators, podcasters, marketers, and musicians regardless of their musical background or technical expertise.
            </p>
            <p>
              <strong className="text-gray-900">Founded:</strong> 2023<br />
              <strong className="text-gray-900">Headquarters:</strong> San Francisco, CA<br />
              <strong className="text-gray-900">Team Size:</strong> 45 employees<br />
              <strong className="text-gray-900">Funding:</strong> $15M Series A
            </p>
          </div>
        </div>
      </section>

      {/* Accolades */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Awards & Recognition</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {accolades.map((accolade, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-md text-center"
              >
                <Award className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">{accolade.title}</h3>
                <p className="text-gray-600">{accolade.organization}</p>
                <p className="text-sm text-gray-500 mt-1">{accolade.year}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Press Coverage */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Featured In</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-60">
            {['TechCrunch', 'Forbes', 'The Verge', 'Wired', 'Fast Company', 'Billboard', 'Pitchfork', 'Rolling Stone'].map((outlet, index) => (
              <div key={index} className="text-2xl font-bold text-gray-400">
                {outlet}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Assets */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Brand Assets</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="font-bold text-lg mb-4">Logo Package</h3>
              <p className="text-gray-600 mb-4">High-resolution logos in various formats (PNG, SVG, EPS)</p>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Download className="w-4 h-4" />
                Download Logos
              </button>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="font-bold text-lg mb-4">Brand Guidelines</h3>
              <p className="text-gray-600 mb-4">Complete brand style guide with colors, typography, and usage rules</p>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Download className="w-4 h-4" />
                Download Guidelines
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Media Inquiries</h2>
          <p className="text-xl mb-8 text-blue-100">
            For press inquiries, interviews, or media requests, please contact our PR team
          </p>
          <a
            href="mailto:press@aimusicstudio.com"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:shadow-xl transition-all"
          >
            <Mail className="w-5 h-5" />
            press@aimusicstudio.com
          </a>
        </div>
      </section>
    </div>
  );
}
