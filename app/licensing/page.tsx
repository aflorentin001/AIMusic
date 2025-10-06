'use client';

import { Music2, Award, Check, X } from 'lucide-react';
import Link from 'next/link';

export default function LicensingPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b bg-white sticky top-0 z-50">
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

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="flex items-center gap-3 mb-6">
          <Award className="w-10 h-10 text-blue-600" />
          <h1 className="text-4xl font-bold">Music Licensing</h1>
        </div>
        <p className="text-gray-600 mb-8">Last updated: January 5, 2025</p>

        <div className="prose prose-lg max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">License Overview</h2>
            <p className="text-gray-700 leading-relaxed">
              When you generate music with AI Music Studio, you receive specific rights based on your subscription plan. All music is 100% original and created by our AI models.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">License Types by Plan</h2>
            
            <div className="space-y-6">
              <div className="border-2 border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4">Free Plan - Personal Use License</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-green-600">
                    <Check className="w-5 h-5" />
                    <span>Personal projects and portfolios</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-600">
                    <Check className="w-5 h-5" />
                    <span>Social media posts (non-commercial)</span>
                  </div>
                  <div className="flex items-center gap-2 text-red-600">
                    <X className="w-5 h-5" />
                    <span>Commercial use</span>
                  </div>
                  <div className="flex items-center gap-2 text-red-600">
                    <X className="w-5 h-5" />
                    <span>Monetized content</span>
                  </div>
                </div>
              </div>

              <div className="border-2 border-blue-500 rounded-xl p-6 bg-blue-50">
                <h3 className="text-xl font-bold mb-4">Creator & Pro Plans - Commercial License</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-green-600">
                    <Check className="w-5 h-5" />
                    <span>All personal use rights</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-600">
                    <Check className="w-5 h-5" />
                    <span>YouTube, podcasts, and streaming</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-600">
                    <Check className="w-5 h-5" />
                    <span>Advertisements and marketing</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-600">
                    <Check className="w-5 h-5" />
                    <span>Films, TV shows, and games</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-600">
                    <Check className="w-5 h-5" />
                    <span>Sell or license the music</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-600">
                    <Check className="w-5 h-5" />
                    <span>Unlimited distribution</span>
                  </div>
                </div>
              </div>

              <div className="border-2 border-purple-500 rounded-xl p-6 bg-purple-50">
                <h3 className="text-xl font-bold mb-4">Team Plan - Extended Commercial License</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-green-600">
                    <Check className="w-5 h-5" />
                    <span>All Creator/Pro rights</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-600">
                    <Check className="w-5 h-5" />
                    <span>White-label usage</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-600">
                    <Check className="w-5 h-5" />
                    <span>Client projects (agencies)</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-600">
                    <Check className="w-5 h-5" />
                    <span>Broadcast rights</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">What You Can Do</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              With a commercial license, you can:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Use the music in any commercial project</li>
              <li>Monetize videos and podcasts with the music</li>
              <li>Include the music in products you sell</li>
              <li>Perform the music publicly</li>
              <li>Create derivative works</li>
              <li>No attribution required (though appreciated!)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Restrictions</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You may not:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Resell or redistribute the music as standalone files</li>
              <li>Claim the music as your own original composition</li>
              <li>Register the music with content ID systems</li>
              <li>Use the music for illegal or harmful purposes</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Copyright & Ownership</h2>
            <p className="text-gray-700 leading-relaxed">
              AI Music Studio retains the underlying copyright to all AI-generated music. However, you receive an exclusive, perpetual, worldwide license to use the music according to your plan's terms. This means you have all practical rights to use the music, but we maintain the technical copyright.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Royalty-Free</h2>
            <p className="text-gray-700 leading-relaxed">
              All music generated with a commercial license is 100% royalty-free. You never need to pay additional fees, regardless of how many times the music is played, viewed, or distributed.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Questions?</h2>
            <p className="text-gray-700 leading-relaxed">
              For licensing questions, contact us at <a href="mailto:licensing@aimusicstudio.com" className="text-blue-600 hover:underline">licensing@aimusicstudio.com</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
