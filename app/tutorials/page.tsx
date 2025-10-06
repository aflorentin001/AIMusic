'use client';

import { motion } from 'framer-motion';
import { Music2, Play, BookOpen, Video, FileText } from 'lucide-react';
import Link from 'next/link';

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
        <div className="max-w-6xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold mb-6 text-center"
          >
            Tutorials & Guides
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 text-center mb-16"
          >
            Learn how to create amazing music with AI
          </motion.p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
      </section>
    </div>
  );
}
