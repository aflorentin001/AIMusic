'use client';

import { motion } from 'framer-motion';
import { Music2, Twitter, Facebook, Instagram, Linkedin, Youtube, Mail, Check } from 'lucide-react';
import { useState } from 'react';

const footerLinks = {
  product: [
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Demo', href: '#samples' },
    { name: 'API', href: '/api-docs' },
    { name: 'Mobile App', href: '/mobile-app' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/careers' },
    { name: 'Press Kit', href: '/press' },
    { name: 'Contact', href: 'mailto:hello@aimusicstudio.com' },
  ],
  resources: [
    { name: 'Help Center', href: '/help' },
    { name: 'Tutorials', href: '/tutorials' },
    { name: 'Community', href: '/blog' },
    { name: 'System Status', href: '/status' },
    { name: 'Changelog', href: '/changelog' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'GDPR', href: '/gdpr' },
    { name: 'Licensing', href: '/licensing' },
  ],
};

const socialLinks = [
  { icon: Twitter, href: 'https://twitter.com/aimusicstudio', label: 'Twitter' },
  { icon: Facebook, href: 'https://facebook.com/aimusicstudio', label: 'Facebook' },
  { icon: Instagram, href: 'https://instagram.com/aimusicstudio', label: 'Instagram' },
  { icon: Linkedin, href: 'https://linkedin.com/company/aimusicstudio', label: 'LinkedIn' },
  { icon: Youtube, href: 'https://youtube.com/@aimusicstudio', label: 'YouTube' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setIsSubscribed(true);
      setEmail('');
      // Reset after 3 seconds
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <footer style={{ background: '#1f2937', color: 'white' }}>
      {/* Newsletter Section */}
      <div className="border-b border-gray-700 flex items-center justify-center">
        <div className="w-full max-w-4xl mx-auto px-6 md:px-12 lg:px-16" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full text-center flex flex-col items-center"
          >
            <h3 className="font-bold text-white mb-4" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
              Stay Updated with AI Music Studio
            </h3>
            <p className="text-gray-300 mb-8" style={{ fontSize: 'clamp(0.9375rem, 1.5vw, 1rem)' }}>
              Get the latest updates, tips, and exclusive offers delivered to your inbox
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 justify-center w-full max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-grow rounded-lg bg-white border-2 border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                style={{ paddingLeft: '1.25rem', paddingRight: '1.25rem', paddingTop: '0.875rem', paddingBottom: '0.875rem', fontSize: '1rem' }}
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 text-white font-semibold rounded-lg transition-colors whitespace-nowrap shadow-md hover:shadow-lg"
                style={{ 
                  paddingLeft: '1.5rem', 
                  paddingRight: '1.5rem', 
                  paddingTop: '0.875rem', 
                  paddingBottom: '0.875rem', 
                  fontSize: '1rem',
                  background: isSubscribed ? '#10b981' : '#3b82f6',
                }}
              >
                {isSubscribed ? (
                  <>
                    <Check className="w-5 h-5" />
                    Subscribed!
                  </>
                ) : (
                  <>
                    <Mail className="w-5 h-5" />
                    Subscribe
                  </>
                )}
              </motion.button>
            </form>
            {isSubscribed && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-green-600 font-medium mt-4"
              >
                ✅ Thanks for subscribing! Check your inbox for confirmation.
              </motion.p>
            )}
          </motion.div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="w-full flex items-center justify-center" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
        <div className="w-full max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 mb-10 w-full">
            {/* Brand Column */}
            <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <Music2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">AI Music Studio</span>
            </div>
            <p className="text-gray-300 leading-relaxed text-sm" style={{ marginBottom: '2rem' }}>
              Create professional music with AI in seconds. Perfect for content creators, businesses, and musicians.
            </p>
            {/* Social Links */}
            <div className="flex gap-3 items-center">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 text-gray-300"
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
            </div>

          {/* Links Columns */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Product</h4>
            <ul className="space-y-2.5">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-blue-400 transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Company</h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-blue-400 transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Resources</h4>
            <ul className="space-y-2.5">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-blue-400 transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Legal</h4>
            <ul className="space-y-2.5">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-blue-400 transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">© {new Date().getFullYear()} AI Music Studio. All rights reserved.</p>
            <div className="flex gap-6 text-sm">
              <a href="/privacy" className="text-gray-400 hover:text-blue-400 transition-colors">Privacy</a>
              <a href="/terms" className="text-gray-400 hover:text-blue-400 transition-colors">Terms</a>
              <a href="/cookies" className="text-gray-400 hover:text-blue-400 transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
