'use client';

import { motion } from 'framer-motion';
import { Play, BookOpen, Video, FileText, Music2 } from 'lucide-react';
import PublicHeader from '@/components/PublicHeader';

const tutorials = [
  {
    title: 'Getting Started with AI Music Studio',
    description: 'Learn the basics of creating your first AI-generated track',
    duration: '10 min',
    level: 'Beginner',
    icon: Play,
  },
  {
    title: 'Writing Effective Music Prompts',
    description: 'Master the art of describing music to get perfect results',
    duration: '15 min',
    level: 'Beginner',
    icon: FileText,
  },
  {
    title: 'Advanced Genre Techniques',
    description: 'Deep dive into creating specific genres with AI',
    duration: '20 min',
    level: 'Intermediate',
    icon: Music2,
  },
  {
    title: 'Using AI Music in Video Production',
    description: 'Best practices for syncing AI music with video content',
    duration: '18 min',
    level: 'Intermediate',
    icon: Video,
  },
  {
    title: 'Commercial Licensing Guide',
    description: 'Understanding your rights and how to use music commercially',
    duration: '12 min',
    level: 'All Levels',
    icon: BookOpen,
  },
  {
    title: 'API Integration Tutorial',
    description: 'Integrate AI Music Studio into your applications',
    duration: '30 min',
    level: 'Advanced',
    icon: FileText,
  },
];

export default function TutorialsPage() {
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
              Tutorials & Guides
            </h1>
            <p style={{ fontSize: '1.25rem', color: '#6b7280', textAlign: 'center', marginBottom: '3rem' }}>
              Learn how to create amazing music with AI
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {tutorials.map((tutorial, index) => {
              const Icon = tutorial.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all border border-gray-200 hover:border-blue-300 cursor-pointer group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                    {tutorial.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{tutorial.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full font-semibold">
                      {tutorial.level}
                    </span>
                    <span className="text-gray-500">{tutorial.duration}</span>
                  </div>
                </motion.div>
              );
            })}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
