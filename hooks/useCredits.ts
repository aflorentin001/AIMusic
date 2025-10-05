'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import type { CreditsResponse } from '@/types/sunoapi';
import type { CreditUsageRecord, CreditUsageHistory } from '@/types/credits';

// Fetch credits from API
async function fetchCredits(): Promise<CreditsResponse> {
  const response = await fetch('/api/credits');
  
  if (!response.ok) {
    throw new Error('Failed to fetch credits');
  }
  
  return response.json();
}

// Hook to fetch and manage credits
export function useCredits() {
  const queryClient = useQueryClient();

  const {
    data: credits,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['credits'],
    queryFn: fetchCredits,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 30 * 1000, // Refetch every 30 seconds
    refetchIntervalInBackground: false,
  });

  // Refresh credits manually
  const refreshCredits = () => {
    queryClient.invalidateQueries({ queryKey: ['credits'] });
  };

  return {
    credits,
    isLoading,
    error,
    refetch,
    refreshCredits,
  };
}

// Hook to track credit usage locally
export function useCreditUsage() {
  const STORAGE_KEY = 'credit_usage_history';

  // Get usage history from localStorage
  const getUsageHistory = (): CreditUsageHistory => {
    if (typeof window === 'undefined') {
      return { records: [], totalUsed: 0, lastUpdated: new Date().toISOString() };
    }

    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return { records: [], totalUsed: 0, lastUpdated: new Date().toISOString() };
    }

    try {
      return JSON.parse(stored);
    } catch {
      return { records: [], totalUsed: 0, lastUpdated: new Date().toISOString() };
    }
  };

  // Add a usage record
  const addUsageRecord = (record: Omit<CreditUsageRecord, 'id' | 'timestamp'>) => {
    const history = getUsageHistory();
    
    const newRecord: CreditUsageRecord = {
      ...record,
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
    };

    const updatedHistory: CreditUsageHistory = {
      records: [newRecord, ...history.records],
      totalUsed: history.totalUsed + record.cost,
      lastUpdated: new Date().toISOString(),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
    
    return newRecord;
  };

  // Clear usage history
  const clearUsageHistory = () => {
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    getUsageHistory,
    addUsageRecord,
    clearUsageHistory,
  };
}

// Hook to check if credits are low
export function useLowCreditWarning(threshold: number = 10) {
  const { credits } = useCredits();

  const isLow = credits ? credits.credits < threshold : false;
  const percentage = credits
    ? (credits.credits / credits.total_credits) * 100
    : 100;

  return {
    isLow,
    percentage,
    currentCredits: credits?.credits || 0,
    threshold,
  };
}
