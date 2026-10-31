import { useState, useEffect } from 'react';
import {
  Store,
  HeartHandshake,
  Bike,
  ShieldCheck,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Check,
  CheckCircle2,
  Menu,
  X
} from 'lucide-react';
import { UserProfile } from '../types';

export type AuthRole = 'restaurant' | 'ngo' | 'volunteer' | 'admin';

interface PalmBeachAuthPageProps {
  initialRole?: AuthRole;
  onBackToHome: () => void;
  onLoginSuccess: (user: UserProfile) => void;
}

export default function PalmBeachAuthPage({
  initialRole = 'restaurant',
  onBackToHome,
  onLoginSuccess,
}: PalmBeachAuthPageProps) {
  const [selectedRole, setSelectedRole] = useState<AuthRole>(initialRole);
  const [email, setEmail] = useState('restaurant@palmbeachharvest.com');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSignUpMode, setIsSignUpMode] = useState(false);

  // Sync initialRole if passed or changed
  useEffect(() => {
    setSelectedRole(initialRole);
    updateDefaultCredentials(initialRole);
  }, [initialRole]);

  // Update default demo credentials when switching roles
  const updateDefaultCredentials = (role: AuthRole) => {
    switch (role) {
      case 'restaurant':
        setEmail('restaurant@palmbeachharvest.com');
        break;
      case 'ngo':
        setEmail('ngo@palmbeachharvest.com');
        break;
      case 'volunteer':
        setEmail('volunteer@palmbeachharvest.com');
        break;
      case 'admin':
        setEmail('admin@palmbeachharvest.com');
        break;
    }
  };

  const handleRoleSelect = (role: AuthRole) => {
    setSelectedRole(role);
    updateDefaultCredentials(role);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Map AuthRole to UserProfile
    let user: UserProfile;
    switch (selectedRole) {
      case 'restaurant':
        user = {
          name: 'Chef Michael (The Green Table)',
          email: email || 'restaurant@palmbeachharvest.com',
          role: 'giver',
          roleType: 'restaurant',
          org: 'The Green Table Restaurant',
          subtype: 'Restaurant / Commercial Kitchen',
          fssaiLic: 'FL-FBO-2024-8891',
          city: 'Palm Beach, FL',
          phone: '+1 (561) 555-0192',
          joinedDate: 'Verified Donor Partner since 2024',
        };
        break;
      case 'ngo':
        user = {
          name: 'Priya Sharma (NGO Coordinator)',
          email: email || 'hope.foundation@palmbeachharvest.com',
          role: 'taker',
          roleType: 'ngo',
          org: 'Hope Foundation',
          subtype: 'Verified NGO / Hunger Relief',
          fssaiLic: 'FL-NGO-2023-4102',
          city: 'Palm Beach, FL',
          phone: '+1 (561) 555-0144',
          joinedDate: 'Verified Charity Partner since 2023',
        };
        break;
      case 'volunteer':
        user = {
          name: 'Rahul Sharma',
          email: email || 'volunteer@palmbeachharvest.com',
          role: 'taker',
          roleType: 'volunteer',
          org: 'Palm Beach Harvest Volunteer Fleet',
          subtype: 'Verified Volunteer Driver',
          fssaiLic: 'VOL-PB-2024-099',
          city: 'Palm Beach County, FL',
          phone: '+1 (561) 555-0188',
          joinedDate: 'Active Volunteer since 2024',
        };
        break;
      case 'admin':
        user = {
          name: 'Platform Coordinator (Admin)',
          email: email || 'admin@palmbeachharvest.com',
          role: 'giver',
          org: 'Palm Beach Harvest Central Operations',
          subtype: 'Platform Operations Admin',
          fssaiLic: 'ADMIN-PB-2026',
          city: 'Palm Beach County, FL',
          phone: '+1 (561) 555-0100',
          joinedDate: 'HQ Coordinator',
        };
        break;
    }

    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => {
        onLoginSuccess(user);
      }, 500);
    }, 600);
  };

  return (
    <div className="min-h-screen lg:h-screen w-full bg-[#FAF8F5] text-stone-900 flex flex-col font-sans selection:bg-[#F59E0B]/30 selection:text-black overflow-x-hidden lg:overflow-hidden">
      
      {/* ======================================================== */}
      {/* 1. TOP HEADER & NAVBAR (Golden Amber Bar)                */}
      {/* ======================================================== */}
      <header className="shrink-0 w-full bg-[#F59E0B] border-b border-[#D97706]/40 shadow-sm z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo with Wheat Badge */}
          <div 
            onClick={onBackToHome}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="flex items-center justify-center bg-white/20 backdrop-blur-md border border-white/40 px-3 py-1 rounded-full shadow-inner group-hover:scale-105 transition-transform">
              <span className="font-extrabold text-stone-900 tracking-wider text-xs sm:text-sm uppercase flex items-center gap-1.5">
                PALM BEACH
                <span className="bg-[#1C1917] text-[#F59E0B] px-2 py-0.5 rounded-full text-[11px] font-black tracking-normal">
                  HARVEST
                </span>
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links (Pill Buttons) */}
          <nav className="hidden lg:flex items-center gap-2">
            <button 
              onClick={onBackToHome}
              className="px-4 py-1.5 rounded-full bg-[#1C1917] text-white text-xs font-semibold shadow-sm hover:bg-black transition-all cursor-pointer"
            >
              Home
            </button>
            <button 
              onClick={onBackToHome}
              className="px-3.5 py-1.5 rounded-full border border-stone-900/25 text-stone-900 text-xs font-medium hover:bg-white/25 transition-all cursor-pointer"
            >
              About Us
            </button>
            <button 
              onClick={() => handleRoleSelect('ngo')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                selectedRole === 'ngo'
                  ? 'bg-[#1C1917] text-white font-semibold'
                  : 'border border-stone-900/25 text-stone-900 hover:bg-white/25'
              }`}
            >
              Find Food
            </button>
            <button 
              onClick={onBackToHome}
              className="px-3.5 py-1.5 rounded-full border border-stone-900/25 text-stone-900 text-xs font-medium hover:bg-white/25 transition-all cursor-pointer"
            >
              Programs
            </button>
            <button 
              onClick={() => handleRoleSelect('volunteer')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                selectedRole === 'volunteer'
                  ? 'bg-[#1C1917] text-white font-semibold'
                  : 'border border-stone-900/25 text-stone-900 hover:bg-white/25'
              }`}
            >
              Volunteer
            </button>
            <button 
              onClick={onBackToHome}
              className="px-3.5 py-1.5 rounded-full border border-stone-900/25 text-stone-900 text-xs font-medium hover:bg-white/25 transition-all cursor-pointer"
            >
              Events
            </button>
            <button 
              onClick={onBackToHome}
              className="px-3.5 py-1.5 rounded-full border border-stone-900/25 text-stone-900 text-xs font-medium hover:bg-white/25 transition-all cursor-pointer"
            >
              Blog
            </button>
            <button 
              onClick={onBackToHome}
              className="px-3.5 py-1.5 rounded-full border border-stone-900/25 text-stone-900 text-xs font-medium hover:bg-white/25 transition-all cursor-pointer"
            >
              Contact
            </button>
            <button 
              onClick={() => handleRoleSelect('restaurant')}
              className={`ml-1 px-4 py-1.5 rounded-full text-xs font-bold shadow-md transition-all cursor-pointer ${
                selectedRole === 'restaurant'
                  ? 'bg-[#1C1917] text-white'
                  : 'bg-white text-stone-950 hover:bg-stone-100 hover:scale-105'
              }`}
            >
              Donate
            </button>
          </nav>

          {/* Mobile Menu Trigger */}
          <div className="lg:hidden flex items-center gap-2">
            <button 
              onClick={onBackToHome}
              className="px-3 py-1 rounded-full bg-white text-stone-950 text-xs font-bold shadow-sm"
            >
              Back to Home
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-full bg-stone-900/10 text-stone-900 hover:bg-stone-900/20 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#F59E0B] border-t border-[#D97706]/40 px-4 pt-3 pb-5 flex flex-col gap-2 shadow-xl animate-in slide-in-from-top-2 duration-200">
            <button 
              onClick={onBackToHome}
              className="w-full text-left px-3.5 py-2 rounded-xl bg-stone-900 text-white font-semibold text-xs"
            >
              Home
            </button>
            <button 
              onClick={() => { handleRoleSelect('ngo'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3.5 py-2 rounded-xl border border-stone-900/20 text-stone-950 font-medium text-xs hover:bg-white/20"
            >
              Find Food (NGO / Shelters)
            </button>
            <button 
              onClick={() => { handleRoleSelect('restaurant'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3.5 py-2 rounded-xl border border-stone-900/20 text-stone-950 font-medium text-xs hover:bg-white/20"
            >
              Donate Food (Restaurant / Caterers)
            </button>
            <button 
              onClick={() => { handleRoleSelect('volunteer'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3.5 py-2 rounded-xl border border-stone-900/20 text-stone-950 font-medium text-xs hover:bg-white/20"
            >
              Volunteer
            </button>
          </div>
        )}
      </header>

      {/* ======================================================== */}
      {/* 2. MAIN SPLIT CONTENT: (Single-Screen Fit, No Double Text)*/}
      {/* ======================================================== */}
      <main className="flex-1 flex flex-col lg:flex-row items-stretch w-full max-w-[1920px] mx-auto overflow-hidden">
        
        {/* ---------------------------------------------------- */}
        {/* LEFT COLUMN: Clean Image Artwork (NO Duplicate Text!) */}
        {/* ---------------------------------------------------- */}
        <div className="lg:w-1/2 relative min-h-[380px] lg:min-h-0 lg:h-full bg-[#0C4533] overflow-hidden flex items-center justify-center">
          {/* Authentic High-Resolution Artwork matching user reference exactly without double text overlay */}
          <img 
            src="/auth-left-perfect.png" 
            alt="Palm Beach Harvest - Rescue Food. Build Community." 
            className="w-full h-full object-cover object-left-top select-none pointer-events-none"
          />
        </div>

        {/* ---------------------------------------------------- */}
        {/* RIGHT COLUMN: Crisp High-Resolution Sign In Card     */}
        {/* ---------------------------------------------------- */}
        <div className="lg:w-1/2 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-[#FAF8F5] overflow-y-auto">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-stone-200/90 space-y-5 my-auto">
            
            {/* Header Brand Badge */}
            <div className="text-center space-y-0.5">
              <div className="inline-flex items-center gap-1.5 font-extrabold text-stone-950 tracking-wider text-sm uppercase">
                PALM BEACH
                <span className="bg-[#F59E0B] text-stone-950 px-2 py-0.5 rounded-full text-[11px] font-black tracking-normal">
                  HARVEST
                </span>
              </div>
              <p className="text-[11px] text-stone-500 font-medium">
                Rescue Food. Build Community.
              </p>
            </div>

            {/* Title & Subtitle */}
            <div className="space-y-0.5">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-950 tracking-tight">
                {isSignUpMode ? 'Create Account' : 'Welcome Back!'}
              </h3>
              <p className="text-xs sm:text-sm text-stone-500">
                {isSignUpMode 
                  ? 'Join our network to donate, distribute or volunteer.' 
                  : 'Sign in to continue your food rescue journey.'}
              </p>
            </div>

            {/* 4 Role Cards in a Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              
              {/* Role 1: Restaurant */}
              <div
                onClick={() => handleRoleSelect('restaurant')}
                className={`relative rounded-xl p-2.5 text-center cursor-pointer transition-all flex flex-col items-center justify-center space-y-1 ${
                  selectedRole === 'restaurant'
                    ? 'border-2 border-[#F59E0B] bg-[#FFFBEB] shadow-sm'
                    : 'border border-stone-200 bg-white hover:bg-stone-50'
                }`}
              >
                {selectedRole === 'restaurant' && (
                  <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-[#F59E0B] text-stone-950 flex items-center justify-center shadow-xs">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </span>
                )}
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${selectedRole === 'restaurant' ? 'text-amber-800' : 'text-stone-600'}`}>
                  <Store className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-[11px] text-stone-950">Restaurant</h4>
                <p className="text-[9px] text-stone-500 leading-tight">Donate surplus food</p>
              </div>

              {/* Role 2: NGO */}
              <div
                onClick={() => handleRoleSelect('ngo')}
                className={`relative rounded-xl p-2.5 text-center cursor-pointer transition-all flex flex-col items-center justify-center space-y-1 ${
                  selectedRole === 'ngo'
                    ? 'border-2 border-[#F59E0B] bg-[#FFFBEB] shadow-sm'
                    : 'border border-stone-200 bg-white hover:bg-stone-50'
                }`}
              >
                {selectedRole === 'ngo' && (
                  <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-[#F59E0B] text-stone-950 flex items-center justify-center shadow-xs">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </span>
                )}
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${selectedRole === 'ngo' ? 'text-amber-800' : 'text-stone-600'}`}>
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-[11px] text-stone-950">NGO</h4>
                <p className="text-[9px] text-stone-500 leading-tight">Request & distribute</p>
              </div>

              {/* Role 3: Volunteer */}
              <div
                onClick={() => handleRoleSelect('volunteer')}
                className={`relative rounded-xl p-2.5 text-center cursor-pointer transition-all flex flex-col items-center justify-center space-y-1 ${
                  selectedRole === 'volunteer'
                    ? 'border-2 border-[#F59E0B] bg-[#FFFBEB] shadow-sm'
                    : 'border border-stone-200 bg-white hover:bg-stone-50'
                }`}
              >
                {selectedRole === 'volunteer' && (
                  <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-[#F59E0B] text-stone-950 flex items-center justify-center shadow-xs">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </span>
                )}
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${selectedRole === 'volunteer' ? 'text-amber-800' : 'text-stone-600'}`}>
                  <Bike className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-[11px] text-stone-950">Volunteer</h4>
                <p className="text-[9px] text-stone-500 leading-tight">Pickup & deliver</p>
              </div>

              {/* Role 4: Admin */}
              <div
                onClick={() => handleRoleSelect('admin')}
                className={`relative rounded-xl p-2.5 text-center cursor-pointer transition-all flex flex-col items-center justify-center space-y-1 ${
                  selectedRole === 'admin'
                    ? 'border-2 border-[#F59E0B] bg-[#FFFBEB] shadow-sm'
                    : 'border border-stone-200 bg-white hover:bg-stone-50'
                }`}
              >
                {selectedRole === 'admin' && (
                  <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-[#F59E0B] text-stone-950 flex items-center justify-center shadow-xs">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </span>
                )}
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${selectedRole === 'admin' ? 'text-amber-800' : 'text-stone-600'}`}>
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-[11px] text-stone-950">Admin</h4>
                <p className="text-[9px] text-stone-500 leading-tight">Manage platform</p>
              </div>

            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              
              {/* Email Input */}
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                  <Mail className="w-4 h-4" />
                </span>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@palmbeachharvest.com"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 bg-white text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/20 transition-all"
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                  <Lock className="w-4 h-4" />
                </span>
                <input 
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-stone-300 bg-white text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-stone-600 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Options Row */}
              <div className="flex items-center justify-between text-xs pt-0.5">
                <label className="flex items-center gap-1.5 cursor-pointer select-none">
                  <input 
                    type="checkbox" 
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-3.5 h-3.5 rounded text-[#064E3B] accent-[#064E3B] border-stone-300 focus:ring-0"
                  />
                  <span className="font-medium text-stone-700 text-xs">Remember me</span>
                </label>

                <a href="#forgot" className="font-semibold text-[#0B4834] hover:underline text-xs">
                  Forgot password?
                </a>
              </div>

              {/* Sign In CTA Button */}
              <button 
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-6 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-stone-950 font-bold text-sm sm:text-base shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2 mt-1"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2 text-stone-950 font-bold text-xs sm:text-sm">
                    <span className="w-4 h-4 border-2 border-stone-950 border-t-transparent rounded-full animate-spin" />
                    Signing in as {selectedRole.toUpperCase()}...
                  </span>
                ) : isSuccess ? (
                  <span className="flex items-center gap-1.5 text-stone-950 font-bold text-xs sm:text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-800" /> Redirecting to Portal...
                  </span>
                ) : (
                  <>
                    <span>{isSignUpMode ? 'Create Account' : 'Sign In'}</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </>
                )}
              </button>

            </form>

            {/* OR Divider */}
            <div className="relative flex items-center justify-center">
              <div className="border-t border-stone-200 w-full" />
              <span className="bg-white px-3 text-[10px] font-bold text-stone-400 uppercase tracking-widest absolute">
                OR
              </span>
            </div>

            {/* Social Logins: Google & Apple */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              
              {/* Google Button */}
              <button 
                type="button"
                onClick={handleSubmit}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 font-medium text-xs text-stone-800 shadow-xs transition-all cursor-pointer"
              >
                <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Continue with Google</span>
              </button>

              {/* Apple Button */}
              <button 
                type="button"
                onClick={handleSubmit}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-black hover:bg-stone-900 font-medium text-xs text-white shadow-xs transition-all cursor-pointer"
              >
                <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.38c.62-.75 1.04-1.8 1.01-2.85-.9.04-2 .6-2.64 1.35-.57.65-1.07 1.72-.94 2.76 1 .08 2.01-.51 2.57-1.26z"/>
                </svg>
                <span>Continue with Apple</span>
              </button>

            </div>

            {/* Toggle SignUp / Login */}
            <div className="text-center text-xs text-stone-600 pt-1">
              {isSignUpMode ? (
                <span>
                  Already have an account?{' '}
                  <button 
                    type="button"
                    onClick={() => setIsSignUpMode(false)}
                    className="font-bold text-[#0B4834] hover:underline cursor-pointer"
                  >
                    Sign in
                  </button>
                </span>
              ) : (
                <span>
                  Don't have an account?{' '}
                  <button 
                    type="button"
                    onClick={() => setIsSignUpMode(true)}
                    className="font-bold text-[#0B4834] hover:underline cursor-pointer"
                  >
                    Create one
                  </button>
                </span>
              )}
            </div>

          </div>
        </div>

      </main>

      {/* ======================================================== */}
      {/* 3. BOTTOM MARQUEE TICKER BANNER: GET INVOLVED            */}
      {/* ======================================================== */}
      <footer className="shrink-0 w-full bg-[#F97316] py-2 overflow-hidden shadow-inner border-y border-[#EA580C] z-30">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="flex items-center mx-6 gap-2 text-stone-950 font-black text-xs tracking-widest uppercase">
              <span className="text-sm">🌱</span>
              <span>GET INVOLVED</span>
            </div>
          ))}
        </div>
      </footer>

    </div>
  );
}
