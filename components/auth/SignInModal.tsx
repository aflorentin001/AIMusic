'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Loader2 } from 'lucide-react';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SignInModal({ isOpen, onClose }: SignInModalProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setIsGoogleLoading(true);
      setError('');
      await signIn('google', { callbackUrl: '/dashboard' });
    } catch (err) {
      setError('Failed to sign in with Google. Please try again.');
      setIsGoogleLoading(false);
    }
  };

  const handleSendMagicLink = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!email) return;
    
    try {
      setIsLoading(true);
      setError('');
      
      const response = await fetch('/api/auth/magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to send magic link');
      }

      setShowSuccess(true);
    } catch (err) {
      setError('Failed to send magic link. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToEmail = () => {
    setShowSuccess(false);
    setEmail('');
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={onClose}>×</button>
          
          {!showSuccess ? (
            <>
              <div className="modal-header">
                <h2>Sign In to AI Music Studio</h2>
                <p>Create professional music with AI in seconds</p>
              </div>

              <div className="modal-body">
                {/* Error Message */}
                {error && (
                  <div className="error-message">
                    {error}
                  </div>
                )}

                <button 
                  onClick={handleGoogleSignIn}
                  disabled={isGoogleLoading}
                  className="google-btn"
                >
                  {isGoogleLoading ? (
                    <Loader2 className="spinner" />
                  ) : (
                    <>
                      <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
                        <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
                        <path fill="#FBBC05" d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.039l3.007-2.332z"/>
                        <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/>
                      </svg>
                      <span>Continue with Google</span>
                    </>
                  )}
                </button>

                <div className="divider">
                  <span>or</span>
                </div>

                <div className="email-form">
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                  />
                  <button 
                    onClick={handleSendMagicLink}
                    disabled={isLoading}
                    className="magic-link-btn"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="spinner" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      'Send Magic Link'
                    )}
                  </button>
                </div>

                <p className="terms-text">
                  By signing in, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="modal-header">
                <h2>Sign In to AI Music Studio</h2>
                <p>Create professional music with AI in seconds</p>
              </div>

              <div className="modal-body success-view">
                <div className="success-icon">
                  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                    <circle cx="32" cy="32" r="32" fill="#D1FAE5"/>
                    <path d="M20 32L28 40L44 24" stroke="#10B981" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>

                <h3 className="success-title">Check your email</h3>
                
                <p className="success-message">
                  We sent a magic link to<br/>
                  <strong>{email}</strong>
                </p>

                <p className="success-note">
                  Click the link to sign in. It expires in 24 hours.
                </p>

                <button className="back-link" onClick={handleBackToEmail}>
                  Use a different email
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        .modal-content {
          background: white;
          border-radius: 16px;
          width: 90%;
          max-width: 440px;
          position: relative;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          animation: slideIn 0.3s ease;
          max-height: 90vh;
          overflow-y: auto;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .modal-close {
          position: absolute;
          top: 16px;
          right: 16px;
          background: none;
          border: none;
          font-size: 28px;
          color: #718096;
          cursor: pointer;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: all 0.2s;
          z-index: 1;
        }

        .modal-close:hover {
          background: #f7fafc;
          color: #1a202c;
        }

        .modal-header {
          padding: 40px 40px 24px;
          text-align: center;
        }

        .modal-header h2 {
          font-size: 24px;
          font-weight: 700;
          color: #1a202c;
          margin-bottom: 8px;
        }

        .modal-header p {
          font-size: 15px;
          color: #718096;
        }

        .modal-body {
          padding: 0 40px 40px;
        }

        .google-btn {
          width: 100%;
          padding: 14px 20px;
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          background: white;
          font-size: 16px;
          font-weight: 600;
          color: #1a202c;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          transition: all 0.3s;
        }

        .google-btn:hover:not(:disabled) {
          border-color: #cbd5e0;
          background: #f7fafc;
        }

        .google-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .spinner {
          width: 18px;
          height: 18px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .error-message {
          padding: 12px 16px;
          background: #fee;
          border: 1px solid #fcc;
          border-radius: 8px;
          color: #c33;
          font-size: 14px;
          margin-bottom: 16px;
        }

        .success-message {
          text-align: center;
          padding: 20px 0;
        }

        .success-icon {
          width: 60px;
          height: 60px;
          background: #d4edda;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          color: #28a745;
          margin: 0 auto 16px;
        }

        .success-message h3 {
          font-size: 20px;
          font-weight: 700;
          color: #1a202c;
          margin-bottom: 8px;
        }

        .success-message p {
          color: #718096;
          margin-bottom: 8px;
        }

        .success-note {
          font-size: 13px;
          color: #a0aec0;
          margin-bottom: 16px;
        }

        .back-btn {
          background: none;
          border: none;
          color: #5b6ff5;
          font-weight: 600;
          cursor: pointer;
          font-size: 14px;
        }

        .back-btn:hover {
          text-decoration: underline;
        }

        .divider {
          display: flex;
          align-items: center;
          margin: 24px 0;
          color: #a0aec0;
          font-size: 14px;
        }

        .divider::before,
        .divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: #e2e8f0;
        }

        .divider span {
          padding: 0 16px;
        }

        .email-form label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #1a202c;
          margin-bottom: 8px;
        }

        .email-form input {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          font-size: 15px;
          transition: all 0.3s;
          margin-bottom: 16px;
        }

        .email-form input:focus {
          outline: none;
          border-color: #5b6ff5;
        }

        .magic-link-btn {
          width: 100%;
          padding: 14px 20px;
          border: none;
          border-radius: 10px;
          background: #7c8af5;
          color: white;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .magic-link-btn:hover:not(:disabled) {
          background: #5b6ff5;
        }

        .magic-link-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .terms-text {
          font-size: 13px;
          color: #718096;
          text-align: center;
          margin-top: 24px;
          line-height: 1.6;
        }

        .terms-text a {
          color: #5b6ff5;
          text-decoration: none;
        }

        .terms-text a:hover {
          text-decoration: underline;
        }

        /* Success View Styles */
        .success-view {
          text-align: center;
          padding-top: 20px;
        }

        .success-icon {
          margin: 0 auto 24px;
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .success-title {
          font-size: 24px;
          font-weight: 700;
          color: #1a202c;
          margin-bottom: 16px;
        }

        .success-message {
          font-size: 15px;
          color: #4a5568;
          margin-bottom: 12px;
          line-height: 1.6;
        }

        .success-message strong {
          color: #1a202c;
          font-weight: 600;
        }

        .success-note {
          font-size: 14px;
          color: #718096;
          margin-bottom: 24px;
        }

        .back-link {
          background: none;
          border: none;
          color: #5b6ff5;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.2s;
        }

        .back-link:hover {
          text-decoration: underline;
        }
      `}</style>
    </>
  );
}