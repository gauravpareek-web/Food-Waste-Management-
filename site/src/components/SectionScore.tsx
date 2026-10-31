import { scoreFeatures, reasonCodes } from '../data/content';
import { AlertCircle, Sliders } from 'lucide-react';

export default function SectionScore() {
  const riskBands = [
    { range: '750–850', label: 'Prime Cash-Flow', color: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400', desc: 'Consistent 6mo recurring history, >30% monthly surplus buffer.' },
    { range: '650–749', label: 'Stable', color: 'border-blue-500/30 bg-blue-500/10 text-blue-400', desc: 'Regular rent/utilities, moderate income fluctuation, positive cash surplus.' },
    { range: '550–649', label: 'Moderate', color: 'border-amber-500/30 bg-amber-500/10 text-amber-400', desc: 'Mild payment delays or high seasonality; suitable for cautious micro-limits.' },
    { range: '300–549', label: 'Cautious', color: 'border-red-500/30 bg-red-500/10 text-red-400', desc: 'Thin transaction depth (<90d) or persistent zero/negative monthly surplus.' },
  ];

  return (
    <section id="score" className="relative">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32 md:px-12">
        {/* Badge */}
        <div className="reveal" style={{ transitionDelay: '100ms' }}>
          <span className="inline-block border-l-2 border-white bg-white/15 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-white backdrop-blur-md drop-shadow-md">
            The Score Explained
          </span>
        </div>

        <h2
          className="reveal mt-6 max-w-3xl text-3xl font-normal leading-tight tracking-tight text-white drop-shadow-lg sm:text-4xl lg:text-5xl"
          style={{ transitionDelay: '150ms' }}
        >
          Cash-Flow &amp; Payment-Discipline Score
        </h2>

        {/* Statutory Disclaimer */}
        <div
          className="reveal mt-6 rounded-xl border-l-4 border-[#e8993e] border border-white/10 bg-white/5 p-4 backdrop-blur-md"
          style={{ transitionDelay: '200ms' }}
          role="note"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#e8993e]" />
            <p className="text-sm leading-relaxed text-white/85">
              <span className="font-semibold text-[#e8993e]">Statutory Notice [FACT]:</span> This is{' '}
              <strong className="underline underline-offset-2">NOT</strong> a credit bureau score issued under the Credit Information Companies (Regulation) Act, 2005. It does not replace statutory credit reports (CIBIL, Experian, Equifax, CRIF High Mark) and is intended solely as an alternative cash-flow underwriting signal for participating regulated institutions.
            </p>
          </div>
        </div>

        {/* Two-column layout: Left = Formula & Features, Right = Reason Codes & Risk Bands */}
        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Left Column */}
          <div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-[0.15em] text-white/60">
                Score Range: 300 – 850
              </span>
              <span className="rounded-full bg-amber-500/20 px-2 py-0.5 font-mono text-[10px] uppercase text-amber-400">
                Proposed Architecture
              </span>
            </div>

            {/* Formula box */}
            <div
              className="reveal mt-4 rounded-xl border border-white/15 bg-white/10 p-5 backdrop-blur-md"
              style={{ transitionDelay: '250ms' }}
            >
              <div className="font-mono text-lg font-medium text-[#e8993e] sm:text-xl">
                Score = 300 + 550 × ∑(wᵢ × sᵢ)
              </div>
              <p className="mt-2 text-xs leading-relaxed text-white/60">
                Where <code className="text-white/80">wᵢ</code> = feature weighting, and{' '}
                <code className="text-white/80">sᵢ ∈ [0, 1]</code> = normalized performance metric calculated over a trailing 90-to-180 day window.
              </p>
            </div>

            {/* Feature weights table */}
            <div className="mt-8 space-y-4">
              <h3 className="flex items-center gap-2 text-base font-medium text-white">
                <Sliders className="h-4 w-4 text-[#e8993e]" />
                Feature Weights &amp; Rationale
              </h3>

              {scoreFeatures.map((f, i) => (
                <div
                  key={f.id}
                  className="reveal rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md"
                  style={{ transitionDelay: `${300 + i * 80}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-white">{f.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-semibold text-[#e8993e]">
                        {f.weight}%
                      </span>
                      <span className="rounded bg-amber-500/20 px-1.5 py-0.5 font-mono text-[9px] uppercase text-amber-400">
                        Proposed
                      </span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-[#e8993e]"
                      style={{ width: `${(f.weight / 30) * 100}%` }}
                    />
                  </div>

                  <p className="mt-2 text-xs leading-relaxed text-white/60">
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Reason Codes & Risk Bands */}
          <div className="space-y-8">
            {/* Reason Codes */}
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-base font-medium text-white">
                  Automated Adverse Action Reason Codes
                </h3>
                <span className="rounded bg-amber-500/20 px-2 py-0.5 font-mono text-[10px] uppercase text-amber-400">
                  Proposed
                </span>
              </div>
              <p className="mt-1 text-xs text-white/60">
                Transparent diagnostic codes returned with every score to eliminate black-box algorithmic rejection.
              </p>

              <div className="mt-4 space-y-2.5">
                {reasonCodes.map((rc, i) => (
                  <div
                    key={rc.code}
                    className="reveal flex items-start gap-3 rounded-lg border border-white/10 bg-white/5 p-3 backdrop-blur-md"
                    style={{ transitionDelay: `${350 + i * 70}ms` }}
                  >
                    <span className="shrink-0 rounded bg-white/10 px-2 py-1 font-mono text-xs font-semibold text-[#e8993e]">
                      {rc.code}
                    </span>
                    <p className="text-xs leading-relaxed text-white/80">
                      {rc.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Risk Bands */}
            <div className="pt-4">
              <h3 className="text-base font-medium text-white">
                Underwriting Risk Tiers
              </h3>
              <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {riskBands.map((rb, i) => (
                  <div
                    key={rb.range}
                    className={`reveal rounded-xl border p-3.5 backdrop-blur-md ${rb.color}`}
                    style={{ transitionDelay: `${450 + i * 70}ms` }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm font-semibold">
                        {rb.range}
                      </span>
                      <span className="text-xs font-medium">{rb.label}</span>
                    </div>
                    <p className="mt-2 text-[11px] leading-relaxed text-white/70">
                      {rb.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

