import { AlertCircle, CheckCircle2, ShieldAlert } from 'lucide-react';
import type { RiskResponse } from '../types';

type Props = { result: RiskResponse | null; error: string };

export function RiskResult({ result, error }: Props) {
  return (
    <section className="panel result-panel" id="result">
      <div className="panel-heading"><div><span className="eyebrow">RISK DECISION</span><h2>Engine output</h2></div></div>
      {!result && !error && <div className="empty-state"><ShieldAlert size={40} /><h3>Waiting for a transaction</h3><p>Submit a payment on the left to see an explainable risk decision.</p></div>}
      {error && <div className="error-state"><AlertCircle size={22} /><div><strong>Engine unavailable</strong><p>{error} Make sure the Spring Boot API is running on port 8080.</p></div></div>}
      {result && <div className="result-content">
        <div className={`verdict ${result.recommendation.toLowerCase()}`}>
          {result.recommendation === 'APPROVE' ? <CheckCircle2 /> : <ShieldAlert />}
          <div><span>RECOMMENDATION</span><strong>{result.recommendation}</strong></div>
        </div>
        <div className="score-row"><div><span>Risk score</span><strong>{Math.round(result.riskScore * 100)}%</strong></div><div className="score-track"><span style={{ width: `${Math.min(result.riskScore * 100, 100)}%` }} /></div></div>
        <div className="reason"><span>WHY THIS DECISION?</span><p>{result.reason}</p></div>
        <div className="telemetry"><div><span>Velocity · last minute</span><strong>{result.liveTelemetry.velocityLastMinute}</strong></div><div><span>Accounts on fingerprint</span><strong>{result.liveTelemetry.distinctAccountsOnDevice}</strong></div></div>
      </div>}
    </section>
  );
}
