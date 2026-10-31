import { dataRoutes } from '../data/content';
import { Shield, Smartphone, AlertTriangle, Check, X, Lock } from 'lucide-react';

export default function SectionCompliance() {
  const privacyPillars = [
    {
      title: 'What We Read (Strict Minimization)',
      items: [
        'Account Aggregator encrypted bank inflow/outflow credits',
        'Merchant and payee identifiers (UPI VPA tags)',
        'Payment timestamp and recurring frequency indicators',
        'Opening and closing balance snapshots via verified FIPs',
      ],
      icon: Check,
      color: 'text-emerald-400',
    },
    {
      title: 'What We Never Read or Collect',
      items: [
        'Zero OTPs or two-factor authentication credentials',
        'Zero personal chats, WhatsApp, or private communication',
        'Zero contact book, address book, or telephony logs [FACT]',
        'Zero photo gallery, video, or device storage access [FACT]',
      ],
      icon: X,
      color: 'text-red-400',
    },
  ];

  return (
    <section id="compliance" className="relative">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32 md:px-12">
        {/* Badge */}
        <div className="reveal" style={{ transitionDelay: '100ms' }}>
          <span className="inline-block border-l-2 border-white bg-white/15 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-white backdrop-blur-md drop-shadow-md">
            Privacy &amp; Compliance
          </span>
        </div>

        <h2
          className="reveal mt-6 max-w-3xl text-3xl font-normal leading-tight tracking-tight text-white drop-shadow-lg sm:text-4xl lg:text-5xl"
          style={{ transitionDelay: '150ms' }}
        >
          Built for India&apos;s strict privacy and platform boundaries
        </h2>

        <p
          className="reveal mt-4 max-w-2xl text-lg text-white/70 drop-shadow-md"
          style={{ transitionDelay: '200ms' }}
        >
          We operate with absolute transparency regarding store policies, operating system sandboxes, and the Digital Personal Data Protection (DPDP) Act, 2023.
        </p>

        {/* Data Ingestion Feasibility Matrix */}
        <div
          className="reveal mt-14 overflow-hidden rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md"
          style={{ transitionDelay: '250ms' }}
        >
          <div className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
            <h3 className="text-base font-medium text-white flex items-center gap-2">
              <Smartphone className="h-4 w-4 text-[#e8993e]" />
              Platform Data Ingestion Feasibility Matrix
            </h3>
            <span className="font-mono text-[10px] text-white/50 uppercase">
              Audited Oct 2026
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-white/10 bg-white/5 font-mono text-[11px] uppercase text-white/60">
                <tr>
                  <th className="px-6 py-3.5">Data Route</th>
                  <th className="px-6 py-3.5">Android Support</th>
                  <th className="px-6 py-3.5">iOS Support</th>
                  <th className="px-6 py-3.5">Data Integrity</th>
                  <th className="px-6 py-3.5">Architecture Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {dataRoutes.map((row) => (
                  <tr key={row.route} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-medium text-white">
                      {row.route}
                    </td>
                    <td className="px-6 py-4 text-white/80">{row.android}</td>
                    <td className="px-6 py-4 text-white/80">{row.ios}</td>
                    <td className="px-6 py-4 font-mono text-white/70">
                      {row.integrity}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase font-medium ${
                          row.recommendation === 'Recommended'
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : row.recommendation === 'Supported'
                            ? 'bg-blue-500/20 text-blue-300'
                            : row.recommendation === 'After CASA compliance'
                            ? 'bg-amber-500/20 text-amber-300'
                            : 'bg-red-500/20 text-red-300'
                        }`}
                      >
                        {row.recommendation}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Technical & Policy Honesty Callout */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* iOS Sandbox Callout */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
            <div className="flex items-center gap-2 text-white font-medium text-sm">
              <AlertTriangle className="h-4 w-4 text-amber-400" />
              Why iOS Cannot Read SMS [FACT]
            </div>
            <p className="mt-2 text-xs text-white/70 leading-relaxed">
              Apple&apos;s iOS sandbox strictly prohibits any third-party app from programmatically accessing or intercepting incoming or historical user SMS messages. There is zero public API. Apps claiming to read SMS on iOS are technically non-functional. On iOS, CashPulse operates 100% via Account Aggregator and secure statement uploads.
            </p>
          </div>

          {/* Google Play & CASA Callout */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
            <div className="flex items-center gap-2 text-white font-medium text-sm">
              <Lock className="h-4 w-4 text-[#e8993e]" />
              Google Play Policies &amp; Gmail CASA Audit [FACT]
            </div>
            <p className="mt-2 text-xs text-white/70 leading-relaxed">
              Google Play developer policies restrict <code>READ_SMS</code> exclusively to default SMS handler apps, and the May 2023 Personal Loans policy explicitly bans loan facilitation apps from accessing contacts or external storage. Gmail API restricted scopes require an annual CASA Tier 2/3 independent security audit ($700–$15,000+/yr).
            </p>
          </div>
        </div>

        {/* DPDP Act What We Read vs Never Read */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {privacyPillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-md sm:p-8"
              >
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 ${pillar.color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <h3 className="text-base font-medium text-white">
                    {pillar.title}
                  </h3>
                </div>

                <div className="mt-5 space-y-3">
                  {pillar.items.map((item) => (
                    <div key={item} className="flex items-start gap-2.5 text-xs text-white/75">
                      <span className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${pillar.color}`} />
                      <span className="leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* DPDP Act Section 9 Notice */}
        <div className="mt-8 rounded-xl border-l-4 border-emerald-400 border border-white/10 bg-white/5 p-4 text-xs text-white/80 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-emerald-400 shrink-0" />
            <strong className="text-white">DPDP Act 2023 Section 9 Mandatory Minor Protection:</strong>
          </div>
          <p className="mt-1.5 leading-relaxed text-white/70">
            India defines a child as any individual under 18 years of age. Behavioral tracking and profiling of minors is strictly prohibited under penalty of up to ₹200 crore. CashPulse mandates 18+ age verification during onboarding to ensure absolute compliance with Section 9.
          </p>
        </div>
      </div>
    </section>
  );
}

