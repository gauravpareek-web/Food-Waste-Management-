import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, ShieldCheck, FileCheck, Layers } from 'lucide-react';

interface DeckCard {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  badgeColor: string;
  summary: string;
  statValue: string;
  statLabel: string;
  details: string[];
}

const deckCards: DeckCard[] = [
  {
    id: 'problem',
    tag: 'THE CRISIS',
    badgeColor: 'bg-red-500/20 text-red-300 border-red-500/30',
    title: '160M Credit-Invisible',
    subtitle: 'Excluded by Formal Bureaus',
    summary: 'India’s 4 licensed CICs only ingest formal credit tranches. 7.7M gig workers and 60M kirana micro-enterprises pay 24%–60%+ to informal moneylenders.',
    statValue: '160M+',
    statLabel: 'Underserved Adults (TransUnion CIBIL [FACT])',
    details: [
      '7.7M gig workforce growing to 23.5M by 2030 (NITI Aayog [FACT])',
      '₹20–25 Lakh Crore MSME credit gap (IFC / SIDBI [ESTIMATE])',
      'Informal moneylenders charge 24%–60%+ APR traps (RBI [FACT])',
    ],
  },
  {
    id: 'scorecard',
    tag: 'FEATURED SPEC',
    badgeColor: 'bg-[#e8993e]/20 text-[#e8993e] border-[#e8993e]/30',
    title: 'Discipline Scorecard',
    subtitle: 'Scale: 300 – 850 Benchmark',
    summary: 'Scores verified banking and UPI discipline over trailing 90–180 days. Not a CIC bureau score under CICRA 2005.',
    statValue: '300–850',
    statLabel: 'Score Formula: 300 + 550 × ∑(wᵢ × sᵢ)',
    details: [
      '30% Recurring payment regularity (rent & utilities) [Proposed]',
      '25% Inflow-to-outflow cash surplus margin [Proposed]',
      '20% Income stability (low volatility) [Proposed]',
      '15% Balance buffer days & 10% active earning frequency [Proposed]',
    ],
  },
  {
    id: 'report',
    tag: 'ANTI-FRAUD ARTIFACT',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    title: 'Cryptographic PDF Report',
    subtitle: 'SHA-256 Server Verification',
    summary: 'Eliminates PDF editing and fake statement fraud with server-hashed digital signatures and instant QR code verification endpoints.',
    statValue: 'SHA-256',
    statLabel: 'Tamper-Evident Ledger Integrity',
    details: [
      'Scannable QR code links directly to verify.cashpulse.in/audit',
      'Reconciles UPI VPA landlord fingerprints across trailing 6 months',
      'Calculates safe stepped limit within RBI 50% MFI ceiling [FACT]',
    ],
  },
  {
    id: 'compliance',
    tag: 'REGULATORY RAILS',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    title: 'Account Aggregator & DPDP',
    subtitle: 'Zero Device Scraping',
    summary: 'Operating with full disclosure: iOS sandbox completely bars SMS reading, Google Play restricts READ_SMS. CashPulse operates 100% via RBI Account Aggregator.',
    statValue: '143M+',
    statLabel: 'AA Consents Fulfilled (Sahamati [FACT])',
    details: [
      'Zero access to contacts, photos, or device storage (RBI DL Directions [FACT])',
      'Mandatory 18+ age verification under DPDP Act 2023 Section 9 [FACT]',
      'Client-side on-device parsing of e-statements & receipts',
    ],
  },
  {
    id: 'proof',
    tag: 'EMPIRICAL PROOF',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    title: 'Proven Impact Precedents',
    subtitle: 'Global & Indian Case Studies',
    summary: 'Alternative cash-flow underwriting has been proven at scale by Kinara Capital, Experian Boost, M-Shwari, and Nubank.',
    statValue: '₹4,000+ Cr',
    statLabel: 'Disbursed Collateral-Free (Kinara Capital)',
    details: [
      'Kinara Capital: 24-hour turnaround for thin-file micro-MSMEs',
      'Experian Boost: +14 point average lift for thin-file consumers',
      'M-Shwari: 30M+ users with low ~2.0% 30-day delinquency',
    ],
  },
];

export default function SectionShowcaseDeck() {
  const [activeCard, setActiveCard] = useState<DeckCard>(deckCards[1]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    const scrollAmount = clientWidth * 0.75;
    scrollRef.current.scrollTo({
      left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section id="deck" className="relative overflow-hidden py-20 sm:py-28 px-5 sm:px-8 md:px-12">
      <div className="mx-auto max-w-6xl">
        {/* Section Top Header with Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <span className="reveal inline-block border-l-2 border-white bg-white/15 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-white backdrop-blur-md mb-4">
              Curated Solution Deck
            </span>
            <h2 className="reveal text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white drop-shadow-lg">
              The Architecture at a Glance
            </h2>
            <p className="reveal mt-3 max-w-xl text-sm sm:text-base text-white/70">
              Explore the core pillars of our research-backed alternative credit scoring system.
            </p>
          </div>

          {/* Navigation arrow buttons matching Lenis showcase style */}
          <div className="reveal flex items-center gap-3" style={{ transitionDelay: '200ms' }}>
            <button
              onClick={() => scroll('left')}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/25 hover:border-white/40 cursor-pointer"
              aria-label="Previous card"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/25 hover:border-white/40 cursor-pointer"
              aria-label="Next card"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Floating Cards Deck matching Image 4 & 5 */}
        <div
          ref={scrollRef}
          className="mt-12 flex gap-6 overflow-x-auto pb-6 pt-2 scrollbar-none snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {deckCards.map((card, i) => {
            const isSelected = activeCard.id === card.id;

            return (
              <div
                key={card.id}
                onClick={() => setActiveCard(card)}
                className={`interactive-card group relative min-w-[320px] sm:min-w-[360px] md:min-w-[400px] shrink-0 snap-start cursor-pointer rounded-2xl border transition-all duration-300 p-6 backdrop-blur-xl ${
                  isSelected
                    ? 'border-[#e8993e]/60 bg-white/[0.12] shadow-[0_0_30px_rgba(232,153,62,0.15)] scale-[1.01]'
                    : 'border-white/15 bg-white/[0.06] hover:border-white/30 hover:bg-white/[0.09]'
                }`}
                style={{ transitionDelay: `${150 + i * 80}ms` }}
              >
                {/* Card Top Tag */}
                <div className="flex items-center justify-between">
                  <span
                    className={`inline-block rounded-full border px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wider ${card.badgeColor}`}
                  >
                    {card.tag}
                  </span>
                  <Layers className={`h-4 w-4 transition-colors ${isSelected ? 'text-[#e8993e]' : 'text-white/40'}`} />
                </div>

                {/* Big Stat Feature */}
                <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="font-mono text-3xl sm:text-4xl font-bold text-white tracking-tight">
                    {card.statValue}
                  </div>
                  <div className="mt-1 font-mono text-[11px] text-white/50">
                    {card.statLabel}
                  </div>
                </div>

                {/* Title & Subtitle matching Lenis screenshot style */}
                <div className="mt-6">
                  <h3 className="text-xl font-medium text-white group-hover:text-[#e8993e] transition-colors">
                    {card.title}
                  </h3>
                  <div className="mt-1 font-mono text-xs uppercase tracking-wider text-white/60">
                    {card.subtitle}
                  </div>
                  <p className="mt-3 text-xs sm:text-sm text-white/70 leading-relaxed">
                    {card.summary}
                  </p>
                </div>

                {/* Card Bottom Indicator */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/50 font-mono">
                  <span>{isSelected ? '● Active View' : 'Click to inspect'}</span>
                  <span className="text-[#e8993e] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Details →
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Card Deep-Dive Drawer / Panel */}
        <div className="reveal mt-8 rounded-2xl border border-white/20 bg-white/[0.08] p-6 sm:p-8 backdrop-blur-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/15 pb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-[#e8993e] uppercase tracking-widest">
                  Deep Dive Analysis:
                </span>
                <span className="font-mono text-xs text-white/50">
                  [{activeCard.tag}]
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-medium text-white mt-1">
                {activeCard.title} — {activeCard.subtitle}
              </h3>
            </div>

            <a
              href="#demo"
              className="inline-flex items-center gap-1.5 self-start rounded-full bg-white px-4 py-2 text-xs font-semibold text-black transition-colors hover:bg-white/85"
            >
              Test in live simulator
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {activeCard.details.map((point) => (
              <div
                key={point}
                className="rounded-xl border border-white/10 bg-white/5 p-4 text-xs sm:text-sm text-white/80 leading-relaxed flex items-start gap-3"
              >
                <ShieldCheck className="h-4 w-4 shrink-0 text-[#e8993e] mt-0.5" />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
