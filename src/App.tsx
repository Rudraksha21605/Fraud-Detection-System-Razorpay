import { useState } from 'react';
import { ShieldCheck, Activity, AlertTriangle, Ban, CheckCircle2 } from 'lucide-react';
import { Header } from './components/Header';
import { MetricCard } from './components/MetricCard';
import { RiskAssessmentForm } from './components/RiskAssessmentForm';
import { RiskResult } from './components/RiskResult';
import type { RiskResponse, TransactionForm } from './types';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080/api/v1/risk/assess';

export default function App() {
  const [result, setResult] = useState<RiskResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function assessTransaction(payload: TransactionForm) {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, amount: Number(payload.amount) }),
      });
      if (!response.ok) throw new Error('Risk engine returned an error.');
      setResult(await response.json());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to connect to the risk engine.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app-shell">
      <Header />
      <main className="container">
        <section className="hero">
          <div>
            <span className="eyebrow"><ShieldCheck size={16} /> PAYMENT RISK ENGINE</span>
            <h1>Real-time fraud intelligence for every transaction.</h1>
            <p>Assess checkout velocity, account-device sharing and high-value transactions through a transparent, componentized risk workflow.</p>
          </div>
          <div className="hero-status"><span className="status-dot" /> Engine online</div>
        </section>

        <section className="metrics">
          <MetricCard icon={<Activity />} label="Risk Signals" value="3" helper="Active detection vectors" />
          <MetricCard icon={<AlertTriangle />} label="Challenge Threshold" value="0.40" helper="Adaptive review boundary" />
          <MetricCard icon={<Ban />} label="Block Threshold" value="0.75" helper="Automated mitigation boundary" />
          <MetricCard icon={<CheckCircle2 />} label="Decision Modes" value="3" helper="Approve · Challenge · Block" />
        </section>

        <section className="dashboard-grid">
          <RiskAssessmentForm onSubmit={assessTransaction} loading={loading} />
          <RiskResult result={result} error={error} />
        </section>

        <footer>Built for Razorpay Builderthon · Explainable transaction risk scoring</footer>
      </main>
    </div>
  );
}
