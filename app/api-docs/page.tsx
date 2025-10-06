'use client';

import { motion } from 'framer-motion';
import { Music2, Code, Key, Zap, Shield } from 'lucide-react';
import Link from 'next/link';

export default function APIDocsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-purple-50">
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

      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold mb-6 text-center"
          >
            API Documentation
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 text-center mb-12"
          >
            Integrate AI music generation into your applications
          </motion.p>

          {/* Quick Start */}
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Zap className="w-6 h-6 text-blue-600" />
              Quick Start
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">1. Get Your API Key</h3>
                <p className="text-gray-600 mb-2">Generate an API key from your dashboard:</p>
                <code className="block bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
                  Profile → Settings → API Keys → Generate New Key
                </code>
              </div>
              <div>
                <h3 className="font-semibold mb-2">2. Make Your First Request</h3>
                <code className="block bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`curl -X POST https://api.aimusicstudio.com/v1/generate \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "prompt": "upbeat electronic dance music",
    "duration": 120,
    "genre": "electronic"
  }'`}
                </code>
              </div>
            </div>
          </div>

          {/* Endpoints */}
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
            <h2 className="text-2xl font-bold mb-6">API Endpoints</h2>
            <div className="space-y-6">
              {[
                {
                  method: 'POST',
                  endpoint: '/v1/generate',
                  description: 'Generate a new music track',
                },
                {
                  method: 'GET',
                  endpoint: '/v1/tracks/{id}',
                  description: 'Get track details and status',
                },
                {
                  method: 'GET',
                  endpoint: '/v1/tracks',
                  description: 'List all your tracks',
                },
                {
                  method: 'GET',
                  endpoint: '/v1/credits',
                  description: 'Check your credit balance',
                },
              ].map((endpoint, index) => (
                <div key={index} className="border-l-4 border-blue-600 pl-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-600 font-mono text-sm font-bold rounded">
                      {endpoint.method}
                    </span>
                    <code className="text-gray-700 font-mono">{endpoint.endpoint}</code>
                  </div>
                  <p className="text-gray-600">{endpoint.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Authentication */}
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Key className="w-6 h-6 text-blue-600" />
              Authentication
            </h2>
            <p className="text-gray-600 mb-4">
              All API requests require authentication using your API key in the Authorization header:
            </p>
            <code className="block bg-gray-900 text-gray-100 p-4 rounded-lg">
              Authorization: Bearer YOUR_API_KEY
            </code>
          </div>

          {/* Rate Limits */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Shield className="w-6 h-6 text-blue-600" />
              Rate Limits
            </h2>
            <div className="space-y-2 text-gray-600">
              <p>• <strong>Free Plan:</strong> 5 requests/month</p>
              <p>• <strong>Creator Plan:</strong> 100 requests/month</p>
              <p>• <strong>Pro Plan:</strong> Unlimited requests</p>
              <p>• <strong>Team Plan:</strong> Unlimited requests + higher rate limits</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
