import {
  Landmark,
  Smartphone,
  Home,
  Receipt,
  ShoppingCart,
  MessageSquare,
} from 'lucide-react';

interface StrengthBadge {
  label: string;
  variant: 'primary' | 'good' | 'neutral' | 'restricted';
}

interface DataCard {
  icon: typeof Landmark;
  title: string;
  body: string;
  strength: StrengthBadge;
  source?: string;
}

const strengthStyles: Record<StrengthBadge['variant'], string> = {
  primary:
    'bg-[#e8993e]/20 text-[#e8993e]',
  good:
    'bg-[#e8993e]/20 text-[#e8993e]',
  neutral:
    'bg-white/10 text-white/60',
  restricted:
    'bg-red-500/20 text-red-400',
};

const cards: DataCard[] = [
  {
    icon: Landmark,
    title: 'Account Aggregator (AA)',
    body: 'RBI-regulated consent framework. 131M+ accounts linked, 143M+ consents fulfilled. Direct encrypted bank-to-lender data flow.',
    strength: { label: 'Primary Route', variant: 'primary' },
    source: 'Sahamati [FACT]',
  },
  {
    icon: Smartphone,
    title: 'UPI Transaction History',
    body: '21.6 billion monthly transactions worth ₹28L Cr. Rich merchant identity, payment frequency, and spending discipline data.',
    strength: { label: 'Strong Signal', variant: 'good' },
    source: 'NPCI [FACT]',
  },
  {
    icon: Home,
    title: 'Rent & Utility Payments',
    body: 'Regular rent and utility payments are among the strongest predictors of repayment discipline. Experian Boost showed 13–19 point score lifts.',
    strength: { label: 'Strong Signal', variant: 'good' },
    source: 'Experian [FACT]',
  },
  {
    icon: Receipt,
    title: 'GST & E-Invoice Data',
    body: 'GSTN provides verified business revenue trails for registered micro-enterprises via DigiLocker integration.',
    strength: { label: 'Strong for MSMEs', variant: 'neutral' },
  },
  {
    icon: ShoppingCart,
    title: 'E-Commerce & BNPL',
    body: 'Buy-now-pay-later repayment behavior and e-commerce purchase discipline offer supplementary signals.',
    strength: { label: 'Supplementary', variant: 'neutral' },
  },
  {
    icon: MessageSquare,
    title: 'SMS Transaction Alerts',
    body: 'Rich credit/debit data in bank SMS — but READ_SMS is blocked by Google Play for finance apps and impossible on iOS.',
    strength: { label: 'Platform Restricted', variant: 'restricted' },
    source: 'Google Play Policy [FACT]',
  },
];

export default function SectionDataSources() {
  return (
    <section id="data-sources" className="relative">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32 md:px-12">
        {/* Title area */}
        <div
          className="reveal"
          style={{ transitionDelay: '100ms' }}
        >
          <span className="inline-block border-l-2 border-white bg-white/15 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-white backdrop-blur-md drop-shadow-md">
            Data Sources
          </span>
        </div>

        <h2
          className="reveal mt-6 text-3xl font-normal leading-tight tracking-tight text-white drop-shadow-lg sm:text-4xl lg:text-5xl"
          style={{ transitionDelay: '150ms' }}
        >
          Where the signal lives
        </h2>

        <p
          className="reveal mt-4 max-w-2xl text-lg text-white/70 drop-shadow-md"
          style={{ transitionDelay: '200ms' }}
        >
          Alternative data types with evidence of predictive value for credit
          assessment.
        </p>

        {/* Card grid */}
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <article
                key={card.title}
                className="reveal rounded-2xl border border-white/15 bg-white/[0.08] p-5 backdrop-blur-md"
                style={{ transitionDelay: `${200 + i * 100}ms` }}
              >
                <div className="mb-4 flex items-center justify-between">
                  <Icon
                    className="h-6 w-6 text-[#e8993e] drop-shadow-md"
                    aria-hidden="true"
                  />
                  <span
                    className={`rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide ${
                      strengthStyles[card.strength.variant]
                    }`}
                  >
                    {card.strength.label}
                  </span>
                </div>

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
