import { Shield, Lock, FileText } from 'lucide-react';

export default function VelaCompliance() {
  return (
    <section id="compliance" className="relative py-24 sm:py-32 px-6 sm:px-12 md:px-16 bg-[#FBF6EF] text-[#0D0D0C] border-t border-[#0D0D0C]/10">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#0D0D0C]/10 pb-8">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#0D0D0C]/60 block mb-2">
              Statutory Governance &amp; Research Integrity
            </span>
            <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-[#0D0D0C]">
              FSSAI Compliance &amp; Audit Trail
            </h2>
          </div>

          <p className="max-w-md text-sm leading-relaxed text-[#0D0D0C]/70">
            Transparent disclosure of food safety boundaries under FSSAI regulations, UNEP accounting standards, and DPDP Act 2023 data protections.
          </p>
        </div>

        {/* 3 Regulatory Framework Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* FSSAI Regulations Card */}
          <div className="rounded-3xl border border-[#0D0D0C]/10 bg-white/70 p-6 sm:p-7 backdrop-blur-md">
            <div className="flex items-center gap-2 font-mono text-xs text-[#0D0D0C]/60 uppercase">
              <Shield className="h-4 w-4 text-[#0D0D0C]" />
              FSSAI Regulations 2019 [STATUTORY]
            </div>
            <h4 className="mt-3 text-lg font-medium text-[#0D0D0C]">
              Strict Surplus Definition
            </h4>
            <p className="mt-2 text-xs text-[#0D0D0C]/75 leading-relaxed">
              Food Safety and Standards (Recovery and Distribution of Surplus Food) Regulations define surplus food strictly as safe, unused food that has not been served to customers. Plate leftovers and unhygienic batches are barred under strict penal provisions.
            </p>
          </div>

          {/* UNEP Accounting Card */}
          <div className="rounded-3xl border border-[#0D0D0C]/10 bg-white/70 p-6 sm:p-7 backdrop-blur-md">
            <div className="flex items-center gap-2 font-mono text-xs text-[#0D0D0C]/60 uppercase">
              <FileText className="h-4 w-4 text-[#0D0D0C]" />
              UNEP Accounting Standard
            </div>
            <h4 className="mt-3 text-lg font-medium text-[#0D0D0C]">
              Redistribution vs. Composting
            </h4>
            <p className="mt-2 text-xs text-[#0D0D0C]/75 leading-relaxed">
              Under UNEP’s framework, food redistributed for human consumption is excluded from food-waste totals. In contrast, composting and anaerobic digestion remain classified as waste management destinations. We never count composted food as meals rescued.
            </p>
          </div>

          {/* DPDP Act Card */}
          <div className="rounded-3xl border border-[#0D0D0C]/10 bg-white/70 p-6 sm:p-7 backdrop-blur-md">
            <div className="flex items-center gap-2 font-mono text-xs text-[#0D0D0C]/60 uppercase">
              <Lock className="h-4 w-4 text-[#0D0D0C]" />
              Privacy &amp; Safety Controls
            </div>
            <h4 className="mt-3 text-lg font-medium text-[#0D0D0C]">
              DPDP Act 2023 &amp; Location Masking
            </h4>
            <p className="mt-2 text-xs text-[#0D0D0C]/75 leading-relaxed">
              Donor locations are displayed approximately before claim acceptance to prevent uncoordinated crowds. Under DPDP Act 2023, beneficiary privacy is protected with organization-level logging, completely avoiding personal data collection on vulnerable populations.
            </p>
          </div>
        </div>

        {/* Statutory Food Safety Notice */}
        <div className="mt-16 border-t border-[#0D0D0C]/10 pt-8 text-xs leading-relaxed text-[#0D0D0C]/60 space-y-4">
          <p>
            <strong className="text-[#0D0D0C]">Statutory &amp; Food Safety Notice:</strong> Vela is an operational coordination and digital traceability platform. All food surplus recovery and redistribution workflows must strictly comply with the Food Safety and Standards (Recovery and Distribution of Surplus Food) Regulations, 2019, notified under the Food Safety and Standards Act, 2006. The platform does not inspect food physically; participating Food Business Operators (FBOs) and receiving NGOs are responsible for maintaining safe holding conditions, mandatory temperature verification, and hygiene standards throughout transit and distribution.
          </p>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-[#0D0D0C]/5 font-mono text-[11px] text-[#0D0D0C]/40">
            <div>
              &copy; 2026 Vela Surplus Prevention &amp; Sharing Platform. Built for Indian Institutional Kitchens &amp; Certified NGOs.
            </div>
            <div>
              FSSAI Aligned • UNEP Food Waste Index Standard Compliant
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
