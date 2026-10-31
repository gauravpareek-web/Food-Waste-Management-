import { Milestone, Flag, Target } from 'lucide-react';

export default function SectionRoadmap() {
  const phases = [
    {
      phase: 'Phase 1 • Days 1–30',
      title: 'Sandboxed Calibration & Back-Testing',
      focus: 'Statistical validation without capital at risk',
      items: [
        'Partner with 1 Jaipur-based MFI and 1 digital NBFC',
        'Back-test scorecard against 1,000 historical anonymized thin-file statements',
        'Calibrate feature weights: Target KS Statistic > 35, AUC-ROC > 0.72',
        'Establish automated adverse action reason code sanity thresholds',
      ],
    },
    {
      phase: 'Phase 2 • Days 31–60',
      title: 'Closed Beta Pilot (500 Borrowers)',
      focus: 'Live deployment with Jaipur gig workforce',
      items: [
        'Onboard 500 Jaipur delivery partners & small shopkeepers with informed consent',
        'Deploy Account Aggregator consent flow & SHA-256 verified monthly reports',
        'Partner NBFC issues conservative stepped micro-credit lines (₹5,000–₹15,000)',
        'Monitor user comprehension, consent completion rates, and friction points',
      ],
    },
    {
      phase: 'Phase 3 • Days 61–90',
      title: 'Performance & Fairness Audit',
      focus: 'Delinquency measurement and expansion gate',
      items: [
        'Audit 30-day early payment default rates (target < 2.5% NPA)',
        'Conduct demographic fairness gap audit across gender & regional cohorts',
        'Measure institutional turnaround: cut decisioning time from 48 hours to <3 minutes',
        'Deliver comprehensive pilot audit report to NBFC credit committees for multi-city scale',
      ],
    },
  ];

  const metrics = [
    { label: 'Approval Rate Lift', target: '+25%', desc: 'Increase in credit access for thin-file applicants compared to traditional bureau pass rates.' },
    { label: 'Portfolio Quality', target: '< 2.5%', desc: '30-day non-performing asset (NPA) delinquency ceiling on stepped micro-credit lines.' },
    { label: 'Turnaround Time', target: '< 3 mins', desc: 'Instant cash-flow assessment replacing 2–3 days of physical branch visits.' },
    { label: 'Fairness Disparity', target: '< 3.0%', desc: 'Demographic fairness divergence limit across gender and regional sub-groups.' },
  ];

  return (
    <section id="roadmap" className="relative">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32 md:px-12">
        {/* Badge */}
        <div className="reveal" style={{ transitionDelay: '100ms' }}>
          <span className="inline-block border-l-2 border-white bg-white/15 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-white backdrop-blur-md drop-shadow-md">
            Pilot Roadmap
          </span>
        </div>

        <h2
          className="reveal mt-6 max-w-3xl text-3xl font-normal leading-tight tracking-tight text-white drop-shadow-lg sm:text-4xl lg:text-5xl"
          style={{ transitionDelay: '150ms' }}
        >
          90-Day execution &amp; validation plan
        </h2>

        <p
          className="reveal mt-4 max-w-2xl text-lg text-white/70 drop-shadow-md"
          style={{ transitionDelay: '200ms' }}
        >
          A disciplined, phased rollout designed to prove statistical predictive lift, compliance, and loan performance in a controlled Jaipur cohort.
        </p>

        {/* 3 Phases Grid */}
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {phases.map((p, i) => (
            <div
              key={p.phase}
              className="reveal flex flex-col justify-between rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-md"
              style={{ transitionDelay: `${250 + i * 100}ms` }}
            >
              <div>
                <span className="font-mono text-xs uppercase text-[#e8993e] tracking-wider block">
                  {p.phase}
                </span>

                <h3 className="mt-3 text-lg font-medium text-white">
                  {p.title}
                </h3>

                <p className="mt-1 font-mono text-xs text-white/50">
                  {p.focus}
                </p>

                <div className="mt-5 space-y-2.5">
                  {p.items.map((item) => (
                    <div key={item} className="flex items-start gap-2 text-xs text-white/75 leading-relaxed">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#e8993e]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 border-t border-white/10 pt-4 flex items-center gap-2 text-[11px] font-mono text-emerald-400">
                <Flag className="h-3.5 w-3.5" />
                <span>Phase Deliverable Gated</span>
              </div>
            </div>
          ))}
        </div>

        {/* Success Metrics 4-Grid */}
        <div className="mt-14">
          <div className="flex items-center gap-2 mb-4">
            <Target className="h-4 w-4 text-[#e8993e]" />
            <h3 className="text-base font-medium text-white">
              Target Institutional Success Criteria
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {metrics.map((m) => (
              <div key={m.label} className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
                <div className="font-mono text-2xl font-bold text-[#e8993e]">
                  {m.target}
                </div>
                <div className="mt-1 text-xs font-semibold text-white">
                  {m.label}
                </div>
                <p className="mt-1 text-[11px] text-white/50 leading-relaxed">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

