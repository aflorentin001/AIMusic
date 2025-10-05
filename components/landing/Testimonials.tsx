'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Content Creator',
    company: 'YouTube (500K subscribers)',
    content: 'AI Music Studio has completely transformed my content creation workflow. I can now create custom background music for all my videos in minutes instead of hours searching for the right tracks.',
    avatar: '👩‍💼',
    rating: 5,
  },
  {
    name: 'Marcus Chen',
    role: 'Creative Director',
    company: 'Digital Marketing Agency',
    content: 'The quality is outstanding and the licensing is crystal clear. We use it for all our client campaigns now. The team collaboration features make it easy to work with our remote team.',
    avatar: '👨‍💻',
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    role: 'Independent Musician',
    company: 'Singer-Songwriter',
    content: "As a musician, I was skeptical at first, but this tool is incredible for generating ideas and backing tracks. It's like having a full production team at my fingertips 24/7.",
    avatar: '👩‍🎤',
    rating: 5,
  },
  {
    name: 'David Park',
    role: 'Podcast Producer',
    company: 'Top 100 Business Podcast',
    content: 'Creating unique intro and outro music for each episode used to be a nightmare. Now I can generate custom tracks that perfectly match the mood of each episode in seconds.',
    avatar: '🎙️',
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="flex items-center justify-center" style={{ paddingTop: '6rem', paddingBottom: '6rem', background: 'linear-gradient(to bottom, #cac9d0, #e8cec7)' }}>
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
            Loved by Creators Worldwide
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-center" style={{ fontSize: 'clamp(0.9375rem, 1.5vw, 1rem)' }}>
            Join thousands of satisfied creators who are making amazing music with AI
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 w-full" style={{ gap: '2rem' }}>
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
            >
              <div className="bg-gray-50 rounded-2xl h-full flex flex-col transition-all duration-300 hover:bg-gray-100" style={{ padding: '2rem' }}>
                {/* Quote Icon */}
                <div className="mb-4">
                  <Quote className="w-10 h-10 text-primary-300" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-700 leading-relaxed mb-6 flex-grow">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center text-2xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                    <div className="text-xs text-gray-500">{testimonial.company}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
