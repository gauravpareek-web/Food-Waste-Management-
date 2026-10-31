import { riskRegister } from '../data/content';
import { ShieldAlert, HelpCircle } from 'lucide-react';

export default function SectionRisks() {
  const legalReviewItems = [
    {
      title: 'LSP (Lending Service Provider) Classification',
      status: 'Needs Legal Review',
      body: 'Whether a consumer personal finance application that produces a verified report shared at the user’s discretion with a lender falls under the RBI Digital Lending Directions definition of an LSP, triggering tripartite agreement and RE underwriting obligations.',
    },
    {
      title: 'Evidentiary Admissibility Under Section 65B',
      status: 'Needs Legal Review',
      body: 'Whether server-hashed SHA-256 digital verification tokens satisfy statutory electronic record certificate requirements under Section 65B of the Indian Evidence Act for institutional credit committee audit compliance.',
    },
    {
      title: 'Shared Household Income & Multi-Payer Attribution',
      status: 'Needs Legal Review',
      body: 'Legal and underwriting guidelines for attributing household rent commitments when payments are split or paid intermittently from joint family UPI accounts.',
    },
  ];

  return (
    <section id="risks" className="relative">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32 md:px-12">
        {/* Badge */}
        <div className="reveal" style={{ transitionDelay: '100ms' }}>
          <span className="inline-block border-l-2 border-white bg-white/15 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-white backdrop-blur-md drop-shadow-md">
            Risk Register
          </span>
        </div>

        <h2
          className="reveal mt-6 max-w-3xl text-3xl font-normal leading-tight tracking-tight text-white drop-shadow-lg sm:text-4xl lg:text-5xl"
          style={{ transitionDelay: '150ms' }}
        >
          Risks, operational limits, and open legal questions
        </h2>

        <p
          className="reveal mt-4 max-w-2xl text-lg text-white/70 drop-shadow-md"
          style={{ transitionDelay: '200ms' }}
        >
          Institutional rigor requires openly documenting potential failure modes, platform boundaries, and regulatory ambiguities.
        </p>

        {/* Risk Register Grid */}
        <div className="mt-14 space-y-4">
          <h3 className="text-base font-medium text-white flex items-center gap-2">
            <ShieldAlert className="h-4 w-4 text-amber-400" />
            Core Risk Register &amp; Active Mitigations
          </h3>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {riskRegister.map((r, i) => (
              <div
                key={r.risk}
                className="reveal flex flex-col justify-between rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-md"
                style={{ transitionDelay: `${250 + i * 70}ms` }}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase text-white/50">
                      {r.category}
                    </span>
                    <span
                      className={`font-mono text-[9px] uppercase px-1.5 py-0.5 rounded ${
                        r.impact === 'Critical'
                          ? 'bg-red-500/20 text-red-300'
                          : 'bg-amber-500/20 text-amber-300'
                      }`}
                    >
                      {r.impact} Impact
                    </span>
                  </div>

                  <h4 className="mt-3 text-sm font-semibold text-white">
                    {r.risk}
                  </h4>
                </div>

                <div className="mt-4 border-t border-white/10 pt-3">
                  <span className="font-mono text-[10px] uppercase text-emerald-400 block mb-1">
                    Architectural Mitigation:
                  </span>
                  <p className="text-xs text-white/75 leading-relaxed">
                    {r.mitigation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Needs Legal Review Section */}
        <div className="mt-14 space-y-4">
          <h3 className="text-base font-medium text-white flex items-center gap-2">
            <HelpCircle className="h-4 w-4 text-[#e8993e]" />
            Regulatory Ambiguities Flagged for Formal Counsel
          </h3>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {legalReviewItems.map((item, i) => (
              <div
                key={item.title}
                className="reveal rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-md"
                style={{ transitionDelay: `${400 + i * 80}ms` }}
              >
                <div className="flex items-center justify-between">
                  <span className="rounded bg-amber-500/20 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-amber-300">
                    {item.status}
                  </span>
                </div>

                <h4 className="mt-3 text-sm font-medium text-white">
                  {item.title}
                </h4>

                <p className="mt-2 text-xs text-white/70 leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

