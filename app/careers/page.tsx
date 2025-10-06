'use client';

import { motion } from 'framer-motion';
import { Music2, MapPin, DollarSign, Clock, Briefcase } from 'lucide-react';
import Link from 'next/link';

const jobOpenings = [
  {
    title: 'Senior AI/ML Engineer',
    department: 'Engineering',
    location: 'San Francisco, CA / Remote',
    type: 'Full-time',
    salary: '$180,000 - $250,000',
    description: 'Lead the development of our next-generation AI music models. Work with cutting-edge deep learning techniques.',
  },
  {
    title: 'Full Stack Engineer',
    department: 'Engineering',
    location: 'San Francisco, CA / Remote',
    type: 'Full-time',
    salary: '$150,000 - $200,000',
    description: 'Build and scale our web platform using Next.js, TypeScript, and modern cloud infrastructure.',
  },
  {
    title: 'Frontend Engineer (React/Next.js)',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    salary: '$140,000 - $180,000',
    description: 'Create beautiful, performant user interfaces for our music generation platform.',
  },
  {
    title: 'Backend Engineer (Node.js/Python)',
    department: 'Engineering',
    location: 'San Francisco, CA / Remote',
    type: 'Full-time',
    salary: '$150,000 - $190,000',
    description: 'Design and implement scalable APIs and microservices for our music generation pipeline.',
  },
  {
    title: 'DevOps Engineer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    salary: '$145,000 - $185,000',
    description: 'Build and maintain our cloud infrastructure, CI/CD pipelines, and monitoring systems.',
  },
  {
    title: 'Data Scientist',
    department: 'Data & AI',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$160,000 - $210,000',
    description: 'Analyze user behavior and music generation patterns to improve our AI models.',
  },
  {
    title: 'Machine Learning Research Scientist',
    department: 'Research',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$200,000 - $280,000',
    description: 'Conduct cutting-edge research in AI music generation and audio synthesis.',
  },
  {
    title: 'Audio Engineer',
    department: 'Product',
    location: 'Los Angeles, CA / Remote',
    type: 'Full-time',
    salary: '$120,000 - $160,000',
    description: 'Ensure our AI-generated music meets professional audio quality standards.',
  },
  {
    title: 'Product Manager - AI Features',
    department: 'Product',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$170,000 - $220,000',
    description: 'Define and execute product strategy for our AI music generation features.',
  },
  {
    title: 'Product Designer (UI/UX)',
    department: 'Design',
    location: 'Remote',
    type: 'Full-time',
    salary: '$130,000 - $170,000',
    description: 'Design intuitive, beautiful interfaces that make music creation accessible to everyone.',
  },
  {
    title: 'QA Engineer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    salary: '$110,000 - $145,000',
    description: 'Ensure quality across our platform through automated testing and manual QA.',
  },
  {
    title: 'Security Engineer',
    department: 'Security',
    location: 'San Francisco, CA / Remote',
    type: 'Full-time',
    salary: '$165,000 - $215,000',
    description: 'Protect our platform and user data with world-class security practices.',
  },
  {
    title: 'Technical Writer',
    department: 'Documentation',
    location: 'Remote',
    type: 'Full-time',
    salary: '$95,000 - $130,000',
    description: 'Create comprehensive documentation, tutorials, and API guides for our platform.',
  },
  {
    title: 'Customer Success Engineer',
    department: 'Support',
    location: 'Remote',
    type: 'Full-time',
    salary: '$85,000 - $120,000',
    description: 'Help our enterprise customers succeed with technical support and onboarding.',
  },
  {
    title: 'Mobile Engineer (iOS/Android)',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    salary: '$145,000 - $185,000',
    description: 'Build our mobile apps for iOS and Android using React Native or native technologies.',
  },
];

export default function CareersPage() {
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
            Join Our Team
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 mb-8"
          >
            Help us revolutionize music creation with AI. We're hiring talented people across engineering, product, and design.
          </motion.p>
          <div className="flex justify-center gap-8 text-lg">
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-blue-600" />
              <span className="font-semibold">{jobOpenings.length} Open Positions</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              <span className="font-semibold">Remote-Friendly</span>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Join Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: '💰 Competitive Salary', description: 'Top-of-market compensation with equity options' },
              { title: '🏥 Health Benefits', description: 'Comprehensive medical, dental, and vision coverage' },
              { title: '🌴 Unlimited PTO', description: 'Take time off when you need it' },
              { title: '💻 Remote Work', description: 'Work from anywhere in the world' },
              { title: '📚 Learning Budget', description: '$2,000/year for courses and conferences' },
              { title: '🎵 Free Premium', description: 'Unlimited access to AI Music Studio Pro' },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Open Positions</h2>
          <div className="space-y-4">
            {jobOpenings.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all border border-gray-200 hover:border-blue-300"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        {job.department}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {job.type}
                      </span>
                      <span className="flex items-center gap-1 font-semibold text-green-600">
                        <DollarSign className="w-4 h-4" />
                        {job.salary}
                      </span>
                    </div>
                    <p className="text-gray-600 mt-3">{job.description}</p>
                  </div>
                  <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap">
                    Apply Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Don't See Your Role?</h2>
          <p className="text-xl mb-8 text-blue-100">
            We're always looking for talented people. Send us your resume at careers@aimusicstudio.com
          </p>
          <a 
            href="mailto:careers@aimusicstudio.com"
            className="inline-block px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:shadow-xl transition-all"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  );
}
