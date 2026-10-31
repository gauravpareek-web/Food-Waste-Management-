import { useState } from 'react';
import {
  X, ChefHat, Users, Building2, Home, Utensils, School,
  HeartHandshake, Landmark, ArrowLeft, Eye, EyeOff, CheckCircle2,
  Sparkles, ArrowRight, ShieldCheck, UserCheck
} from 'lucide-react';
import { UserProfile, DEMO_DONOR_USER, DEMO_RECEIVER_USER } from '../types';

type Role = 'giver' | 'taker' | null;
type Mode = 'signup' | 'login';
type GiverType = 'restaurant' | 'household' | 'cloud_kitchen' | 'hotel_caterer' | 'corporate_cafeteria' | null;
type TakerType = 'ngo' | 'govt_school' | 'anganwadi' | 'shelter_home' | 'food_bank' | null;

interface VelaAuthModalProps {
  onClose: () => void;
  onEnterGiverPortal: (user: UserProfile) => void;
  onEnterTakerPortal: (user: UserProfile) => void;
}

const GIVER_TYPES = [
  { id: 'restaurant' as GiverType, label: 'Restaurant / Dhaba', icon: Utensils, desc: 'Full-service dining, quick service, or street food establishments' },
  { id: 'household' as GiverType, label: 'Household', icon: Home, desc: 'Individual homes with surplus cooked or packaged food' },
  { id: 'cloud_kitchen' as GiverType, label: 'Cloud Kitchen', icon: ChefHat, desc: 'Delivery-only ghost kitchens with regular surplus batches' },
  { id: 'hotel_caterer' as GiverType, label: 'Hotel / Caterer', icon: Building2, desc: 'Hospitality venues and event catering companies' },
  { id: 'corporate_cafeteria' as GiverType, label: 'Corporate Cafeteria', icon: Landmark, desc: 'Office canteens, IT parks, and institutional mess halls' },
];

const TAKER_TYPES = [
  { id: 'ngo' as TakerType, label: 'Registered NGO', icon: HeartHandshake, desc: 'FSSAI-certified non-profit organisations distributing to beneficiaries' },
  { id: 'govt_school' as TakerType, label: 'Government School', icon: School, desc: 'Mid-day meal programme schools under PM POSHAN scheme' },
  { id: 'anganwadi' as TakerType, label: 'Anganwadi Centre', icon: Users, desc: 'ICDS centres serving children aged 0–6 and pregnant mothers' },
  { id: 'shelter_home' as TakerType, label: 'Shelter / Old-Age Home', icon: Home, desc: 'Homes for homeless, differently-abled, or elderly individuals' },
  { id: 'food_bank' as TakerType, label: 'Community Food Bank', icon: Building2, desc: 'Local food distribution hubs serving underserved communities' },
];

export default function VelaAuthModal({ onClose, onEnterGiverPortal, onEnterTakerPortal }: VelaAuthModalProps) {
  const [role, setRole] = useState<Role>(null);
  const [giverType, setGiverType] = useState<GiverType>(null);
  const [takerType, setTakerType] = useState<TakerType>(null);
  const [mode, setMode] = useState<Mode>('signup');
  const [step, setStep] = useState<'role' | 'subtype' | 'form'>('role');
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', org: '', fssaiLic: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [activeSessionUser, setActiveSessionUser] = useState<UserProfile | null>(null);

  const selectedSubtype = role === 'giver'
    ? GIVER_TYPES.find(t => t.id === giverType)
    : TAKER_TYPES.find(t => t.id === takerType);

  const handleQuickDemoLogin = (targetUser: UserProfile) => {
    setActiveSessionUser(targetUser);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDone(true);
      setTimeout(() => {
        if (targetUser.role === 'giver') onEnterGiverPortal(targetUser);
        else onEnterTakerPortal(targetUser);
      }, 1000);
    }, 1200);
  };

  const handleRoleSelect = (r: Role) => {
    setRole(r);
    setGiverType(null);
    setTakerType(null);
    setStep('subtype');
  };

  const handleSubtypeSelect = (id: GiverType | TakerType) => {
    if (role === 'giver') setGiverType(id as GiverType);
    else setTakerType(id as TakerType);
    setStep('form');
  };

  const handleSubmit = () => {
    setLoading(true);
    const subtypeLabel = selectedSubtype ? selectedSubtype.label : (role === 'giver' ? 'Commercial Kitchen' : 'Registered Charity');
    const newUser: UserProfile = {
      name: form.name.trim() || (role === 'giver' ? 'Chef Vikram Mehra' : 'Priya Sharma'),
      email: form.email.trim() || (role === 'giver' ? 'vikram.mehra@rajdhani.in' : 'priya.sharma@akshayaahar.org'),
      role: role || 'giver',
      org: form.org.trim() || (role === 'giver' ? 'Rajdhani Royal Heritage Kitchen' : 'Akshaya Aahar Relief Foundation'),
      subtype: subtypeLabel,
      fssaiLic: form.fssaiLic.trim() || (role === 'giver' ? '08317001000001' : 'RJ/2024/0001'),
      phone: form.phone.trim() || '+91 98290 14820',
      city: 'Jaipur, Rajasthan',
      joinedDate: 'Registered today',
    };
    setActiveSessionUser(newUser);

    setTimeout(() => {
      setLoading(false);
      setDone(true);
      setTimeout(() => {
        if (newUser.role === 'giver') onEnterGiverPortal(newUser);
        else onEnterTakerPortal(newUser);
      }, 1200);
    }, 1500);
  };

  const subtypes = role === 'giver' ? GIVER_TYPES : TAKER_TYPES;

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      style={{ backdropFilter: 'blur(18px)', backgroundColor: 'rgba(13,13,12,0.55)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative w-full max-w-lg bg-[#FBF6EF] rounded-3xl shadow-2xl overflow-hidden my-auto">
        {/* Modal Header Strip */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3.5 border-b border-[#0D0D0C]/10 bg-white/50">
          <div className="flex items-center gap-3">
            {step !== 'role' && !done && (
              <button
                onClick={() => setStep(step === 'form' ? 'subtype' : 'role')}
                className="p-1.5 rounded-full hover:bg-[#0D0D0C]/8 transition-colors cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4 text-[#0D0D0C]/60" />
              </button>
            )}
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#0D0D0C]" />
                <span className="text-base font-semibold tracking-tight text-[#0D0D0C]">vela</span>
                <span className="font-mono text-[9px] uppercase tracking-wider bg-[#0D0D0C]/5 px-2 py-0.5 rounded text-[#0D0D0C]/60">
                  Authentication &amp; User Gate
                </span>
              </div>
              <span className="font-mono text-[10px] text-[#0D0D0C]/45 block mt-0.5">
                {step === 'role' ? 'Select user profile or choose role' : step === 'subtype' ? `Select ${role === 'giver' ? 'donor' : 'receiver'} type` : mode === 'signup' ? 'Create new account' : 'Log in to dashboard'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!done && ['role', 'subtype', 'form'].map((s, i) => (
              <span
                key={s}
                className={`h-1.5 rounded-full transition-all duration-300 ${step === s ? 'w-5 bg-[#0D0D0C]' : i < ['role', 'subtype', 'form'].indexOf(step) ? 'w-1.5 bg-[#0D0D0C]/40' : 'w-1.5 bg-[#0D0D0C]/15'}`}
              />
            ))}
            <button onClick={onClose} className="ml-2 p-1.5 rounded-full hover:bg-[#0D0D0C]/8 transition-colors cursor-pointer">
              <X className="h-4 w-4 text-[#0D0D0C]/60" />
            </button>
          </div>
        </div>

        {/* STEP 1: Two Demo Profiles Quick-Login + Role Selection */}
        {step === 'role' && !done && (
          <div className="p-6">
            {/* Quick Demo Users Banner */}
            <div className="mb-6 rounded-2xl border-2 border-emerald-500/30 bg-emerald-500/5 p-4 sm:p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-emerald-600" />
                  <span className="text-xs font-semibold text-emerald-950 uppercase tracking-wide">
                    Instant 1-Click Demo Profiles
                  </span>
                </div>
                <span className="font-mono text-[10px] text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                  Ready to test
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Demo User 1: Donor */}
                <button
                  onClick={() => handleQuickDemoLogin(DEMO_DONOR_USER)}
                  disabled={loading}
                  className="group relative flex flex-col p-3.5 rounded-xl border border-orange-200 bg-white/90 hover:border-orange-500 hover:shadow-md transition-all text-left cursor-pointer"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-100 text-orange-600 font-bold text-xs">
                      👨‍🍳
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[#0D0D0C] leading-none group-hover:text-orange-600 transition-colors">
                        Chef Vikram Mehra
                      </div>
                      <span className="font-mono text-[9px] text-orange-600 font-medium">Food Donor (FBO)</span>
                    </div>
                  </div>
                  <div className="text-[11px] text-[#0D0D0C]/70 truncate font-medium">Rajdhani Heritage Kitchen</div>
                  <div className="font-mono text-[9px] text-[#0D0D0C]/45 mt-0.5">Lic: 08317001000001 · Jaipur</div>
                  <div className="mt-2.5 pt-2 border-t border-[#0D0D0C]/5 flex items-center justify-between text-[10px] text-orange-600 font-medium">
                    <span>Enter Donor Dashboard</span>
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>

                {/* Demo User 2: Receiver */}
                <button
                  onClick={() => handleQuickDemoLogin(DEMO_RECEIVER_USER)}
                  disabled={loading}
                  className="group relative flex flex-col p-3.5 rounded-xl border border-blue-200 bg-white/90 hover:border-blue-500 hover:shadow-md transition-all text-left cursor-pointer"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100 text-blue-600 font-bold text-xs">
                      🤝
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[#0D0D0C] leading-none group-hover:text-blue-600 transition-colors">
                        Priya Sharma
                      </div>
                      <span className="font-mono text-[9px] text-blue-600 font-medium">Food Receiver (NGO)</span>
                    </div>
                  </div>
                  <div className="text-[11px] text-[#0D0D0C]/70 truncate font-medium">Akshaya Aahar Foundation</div>
                  <div className="font-mono text-[9px] text-[#0D0D0C]/45 mt-0.5">Cert: RJ/2024/0001 · Jaipur</div>
                  <div className="mt-2.5 pt-2 border-t border-[#0D0D0C]/5 flex items-center justify-between text-[10px] text-blue-600 font-medium">
                    <span>Enter Receiver Dashboard</span>
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              </div>
            </div>

            <div className="relative flex py-2 items-center mb-5">
              <div className="flex-grow border-t border-[#0D0D0C]/10"></div>
              <span className="flex-shrink mx-3 font-mono text-[10px] uppercase text-[#0D0D0C]/40">or register custom user</span>
              <div className="flex-grow border-t border-[#0D0D0C]/10"></div>
            </div>

            <h3 className="text-base font-medium tracking-tight text-[#0D0D0C] mb-1">Select Registration Category</h3>
            <div className="grid grid-cols-2 gap-3 mt-3">
              {/* Food Giver Card */}
              <button
                onClick={() => handleRoleSelect('giver')}
                className="group relative flex flex-col items-start p-4 rounded-2xl border-2 border-[#0D0D0C]/12 bg-white/60 hover:border-orange-400 hover:bg-orange-50/60 transition-all text-left cursor-pointer"
              >
                <div className="mb-2.5 flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 group-hover:bg-orange-200 transition-colors">
                  <Utensils className="h-5 w-5 text-orange-600" />
                </div>
                <span className="text-sm font-semibold text-[#0D0D0C]">Food Giver</span>
                <span className="text-[11px] text-[#0D0D0C]/55 mt-1 leading-snug">
                  Restaurants, kitchens, caterers &amp; households
                </span>
                <span className="mt-2.5 font-mono text-[10px] text-orange-600 font-medium">5 types →</span>
              </button>

              {/* Food Taker Card */}
              <button
                onClick={() => handleRoleSelect('taker')}
                className="group relative flex flex-col items-start p-4 rounded-2xl border-2 border-[#0D0D0C]/12 bg-white/60 hover:border-blue-400 hover:bg-blue-50/60 transition-all text-left cursor-pointer"
              >
                <div className="mb-2.5 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 group-hover:bg-blue-200 transition-colors">
                  <HeartHandshake className="h-5 w-5 text-blue-600" />
                </div>
                <span className="text-sm font-semibold text-[#0D0D0C]">Food Receiver</span>
                <span className="text-[11px] text-[#0D0D0C]/55 mt-1 leading-snug">
                  NGOs, shelter homes &amp; government schools
                </span>
                <span className="mt-2.5 font-mono text-[10px] text-blue-600 font-medium">5 types →</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Sub-type selection */}
        {step === 'subtype' && !done && (
          <div className="p-6">
            <h2 className="text-lg font-medium tracking-tight text-[#0D0D0C] mb-1">
              {role === 'giver' ? 'What kind of donor establishment are you?' : 'What kind of food receiver organisation are you?'}
            </h2>
            <p className="text-xs text-[#0D0D0C]/55 mb-4 leading-relaxed">
              {role === 'giver'
                ? 'Select category to initialize correct FSSAI kitchen holding parameters.'
                : 'Select your entity type. Receivers are audited for beneficiary verification.'}
            </p>
            <div className="space-y-2">
              {subtypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.id as string}
                    onClick={() => handleSubtypeSelect(type.id)}
                    className="w-full flex items-center gap-3.5 p-3 rounded-xl border border-[#0D0D0C]/12 bg-white/70 transition-all text-left cursor-pointer group hover:border-[#0D0D0C]/40 hover:bg-white"
                  >
                    <div className={`shrink-0 flex h-8 w-8 items-center justify-center rounded-lg ${role === 'giver' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-[#0D0D0C]">{type.label}</div>
                      <div className="text-[11px] text-[#0D0D0C]/50 truncate">{type.desc}</div>
                    </div>
                    <span className="text-[#0D0D0C]/30 text-xs">›</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 3: Form */}
        {step === 'form' && !done && (
          <div className="p-6">
            {selectedSubtype && (
              <div className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-medium mb-3.5 ${role === 'giver' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>
                <selectedSubtype.icon className="h-3 w-3" />
                {selectedSubtype.label}
              </div>
            )}

            {/* Mode toggle */}
            <div className="flex rounded-xl border border-[#0D0D0C]/15 p-1 bg-[#0D0D0C]/4 mb-4 w-fit">
              {(['signup', 'login'] as Mode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`rounded-lg px-3.5 py-1 text-xs font-medium transition-all cursor-pointer ${mode === m ? 'bg-[#0D0D0C] text-[#FBF6EF]' : 'text-[#0D0D0C]/60 hover:text-[#0D0D0C]'}`}
                >
                  {m === 'signup' ? 'Sign Up' : 'Log In'}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {mode === 'signup' && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-mono text-[10px] text-[#0D0D0C]/50 uppercase tracking-wider block mb-1">Representative Name *</label>
                      <input
                        type="text"
                        placeholder={role === 'giver' ? 'e.g. Chef Vikram' : 'e.g. Priya Sharma'}
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        className="w-full rounded-xl border border-[#0D0D0C]/15 bg-white px-3 py-2 text-xs text-[#0D0D0C] outline-none focus:border-[#0D0D0C]"
                      />
                    </div>
                    <div>
                      <label className="font-mono text-[10px] text-[#0D0D0C]/50 uppercase tracking-wider block mb-1">Phone *</label>
                      <input
                        type="tel"
                        placeholder="+91 98290 14820"
                        value={form.phone}
                        onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                        className="w-full rounded-xl border border-[#0D0D0C]/15 bg-white px-3 py-2 text-xs text-[#0D0D0C] outline-none focus:border-[#0D0D0C]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-mono text-[10px] text-[#0D0D0C]/50 uppercase tracking-wider block mb-1">
                      {role === 'giver' ? 'Kitchen / Establishment Name *' : 'NGO / Entity Name *'}
                    </label>
                    <input
                      type="text"
                      placeholder={role === 'giver' ? 'e.g. Royal Marwar Heritage Kitchen' : 'e.g. Akshaya Aahar Foundation'}
                      value={form.org}
                      onChange={e => setForm(f => ({ ...f, org: e.target.value }))}
                      className="w-full rounded-xl border border-[#0D0D0C]/15 bg-white px-3 py-2 text-xs text-[#0D0D0C] outline-none focus:border-[#0D0D0C]"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-[10px] text-[#0D0D0C]/50 uppercase tracking-wider block mb-1">
                      {role === 'giver' ? 'FSSAI FBO Licence' : 'FSSAI Receiver Registration No.'}
                    </label>
                    <input
                      type="text"
                      placeholder={role === 'giver' ? '08317001000001' : 'RJ/2024/0001'}
                      value={form.fssaiLic}
                      onChange={e => setForm(f => ({ ...f, fssaiLic: e.target.value }))}
                      className="w-full rounded-xl border border-[#0D0D0C]/15 bg-white px-3 py-2 text-xs text-[#0D0D0C] outline-none focus:border-[#0D0D0C]"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="font-mono text-[10px] text-[#0D0D0C]/50 uppercase tracking-wider block mb-1">Work Email Address *</label>
                <input
                  type="email"
                  placeholder={role === 'giver' ? 'kitchen@royalmarwar.in' : 'ops@akshayaahar.org'}
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className="w-full rounded-xl border border-[#0D0D0C]/15 bg-white px-3 py-2 text-xs text-[#0D0D0C] outline-none focus:border-[#0D0D0C]"
                />
              </div>

              <div>
                <label className="font-mono text-[10px] text-[#0D0D0C]/50 uppercase tracking-wider block mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPass ? 'text' : 'password'}
                    placeholder="Enter security password"
                    value={form.password}
                    onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                    className="w-full rounded-xl border border-[#0D0D0C]/15 bg-white pl-3 pr-9 py-2 text-xs text-[#0D0D0C] outline-none focus:border-[#0D0D0C]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(s => !s)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#0D0D0C]/35 hover:text-[#0D0D0C]/60 cursor-pointer"
                  >
                    {showPass ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                  </button>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`w-full mt-2 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${role === 'giver' ? 'bg-orange-500 hover:bg-orange-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'} ${loading ? 'opacity-60' : ''}`}
              >
                {loading ? 'Verifying with FSSAI Database…' : mode === 'signup' ? `Create ${role === 'giver' ? 'Donor' : 'Receiver'} Account` : `Enter ${role === 'giver' ? 'Donor' : 'Receiver'} Dashboard`}
              </button>
            </div>
          </div>
        )}

        {/* Success / Loading Done */}
        {done && (
          <div className="p-8 flex flex-col items-center justify-center text-center min-h-[240px]">
            <div className={`flex h-14 w-14 items-center justify-center rounded-2xl mb-4 ${activeSessionUser?.role === 'giver' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <h3 className="text-lg font-semibold text-[#0D0D0C]">Welcome, {activeSessionUser?.name}!</h3>
            <p className="text-xs text-[#0D0D0C]/65 mt-1 max-w-xs">
              Logged in to <strong>{activeSessionUser?.org}</strong>. Loading your live {activeSessionUser?.role === 'giver' ? 'Donor' : 'Receiver'} Dashboard…
            </p>
            <div className="mt-4 flex items-center gap-2 font-mono text-[10px] text-[#0D0D0C]/40">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>FSSAI Lic: {activeSessionUser?.fssaiLic} Verified</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
