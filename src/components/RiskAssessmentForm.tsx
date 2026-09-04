import { useState } from 'react';
import { Send, Loader2, RotateCcw } from 'lucide-react';
import type { TransactionForm } from '../types';

type Props = { onSubmit: (payload: TransactionForm) => void; loading: boolean };

const initial: TransactionForm = { userId: 'user_1024', amount: 2500, currency: 'INR', ipAddress: '103.21.44.18', cardFingerprint: 'fp_demo_001' };

export function RiskAssessmentForm({ onSubmit, loading }: Props) {
  const [form, setForm] = useState(initial);
  const update = (key: keyof TransactionForm, value: string) => setForm(prev => ({ ...prev, [key]: value }));

  return (
    <section className="panel" id="assess">
      <div className="panel-heading"><div><span className="eyebrow">TRANSACTION INPUT</span><h2>Assess a payment</h2></div><button className="ghost" onClick={() => setForm(initial)} title="Reset"><RotateCcw size={16} /></button></div>
      <form onSubmit={e => { e.preventDefault(); onSubmit(form); }}>
        <div className="field-grid">
          <label>User ID<input value={form.userId} onChange={e => update('userId', e.target.value)} required /></label>
          <label>Amount<input type="number" min="0" value={form.amount} onChange={e => update('amount', e.target.value)} required /></label>
          <label>Currency<select value={form.currency} onChange={e => update('currency', e.target.value)}><option>INR</option><option>USD</option><option>EUR</option></select></label>
          <label>IP Address<input value={form.ipAddress} onChange={e => update('ipAddress', e.target.value)} required /></label>
          <label className="full">Card / Device Fingerprint<input value={form.cardFingerprint} onChange={e => update('cardFingerprint', e.target.value)} required /></label>
        </div>
        <button className="primary" disabled={loading}>{loading ? <><Loader2 className="spin" size={18} /> Assessing...</> : <><Send size={18} /> Run risk assessment</>}</button>
      </form>
      <div className="signal-list"><span>✓ 60-second velocity</span><span>✓ device sharing</span><span>✓ high-ticket anomaly</span></div>
    </section>
  );
}
