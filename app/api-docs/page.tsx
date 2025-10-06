'use client';

import { motion } from 'framer-motion';
import { Code, Key, Zap, Shield } from 'lucide-react';
import PublicHeader from '@/components/PublicHeader';

export default function APIDocsPage() {
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
              API Documentation
            </h1>
            <p style={{ fontSize: '1.25rem', color: '#6b7280', textAlign: 'center', marginBottom: '3rem' }}>
              Integrate AI music generation into your applications
            </p>

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
        </main>
      </div>
    </>
  );
}
