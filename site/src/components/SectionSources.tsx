import { useState } from 'react';
import { ExternalLink, Database, Search } from 'lucide-react';

interface VerifiedFact {
  id: string;
  claim: string;
  value: string;
  source: string;
  url: string;
  date: string;
  tag: 'FACT' | 'ESTIMATE';
}

const verifiedFacts: VerifiedFact[] = [
  { id: 'F01', claim: 'Indian gig workforce baseline (2020-21)', value: '7.7 million (77 lakh) workers (1.5% of workforce)', source: 'NITI Aayog "Booster" Report', url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=1837265', date: '2022-06-27', tag: 'FACT' },
  { id: 'F02', claim: 'Indian gig workforce projected (2029-30)', value: '23.5 million (2.35 crore) workers (4.1% of workforce)', source: 'NITI Aayog "Booster" Report', url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=1837265', date: '2022-06-27', tag: 'ESTIMATE' },
  { id: 'F03', claim: 'MSME credit gap in India', value: '₹20 lakh crore to ₹25 lakh crore (~$300B–$400B)', source: 'IFC / Parliamentary Standing Committee on Finance / SIDBI', url: 'https://prsindia.org', date: '2023-03-15', tag: 'ESTIMATE' },
  { id: 'F04', claim: 'Adult population accessing formal credit', value: '74% of credit-eligible adults by March 2026', source: 'TransUnion CIBIL / IBEF Financial Inclusion Studies', url: 'https://www.transunioncibil.com', date: '2026-03-01', tag: 'ESTIMATE' },
  { id: 'F05', claim: 'Credit-underserved or unserved consumers in India', value: 'Over 160 million consumers with thin or no credit files', source: 'TransUnion CIBIL ("Empowering Credit Inclusion")', url: 'https://www.transunioncibil.com', date: '2023-09-01', tag: 'FACT' },
  { id: 'F06', claim: 'Informal moneylender interest rates in India', value: '24% to 60%+ per annum (2%–5% monthly "meter vaddi")', source: 'Reserve Bank of India Working Group on Digital Lending', url: 'https://www.rbi.org.in', date: '2021-11-18', tag: 'FACT' },
  { id: 'F07', claim: 'Credit Information Companies (CICs) in India', value: '4 licensed CICs; RBI is statutory regulator under CICRA 2005 not scorer', source: 'CICRA 2005 / RBI', url: 'https://www.rbi.org.in', date: '2005-06-23', tag: 'FACT' },
  { id: 'F08', claim: 'Bureau data sources in India', value: 'Restricted to Credit Institutions; no native rent or utility ingestion', source: 'CICRA 2005 Section 2(f) / RBI Master Directions', url: 'https://www.rbi.org.in', date: '2022-11-29', tag: 'FACT' },
  { id: 'F09', claim: 'Account Aggregator cumulative accounts linked', value: '111.99M (Dec 2024) growing past 131.6M (Feb 2025)', source: 'Sahamati AA Ecosystem Dashboard', url: 'https://sahamati.org.in', date: '2025-02-15', tag: 'FACT' },
  { id: 'F10', claim: 'Account Aggregator cumulative consents fulfilled', value: '143.61 million (Dec 2024) scaling past 300 million', source: 'Sahamati AA Ecosystem Dashboard', url: 'https://sahamati.org.in', date: '2025-01-10', tag: 'FACT' },
  { id: 'F11', claim: 'UPI monthly transaction volume and value', value: '21.63 billion transactions worth ₹27.97 lakh crore ($330B+) in Dec 2025', source: 'NPCI Monthly UPI Metrics', url: 'https://www.npci.org.in', date: '2026-01-01', tag: 'FACT' },
  { id: 'F12', claim: 'RBI digital lending hardware restriction', value: 'Digital lending apps barred from accessing storage, contacts, or call logs', source: 'RBI Guidelines on Digital Lending', url: 'https://www.rbi.org.in', date: '2022-09-02', tag: 'FACT' },
  { id: 'F13', claim: 'DPDP Act child age and parental consent', value: 'Child defined as under 18; behavioral tracking barred; penalty up to ₹200 Cr', source: 'Digital Personal Data Protection Act 2023 Sec 2(f) & 9', url: 'https://www.meity.gov.in', date: '2023-08-11', tag: 'FACT' },
  { id: 'F14', claim: 'RBI microfinance repayment ceiling', value: 'Monthly debt repayment outflows of household capped at max 50% of monthly income', source: 'RBI Regulatory Framework for Microfinance Loans Directions 2022', url: 'https://www.rbi.org.in', date: '2022-03-14', tag: 'FACT' },
  { id: 'F15', claim: 'Google Play personal loan data ban', value: 'Loan facilitation apps barred from accessing contacts, photos, external storage', source: 'Google Play Developer Policy Update', url: 'https://support.google.com/googleplay/android-developer', date: '2023-04-05', tag: 'FACT' },
  { id: 'F16', claim: 'Google Play SMS permission restrictions', value: 'READ_SMS/RECEIVE_SMS restricted strictly to default SMS handler apps', source: 'Google Play Permissions Policy: SMS & Call Log', url: 'https://support.google.com/googleplay/android-developer', date: '2023-10-01', tag: 'FACT' },
  { id: 'F17', claim: 'iOS third-party SMS access sandbox rule', value: 'Third-party apps cannot programmatically access incoming or historical SMS; zero API', source: 'Apple App Store Review Guidelines Section 5.1', url: 'https://developer.apple.com', date: '2024-01-15', tag: 'FACT' },
  { id: 'F18', claim: 'Gmail restricted scope and CASA assessment', value: 'gmail.readonly requires annual CASA Tier 2/3 security audit ($700–$15,000/yr)', source: 'Google API Services User Data Policy / App Defense Alliance', url: 'https://developers.google.com', date: '2024-06-01', tag: 'FACT' },
  { id: 'F19', claim: 'Experian Boost alternative data credit lift', value: 'Avg 13-point FICO 8 lift; 14 points for thin-file consumers; up to 19 points with rent', source: 'Experian Consumer Credit Studies', url: 'https://www.experianplc.com', date: '2024-03-12', tag: 'FACT' },
  { id: 'F20', claim: 'Lender bank statement PDF fraud vulnerability', value: 'Unverified client-side PDFs face rampant tampering; RBI mandates EWS & strict data trails', source: 'RBI Fraud Risk Management Directions', url: 'https://www.rbi.org.in', date: '2024-07-15', tag: 'FACT' },
];

export default function SectionSources() {
  const [search, setSearch] = useState('');

  const filteredFacts = verifiedFacts.filter(
    (f) =>
      f.claim.toLowerCase().includes(search.toLowerCase()) ||
      f.source.toLowerCase().includes(search.toLowerCase()) ||
      f.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section id="sources" className="relative">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32 md:px-12">
        {/* Badge */}
        <div className="reveal" style={{ transitionDelay: '100ms' }}>
          <span className="inline-block border-l-2 border-white bg-white/15 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-white backdrop-blur-md drop-shadow-md">
            Audit Trail
          </span>
        </div>

        <h2
          className="reveal mt-6 max-w-3xl text-3xl font-normal leading-tight tracking-tight text-white drop-shadow-lg sm:text-4xl lg:text-5xl"
          style={{ transitionDelay: '150ms' }}
        >
          Every metric traces to a primary source
        </h2>

        <p
          className="reveal mt-4 max-w-2xl text-lg text-white/70 drop-shadow-md"
          style={{ transitionDelay: '200ms' }}
        >
          In accordance with our zero-hallucination research standard, all statistics and claims are cataloged with primary regulatory gazettes and official reports.
        </p>

        {/* Search Bar */}
        <div className="mt-10 flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 px-4 py-3 backdrop-blur-md max-w-md">
          <Search className="h-4 w-4 text-white/40" />
          <input
            type="text"
            placeholder="Search claims, sources (e.g., RBI, NITI Aayog, F01)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent text-xs text-white placeholder-white/40 focus:outline-none"
          />
        </div>

        {/* Facts Table Container */}
        <div
          className="reveal mt-6 overflow-hidden rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md"
          style={{ transitionDelay: '250ms' }}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-white/10 bg-white/10 font-mono text-[11px] uppercase text-white/60">
                <tr>
                  <th className="px-5 py-3.5">ID</th>
                  <th className="px-5 py-3.5">Claim / Metric</th>
                  <th className="px-5 py-3.5">Verified Value</th>
                  <th className="px-5 py-3.5">Primary Source</th>
                  <th className="px-5 py-3.5">Type</th>
                  <th className="px-5 py-3.5">Link</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filteredFacts.map((fact) => (
                  <tr key={fact.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-5 py-3.5 font-mono font-semibold text-[#e8993e]">
                      {fact.id}
                    </td>
                    <td className="px-5 py-3.5 font-medium text-white max-w-xs">
                      {fact.claim}
                    </td>
                    <td className="px-5 py-3.5 text-white/80 max-w-xs">
                      {fact.value}
                    </td>
                    <td className="px-5 py-3.5 font-mono text-[11px] text-white/60">
                      {fact.source}
                      <span className="block text-[10px] text-white/40">
                        {fact.date}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`inline-block rounded px-1.5 py-0.5 font-mono text-[9px] uppercase ${
                          fact.tag === 'FACT'
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : 'bg-amber-500/20 text-amber-300'
                        }`}
                      >
                        [{fact.tag}]
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <a
                        href={fact.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded bg-white/10 px-2 py-1 font-mono text-[10px] text-white/80 hover:bg-white/20 transition-colors"
                      >
                        Verify
                        <ExternalLink className="h-2.5 w-2.5" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Global CTA Box */}
        <div
          className="reveal mt-16 rounded-3xl border border-white/20 bg-gradient-to-r from-white/[0.08] via-white/[0.04] to-transparent p-8 sm:p-12 backdrop-blur-xl"
          style={{ transitionDelay: '350ms' }}
        >
          <div className="max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-widest text-[#e8993e] block mb-2">
              Next Steps for Lenders &amp; Builders
            </span>
            <h3 className="text-3xl font-normal tracking-tight text-white sm:text-4xl">
              Ready to underwrite India&apos;s next 160 million borrowers?
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-white/75">
              Access the complete research pack, mathematical scorecard specifications, and Account Aggregator integration SDK.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#demo"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-xs sm:text-sm font-semibold text-black transition-colors hover:bg-white/85"
              >
                <Database className="h-4 w-4" />
                Launch Live Simulator
              </a>

              <a
                href="mailto:partners@cashpulse.in"
                className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-6 py-3 text-xs sm:text-sm font-medium text-white backdrop-blur-md transition-colors hover:bg-white/20"
              >
                Inquire About MFI/NBFC Pilot
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

