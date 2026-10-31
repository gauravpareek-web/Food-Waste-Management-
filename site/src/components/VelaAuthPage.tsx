import { useState } from 'react';
import {
  Utensils, HeartHandshake, Eye, EyeOff, ArrowLeft,
  CheckCircle2, Sparkles, ArrowRight, ShieldCheck,
  Building2, School, ChefHat, Home, Landmark, Users
} from 'lucide-react';
import { UserProfile, DEMO_DONOR_USER, DEMO_RECEIVER_USER } from '../types';

interface VelaAuthPageProps {
  onBackToHome: () => void;
  onLoginSuccess: (user: UserProfile) => void;
}

type Role = 'giver' | 'taker';
type Mode = 'signup' | 'login';

export default function VelaAuthPage({ onBackToHome, onLoginSuccess }: VelaAuthPageProps) {
  const [role, setRole] = useState<Role>('giver');
  const [mode, setMode] = useState<Mode>('signup');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [org, setOrg] = useState('');
  const [fssaiLic, setFssaiLic] = useState('');
  const [password, setPassword] = useState('');
  const [subtype, setSubtype] = useState('Restaurant / Dhaba');

  const handleQuickDemo = (user: UserProfile) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDone(true);
      setTimeout(() => {
        onLoginSuccess(user);
      }, 700);
    }, 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const newUser: UserProfile = {
      name: name.trim() || (role === 'giver' ? 'Chef Vikram Mehra' : 'Priya Sharma'),
      email: email.trim() || (role === 'giver' ? 'vikram.mehra@rajdhani.in' : 'priya.sharma@akshayaahar.org'),
      role,
      org: org.trim() || (role === 'giver' ? 'Rajdhani Royal Heritage Kitchen' : 'Akshaya Aahar Foundation'),
      subtype: subtype || (role === 'giver' ? 'Restaurant / Dhaba' : 'Registered NGO'),
      fssaiLic: fssaiLic.trim() || (role === 'giver' ? '08317001000001' : 'RJ/2024/0001'),
      city: 'Jaipur, Rajasthan',
      joinedDate: 'Joined today',
    };

    setTimeout(() => {
      setLoading(false);
      setDone(true);
      setTimeout(() => {
        onLoginSuccess(newUser);
      }, 700);
    }, 800);
  };

  return (
    <div className="min-h-screen w-full bg-[#FBF6EF] p-3 sm:p-6 md:p-10 flex items-center justify-center font-sans relative selection:bg-[#0D0D0C]/15 selection:text-[#0D0D0C]">
      {/* Subtle organic background ambient glow matching Vela palette */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#8ECB4B]/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#FF6422]/10 blur-3xl" />
      </div>

      {/* Outer Rounded Tablet / Window Shell matching reference image */}
      <div className="relative z-10 w-full max-w-6xl min-h-[640px] md:h-[780px] bg-[#141B16] rounded-[36px] sm:rounded-[44px] p-2.5 sm:p-3.5 shadow-[0_30px_70px_-15px_rgba(13,13,12,0.3)] border border-[#0D0D0C]/15 flex flex-col overflow-hidden">
        
        {/* Inner Split View Canvas */}
        <div className="relative w-full h-full flex-1 rounded-[28px] sm:rounded-[36px] overflow-hidden flex flex-col md:flex-row bg-[#FBF6EF]">
          
          {/* ========================================================= */}
          {/* LEFT SIDE: 3D Workspace Scene matching Vela UI palette    */}
          {/* ========================================================= */}
          <div className="relative w-full md:w-[54%] h-[320px] md:h-full bg-gradient-to-b from-[#FAF7F2] via-[#F4EFE6] to-[#ECE5D8] overflow-hidden flex flex-col justify-between p-6 sm:p-8 select-none">
            
            {/* Top Bar on Left Side */}
            <div className="relative z-20 flex items-center justify-between">
              <button
                onClick={onBackToHome}
                className="inline-flex items-center gap-1.5 rounded-full bg-white/90 hover:bg-white px-3.5 py-1.5 text-xs font-medium text-[#0D0D0C] shadow-sm backdrop-blur-md transition-all cursor-pointer hover:scale-105 border border-black/5"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Back to Website</span>
              </button>

              <div className="inline-flex items-center gap-1.5 rounded-full bg-[#FF6422]/10 px-3 py-1 font-mono text-[10px] text-[#FF6422] font-semibold border border-[#FF6422]/20">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FF6422] animate-pulse" />
                <span>Jaipur Food Grid Live</span>
              </div>
            </div>

            {/* Stylized 3D Room Illustration matching UI architectural theme */}
            <div className="absolute inset-0 pointer-events-none">
              
              {/* Architectural Charcoal Slate Floor */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[38%] bg-[#1C2023] transition-all"
                style={{
                  clipPath: 'polygon(0 32%, 100% 12%, 100% 100%, 0 100%)',
                }}
              />

              {/* Minimalist Round Wall Clock */}
              <div className="absolute top-14 left-[58%] -translate-x-1/2 w-12 h-12 rounded-full border-4 border-[#1C2023] bg-white shadow-md flex items-center justify-center">
                <div className="relative w-full h-full">
                  {/* Clock Hands at 10:10 */}
                  <div className="absolute top-1/2 left-1/2 w-3.5 h-[2px] bg-[#1C2023] origin-left -rotate-45" />
                  <div className="absolute top-1/2 left-1/2 w-4 h-[2px] bg-[#1C2023] origin-left -rotate-140" />
                  <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF6422]" />
                </div>
              </div>

              {/* Left Filing Cabinet with Small Cactus */}
              <div className="absolute bottom-16 left-4 sm:left-7 w-20 h-44 bg-white rounded-t-xl rounded-b-md shadow-xl border border-black/5 flex flex-col justify-end p-2 gap-2">
                <div className="w-full h-8 bg-gray-50 rounded border border-gray-200 flex items-center justify-center">
                  <div className="w-4 h-1 bg-gray-300 rounded" />
                </div>
                <div className="w-full h-8 bg-gray-50 rounded border border-gray-200 flex items-center justify-center">
                  <div className="w-4 h-1 bg-gray-300 rounded" />
                </div>
                <div className="w-full h-8 bg-gray-50 rounded border border-gray-200 flex items-center justify-center">
                  <div className="w-4 h-1 bg-gray-300 rounded" />
                </div>
                {/* Cactus on top */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex flex-col items-center">
                  <div className="w-5 h-7 rounded-full bg-emerald-500 border border-emerald-600 relative">
                    <div className="absolute -left-1.5 top-2 w-2 h-2.5 rounded-l-full bg-emerald-500" />
                    <div className="absolute -right-1.5 top-3 w-2 h-2.5 rounded-r-full bg-emerald-500" />
                  </div>
                  <div className="w-6 h-4 bg-white rounded-b-sm border-t-2 border-amber-700 shadow-xs" />
                </div>
              </div>

              {/* Center 3D Character at Desk */}
              <div className="absolute bottom-6 left-[38%] -translate-x-1/2 w-[340px] h-[360px] flex items-center justify-center">
                
                {/* Office Swivel Chair */}
                <div className="absolute bottom-14 left-[40%] -translate-x-1/2 w-24 h-48 flex flex-col items-center">
                  <div className="w-20 h-28 bg-[#858C94] rounded-t-2xl shadow-inner border border-black/10" />
                  <div className="w-22 h-6 bg-[#6E757D] rounded-lg mt-0.5" />
                  <div className="w-3 h-14 bg-[#2C3136]" />
                  <div className="w-24 h-3 bg-[#1C2023] rounded-full" />
                </div>

                {/* 3D Stylized Person (Chef/Operator) */}
                <div className="absolute bottom-18 left-[40%] -translate-x-1/2 flex flex-col items-center z-10">
                  {/* Head with Hair & Glasses */}
                  <div className="relative w-16 h-18 rounded-[20px] bg-[#F7C8A4] shadow-md flex flex-col items-center pt-2">
                    {/* Hair */}
                    <div className="absolute -top-3 w-17 h-8 bg-[#4A2E1B] rounded-t-full" />
                    {/* Glasses */}
                    <div className="mt-4 flex gap-1 z-10">
                      <div className="w-4 h-3 rounded-sm border-2 border-[#1E1E1E] bg-white/40" />
                      <div className="w-1.5 h-[2px] bg-[#1E1E1E] self-center" />
                      <div className="w-4 h-3 rounded-sm border-2 border-[#1E1E1E] bg-white/40" />
                    </div>
                    {/* Smile & Beard */}
                    <div className="mt-1.5 w-6 h-3 rounded-b-full bg-[#4A2E1B] flex items-start justify-center">
                      <div className="w-3 h-1 bg-white rounded-full mt-0.5" />
                    </div>
                    {/* Ears */}
                    <div className="absolute top-5 -left-1.5 w-2 h-3 rounded-l-full bg-[#F7C8A4]" />
                    <div className="absolute top-5 -right-1.5 w-2 h-3 rounded-r-full bg-[#F7C8A4]" />
                  </div>

                  {/* Vela Orange Knitted Sweater */}
                  <div className="relative w-24 h-24 bg-[#FF6422] rounded-t-2xl shadow-md border-t-2 border-[#E55518] flex justify-center">
                    {/* Arms reaching to desk */}
                    <div className="absolute -left-3 top-2 w-6 h-20 bg-[#FF6422] rounded-full rotate-25 origin-top" />
                    <div className="absolute -right-3 top-2 w-6 h-20 bg-[#FF6422] rounded-full -rotate-25 origin-top" />
                  </div>

                  {/* Denim Jeans & Sneakers */}
                  <div className="relative w-20 flex justify-between px-1 -mt-2">
                    <div className="w-7 h-24 bg-[#2962FF] rounded-b-lg flex flex-col justify-end items-center">
                      <div className="w-9 h-6 bg-[#0D0D0C] rounded-full shadow-md border-b-2 border-white" />
                    </div>
                    <div className="w-7 h-24 bg-[#2962FF] rounded-b-lg flex flex-col justify-end items-center">
                      <div className="w-9 h-6 bg-[#0D0D0C] rounded-full shadow-md border-b-2 border-white" />
                    </div>
                  </div>
                </div>

                {/* Desk with Legs, Laptop, Steaming Mug & Phone */}
                <div className="absolute bottom-8 left-[42%] -translate-x-1/2 w-64 h-36 z-20 pointer-events-none">
                  {/* Tabletop in dark architectural slate */}
                  <div className="w-full h-5 bg-[#2B3137] rounded-xl shadow-xl border-t border-gray-500/30 flex items-center justify-between px-4 relative">
                    
                    {/* Laptop Open with Glow */}
                    <div className="absolute -top-20 left-12 flex flex-col items-center">
                      {/* Laptop Screen */}
                      <div className="w-24 h-16 bg-[#2B2D31] rounded-t-lg p-1.5 shadow-xl border border-gray-600 flex flex-col justify-between">
                        <div className="w-full h-full bg-[#12161A] rounded flex flex-col items-center justify-center">
                          <span className="font-mono text-[8px] text-[#FF6422] font-bold">vela.os</span>
                          <span className="font-mono text-[6px] text-gray-400">FSSAI 2019 Active</span>
                        </div>
                        <div className="w-2 h-2 rounded-full bg-gray-400 self-center -mb-0.5" />
                      </div>
                      {/* Laptop Base */}
                      <div className="w-28 h-2 bg-[#9AA0A6] rounded-b-md shadow-md" />
                    </div>

                    {/* Steaming Mug */}
                    <div className="absolute -top-8 right-16 flex flex-col items-center">
                      <div className="w-1.5 h-3 border-r border-white/60 blur-[1px] animate-pulse -mb-1" />
                      <div className="w-6 h-7 bg-[#FF6422] rounded-b-lg rounded-t-sm relative shadow-md">
                        <div className="absolute -right-2 top-1.5 w-2.5 h-3.5 border-2 border-[#FF6422] rounded-r-full" />
                      </div>
                    </div>

                    {/* Smartphone */}
                    <div className="absolute -top-3.5 right-6 w-5 h-8 bg-[#181B1F] rounded-[4px] border border-gray-600 shadow-md rotate-12 flex items-center justify-center">
                      <div className="w-3.5 h-6 bg-[#0E7AF6] rounded-xs opacity-75" />
                    </div>

                    {/* Notepad & Pencil */}
                    <div className="absolute -top-2 left-4 w-7 h-9 bg-white rounded-xs shadow rotate-[-8deg] border border-gray-200">
                      <div className="w-6 h-[2px] bg-amber-500 absolute -top-1 -right-1 rotate-45" />
                    </div>
                  </div>

                  {/* 4 White Desk Legs */}
                  <div className="w-full flex justify-between px-3 mt-1">
                    <div className="w-3 h-28 bg-white rounded-b-full shadow-md" />
                    <div className="w-3 h-28 bg-white rounded-b-full shadow-md mr-10" />
                    <div className="w-3 h-28 bg-white rounded-b-full shadow-md" />
                  </div>
                </div>

                {/* Snake Plant (Sansevieria) in Faceted Planter */}
                <div className="absolute bottom-8 right-2 flex flex-col items-center z-20">
                  <div className="flex gap-0.5 -mb-1">
                    <div className="w-3.5 h-24 bg-gradient-to-t from-[#1F4A32] to-[#4FA35A] rounded-t-full border border-emerald-900 rotate-[-8deg]" />
                    <div className="w-4 h-32 bg-gradient-to-t from-[#183B25] to-[#58B864] rounded-t-full border border-emerald-900" />
                    <div className="w-3.5 h-22 bg-gradient-to-t from-[#1F4A32] to-[#4FA35A] rounded-t-full border border-emerald-900 rotate-[10deg]" />
                  </div>
                  {/* Faceted White Pot */}
                  <div
                    className="w-12 h-16 bg-white shadow-xl"
                    style={{
                      clipPath: 'polygon(15% 0, 85% 0, 100% 100%, 0 100%)',
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Bottom Caption Pill */}
            <div className="relative z-20 mt-auto bg-white/70 backdrop-blur-md rounded-2xl p-3.5 border border-white/60 shadow-xs max-w-sm">
              <div className="flex items-center gap-2 font-mono text-[11px] text-[#0D0D0C] font-semibold">
                <ShieldCheck className="h-4 w-4 text-[#FF6422]" />
                <span>Statutory Food Safety Architecture</span>
              </div>
              <p className="text-[11px] text-[#0D0D0C]/70 mt-0.5 leading-relaxed">
                Connecting commercial kitchens with certified NGOs under FSSAI Surplus Food Regulations 2019.
              </p>
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT SIDE: Clean White Auth Card matching reference image */}
          {/* ========================================================= */}
          <div className="relative w-full md:w-[46%] bg-white p-6 sm:p-10 md:p-12 flex flex-col justify-between overflow-y-auto">
            
            {/* Top Brand & Mode */}
            <div>
              <div className="flex items-center justify-between mb-6">
                {/* Brand Logo */}
                <div className="flex items-center gap-2.5">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#FF6422] text-white shadow-xs">
                    <Utensils className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-xl font-bold tracking-tight text-[#0D0D0C]">vela</span>
                </div>

                {/* Role Switcher Pill */}
                <div className="flex rounded-full border border-gray-200 p-0.5 bg-gray-50 text-[11px] font-medium">
                  <button
                    type="button"
                    onClick={() => {
                      setRole('giver');
                      setSubtype('Restaurant / Dhaba');
                    }}
                    className={`rounded-full px-3 py-1 transition-all cursor-pointer ${
                      role === 'giver'
                        ? 'bg-[#0D0D0C] text-white font-semibold shadow-xs'
                        : 'text-gray-600 hover:text-black'
                    }`}
                  >
                    Food Giver
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setRole('taker');
                      setSubtype('Registered NGO');
                    }}
                    className={`rounded-full px-3 py-1 transition-all cursor-pointer ${
                      role === 'taker'
                        ? 'bg-[#0D0D0C] text-white font-semibold shadow-xs'
                        : 'text-gray-600 hover:text-black'
                    }`}
                  >
                    Food Receiver
                  </button>
                </div>
              </div>

              {/* Headline */}
              <div className="mb-6">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#162B1D]">
                  {mode === 'signup' ? 'Create account' : 'Welcome back'}
                </h1>
                <p className="text-xs text-gray-500 mt-1">
                  {role === 'giver'
                    ? 'Register your commercial kitchen or catering service to redistribute unserved surplus.'
                    : 'Access verified food surplus allocations for shelters, schools, and community kitchens.'}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3.5">
                
                {mode === 'signup' && (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-medium text-gray-600 block mb-1">
                          Representative Name
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder={role === 'giver' ? 'Chef Vikram Mehra' : 'Priya Sharma'}
                          className="w-full rounded-full border border-gray-200 bg-gray-50/50 px-4 py-2.5 text-xs text-gray-900 outline-none focus:border-[#FF6422] focus:bg-white transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-medium text-gray-600 block mb-1">
                          Establishment / NGO
                        </label>
                        <input
                          type="text"
                          required
                          value={org}
                          onChange={(e) => setOrg(e.target.value)}
                          placeholder={role === 'giver' ? 'Rajdhani Heritage' : 'Akshaya Aahar'}
                          className="w-full rounded-full border border-gray-200 bg-gray-50/50 px-4 py-2.5 text-xs text-gray-900 outline-none focus:border-[#FF6422] focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-medium text-gray-600 block mb-1">
                          {role === 'giver' ? 'FBO Category' : 'Receiver Type'}
                        </label>
                        <select
                          value={subtype}
                          onChange={(e) => setSubtype(e.target.value)}
                          className="w-full rounded-full border border-gray-200 bg-gray-50/50 px-3.5 py-2.5 text-xs text-gray-900 outline-none focus:border-[#FF6422] focus:bg-white transition-all cursor-pointer"
                        >
                          {role === 'giver' ? (
                            <>
                              <option value="Restaurant / Dhaba">Restaurant / Dhaba</option>
                              <option value="Cloud Kitchen">Cloud Kitchen</option>
                              <option value="Hotel / Caterer">Hotel / Caterer</option>
                              <option value="Corporate Cafeteria">Corporate Cafeteria</option>
                              <option value="Household">Household</option>
                            </>
                          ) : (
                            <>
                              <option value="Registered NGO">Registered NGO</option>
                              <option value="Government School">Government School (PM POSHAN)</option>
                              <option value="Shelter / Old-Age Home">Shelter / Old-Age Home</option>
                              <option value="Anganwadi Centre">Anganwadi Centre</option>
                              <option value="Community Food Bank">Community Food Bank</option>
                            </>
                          )}
                        </select>
                      </div>

                      <div>
                        <label className="text-[11px] font-medium text-gray-600 block mb-1">
                          {role === 'giver' ? 'FSSAI Licence No.' : 'FSSAI Cert ID'}
                        </label>
                        <input
                          type="text"
                          required
                          value={fssaiLic}
                          onChange={(e) => setFssaiLic(e.target.value)}
                          placeholder={role === 'giver' ? '08317001000001' : 'RJ/2024/0001'}
                          className="w-full rounded-full border border-gray-200 bg-gray-50/50 px-4 py-2.5 text-xs text-gray-900 outline-none focus:border-[#FF6422] focus:bg-white transition-all"
                        />
                      </div>
                    </div>
                  </>
                )}

                <div>
                  <label className="text-[11px] font-medium text-gray-600 block mb-1">
                    Email address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={role === 'giver' ? 'kitchen@rajdhani.in' : 'ops@akshayaahar.org'}
                    className="w-full rounded-full border border-gray-200 bg-gray-50/50 px-4 py-2.5 text-xs text-gray-900 outline-none focus:border-[#FF6422] focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-medium text-gray-600 block mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Minimum 8 characters"
                      className="w-full rounded-full border border-gray-200 bg-gray-50/50 pl-4 pr-10 py-2.5 text-xs text-gray-900 outline-none focus:border-[#FF6422] focus:bg-white transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Primary ConstructHub / Vela Orange Button matching the UI */}
                <button
                  type="submit"
                  disabled={loading || done}
                  className="w-full mt-2 rounded-full bg-[#FF6422] hover:bg-[#E55518] text-white py-3 text-xs font-bold tracking-tight transition-all duration-200 cursor-pointer shadow-md shadow-orange-500/20 hover:shadow-lg disabled:opacity-50"
                >
                  {loading
                    ? 'Verifying with FSSAI Database…'
                    : done
                    ? 'Authenticated ✓'
                    : mode === 'signup'
                    ? 'Create account'
                    : 'Log in to Dashboard'}
                </button>
              </form>

              {/* Or sign up with divider */}
              <div className="relative my-5 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <span className="relative bg-white px-3 text-[11px] text-gray-400 font-medium">
                  or 1-click test with pre-seeded users
                </span>
              </div>

              {/* 1-Click Demo Profiles (Styled like the social buttons in reference image) */}
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => handleQuickDemo(DEMO_DONOR_USER)}
                  className="flex items-center justify-center gap-2 rounded-2xl border border-orange-200 bg-orange-50/60 hover:bg-orange-100/80 p-2.5 transition-all text-left cursor-pointer group"
                >
                  <span className="text-base">👨‍🍳</span>
                  <div className="min-w-0">
                    <div className="text-[11px] font-bold text-orange-950 truncate leading-none">
                      Chef Vikram
                    </div>
                    <span className="text-[9px] text-orange-700/80 font-mono">Donor Dashboard</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickDemo(DEMO_RECEIVER_USER)}
                  className="flex items-center justify-center gap-2 rounded-2xl border border-blue-200 bg-blue-50/60 hover:bg-blue-100/80 p-2.5 transition-all text-left cursor-pointer group"
                >
                  <span className="text-base">🤝</span>
                  <div className="min-w-0">
                    <div className="text-[11px] font-bold text-blue-950 truncate leading-none">
                      Priya Sharma
                    </div>
                    <span className="text-[9px] text-blue-700/80 font-mono">Receiver Dashboard</span>
                  </div>
                </button>
              </div>

              {/* Terms footer */}
              <p className="mt-4 text-center text-[10px] text-gray-400 leading-relaxed">
                By creating an account you agree to Vela&apos;s{' '}
                <a href="#compliance" className="text-[#FF6422] font-semibold hover:underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#compliance" className="text-[#FF6422] font-semibold hover:underline">
                  FSSAI 2019 Privacy Policy
                </a>.
              </p>
            </div>

            {/* Bottom Toggle: Have an account? Log in */}
            <div className="mt-6 pt-4 border-t border-gray-100 text-center">
              <span className="text-xs text-gray-500">
                {mode === 'signup' ? 'Have an account?' : "Don't have an account?"}{' '}
              </span>
              <button
                type="button"
                onClick={() => setMode(mode === 'signup' ? 'login' : 'signup')}
                className="text-xs font-bold text-[#FF6422] hover:underline cursor-pointer"
              >
                {mode === 'signup' ? 'Log in' : 'Create account'}
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

