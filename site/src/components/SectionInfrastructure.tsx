import { Link, Zap, Shield, FileCheck } from 'lucide-react';

const cards = [
  {
    icon: Link,
    title: 'Account Aggregator Framework',
    metric: '131M+ accounts linked',
    description:
      'RBI-regulated consent architecture enabling secure, encrypted financial data sharing between banks and lenders. Eliminates tamper-prone paper statements.',
    source: 'Sahamati [FACT]',
    delay: 0,
  },
  {
    icon: Zap,
    title: 'Unified Payments Interface (UPI)',
    metric: '21.6B monthly transactions',
    description:
      'The world\'s largest real-time payment system generates rich merchant identity and spending discipline data for every digital transaction.',
    source: 'NPCI [FACT]',
    delay: 100,
  },
  {
    icon: Shield,
    title: 'DPDP Act & Digital Lending Rules',
    metric: 'Privacy-First Framework',
    description:
      'India\'s data protection law (DPDP Act 2023) and RBI Digital Lending Directions (2022) provide regulatory clarity on consent, data minimization, and user rights.',
    source: 'MeitY / RBI [FACT]',
    delay: 200,
  },
  {
    icon: FileCheck,
    title: 'DigiLocker & Udyam',
    metric: 'Verifiable Digital Identity',
    description:
      'eKYC via Aadhaar, Udyam registration for MSMEs, and DigiLocker for signed documents create a trust layer for credit assessment.',
    source: '',
    delay: 300,
  },
];

export default function SectionInfrastructure() {
  return (
    <section id="infrastructure" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 md:px-12">
        {/* Badge */}
        <div
          className="reveal mb-4 inline-block border-l-2 border-white bg-white/15 px-3 py-1.5 backdrop-blur-md"
          style={{ transitionDelay: '0ms' }}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white drop-shadow-md">
            Why India Is Ready
          </span>
        </div>

        {/* Heading */}
        <h2
          className="reveal mt-2 max-w-3xl text-3xl font-bold leading-tight tracking-tight text-white drop-shadow-lg sm:text-4xl md:text-5xl"
          style={{ transitionDelay: '80ms' }}
        >
          Digital Public Infrastructure makes this possible
        </h2>

        {/* Subtitle */}
        <p
          className="reveal mt-4 max-w-2xl text-base leading-relaxed text-white/60 drop-shadow-md sm:text-lg"
          style={{ transitionDelay: '160ms' }}
        >
          India's DPI stack provides the rails that no other country has at
          scale.
        </p>

        {/* Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <article
                key={card.title}
                className="reveal rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-md sm:p-8"
                style={{ transitionDelay: `${card.delay + 240}ms` }}
              >
                {/* Icon */}
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/10">
                  <Icon className="h-5 w-5 text-white" aria-hidden="true" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-white drop-shadow-md">
                  {card.title}
                </h3>

                {/* Metric */}
                <p className="mt-1 font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-[#e8993e] drop-shadow-md">
                  {card.metric}
                </p>

                {/* Description */}
                <p className="mt-3 text-sm leading-relaxed text-white/60 drop-shadow-md">
                  {card.description}
                </p>

                {/* Source */}
                {card.source && (
                  <span className="mt-4 inline-block font-mono text-[10px] uppercase tracking-[0.15em] text-white/40">
                    Source: {card.source}
                  </span>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
