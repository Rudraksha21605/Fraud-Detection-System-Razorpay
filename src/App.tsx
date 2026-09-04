import { useState } from 'react';
import { ShieldCheck, Activity, AlertTriangle, Ban, CheckCircle2, Gauge, Clock3 } from 'lucide-react';
import { Header } from './components/Header';
import { MetricCard } from './components/MetricCard';
import { RiskAssessmentForm } from './components/RiskAssessmentForm';
import { RiskResult } from './components/RiskResult';
import type { RiskResponse, TransactionForm } from './types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1/risk/assess';

const demoTransactions: TransactionForm[] = [
  { userId: 'user_safe', amount: 1200, currency: 'INR', ipAddress: '103.21.44.18', cardFingerprint: 'fp_safe_001' },
  { userId: 'user_high_value', amount: 200000, currency: 'INR', ipAddress: '103.21.44.19', cardFingerprint: 'fp_high_001' },
  { userId: 'user_demo', amount: 75000, currency: 'INR', ipAddress: '103.21.44.20', cardFingerprint: 'fp_demo_001' },
];

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
      const data: unknown = await response.json().catch(() => null);
      if (!response.ok) {
        const message = typeof data === 'object' && data !== null && 'message' in data
          ? String((data as { message?: unknown }).message)
          : 'Risk engine rejected the request.';
        throw new Error(message);
      }
      setResult(data as RiskResponse);
    } catch (err) {
      setResult(null);
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
            <span className="eyebrow"><ShieldCheck size={16} /> RAZORGUARD · PAYMENT RISK</span>
            <h1>Real-time fraud intelligence for every transaction.</h1>
            <p>Component-based risk scoring with explainable signals, live telemetry and clear payment decisions.</p>
          </div>
          <div className="hero-status"><span className="status-dot" /> Risk engine ready</div>
        </section>

        <section className="metrics">
          <MetricCard icon={<Activity />} label="Detection Signals" value="3" helper="Velocity · device · amount" />
          <MetricCard icon={<AlertTriangle />} label="Challenge" value="40%" helper="Verification boundary" />
          <MetricCard icon={<Ban />} label="Block" value="75%" helper="Mitigation boundary" />
          <MetricCard icon={<CheckCircle2 />} label="Decision Modes" value="3" helper="Approve · Challenge · Block" />
        </section>

        <section className="demo-strip">
          <div><Gauge size={18} /><div><strong>Demo scenarios</strong><span>Test the engine without typing sample data.</span></div></div>
          <div className="demo-buttons">
            {demoTransactions.map((demo, index) => (
              <button key={demo.userId} className="demo-button" onClick={() => assessTransaction(demo)} disabled={loading}>
                <Clock3 size={13} /> {index === 0 ? 'Normal' : index === 1 ? 'High value' : 'Device test'}
              </button>
            ))}
          </div>
        </section>

        <section className="dashboard-grid">
          <RiskAssessmentForm onSubmit={assessTransaction} loading={loading} />
          <RiskResult result={result} error={error} />
        </section>

        <footer>RazorGuard · Explainable fraud intelligence · Built for Razorpay Builderthon</footer>
      </main>
    </div>
  );
}
