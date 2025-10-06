'use client';

import { motion } from 'framer-motion';
import { Music2, Apple, Smartphone, Star, Download } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';

export default function MobileAppPage() {
  useEffect(() => {
    // Detect device and redirect after 3 seconds
    const timer = setTimeout(() => {
      const userAgent = navigator.userAgent || navigator.vendor;
      if (/iPad|iPhone|iPod/.test(userAgent)) {
        window.location.href = 'https://apps.apple.com/app/ai-music-studio';
      } else if (/android/i.test(userAgent)) {
        window.location.href = 'https://play.google.com/store/apps/details?id=com.aimusicstudio';
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 via-purple-600 to-pink-600 text-white">
      <header className="border-b border-white/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-white">
            <Music2 className="w-8 h-8" />
            <span className="text-xl font-bold">AI Music Studio</span>
          </Link>
          <Link href="/" className="text-white hover:text-blue-100 font-medium">
            ← Back to Home
          </Link>
        </div>
      </header>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Smartphone className="w-20 h-20 mx-auto mb-6" />
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Create Music On The Go
            </h1>
            <p className="text-xl text-blue-100 mb-12">
              Download AI Music Studio for iOS and Android
            </p>

            {/* App Store Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <motion.a
                href="https://apps.apple.com/app/ai-music-studio"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold hover:shadow-2xl transition-all"
              >
                <Apple className="w-8 h-8" />
                <div className="text-left">
                  <div className="text-xs">Download on the</div>
                  <div className="text-lg font-bold">App Store</div>
                </div>
              </motion.a>

              <motion.a
                href="https://play.google.com/store/apps/details?id=com.aimusicstudio"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold hover:shadow-2xl transition-all"
              >
                <Smartphone className="w-8 h-8" />
                <div className="text-left">
                  <div className="text-xs">Get it on</div>
                  <div className="text-lg font-bold">Google Play</div>
                </div>
              </motion.a>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-6 text-left">
              {[
                { icon: Star, title: 'Generate Anywhere', desc: 'Create music on your phone or tablet' },
                { icon: Download, title: 'Offline Mode', desc: 'Download and listen offline' },
                { icon: Music2, title: 'Full Features', desc: 'All web features on mobile' },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-white/10 backdrop-blur-md rounded-xl p-6"
                >
                  <feature.icon className="w-8 h-8 mb-3" />
                  <h3 className="font-bold mb-2">{feature.title}</h3>
                  <p className="text-blue-100 text-sm">{feature.desc}</p>
                </motion.div>
              ))}
            </div>

            <p className="text-sm text-blue-100 mt-12">
              Redirecting to your device's app store in 3 seconds...
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
