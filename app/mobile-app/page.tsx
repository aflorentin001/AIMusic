'use client';

import { motion } from 'framer-motion';
import { Apple, Smartphone, Star, Download, Music2 } from 'lucide-react';
import PublicHeader from '@/components/PublicHeader';
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
            padding: '3rem',
            textAlign: 'center'
          }}>
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
        </main>
      </div>
    </>
  );
}
