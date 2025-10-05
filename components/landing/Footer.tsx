'use client';

import { motion } from 'framer-motion';
import { Music2, Twitter, Facebook, Instagram, Linkedin, Youtube, Mail } from 'lucide-react';

const footerLinks = {
  product: [
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Demo', href: '#demo' },
    { name: 'API', href: '#' },
  ],
  company: [
    { name: 'About Us', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Press Kit', href: '#' },
  ],
  resources: [
    { name: 'Documentation', href: '#' },
    { name: 'Tutorials', href: '#' },
    { name: 'Community', href: '#' },
    { name: 'Support', href: '#' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Cookie Policy', href: '#' },
    { name: 'Licensing', href: '#' },
  ],
};

const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-200" style={{ background: 'linear-gradient(to bottom, #e8cec7, #ffd5c2, #ffddc0)' }}>
      {/* Newsletter Section */}
      <div className="border-b border-gray-200 flex items-center justify-center">
        <div className="w-full max-w-4xl mx-auto px-6 md:px-12 lg:px-16" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full text-center flex flex-col items-center"
          >
            <h3 className="font-bold text-gray-900 mb-4" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
              Stay Updated with AI Music Studio
            </h3>
            <p className="text-gray-600 mb-8" style={{ fontSize: 'clamp(0.9375rem, 1.5vw, 1rem)' }}>
              Get the latest updates, tips, and exclusive offers delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center w-full max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow rounded-lg bg-white border-2 border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                style={{ paddingLeft: '1.25rem', paddingRight: '1.25rem', paddingTop: '0.875rem', paddingBottom: '0.875rem', fontSize: '1rem' }}
              />
              <button className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap shadow-md hover:shadow-lg"
                style={{ paddingLeft: '1.5rem', paddingRight: '1.5rem', paddingTop: '0.875rem', paddingBottom: '0.875rem', fontSize: '1rem' }}
              >
                <Mail className="w-5 h-5" />
                Subscribe
              </button>
            </div>
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
              <span className="text-xl font-bold text-gray-900">AI Music Studio</span>
            </div>
            <p className="text-gray-600 leading-relaxed text-sm" style={{ marginBottom: '2rem' }}>
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
                    aria-label={social.label}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 text-gray-600"
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="text-gray-900 font-semibold mb-4 text-sm">Product</h4>
            <ul className="space-y-2.5">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-gray-900 font-semibold mb-4 text-sm">Company</h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-gray-900 font-semibold mb-4 text-sm">Resources</h4>
            <ul className="space-y-2.5">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-gray-900 font-semibold mb-4 text-sm">Legal</h4>
            <ul className="space-y-2.5">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 w-full">
            <p className="text-gray-500 text-xs flex items-center">
              © {new Date().getFullYear()} AI Music Studio. All rights reserved.
            </p>
            <div className="flex gap-6 text-xs items-center">
              <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
                Status
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
                Contact
              </a>
              <a href="mailto:support@aimusicstudio.com" className="text-gray-500 hover:text-blue-600 transition-colors">
                support@aimusicstudio.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
