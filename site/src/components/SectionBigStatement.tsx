export default function SectionBigStatement() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-36 px-5 sm:px-8 md:px-12 flex flex-col items-center justify-center text-center">
      {/* Curved atmospheric glow along the horizon like Image 3 & 4 */}
      <div
        className="pointer-events-none absolute -bottom-32 left-1/2 h-[350px] w-[140%] -translate-x-1/2 rounded-[100%] bg-gradient-to-t from-[#e8993e]/15 via-[#e8993e]/5 to-transparent blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-5xl">
        <span className="reveal inline-block border-l-2 border-[#e8993e] bg-white/10 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-[#e8993e] backdrop-blur-md mb-8">
          The Alternative Standard
        </span>

        {/* Big Bold Headline matching Image 3 style */}
        <h2 className="reveal text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white drop-shadow-2xl leading-[0.95]">
          So We Built
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-[#e8993e]">
            Credit Scoring
          </span>
          <br />
          As It Should Be
        </h2>

        <p className="reveal mt-8 max-w-2xl mx-auto text-base sm:text-xl text-white/75 font-normal leading-relaxed drop-shadow-md">
          Zero past loan history required. Zero physical collateral. Zero invasive device scraping. Pure behavioral discipline verified via RBI-regulated Account Aggregator.
        </p>

        <div className="reveal mt-10 flex flex-wrap items-center justify-center gap-6 font-mono text-xs uppercase tracking-wider text-white/60">
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#e8993e]" />
            143M+ AA Consents
          </span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            DPDP Act 2023 Compliant
          </span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
            SHA-256 Tamper-Proof
          </span>
        </div>
      </div>
    </section>
  );
}

