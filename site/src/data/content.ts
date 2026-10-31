// Verified facts from research_pack.md — every stat on the site traces here
export const facts = {
  // F01-F02: Gig workforce
  gigWorkforceBaseline: { value: '7.7M', label: 'Gig Workers (2020-21)', source: 'NITI Aayog', tag: 'FACT' as const },
  gigWorkforceProjected: { value: '23.5M', label: 'Projected by 2029-30', source: 'NITI Aayog', tag: 'ESTIMATE' as const },
  // F03: MSME credit gap
  msmeCreditGap: { value: '₹20–25L Cr', label: 'MSME Credit Gap', source: 'IFC / SIDBI', tag: 'ESTIMATE' as const },
  // F05: Credit invisible
  creditInvisible: { value: '160M+', label: 'Credit-Invisible Adults', source: 'TransUnion CIBIL', tag: 'FACT' as const },
  // F06: Moneylender rates
  moneylenderRates: { value: '24–60%', label: 'Informal Lending Rates', source: 'RBI Working Group', tag: 'FACT' as const },
  // F09-F10: Account Aggregator
  aaAccountsLinked: { value: '131M+', label: 'AA Accounts Linked', source: 'Sahamati', tag: 'FACT' as const },
  aaConsents: { value: '143M+', label: 'Consents Fulfilled', source: 'Sahamati', tag: 'FACT' as const },
  // F11: UPI
  upiMonthlyTxns: { value: '21.6B', label: 'Monthly UPI Transactions', source: 'NPCI', tag: 'FACT' as const },
  // F14: MFI ceiling
  mfiRepaymentCeiling: { value: '50%', label: 'Max EMI-to-Income', source: 'RBI MFI Directions', tag: 'FACT' as const },
  // F19: Experian Boost
  experianBoostLift: { value: '13–19 pts', label: 'Avg Score Lift (Alt Data)', source: 'Experian', tag: 'FACT' as const },
} as const;

export const caseStudies = [
  {
    name: 'Kinara Capital',
    country: 'India',
    what: 'AI/ML cash-flow assessment for collateral-free MSME loans',
    result: '₹4,000+ Cr disbursed; 24-hour turnaround for thin-file borrowers',
    source: 'Kinara Capital / CRISIL (2024)',
  },
  {
    name: 'Experian Boost',
    country: 'United States',
    what: 'Opt-in utility, telecom, and rent reporting into credit files',
    result: 'Average 13-point FICO 8 lift; 85% of thin-file users saw increase',
    source: 'Experian Consumer Studies (2024)',
  },
  {
    name: 'M-Shwari (M-Pesa)',
    country: 'Kenya',
    what: 'Mobile-money transaction velocity for micro-credit underwriting',
    result: '30M+ accounts; ~2.0–2.5% 30-day NPL rate',
    source: 'CGAP / Central Bank of Kenya',
  },
  {
    name: 'Nubank',
    country: 'Brazil',
    what: 'Dynamic micro-limits ($10–$50) expanding via real-time behavior',
    result: '100M+ customers; lower credit losses than legacy incumbents',
    source: 'Nubank SEC S-1 Filings',
  },
  {
    name: 'Axis Bank (AA)',
    country: 'India',
    what: 'Account Aggregator integration for unsecured MSME/personal credit',
    result: 'Underwriting cut from 2–3 days to minutes; eliminated manual branch visits',
    source: 'Sahamati / Axis Bank (2024)',
  },
];

export const scoreFeatures = [
  { id: 's1', name: 'Recurring Payment Regularity', weight: 30, desc: 'On-time consistency of rent, utilities, and recurring merchant payments over 6 months.' },
  { id: 's2', name: 'Inflow-to-Outflow Surplus', weight: 25, desc: 'Net monthly income inflows vs total operational expenditures.' },
  { id: 's3', name: 'Inflow Volatility', weight: 20, desc: 'Lower month-to-month income variance yields higher score.' },
  { id: 's4', name: 'Balance Buffer Days', weight: 15, desc: 'Days per month with balance > 20% of median monthly expenditure.' },
  { id: 's5', name: 'Active Earning Frequency', weight: 10, desc: 'Days per month with verified incoming business credits.' },
];

export const reasonCodes = [
  { code: 'RC01', desc: 'Trailing rent or recurring bill payment irregularity in past 90 days' },
  { code: 'RC02', desc: 'High income volatility: monthly deposits fluctuate >40% month-over-month' },
  { code: 'RC03', desc: 'Insufficient surplus: monthly outflow exceeds 80% of verified inflows' },
  { code: 'RC04', desc: 'Low liquidity buffer: balance below threshold >15 days in trailing cycle' },
  { code: 'RC05', desc: 'Insufficient observation depth: fewer than 90 days of continuous history' },
];

export const riskRegister = [
  { risk: 'Google Play App Removal', category: 'Platform', impact: 'Critical', mitigation: 'Use RBI Account Aggregator framework; drop READ_SMS dependency entirely.' },
  { risk: 'Zero iOS SMS Functionality', category: 'Technical', impact: 'Critical', mitigation: 'Platform-agnostic AA consent flow + bank PDF upload + email forwarding parser.' },
  { risk: 'Document Tampering & PDF Fraud', category: 'Credit Risk', impact: 'High', mitigation: 'SHA-256 hash verification; QR code for instant lender lookup.' },
  { risk: 'DPDP Penalty on Student Minors', category: 'Regulatory', impact: 'Critical', mitigation: 'Restrict onboarding strictly to users aged 18+.' },
  { risk: 'Lender Rejection of Self-Generated PDF', category: 'Commercial', impact: 'High', mitigation: 'Partner with NBFCs; provide API with verified AA consent tokens.' },
];

export const dataRoutes = [
  { route: 'Account Aggregator (AA)', android: '✅ Primary', ios: '✅ Primary', integrity: 'Tamper-Proof', recommendation: 'Recommended' },
  { route: 'Bank PDF Upload', android: '✅ Fallback', ios: '✅ Fallback', integrity: 'Medium (needs fraud detection)', recommendation: 'Supported' },
  { route: 'Gmail API', android: '⚠️ Secondary', ios: '⚠️ Secondary', integrity: 'High', recommendation: 'After CASA compliance' },
  { route: 'SMS Reading', android: '❌ Blocked by Play Policy', ios: '❌ Impossible (No API)', integrity: 'N/A', recommendation: 'Discarded' },
];

export const stepperSteps = [
  { num: 1, title: 'Consent & Onboard', desc: 'User grants granular, DPDP-compliant consent for each data source.' },
  { num: 2, title: 'Secure Data Ingestion', desc: 'Account Aggregator pulls encrypted bank data directly from FIPs. No device scraping.' },
  { num: 3, title: 'On-Device Parsing', desc: 'Transaction alerts parsed locally. OTPs and personal messages strictly ignored.' },
  { num: 4, title: 'Payee Matching', desc: 'UPI VPA fingerprinting identifies recurring landlords, merchants, and utility providers.' },
  { num: 5, title: 'Monthly Ledger', desc: 'Categorized spending, inflow stability, and recurring obligation tracking generated.' },
  { num: 6, title: 'Score & Reason Codes', desc: 'Cash-Flow & Payment-Discipline Score (300–850) with transparent adverse action codes.' },
  { num: 7, title: 'Verified PDF Report', desc: 'Cryptographically signed report with SHA-256 hash and QR verification code.' },
  { num: 8, title: 'Lender Limit Check', desc: 'NBFC/MFI verifies report, sets conservative stepped credit limit within RBI ceiling.' },
];

