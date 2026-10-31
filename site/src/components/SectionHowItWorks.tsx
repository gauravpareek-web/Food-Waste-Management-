import { stepperSteps } from '../data/content';

export default function SectionHowItWorks() {
  return (
    <section id="how-it-works" className="relative">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32 md:px-12">
        {/* Badge */}
        <div
          className="reveal"
          style={{ transitionDelay: '100ms' }}
        >
          <span className="inline-block border-l-2 border-white bg-white/15 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-white backdrop-blur-md drop-shadow-md">
            How It Works
          </span>
        </div>

        <h2
          className="reveal mt-6 max-w-3xl text-3xl font-normal leading-tight tracking-tight text-white drop-shadow-lg sm:text-4xl lg:text-5xl"
          style={{ transitionDelay: '150ms' }}
        >
          From consent to credit — in 8 steps
        </h2>

        <p
          className="reveal mt-4 max-w-2xl text-lg text-white/70 drop-shadow-md"
          style={{ transitionDelay: '200ms' }}
        >
          A transparent, privacy-first pipeline that turns everyday transactions
          into lender-ready evidence.
        </p>

        {/* Vertical stepper */}
        <div className="relative mt-16" role="list" aria-label="Pipeline steps">
          {stepperSteps.map((step, i) => {
            const isLast = i === stepperSteps.length - 1;

            return (
              <div
                key={step.num}
                className="reveal flex items-stretch"
                style={{ transitionDelay: `${100 + i * 120}ms` }}
                role="listitem"
              >
                {/* Left rail — circle + connector line */}
                <div className="relative flex flex-col items-center">
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#e8993e] text-sm font-semibold text-black drop-shadow-md"
                    aria-label={`Step ${step.num}`}
                  >
                    {step.num}
                  </div>

                  {/* Connector line */}
                  {!isLast && (
                    <div className="w-px flex-1 bg-white/15" aria-hidden="true" />
                  )}
                </div>

                {/* Right — content card */}
                <article className="mb-6 ml-6 flex-1 rounded-xl border border-white/15 bg-white/[0.08] p-5 backdrop-blur-md">
                  <h3 className="text-base font-medium text-white drop-shadow-md sm:text-lg">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/70 drop-shadow-md">
                    {step.desc}
                  </p>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
