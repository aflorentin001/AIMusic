'use client';

import { Music2, Cookie } from 'lucide-react';
import Link from 'next/link';

export default function CookiesPage() {
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
          <Cookie className="w-10 h-10 text-blue-600" />
          <h1 className="text-4xl font-bold">Cookie Policy</h1>
        </div>
        <p className="text-gray-600 mb-8">Last updated: January 5, 2025</p>

        <div className="prose prose-lg max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">What Are Cookies?</h2>
            <p className="text-gray-700 leading-relaxed">
              Cookies are small text files stored on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Types of Cookies We Use</h2>
            
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="font-bold text-lg mb-2">Essential Cookies</h3>
                <p className="text-gray-700">
                  Required for the website to function properly. These include authentication cookies and security tokens.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="font-bold text-lg mb-2">Analytics Cookies</h3>
                <p className="text-gray-700">
                  Help us understand how visitors interact with our website by collecting anonymous information.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="font-bold text-lg mb-2">Preference Cookies</h3>
                <p className="text-gray-700">
                  Remember your settings and preferences, such as language and region.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="font-bold text-lg mb-2">Marketing Cookies</h3>
                <p className="text-gray-700">
                  Track your visit across websites to deliver relevant advertisements.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Managing Cookies</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You can control and manage cookies in several ways:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Browser settings: Most browsers allow you to refuse or delete cookies</li>
              <li>Opt-out tools: Use browser extensions to block tracking cookies</li>
              <li>Our cookie banner: Manage your preferences when you first visit</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              Note: Disabling essential cookies may affect the functionality of our Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Third-Party Cookies</h2>
            <p className="text-gray-700 leading-relaxed">
              We use third-party services that may set cookies, including Google Analytics, payment processors, and authentication providers. These third parties have their own privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="text-gray-700 leading-relaxed">
              For questions about our use of cookies, contact us at <a href="mailto:privacy@aimusicstudio.com" className="text-blue-600 hover:underline">privacy@aimusicstudio.com</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
