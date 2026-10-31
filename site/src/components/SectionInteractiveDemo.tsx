import { useState, useId } from 'react';
import { Calculator, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function SectionInteractiveDemo() {
  const inflowId = useId();
  const outflowId = useId();
  const regularityId = useId();
  const stabilityId = useId();
  const bufferDaysId = useId();

  // State sliders
  const [inflow, setInflow] = useState(25000);
  const [outflow, setOutflow] = useState(18000);
  const [regularity, setRegularity] = useState(90);
  const [stability, setStability] = useState(80);
  const [bufferDays, setBufferDays] = useState(20);

  // Dynamic calculations
  const surplus = Math.max(inflow - outflow, 0);

  // Normalized scoring factors
  const s1 = regularity / 100; // 30% weight
  const s2 = inflow > 0 ? Math.min(Math.max(surplus / (inflow * 0.35), 0), 1) : 0; // 25% weight
  const s3 = stability / 100; // 20% weight
  const s4 = Math.min(bufferDays / 25, 1); // 15% weight
  const s5 = 0.9; // 10% weight (simulated active days)

  const weightedSum =
    0.3 * s1 + 0.25 * s2 + 0.2 * s3 + 0.15 * s4 + 0.1 * s5;

  const score = Math.round(300 + 550 * weightedSum);

  // Safe limit heuristic [Proposed]
  const maxSafeEmi = Math.round(surplus * 0.35);
  const suggestedLimit = Math.min(maxSafeEmi * 6, 25000);
  const emiToIncomePct = inflow > 0 ? ((maxSafeEmi / inflow) * 100).toFixed(1) : '0';

  // Dynamic Reason Codes
  const activeReasonCodes: string[] = [];
  if (regularity < 80) activeReasonCodes.push('RC01: Recurring payment irregularity flagged');
  if (stability < 65) activeReasonCodes.push('RC02: High month-to-month income variance');
  if (surplus < inflow * 0.15) activeReasonCodes.push('RC03: Thin cash-flow surplus (<15% of revenue)');
  if (bufferDays < 10) activeReasonCodes.push('RC04: Liquidity cushion below 10 buffer days');

  return (
    <section id="demo" className="relative">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32 md:px-12">
        {/* Badge */}
        <div className="reveal" style={{ transitionDelay: '100ms' }}>
          <span className="inline-block border-l-2 border-white bg-white/15 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-white backdrop-blur-md drop-shadow-md">
            Interactive Simulator
          </span>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <h2
            className="reveal text-3xl font-normal leading-tight tracking-tight text-white drop-shadow-lg sm:text-4xl lg:text-5xl"
            style={{ transitionDelay: '150ms' }}
          >
            Live Score &amp; Credit Limit Engine
          </h2>

          <div className="flex items-center gap-2">
            <span className="rounded-full bg-amber-500/20 px-3 py-1 font-mono text-xs uppercase text-amber-300">
              Simulated Data
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1 font-mono text-xs uppercase text-white/60">
              Formula Visible
            </span>
          </div>
        </div>

        <p
          className="reveal mt-4 max-w-2xl text-lg text-white/70 drop-shadow-md"
          style={{ transitionDelay: '200ms' }}
        >
          Adjust the borrower telemetry below to observe real-time score adjustment, automatic reason code triggers, and conservative limit step-up derivation.
        </p>

        {/* Simulator Grid */}
        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Controls Column (7 Cols) */}
          <div className="space-y-6 lg:col-span-7">
            {/* Slider 1: Monthly Inflow */}
            <div className="rounded-xl border border-white/15 bg-white/10 p-5 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <label htmlFor={inflowId} className="text-sm font-medium text-white cursor-pointer">
                  Average Monthly Inflow
                </label>
                <span className="font-mono text-base font-semibold text-[#e8993e]">
                  ₹{inflow.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                id={inflowId}
                type="range"
                min={10000}
                max={60000}
                step={1000}
                value={inflow}
                onChange={(e) => setInflow(Number(e.target.value))}
                className="mt-3 w-full accent-[#e8993e] cursor-pointer"
                aria-label="Average Monthly Inflow"
              />
              <div className="mt-1 flex justify-between font-mono text-[10px] text-white/40">
                <span>₹10,000</span>
                <span>₹60,000</span>
              </div>
            </div>

            {/* Slider 2: Monthly Outflow */}
            <div className="rounded-xl border border-white/15 bg-white/10 p-5 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <label htmlFor={outflowId} className="text-sm font-medium text-white cursor-pointer">
                  Monthly Living &amp; Business Expenses
                </label>
                <span className="font-mono text-base font-semibold text-white">
                  ₹{outflow.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                id={outflowId}
                type="range"
                min={5000}
                max={50000}
                step={1000}
                value={outflow}
                onChange={(e) => setOutflow(Number(e.target.value))}
                className="mt-3 w-full accent-[#e8993e] cursor-pointer"
                aria-label="Monthly Living & Business Expenses"
              />
              <div className="mt-1 flex justify-between font-mono text-[10px] text-white/40">
                <span>₹5,000</span>
                <span>₹50,000</span>
              </div>
            </div>

            {/* Slider 3: Rent Regularity */}
            <div className="rounded-xl border border-white/15 bg-white/10 p-5 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <label htmlFor={regularityId} className="text-sm font-medium text-white cursor-pointer">
                  Recurring Payment Regularity (Rent &amp; Utilities)
                </label>
                <span className="font-mono text-base font-semibold text-emerald-400">
                  {regularity}%
                </span>
              </div>
              <input
                id={regularityId}
                type="range"
                min={40}
                max={100}
                step={5}
                value={regularity}
                onChange={(e) => setRegularity(Number(e.target.value))}
                className="mt-3 w-full accent-[#e8993e] cursor-pointer"
                aria-label="Recurring Payment Regularity"
              />
              <div className="mt-1 flex justify-between font-mono text-[10px] text-white/40">
                <span>40% (Irregular)</span>
                <span>100% (Flawless)</span>
              </div>
            </div>

            {/* Slider 4: Income Stability */}
            <div className="rounded-xl border border-white/15 bg-white/10 p-5 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <label htmlFor={stabilityId} className="text-sm font-medium text-white cursor-pointer">
                  Inflow Stability (Inverse of Volatility)
                </label>
                <span className="font-mono text-base font-semibold text-blue-400">
                  {stability}%
                </span>
              </div>
              <input
                id={stabilityId}
                type="range"
                min={30}
                max={100}
                step={5}
                value={stability}
                onChange={(e) => setStability(Number(e.target.value))}
                className="mt-3 w-full accent-[#e8993e] cursor-pointer"
                aria-label="Inflow Stability"
              />
              <div className="mt-1 flex justify-between font-mono text-[10px] text-white/40">
                <span>30% (High Variance)</span>
                <span>100% (Predictable)</span>
              </div>
            </div>

            {/* Slider 5: Balance Buffer Days */}
            <div className="rounded-xl border border-white/15 bg-white/10 p-5 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <label htmlFor={bufferDaysId} className="text-sm font-medium text-white cursor-pointer">
                  Days Per Month With Positive Liquidity Buffer
                </label>
                <span className="font-mono text-base font-semibold text-white">
                  {bufferDays} days
                </span>
              </div>
              <input
                id={bufferDaysId}
                type="range"
                min={0}
                max={30}
                step={1}
                value={bufferDays}
                onChange={(e) => setBufferDays(Number(e.target.value))}
                className="mt-3 w-full accent-[#e8993e] cursor-pointer"
                aria-label="Days Per Month With Positive Liquidity Buffer"
              />
              <div className="mt-1 flex justify-between font-mono text-[10px] text-white/40">
                <span>0 days</span>
                <span>30 days</span>
              </div>
            </div>
          </div>

          {/* Results Column (5 Cols) */}
          <div className="space-y-6 lg:col-span-5">
            {/* Output Score Card */}
            <div className="rounded-2xl border border-white/20 bg-white/[0.08] p-6 backdrop-blur-xl shadow-xl">
              <span className="font-mono text-xs uppercase tracking-wider text-white/50 block">
                Calculated Score Result
              </span>

              <div className="mt-4 flex items-baseline justify-between">
                <div className="text-6xl font-bold tracking-tight text-[#e8993e]">
                  {score}
                </div>
                <div className="text-right">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                      score >= 750
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : score >= 650
                        ? 'bg-blue-500/20 text-blue-300'
                        : score >= 550
                        ? 'bg-amber-500/20 text-amber-300'
                        : 'bg-red-500/20 text-red-300'
                    }`}
                  >
                    {score >= 750
                      ? 'Prime Cash-Flow'
                      : score >= 650
                      ? 'Stable'
                      : score >= 550
                      ? 'Moderate Risk'
                      : 'High Caution'}
                  </span>
                  <span className="font-mono text-[11px] text-white/40 block mt-1">
                    Scale: 300–850
                  </span>
                </div>
              </div>

              {/* Surplus & Heuristic Limit */}
              <div className="mt-6 border-t border-white/15 pt-5 space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-white/70">Verified Monthly Surplus:</span>
                  <span className="font-mono font-semibold text-white">
                    ₹{surplus.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-white/70">Max Cautious EMI (35% surplus):</span>
                  <span className="font-mono font-semibold text-emerald-400">
                    ₹{maxSafeEmi.toLocaleString('en-IN')}/mo
                  </span>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <span className="font-mono text-[10px] uppercase text-[#e8993e] tracking-wider block">
                    Recommended First-Loan Limit [Proposed]
                  </span>
                  <div className="mt-1 font-mono text-3xl font-bold text-white">
                    ₹{suggestedLimit.toLocaleString('en-IN')}
                  </div>
                  <p className="mt-1 text-[11px] text-white/50">
                    Capped at 6× monthly EMI capacity (max ₹25,000 initial step-up).
                  </p>
                </div>

                {/* Regulatory 50% Compliance Badge */}
                <div className="flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-3 text-xs text-emerald-300">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>
                    <strong>RBI Compliant:</strong> Projected EMI is {emiToIncomePct}% of income (ceiling is 50% of household income under RBI MFI Directions [FACT]).
                  </span>
                </div>
              </div>

              {/* Active Reason Codes */}
              <div className="mt-6 border-t border-white/15 pt-5">
                <span className="font-mono text-xs uppercase tracking-wider text-white/60 block mb-2">
                  Adverse Reason Triggers:
                </span>

                {activeReasonCodes.length > 0 ? (
                  <div className="space-y-1.5">
                    {activeReasonCodes.map((rc) => (
                      <div
                        key={rc}
                        className="flex items-center gap-2 text-xs text-amber-300 font-mono bg-amber-500/10 rounded p-2"
                      >
                        <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                        <span>{rc}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-xs text-emerald-400 flex items-center gap-1.5 bg-emerald-500/10 rounded p-2 font-mono">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>No adverse reason codes triggered for this profile</span>
                  </div>
                )}
              </div>
            </div>

            {/* Formula Explainer Widget */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-xs text-white/60 leading-relaxed">
              <span className="font-semibold text-white block mb-1 flex items-center gap-1.5">
                <Calculator className="h-3.5 w-3.5 text-[#e8993e]" />
                Transparent Formula Transparency
              </span>
              Calculated dynamically via <code>Score = 300 + 550 × [0.30(Regularity) + 0.25(Surplus) + 0.20(Stability) + 0.15(Buffer) + 0.10(Active)]</code>.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

