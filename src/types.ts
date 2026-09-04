export type TransactionForm = {
  userId: string;
  amount: number | string;
  currency: string;
  ipAddress: string;
  cardFingerprint: string;
};

export type RiskResponse = {
  userId: string;
  riskScore: number;
  recommendation: 'APPROVE' | 'CHALLENGE' | 'BLOCK';
  reason: string;
  liveTelemetry: {
    velocityLastMinute: number;
    distinctAccountsOnDevice: number;
  };
};
