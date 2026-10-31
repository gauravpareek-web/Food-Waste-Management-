import { BarChart3, Scale, Eye, ShieldCheck, Lock } from 'lucide-react';

export default function SectionTrust() {
  const trustPillars = [
    {
      icon: BarChart3,
      title: 'Statistical Validation & Back-Testing',
      tag: 'Proposed Framework',
      desc: 'Validated via Gini coefficient, Kolmogorov-Smirnov (KS) statistic, AUC-ROC benchmarking, and Population Stability Index (PSI) drift monitoring across economic cycles.',
    },
    {
      icon: Scale,
      title: 'Demographic Fairness & Bias Audits',
      tag: 'Proposed Framework',
      desc: 'Strict statistical parity testing across gender, regional, and occupational cohorts to ensure alternative scoring does not replicate systemic socio-economic biases.',
    },
    {
      icon: Eye,
      title: 'Explainability & Adverse Action',
      tag: 'Proposed Framework',
      desc: 'No black-box neural networks. Every score is decomposed into transparent Shapley additive explanations (SHAP) and standardized reason codes (RC01–RC05).',
    },
    {
      icon: ShieldCheck,
      title: 'Safe-Lending Architecture',
      tag: 'RBI Sourced [FACT]',
      desc: 'Designed around conservative initial limits (max ₹25,000), milestone-based step-ups, and mandatory compliance with the RBI 50% household income ceiling.',
    },
  ];

  const antiFraudMeasures = [
    'Cryptographic SHA-256 digital signature embedded in every generated ledger report',
    'Instant QR verification endpoint (verify.cashpulse.in) for lender back-office auditing',
    'RBI Account Aggregator direct bank-to-lender data flow eliminates client-side PDF tampering',
    'Automated PDF forensic analysis (metadata inspect, font consistency, and line-by-line mathematical balance checks)',
    'Synthetic identity detection via cross-validation of PAN, Aadhaar eKYC, and bank VPA holders',
  ];

  return (
    <section id="trust" className="relative">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32 md:px-12">
        {/* Badge */}
        <div className="reveal" style={{ transitionDelay: '100ms' }}>
          <span className="inline-block border-l-2 border-white bg-white/15 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-white backdrop-blur-md drop-shadow-md">
            Institutional Trust
          </span>
        </div>

        <h2
          className="reveal mt-6 max-w-3xl text-3xl font-normal leading-tight tracking-tight text-white drop-shadow-lg sm:text-4xl lg:text-5xl"
          style={{ transitionDelay: '150ms' }}
        >
          How lenders can trust an alternative score
        </h2>

        <p
          className="reveal mt-4 max-w-2xl text-lg text-white/70 drop-shadow-md"
          style={{ transitionDelay: '200ms' }}
        >
          Institutional credit committees require verifiable mathematical validation, complete explainability, and ironclad anti-fraud defenses before writing loans.
        </p>

        {/* 4 Pillars Grid */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {trustPillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="reveal rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-md"
                style={{ transitionDelay: `${250 + i * 80}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-[#e8993e]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="rounded bg-white/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-white/60">
                    {p.tag}
                  </span>
                </div>

                <h3 className="mt-4 text-base font-medium text-white sm:text-lg">
                  {p.title}
                </h3>

                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-white/70">
                  {p.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Anti-Fraud Architecture Panel */}
        <div
          className="reveal mt-12 rounded-2xl border-l-4 border-[#e8993e] border border-white/15 bg-white/5 p-6 backdrop-blur-md sm:p-8"
          style={{ transitionDelay: '550ms' }}
        >
          <div className="flex items-center gap-3">
            <Lock className="h-6 w-6 text-[#e8993e]" />
            <h3 className="text-lg font-medium text-white">
              Anti-Fraud &amp; Statement Integrity Architecture
            </h3>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {antiFraudMeasures.map((measure) => (
              <div key={measure} className="flex items-start gap-2.5 text-xs text-white/80">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#e8993e]" />
                <span className="leading-relaxed">{measure}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

