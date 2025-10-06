'use client';

import { useState } from 'react';
import SignInModal from '../components/auth/SignInModal';
import Demo from '../components/landing/Demo';
import Footer from '../components/landing/Footer';

export default function Home() {
  const [isSignInOpen, setIsSignInOpen] = useState(false);

  return (
    <>
      <SignInModal isOpen={isSignInOpen} onClose={() => setIsSignInOpen(false)} />
      
      <style jsx global>{`
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #1a202c;
            background: linear-gradient(180deg, #f8f9fc 0%, #ffffff 50%, #fef3f8 100%);
            overflow-x: hidden;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }

        .fade-in {
            opacity: 0;
            transform: translateY(30px);
            animation: fadeInUp 0.8s ease forwards;
        }

        @keyframes fadeInUp {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .fade-in-delay-1 { animation-delay: 0.1s; }
        .fade-in-delay-2 { animation-delay: 0.2s; }
        .fade-in-delay-3 { animation-delay: 0.3s; }
        .fade-in-delay-4 { animation-delay: 0.4s; }

        header {
            padding: 20px 0;
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(10px);
            position: sticky;
            top: 0;
            z-index: 1000;
            border-bottom: 1px solid rgba(226, 232, 240, 0.5);
        }

        nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .logo {
            font-size: 24px;
            font-weight: bold;
            color: #1a202c;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .nav-links {
            display: flex;
            gap: 30px;
            list-style: none;
            align-items: center;
        }

        .nav-links a {
            color: #4a5568;
            text-decoration: none;
            font-weight: 500;
            transition: color 0.3s;
        }

        .nav-links a:hover {
            color: #5b6ff5;
        }

        .nav-cta {
            background: #5b6ff5;
            color: white !important;
            padding: 10px 20px;
            border-radius: 8px;
            transition: all 0.3s;
            border: none;
            cursor: pointer;
            font-family: inherit;
            font-size: inherit;
        }

        .nav-cta:hover {
            background: #4c5fd9;
            transform: translateY(-2px);
        }

        button.btn, button.plan-cta {
            border: none;
            cursor: pointer;
            font-family: inherit;
        }

        .hero {
            text-align: center;
            padding: 80px 0 100px;
        }

        .badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: white;
            padding: 10px 20px;
            border-radius: 24px;
            font-size: 14px;
            margin-bottom: 40px;
            font-weight: 500;
            color: #4a5568;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
        }

        h1 {
            font-size: 64px;
            font-weight: 800;
            margin-bottom: 24px;
            line-height: 1.1;
            color: #1a202c;
            letter-spacing: -1px;
        }

        .highlight {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .hero-subtitle {
            font-size: 18px;
            margin-bottom: 48px;
            color: #4a5568;
            max-width: 700px;
            margin-left: auto;
            margin-right: auto;
            line-height: 1.7;
        }

        .cta-buttons {
            display: flex;
            gap: 16px;
            justify-content: center;
            margin-bottom: 80px;
        }

        .btn {
            padding: 16px 32px;
            border-radius: 12px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            border: none;
        }

        .btn-primary {
            background: #5b6ff5;
            color: white;
            box-shadow: 0 4px 12px rgba(91, 111, 245, 0.3);
        }

        .btn-primary:hover {
            background: #4c5fd9;
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(91, 111, 245, 0.4);
        }

        .btn-secondary {
            background: white;
            color: #5b6ff5;
            border: 2px solid #e2e8f0;
        }

        .btn-secondary:hover {
            border-color: #5b6ff5;
            background: #f7f9fc;
        }

        .stats {
            display: flex;
            justify-content: center;
            gap: 100px;
            margin-top: 60px;
        }

        .stat {
            text-align: center;
        }

        .stat-number {
            font-size: 56px;
            font-weight: 800;
            display: block;
            margin-bottom: 8px;
        }

        .stat-number.blue { color: #5b6ff5; }
        .stat-number.purple { color: #8b5cf6; }
        .stat-number.cyan { color: #06b6d4; }

        .stat-label {
            font-size: 15px;
            color: #718096;
        }

        .features {
            background: linear-gradient(180deg, #82cde0 0%, #95c9de 100%);
            padding: 100px 0;
        }

        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 32px;
            max-width: 1200px;
            margin: 0 auto;
        }

        .feature-card {
            background: rgba(255, 255, 255, 0.95);
            padding: 40px;
            border-radius: 20px;
            text-align: center;
            transition: all 0.3s;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }

        .feature-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
        }

        .feature-icon {
            font-size: 48px;
            margin-bottom: 20px;
        }

        .feature-card h3 {
            font-size: 22px;
            font-weight: 700;
            color: #1a202c;
            margin-bottom: 12px;
        }

        .feature-card p {
            font-size: 15px;
            color: #4a5568;
            line-height: 1.6;
        }

        .section-subtitle {
            text-align: center;
            font-size: 18px;
            color: #4a5568;
            margin-bottom: 60px;
            max-width: 700px;
            margin-left: auto;
            margin-right: auto;
        }

        .samples {
            background: linear-gradient(180deg, #95c9de 0%, #aec8d8 100%);
            padding: 100px 0;
        }

        .section-title {
            text-align: center;
            font-size: 48px;
            font-weight: 800;
            margin-bottom: 60px;
            color: #1a202c;
            letter-spacing: -0.5px;
        }

        .demo-banner {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 24px;
            border-radius: 16px;
            text-align: center;
            margin-bottom: 80px;
            transition: all 0.3s;
            cursor: pointer;
        }

        .demo-banner:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
        }

        .demo-banner a {
            color: white;
            text-decoration: none;
            font-size: 18px;
            font-weight: 600;
        }

        .samples-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 24px;
            margin-bottom: 50px;
        }

        .sample-card {
            background: white;
            padding: 24px;
            border-radius: 16px;
            border: 1px solid #e2e8f0;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
            transition: all 0.3s;
        }

        .sample-card:hover {
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
            transform: translateY(-4px);
        }

        .sample-header {
            display: flex;
            justify-content: space-between;
            align-items: start;
            margin-bottom: 16px;
        }

        .sample-info h3 {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 4px;
        }

        .sample-meta {
            font-size: 14px;
            color: #718096;
        }

        .play-button {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background: #5b6ff5;
            border: none;
            color: white;
            font-size: 20px;
            cursor: pointer;
            transition: all 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .play-button:hover {
            background: #4c5fd9;
            transform: scale(1.1);
        }

        .sample-description {
            color: #4a5568;
            font-size: 14px;
            margin-bottom: 16px;
        }

        .waveform {
            height: 60px;
            background: linear-gradient(90deg, #e0e7ff 0%, #c7d2fe 50%, #a5b4fc 100%);
            border-radius: 8px;
            margin-bottom: 16px;
        }

        .sample-controls {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .volume-icon {
            color: #718096;
        }

        .progress-bar {
            flex: 1;
            height: 4px;
            background: #e2e8f0;
            border-radius: 2px;
            position: relative;
        }

        .progress-bar::after {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            width: 60%;
            background: #5b6ff5;
            border-radius: 2px;
        }

        .download-icon {
            color: #718096;
            cursor: pointer;
            transition: color 0.3s;
        }

        .download-icon:hover {
            color: #5b6ff5;
        }

        .sample-actions {
            display: flex;
            gap: 12px;
            justify-content: center;
        }

        .pricing {
            background: linear-gradient(180deg, #ffffff 0%, #f8f9fc 100%);
            padding: 100px 0;
        }

        .pricing-subtitle {
            color: #718096;
            font-size: 18px;
            margin-top: 16px;
            text-align: center;
        }

        .pricing-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 24px;
            max-width: 1400px;
            margin: 60px auto 0;
        }

        .pricing-card {
            background: white;
            padding: 40px 32px;
            border-radius: 20px;
            border: 2px solid #e2e8f0;
            transition: all 0.3s;
            position: relative;
        }

        .pricing-card.featured {
            border-color: #5b6ff5;
            box-shadow: 0 12px 40px rgba(91, 111, 245, 0.15);
            transform: scale(1.02);
        }

        .popular-badge {
            position: absolute;
            top: -12px;
            left: 50%;
            transform: translateX(-50%);
            background: #5b6ff5;
            color: white;
            padding: 6px 16px;
            border-radius: 20px;
            font-size: 13px;
            font-weight: 600;
        }

        .pricing-card:hover {
            border-color: #5b6ff5;
            box-shadow: 0 8px 24px rgba(91, 111, 245, 0.1);
        }

        .plan-name {
            font-size: 18px;
            font-weight: 700;
            color: #1a202c;
            margin-bottom: 16px;
        }

        .plan-price {
            font-size: 48px;
            font-weight: 800;
            margin-bottom: 8px;
            color: #1a202c;
        }

        .plan-price span {
            font-size: 16px;
            color: #718096;
            font-weight: 400;
        }

        .plan-description {
            color: #718096;
            margin-bottom: 32px;
            font-size: 15px;
        }

        .plan-features {
            list-style: none;
            margin-bottom: 32px;
        }

        .plan-features li {
            padding: 10px 0;
            color: #4a5568;
            display: flex;
            align-items: center;
            gap: 12px;
            font-size: 15px;
        }

        .plan-features li::before {
            content: "✓";
            color: #5b6ff5;
            font-weight: bold;
            font-size: 18px;
            flex-shrink: 0;
        }

        .plan-cta {
            width: 100%;
            padding: 14px;
            border-radius: 10px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            border: none;
        }

        .featured .plan-cta {
            background: #5b6ff5;
            color: white;
        }

        .featured .plan-cta:hover {
            background: #4c5fd9;
            transform: translateY(-2px);
        }

        .plan-cta.secondary {
            background: #f7f9fc;
            color: #5b6ff5;
            border: 2px solid #e2e8f0;
        }

        .plan-cta.secondary:hover {
            border-color: #5b6ff5;
            background: white;
        }

        .trial-note {
            text-align: center;
            margin-top: 16px;
            font-size: 13px;
            color: #718096;
        }

        .features {
            background: white;
            padding: 100px 0;
        }

        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 32px;
            margin-top: 60px;
        }

        .feature-card {
            padding: 32px;
            border-radius: 16px;
            background: #f7f9fc;
            transition: all 0.3s;
        }

        .feature-card:hover {
            background: white;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
            transform: translateY(-4px);
        }

        .feature-icon {
            width: 56px;
            height: 56px;
            background: linear-gradient(135deg, #5b6ff5 0%, #8b5cf6 100%);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 20px;
            color: white;
            font-size: 28px;
        }

        .feature-title {
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 12px;
            color: #1a202c;
        }

        .feature-description {
            color: #718096;
            line-height: 1.6;
        }

        .testimonials {
            background: linear-gradient(180deg, #f8f9fc 0%, #ffffff 100%);
            padding: 100px 0;
        }

        .testimonials-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 32px;
            margin-top: 60px;
        }

        .testimonial-card {
            background: white;
            padding: 40px;
            border-radius: 20px;
            border: 1px solid #e2e8f0;
            transition: all 0.3s;
            position: relative;
            display: flex;
            flex-direction: column;
        }

        .testimonial-card:hover {
            box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
            transform: translateY(-4px);
        }

        .quote-icon {
            position: absolute;
            top: 20px;
            right: 20px;
            font-size: 48px;
            color: #e2e8f0;
        }

        .stars {
            color: #fbbf24;
            margin-bottom: 20px;
            font-size: 20px;
        }

        .testimonial-text {
            color: #4a5568;
            margin-bottom: 32px;
            line-height: 1.7;
            font-size: 16px;
            flex: 1;
        }

        .testimonial-author {
            display: flex;
            align-items: flex-start;
            gap: 16px;
            margin-top: auto;
        }

        .author-avatar {
            width: 56px;
            height: 56px;
            border-radius: 50%;
            background: linear-gradient(135deg, #5b6ff5 0%, #8b5cf6 100%);
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 24px;
            font-weight: 700;
        }

        .author-info {
            flex: 1;
        }

        .author-name {
            font-weight: 700;
            color: #1a202c;
            font-size: 16px;
            line-height: 1.4;
            margin-bottom: 4px;
        }

        .author-title {
            font-size: 14px;
            color: #718096;
            line-height: 1.4;
            margin-bottom: 2px;
        }

        .author-company {
            font-size: 13px;
            color: #a0aec0;
            line-height: 1.4;
        }

        .final-cta {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 80px 0;
            text-align: center;
            color: white;
        }

        .final-cta h2 {
            font-size: 48px;
            font-weight: 800;
            margin-bottom: 20px;
            color: white;
        }

        .final-cta p {
            font-size: 18px;
            margin-bottom: 40px;
            color: rgba(255, 255, 255, 0.9);
            max-width: 700px;
            margin-left: auto;
            margin-right: auto;
        }

        .final-cta .btn {
            background: white;
            color: #667eea;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .final-cta .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
        }

        footer {
            background: #1a202c;
            color: white;
            padding: 60px 0 30px;
        }

        .footer-newsletter {
            text-align: center;
            padding: 50px 0;
            border-bottom: 1px solid #2d3748;
            margin-bottom: 50px;
        }

        .footer-newsletter h3 {
            font-size: 20px;
            font-weight: 600;
            color: #e2e8f0;
            margin-bottom: 24px;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
            line-height: 1.6;
        }

        .footer-newsletter-form {
            display: flex;
            gap: 12px;
            justify-content: center;
            max-width: 500px;
            margin: 0 auto 16px;
        }

        .footer-newsletter-form .newsletter-input {
            flex: 1;
            padding: 14px 20px;
            border-radius: 8px;
            border: 1px solid #2d3748;
            background: #2d3748;
            color: white;
            font-size: 15px;
        }

        .footer-newsletter-form .newsletter-input::placeholder {
            color: #a0aec0;
        }

        .footer-newsletter-form .newsletter-btn {
            padding: 14px 28px;
            border-radius: 8px;
            border: none;
            background: #5b6ff5;
            color: white;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            white-space: nowrap;
        }

        .footer-newsletter-form .newsletter-btn:hover {
            background: #4c5fd9;
        }

        .newsletter-privacy {
            font-size: 13px;
            color: #a0aec0;
        }

        .newsletter-privacy a {
            color: #5b6ff5;
            text-decoration: none;
        }

        .footer-content {
            display: grid;
            grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
            gap: 50px;
            margin-bottom: 40px;
        }

        .footer-brand-section {
            max-width: 350px;
        }

        .footer-brand {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 16px;
        }

        .footer-description {
            color: #a0aec0;
            margin-bottom: 24px;
            line-height: 1.7;
            font-size: 14px;
        }

        .footer-contact {
            color: #a0aec0;
            font-size: 14px;
        }

        .footer-contact p {
            margin-bottom: 8px;
        }

        .social-links {
            display: flex;
            gap: 12px;
        }

        .social-link {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: #2d3748;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            text-decoration: none;
            transition: all 0.3s;
            font-size: 18px;
        }

        .social-link:hover {
            background: #5b6ff5;
            transform: translateY(-2px);
        }

        .footer-column h4 {
            margin-bottom: 20px;
            font-size: 16px;
            font-weight: 600;
        }

        .footer-links {
            list-style: none;
        }

        .footer-links li {
            margin-bottom: 12px;
        }

        .footer-links a {
            color: #a0aec0;
            text-decoration: none;
            transition: color 0.3s;
            font-size: 14px;
        }

        .footer-links a:hover {
            color: white;
        }

        .footer-social-section {
            display: flex;
            align-items: center;
            gap: 16px;
            padding: 30px 0;
            border-top: 1px solid #2d3748;
            border-bottom: 1px solid #2d3748;
            margin-bottom: 30px;
        }

        .footer-social-section p {
            color: #a0aec0;
            font-size: 14px;
        }

        .footer-bottom {
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #a0aec0;
            font-size: 14px;
        }

        .footer-badges {
            display: flex;
            gap: 24px;
        }

        .badge-item {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 13px;
        }

        @media (max-width: 1200px) {
            .pricing-grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }

        @media (max-width: 768px) {
            h1 { font-size: 36px; }
            .stats { flex-direction: column; gap: 30px; }
            .footer-content { grid-template-columns: 1fr; }
            .pricing-card.featured { transform: scale(1); }
            .pricing-grid {
                grid-template-columns: 1fr;
            }
            .nav-links { display: none; }
            .footer-bottom { flex-direction: column; gap: 20px; }
        }
      `}</style>

      {/* Header */}
      <header>
        <nav className="container">
          <div className="logo">🎵 AI Music Studio</div>
          <ul className="nav-links">
            <li><a href="#features">Features</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#samples">Samples</a></li>
            <li><button onClick={() => setIsSignInOpen(true)} className="nav-cta">Get Started Free</button></li>
          </ul>
        </nav>
      </header>

      <section className="hero">
        <div className="container">
          <div className="badge fade-in">🚀 Join 50,000+ creators • 2M+ songs generated</div>
          <h1 className="fade-in fade-in-delay-1">Create Professional Music<br/>with <span className="highlight">AI</span> in Seconds</h1>
          <p className="hero-subtitle fade-in fade-in-delay-2">Transform your ideas into studio-quality music instantly. No musical experience required. Perfect for content creators, podcasters, marketers, and musicians who need professional soundtracks fast.</p>
          <div className="cta-buttons fade-in fade-in-delay-3">
            <button onClick={() => setIsSignInOpen(true)} className="btn btn-primary">🎵 Start Creating Music</button>
            <a href="#samples" className="btn btn-secondary">▶ Watch Demo</a>
          </div>
          <div className="stats fade-in fade-in-delay-4">
            <div className="stat">
              <span className="stat-number blue">60s</span>
              <span className="stat-label">Average generation time</span>
            </div>
            <div className="stat">
              <span className="stat-number purple">50K+</span>
              <span className="stat-label">Active creators</span>
            </div>
            <div className="stat">
              <span className="stat-number cyan">2M+</span>
              <span className="stat-label">Songs generated</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="container">
          <h2 className="section-title">Everything You Need to Create Amazing Music</h2>
          <p className="section-subtitle">Powerful AI tools designed for creators, by creators</p>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">✨</div>
              <h3>AI-Powered Generation</h3>
              <p>Advanced AI models create studio-quality music from simple text descriptions in seconds.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🎵</div>
              <h3>Professional Quality</h3>
              <p>Studio-grade audio output ready for commercial use, streaming, and professional projects.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">⚖️</div>
              <h3>Commercial Licensing</h3>
              <p>Full rights to use your generated music commercially. No royalties, no restrictions.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">📚</div>
              <h3>Multiple Genres</h3>
              <p>Create music in 10+ genres from Pop and Rock to Classical and Jazz.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">⬇️</div>
              <h3>Instant Download</h3>
              <p>Download your tracks in MP3 or WAV format immediately after generation.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">▶️</div>
              <h3>Real-time Preview</h3>
              <p>Listen to your tracks before downloading with our built-in audio player.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section with Working Audio */}
      <Demo onSignInClick={() => setIsSignInOpen(true)} />

      {/* Pricing Section */}
      <section id="pricing" className="pricing">
        <div className="container">
          <h2 className="section-title">Choose your creative plan</h2>
          <p className="section-subtitle">Start free and scale as you grow. All plans include commercial licensing and access to our latest AI models.</p>
          <div className="pricing-grid">
            <div className="pricing-card">
              <div className="plan-name">Free</div>
              <div className="plan-price">$0<span>/forever</span></div>
              <div className="plan-description">Perfect for trying out AI music generation</div>
              <ul className="plan-features">
                <li>5 tracks per month</li>
                <li>Standard quality (MP3)</li>
                <li>Basic AI models</li>
                <li>Personal use license</li>
                <li>Community support</li>
              </ul>
              <button onClick={() => setIsSignInOpen(true)} className="plan-cta secondary">Start Free</button>
            </div>
            <div className="pricing-card">
              <div className="plan-name">Creator</div>
              <div className="plan-price">$9.99<span>/per month</span></div>
              <div className="plan-description">Ideal for content creators and small projects</div>
              <ul className="plan-features">
                <li>100 tracks per month</li>
                <li>High quality (WAV, MP3)</li>
                <li>Advanced AI models</li>
                <li>Commercial use license</li>
                <li>Priority support</li>
                <li>Stem separation</li>
                <li>Custom styles</li>
                <li>Mobile app access</li>
              </ul>
              <button onClick={() => setIsSignInOpen(true)} className="plan-cta secondary">Start Free Trial</button>
            </div>
            <div className="pricing-card featured">
              <div className="popular-badge">⭐ Most Popular</div>
              <div className="plan-name">Pro</div>
              <div className="plan-price">$19.99<span>/per month</span></div>
              <div className="plan-description">Ideal for content creators and small projects</div>
              <ul className="plan-features">
                <li>100 tracks per month</li>
                <li>High quality (WAV, MP3)</li>
                <li>Advanced AI models</li>
                <li>Full commercial license</li>
                <li>Priority support</li>
                <li>Stem separation</li>
                <li>Custom lyrics generation</li>
                <li>Project organization</li>
              </ul>
              <button onClick={() => setIsSignInOpen(true)} className="plan-cta">Start Free Trial</button>
              <div className="trial-note">✨ 14-day free trial • No credit card required</div>
            </div>
            <div className="pricing-card">
              <div className="plan-name">Team</div>
              <div className="plan-price">$29.99<span>/per month</span></div>
              <div className="plan-description">Perfect for agencies and professional teams</div>
              <ul className="plan-features">
                <li>Unlimited tracks</li>
                <li>Studio quality (FLAC, WAV, MP3)</li>
                <li>Premium AI models</li>
                <li>Extended commercial license</li>
                <li>24/7 priority support</li>
                <li>Advanced stem separation</li>
                <li>Custom model training</li>
                <li>Team collaboration tools</li>
                <li>API access</li>
                <li>White-label options</li>
              </ul>
              <button onClick={() => setIsSignInOpen(true)} className="plan-cta secondary">Start Free Trial</button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="container">
          <h2 className="section-title">Loved by creators worldwide</h2>
          <p className="section-subtitle">Join thousands of content creators, agencies, and musicians who trust our AI to create professional music for their projects.</p>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="quote-icon">"</div>
              <div className="stars">★★★★★</div>
              <p className="testimonial-text">"AI Music Studio has completely revolutionized my content creation workflow. I can now produce custom background music for all my videos in minutes instead of spending hours searching for the perfect track. The quality is incredible and my audience loves it!"</p>
              <div className="testimonial-author">
                <div className="author-avatar">SJ</div>
                <div className="author-info">
                  <div className="author-name">Sarah Johnson</div>
                  <div className="author-title">YouTube Content Creator</div>
                  <div className="author-company">2.5M Subscribers</div>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="quote-icon">"</div>
              <div className="stars">★★★★★</div>
              <p className="testimonial-text">"As an agency, we needed a solution that could scale with our client demands. AI Music Studio delivers studio-quality tracks consistently, and the licensing is straightforward. It's saved us thousands in music licensing fees and our clients are thrilled with the results."</p>
              <div className="testimonial-author">
                <div className="author-avatar">MC</div>
                <div className="author-info">
                  <div className="author-name">Michael Chen</div>
                  <div className="author-title">Creative Director</div>
                  <div className="author-company">Pixel Perfect Agency</div>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="quote-icon">"</div>
              <div className="stars">★★★★★</div>
              <p className="testimonial-text">"I'm a professional composer and was skeptical at first, but AI Music Studio has become an essential tool in my workflow. It's perfect for quick mockups and background tracks, and the quality is genuinely impressive. It doesn't replace human creativity—it enhances it."</p>
              <div className="testimonial-author">
                <div className="author-avatar">ER</div>
                <div className="author-info">
                  <div className="author-name">Emily Rodriguez</div>
                  <div className="author-title">Film Composer</div>
                  <div className="author-company">15+ Years Experience</div>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="quote-icon">"</div>
              <div className="stars">★★★★★</div>
              <p className="testimonial-text">"The best investment for our podcast. We needed intro music, background tracks, and transitions that matched our brand perfectly. AI Music Studio understood exactly what we needed and delivered every single time. Our production quality has skyrocketed!"</p>
              <div className="testimonial-author">
                <div className="author-avatar">DP</div>
                <div className="author-info">
                  <div className="author-name">David Park</div>
                  <div className="author-title">Podcast Producer</div>
                  <div className="author-company">Top 50 Business Podcast</div>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="quote-icon">"</div>
              <div className="stars">★★★★★</div>
              <p className="testimonial-text">"As a marketing manager, I needed quick turnarounds on campaign music without breaking the budget. AI Music Studio gives me professional tracks in minutes, and the commercial licensing is crystal clear. It's transformed how we produce video content for our clients."</p>
              <div className="testimonial-author">
                <div className="author-avatar">JW</div>
                <div className="author-info">
                  <div className="author-name">Jessica Williams</div>
                  <div className="author-title">Marketing Manager</div>
                  <div className="author-company">Tech Innovations Inc.</div>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="quote-icon">"</div>
              <div className="stars">★★★★★</div>
              <p className="testimonial-text">"I use AI Music Studio for my gaming streams and YouTube videos. The variety of genres is incredible, and I can create the exact vibe I need for each video. My viewers have noticed the quality upgrade, and several asked where I get my music from!"</p>
              <div className="testimonial-author">
                <div className="author-avatar">AT</div>
                <div className="author-info">
                  <div className="author-name">Alex Thompson</div>
                  <div className="author-title">Gaming Content Creator</div>
                  <div className="author-company">500K+ Followers</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="container">
          <h2>Start Creating Music</h2>
          <p>Create professional music with AI in seconds. Trusted by 50,000+ creators worldwide for content creation, podcasts, and commercial projects.</p>
          <button onClick={() => setIsSignInOpen(true)} className="btn btn-primary">🎵 Get Started Free</button>
        </div>
      </section>

      {/* Footer with Working Links */}
      <Footer />
    </>
  );
}
