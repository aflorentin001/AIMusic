'use client';

import { motion } from 'framer-motion';
import { Music2, CheckCircle, Activity, Server, Database, Zap } from 'lucide-react';
import Link from 'next/link';

const systems = [
  { name: 'API', status: 'operational', uptime: '99.99%' },
  { name: 'Music Generation', status: 'operational', uptime: '99.95%' },
  { name: 'Web Application', status: 'operational', uptime: '100%' },
  { name: 'Database', status: 'operational', uptime: '99.98%' },
  { name: 'Authentication', status: 'operational', uptime: '100%' },
  { name: 'File Storage', status: 'operational', uptime: '99.97%' },
];

const incidents = [
  {
    date: 'December 28, 2024',
    title: 'Scheduled Maintenance',
    description: 'Database optimization completed successfully',
    status: 'resolved',
    duration: '15 minutes',
  },
  {
    date: 'December 15, 2024',
    title: 'API Latency',
    description: 'Increased response times due to high traffic - resolved by scaling infrastructure',
    status: 'resolved',
    duration: '45 minutes',
  },
];

export default function StatusPage() {
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
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full font-semibold mb-6">
              <CheckCircle className="w-5 h-5" />
              All Systems Operational
            </div>
            <h1 className="text-5xl font-bold mb-4">System Status</h1>
            <p className="text-xl text-gray-600">
              Real-time status of AI Music Studio services
            </p>
          </motion.div>

          {/* Systems Status */}
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
            <h2 className="text-2xl font-bold mb-6">Current Status</h2>
            <div className="space-y-4">
              {systems.map((system, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="font-semibold">{system.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500">Uptime: {system.uptime}</span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-full">
                      Operational
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Overall Uptime */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-8">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <Activity className="w-8 h-8 mx-auto mb-2" />
                <div className="text-4xl font-bold mb-1">99.9%</div>
                <div className="text-blue-100">Overall Uptime</div>
              </div>
              <div>
                <Server className="w-8 h-8 mx-auto mb-2" />
                <div className="text-4xl font-bold mb-1">45ms</div>
                <div className="text-blue-100">Avg Response Time</div>
              </div>
              <div>
                <Zap className="w-8 h-8 mx-auto mb-2" />
                <div className="text-4xl font-bold mb-1">2.1M</div>
                <div className="text-blue-100">API Requests/Day</div>
              </div>
            </div>
          </div>

          {/* Recent Incidents */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Recent Incidents</h2>
            {incidents.length > 0 ? (
              <div className="space-y-4">
                {incidents.map((incident, index) => (
                  <div key={index} className="border-l-4 border-gray-300 pl-4 py-2">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm text-gray-500">{incident.date}</span>
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                        {incident.status}
                      </span>
                    </div>
                    <h3 className="font-bold mb-1">{incident.title}</h3>
                    <p className="text-gray-600 text-sm">{incident.description}</p>
                    <p className="text-xs text-gray-500 mt-1">Duration: {incident.duration}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-center py-8">No incidents in the last 90 days 🎉</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
