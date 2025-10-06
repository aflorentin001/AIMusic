'use client';

import { motion } from 'framer-motion';
import { Music2, ChevronDown, Search, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const faqs = [
  {
    category: 'Getting Started',
    questions: [
      {
        q: 'How do I create my first song?',
        a: 'Simply sign up for a free account, go to the Generate page, describe the music you want, select a genre, and click Generate. Your AI-generated track will be ready in about 60 seconds!',
      },
      {
        q: 'Do I need musical experience?',
        a: 'Not at all! AI Music Studio is designed for everyone, from complete beginners to professional musicians. Just describe what you want in plain English.',
      },
      {
        q: 'What genres can I create?',
        a: 'We support 10+ genres including Pop, Rock, Jazz, Classical, Electronic, Hip Hop, Country, Folk, Ambient, and Cinematic.',
      },
    ],
  },
  {
    category: 'Credits & Pricing',
    questions: [
      {
        q: 'How do credits work?',
        a: 'Each song generation costs credits. Free accounts get 5 tracks per month. Creator plans include 100 tracks/month, and Pro plans offer unlimited generations.',
      },
      {
        q: 'Can I upgrade or downgrade my plan?',
        a: 'Yes! You can change your plan at any time from your Profile settings. Changes take effect immediately.',
      },
      {
        q: 'Do unused credits roll over?',
        a: 'Credits reset monthly on your billing date. We recommend using them before they expire!',
      },
    ],
  },
  {
    category: 'Music Rights & Licensing',
    questions: [
      {
        q: 'Can I use the music commercially?',
        a: 'Yes! All paid plans include full commercial licensing. You own the rights to your generated music and can use it in any project, including YouTube, podcasts, ads, and films.',
      },
      {
        q: 'Do I need to credit AI Music Studio?',
        a: 'No attribution required! The music is yours to use however you like.',
      },
      {
        q: 'Can I sell the music I create?',
        a: 'Absolutely! You can sell, license, or distribute your AI-generated music however you choose.',
      },
    ],
  },
  {
    category: 'Technical Questions',
    questions: [
      {
        q: 'What audio formats are supported?',
        a: 'We provide MP3 format for all plans. Pro and Team plans also include WAV and FLAC formats for studio-quality audio.',
      },
      {
        q: 'How long does generation take?',
        a: 'Most tracks are generated in 30-90 seconds. Complex orchestral pieces may take up to 2 minutes.',
      },
      {
        q: 'Can I edit the generated music?',
        a: 'Yes! Download your tracks and edit them in any audio software like Audacity, Logic Pro, or Ableton Live.',
      },
    ],
  },
  {
    category: 'Account & Billing',
    questions: [
      {
        q: 'How do I cancel my subscription?',
        a: 'Go to Profile > Settings > Billing and click "Cancel Subscription". You\'ll retain access until the end of your billing period.',
      },
      {
        q: 'What payment methods do you accept?',
        a: 'We accept all major credit cards (Visa, Mastercard, Amex), PayPal, and Apple Pay.',
      },
      {
        q: 'Is there a free trial?',
        a: 'Yes! All paid plans come with a 14-day free trial. No credit card required to start.',
      },
    ],
  },
];

export default function HelpPage() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleFAQ = (categoryIndex: number, questionIndex: number) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setOpenIndex(openIndex === key ? null : key);
  };

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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <HelpCircle className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Help Center</h1>
            <p className="text-xl text-gray-600">
              Find answers to common questions about AI Music Studio
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative max-w-2xl mx-auto"
          >
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-lg"
            />
          </motion.div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-12 px-6 pb-20">
        <div className="max-w-4xl mx-auto space-y-8">
          {faqs.map((category, catIndex) => (
            <motion.div
              key={catIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIndex * 0.1 }}
            >
              <h2 className="text-2xl font-bold mb-6 text-gray-900">{category.category}</h2>
              <div className="space-y-4">
                {category.questions.map((faq, qIndex) => {
                  const key = `${catIndex}-${qIndex}`;
                  const isOpen = openIndex === key;

                  return (
                    <div
                      key={qIndex}
                      className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200"
                    >
                      <button
                        onClick={() => toggleFAQ(catIndex, qIndex)}
                        className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition-colors text-left"
                      >
                        <span className="font-semibold text-gray-900">{faq.q}</span>
                        <ChevronDown
                          className={`w-5 h-5 text-gray-500 transition-transform ${
                            isOpen ? 'transform rotate-180' : ''
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="px-6 pb-4"
                        >
                          <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                        </motion.div>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-16 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Still Need Help?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Our support team is here to help you succeed
          </p>
          <a
            href="mailto:support@aimusicstudio.com"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:shadow-xl transition-all"
          >
            <Mail className="w-5 h-5" />
            Contact Support
          </a>
        </div>
      </section>
    </div>
  );
}
