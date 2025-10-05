// Credits Management Types

export interface CreditCosts {
  standard: number;
  extended: number;
  custom: number;
  instrumental: number;
}

export const CREDIT_COSTS: CreditCosts = {
  standard: 5,
  extended: 10,
  custom: 8,
  instrumental: 3,
};

export interface CreditUsageRecord {
  id: string;
  timestamp: string;
  type: 'standard' | 'extended' | 'custom' | 'instrumental';
  cost: number;
  trackTitle?: string;
  trackId?: string;
}

export interface CreditUsageHistory {
  records: CreditUsageRecord[];
  totalUsed: number;
  lastUpdated: string;
}

export interface CreditAnalytics {
  daily: {
    date: string;
    used: number;
  }[];
  weekly: {
    week: string;
    used: number;
  }[];
  totalThisWeek: number;
  totalThisMonth: number;
  averagePerDay: number;
}

export interface LowCreditWarning {
  show: boolean;
  threshold: number;
  currentCredits: number;
}
