import { QrCode, ShieldCheck, CheckCircle2, FileText, Download } from 'lucide-react';

export default function SectionPdfReport() {
  return (
    <section id="pdf-report" className="relative">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32 md:px-12">
        {/* Badge */}
        <div className="reveal" style={{ transitionDelay: '100ms' }}>
          <span className="inline-block border-l-2 border-white bg-white/15 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-white backdrop-blur-md drop-shadow-md">
            The Monthly PDF Report
          </span>
        </div>

        <h2
          className="reveal mt-6 max-w-3xl text-3xl font-normal leading-tight tracking-tight text-white drop-shadow-lg sm:text-4xl lg:text-5xl"
          style={{ transitionDelay: '150ms' }}
        >
          A report lenders can verify and trust
        </h2>

        <p
          className="reveal mt-4 max-w-2xl text-lg text-white/70 drop-shadow-md"
          style={{ transitionDelay: '200ms' }}
        >
          Every report features a server-signed SHA-256 cryptographic hash and QR code, completely eliminating the vulnerability of user-edited PDF statements.
        </p>

        {/* Mock PDF Document Container */}
        <div
          className="reveal mx-auto mt-14 max-w-2xl overflow-hidden rounded-2xl border border-white/20 bg-white/[0.07] shadow-2xl backdrop-blur-xl"
          style={{ transitionDelay: '250ms' }}
          role="region"
          aria-label="Simulated Monthly PDF Report"
        >
          {/* Document Top Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/15 bg-white/10 px-6 py-4">
            <div className="flex items-center gap-2.5">
              <FileText className="h-5 w-5 text-[#e8993e]" />
              <span className="text-sm font-semibold text-white tracking-wide">
                CashPulse Verified Ledger Report
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="rounded-full bg-amber-500/20 px-2.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider text-amber-300">
                Simulated Data
              </span>
              <span className="font-mono text-xs text-white/50">
                Cycle: Oct 2026
              </span>
            </div>
          </div>

          {/* Document Content */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* User Meta Row */}
            <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-center">
              <div>
                <h4 className="text-lg font-medium text-white">Rajesh Sharma</h4>
                <p className="font-mono text-xs text-white/60">
                  Gig Delivery Partner • Jaipur, Rajasthan
                </p>
              </div>

              <div className="text-left sm:text-right">
                <span className="font-mono text-xs text-white/40 block">
                  Identity Token: ****-****-7842
                </span>
                <span className="font-mono text-[11px] text-emerald-400 flex items-center gap-1 sm:justify-end mt-1">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  RBI AA Consent Verified
                </span>
              </div>
            </div>

            {/* Score & Gauge Block */}
            <div className="grid grid-cols-1 items-center gap-6 rounded-xl border border-white/10 bg-white/5 p-5 sm:grid-cols-3">
              <div className="flex flex-col items-center justify-center text-center sm:border-r sm:border-white/10 sm:pr-4">
                <span className="font-mono text-[11px] uppercase tracking-wider text-white/50">
                  Discipline Score
                </span>
                <div className="mt-2 text-4xl font-bold text-[#e8993e]">735</div>
                <span className="mt-1 rounded-full bg-blue-500/20 px-2 py-0.5 text-xs font-medium text-blue-300">
                  Stable Profile
                </span>
              </div>

              <div className="sm:col-span-2 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/70">Top Positive Factor:</span>
                  <span className="font-medium text-emerald-300">
                    6/6 Consecutive Rent UPI Credits
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/70">Primary Adverse Code:</span>
                  <span className="font-mono text-amber-300">
                    RC01 (Rent delayed 4d in Aug)
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/70">Observation Period:</span>
                  <span className="font-mono text-white/90">
                    180 Days Continuous Telemetry
                  </span>
                </div>
              </div>
            </div>

            {/* Financial Summary 4-Grid */}
            <div>
              <h5 className="font-mono text-xs uppercase tracking-wider text-white/60 mb-3">
                Monthly Inflow &amp; Cash-Flow Telemetry
              </h5>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                  <span className="block font-mono text-[10px] text-white/50">Avg Inflow</span>
                  <span className="font-mono text-sm font-semibold text-white">₹24,500</span>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                  <span className="block font-mono text-[10px] text-white/50">Avg Outflow</span>
                  <span className="font-mono text-sm font-semibold text-white">₹18,200</span>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                  <span className="block font-mono text-[10px] text-white/50">Net Surplus</span>
                  <span className="font-mono text-sm font-semibold text-[#e8993e]">₹6,300</span>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                  <span className="block font-mono text-[10px] text-white/50">Buffer Days</span>
                  <span className="font-mono text-sm font-semibold text-emerald-400">22 / mo</span>
                </div>
              </div>
            </div>

            {/* Recurring Obligations Table */}
            <div>
              <h5 className="font-mono text-xs uppercase tracking-wider text-white/60 mb-3">
                Verified Recurring Payees (UPI VPA Fingerprints)
              </h5>
              <div className="overflow-hidden rounded-lg border border-white/10 bg-white/5">
                <div className="divide-y divide-white/10 text-xs">
                  <div className="flex items-center justify-between p-3">
                    <div>
                      <span className="font-medium text-white block">Landlord Rent (VPA: rathore.rent@sbi)</span>
                      <span className="text-[11px] text-white/50">Matched 6 of 6 months</span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-medium text-white block">₹6,500 / mo</span>
                      <span className="text-emerald-400 text-[10px] flex items-center gap-1 justify-end">
                        <CheckCircle2 className="h-3 w-3" /> Consistent
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3">
                    <div>
                      <span className="font-medium text-white block">Jaipur Vidyut Vitran (Electricity)</span>
                      <span className="text-[11px] text-white/50">Matched 6 of 6 months</span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-medium text-white block">₹1,200 / mo</span>
                      <span className="text-emerald-400 text-[10px] flex items-center gap-1 justify-end">
                        <CheckCircle2 className="h-3 w-3" /> Paid on time
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Lender Underwriting Limit Recommendation */}
            <div className="rounded-xl border border-white/15 bg-white/10 p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h5 className="text-sm font-medium text-white">
                  Recommended Micro-Credit Limit
                </h5>
                <span className="rounded bg-amber-500/20 px-1.5 py-0.5 font-mono text-[9px] uppercase text-amber-300">
                  Proposed Limit Heuristic
                </span>
              </div>

              <div className="mt-3 flex flex-col justify-between gap-4 sm:flex-row sm:items-baseline">
                <div>
                  <div className="font-mono text-2xl font-bold text-[#e8993e]">
                    ₹13,230
                  </div>
                  <p className="mt-1 font-mono text-[11px] text-white/60">
                    Max Safe EMI: ₹2,205/mo (35% of verified ₹6,300 surplus)
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <span className="inline-block rounded bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] text-emerald-400 border border-emerald-500/20">
                    Within RBI 50% Household Income Cap [FACT]
                  </span>
                  <p className="mt-1 text-[10px] text-white/50">
                    Step-up tranche: eligible for limit increase after 90 days on-time repayment.
                  </p>
                </div>
              </div>
            </div>

            {/* Verification & Anti-Fraud Footer */}
            <div className="flex flex-col items-center justify-between gap-4 border-t border-white/15 pt-5 sm:flex-row">
              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-white/20 bg-white p-1 text-black">
                  <QrCode className="h-12 w-12" />
                </div>
                <div>
                  <span className="font-mono text-[10px] text-white/50 block">
                    Cryptographic SHA-256 Hash:
                  </span>
                  <code className="font-mono text-[10px] text-[#e8993e] block">
                    a3f890b4e12c5d88f912c4789b52a...9c2d
                  </code>
                  <span className="text-[10px] text-white/40 block mt-0.5">
                    Scan or query via <code>https://verify.cashpulse.in/audit</code>
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-4 py-2 font-mono text-xs text-white hover:bg-white/20 transition-colors"
                onClick={() => alert('Demo simulated PDF download.')}
              >
                <Download className="h-3.5 w-3.5" />
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

