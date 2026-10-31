import { AlertTriangle, TrendingDown, ShieldAlert, Utensils, Ban, CheckCircle, Scale } from 'lucide-react';

export default function VelaResearch() {
  const wasteStreams = [
    {
      stream: 'Preparation Waste',
      example: 'Vegetable peels, stalks & trimmings',
      handling: 'Kitchen waste audit; routed to organic composting or biowaste. Excluded from meal donation.',
      badge: 'Compost / Audit',
      color: 'bg-amber-500/10 text-amber-900 border-amber-500/20',
    },
    {
      stream: 'Safe Unserved Surplus',
      example: 'Unserved cooked batches in temperature control',
      handling: 'Eligible for donation. Screened for temperature, shelf life, and allergen labeling under FSSAI.',
      badge: 'Donation Eligible [FSSAI]',
      color: 'bg-emerald-500/10 text-emerald-900 border-emerald-500/20 font-semibold',
    },
    {
      stream: 'Served Plate Leftovers',
      example: 'Food returned on customer plates',
      handling: 'STRICTLY BLOCKED from donation listing. FSSAI surplus regulations explicitly prohibit plate food.',
      badge: 'Blocked from Donation',
      color: 'bg-rose-500/10 text-rose-900 border-rose-500/20',
    },
    {
      stream: 'Spoilage & Deteriorated Stock',
      example: 'Expired dairy, compromised packaging',
      handling: 'Blocked from redistribution. Recorded for inventory loss prevention and verified disposal.',
      badge: 'Blocked / Disposal',
      color: 'bg-red-500/10 text-red-900 border-red-500/20',
    },
  ];

  return (
    <section id="research" className="relative py-24 sm:py-32 px-6 sm:px-12 md:px-16 bg-[#FBF6EF] text-[#0D0D0C]">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#0D0D0C]/10 pb-8">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#0D0D0C]/60 block mb-2">
              Phase 1 Research Synthesis • UNEP &amp; FSSAI Standards
            </span>
            <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-[#0D0D0C]">
              The Reality of Food Waste in India
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[#0D0D0C]/70">
            Separating national household statistics from operationally recoverable commercial surplus. "Food not eaten" does not mean food ready for donation.
          </p>
        </div>

        {/* 3 Pastel Summary Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Lemon Cream Panel */}
          <div className="relative rounded-3xl p-8 overflow-hidden transition-all duration-300 hover:shadow-lg border border-[#0D0D0C]/10 bg-gradient-to-b from-[#F2ECDF] to-[#F4EBC6]">
            <div className="grain-overlay absolute inset-0 z-0 opacity-40" />
            <div className="relative z-10 flex flex-col justify-between h-full">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#0D0D0C]/60 bg-[#0D0D0C]/5 px-2.5 py-1 rounded-full">
                  Household Scale [MEDIUM CONFIDENCE]
                </span>
                <div className="mt-6 font-mono text-4xl sm:text-5xl font-semibold text-[#0D0D0C]">
                  78.2M T
                </div>
                <h3 className="mt-3 text-xl font-medium text-[#0D0D0C]">
                  Annual Household Discard
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-[#0D0D0C]/75 leading-relaxed">
                  Indian households generated an estimated 78.2 million tonnes of food waste in 2022 (approx 55 kg per person/year). This includes both edible food and inedible material (peels, bones)—not 78.2M tonnes of donation-ready meals.
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[#0D0D0C]/10 font-mono text-[10px] text-[#0D0D0C]/50">
                Source: UNEP Food Waste Index Report 2024 &amp; Sansad Reply 2025
              </div>
            </div>
          </div>

          {/* Card 2: Peach & Apricot Panel */}
          <div className="relative rounded-3xl p-8 overflow-hidden transition-all duration-300 hover:shadow-lg border border-[#0D0D0C]/10 bg-gradient-to-b from-[#F8DCC7] to-[#F9CBA9]">
            <div className="grain-overlay absolute inset-0 z-0 opacity-40" />
            <div className="relative z-10 flex flex-col justify-between h-full">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#0D0D0C]/60 bg-[#0D0D0C]/5 px-2.5 py-1 rounded-full">
                  FSSAI Standard [STATUTORY]
                </span>
                <div className="mt-6 font-mono text-4xl sm:text-5xl font-semibold text-[#0D0D0C]">
                  Safe Surplus
                </div>
                <h3 className="mt-3 text-xl font-medium text-[#0D0D0C]">
                  Unserved vs. Plate Leftovers
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-[#0D0D0C]/75 leading-relaxed">
                  FSSAI’s Surplus Food Regulations define surplus strictly as safe, unused food that has not been served to customers. Plate leftovers, open buffet returns, and unsafe batches are strictly excluded from our redistribution pipeline.
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[#0D0D0C]/10 font-mono text-[10px] text-[#0D0D0C]/50">
                Source: FSSAI Surplus Food Regulations 2019
              </div>
            </div>
          </div>

          {/* Card 3: Warm Sage Mint Panel */}
          <div className="relative rounded-3xl p-8 overflow-hidden transition-all duration-300 hover:shadow-lg border border-[#0D0D0C]/10 bg-gradient-to-b from-[#E9EBE0] to-[#DFE9D4]">
            <div className="grain-overlay absolute inset-0 z-0 opacity-40" />
            <div className="relative z-10 flex flex-col justify-between h-full">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#0D0D0C]/60 bg-[#0D0D0C]/5 px-2.5 py-1 rounded-full">
                  State Context [PARLIAMENTARY DATA]
                </span>
                <div className="mt-6 font-mono text-4xl sm:text-5xl font-semibold text-[#0D0D0C]">
                  7,909 T/day
                </div>
                <h3 className="mt-3 text-xl font-medium text-[#0D0D0C]">
                  Jaipur / Rajasthan Pilot
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-[#0D0D0C]/75 leading-relaxed">
                  Rajasthan reports ~7,909 T/day MSW generation (1,748 T/day treated). While Maharashtra generates the highest MSW (24,299 T/day), Jaipur was selected for our pilot because of an operational, high-density cluster of institutional kitchens and active hunger NGOs.
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[#0D0D0C]/10 font-mono text-[10px] text-[#0D0D0C]/50">
                Source: MoEFCC 2023–24 State Municipal Dataset
              </div>
            </div>
          </div>
        </div>

        {/* 4 Waste Streams Classification Matrix */}
        <div className="mt-14 rounded-3xl border border-[#0D0D0C]/15 bg-white/80 p-6 sm:p-8 backdrop-blur-md">
          <div className="border-b border-[#0D0D0C]/10 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-[#0D0D0C]/50 block">
                FSSAI Classification Framework
              </span>
              <h4 className="text-xl sm:text-2xl font-medium text-[#0D0D0C] mt-1">
                Classifying the 4 Commercial Kitchen Streams
              </h4>
            </div>
            <span className="font-mono text-xs text-[#0D0D0C]/60 bg-[#0D0D0C]/5 px-3 py-1 rounded-full">
              Traceability at Source
            </span>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {wasteStreams.map((ws) => (
              <div
                key={ws.stream}
                className="rounded-2xl border border-[#0D0D0C]/10 bg-[#FBF6EF] p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium text-base text-[#0D0D0C]">{ws.stream}</span>
                    <span className={`font-mono text-[10px] px-2.5 py-0.5 rounded-full border ${ws.color}`}>
                      {ws.badge}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-[#0D0D0C]/50 block mt-1">
                    Example: {ws.example}
                  </span>
                  <p className="mt-3 text-xs sm:text-sm text-[#0D0D0C]/75 leading-relaxed">
                    {ws.handling}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Agricultural Harvest Loss Note */}
        <div className="mt-8 rounded-2xl border border-[#0D0D0C]/10 bg-[#F2ECDF]/60 p-5 text-xs text-[#0D0D0C]/70 leading-relaxed flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <strong className="text-[#0D0D0C] block sm:inline mr-2">
              Agricultural Harvest &amp; Post-Harvest Loss Benchmark:
            </strong>
            NABCONS/MoFPI (2022) estimates national wheat post-harvest losses at 4.17% (3.61% farm, 0.56% market), while cereals range from 3.89%–5.92% and fruits/vegetables range up to 15%.
          </div>
          <span className="font-mono text-[10px] text-[#0D0D0C]/50 shrink-0 bg-white/60 px-2.5 py-1 rounded-md border border-[#0D0D0C]/10">
            NABCONS Study 2022
          </span>
        </div>
      </div>
    </section>
  );
}
