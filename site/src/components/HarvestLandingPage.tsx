import { useState } from 'react';
import {
  MapPin,
  Clock,
  ArrowRight,
  Utensils,
  Leaf,
  Users,
  Cloud,
  CheckCircle2,
  Mail,
  Menu,
  X,
  Compass
} from 'lucide-react';
import { AppView } from '../App';

interface HarvestLandingPageProps {
  onNavigate: (view: AppView) => void;
  onNavigateToAuth?: (role?: 'restaurant' | 'ngo' | 'volunteer' | 'admin') => void;
  onOpenMapModal?: () => void;
}

export default function HarvestLandingPage({ onNavigate, onNavigateToAuth, onOpenMapModal }: HarvestLandingPageProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState<number | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [activeMapPin, setActiveMapPin] = useState<string | null>(null);

  const goToAuth = (role: 'restaurant' | 'ngo' | 'volunteer' | 'admin' = 'restaurant') => {
    if (onNavigateToAuth) {
      onNavigateToAuth(role);
    } else {
      onNavigate('auth');
    }
  };

  // 4 Featured Food Donations from the design
  const featuredDonations = [
    {
      id: 1,
      title: 'Fresh Vegetables Box',
      category: 'Vegetables',
      quantity: '50 kg',
      location: 'Palm Beach, FL',
      distance: '2.3 km',
      expiresIn: 'Expires in 6 hours',
      donorName: 'The Green Table Restaurant',
      donorInitials: 'GT',
      status: 'Available',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=700&q=80',
      description: 'Organic crisp lettuces, carrots, vine-ripened tomatoes and bell peppers packaged in clean food-safe crates.'
    },
    {
      id: 2,
      title: 'Cooked Meals (Veg)',
      category: 'Meals',
      quantity: '100 portions',
      location: 'West Palm Beach',
      distance: '4.1 km',
      expiresIn: 'Expires in 4 hours',
      donorName: 'Sunny Day Cafe',
      donorInitials: 'SD',
      status: 'Available',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=700&q=80',
      description: 'Hot, unserved vegetable rice, lentil dal, and fresh whole wheat rotis held safely in sealed thermal containers.'
    },
    {
      id: 3,
      title: 'Bakery Items',
      category: 'Bakery',
      quantity: '30 kg',
      location: 'Boca Raton',
      distance: '6.7 km',
      expiresIn: 'Expires in 8 hours',
      donorName: 'Local Bakery',
      donorInitials: 'LB',
      status: 'Available',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=700&q=80',
      description: 'Artisan sourdough loaves, multigrain baguettes, croissants, and morning rolls baked fresh today.'
    },
    {
      id: 4,
      title: 'Fresh Fruits',
      category: 'Fruits',
      quantity: '40 kg',
      location: 'Delray Beach',
      distance: '8.9 km',
      expiresIn: 'Expires in 10 hours',
      donorName: 'Healthy Bites',
      donorInitials: 'HB',
      status: 'Available',
      image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=700&q=80',
      description: 'Crisp apples, bananas, Florida sweet oranges, and seasonal berries packed in ventilated fruit baskets.'
    }
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setNewsletterSubscribed(false), 4000);
    }
  };

  return (
    <div className="w-full bg-[#FAFAF8] text-[#1C1917] font-sans antialiased selection:bg-[#F59E0B]/30 selection:text-black">
      
      {/* ======================================================== */}
      {/* 1. TOP HEADER & NAVBAR (Golden Amber Theme)              */}
      {/* ======================================================== */}
      <header className="sticky top-0 z-50 w-full bg-[#F59E0B] border-b border-[#D97706]/40 shadow-sm transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo with Wheat Badge */}
          <div 
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="flex items-center justify-center bg-white/20 backdrop-blur-md border border-white/40 px-3.5 py-1.5 rounded-full shadow-inner group-hover:scale-105 transition-transform">
              <span className="font-extrabold text-stone-900 tracking-wider text-sm sm:text-base uppercase flex items-center gap-1.5">
                PALM BEACH
                <span className="bg-[#1C1917] text-[#F59E0B] px-2 py-0.5 rounded-full text-xs font-black tracking-normal">
                  HARVEST
                </span>
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links (Pill Buttons) */}
          <nav className="hidden lg:flex items-center gap-2">
            <button 
              onClick={() => onNavigate('landing')}
              className="px-4 py-1.5 rounded-full bg-[#1C1917] text-white text-sm font-semibold shadow-sm transition-all hover:bg-black"
            >
              Home
            </button>
            <a 
              href="#about"
              className="px-4 py-1.5 rounded-full border border-stone-900/25 text-stone-900 text-sm font-medium hover:bg-white/25 transition-all"
            >
              About Us
            </a>
            <button 
              onClick={() => goToAuth('ngo')}
              className="px-4 py-1.5 rounded-full border border-stone-900/25 text-stone-900 text-sm font-medium hover:bg-white/25 transition-all cursor-pointer"
            >
              Find Food
            </button>
            <a 
              href="#how-it-works"
              className="px-4 py-1.5 rounded-full border border-stone-900/25 text-stone-900 text-sm font-medium hover:bg-white/25 transition-all"
            >
              Programs
            </a>
            <button 
              onClick={() => goToAuth('volunteer')}
              className="px-4 py-1.5 rounded-full border border-stone-900/25 text-stone-900 text-sm font-medium hover:bg-white/25 transition-all cursor-pointer"
            >
              Volunteer
            </button>
            <a 
              href="#impact"
              className="px-4 py-1.5 rounded-full border border-stone-900/25 text-stone-900 text-sm font-medium hover:bg-white/25 transition-all"
            >
              Events
            </a>
            <a 
              href="#testimonials"
              className="px-4 py-1.5 rounded-full border border-stone-900/25 text-stone-900 text-sm font-medium hover:bg-white/25 transition-all"
            >
              Blog
            </a>
            <a 
              href="#footer"
              className="px-4 py-1.5 rounded-full border border-stone-900/25 text-stone-900 text-sm font-medium hover:bg-white/25 transition-all"
            >
              Contact
            </a>
            <button 
              onClick={() => goToAuth('restaurant')}
              className="ml-2 px-5 py-1.5 rounded-full bg-white text-stone-950 text-sm font-bold shadow-md hover:bg-stone-100 hover:scale-105 transition-all cursor-pointer"
            >
              Donate
            </button>
          </nav>

          {/* Mobile Menu Trigger */}
          <div className="lg:hidden flex items-center gap-2">
            <button 
              onClick={() => goToAuth('restaurant')}
              className="px-3.5 py-1.5 rounded-full bg-white text-stone-950 text-xs font-bold shadow-sm cursor-pointer"
            >
              Donate
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full bg-stone-900/10 text-stone-900 hover:bg-stone-900/20 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#F59E0B] border-t border-[#D97706]/40 px-4 pt-3 pb-6 flex flex-col gap-2.5 shadow-xl animate-in slide-in-from-top-2 duration-200">
            <button 
              onClick={() => { onNavigate('landing'); setMobileMenuOpen(false); }}
              className="w-full text-left px-4 py-2 rounded-xl bg-stone-900 text-white font-semibold text-sm cursor-pointer"
            >
              Home
            </button>
            <button 
              onClick={() => { goToAuth('ngo'); setMobileMenuOpen(false); }}
              className="w-full text-left px-4 py-2 rounded-xl border border-stone-900/20 text-stone-950 font-medium text-sm hover:bg-white/20 cursor-pointer"
            >
              Find Food (NGO / Shelters)
            </button>
            <button 
              onClick={() => { goToAuth('restaurant'); setMobileMenuOpen(false); }}
              className="w-full text-left px-4 py-2 rounded-xl border border-stone-900/20 text-stone-950 font-medium text-sm hover:bg-white/20 cursor-pointer"
            >
              Donate Food (Kitchens / Caterers)
            </button>
            <button 
              onClick={() => { goToAuth('volunteer'); setMobileMenuOpen(false); }}
              className="w-full text-left px-4 py-2 rounded-xl border border-stone-900/20 text-stone-950 font-medium text-sm hover:bg-white/20 cursor-pointer"
            >
              Volunteer & Onboarding
            </button>
            <a 
              href="#impact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-left px-4 py-2 rounded-xl border border-stone-900/20 text-stone-950 font-medium text-sm hover:bg-white/20"
            >
              Our Impact Metrics
            </a>
          </div>
        )}
      </header>

      {/* ======================================================== */}
      {/* 2. HERO SECTION: CRISP RETINA VECTOR HERO                */}
      {/* ======================================================== */}
      <section className="relative w-full min-h-[500px] sm:min-h-[580px] lg:min-h-[640px] flex items-center bg-[#1C1917] overflow-hidden">
        
        {/* Background Image: The authentic van and volunteer team */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/hero-banner-hq.png" 
            alt="Palm Beach Harvest Food Rescue Team" 
            className="w-full h-full object-cover object-right md:object-center brightness-[0.95]"
          />
          {/* Subtle smooth gradient on the left so that HTML typography is 100% crystal clear & razor-sharp */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent md:w-[65%]" />
        </div>

        {/* Crisp Vector Typography & Real Interactive Buttons Overlay */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 w-full">
          <div className="max-w-xl text-white space-y-5">
            
            {/* Headline with Yellow Brush Stroke Accent */}
            <div className="space-y-1">
              <div className="relative inline-block">
                <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-none text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                  Food
                </h1>
                {/* Yellow Brush Underline */}
                <svg className="w-28 sm:w-40 h-3 text-[#F59E0B] mt-1" viewBox="0 0 160 12" fill="currentColor">
                  <path d="M2 7 C 30 2, 70 2, 158 6 C 110 10, 50 11, 2 7 Z" />
                </svg>
              </div>

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                Rescue & Community <br />
                Distribution Network
              </h2>
            </div>

            {/* Subtitle Description */}
            <p className="text-sm sm:text-base lg:text-lg text-stone-100 leading-relaxed font-normal drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)] max-w-lg">
              We rescue surplus food and ensure it reaches individuals and families, including 
              seniors and children, through direct distribution and community partners across 
              Palm Beach County.
            </p>

            {/* Real Crisp Interactive Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button 
                onClick={() => goToAuth('ngo')}
                className="px-6 sm:px-8 py-3 rounded-full bg-[#F59E0B] hover:bg-[#D97706] text-stone-950 font-bold text-sm sm:text-base shadow-lg hover:scale-105 transition-all cursor-pointer flex items-center gap-2 group"
              >
                <span>Find Free Food</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button 
                onClick={() => goToAuth('volunteer')}
                className="px-6 sm:px-8 py-3 rounded-full bg-[#1C1917]/90 hover:bg-black text-white font-semibold text-sm sm:text-base border border-white/40 shadow-md backdrop-blur-sm transition-all cursor-pointer"
              >
                Volunteer
              </button>
            </div>

          </div>
        </div>

      </section>

      {/* ======================================================== */}
      {/* 3. MARQUEE TICKER BANNER: GET INVOLVED                   */}
      {/* ======================================================== */}
      <div className="w-full bg-[#F97316] py-3 overflow-hidden shadow-inner border-y border-[#EA580C]">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="flex items-center mx-6 gap-3 text-stone-950 font-black text-sm tracking-widest uppercase">
              <span className="text-base">🌱</span>
              <span>GET INVOLVED</span>
            </div>
          ))}
        </div>
      </div>

      {/* ======================================================== */}
      {/* 4. "OUR IMPACT" SECTION WITH 4 STAT CARDS                */}
      {/* ======================================================== */}
      <section id="impact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Narrative Box */}
            <div className="lg:col-span-4 space-y-4">
              <div className="relative inline-block">
                <div className="absolute -top-2 left-0 w-24 h-4 bg-[#F59E0B]/60 rounded-full -rotate-1 pointer-events-none" />
                <h2 className="relative text-3xl sm:text-4xl font-extrabold text-stone-950 tracking-tight">
                  Our Impact
                </h2>
              </div>
              <p className="text-stone-600 text-base leading-relaxed">
                Together we are reducing food waste, feeding communities and building a healthier, stronger Palm Beach County.
              </p>
              <button 
                onClick={() => onNavigate('auth')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F59E0B] text-stone-950 font-bold text-sm shadow hover:bg-[#D97706] hover:scale-105 transition-all cursor-pointer"
              >
                <span>See Our Impact</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Right: 4 Stat Cards in a row */}
            <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
              
              {/* Card 1: Meals Rescued */}
              <div className="bg-[#FAF9F5] p-6 rounded-2xl border border-stone-200/80 text-center flex flex-col items-center justify-center space-y-3 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-[#FEF3C7] text-[#D97706] flex items-center justify-center shadow-inner">
                  <Utensils className="w-6 h-6" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-stone-950 tracking-tight">
                  125,680+
                </div>
                <div className="text-xs sm:text-sm font-medium text-stone-600">
                  Meals Rescued
                </div>
              </div>

              {/* Card 2: Food Saved */}
              <div className="bg-[#FAF9F5] p-6 rounded-2xl border border-stone-200/80 text-center flex flex-col items-center justify-center space-y-3 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-[#FEF3C7] text-[#D97706] flex items-center justify-center shadow-inner">
                  <Leaf className="w-6 h-6" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-stone-950 tracking-tight">
                  287,450 lbs
                </div>
                <div className="text-xs sm:text-sm font-medium text-stone-600">
                  Food Saved
                </div>
              </div>

              {/* Card 3: CO2 Avoided */}
              <div className="bg-[#FAF9F5] p-6 rounded-2xl border border-stone-200/80 text-center flex flex-col items-center justify-center space-y-3 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-[#FEF3C7] text-[#D97706] flex items-center justify-center shadow-inner">
                  <Cloud className="w-6 h-6" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-stone-950 tracking-tight">
                  1,126 tons
                </div>
                <div className="text-xs sm:text-sm font-medium text-stone-600">
                  CO₂ Avoided
                </div>
              </div>

              {/* Card 4: People Helped */}
              <div className="bg-[#FAF9F5] p-6 rounded-2xl border border-stone-200/80 text-center flex flex-col items-center justify-center space-y-3 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-[#FEF3C7] text-[#D97706] flex items-center justify-center shadow-inner">
                  <Users className="w-6 h-6" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-stone-950 tracking-tight">
                  2,340+
                </div>
                <div className="text-xs sm:text-sm font-medium text-stone-600">
                  People Helped
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. "HOW IT WORKS" 4-STEP CARD GRID                       */}
      {/* ======================================================== */}
      <section id="how-it-works" className="py-20 bg-[#FBF6EF] border-t border-stone-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="mb-14">
            <div className="relative inline-block">
              <div className="absolute -top-2 left-0 w-28 h-4 bg-[#F59E0B]/60 rounded-full -rotate-1 pointer-events-none" />
              <h2 className="relative text-3xl sm:text-4xl font-extrabold text-stone-950 tracking-tight">
                How It Works
              </h2>
            </div>
            <p className="text-stone-600 text-sm sm:text-base mt-2 font-medium">
              Simple steps. Big impact.
            </p>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Step 1: Rescue Food */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-200/70 flex flex-col transition-transform hover:-translate-y-1.5 duration-200">
              <div className="relative h-48 w-full overflow-hidden">
                <span className="absolute top-3 left-3 z-10 w-9 h-9 rounded-full bg-[#F59E0B] text-stone-950 font-black text-base flex items-center justify-center shadow-md">
                  1
                </span>
                <img 
                  src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=600&q=80" 
                  alt="Rescue Food Kitchen"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-stone-950 mb-1.5">
                    Rescue Food
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    Restaurants, cafes and local businesses donate surplus food instead of wasting it.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2: Match & Connect */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-200/70 flex flex-col transition-transform hover:-translate-y-1.5 duration-200">
              <div className="relative h-48 w-full overflow-hidden">
                <span className="absolute top-3 left-3 z-10 w-9 h-9 rounded-full bg-[#F59E0B] text-stone-950 font-black text-base flex items-center justify-center shadow-md">
                  2
                </span>
                <img 
                  src="https://images.unsplash.com/photo-1594708767771-a7502209ff51?auto=format&fit=crop&w=600&q=80" 
                  alt="Match & Connect"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-stone-950 mb-1.5">
                    Match & Connect
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    Our network matches food with nearby organizations and families in need.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3: Distribute */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-200/70 flex flex-col transition-transform hover:-translate-y-1.5 duration-200">
              <div className="relative h-48 w-full overflow-hidden">
                <span className="absolute top-3 left-3 z-10 w-9 h-9 rounded-full bg-[#F59E0B] text-stone-950 font-black text-base flex items-center justify-center shadow-md">
                  3
                </span>
                <img 
                  src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=600&q=80" 
                  alt="Distribute"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-stone-950 mb-1.5">
                    Distribute
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    Volunteers and partners collect and deliver food safely and quickly.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 4: Create Change */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-200/70 flex flex-col transition-transform hover:-translate-y-1.5 duration-200">
              <div className="relative h-48 w-full overflow-hidden">
                <span className="absolute top-3 left-3 z-10 w-9 h-9 rounded-full bg-[#F59E0B] text-stone-950 font-black text-base flex items-center justify-center shadow-md">
                  4
                </span>
                <img 
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80" 
                  alt="Create Change"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-stone-950 mb-1.5">
                    Create Change
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    Nutritious meals reach families, communities and reduce environmental impact.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 6. "FEATURED FOOD DONATIONS" (LIVE CARD FEED)            */}
      {/* ======================================================== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header with View All Button */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <div className="relative inline-block">
                <div className="absolute -top-2 left-0 w-36 h-4 bg-[#F59E0B]/60 rounded-full -rotate-1 pointer-events-none" />
                <h2 className="relative text-3xl sm:text-4xl font-extrabold text-stone-950 tracking-tight">
                  Featured Food Donations
                </h2>
              </div>
              <p className="text-stone-600 text-sm sm:text-base mt-2 font-medium">
                Fresh food. Real impact. Available now in your area.
              </p>
            </div>

            <button 
              onClick={() => goToAuth('ngo')}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#F59E0B] text-stone-950 font-bold text-sm shadow hover:bg-[#D97706] hover:scale-105 transition-all self-start sm:self-auto cursor-pointer"
            >
              <span>View All Food</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 4 Real-time Food Donation Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDonations.map((item) => (
              <div 
                key={item.id}
                onClick={() => setSelectedDonation(item.id)}
                className="bg-[#FAF9F5] rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group cursor-pointer"
              >
                {/* Food Image with Available Pill Badge */}
                <div className="relative h-44 w-full overflow-hidden bg-stone-100">
                  <span className="absolute top-3 right-3 z-10 px-2.5 py-0.5 rounded-full bg-[#10B981] text-white text-[11px] font-bold shadow-sm tracking-wide">
                    {item.status}
                  </span>
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Details */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-bold text-stone-950 text-base group-hover:text-[#D97706] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs font-semibold text-stone-500 mt-0.5">
                      {item.quantity} • {item.category}
                    </p>
                  </div>

                  <div className="space-y-1.5 text-xs text-stone-600 border-t border-stone-200/80 pt-2.5">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span className="truncate">{item.location} • {item.distance}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-amber-700 font-medium">
                      <Clock className="w-3.5 h-3.5 shrink-0" />
                      <span>{item.expiresIn}</span>
                    </div>
                  </div>

                  {/* Donor Info */}
                  <div className="flex items-center gap-2 pt-2 border-t border-stone-200/80">
                    <div className="w-6 h-6 rounded-full bg-[#064E3B] text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                      {item.donorInitials}
                    </div>
                    <span className="text-xs font-medium text-stone-700 truncate">
                      {item.donorName}
                    </span>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 7. "FIND FOOD NEAR YOU" & SUSTAINABILITY BANNER          */}
      {/* ======================================================== */}
      <section className="relative w-full bg-[#FAFAF8] py-8 sm:py-12 border-t border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Unified 3-Column Banner Matching Reference Design */}
          <div className="w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-stone-200/90 grid grid-cols-1 lg:grid-cols-12 items-stretch bg-[#0B4834]">
            
            {/* Left Card: Find Food Near You */}
            <div className="lg:col-span-4 p-8 sm:p-10 flex flex-col justify-between text-white space-y-6 relative overflow-hidden bg-[#0B4834]">
              <div className="space-y-4 relative z-10">
                <div className="relative inline-block">
                  {/* Yellow brush marker accent */}
                  <div className="absolute -top-2 left-0 w-24 h-3.5 bg-[#F59E0B]/80 rounded-full -rotate-1 pointer-events-none" />
                  <h3 className="relative text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                    Find Food <br />Near You
                  </h3>
                </div>
                <p className="text-stone-200 text-sm leading-relaxed max-w-sm">
                  Use our interactive map to find available food donations, nearby organizations and volunteer routes.
                </p>
              </div>

              <div className="pt-4 relative z-10">
                <button 
                  onClick={() => {
                    if (onOpenMapModal) {
                      onOpenMapModal();
                    } else {
                      onNavigate('receiver-dashboard');
                    }
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#F59E0B] text-stone-950 font-bold text-sm shadow-md hover:bg-[#D97706] hover:scale-105 transition-all cursor-pointer"
                >
                  <span>Open Map</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Center Card: High-Resolution Interactive Map of Palm Beach Area */}
            <div className="lg:col-span-5 relative min-h-[300px] sm:min-h-[340px] bg-[#E3ECE5] border-y lg:border-y-0 lg:border-x border-stone-300/40 overflow-hidden flex items-center justify-center">
              
              {/* Detailed Road Grid and Coastline SVG */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 340" preserveAspectRatio="none">
                {/* Atlantic Ocean Waterway on Right */}
                <path d="M 420 0 Q 390 120 410 240 Q 430 300 450 340 L 500 340 L 500 0 Z" fill="#BFDBFE" />
                <path d="M 370 0 Q 360 170 380 340" stroke="#93C5FD" strokeWidth="12" fill="none" opacity="0.6" />
                
                {/* City Blocks & Land */}
                <rect x="0" y="0" width="410" height="340" fill="#E2EBE2" />
                
                {/* Major Highways & Arterials */}
                {/* I-95 North/South */}
                <path d="M 180 0 Q 200 170 210 340" stroke="#FDE68A" strokeWidth="8" fill="none" />
                {/* US-1 */}
                <path d="M 280 0 Q 290 170 310 340" stroke="#FED7AA" strokeWidth="6" fill="none" />
                {/* Florida Turnpike */}
                <path d="M 70 0 Q 110 180 130 340" stroke="#CBD5E1" strokeWidth="6" fill="none" />
                {/* Okeechobee Blvd East/West */}
                <path d="M 0 160 L 410 160" stroke="#FFFFFF" strokeWidth="8" fill="none" />
                {/* Palm Beach Lakes Blvd */}
                <path d="M 0 90 L 380 90" stroke="#FFFFFF" strokeWidth="6" fill="none" />
                {/* Southern Blvd */}
                <path d="M 0 240 L 400 240" stroke="#FFFFFF" strokeWidth="6" fill="none" />

                {/* Secondary Street Grid */}
                <line x1="40" y1="0" x2="40" y2="340" stroke="#FFFFFF" strokeWidth="2" opacity="0.7" />
                <line x1="240" y1="0" x2="240" y2="340" stroke="#FFFFFF" strokeWidth="2" opacity="0.7" />
                <line x1="340" y1="0" x2="340" y2="340" stroke="#FFFFFF" strokeWidth="2" opacity="0.7" />
                <line x1="0" y1="40" x2="410" y2="40" stroke="#FFFFFF" strokeWidth="2" opacity="0.7" />
                <line x1="0" y1="200" x2="410" y2="200" stroke="#FFFFFF" strokeWidth="2" opacity="0.7" />
                <line x1="0" y1="290" x2="410" y2="290" stroke="#FFFFFF" strokeWidth="2" opacity="0.7" />
              </svg>

              {/* Floating White Legend Card (Top-Left of Map) */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md rounded-xl p-3 shadow-md border border-stone-200 text-xs space-y-1.5 z-20">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] shadow-sm" />
                  <span className="font-semibold text-stone-800">Food Donations</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] shadow-sm" />
                  <span className="font-medium text-stone-600">NGOs</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6] shadow-sm" />
                  <span className="font-medium text-stone-600">Volunteers</span>
                </div>
              </div>

              {/* Interactive Location Markers */}
              {/* Pin 1: West Palm Beach (Green / Food) */}
              <div 
                onClick={() => {
                  if (onOpenMapModal) onOpenMapModal();
                }}
                className="absolute top-[48%] left-[55%] -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
              >
                <div className="relative">
                  <span className="absolute -inset-1 rounded-full bg-[#10B981] opacity-40 animate-ping" />
                  <div className="w-8 h-8 rounded-full bg-[#10B981] text-white flex items-center justify-center shadow-lg group-hover:scale-125 transition-transform">
                    <MapPin className="w-4 h-4" />
                  </div>
                </div>
                <span className="mt-1 text-[11px] font-extrabold bg-white/95 text-stone-900 px-2 py-0.5 rounded-md shadow-md block whitespace-nowrap border border-stone-200">
                  West Palm Beach
                </span>
              </div>

              {/* Pin 2: Palm Beach Island (Orange / NGO) */}
              <div 
                onClick={() => {
                  if (onOpenMapModal) onOpenMapModal();
                }}
                className="absolute top-[28%] right-[22%] cursor-pointer group z-20"
              >
                <div className="w-7 h-7 rounded-full bg-[#F59E0B] text-stone-950 flex items-center justify-center shadow-md group-hover:scale-125 transition-transform">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Pin 3: Lake Worth (Blue / Volunteer) */}
              <div 
                onClick={() => {
                  if (onOpenMapModal) onOpenMapModal();
                }}
                className="absolute bottom-[22%] left-[42%] cursor-pointer group z-20"
              >
                <div className="w-7 h-7 rounded-full bg-[#3B82F6] text-white flex items-center justify-center shadow-md group-hover:scale-125 transition-transform">
                  <Compass className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Pin 4: Boca Raton Hub (Green / Food) */}
              <div 
                onClick={() => {
                  if (onOpenMapModal) onOpenMapModal();
                }}
                className="absolute top-[25%] left-[26%] cursor-pointer group z-20"
              >
                <div className="w-6 h-6 rounded-full bg-[#10B981] text-white flex items-center justify-center shadow-md group-hover:scale-125 transition-transform">
                  <MapPin className="w-3 h-3" />
                </div>
              </div>

              {/* Center Map Click overlay to open full interactive modal */}
              <div 
                onClick={() => {
                  if (onOpenMapModal) onOpenMapModal();
                }}
                className="absolute inset-0 cursor-pointer hover:bg-black/5 transition-colors z-10"
                title="Click to launch interactive live dispatch map"
              />
            </div>

            {/* Right Card: Together for a Sustainable Future */}
            <div className="lg:col-span-3 p-8 sm:p-10 flex flex-col justify-between text-white space-y-6 relative overflow-hidden bg-[#0B4834]">
              {/* High-Resolution Tropical Palm Background */}
              <div className="absolute inset-0 z-0">
                <img 
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=85" 
                  alt="Florida Tropical Palms" 
                  className="w-full h-full object-cover opacity-25 mix-blend-luminosity"
                />
                <div className="absolute inset-0 bg-[#0B4834]/80 backdrop-blur-[1px]" />
              </div>

              <div className="space-y-4 relative z-10">
                <div className="w-11 h-11 rounded-full bg-[#F59E0B] text-stone-950 flex items-center justify-center shadow-md">
                  <Leaf className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-extrabold text-white leading-snug">
                  Together for a <br />Sustainable Future
                </h3>
                <p className="text-stone-200 text-xs sm:text-sm leading-relaxed">
                  Less food waste. More happy faces. A greener planet.
                </p>
              </div>

              <div className="pt-4 relative z-10">
                <button 
                  onClick={() => onNavigate('auth')}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#F59E0B] text-stone-950 font-bold text-xs sm:text-sm shadow-md hover:bg-[#D97706] hover:scale-105 transition-all cursor-pointer"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

          {/* Quick Action Bar Underneath */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-600 px-2">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" /> Food Donations
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" /> Verified NGOs
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]" /> Active Volunteers
              </span>
            </div>

            <button 
              onClick={() => {
                if (onOpenMapModal) {
                  onOpenMapModal();
                } else {
                  onNavigate('receiver-dashboard');
                }
              }}
              className="inline-flex items-center gap-1.5 font-bold text-[#D97706] hover:text-[#B45309] hover:underline cursor-pointer"
            >
              <span>Launch Fullscreen GPS Live Dispatch Map</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 8. "WHAT PEOPLE SAY" TESTIMONIALS SECTION               */}
      {/* ======================================================== */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="mb-14">
            <div className="relative inline-block">
              <div className="absolute -top-2 left-0 w-32 h-4 bg-[#F59E0B]/60 rounded-full -rotate-1 pointer-events-none" />
              <h2 className="relative text-3xl sm:text-4xl font-extrabold text-stone-950 tracking-tight">
                What People Say
              </h2>
            </div>
          </div>

          {/* 3 Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Testimonial 1 */}
            <div className="bg-[#FAF9F5] p-6 rounded-2xl border border-stone-200/80 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
              <p className="text-stone-700 text-sm leading-relaxed italic">
                "Palm Beach Harvest has made a huge difference for our restaurant. We're happy to donate and see our food help the community instead of going to waste."
              </p>
              <div className="flex items-center gap-3 pt-3 border-t border-stone-200">
                <img 
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80" 
                  alt="Sarah Johnson"
                  className="w-11 h-11 rounded-full object-cover border-2 border-[#F59E0B]"
                />
                <div>
                  <h4 className="font-bold text-stone-950 text-sm">
                    Sarah Johnson
                  </h4>
                  <p className="text-xs text-stone-500 font-medium">
                    Restaurant Owner
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-[#FAF9F5] p-6 rounded-2xl border border-stone-200/80 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
              <p className="text-stone-700 text-sm leading-relaxed italic">
                "The platform is easy to use and helps us get fresh, nutritious food for the families we serve. It's a game changer for our organization."
              </p>
              <div className="flex items-center gap-3 pt-3 border-t border-stone-200">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80" 
                  alt="Michael Rodriguez"
                  className="w-11 h-11 rounded-full object-cover border-2 border-[#F59E0B]"
                />
                <div>
                  <h4 className="font-bold text-stone-950 text-sm">
                    Michael Rodriguez
                  </h4>
                  <p className="text-xs text-stone-500 font-medium">
                    NGO Director
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-[#FAF9F5] p-6 rounded-2xl border border-stone-200/80 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
              <p className="text-stone-700 text-sm leading-relaxed italic">
                "Volunteering with Palm Beach Harvest is incredibly rewarding. I love knowing I'm helping my community and the planet."
              </p>
              <div className="flex items-center gap-3 pt-3 border-t border-stone-200">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" 
                  alt="Emily Carter"
                  className="w-11 h-11 rounded-full object-cover border-2 border-[#F59E0B]"
                />
                <div>
                  <h4 className="font-bold text-stone-950 text-sm">
                    Emily Carter
                  </h4>
                  <p className="text-xs text-stone-500 font-medium">
                    Volunteer
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 9. "BE PART OF THE SOLUTION" CTA BANNER                 */}
      {/* ======================================================== */}
      <section className="relative py-24 overflow-hidden">
        {/* Background photo of fresh vegetables harvest in hands */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=2000&q=85" 
            alt="Fresh harvest in hands"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/80 backdrop-blur-[2px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white space-y-6">
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white drop-shadow">
            Be Part of the Solution
          </h2>
          <p className="text-base sm:text-lg text-stone-300 max-w-xl mx-auto leading-relaxed">
            Join our mission to rescue food, feed communities and build a healthier planet.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button 
              onClick={() => goToAuth('restaurant')}
              className="px-8 py-3.5 rounded-full bg-[#F59E0B] text-stone-950 font-bold text-base shadow-lg hover:bg-[#D97706] hover:scale-105 transition-all cursor-pointer"
            >
              Donate Food
            </button>
            <button 
              onClick={() => goToAuth('ngo')}
              className="px-8 py-3.5 rounded-full bg-[#1C1917] text-white font-semibold text-base border border-stone-700 shadow-md hover:bg-black transition-all cursor-pointer"
            >
              Find Food
            </button>
            <button 
              onClick={() => goToAuth('volunteer')}
              className="px-8 py-3.5 rounded-full bg-transparent text-white font-semibold text-base border border-white/40 shadow-sm hover:bg-white/10 transition-all cursor-pointer"
            >
              Volunteer
            </button>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 10. FOOTER SECTION                                       */}
      {/* ======================================================== */}
      <footer id="footer" className="bg-[#1C1917] text-stone-300 pt-16 pb-8 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
            
            {/* Brand column */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-white tracking-wider text-lg uppercase flex items-center gap-1.5">
                  PALM BEACH
                  <span className="bg-[#F59E0B] text-stone-950 px-2 py-0.5 rounded-full text-xs font-black tracking-normal">
                    HARVEST
                  </span>
                </span>
              </div>
              <p className="text-stone-400 text-sm leading-relaxed max-w-sm">
                Rescue Food. Feed People. Build Community. Traceable surplus food redistribution powered by verified hygiene compliance.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-3">
              <h4 className="text-white font-bold text-sm tracking-wide">
                Quick Links
              </h4>
              <ul className="space-y-2 text-xs font-medium text-stone-400">
                <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
                <li><button onClick={() => goToAuth('ngo')} className="hover:text-white transition-colors text-left cursor-pointer">Find Food</button></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">Programs</a></li>
                <li><button onClick={() => goToAuth('volunteer')} className="hover:text-white transition-colors text-left cursor-pointer">Volunteer</button></li>
              </ul>
            </div>

            {/* Support */}
            <div className="space-y-3">
              <h4 className="text-white font-bold text-sm tracking-wide">
                Support
              </h4>
              <ul className="space-y-2 text-xs font-medium text-stone-400">
                <li><a href="#footer" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#footer" className="hover:text-white transition-colors">FAQs</a></li>
                <li><a href="#footer" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#footer" className="hover:text-white transition-colors">Terms & Conditions</a></li>
              </ul>
            </div>

            {/* Social & Newsletter */}
            <div className="space-y-3">
              <h4 className="text-white font-bold text-sm tracking-wide">
                Connect With Us
              </h4>
              <div className="flex items-center gap-3 text-stone-400 pb-2">
                <a href="#" className="hover:text-[#F59E0B] transition-colors" aria-label="Facebook">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
                </a>
                <a href="#" className="hover:text-[#F59E0B] transition-colors" aria-label="Instagram">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href="#" className="hover:text-[#F59E0B] transition-colors" aria-label="X (Twitter)">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="#" className="hover:text-[#F59E0B] transition-colors" aria-label="YouTube">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
                <a href="#" className="hover:text-[#F59E0B] transition-colors" aria-label="LinkedIn">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
              </div>

              <div className="pt-2">
                <p className="text-xs text-stone-400 mb-2 font-medium">Subscribe to our newsletter</p>
                <form onSubmit={handleNewsletterSubmit} className="flex items-center gap-1.5">
                  <input 
                    type="email" 
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#F59E0B]"
                  />
                  <button 
                    type="submit"
                    className="bg-[#F59E0B] text-stone-950 p-2 rounded-lg font-bold hover:bg-[#D97706] transition-colors shrink-0"
                    aria-label="Subscribe"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
                {newsletterSubscribed && (
                  <p className="text-[11px] text-[#10B981] mt-1.5 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Thank you for subscribing!
                  </p>
                )}
              </div>
            </div>

          </div>

          {/* Bottom Orange Ticker Strip */}
          <div className="mt-8 pt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-3">
            <div className="flex items-center gap-2 text-stone-400 font-semibold uppercase tracking-wider text-[11px]">
              <span className="text-[#F59E0B]">🌱</span> GET INVOLVED
              <span className="text-stone-700">•</span>
              <span className="text-[#F59E0B]">🌱</span> GET INVOLVED
              <span className="text-stone-700">•</span>
              <span className="text-[#F59E0B]">🌱</span> GET INVOLVED
            </div>
            <p>© 2026 Palm Beach Harvest. All rights reserved.</p>
          </div>

        </div>
      </footer>

      {/* Selected Donation Quick Details Modal */}
      {selectedDonation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-stone-200 space-y-4">
            {featuredDonations.filter(d => d.id === selectedDonation).map(item => (
              <div key={item.id} className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-[#10B981]/10 text-[#065F46] font-bold text-xs">
                    {item.status} for Pickup
                  </span>
                  <button 
                    onClick={() => setSelectedDonation(null)}
                    className="p-1 rounded-full hover:bg-stone-100 text-stone-500"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-44 object-cover rounded-2xl"
                />

                <div>
                  <h3 className="text-xl font-black text-stone-950">{item.title}</h3>
                  <p className="text-xs font-semibold text-[#D97706] mt-0.5">{item.quantity} • {item.category}</p>
                  <p className="text-xs text-stone-600 mt-2 leading-relaxed">{item.description}</p>
                </div>

                <div className="bg-[#FAF9F5] p-3 rounded-xl border border-stone-200 text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-stone-500">Pickup Location:</span>
                    <span className="font-semibold text-stone-900">{item.location} ({item.distance})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Safe Expiry:</span>
                    <span className="font-semibold text-amber-700">{item.expiresIn}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Verified Donor:</span>
                    <span className="font-semibold text-stone-900">{item.donorName}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button 
                    onClick={() => {
                      setSelectedDonation(null);
                      goToAuth('ngo');
                    }}
                    className="flex-1 py-3 rounded-full bg-[#F59E0B] text-stone-950 font-bold text-sm shadow hover:bg-[#D97706] transition-all text-center cursor-pointer"
                  >
                    Claim Donation via NGO Portal
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

