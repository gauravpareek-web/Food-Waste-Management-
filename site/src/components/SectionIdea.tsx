export default function SectionIdea() {
  const rows = [
    {
      label: 'Data',
      traditional: 'Only formal loans & cards',
      cashflow: 'UPI, rent, utilities, merchant payments',
    },
    {
      label: 'Coverage',
      traditional: 'Requires years of history',
      cashflow: 'Useful from 90 days of transactions',
    },
    {
      label: 'Who benefits',
      traditional: 'Already banked population',
      cashflow: 'Credit-invisible workers & students',
    },
    {
      label: 'Collateral',
      traditional: 'Often required',
      cashflow: 'Cash-flow surplus is the signal',
    },
    {
      label: 'Speed',
      traditional: 'Days of paperwork',
      cashflow: 'Minutes via Account Aggregator',
    },
  ];

  return (
    <section id="idea" className="relative">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32 md:px-12">
        <div className="flex flex-col items-center gap-16 lg:flex-row">
          {/* LEFT column */}
          <div className="lg:w-1/2">
            <div
              className="reveal"
              style={{ transitionDelay: '100ms' }}
            >
              <span className="inline-block border-l-2 border-white bg-white/15 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-white backdrop-blur-md drop-shadow-md">
                The Idea
              </span>
            </div>

            <h2
              className="reveal mt-6 text-3xl font-normal leading-tight tracking-tight text-white drop-shadow-lg sm:text-4xl lg:text-5xl"
              style={{ transitionDelay: '150ms' }}
            >
              Score behavior, not past loans.
            </h2>

            <div
              className="reveal mt-6 space-y-4 text-base leading-relaxed text-white/80 drop-shadow-md sm:text-lg"
              style={{ transitionDelay: '200ms' }}
            >
              <p>
                Every UPI payment, every rent transfer, every utility bill paid
                on time is evidence of financial discipline. But today, none of
                it counts.
              </p>
              <p>
                CashPulse reads this evidence — with consent, through secure
                channels — and turns it into a Cash-Flow &amp; Payment-Discipline
                Score that lenders can actually use.
              </p>
            </div>

            {/* Disclaimer box */}
            <div
              className="reveal mt-8 rounded-2xl border border-white/15 border-l-2 border-l-[#e8993e] bg-white/[0.08] p-4 backdrop-blur-md"
              style={{ transitionDelay: '300ms' }}
            >
              <p className="text-sm leading-relaxed text-white/80 drop-shadow-md">
                ⚠️ This is{' '}
                <span className="font-semibold text-[#e8993e]">NOT</span> a
                credit score issued under CICRA 2005. It is an alternative
                cash-flow underwriting signal for participating regulated
                institutions.
              </p>
            </div>
          </div>

          {/* RIGHT column — comparison table */}
          <div
            className="reveal w-full lg:w-1/2"
            style={{ transitionDelay: '250ms' }}
          >
            <div className="overflow-hidden rounded-2xl border border-white/15 bg-white/[0.08] backdrop-blur-md">
              {/* Header */}
              <div className="grid grid-cols-3 border-b border-white/10">
                <div className="p-4" />
                <div className="border-l border-white/10 p-4 text-center font-mono text-[10px] uppercase tracking-[0.15em] text-white/50 drop-shadow-md">
                  Traditional Bureau
                </div>
                <div className="border-l border-white/10 p-4 text-center font-mono text-[10px] uppercase tracking-[0.15em] text-[#e8993e] drop-shadow-md">
                  Cash-Flow Score
                </div>
              </div>

              {/* Rows */}
              {rows.map((row, i) => (
                <div
                  key={row.label}
                  className={`grid grid-cols-3 ${
                    i < rows.length - 1 ? 'border-b border-white/10' : ''
                  }`}
                >
                  <div className="flex items-center p-4 font-mono text-[11px] uppercase tracking-[0.15em] text-white/60 drop-shadow-md">
                    {row.label}
                  </div>
                  <div className="flex items-center border-l border-white/10 p-4 text-sm text-white/50 drop-shadow-md">
                    {row.traditional}
                  </div>
                  <div className="flex items-center border-l-2 border-l-[#e8993e]/40 p-4 text-sm text-white drop-shadow-md">
                    {row.cashflow}
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
