import { useState } from 'react';
import {
  Receipt,
  PieChart,
  HeartPulse,
  Share2,
  UserSearch,
  Calculator,
  SlidersHorizontal,
  Scissors,
} from 'lucide-react';

const tabs = ['For Workers & Students', 'For MFIs & NBFCs'] as const;

const workersItems = [
  {
    icon: Receipt,
    title: 'Build a Visible Payment Record',
    description:
      'Transform uncounted UPI receipts, gig payouts, and rent payments into an auditable financial track record.',
  },
  {
    icon: PieChart,
    title: 'Understand Monthly Spend',
    description:
      'Categorized spending dashboard showing inflows, outflows, surplus, and recurring obligation tracking.',
  },
  {
    icon: HeartPulse,
    title: 'Check Credit Readiness',
    description:
      'Know your Cash-Flow Score before approaching a lender. Understand exactly what\'s helping or hurting your profile.',
  },
  {
    icon: Share2,
    title: 'Share a Verified Report',
    description:
      'Generate a cryptographically signed PDF with QR verification that any participating lender can independently verify.',
  },
];

const lenderItems = [
  {
    icon: UserSearch,
    title: 'Underwrite Thin-File Applicants',
    description:
      'Access behavioral payment telemetry for borrowers with zero bureau tradelines. See spend discipline, not just debt history.',
  },
  {
    icon: Calculator,
    title: 'Automated Surplus Estimation',
    description:
      'Compute net cash-flow buffer, revenue volatility, and debt-servicing headroom in seconds instead of days.',
  },
  {
    icon: SlidersHorizontal,
    title: 'Set Stepped Credit Limits',
    description:
      'Establish conservative initial limits tied to verified surplus, within RBI\'s 50% EMI-to-income ceiling. [FACT]',
  },
  {
    icon: Scissors,
    title: 'Cut Origination Costs',
    description:
      'Replace error-prone manual branch visits with digital, verifiable transaction forensics via Account Aggregator.',
  },
];

export default function SectionUses() {
  const [activeTab, setActiveTab] = useState<0 | 1>(0);
  const items = activeTab === 0 ? workersItems : lenderItems;

  return (
    <section id="uses" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 md:px-12">
        {/* Badge */}
        <div
          className="reveal mb-4 inline-block border-l-2 border-white bg-white/15 px-3 py-1.5 backdrop-blur-md"
          style={{ transitionDelay: '0ms' }}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white drop-shadow-md">
            Uses of the App
          </span>
        </div>

        {/* Heading */}
        <h2
          className="reveal mt-2 max-w-3xl text-3xl font-bold leading-tight tracking-tight text-white drop-shadow-lg sm:text-4xl md:text-5xl"
          style={{ transitionDelay: '80ms' }}
        >
          Built for both sides of the lending equation
        </h2>

        {/* Tabs */}
        <div
          className="reveal mt-10 inline-flex gap-2 rounded-full border border-white/15 bg-white/5 p-1 backdrop-blur-md"
          style={{ transitionDelay: '160ms' }}
          role="tablist"
          aria-label="Stakeholder tabs"
        >
          {tabs.map((label, idx) => (
            <button
              key={label}
              role="tab"
              aria-selected={activeTab === idx}
              aria-controls={`tabpanel-${idx}`}
              onClick={() => setActiveTab(idx as 0 | 1)}
              className={`rounded-full px-5 py-2 font-mono text-[11px] uppercase tracking-[0.15em] transition-all duration-300 ${
                activeTab === idx
                  ? 'bg-white text-black shadow-lg'
                  : 'bg-white/10 text-white/70 hover:bg-white/15 hover:text-white'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Tab Panel */}
        <div
          id={`tabpanel-${activeTab}`}
          role="tabpanel"
          aria-label={tabs[activeTab]}
          className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2"
        >
          {items.map((item, idx) => {
            const Icon = item.icon;
            const num = String(idx + 1).padStart(2, '0');
            return (
              <article
                key={item.title}
                className="reveal rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-md sm:p-8"
                style={{ transitionDelay: `${idx * 100 + 240}ms` }}
              >
                <div className="mb-4 flex items-center gap-3">
                  {/* Number */}
                  <span className="font-mono text-[11px] text-white/55">
                    {num}
                  </span>
                  {/* Icon */}
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/10">
                    <Icon
                      className="h-4 w-4 text-white"
                      aria-hidden="true"
                    />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-white drop-shadow-md">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-sm leading-relaxed text-white/60 drop-shadow-md">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
