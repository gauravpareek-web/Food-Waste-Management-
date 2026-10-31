import { useState, useId } from 'react';
import { QrCode, ShieldCheck, CheckCircle2, Download, AlertCircle, AlertTriangle, Thermometer, Clock, Scale } from 'lucide-react';

export default function VelaSimulator() {
  const qtyId = useId();
  const tempId = useId();
  const hoursId = useId();

  // State
  const [batchKg, setBatchKg] = useState(25);
  const [temperature, setTemperature] = useState(65);
  const [hoursRemaining, setHoursRemaining] = useState(4);
  const [isServedLeftover, setIsServedLeftover] = useState(false);

  // FSSAI Safety Checks
  const isTemperatureCompliant = temperature >= 60 || temperature <= 5;
  const isTimeCompliant = hoursRemaining >= 2;
  const isDonationEligible = !isServedLeftover && isTemperatureCompliant && isTimeCompliant;

  // Meal equivalents (350g / meal assumption clearly disclosed per Section 9)
  const mealPortions = Math.floor((batchKg * 1000) / 350);

  // Equipment required
  const transportMode =
    temperature >= 60
      ? 'Thermal Insulated Hot Box (>60°C maintained)'
      : temperature <= 5
      ? 'Refrigerated Cold-Chain Van (<5°C maintained)'
      : 'Non-compliant Holding Temperature';

  // Simulated hash
  const manifestHash = `FSSAI-${(batchKg * 37 + temperature * 19).toString(16).toUpperCase()}-94E2`;

  return (
    <section id="simulator" className="relative py-24 sm:py-32 px-6 sm:px-12 md:px-16 bg-[#FBF6EF] text-[#0D0D0C] border-t border-[#0D0D0C]/10">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#0D0D0C]/10 pb-8">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#0D0D0C]/60 block mb-2">
              Interactive Dispatch &amp; Handover Manifest
            </span>
            <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-[#0D0D0C]">
              Surplus Handover Simulator
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-full bg-[#0D0D0C]/10 px-3 py-1 font-mono text-xs uppercase text-[#0D0D0C]/80">
              Interactive Prototype
            </span>
            <span className="rounded-full border border-[#0D0D0C]/20 px-3 py-1 font-mono text-xs uppercase text-[#0D0D0C]/60">
              FSSAI Rules Engine
            </span>
          </div>
        </div>

        {/* 2-Column Layout: Left = Interactive Sliders, Right = Digital Chain-of-Custody Manifest */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls & Screening (6 Cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="rounded-3xl border border-[#0D0D0C]/10 bg-white/70 p-6 sm:p-8 backdrop-blur-md">
              <h3 className="text-xl font-medium text-[#0D0D0C] mb-6">
                Configure Commercial Surplus Batch
              </h3>

              {/* Slider 1: Batch Quantity */}
              <div className="mb-6">
                <div className="flex justify-between items-center text-sm font-medium">
                  <label htmlFor={qtyId} className="cursor-pointer flex items-center gap-2">
                    <Scale className="h-4 w-4 text-[#0D0D0C]/70" />
                    <span>Unserved Batch Weight</span>
                  </label>
                  <span className="font-mono text-base font-semibold text-[#0D0D0C]">
                    {batchKg} kg
                  </span>
                </div>
                <input
                  id={qtyId}
                  type="range"
                  min={5}
                  max={100}
                  step={5}
                  value={batchKg}
                  onChange={(e) => setBatchKg(Number(e.target.value))}
                  className="mt-3 w-full accent-[#0D0D0C] cursor-pointer"
                  aria-label="Batch weight in kilograms"
                />
                <div className="mt-1 flex justify-between font-mono text-[10px] text-[#0D0D0C]/40">
                  <span>5 kg (~14 meals)</span>
                  <span>100 kg (~285 meals)</span>
                </div>
              </div>

              {/* Slider 2: Temperature Reading */}
              <div className="mb-6">
                <div className="flex justify-between items-center text-sm font-medium">
                  <label htmlFor={tempId} className="cursor-pointer flex items-center gap-2">
                    <Thermometer className="h-4 w-4 text-[#0D0D0C]/70" />
                    <span>Current Holding Temperature</span>
                  </label>
                  <span className="font-mono text-base font-semibold text-[#0D0D0C]">
                    {temperature}°C
                  </span>
                </div>
                <input
                  id={tempId}
                  type="range"
                  min={2}
                  max={75}
                  step={1}
                  value={temperature}
                  onChange={(e) => setTemperature(Number(e.target.value))}
                  className="mt-3 w-full accent-[#0D0D0C] cursor-pointer"
                  aria-label="Holding temperature in Celsius"
                />
                <div className="mt-1 flex justify-between font-mono text-[10px] text-[#0D0D0C]/40">
                  <span>Chilled (&lt;5°C)</span>
                  <span className="text-amber-800 font-semibold">Danger Zone (5°C–60°C)</span>
                  <span>Hot (&gt;60°C)</span>
                </div>
              </div>

              {/* Slider 3: Safe Consumption Window */}
              <div className="mb-6">
                <div className="flex justify-between items-center text-sm font-medium">
                  <label htmlFor={hoursId} className="cursor-pointer flex items-center gap-2">
                    <Clock className="h-4 w-4 text-[#0D0D0C]/70" />
                    <span>Safe Window Remaining</span>
                  </label>
                  <span className="font-mono text-base font-semibold text-[#0D0D0C]">
                    {hoursRemaining} hours
                  </span>
                </div>
                <input
                  id={hoursId}
                  type="range"
                  min={1}
                  max={8}
                  step={0.5}
                  value={hoursRemaining}
                  onChange={(e) => setHoursRemaining(Number(e.target.value))}
                  className="mt-3 w-full accent-[#0D0D0C] cursor-pointer"
                  aria-label="Hours remaining until consumption deadline"
                />
                <div className="mt-1 flex justify-between font-mono text-[10px] text-[#0D0D0C]/40">
                  <span>1 Hour (High Risk)</span>
                  <span>8 Hours (Fresh Batch)</span>
                </div>
              </div>

              {/* Toggle: Served Leftovers Check */}
              <div className="pt-4 border-t border-[#0D0D0C]/10">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isServedLeftover}
                    onChange={(e) => setIsServedLeftover(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded accent-[#0D0D0C] cursor-pointer"
                  />
                  <div>
                    <span className="text-xs font-semibold text-[#0D0D0C] block">
                      Simulate "Plate Leftover / Returned Buffet" food
                    </span>
                    <span className="text-[11px] text-[#0D0D0C]/65 block mt-0.5">
                      Check this box to observe FSSAI mandatory blocking of previously served food.
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* Live Eligibility Status Box */}
            <div className={`rounded-2xl border p-5 transition-all ${
              isDonationEligible
                ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-950'
                : 'bg-rose-500/10 border-rose-500/25 text-rose-950'
            }`}>
              <div className="flex items-center gap-2 font-medium text-sm">
                {isDonationEligible ? (
                  <>
                    <CheckCircle2 className="h-5 w-5 text-emerald-700" />
                    <span>FSSAI Redistribution Approved: Safe Unserved Surplus</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="h-5 w-5 text-rose-700" />
                    <span>Donation Prohibited: FSSAI Exclusion Triggered</span>
                  </>
                )}
              </div>
              <p className="text-xs mt-2 leading-relaxed opacity-85">
                {isServedLeftover
                  ? 'FSSAI Surplus Regulations 2019 strictly prohibit redistribution of food that has already been served to customers. Redirect to municipal composting.'
                  : !isTemperatureCompliant
                  ? 'Temperature is in the microbial danger zone (5°C–60°C). Food must be maintained hot (>60°C) or chilled (<5°C) to prevent spoilage.'
                  : !isTimeCompliant
                  ? 'Remaining window (<2 hours) is insufficient for safe collection transit and community distribution.'
                  : 'Batch qualifies for instant single-claim reservation by verified hunger-relief NGOs in the Jaipur cluster.'}
              </p>
            </div>
          </div>

          {/* Right Column: Digital Handover Manifest */}
          <div className="lg:col-span-6 rounded-3xl border border-[#0D0D0C]/15 bg-white p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between border-b border-[#0D0D0C]/10 pb-4">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#0D0D0C]/50 block">
                  Digital Manifest Slip • FSSAI Form B
                </span>
                <h4 className="text-lg font-semibold text-[#0D0D0C] mt-0.5">
                  Chain-of-Custody Verification
                </h4>
              </div>
              <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded-md bg-[#0D0D0C]/5 text-[#0D0D0C]">
                {manifestHash}
              </span>
            </div>

            {/* Manifest Details */}
            <div className="mt-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4 pb-4 border-b border-[#0D0D0C]/10">
                <div>
                  <span className="text-[#0D0D0C]/50 block font-mono text-[10px]">DONOR ESTABLISHMENT</span>
                  <span className="font-medium text-[#0D0D0C] text-sm block mt-0.5">Hotel Rajputana Kitchen</span>
                  <span className="text-[10px] text-[#0D0D0C]/60 block">FSSAI Lic: 12221027000184</span>
                </div>
                <div>
                  <span className="text-[#0D0D0C]/50 block font-mono text-[10px]">VERIFIED RECIPIENT NGO</span>
                  <span className="font-medium text-[#0D0D0C] text-sm block mt-0.5">Jaipur Hunger Relief NGO</span>
                  <span className="text-[10px] text-[#0D0D0C]/60 block">Reg: RJ/JPR/2021/8472</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 pb-4 border-b border-[#0D0D0C]/10">
                <div>
                  <span className="text-[#0D0D0C]/50 block font-mono text-[10px]">BATCH WEIGHT</span>
                  <span className="font-mono text-base font-semibold text-[#0D0D0C]">{batchKg} kg</span>
                </div>
                <div>
                  <span className="text-[#0D0D0C]/50 block font-mono text-[10px]">HOLDING TEMP</span>
                  <span className="font-mono text-base font-semibold text-[#0D0D0C]">{temperature}°C</span>
                </div>
                <div>
                  <span className="text-[#0D0D0C]/50 block font-mono text-[10px]">EST. MEALS</span>
                  <span className="font-mono text-base font-semibold text-[#0D0D0C]">{mealPortions} portions</span>
                </div>
              </div>

              <div className="pb-4 border-b border-[#0D0D0C]/10">
                <span className="text-[#0D0D0C]/50 block font-mono text-[10px]">REQUIRED TRANSPORT DISPATCH</span>
                <span className="font-medium text-[#0D0D0C] block mt-1">{transportMode}</span>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div>
                  <span className="text-[#0D0D0C]/50 block font-mono text-[10px]">COLLECTION OTP CODE</span>
                  <span className="font-mono text-xl font-bold tracking-widest text-[#0D0D0C]">8492</span>
                  <span className="text-[10px] text-[#0D0D0C]/50 block mt-0.5">Handover verified upon physical weighing</span>
                </div>
                <div className="p-2 border border-[#0D0D0C]/15 rounded-xl bg-[#FBF6EF]">
                  <QrCode className="h-12 w-12 text-[#0D0D0C]" />
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#0D0D0C]/10 text-[10px] font-mono text-[#0D0D0C]/50 leading-relaxed">
              Assumption Disclosure: Estimated portions assume 350 grams per meal equivalent. In accordance with Section 9 of the project summary, this represents an operational estimate, not proof of individual consumption.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
