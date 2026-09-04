import { ShieldCheck, Github } from 'lucide-react';

export function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="brand"><span className="brand-mark"><ShieldCheck size={22} /></span><span>Razor<span>Guard</span></span></div>
        <nav><a href="#assess">Assess</a><a href="#result">Decision</a><a href="https://github.com/Rudraksha21605/Fraud-Detection-System-Razorpay" target="_blank" rel="noreferrer"><Github size={16} /> GitHub</a></nav>
      </div>
    </header>
  );
}
