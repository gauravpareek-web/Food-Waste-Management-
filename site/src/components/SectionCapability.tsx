import { ChevronRight } from 'lucide-react';

export default function SectionCapability() {
  const capabilities = [
    {
      idx: '01',
      title: 'Consent-Driven Telemetry',
      body: 'Ingests RBI Account Aggregator bank feeds and verified transaction data with zero invasive device storage scraping.',
    },
    {
      idx: '02',
      title: 'Recurring Payee Fingerprinting',
      body: 'Resolves landlord and kirana supplier payments across months using robust UPI VPA matching and regularity metrics.',
    },
    {
      idx: '03',
      title: 'Cryptographic Integrity',
      body: 'Protects MFIs and NBFCs from forged PDF statements via tamper-evident SHA-256 hashes and instant QR lookups.',
    },
  ];

  return (
    <section
      id="capability"
      className="relative flex min-h-screen flex-col justify-between px-5 pt-24 pb-12 sm:px-8 sm:pt-28 md:px-12 md:pb-16 supports-[height:100svh]:min-h-[100svh]"
    >
      {/* Top row */}
      <div className="flex flex-col justify-between gap-8 sm:flex-row">
        {/* Left badge */}
        <div className="reveal" style={{ transitionDelay: '120ms' }}>
          <span className="inline-block border-l-2 border-white bg-white/15 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-white backdrop-blur-md drop-shadow-md">
            Insight On Demand
          </span>
        </div>

        {/* Right copy */}
        <div
          className="reveal max-w-sm sm:text-right"
          style={{ transitionDelay: '220ms' }}
        >
          <p className="text-lg leading-relaxed text-white drop-shadow-md sm:text-xl">
            Our engine doesn&apos;t just read transactions — it validates cash-flow discipline, eliminates fraud, and delivers signals lenders trust.
          </p>
        </div>
      </div>

      {/* Bottom area */}
      <div className="mt-16 flex flex-1 flex-col items-start justify-end gap-12 md:flex-row md:items-end md:justify-between md:gap-16">
        {/* Left column */}
        <div className="max-w-xl">
          <h2
            className="reveal text-5xl font-normal leading-[1.05] tracking-tight text-white drop-shadow-lg sm:text-6xl lg:text-7xl"
            style={{ transitionDelay: '180ms' }}
          >
            Learn to see
            <br />
            discipline.
          </h2>

          <p
            className="reveal mt-6 max-w-md text-sm text-white/80 drop-shadow-md sm:text-base"
            style={{ transitionDelay: '320ms' }}
          >
            From daily UPI tea stalls to monthly rent transfers, CashPulse transforms recurring transactional habits into a reliable underwriting metric — quietly, securely, at scale.
          </p>

          <div
            className="reveal mt-8 flex flex-wrap gap-3"
            style={{ transitionDelay: '420ms' }}
          >
            <a
              href="#demo"
              className="inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-xs font-medium text-black transition-colors duration-300 hover:bg-white/85 sm:text-sm"
            >
              Run the demo
              <ChevronRight className="h-3.5 w-3.5" />
            </a>

            <a
              href="#sources"
              className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-xs font-medium text-white backdrop-blur-md transition-colors duration-300 hover:bg-white/20 sm:text-sm"
            >
              Free consultation
            </a>
          </div>
        </div>

        {/* Right — frosted capability panel */}
        <div
          className="w-full max-w-md rounded-2xl border border-white/15 bg-white/10 px-5 backdrop-blur-md sm:px-6"
          role="region"
          aria-label="Capabilities"
        >
          {capabilities.map((cap, i) => (
            <div
              key={cap.idx}
              className={`reveal flex gap-5 py-5 ${
                i !== capabilities.length - 1 ? 'border-b border-white/15' : ''
              }`}
              style={{ transitionDelay: `${300 + i * 110}ms` }}
            >
              <span className="font-mono text-[11px] tracking-[0.15em] text-white/55">
                {cap.idx}
              </span>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-medium text-white sm:text-lg">
                    {cap.title}
                  </h3>
                  <ChevronRight className="h-4 w-4 text-white/40 transition-transform hover:translate-x-0.5 hover:text-white" />
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-white/70">
                  {cap.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

