'use client';

import { motion } from 'framer-motion';
import { Music2, Users, Award, Target, Heart, Zap } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
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

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            About AI Music Studio
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 leading-relaxed"
          >
            We're on a mission to democratize music creation through AI, making professional-quality music accessible to everyone.
          </motion.p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <Target className="w-12 h-12 text-blue-600 mb-4" />
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              To empower creators worldwide with AI-powered music generation tools that are intuitive, affordable, and produce professional-quality results. We believe everyone should have access to great music for their projects.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <Zap className="w-12 h-12 text-purple-600 mb-4" />
            <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              To become the world's leading AI music platform, fostering a global community of creators who push the boundaries of what's possible with AI-generated music.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-5xl font-bold mb-2">50K+</div>
              <div className="text-blue-100">Active Creators</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">2M+</div>
              <div className="text-blue-100">Songs Generated</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">150+</div>
              <div className="text-blue-100">Countries</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">99.9%</div>
              <div className="text-blue-100">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Heart, title: 'Creator-First', description: 'We build for creators, listening to their needs and feedback.' },
              { icon: Award, title: 'Quality', description: 'We never compromise on the quality of our AI-generated music.' },
              { icon: Users, title: 'Community', description: 'We foster a supportive community of creators helping each other.' },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow"
              >
                <value.icon className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Our Team</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            A diverse team of AI researchers, musicians, and engineers passionate about making music creation accessible to all.
          </p>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { name: 'Sarah Chen', role: 'CEO & Co-Founder', initial: 'SC' },
              { name: 'Marcus Rodriguez', role: 'CTO & Co-Founder', initial: 'MR' },
              { name: 'Emily Watson', role: 'Head of AI Research', initial: 'EW' },
              { name: 'James Park', role: 'Head of Product', initial: 'JP' },
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-3xl font-bold">
                  {member.initial}
                </div>
                <h3 className="font-bold text-lg">{member.name}</h3>
                <p className="text-gray-600 text-sm">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Join Our Journey</h2>
          <p className="text-xl text-gray-600 mb-8">
            Be part of the AI music revolution. Start creating today.
          </p>
          <Link href="/signup">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all">
              Get Started Free
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
