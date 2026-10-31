import { Activity } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-[#0a0a0a]/90 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 md:px-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-5">
            <div className="flex items-center gap-2 text-white">
              <Activity className="h-5 w-5 text-[#e8993e]" />
              <span className="text-xl font-medium tracking-tight">cashpulse</span>
            </div>

            <p className="text-xs leading-relaxed text-white/60 max-w-sm">
              Alternative cash-flow intelligence and payment-discipline scoring for informal gig workers, kirana store owners, and students across India.
            </p>

            <div className="font-mono text-[11px] text-white/40">
              Piloting in Jaipur, Rajasthan • Built for India Stack DPI
            </div>
          </div>

          {/* Nav links */}
          <div className="space-y-3 md:col-span-3">
            <h4 className="font-mono text-xs uppercase tracking-wider text-white/80">
              System Navigation
            </h4>
            <ul className="space-y-2 text-xs text-white/60">
              <li><a href="#hero" className="hover:text-white transition-colors">Overview</a></li>
              <li><a href="#problem" className="hover:text-white transition-colors">The Problem (160M Invisible)</a></li>
              <li><a href="#idea" className="hover:text-white transition-colors">The Alternative Idea</a></li>
              <li><a href="#data-sources" className="hover:text-white transition-colors">Data Sources &amp; DPI</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors">8-Step Pipeline</a></li>
              <li><a href="#score" className="hover:text-white transition-colors">Scorecard Architecture</a></li>
              <li><a href="#demo" className="hover:text-white transition-colors">Interactive Simulator</a></li>
              <li><a href="#compliance" className="hover:text-white transition-colors">Privacy &amp; DPDP 2023</a></li>
            </ul>
          </div>

          {/* Research Deliverables */}
          <div className="space-y-3 md:col-span-4">
            <h4 className="font-mono text-xs uppercase tracking-wider text-white/80">
              Research Deliverables
            </h4>
            <ul className="space-y-2 text-xs text-white/60 font-mono">
              <li>
                <span className="text-white/80">research_pack.md</span> — 14-Module primary study
              </li>
              <li>
                <span className="text-white/80">verified_facts.csv</span> — 20 verified claims
              </li>
              <li>
                <span className="text-white/80">app_solution_brief.md</span> — Product specification
              </li>
              <li>
                <span className="text-white/80">honesty_report.md</span> — Statutory audit trail
              </li>
            </ul>
          </div>
        </div>

        {/* Mandatory Statutory Notice */}
        <div className="mt-12 rounded-xl border border-white/10 bg-white/5 p-4 text-[11px] leading-relaxed text-white/50">
          <strong className="text-white/80 block mb-1">
            Mandatory Statutory &amp; Regulatory Disclaimer:
          </strong>
          CashPulse is an alternative cash-flow behavioral analytics engine. It is <strong className="text-white/80">NOT</strong> a Credit Information Company (CIC) registered under the Credit Information Companies (Regulation) Act, 2005. CashPulse does not issue statutory Credit Information Reports (CIRs) or bureau credit scores (CIBIL, Experian, Equifax, CRIF High Mark). All underwriting evaluations and credit disbursal limits are executed solely by participating RBI-regulated banks and NBFCs in accordance with their internal credit policies and the RBI Master Directions.
        </div>

        {/* Copyright */}
        <div className="mt-8 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row">
          <div>
            &copy; 2026 CashPulse Technologies. All rights reserved. Zero synthetic data presented as real.
          </div>
          <div className="font-mono text-[11px]">
            WCAG AA Compliant • DPDP Act 2023 Ready
          </div>
        </div>
      </div>
    </footer>
  );
}

