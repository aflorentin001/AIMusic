'use client';

import { motion } from 'framer-motion';
import { Sparkles, Award, FileCheck, Smartphone, Users, Download } from 'lucide-react';

const features = [
  {
    icon: Sparkles,
    title: 'AI-Powered Generation',
    description: 'Advanced AI algorithms create unique, professional-quality music tailored to your specifications. Simply describe what you want, and watch the magic happen.',
  },
  {
    icon: Award,
    title: 'Professional Quality',
    description: 'Studio-grade audio output with crystal-clear sound. Every track is mastered to industry standards, ready for commercial use right out of the box.',
  },
  {
    icon: FileCheck,
    title: 'Commercial Licensing',
    description: 'Full commercial rights included with every track. Use your music in videos, podcasts, games, or any project without worrying about copyright issues.',
  },
  {
    icon: Smartphone,
    title: 'Mobile-First Design',
    description: 'Create music anywhere, anytime. Our responsive platform works seamlessly on desktop, tablet, and mobile devices with an intuitive touch interface.',
  },
  {
    icon: Users,
    title: 'Real-time Collaboration',
    description: 'Work together with your team in real-time. Share projects, leave comments, and iterate on tracks collaboratively from anywhere in the world.',
  },
  {
    icon: Download,
    title: 'Instant Download',
    description: 'Get your tracks immediately in multiple formats (MP3, WAV, FLAC). No waiting, no rendering queues—just instant access to your music.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function Features() {
  return (
    <section className="flex items-center justify-center" style={{ paddingTop: '6rem', paddingBottom: '6rem', background: 'linear-gradient(to bottom, #82cde0, #95c9de)' }}>
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center flex flex-col items-center"
          style={{ marginBottom: '4rem' }}
        >
          <h2 className="font-bold text-gray-900 text-center" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', marginBottom: '1rem' }}>
            Everything You Need to Create Amazing Music
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-center" style={{ fontSize: 'clamp(0.9375rem, 1.5vw, 1rem)' }}>
            Powerful features designed to help you create professional music effortlessly
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full"
          style={{ gap: '2rem' }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <div className="group">
                  <div className="bg-gray-50 rounded-2xl h-full transition-all duration-300 hover:bg-gray-100" style={{ padding: '2.5rem' }}>
                    {/* Icon */}
                    <div className="rounded-xl bg-blue-600 flex items-center justify-center group-hover:scale-105 transition-transform duration-300" style={{ width: '3.5rem', height: '3.5rem', marginBottom: '1.5rem' }}>
                      <Icon className="text-white" style={{ width: '1.75rem', height: '1.75rem' }} />
                    </div>

                    {/* Content */}
                    <h3 className="font-semibold text-gray-900" style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed" style={{ fontSize: '0.9375rem' }}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
