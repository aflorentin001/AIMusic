'use client';

import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import Button from '@/components/ui/Button';

const pricingTiers = [
  {
    name: 'Free',
    price: 0,
    interval: 'forever',
    description: 'Perfect for trying out our platform',
    features: [
      '10 tracks per month',
      'Standard quality audio',
      'Basic music styles',
      'MP3 downloads',
      'Community support',
    ],
    cta: 'Get Started Free',
    popular: false,
  },
  {
    name: 'Creator',
    price: 9.99,
    interval: 'month',
    description: 'For content creators and hobbyists',
    features: [
      '100 tracks per month',
      'Professional quality audio',
      'All music styles & genres',
      'MP3, WAV, FLAC downloads',
      'Commercial licensing',
      'Priority support',
      'Custom lyrics & prompts',
      'Advanced AI models',
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Team',
    price: 29.99,
    interval: 'month',
    description: 'For agencies and businesses',
    features: [
      'Unlimited tracks',
      'Studio-grade quality',
      'All music styles & genres',
      'All download formats',
      'Full commercial licensing',
      'Dedicated support',
      'Team collaboration',
      'API access',
      'Custom branding',
      'Priority processing',
    ],
    cta: 'Start Free Trial',
    popular: false,
  },
];

export default function Pricing() {
  return (
    <section className="flex items-center justify-center" style={{ paddingTop: '6rem', paddingBottom: '6rem', background: 'linear-gradient(to bottom, #aec8d8, #cac9d0)' }}>
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
            Simple, Transparent Pricing
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-center" style={{ fontSize: 'clamp(0.9375rem, 1.5vw, 1rem)' }}>
            Choose the perfect plan for your needs. Upgrade, downgrade, or cancel anytime.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 w-full" style={{ gap: '2rem' }}>
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="relative"
            >
              {/* Popular Badge */}
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1 shadow-lg">
                    <Sparkles className="w-4 h-4" />
                    Most Popular
                  </div>
                </div>
              )}

              <div
                className={`bg-white rounded-xl p-8 h-full flex flex-col ${
                  tier.popular
                    ? 'border-2 border-blue-600 shadow-lg'
                    : 'border border-gray-200 shadow-sm'
                } transition-all duration-300 hover:shadow-lg`}
              >
                {/* Header */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                  <p className="text-gray-600 text-sm">{tier.description}</p>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-bold text-gray-900">${tier.price}</span>
                    <span className="text-gray-600">/{tier.interval}</span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8 flex-grow">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center mt-0.5">
                        <Check className="w-3 h-3 text-primary-600" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  variant={tier.popular ? 'primary' : 'outline'}
                  size="lg"
                  className="w-full"
                >
                  {tier.cta}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-gray-600 text-sm"
          style={{ marginTop: '3rem' }}
        >
          All plans include a 14-day free trial. No credit card required.
        </motion.p>
      </div>
    </section>
  );
}
