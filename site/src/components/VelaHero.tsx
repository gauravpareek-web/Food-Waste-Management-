import { useState, useEffect } from 'react';

interface VerbSlot {
  word: string;
  iconUrl: string;
  baseGradient: string;
  glowColor: string;
  tintColor: string;
}

const VERB_SLOTS: VerbSlot[] = [
  {
    word: 'Prevent',
    iconUrl: 'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/83de7c35-dd91-4e56-bfb8-0ffafc83d0e0.webp',
    baseGradient: 'linear-gradient(180deg, #F2ECDF 0%, #F4EBC6 100%)',
    glowColor: 'rgb(246, 222, 104)',
    tintColor: '#E9C22E',
  },
  {
    word: 'Rescue',
    iconUrl: 'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/4d952211-0474-48cc-af48-58f68b3b7525.webp',
    baseGradient: 'linear-gradient(180deg, #F8DCC7 0%, #F9CBA9 100%)',
    glowColor: 'rgb(249, 150, 84)',
    tintColor: '#F2772F',
  },
  {
    word: 'Verify',
    iconUrl: 'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/e2e91fca-5b3f-4e0e-a437-8a581592e407.webp',
    baseGradient: 'linear-gradient(180deg, #E9EBE0 0%, #DFE9D4 100%)',
    glowColor: 'rgb(150, 206, 150)',
    tintColor: '#3FB874',
  },
  {
    word: 'Nourish',
    iconUrl: 'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/6b32bb47-4ad6-4938-a637-c997b373c68b.webp',
    baseGradient: 'linear-gradient(180deg, #F0E4E6 0%, #ECD6E2 100%)',
    glowColor: 'rgb(222, 150, 200)',
    tintColor: '#C564C4',
  },
];

interface VelaHeroProps {
  onJoinVela?: () => void;
}

export default function VelaHero({ onJoinVela }: VelaHeroProps) {
  const [slotIndex, setSlotIndex] = useState(0);
  const [animState, setAnimState] = useState<'entering' | 'holding' | 'leaving'>('entering');

  useEffect(() => {
    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let enterTimer: NodeJS.Timeout;
    let leaveTimer: NodeJS.Timeout;
    let nextTimer: NodeJS.Timeout;

    const runSlot = () => {
      setAnimState('entering');

      // Hold state after enter
      enterTimer = setTimeout(() => {
        setAnimState('holding');
      }, 500);

      // Start leaving at 1.33s (so 0.42s leave animation completes at 1.75s)
      leaveTimer = setTimeout(() => {
        setAnimState('leaving');
      }, 1330);

      // Advance slot at 1.75s
      nextTimer = setTimeout(() => {
        setSlotIndex((prev) => (prev + 1) % VERB_SLOTS.length);
        runSlot();
      }, 1750);
    };

    runSlot();

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(leaveTimer);
      clearTimeout(nextTimer);
    };
  }, []);

  const currentSlot = VERB_SLOTS[slotIndex];

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#FBF6EF] text-[#0D0D0C]">
      {/* Dynamic Stacked Pastel Gradient Panel (Top 75% Viewport) */}
      <div
        className="relative w-full flex-1 transition-all duration-700 ease-out flex flex-col justify-between px-6 sm:px-12 md:px-16 pt-6 pb-12 overflow-hidden"
        style={{
          background: currentSlot.baseGradient,
        }}
      >
        {/* Soft Radial Glows at bottom right and bottom left */}
        <div
          className="pointer-events-none absolute bottom-0 right-0 h-[480px] w-[540px] rounded-full blur-[100px] opacity-75 transition-colors duration-700"
          style={{ backgroundColor: currentSlot.glowColor }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-20 left-1/4 h-[380px] w-[460px] rounded-full blur-[110px] opacity-45 transition-colors duration-700"
          style={{ backgroundColor: currentSlot.glowColor }}
          aria-hidden="true"
        />

        {/* Grain Noise Overlay */}
        <div className="grain-overlay absolute inset-0 z-10" aria-hidden="true" />

        {/* Navigation Bar (80u tall with hairline) */}
        <nav className="relative z-20 flex w-full items-center justify-between border-b border-[#0D0D0C]/10 pb-5">
          {/* Left: 13u black dot + "vela" 600 weight */}
          <div className="flex items-center gap-2.5">
            <span className="h-3 w-3 rounded-full bg-[#0D0D0C]" />
            <span className="text-2xl font-semibold tracking-tight text-[#0D0D0C]">
              vela
            </span>
          </div>

          {/* Right Links + Button */}
          <div className="flex items-center gap-6 sm:gap-10">
            <div className="hidden items-center gap-8 text-sm font-medium text-[#0D0D0C]/75 md:flex">
              <a href="#research" className="hover:text-[#0D0D0C] transition-colors">Research</a>
              <a href="#solution" className="hover:text-[#0D0D0C] transition-colors">Solution</a>
              <a href="#simulator" className="hover:text-[#0D0D0C] transition-colors">Simulator</a>
              <a href="#compliance" className="hover:text-[#0D0D0C] transition-colors">Compliance</a>
            </div>

            <button
              onClick={onJoinVela}
              className="rounded-[7px] border-[1.4px] border-[#0D0D0C] px-5 py-2.5 text-xs sm:text-sm font-medium tracking-tight text-[#0D0D0C] transition-all duration-300 hover:bg-[#0D0D0C] hover:text-[#FBF6EF] cursor-pointer"
            >
              Join Vela
            </button>
          </div>
        </nav>

        {/* Huge Grotesk Headline */}
        <div className="relative z-20 my-auto pt-8 pb-6 max-w-5xl">
          <div className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-[-0.032em] text-[#0D0D0C] leading-[0.88]">
            {/* Line 1: Cycling slot (Icon + Verb) */}
            <div className="flex items-center gap-3 sm:gap-5 min-h-[1.1em]">
              <div
                className="relative inline-flex items-center justify-center h-[1em] w-[1em] shrink-0 transition-transform duration-500 ease-out"
                style={{
                  transform:
                    animState === 'entering'
                      ? 'scale(0.8) rotate(-14deg)'
                      : animState === 'leaving'
                      ? 'scale(0.95) translateY(-0.16em)'
                      : 'scale(1) rotate(0deg)',
                  filter: animState === 'leaving' ? 'blur(6px)' : 'none',
                  opacity: animState === 'leaving' ? 0 : 1,
                }}
              >
                <img
                  src={currentSlot.iconUrl}
                  alt={currentSlot.word}
                  className="h-full w-full object-contain filter grayscale contrast-110"
                />
                {/* Tint overlay layer */}
                <div
                  className="absolute inset-0 pointer-events-none mix-blend-color"
                  style={{
                    backgroundColor: currentSlot.tintColor,
                    maskImage: `url(${currentSlot.iconUrl})`,
                    WebkitMaskImage: `url(${currentSlot.iconUrl})`,
                    maskSize: 'contain',
                    WebkitMaskSize: 'contain',
                    maskRepeat: 'no-repeat',
                    WebkitMaskRepeat: 'no-repeat',
                    maskPosition: 'center',
                    WebkitMaskPosition: 'center',
                  }}
                />
              </div>

              {/* The Cycling Verb */}
              <span
                className="inline-block transition-all duration-500 ease-out"
                style={{
                  transform:
                    animState === 'entering'
                      ? 'translateY(0.3em)'
                      : animState === 'leaving'
                      ? 'translateY(-0.16em)'
                      : 'translateY(0)',
                  opacity: animState === 'leaving' ? 0 : 1,
                  filter: animState === 'leaving' ? 'blur(8px)' : 'none',
                }}
              >
                {currentSlot.word}
              </span>
            </div>

            {/* Line 2: "in your terms" (Permanent) */}
            <div className="mt-1 sm:mt-2 text-[#0D0D0C]">
              in your terms
            </div>
          </div>

          {/* Action Row at bottom of panel */}
          <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t border-[#0D0D0C]/10 pt-6">
            {/* Two Outlined Action Buttons */}
            <div className="flex items-center gap-3">
              <a
                href="#solution"
                className={`inline-flex items-center gap-2 rounded-xl border border-[#0D0D0C] px-5 py-3 text-xs font-medium text-[#0D0D0C] transition-all duration-300 ${
                  currentSlot.word === 'Nourish'
                    ? 'bg-[#0D0D0C] text-[#FBF6EF]'
                    : 'bg-transparent hover:bg-[#0D0D0C]/5'
                }`}
              >
                <span>Explore Platform</span>
              </a>

              <a
                href="#compliance"
                className="inline-flex items-center gap-2 rounded-xl border border-[#0D0D0C] bg-transparent px-5 py-3 text-xs font-medium text-[#0D0D0C] transition-all duration-300 hover:bg-[#0D0D0C]/5"
              >
                <span>FSSAI Regulations</span>
              </a>
            </div>

            {/* 2-line caption */}
            <p className="max-w-md text-xs sm:text-sm leading-relaxed text-[#0D0D0C]/70">
              Vela is an integrated food-surplus prevention and verified redistribution platform connecting commercial kitchens with certified NGOs under FSSAI regulations.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Strip with S-Curve Notch (Bottom 25% of the screen in cream #FBF6EF) */}
      <div className="relative w-full bg-[#FBF6EF] px-6 sm:px-12 md:px-16 pt-3 pb-8">
        {/* Notch SVG Top Contour — Smooth S-curve rising into a fin on the right side */}
        <div className="absolute -top-[61px] left-0 w-full overflow-hidden leading-none pointer-events-none" aria-hidden="true">
          <svg
            viewBox="0 0 1440 62"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-[62px] text-[#FBF6EF]"
          >
            <path
              d="M0 62 H1062 C1092 62 1098 54 1116 34 C1138 9 1146 1 1178 1 H1440 V62 Z"
              fill="currentColor"
            />
          </svg>
        </div>

        {/* Strip Content Grid */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-2">
          <div className="md:col-span-4">
            <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-[#0D0D0C] leading-snug">
              Nothing great is
              <br />
              made alone.
            </h3>
            <p className="mt-1 font-mono text-xs text-[#0D0D0C]/50">
              Coordinated surplus redistribution pilot in Jaipur.
            </p>
          </div>

          {/* Three Key Verified Stats from projectsummary.txt */}
          <div className="md:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <div className="font-mono text-3xl sm:text-4xl font-semibold tracking-tight text-[#0D0D0C]">
                78.2M T
              </div>
              <div className="mt-1 text-xs text-[#0D0D0C]/70 font-medium">
                Household food waste
              </div>
              <span className="font-mono text-[9px] text-[#0D0D0C]/40 block mt-0.5">
                UNEP Index 2024 [MEDIUM]
              </span>
            </div>

            <div>
              <div className="font-mono text-3xl sm:text-4xl font-semibold tracking-tight text-[#0D0D0C]">
                55 kg
              </div>
              <div className="mt-1 text-xs text-[#0D0D0C]/70 font-medium">
                Per person annual waste
              </div>
              <span className="font-mono text-[9px] text-[#0D0D0C]/40 block mt-0.5">
                Sansad Reply 2025 [FACT]
              </span>
            </div>

            <div>
              <div className="font-mono text-3xl sm:text-4xl font-semibold tracking-tight text-[#0D0D0C]">
                100%
              </div>
              <div className="mt-1 text-xs text-[#0D0D0C]/70 font-medium">
                Safe unserved surplus
              </div>
              <span className="font-mono text-[9px] text-[#0D0D0C]/40 block mt-0.5">
                FSSAI 2019 Standard [REG]
              </span>
            </div>
          </div>

          {/* Right Column: Scroll Hint on the raised fin + Sprout centered directly beneath it */}
          <div className="md:col-span-2 flex flex-col items-center justify-center mt-6 md:-mt-[50px]">
            {/* Scroll hint sitting cleanly at the top of the raised fin */}
            <a
              href="#research"
              className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-normal text-[#0D0D0C]/55 hover:text-[#0D0D0C] transition-colors mb-6 cursor-pointer select-none"
            >
              <span className="text-xs sm:text-sm leading-none">↓</span>
              <span className="tracking-tight">Scroll to learn more</span>
            </a>

            {/* Symmetrical Line-Art Sprout matching reference exactly */}
            <div className="relative group cursor-pointer" title="CashPulse Organic Financial Growth">
              <svg
                width="54"
                height="66"
                viewBox="0 0 54 66"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-[#0D0D0C]/85 transition-transform duration-300 group-hover:scale-105"
                aria-label="Line-art sprout under the fin"
              >
                {/* Curved ground mound arc ⌒ */}
                <path
                  d="M 13 60 C 18 53 36 53 41 60"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                />
                {/* Straight vertical stem */}
                <line
                  x1="27"
                  y1="55"
                  x2="27"
                  y2="25"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                />
                {/* Left Leaf */}
                <path
                  d="M 27 25 C 25 14 16 10 11 12 C 9 21 18 25 27 25 Z"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Right Leaf */}
                <path
                  d="M 27 25 C 29 14 38 10 43 12 C 45 21 36 25 27 25 Z"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

