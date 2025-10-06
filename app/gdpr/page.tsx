'use client';

import { Shield, Download, Trash2, Eye, Lock } from 'lucide-react';
import PublicHeader from '@/components/PublicHeader';

export default function GDPRPage() {
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
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-10 h-10 text-blue-600" />
          <h1 className="text-4xl font-bold">GDPR Compliance</h1>
        </div>
        <p className="text-gray-600 mb-8">General Data Protection Regulation (EU)</p>

        <div className="prose prose-lg max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">Your Rights Under GDPR</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              As a user in the European Union, you have specific rights regarding your personal data under the General Data Protection Regulation (GDPR). AI Music Studio is committed to protecting these rights.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-6 rounded-xl">
                <Eye className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="font-bold mb-2">Right to Access</h3>
                <p className="text-gray-700 text-sm">
                  You can request a copy of all personal data we hold about you.
                </p>
              </div>

              <div className="bg-blue-50 p-6 rounded-xl">
                <Download className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="font-bold mb-2">Right to Portability</h3>
                <p className="text-gray-700 text-sm">
                  You can export your data in a machine-readable format.
                </p>
              </div>

              <div className="bg-blue-50 p-6 rounded-xl">
                <Trash2 className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="font-bold mb-2">Right to Erasure</h3>
                <p className="text-gray-700 text-sm">
                  You can request deletion of your personal data ("right to be forgotten").
                </p>
              </div>

              <div className="bg-blue-50 p-6 rounded-xl">
                <Lock className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="font-bold mb-2">Right to Restriction</h3>
                <p className="text-gray-700 text-sm">
                  You can request that we limit how we use your data.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Legal Basis for Processing</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We process your personal data under the following legal bases:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Consent:</strong> When you sign up and agree to our terms</li>
              <li><strong>Contract:</strong> To provide the services you've subscribed to</li>
              <li><strong>Legitimate Interest:</strong> To improve our services and prevent fraud</li>
              <li><strong>Legal Obligation:</strong> To comply with applicable laws</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Data We Collect</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We collect and process the following categories of personal data:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Identity data (name, username)</li>
              <li>Contact data (email address)</li>
              <li>Technical data (IP address, browser type, device information)</li>
              <li>Usage data (how you use our service)</li>
              <li>Marketing data (your preferences for receiving communications)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Data Retention</h2>
            <p className="text-gray-700 leading-relaxed">
              We retain your personal data only for as long as necessary to fulfill the purposes outlined in our Privacy Policy. When you delete your account, we will delete or anonymize your personal data within 30 days, except where we are required to retain it by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">International Data Transfers</h2>
            <p className="text-gray-700 leading-relaxed">
              Your data may be transferred to and processed in countries outside the EU. We ensure appropriate safeguards are in place, including Standard Contractual Clauses approved by the European Commission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">How to Exercise Your Rights</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              To exercise any of your GDPR rights:
            </p>
            <div className="bg-blue-50 p-6 rounded-xl">
              <p className="font-semibold mb-2">Contact our Data Protection Officer:</p>
              <p className="text-gray-700">Email: <a href="mailto:dpo@aimusicstudio.com" className="text-blue-600 hover:underline">dpo@aimusicstudio.com</a></p>
              <p className="text-gray-700">Or use the data management tools in your Profile settings</p>
            </div>
            <p className="text-gray-700 leading-relaxed mt-4">
              We will respond to your request within 30 days as required by GDPR.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Supervisory Authority</h2>
            <p className="text-gray-700 leading-relaxed">
              If you believe we have not adequately addressed your concerns, you have the right to lodge a complaint with your local data protection supervisory authority.
            </p>
          </section>
        </div>
          </div>
        </main>
      </div>
    </>
  );
}
