import { caseStudies } from '../data/content';
import { AlertOctagon, TrendingUp } from 'lucide-react';

export default function SectionProof() {
  return (
    <section id="proof" className="relative">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32 md:px-12">
        {/* Badge */}
        <div className="reveal" style={{ transitionDelay: '100ms' }}>
          <span className="inline-block border-l-2 border-white bg-white/15 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-white backdrop-blur-md drop-shadow-md">
            Empirical Proof
          </span>
        </div>

        <h2
          className="reveal mt-6 max-w-3xl text-3xl font-normal leading-tight tracking-tight text-white drop-shadow-lg sm:text-4xl lg:text-5xl"
          style={{ transitionDelay: '150ms' }}
        >
          Real-world evidence that alternative scoring works
        </h2>

        <p
          className="reveal mt-4 max-w-2xl text-lg text-white/70 drop-shadow-md"
          style={{ transitionDelay: '200ms' }}
        >
          Rigorous domestic and global precedents prove that cash-flow telemetry safely expands credit access without triggering non-performing loan spikes.
        </p>

        {/* Case Studies Grid */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((cs, i) => (
            <div
              key={cs.name}
              className="reveal flex flex-col justify-between rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-md"
              style={{ transitionDelay: `${250 + i * 90}ms` }}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-white/50">
                    {cs.country}
                  </span>
                  <TrendingUp className="h-4 w-4 text-[#e8993e]" />
                </div>

                <h3 className="mt-3 text-lg font-medium text-white">
                  {cs.name}
                </h3>

                <p className="mt-2 text-xs leading-relaxed text-white/70">
                  {cs.what}
                </p>
              </div>

              <div className="mt-6 border-t border-white/10 pt-4">
                <span className="font-mono text-[10px] uppercase text-emerald-400 block mb-1">
                  Verified Outcome:
                </span>
                <p className="text-xs font-medium text-white/90 leading-relaxed">
                  {cs.result}
                </p>
                <span className="mt-3 block font-mono text-[9px] text-white/40">
                  Source: {cs.source}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Cautionary Tale: Predatory Loan App Purge */}
        <div
          className="reveal mt-12 rounded-2xl border-l-4 border-red-500 border border-white/15 bg-red-950/20 p-6 backdrop-blur-md"
          style={{ transitionDelay: '600ms' }}
          role="note"
        >
          <div className="flex items-start gap-4">
            <AlertOctagon className="mt-1 h-6 w-6 shrink-0 text-red-400" />
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-base font-semibold text-white">
                  Cautionary Lesson: The 2022–2023 Digital Lending Crackdown
                </h4>
                <span className="rounded bg-red-500/20 px-2 py-0.5 font-mono text-[9px] uppercase text-red-300">
                  Regulatory Action [FACT]
                </span>
              </div>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-white/80">
                Between 2021 and 2023, rogue short-term lending apps in India scraped device contacts, SMS inboxes, and photo galleries to blackmail borrowers during recovery. In response, the <strong>Reserve Bank of India issued the Digital Lending Directions (Sept 2022)</strong>, barring lending apps from accessing mobile storage, contact lists, and call logs. Simultaneously, Google removed over 2,500 non-compliant apps from the Play Store.
              </p>
              <p className="mt-3 text-xs sm:text-sm font-medium text-[#e8993e]">
                💡 Why this matters for CashPulse: We completely discard background SMS and contact scraping. CashPulse is architected exclusively around the RBI Account Aggregator framework and cryptographic verification, ensuring 100% regulatory compliance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

