import { User, Building2, CheckCircle2 } from 'lucide-react';

export default function SectionBenefits() {
  const borrowerBenefits = [
    { title: 'Escape Predatory Rates', desc: 'Transition from informal moneylenders charging 24%–60%+ APR [FACT] to formal NBFC/MFI micro-credit at 18%–28%.' },
    { title: 'Visible Financial Footprint', desc: 'Turn everyday UPI merchant payments, gig payouts, and rent into an auditable, lender-recognized track record.' },
    { title: 'Pre-Application Readiness', desc: 'Understand your borrowing capacity and receive adverse reason diagnostics before undergoing formal bank inquiries.' },
    { title: 'Granular Privacy Toggles', desc: 'Full control over data ingestion with purpose-limited, time-bound consent under the DPDP Act 2023.' },
    { title: 'Right to Complete Erasure', desc: 'One-click data deletion wipes transaction histories and verification tokens from the active ledger.' },
    { title: 'Collateral-Free Inclusion', desc: 'No property hypothecation or gold pledge required — proven spending and payment discipline is your collateral.' },
  ];

  const lenderBenefits = [
    { title: 'Tap 160M+ New Borrowers', desc: 'Underwrite India’s vast credit-invisible and new-to-credit population [FACT] with objective behavioral telemetry.' },
    { title: 'Instant Capacity Modeling', desc: 'Automated extraction of net cash-flow surplus, revenue volatility, and buffer metrics in seconds instead of days.' },
    { title: 'Drastic Cost Reduction', desc: 'Eliminate expensive manual physical branch verifications and paper statement collection.' },
    { title: 'Tamper-Evident Anti-Fraud', desc: 'Cryptographic SHA-256 server hashes and instant QR lookups eliminate edited PDF statement risks.' },
    { title: 'Regulatory Safe-Lending', desc: 'Pre-calculated stepped limits maintain strict adherence to the RBI 50% household debt-servicing ceiling [FACT].' },
    { title: 'Champion-Challenger Testing', desc: 'Deploy alongside existing bureau scorecards to measure approval lift, Gini metrics, and default divergence.' },
  ];

  return (
    <section id="benefits" className="relative">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32 md:px-12">
        {/* Badge */}
        <div className="reveal" style={{ transitionDelay: '100ms' }}>
          <span className="inline-block border-l-2 border-white bg-white/15 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-white backdrop-blur-md drop-shadow-md">
            Ecosystem Value
          </span>
        </div>

        <h2
          className="reveal mt-6 max-w-3xl text-3xl font-normal leading-tight tracking-tight text-white drop-shadow-lg sm:text-4xl lg:text-5xl"
          style={{ transitionDelay: '150ms' }}
        >
          Value for everyone in the lending equation
        </h2>

        <p
          className="reveal mt-4 max-w-2xl text-lg text-white/70 drop-shadow-md"
          style={{ transitionDelay: '200ms' }}
        >
          Aligning borrower empowerment with institutional risk management.
        </p>

        {/* Two-Column Comparison */}
        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Borrowers Column */}
          <div
            className="reveal rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-md sm:p-8"
            style={{ transitionDelay: '250ms' }}
          >
            <div className="flex items-center gap-3 border-b border-white/10 pb-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
                <User className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-medium text-white">For Borrowers</h3>
                <span className="font-mono text-xs text-white/50">
                  Gig Workers, Kiranas &amp; Students
                </span>
              </div>
            </div>

            <div className="mt-6 space-y-5">
              {borrowerBenefits.map((b) => (
                <div key={b.title} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-400" />
                  <div>
                    <h4 className="text-sm font-medium text-white">{b.title}</h4>
                    <p className="mt-0.5 text-xs leading-relaxed text-white/65">
                      {b.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Lenders Column */}
          <div
            className="reveal rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-md sm:p-8"
            style={{ transitionDelay: '350ms' }}
          >
            <div className="flex items-center gap-3 border-b border-white/10 pb-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8993e]/20 text-[#e8993e]">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-medium text-white">For Lenders</h3>
                <span className="font-mono text-xs text-white/50">
                  MFIs, NBFCs &amp; Small Finance Banks
                </span>
              </div>
            </div>

            <div className="mt-6 space-y-5">
              {lenderBenefits.map((b) => (
                <div key={b.title} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#e8993e]" />
                  <div>
                    <h4 className="text-sm font-medium text-white">{b.title}</h4>
                    <p className="mt-0.5 text-xs leading-relaxed text-white/65">
                      {b.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

