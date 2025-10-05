'use client';

import { useCredits, useLowCreditWarning } from '@/hooks/useCredits';
import { Music2, RefreshCw, AlertCircle } from 'lucide-react';
import { useState } from 'react';

export function CreditsDisplay() {
  const { credits, isLoading, refreshCredits } = useCredits();
  const { isLow, percentage } = useLowCreditWarning(10);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshCredits();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  if (isLoading) {
    return (
      <div className="credits-badge loading">
        <Music2 className="w-4 h-4 animate-pulse" />
        <span className="credit-amount">...</span>
      </div>
    );
  }

  return (
    <>
      <div className={`credits-badge ${isLow ? 'low-credits' : ''}`}>
        {isLow && <AlertCircle className="w-4 h-4 text-orange-500" />}
        <Music2 className="w-4 h-4" />
        <div className="credit-info">
          <span className="credit-amount">{credits?.credits || 0}</span>
          <span className="credit-label">credits</span>
        </div>
        <button
          onClick={handleRefresh}
          className="refresh-btn"
          disabled={isRefreshing}
          aria-label="Refresh credits"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Progress Bar */}
      {credits && (
        <div className="credit-progress-container">
          <div
            className="credit-progress-bar"
            style={{
              width: `${percentage}%`,
              backgroundColor: isLow ? '#f59e0b' : '#5b6ff5',
            }}
          />
        </div>
      )}

      <style jsx>{`
        .credits-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #f9fafb;
          padding: 6px 12px;
          border-radius: 6px;
          border: 1px solid #e5e7eb;
          transition: all 0.2s;
        }

        .credits-badge.low-credits {
          background: #fffbeb;
          border-color: #fde68a;
        }

        .credits-badge.loading {
          opacity: 0.6;
        }

        .credit-info {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .credit-amount {
          font-size: 14px;
          font-weight: 600;
          color: #3b82f6;
          line-height: 1;
        }

        .credits-badge.low-credits .credit-amount {
          color: #f59e0b;
        }

        .credit-label {
          font-size: 10px;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }

        .refresh-btn {
          background: none;
          border: none;
          color: #6b7280;
          cursor: pointer;
          padding: 3px;
          border-radius: 4px;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .refresh-btn:hover:not(:disabled) {
          background: #f3f4f6;
          color: #3b82f6;
        }

        .refresh-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .credit-progress-container {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: #e5e7eb;
          border-radius: 0 0 6px 6px;
          overflow: hidden;
        }

        .credit-progress-bar {
          height: 100%;
          transition: width 0.3s ease, background-color 0.3s ease;
        }
      `}</style>
    </>
  );
}
