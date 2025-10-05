'use client';

import { AlertTriangle, X, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LowCreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCredits: number;
  requiredCredits: number;
}

export function LowCreditsModal({
  isOpen,
  onClose,
  currentCredits,
  requiredCredits,
}: LowCreditsModalProps) {
  const shortage = requiredCredits - currentCredits;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-btn" onClick={onClose} aria-label="Close">
              <X className="w-5 h-5" />
            </button>

            <div className="modal-header">
              <div className="warning-icon">
                <AlertTriangle className="w-12 h-12" />
              </div>
              <h2>Insufficient Credits</h2>
              <p>You need more credits to generate this track</p>
            </div>

            <div className="modal-body">
              <div className="credits-info">
                <div className="info-row">
                  <span className="label">Current Credits:</span>
                  <span className="value current">{currentCredits}</span>
                </div>
                <div className="info-row">
                  <span className="label">Required Credits:</span>
                  <span className="value required">{requiredCredits}</span>
                </div>
                <div className="info-row shortage">
                  <span className="label">Credits Needed:</span>
                  <span className="value">{shortage}</span>
                </div>
              </div>

              <div className="upgrade-section">
                <h3>Get More Credits</h3>
                <div className="plans">
                  <div className="plan">
                    <div className="plan-name">Starter Pack</div>
                    <div className="plan-credits">50 Credits</div>
                    <div className="plan-price">$9.99</div>
                    <button className="plan-btn">Purchase</button>
                  </div>
                  <div className="plan featured">
                    <div className="popular-badge">Most Popular</div>
                    <div className="plan-name">Pro Pack</div>
                    <div className="plan-credits">150 Credits</div>
                    <div className="plan-price">$24.99</div>
                    <button className="plan-btn">Purchase</button>
                  </div>
                  <div className="plan">
                    <div className="plan-name">Ultimate Pack</div>
                    <div className="plan-credits">500 Credits</div>
                    <div className="plan-price">$79.99</div>
                    <button className="plan-btn">Purchase</button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <style jsx>{`
            .modal-overlay {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: rgba(0, 0, 0, 0.6);
              z-index: 9998;
              backdrop-filter: blur(4px);
            }

            .modal-content {
              position: fixed;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              background: white;
              border-radius: 20px;
              width: 90%;
              max-width: 600px;
              max-height: 90vh;
              overflow-y: auto;
              z-index: 9999;
              box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            }

            .close-btn {
              position: absolute;
              top: 20px;
              right: 20px;
              background: #f7fafc;
              border: none;
              border-radius: 50%;
              width: 36px;
              height: 36px;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              transition: all 0.2s;
              z-index: 1;
            }

            .close-btn:hover {
              background: #e2e8f0;
            }

            .modal-header {
              text-align: center;
              padding: 40px 40px 24px;
              border-bottom: 1px solid #e2e8f0;
            }

            .warning-icon {
              width: 80px;
              height: 80px;
              margin: 0 auto 20px;
              background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%);
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              color: #f59e0b;
            }

            .modal-header h2 {
              font-size: 28px;
              font-weight: 700;
              color: #1a202c;
              margin-bottom: 8px;
            }

            .modal-header p {
              font-size: 16px;
              color: #718096;
            }

            .modal-body {
              padding: 32px 40px 40px;
            }

            .credits-info {
              background: #f7fafc;
              border-radius: 12px;
              padding: 24px;
              margin-bottom: 32px;
            }

            .info-row {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 12px 0;
              border-bottom: 1px solid #e2e8f0;
            }

            .info-row:last-child {
              border-bottom: none;
            }

            .info-row.shortage {
              margin-top: 12px;
              padding-top: 20px;
              border-top: 2px solid #e2e8f0;
              border-bottom: none;
            }

            .label {
              font-size: 15px;
              color: #718096;
              font-weight: 500;
            }

            .value {
              font-size: 20px;
              font-weight: 700;
              color: #1a202c;
            }

            .value.current {
              color: #f59e0b;
            }

            .value.required {
              color: #5b6ff5;
            }

            .info-row.shortage .value {
              color: #ef4444;
            }

            .upgrade-section h3 {
              font-size: 20px;
              font-weight: 700;
              color: #1a202c;
              margin-bottom: 20px;
              text-align: center;
            }

            .plans {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 16px;
            }

            .plan {
              background: white;
              border: 2px solid #e2e8f0;
              border-radius: 12px;
              padding: 24px 16px;
              text-align: center;
              transition: all 0.3s;
              position: relative;
            }

            .plan.featured {
              border-color: #5b6ff5;
              background: linear-gradient(135deg, #f0f4ff 0%, #e8f0fe 100%);
              transform: scale(1.05);
            }

            .plan:hover {
              border-color: #5b6ff5;
              box-shadow: 0 4px 12px rgba(91, 111, 245, 0.2);
            }

            .popular-badge {
              position: absolute;
              top: -12px;
              left: 50%;
              transform: translateX(-50%);
              background: linear-gradient(135deg, #5b6ff5 0%, #8b5cf6 100%);
              color: white;
              font-size: 11px;
              font-weight: 600;
              padding: 4px 12px;
              border-radius: 12px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }

            .plan-name {
              font-size: 14px;
              font-weight: 600;
              color: #718096;
              margin-bottom: 8px;
            }

            .plan-credits {
              font-size: 24px;
              font-weight: 700;
              color: #1a202c;
              margin-bottom: 8px;
            }

            .plan-price {
              font-size: 18px;
              font-weight: 600;
              color: #5b6ff5;
              margin-bottom: 16px;
            }

            .plan-btn {
              width: 100%;
              padding: 10px 16px;
              background: #5b6ff5;
              color: white;
              border: none;
              border-radius: 8px;
              font-size: 14px;
              font-weight: 600;
              cursor: pointer;
              transition: all 0.3s;
            }

            .plan-btn:hover {
              background: #4c5fd9;
              transform: translateY(-2px);
            }

            @media (max-width: 640px) {
              .plans {
                grid-template-columns: 1fr;
              }

              .plan.featured {
                transform: scale(1);
              }
            }
          `}</style>
        </>
      )}
    </AnimatePresence>
  );
}
