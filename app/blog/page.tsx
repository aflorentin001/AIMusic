'use client';

import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';
import PublicHeader from '@/components/PublicHeader';

const blogPosts = [
  {
    title: 'The Future of AI-Generated Music: Trends for 2025',
    excerpt: 'Explore the latest developments in AI music technology and what they mean for creators.',
    author: 'Sarah Chen',
    date: 'January 3, 2025',
    category: 'AI Technology',
    readTime: '5 min read',
    image: '🎵',
  },
  {
    title: '10 Tips for Creating Better AI Music',
    excerpt: 'Learn how to write effective prompts and get the best results from AI music generation.',
    author: 'Marcus Rodriguez',
    date: 'December 28, 2024',
    category: 'Tutorials',
    readTime: '7 min read',
    image: '✨',
  },
  {
    title: 'How AI Music Studio Helped 1000+ Podcasters',
    excerpt: 'Real stories from podcasters who transformed their shows with custom AI music.',
    author: 'Emily Watson',
    date: 'December 20, 2024',
    category: 'Case Studies',
    readTime: '6 min read',
    image: '🎙️',
  },
  {
    title: 'Understanding Music Licensing for AI-Generated Content',
    excerpt: 'Everything you need to know about using AI-generated music commercially.',
    author: 'James Park',
    date: 'December 15, 2024',
    category: 'Legal',
    readTime: '8 min read',
    image: '⚖️',
  },
  {
    title: 'Behind the Scenes: How Our AI Creates Music',
    excerpt: 'A technical deep-dive into the machine learning models powering AI Music Studio.',
    author: 'Sarah Chen',
    date: 'December 10, 2024',
    category: 'Technology',
    readTime: '10 min read',
    image: '🔬',
  },
  {
    title: 'From Idea to Track: A Complete Workflow Guide',
    excerpt: 'Step-by-step guide to creating professional music with AI Music Studio.',
    author: 'Marcus Rodriguez',
    date: 'December 5, 2024',
    category: 'Tutorials',
    readTime: '12 min read',
    image: '📝',
  },
];

export default function BlogPage() {
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
              AI Music Studio Blog
            </h1>
            <p style={{ fontSize: '1.25rem', color: '#6b7280', textAlign: 'center', marginBottom: '3rem' }}>
              Insights, tutorials, and stories from the world of AI music generation
            </p>

            {/* Blog Posts Grid */}
            <div style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {blogPosts.map((post, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-gray-200 hover:border-blue-300 group cursor-pointer"
              >
                {/* Image Placeholder */}
                <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-6xl">
                  {post.image}
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-blue-100 text-blue-600 text-xs font-semibold rounded-full">
                      {post.category}
                    </span>
                    <span className="text-sm text-gray-500">{post.readTime}</span>
                  </div>

                  <h2 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h2>

                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                  </div>

                  <button className="mt-4 flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all">
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
