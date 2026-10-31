import { Users, Store, GraduationCap, Ban, TrendingUp } from 'lucide-react';

const cards = [
  {
    icon: Users,
    title: 'Gig Workers & Informal Labor',
    body: '7.7 million gig workers (growing to 23.5M by 2030) earn regular digital income through UPI — but have zero credit bureau footprint.',
    source: 'NITI Aayog, 2022 [FACT]',
  },
  {
    icon: Store,
    title: 'Kirana Shopkeepers',
    body: '60+ million micro-enterprises face a ₹20–25 lakh crore credit gap. Too structured for microfinance, too informal for banks.',
    source: 'IFC / SIDBI [ESTIMATE]',
  },
  {
    icon: GraduationCap,
    title: 'Students',
    body: 'Young adults building careers have no transaction history. Current scoring systems require years of formal debt to generate a score.',
    source: null,
  },
  {
    icon: Ban,
    title: "What Bureaus Can't See",
    body: "India's 4 licensed CICs (CIBIL, Experian, Equifax, CRIF) only accept data from regulated credit institutions. Rent, utilities, and merchant payments are invisible.",
    source: 'CICRA 2005 [FACT]',
  },
  {
    icon: TrendingUp,
    title: 'The Cost of Exclusion',
    body: 'Locked out of formal credit, these borrowers turn to informal moneylenders charging 24% to 60%+ annually — creating debt traps.',
    source: 'RBI Working Group [FACT]',
  },
];

export default function SectionProblem() {
  return (
    <section id="problem" className="relative">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32 md:px-12">
        {/* Title area */}
        <div
          className="reveal"
          style={{ transitionDelay: '100ms' }}
        >
          <span className="inline-block border-l-2 border-white bg-white/15 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-white backdrop-blur-md drop-shadow-md">
            The Problem
          </span>
        </div>

        <h2
          className="reveal mt-6 max-w-3xl text-3xl font-normal leading-tight tracking-tight text-white drop-shadow-lg sm:text-4xl lg:text-5xl"
          style={{ transitionDelay: '150ms' }}
        >
          160 million Indians can't prove they're reliable borrowers
        </h2>

        <p
          className="reveal mt-4 max-w-2xl text-lg text-white/70 drop-shadow-md"
          style={{ transitionDelay: '200ms' }}
        >
          Not because they're risky — because the system only tracks formal loans.
        </p>

        {/* Card grid */}
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <article
                key={card.title}
                className="reveal rounded-2xl border border-white/15 bg-white/[0.08] p-6 backdrop-blur-md"
                style={{ transitionDelay: `${200 + i * 100}ms` }}
              >
                <Icon
                  className="mb-4 h-6 w-6 text-[#e8993e] drop-shadow-md"
                  aria-hidden="true"
                />
                <h3 className="mb-2 text-lg font-medium text-white drop-shadow-md">
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/70 drop-shadow-md">
                  {card.body}
                </p>
                {card.source && (
                  <p className="mt-3 font-mono text-[10px] uppercase text-white/40">
                    {card.source}
                  </p>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
