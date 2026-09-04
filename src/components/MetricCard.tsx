import type { ReactNode } from 'react';

type Props = { icon: ReactNode; label: string; value: string; helper: string };

export function MetricCard({ icon, label, value, helper }: Props) {
  return (
    <article className="metric-card">
      <div className="metric-icon">{icon}</div>
      <div><div className="metric-label">{label}</div><div className="metric-value">{value}</div><div className="metric-helper">{helper}</div></div>
    </article>
  );
}
