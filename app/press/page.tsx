'use client';

import { motion } from 'framer-motion';
import { Award, Download, Mail } from 'lucide-react';
import PublicHeader from '@/components/PublicHeader';

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
              Press Kit
            </h1>
            <p style={{ fontSize: '1.25rem', color: '#6b7280', textAlign: 'center', marginBottom: '3rem' }}>
              Media resources, company information, and brand assets
            </p>

            {/* Company Overview */}
            <div style={{ marginBottom: '3rem' }}>
              <div style={{ background: '#f9fafb', borderRadius: '1rem', padding: '2rem' }}>
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
            </div>

            {/* Accolades */}
            <div style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '2rem', fontWeight: 700, textAlign: 'center', marginBottom: '2rem' }}>Awards & Recognition</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
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

            {/* Press Coverage */}
            <div style={{ marginBottom: '3rem', padding: '2rem', background: '#f9fafb', borderRadius: '1rem' }}>
              <h2 style={{ fontSize: '2rem', fontWeight: 700, textAlign: 'center', marginBottom: '2rem' }}>Featured In</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '2rem', textAlign: 'center', opacity: 0.6 }}>
            {['TechCrunch', 'Forbes', 'The Verge', 'Wired', 'Fast Company', 'Billboard', 'Pitchfork', 'Rolling Stone'].map((outlet, index) => (
              <div key={index} className="text-2xl font-bold text-gray-400">
                {outlet}
              </div>
            ))}
              </div>
            </div>

            {/* Brand Assets */}
            <div style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '2rem', fontWeight: 700, textAlign: 'center', marginBottom: '2rem' }}>Brand Assets</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
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

            {/* Contact */}
            <div style={{ textAlign: 'center', marginTop: '3rem', padding: '2rem', background: 'linear-gradient(135deg, #3b82f6, #9333ea)', borderRadius: '1rem', color: 'white' }}>
              <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' }}>Media Inquiries</h2>
              <p style={{ fontSize: '1.125rem', marginBottom: '2rem', color: 'rgba(255,255,255,0.9)' }}>
                For press inquiries, interviews, or media requests, please contact our PR team
              </p>
              <a
                href="mailto:press@aimusicstudio.com"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '1rem 2rem',
                  background: 'white',
                  color: '#3b82f6',
                  fontWeight: 600,
                  borderRadius: '0.75rem',
                  textDecoration: 'none',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}
              >
                <Mail style={{ width: '1.25rem', height: '1.25rem' }} />
                press@aimusicstudio.com
              </a>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
