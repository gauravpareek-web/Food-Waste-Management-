import { useState } from 'react';

export default function VelaSolution() {
  const [activeTab, setActiveTab] = useState<'donors' | 'ngos'>('donors');

  const lifecycleStages = [
    { stage: '01. Listed', qty: '20 kg', detail: 'Donor posts unserved batch with prep time, holding temp (65°C), and 4h consumption deadline.' },
    { stage: '02. Accepted', qty: '20 kg', detail: 'Nearest eligible NGO with hot-holding transport reserves allocation; duplicate claims locked.' },
    { stage: '03. Collected', qty: '18 kg', detail: 'Volunteer checks temperature at pickup; 2 kg expired/held back; donor & driver exchange OTP.' },
    { stage: '04. Received', qty: '18 kg', detail: 'NGO hub acknowledges physical receipt and verifies packaging integrity on arrival.' },
    { stage: '05. Distributed', qty: '17 kg', detail: '17 kg served to community shelter; 1 kg rejected on final inspection. Dashboard records 17 kg.' },
  ];

  return (
    <section id="solution" className="relative py-24 sm:py-32 px-6 sm:px-12 md:px-16 bg-[#FBF6EF] text-[#0D0D0C] border-t border-[#0D0D0C]/10">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#0D0D0C]/10 pb-8">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#0D0D0C]/60 block mb-2">
              Platform Architecture &amp; Methodology
            </span>
            <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-[#0D0D0C]">
              Traceable Surplus Redistribution
            </h2>
          </div>

          {/* Stakeholder Tab Selector */}
          <div className="flex rounded-full border border-[#0D0D0C] p-1 bg-transparent">
            <button
              onClick={() => setActiveTab('donors')}
              className={`rounded-full px-5 py-2 text-xs font-medium transition-all ${
                activeTab === 'donors'
                  ? 'bg-[#0D0D0C] text-[#FBF6EF]'
                  : 'text-[#0D0D0C] hover:bg-[#0D0D0C]/5'
              }`}
            >
              For Commercial Kitchens
            </button>
            <button
              onClick={() => setActiveTab('ngos')}
              className={`rounded-full px-5 py-2 text-xs font-medium transition-all ${
                activeTab === 'ngos'
                  ? 'bg-[#0D0D0C] text-[#FBF6EF]'
                  : 'text-[#0D0D0C] hover:bg-[#0D0D0C]/5'
              }`}
            >
              For Receiving NGOs
            </button>
          </div>
        </div>

        {/* Dynamic Stakeholder Value Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {activeTab === 'donors' ? (
            <>
              <div className="rounded-2xl border border-[#0D0D0C]/10 bg-white/70 p-5">
                <span className="font-mono text-[10px] text-[#0D0D0C]/50 block">01 / PREVENTION</span>
                <h4 className="font-medium text-base text-[#0D0D0C] mt-2">Production Optimization</h4>
                <p className="text-xs text-[#0D0D0C]/70 mt-1 leading-relaxed">
                  Log service numbers, track recurring leftovers by menu item, and adopt smaller preparation batches to prevent avoidable surplus.
                </p>
              </div>
              <div className="rounded-2xl border border-[#0D0D0C]/10 bg-white/70 p-5">
                <span className="font-mono text-[10px] text-[#0D0D0C]/50 block">02 / ACTIONABLE LISTINGS</span>
                <h4 className="font-medium text-base text-[#0D0D0C] mt-2">FSSAI Screening Checklist</h4>
                <p className="text-xs text-[#0D0D0C]/70 mt-1 leading-relaxed">
                  Post surplus in seconds: specify kilograms, prep time, declared last consumption deadline, temperature reading, and allergens.
                </p>
              </div>
              <div className="rounded-2xl border border-[#0D0D0C]/10 bg-white/70 p-5">
                <span className="font-mono text-[10px] text-[#0D0D0C]/50 block">03 / HANDOVER OTP</span>
                <h4 className="font-medium text-base text-[#0D0D0C] mt-2">One-Time Handover Code</h4>
                <p className="text-xs text-[#0D0D0C]/70 mt-1 leading-relaxed">
                  Transfer liability and custody securely via digital OTP verification at dispatch, recording actual weighed quantity.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="rounded-2xl border border-[#0D0D0C]/10 bg-white/70 p-5">
                <span className="font-mono text-[10px] text-[#0D0D0C]/50 block">01 / ELIGIBILITY FIRST</span>
                <h4 className="font-medium text-base text-[#0D0D0C] mt-2">Time-Feasible Matching</h4>
                <p className="text-xs text-[#0D0D0C]/70 mt-1 leading-relaxed">
                  Receive allocations only when your transport meets holding requirements and distribution can complete before shelf-life expires.
                </p>
              </div>
              <div className="rounded-2xl border border-[#0D0D0C]/10 bg-white/70 p-5">
                <span className="font-mono text-[10px] text-[#0D0D0C]/50 block">02 / NO DUPLICATES</span>
                <h4 className="font-medium text-base text-[#0D0D0C] mt-2">Single-Claim Reservation</h4>
                <p className="text-xs text-[#0D0D0C]/70 mt-1 leading-relaxed">
                  Eliminate wasted volunteer runs. Once accepted, surplus is instantly locked to one verified organisation with backup rerouting.
                </p>
              </div>
              <div className="rounded-2xl border border-[#0D0D0C]/10 bg-white/70 p-5">
                <span className="font-mono text-[10px] text-[#0D0D0C]/50 block">03 / AUDIT COMPLIANCE</span>
                <h4 className="font-medium text-base text-[#0D0D0C] mt-2">Verified Distribution Log</h4>
                <p className="text-xs text-[#0D0D0C]/70 mt-1 leading-relaxed">
                  Record exact quantities handed to community beneficiaries. Maintain auditable records for CSR partners and FSSAI inspectors.
                </p>
              </div>
            </>
          )}
        </div>

        {/* The 5-Stage Life of a Donation */}
        <div className="mt-14 rounded-3xl border border-[#0D0D0C]/15 bg-white/80 p-6 sm:p-8 backdrop-blur-md">
          <div className="border-b border-[#0D0D0C]/10 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-[#0D0D0C]/50 block">
                Chain of Custody Accounting
              </span>
              <h4 className="text-xl sm:text-2xl font-medium text-[#0D0D0C] mt-1">
                The 5-Stage Journey: Quantities Logged at Every Step
              </h4>
            </div>
            <span className="font-mono text-xs text-[#0D0D0C]/60 bg-emerald-500/10 text-emerald-900 border border-emerald-500/20 px-3 py-1 rounded-full">
              Zero Overstatement Principle
            </span>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-5 gap-3">
            {lifecycleStages.map((stg) => (
              <div
                key={stg.stage}
                className="rounded-2xl border border-[#0D0D0C]/10 bg-[#FBF6EF] p-4 flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-xs text-[#0D0D0C]/50 block">{stg.stage}</span>
                  <div className="font-mono text-2xl font-semibold text-[#0D0D0C] mt-1">
                    {stg.qty}
                  </div>
                  <p className="text-[11px] text-[#0D0D0C]/70 mt-2 leading-relaxed">
                    {stg.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 rounded-xl bg-[#0D0D0C]/5 text-[11px] font-mono text-[#0D0D0C]/60">
            <strong>Audit Rule:</strong> If 20 kg is offered, 18 kg collected, and 17 kg distributed to beneficiaries, the dashboard records strictly 17 kg rescued—never inflating totals to the original 20 kg listing.
          </div>
        </div>
      </div>
    </section>
  );
}
