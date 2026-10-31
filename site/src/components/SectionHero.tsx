import { ChevronRight } from 'lucide-react';

const PORTRAIT_URL =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260728_050334_5b076e26-0ce7-4898-b432-d764190e448f.png&w=1280&q=85';

export default function SectionHero() {
  const serviceList = [
    '/ ALTERNATIVE CREDIT SCORING',
    '/ CASH-FLOW TELEMETRY',
    '/ PAYMENT DISCIPLINE SIGNALS',
  ];

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col justify-between px-5 pt-24 pb-12 sm:px-8 sm:pt-28 md:px-12 md:pb-16 supports-[height:100svh]:min-h-[100svh]"
    >
      {/* Top row */}
      <div className="flex flex-col justify-between gap-8 sm:flex-row">
        {/* Left — service list */}
        <div className="flex flex-col gap-2">
          {serviceList.map((service, i) => (
            <span
              key={service}
              className="reveal font-mono text-xs uppercase tracking-[0.15em] text-white/90 drop-shadow-md"
              style={{ transitionDelay: `${150 + i * 120}ms` }}
            >
              {service}
            </span>
          ))}
        </div>

        {/* Right — intro */}
        <div
          className="reveal max-w-xs sm:text-right"
          style={{ transitionDelay: '300ms' }}
        >
          <p className="text-lg leading-relaxed text-white drop-shadow-md sm:text-xl">
            We design alternative scoring that brings clarity, precision, and credit access to 160M+ excluded Indians.
          </p>
        </div>
      </div>

      {/* Bottom row */}
      <div className="mt-16 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
        {/* Left */}
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="reveal mb-5" style={{ transitionDelay: '150ms' }}>
            <span className="inline-block border-l-2 border-white bg-white/15 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-white backdrop-blur-md drop-shadow-md">
              Underwriting 160M+ Invisibles
            </span>
          </div>

          {/* H1 */}
          <h1
            className="reveal text-5xl font-normal leading-[1.05] tracking-tight text-white drop-shadow-lg sm:text-6xl lg:text-7xl"
            style={{ transitionDelay: '280ms' }}
          >
            Score Behavior.
            <br />
            Precise. Automated.
          </h1>

          {/* 3 Animated Stat Chips */}
          <div
            className="reveal mt-8 flex flex-wrap gap-3"
            style={{ transitionDelay: '380ms' }}
          >
            <div className="rounded-xl border border-white/15 bg-white/15 p-3 backdrop-blur-md">
              <div className="font-mono text-2xl font-bold text-[#e8993e] sm:text-3xl">
                160M+
              </div>
              <div className="text-xs text-white/80">Credit-Invisible</div>
              <span className="font-mono text-[9px] text-white/40 block mt-0.5">
                TransUnion CIBIL [FACT]
              </span>
            </div>

            <div className="rounded-xl border border-white/15 bg-white/15 p-3 backdrop-blur-md">
              <div className="font-mono text-2xl font-bold text-[#e8993e] sm:text-3xl">
                ₹20L Cr
              </div>
              <div className="text-xs text-white/80">MSME Credit Gap</div>
              <span className="font-mono text-[9px] text-white/40 block mt-0.5">
                IFC / SIDBI [ESTIMATE]
              </span>
            </div>

            <div className="rounded-xl border border-white/15 bg-white/15 p-3 backdrop-blur-md">
              <div className="font-mono text-2xl font-bold text-[#e8993e] sm:text-3xl">
                21.6B
              </div>
              <div className="text-xs text-white/80">Monthly UPI Txns</div>
              <span className="font-mono text-[9px] text-white/40 block mt-0.5">
                NPCI Dec 2025 [FACT]
              </span>
            </div>
          </div>
        </div>

        {/* Right — Glass Contact Card (exact layout from Image 1) */}
        <div
          className="reveal interactive-card flex items-center gap-4 rounded-xl border border-white/15 bg-white/15 p-3 backdrop-blur-md transition-all duration-300 hover:border-white/30"
          style={{ transitionDelay: '420ms' }}
        >
          <img
            src={PORTRAIT_URL}
            alt="Mitha, Co-founder of CashPulse"
            className="h-24 w-20 rounded-lg object-cover"
          />

          <div className="flex flex-col gap-1.5 pr-2">
            <span className="text-sm font-medium text-white">
              Talk with Mitha
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/60">
              Co-founder of CashPulse
            </span>
            <a
              href="mailto:mitha@cashpulse.in?subject=Credit%20Scoring%20Inquiry"
              className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-white px-4 py-2 text-xs font-medium text-black transition-colors duration-300 hover:bg-white/85"
            >
              Book 15-mins call
              <ChevronRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
