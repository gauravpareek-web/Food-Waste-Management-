const rows = [
  {
    cause: 'Thin Credit File / No Bureau History',
    solution:
      'Synthesizes UPI, bank inflows, and recurring obligations into an alternative discipline score',
    strength: 'Strong' as const,
    source: 'F05, F19',
    delay: 0,
  },
  {
    cause: 'Lack of Physical Collateral',
    solution:
      'Replaces asset hypothecation with cash-flow velocity and consistency metrics',
    strength: 'Strong' as const,
    source: 'F11, Kinara',
    delay: 100,
  },
  {
    cause: 'Irregular / Volatile Income',
    solution:
      'Calculates 90-day inflow variance, active earning days, and rolling liquidity buffers',
    strength: 'Partial' as const,
    source: 'Volatility discount',
    delay: 200,
  },
  {
    cause: 'Cash Economy Dominance',
    solution:
      'Reconciles hybrid cash-to-digital deposits and verified merchant settlements',
    strength: 'Partial' as const,
    source: 'Offline gap',
    delay: 300,
  },
  {
    cause: 'High Cost of Informal Lending',
    solution:
      'Unlocks formal NBFC/MFI micro-loans at 18-28% APR vs predatory 24-60%+ rates',
    strength: 'Strong' as const,
    source: 'F06',
    delay: 400,
  },
];

function StrengthBadge({ strength }: { strength: 'Strong' | 'Partial' }) {
  const classes =
    strength === 'Strong'
      ? 'bg-emerald-500/20 text-emerald-400'
      : 'bg-amber-500/20 text-amber-400';
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] ${classes}`}
    >
      {strength}
    </span>
  );
}

export default function SectionSolution() {
  return (
    <section id="solution" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 md:px-12">
        {/* Badge */}
        <div
          className="reveal mb-4 inline-block border-l-2 border-white bg-white/15 px-3 py-1.5 backdrop-blur-md"
          style={{ transitionDelay: '0ms' }}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white drop-shadow-md">
            The App as the Solution
          </span>
        </div>

        {/* Heading */}
        <h2
          className="reveal mt-2 max-w-3xl text-3xl font-bold leading-tight tracking-tight text-white drop-shadow-lg sm:text-4xl md:text-5xl"
          style={{ transitionDelay: '80ms' }}
        >
          From cause to fix — with evidence
        </h2>

        {/* Subtitle */}
        <p
          className="reveal mt-4 max-w-2xl text-base leading-relaxed text-white/60 drop-shadow-md sm:text-lg"
          style={{ transitionDelay: '160ms' }}
        >
          How CashPulse addresses each driver of credit exclusion.
        </p>

        {/* Desktop Table (lg+) */}
        <div
          className="reveal mt-12 hidden overflow-hidden rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md lg:block"
          style={{ transitionDelay: '240ms' }}
        >
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-6 py-4 font-mono text-[10px] uppercase tracking-[0.15em] text-white/50">
                  Cause of Exclusion
                </th>
                <th className="px-6 py-4 font-mono text-[10px] uppercase tracking-[0.15em] text-white/50">
                  How the App Helps
                </th>
                <th className="px-6 py-4 font-mono text-[10px] uppercase tracking-[0.15em] text-white/50">
                  Evidence Strength
                </th>
                <th className="px-6 py-4 font-mono text-[10px] uppercase tracking-[0.15em] text-white/50">
                  Source
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => (
                <tr
                  key={row.cause}
                  className={`reveal border-b border-white/5 transition-colors hover:bg-white/5 ${
                    idx === rows.length - 1 ? 'border-b-0' : ''
                  }`}
                  style={{ transitionDelay: `${row.delay + 320}ms` }}
                >
                  <td className="px-6 py-5 text-sm font-medium text-white drop-shadow-md">
                    {row.cause}
                  </td>
                  <td className="max-w-md px-6 py-5 text-sm leading-relaxed text-white/60 drop-shadow-md">
                    {row.solution}
                  </td>
                  <td className="px-6 py-5">
                    <StrengthBadge strength={row.strength} />
                  </td>
                  <td className="px-6 py-5 font-mono text-[11px] text-white/40">
                    {row.source}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards (< lg) */}
        <div className="mt-12 flex flex-col gap-4 lg:hidden">
          {rows.map((row) => (
            <article
              key={row.cause}
              className="reveal rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md"
              style={{ transitionDelay: `${row.delay + 320}ms` }}
            >
              {/* Cause */}
              <h3 className="text-sm font-semibold text-white drop-shadow-md">
                {row.cause}
              </h3>

              {/* Solution */}
              <p className="mt-2 text-sm leading-relaxed text-white/60 drop-shadow-md">
                {row.solution}
              </p>

              {/* Meta row */}
              <div className="mt-4 flex items-center gap-3">
                <StrengthBadge strength={row.strength} />
                <span className="font-mono text-[10px] text-white/40">
                  {row.source}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
