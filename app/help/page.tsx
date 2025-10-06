'use client';

import { motion } from 'framer-motion';
import { ChevronDown, Search, HelpCircle, Mail } from 'lucide-react';
import PublicHeader from '@/components/PublicHeader';
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
        a: 'Go to Profile > Settings > Billing and click "Cancel Subscription". You will retain access until the end of your billing period.',
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
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <HelpCircle style={{ width: '4rem', height: '4rem', color: '#3b82f6', margin: '0 auto 1rem' }} />
              <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem', color: '#111827' }}>Help Center</h1>
              <p style={{ fontSize: '1.25rem', color: '#6b7280', marginBottom: '2rem' }}>
                Find answers to common questions about AI Music Studio
              </p>

              {/* Search Bar */}
              <div style={{ position: 'relative', maxWidth: '600px', margin: '0 auto' }}>
                <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', width: '1.25rem', height: '1.25rem', color: '#9ca3af' }} />
                <input
                  type="text"
                  placeholder="Search for help..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    paddingLeft: '3rem',
                    paddingRight: '1rem',
                    paddingTop: '1rem',
                    paddingBottom: '1rem',
                    borderRadius: '0.75rem',
                    border: '2px solid #e5e7eb',
                    fontSize: '1rem',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            {/* FAQs */}
            <div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
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
            </div>

            {/* Contact Support */}
            <div style={{ textAlign: 'center', marginTop: '3rem', padding: '2rem', background: 'linear-gradient(135deg, #3b82f6, #9333ea)', borderRadius: '1rem', color: 'white' }}>
              <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' }}>Still Need Help?</h2>
              <p style={{ fontSize: '1.125rem', marginBottom: '2rem', color: 'rgba(255,255,255,0.9)' }}>
                Our support team is here to help you succeed
              </p>
              <a
                href="mailto:support@aimusicstudio.com"
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
                Contact Support
              </a>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
