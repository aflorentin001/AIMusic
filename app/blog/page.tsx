'use client';

import { motion } from 'framer-motion';
import { Music2, Calendar, User, ArrowRight, Tag } from 'lucide-react';
import Link from 'next/link';

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
            AI Music Studio Blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600"
          >
            Insights, tutorials, and stories from the world of AI music generation
          </motion.p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12 px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Never Miss an Update</h2>
          <p className="text-xl mb-8 text-blue-100">
            Subscribe to our newsletter for the latest AI music insights and tips
          </p>
          <div className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow px-4 py-3 rounded-lg text-gray-900"
            />
            <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:shadow-xl transition-all">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
