import { useState } from 'react';
import {
  Search, Bell, Mail, Plus, Clock, TrendingUp, ChevronDown,
  Filter, MoreHorizontal, ArrowUpRight, CheckCircle2, AlertTriangle,
  ArrowLeft, ArrowLeftRight, LogOut, Sliders, Calendar, Share2,
  Package, Truck, Shield, Weight, Thermometer, User, Building, QrCode,
  HeartHandshake, MapPin, Award, Navigation
} from 'lucide-react';
import { UserProfile, DEMO_RECEIVER_USER } from '../types';
import VelaLiveDispatchMap from './VelaLiveDispatchMap';

interface VelaTakerPortalProps {
  user?: UserProfile;
  onClose: () => void;
  onSwitchRole?: () => void;
  onSignOut?: () => void;
}

interface AvailableBatch {
  id: string;
  donor: string;
  donorType: string;
  item: string;
  weight: string;
  temp: string;
  tempOk: boolean;
  deadline: string;
  distance: string;
  meals: string;
  canCollect: boolean;
}

interface AcceptedBatch {
  id: string;
  donor: string;
  item: string;
  weight: string;
  status: 'Completed' | 'In Progress';
  distributed: string;
  meals: string;
  date: string;
  otp: string;
  loss: string;
}

const INITIAL_AVAILABLE: AvailableBatch[] = [
  {
    id: 'VB-2024-0043',
    donor: 'Rajdhani Royal Kitchen',
    donorType: 'Restaurant',
    item: 'Vegetable Biryani with Boondi Raita',
    weight: '14 kg',
    temp: '64°C',
    tempOk: true,
    deadline: '22:45',
    distance: '1.2 km',
    meals: '~40 meals',
    canCollect: true,
  },
  {
    id: 'VB-2024-0044',
    donor: 'Spice Garden Cloud Kitchen',
    donorType: 'Cloud Kitchen',
    item: 'Rajma Chawal + Phulkas (60 portions)',
    weight: '22 kg',
    temp: '70°C',
    tempOk: true,
    deadline: '23:15',
    distance: '2.8 km',
    meals: '~63 meals',
    canCollect: true,
  },
  {
    id: 'VB-2024-0045',
    donor: 'Hotel Sarovar Grand',
    donorType: 'Hotel / Caterer',
    item: 'Continental Dinner Buffet Surplus',
    weight: '18 kg',
    temp: '54°C',
    tempOk: false,
    deadline: '21:00',
    distance: '4.1 km',
    meals: '~51 meals',
    canCollect: false,
  },
];

const INITIAL_ACCEPTED: AcceptedBatch[] = [
  {
    id: 'VB-2024-0041',
    donor: 'Rajdhani Royal Kitchen',
    item: 'Dal Makhani + Tandoori Roti',
    weight: '28 kg',
    status: 'Completed',
    distributed: '26.5 kg',
    meals: '75',
    date: '31 Oct 2026',
    otp: '8492',
    loss: '5.4%',
  },
  {
    id: 'VB-2024-0042',
    donor: 'Spice Garden Cloud Kitchen',
    item: 'Paneer Butter Masala + Rice',
    weight: '18 kg',
    status: 'In Progress',
    distributed: '—',
    meals: '—',
    date: 'Today',
    otp: '3617',
    loss: '—',
  },
];

export default function VelaTakerPortal({
  user = DEMO_RECEIVER_USER,
  onClose,
  onSwitchRole,
  onSignOut,
}: VelaTakerPortalProps) {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [availableBatches, setAvailableBatches] = useState<AvailableBatch[]>(INITIAL_AVAILABLE);
  const [acceptedBatches, setAcceptedBatches] = useState<AcceptedBatch[]>(INITIAL_ACCEPTED);
  const [claiming, setClaiming] = useState<string | null>(null);
  const [tooltipMonth, setTooltipMonth] = useState<number | null>(7); // August peak
  const [trackingBatchId, setTrackingBatchId] = useState<string>('VB-2024-0042');

  const handleClaim = (batch: AvailableBatch) => {
    if (!batch.canCollect) return;
    setClaiming(batch.id);

    setTimeout(() => {
      const otpCode = Math.floor(1000 + Math.random() * 9000).toString();
      const newEntry: AcceptedBatch = {
        id: batch.id,
        donor: batch.donor,
        item: batch.item,
        weight: batch.weight,
        status: 'In Progress',
        distributed: '—',
        meals: '—',
        date: 'Just now',
        otp: otpCode,
        loss: '—',
      };

      setAcceptedBatches([newEntry, ...acceptedBatches]);
      setAvailableBatches(availableBatches.filter(b => b.id !== batch.id));
      setClaiming(null);
    }, 1000);
  };

  const handleConfirmDistribution = (batchId: string) => {
    setAcceptedBatches(prev =>
      prev.map(b => {
        if (b.id === batchId) {
          const wNum = parseFloat(b.weight) || 16;
          const distNum = (wNum * 0.95).toFixed(1);
          const meals = Math.round((parseFloat(distNum) * 1000) / 350).toString();
          return {
            ...b,
            status: 'Completed',
            distributed: `${distNum} kg`,
            meals: `${meals} meals`,
            loss: '5.0%',
          };
        }
        return b;
      })
    );
  };

  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const MATRIX_DATA = [
    { solid: 3, hatch: 1 },
    { solid: 4, hatch: 2 },
    { solid: 6, hatch: 2 },
    { solid: 5, hatch: 3 },
    { solid: 6, hatch: 2 },
    { solid: 7, hatch: 2 },
    { solid: 6, hatch: 3 },
    { solid: 9, hatch: 2 }, // Aug peak
    { solid: 7, hatch: 3 },
    { solid: 6, hatch: 2 },
    { solid: 5, hatch: 2 },
    { solid: 7, hatch: 3 },
  ];

  return (
    <div className="min-h-screen w-full bg-[#E8EAE6] p-0 sm:p-2 md:p-3 flex flex-col font-sans antialiased">
      {/* Outer Full-Width Window matching ConstructHub reference */}
      <div className="w-full min-h-screen bg-white rounded-none sm:rounded-[28px] md:rounded-[36px] shadow-2xl overflow-hidden flex flex-col md:flex-row border-0 sm:border border-black/5 flex-1">
        
        {/* ================================================================= */}
        {/* LEFT SIDEBAR matching reference image                             */}
        {/* ================================================================= */}
        <aside className="w-full md:w-[260px] lg:w-[270px] bg-white border-r border-gray-100 p-5 flex flex-col justify-between shrink-0 select-none">
          <div>
            {/* Logo + Brand */}
            <div className="flex items-center justify-between pb-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-blue-700 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                  V
                </div>
                <div>
                  <div className="text-sm font-bold text-[#0D0D0C] tracking-tight leading-tight">
                    VelaHub
                  </div>
                  <div className="text-[10px] text-gray-400 font-medium">
                    NGO Receiver Cloud
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="h-7 w-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-black hover:border-black transition-colors cursor-pointer text-xs"
                title="Return to Website"
              >
                «
              </button>
            </div>

            {/* Main Menu */}
            <div className="mt-6">
              <div className="flex items-center justify-between text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-2 mb-2">
                <span>Main Menu</span>
                <ChevronDown className="h-3 w-3" />
              </div>

              <nav className="space-y-1">
                <button
                  onClick={() => setActiveMenu('dashboard')}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${
                    activeMenu === 'dashboard'
                      ? 'bg-[#FF6422] text-white shadow-md shadow-orange-500/20'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-sm border-2 border-current grid grid-cols-2 gap-0.5 p-0.5">
                      <div className="bg-current rounded-[1px]" />
                      <div className="bg-current rounded-[1px]" />
                      <div className="bg-current rounded-[1px]" />
                      <div className="bg-current rounded-[1px]" />
                    </div>
                    <span>Receiver Desk</span>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setActiveMenu('live-map');
                    document.getElementById('live-taker-dispatch-map-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${
                    activeMenu === 'live-map'
                      ? 'bg-[#FF6422] text-white shadow-md shadow-orange-500/20'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Navigation className="h-4 w-4 rotate-45 text-[#FF6422] group-hover:text-white" />
                    <span>Live GPS Fleet Map</span>
                  </div>
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                </button>

                <button
                  onClick={() => setActiveMenu('available')}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-medium text-gray-600 hover:bg-gray-50 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Package className="h-4 w-4" />
                    <span>Available Food</span>
                  </div>
                  <span className="text-[10px] bg-orange-100 text-[#FF6422] font-mono px-2 py-0.5 rounded-full font-bold">
                    {availableBatches.length} active
                  </span>
                </button>

                <button
                  onClick={() => setActiveMenu('collections')}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-medium text-gray-600 hover:bg-gray-50 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Truck className="h-4 w-4" />
                    <span>Pickup Route</span>
                  </div>
                  <span className="text-[10px] bg-gray-100 text-gray-600 font-mono px-2 py-0.5 rounded-full font-bold">
                    {acceptedBatches.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveMenu('shelters')}
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-medium text-gray-600 hover:bg-gray-50 transition-all cursor-pointer"
                >
                  <Building className="h-4 w-4" />
                  <span>Shelter Hubs</span>
                </button>

                <button
                  onClick={() => setActiveMenu('cert')}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-medium text-gray-600 hover:bg-gray-50 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Award className="h-4 w-4" />
                    <span>FSSAI Cert</span>
                  </div>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-mono px-2 py-0.5 rounded-full font-bold">
                    Active
                  </span>
                </button>
              </nav>
            </div>

            {/* Other Section */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-2 mb-2">
                <span>Other</span>
                <ChevronDown className="h-3 w-3" />
              </div>

              <nav className="space-y-1">
                <button className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-medium text-gray-600 hover:bg-gray-50 transition-all cursor-pointer">
                  <TrendingUp className="h-4 w-4" />
                  <span>Beneficiary Ledger</span>
                </button>
                <button className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-medium text-gray-600 hover:bg-gray-50 transition-all cursor-pointer">
                  <Shield className="h-4 w-4" />
                  <span>DPDP 2023 Safety</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Bottom Profile Bar */}
          <div className="pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between p-2 rounded-2xl hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="h-9 w-9 rounded-xl bg-blue-100 border border-blue-200 flex items-center justify-center text-lg shrink-0">
                  🤝
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-gray-900 truncate">
                    {user.name}
                  </div>
                  <div className="text-[10px] text-gray-400 truncate">
                    {user.email}
                  </div>
                </div>
              </div>

              {onSignOut && (
                <button
                  onClick={onSignOut}
                  className="p-1.5 text-gray-400 hover:text-black transition-colors cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </aside>

        {/* ================================================================= */}
        {/* RIGHT CONTENT WORKSPACE                                           */}
        {/* ================================================================= */}
        <div className="flex-1 bg-[#FBFBFA] flex flex-col min-w-0 overflow-y-auto">
          
          {/* Top Bar matching reference */}
          <header className="px-6 sm:px-8 py-5 border-b border-gray-100 bg-white/70 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-0 z-30">
            <div>
              <div className="text-xl font-bold text-gray-900 tracking-tight">
                Receiver Dashboard
              </div>
              <div className="text-xs text-gray-400 mt-0.5">
                {user.org} · Saturday, 31 Oct 2026
              </div>
            </div>

            {/* Center Search Pill */}
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search food donors, locations, OTPs..."
                className="w-full bg-gray-50 rounded-full pl-10 pr-12 py-2 text-xs text-gray-900 outline-none border border-gray-200/80 focus:border-[#FF6422] focus:bg-white transition-all"
              />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 font-mono text-[10px] text-gray-400 bg-gray-200/60 px-1.5 py-0.5 rounded">
                ⌘F
              </span>
            </div>

            {/* Right Quick Controls */}
            <div className="flex items-center gap-3">
              {/* Stacked avatars */}
              <div className="hidden lg:flex items-center -space-x-2">
                <div className="h-7 w-7 rounded-full bg-blue-200 border-2 border-white flex items-center justify-center text-[10px] font-bold">
                  PS
                </div>
                <div className="h-7 w-7 rounded-full bg-amber-200 border-2 border-white flex items-center justify-center text-[10px] font-bold">
                  VM
                </div>
                <div className="h-7 w-7 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-[10px] text-gray-500 font-bold">
                  +
                </div>
              </div>

              {onSwitchRole && (
                <button
                  onClick={onSwitchRole}
                  className="rounded-full border border-orange-200 bg-orange-50 text-[#FF6422] hover:bg-orange-100 px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer inline-flex items-center gap-1.5"
                >
                  <ArrowLeftRight className="h-3 w-3" />
                  <span className="hidden sm:inline">Donor View</span>
                </button>
              )}

              <button
                onClick={onClose}
                className="rounded-full bg-gray-900 hover:bg-black text-white px-4 py-2 text-xs font-bold transition-all shadow-sm cursor-pointer"
              >
                ← Website
              </button>
            </div>
          </header>

          {/* Subheader Studio Bar */}
          <div className="px-6 sm:px-8 pt-6 pb-2">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-gray-100">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                    {activeMenu === 'live-map'
                      ? 'Live Incoming Food Transit & Telemetry'
                      : activeMenu === 'available'
                      ? 'Available Surplus Food Batches'
                      : activeMenu === 'collections'
                      ? 'Accepted Deliveries & Receipts'
                      : 'Food Redistribution Studio'}
                  </h1>
                  <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {activeMenu === 'live-map'
                    ? 'Track approaching temperature-controlled recovery vehicles in real-time with driver telemetry and digital OTP handover.'
                    : activeMenu === 'available'
                    ? 'Browse unserved hot and cold meals from certified restaurants and cloud kitchens across Jaipur.'
                    : 'Connect with certified institutional donors in Jaipur. Claim surplus batches, maintain cold/hot chain integrity, and deliver verified meals.'}
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                {activeMenu !== 'live-map' && (
                  <button
                    onClick={() => setActiveMenu('live-map')}
                    className="rounded-xl border border-orange-200 bg-orange-50 hover:bg-[#FF6422] hover:text-white text-[#FF6422] px-3.5 py-2 text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <Navigation className="h-3.5 w-3.5 rotate-45" />
                    <span>Open Live Map</span>
                  </button>
                )}

                <span className="font-mono text-xs text-blue-800 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-xl font-bold">
                  Single-Reservation Lock Active
                </span>
              </div>
            </div>

            {/* =============================================================== */}
            {/* VIEW 1: DEDICATED LIVE GPS FLEET MAP VIEW                       */}
            {/* =============================================================== */}
            {activeMenu === 'live-map' && (
              <div className="mt-6 mb-8 space-y-6 animate-in fade-in duration-200">
                {/* Active Incoming Delivery Selector Pills */}
                <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-xs flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-700">Track Incoming Food Van:</span>
                    <div className="flex flex-wrap items-center gap-2">
                      {acceptedBatches.map((b) => (
                        <button
                          key={b.id}
                          onClick={() => setTrackingBatchId(b.id)}
                          className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                            trackingBatchId === b.id
                              ? 'bg-[#FF6422] text-white shadow-sm'
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                          }`}
                        >
                          {b.id} • {b.donor}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-gray-500 font-mono">
                    <span className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      Cold-Chain Compliance: 100%
                    </span>
                  </div>
                </div>

                {/* Full Vector Interactive Map with Ola/Uber Style Animated Vehicle */}
                <VelaLiveDispatchMap
                  batchId={trackingBatchId}
                  donorName="Rajdhani Royal Heritage Kitchen"
                  donorAddress="MI Road, C-Scheme, Jaipur"
                  receiverName={user.org}
                  receiverAddress={user.city || 'Sector 4, Jawahar Nagar, Jaipur'}
                  foodDescription={acceptedBatches.find(b => b.id === trackingBatchId)?.item || '340 Meals • Hot Paneer & Basmati'}
                  temperature="64.5°C"
                  quantity={acceptedBatches.find(b => b.id === trackingBatchId)?.weight || '85 kg'}
                  fullWidth={true}
                />

                {/* 3 Relevant Option Output Sections for the Map View */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {/* Option Output 1: Delivery ETA & Timeline */}
                  <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-[#FF6422]" />
                        <span>Delivery Timeline</span>
                      </h4>
                      <span className="text-[10px] font-mono text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                        Approaching (~7 min)
                      </span>
                    </div>

                    <div className="space-y-4 text-xs">
                      <div className="flex items-start gap-3">
                        <div className="h-6 w-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                          ✓
                        </div>
                        <div>
                          <div className="font-bold text-gray-900">Food Dispatched from Donor</div>
                          <div className="text-gray-400 text-[11px]">Rajdhani Heritage Kitchen • 19:35</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="h-6 w-6 rounded-full bg-orange-100 text-[#FF6422] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5 animate-pulse">
                          ●
                        </div>
                        <div>
                          <div className="font-bold text-gray-900">EV Van On Route (JLN Marg)</div>
                          <div className="text-gray-400 text-[11px]">38 km/h current speed • 2.4 km left</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                          3
                        </div>
                        <div>
                          <div className="font-bold text-gray-900">Your Community Center Desk</div>
                          <div className="text-gray-400 text-[11px]">Ready your staff for intake inspection</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Option Output 2: Food Safety & Temperature Check */}
                  <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                        <Thermometer className="h-4 w-4 text-emerald-600" />
                        <span>Food Safety Audit</span>
                      </h4>
                      <span className="text-[10px] font-mono text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                        FSSAI Passed
                      </span>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-100">
                        <span className="text-gray-600">Compartment Temperature</span>
                        <span className="font-mono font-bold text-emerald-700 text-sm">64.2°C (&gt;60°C OK)</span>
                      </div>

                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 border border-gray-100">
                        <span className="text-gray-600">Packaging Integrity</span>
                        <span className="font-bold text-emerald-600">Food-Grade Sealed Containers</span>
                      </div>

                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 border border-gray-100">
                        <span className="text-gray-600">Calculated Meal Count</span>
                        <span className="font-mono font-bold text-gray-800">~240 Servings</span>
                      </div>
                    </div>
                  </div>

                  {/* Option Output 3: Handover OTP & Courier Verification */}
                  <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                        <Shield className="h-4 w-4 text-[#FF6422]" />
                        <span>Receipt Handover</span>
                      </h4>
                      <span className="text-[10px] font-mono text-gray-400">OTP Exchange</span>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-orange-50/60 border border-orange-100">
                        <span className="text-gray-600">Show this OTP to Driver:</span>
                        <span className="font-mono font-bold text-lg text-[#FF6422] tracking-widest">
                          {acceptedBatches.find(b => b.id === trackingBatchId)?.otp || '3617'}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-gray-600 pt-1">
                        <span>Courier Partner:</span>
                        <span className="font-bold text-gray-900">Rameshwar G. (★ 4.96)</span>
                      </div>

                      <div className="pt-2 flex gap-2">
                        <a
                          href="tel:+919829012345"
                          className="flex-1 py-2 rounded-xl bg-[#0D0D0C] text-white font-bold text-center hover:bg-gray-800 transition-colors"
                        >
                          Call Driver
                        </a>
                        <button
                          onClick={() => setActiveMenu('dashboard')}
                          className="px-3 py-2 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          Overview
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* =============================================================== */}
            {/* VIEW 2: RECEIVER DESK / DASHBOARD OVERVIEW                      */}
            {/* =============================================================== */}
            {activeMenu === 'dashboard' && (
              <>

            {/* =============================================================== */}
            {/* ROW 1: THREE TOP METRIC CARDS                                   */}
            {/* =============================================================== */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-6">
              
              {/* Card 1: Time Estimate Graph (Transit Window) - 6 cols */}
              <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-gray-100 shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm font-bold text-gray-900">
                    Pickup &amp; Delivery Window
                  </div>
                  <Clock className="h-4 w-4 text-gray-400" />
                </div>

                <div className="my-2">
                  <div className="relative w-full h-11 rounded-2xl overflow-hidden flex items-center bg-[#F3F4F6] border border-gray-100">
                    <div
                      className="h-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs px-4"
                      style={{ width: '58%' }}
                    >
                      58% Transit Elapsed
                    </div>
                    <div
                      className="h-full flex-1 flex items-center justify-center text-gray-400 text-[11px] font-mono"
                      style={{
                        backgroundImage: 'repeating-linear-gradient(45deg, #DBEAFE, #DBEAFE 6px, #EFF6FF 6px, #EFF6FF 12px)',
                      }}
                    >
                      2h 45m before expiry
                    </div>
                  </div>

                  <div className="flex items-center justify-between font-mono text-[10px] text-gray-400 mt-2 px-1">
                    <span>Batch Listed: 19:45</span>
                    <span className="font-semibold text-gray-700">Volunteer En Route</span>
                    <span>Deadline: 22:45</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Rescued Weight Received - 3 cols */}
              <div className="lg:col-span-3 bg-white rounded-3xl p-6 border border-gray-100 shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-700">Surplus Received</span>
                  <ArrowUpRight className="h-4 w-4 text-gray-400" />
                </div>

                <div className="flex items-end justify-between mt-3">
                  <div>
                    <div className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 mb-1">
                      ↗ 22%
                    </div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-mono tracking-tight">
                      436 kg
                    </div>
                    <div className="text-[10px] text-gray-400 mt-0.5">
                      weighed on arrival
                    </div>
                  </div>

                  <div className="flex items-end gap-1.5 h-14 pb-1">
                    <div className="w-2.5 h-6 rounded-t-sm bg-blue-100" />
                    <div className="w-2.5 h-9 rounded-t-sm bg-blue-300" />
                    <div className="w-2.5 h-11 rounded-t-sm bg-blue-600" />
                    <div className="w-2.5 h-14 rounded-t-sm bg-blue-800" />
                  </div>
                </div>
              </div>

              {/* Card 3: Shelter Meals Served - 3 cols */}
              <div className="lg:col-span-3 bg-white rounded-3xl p-6 border border-gray-100 shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-700">Shelter Meals</span>
                  <ArrowUpRight className="h-4 w-4 text-gray-400" />
                </div>

                <div className="flex items-end justify-between mt-3">
                  <div>
                    <div className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 mb-1">
                      ↗ 34%
                    </div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-mono tracking-tight">
                      1,247
                    </div>
                    <div className="text-[10px] text-gray-400 mt-0.5">
                      beneficiaries nourished
                    </div>
                  </div>

                  <div className="relative w-14 h-14 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-blue-100"
                        stroke="currentColor"
                        strokeWidth="3.8"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-blue-600"
                        strokeDasharray="92, 100"
                        stroke="currentColor"
                        strokeWidth="3.8"
                        strokeLinecap="round"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <span className="absolute text-[10px] font-mono font-bold text-gray-800">
                      92%
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* =============================================================== */}
            {/* ROW 2: MONTHLY RELIEF ANALYTICS & AVAILABLE FOOD QUEUE          */}
            {/* =============================================================== */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-6">
              
              {/* Left: Signature Dot-Matrix Relief Trends (7 cols) */}
              <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-gray-100 shadow-xs relative">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-base font-bold text-gray-900">
                      Monthly Relief Distribution History
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Verified portions served across Jaipur shelters &amp; schools
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1.5 rounded-xl border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                      <span>This year</span>
                      <ChevronDown className="h-3 w-3" />
                    </button>
                    <button className="p-1.5 rounded-xl border border-gray-200 text-gray-400 hover:text-black transition-colors">
                      <Calendar className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                <div className="relative pt-6 pb-2">
                  {tooltipMonth !== null && (
                    <div
                      className="absolute z-20 bg-[#16181B] text-white rounded-xl px-3.5 py-2 text-[10px] font-mono shadow-xl -translate-x-1/2 pointer-events-none transition-all duration-200"
                      style={{
                        left: `${(tooltipMonth / 11) * 82 + 10}%`,
                        top: '12px',
                      }}
                    >
                      <div className="flex items-center gap-2 font-medium">
                        <span className="h-2 w-2 rounded-full bg-[#FF6422]" />
                        <span>Completed: 91%</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400 mt-0.5">
                        <span className="h-2 w-2 rounded-full bg-blue-500" />
                        <span>In Route: 9%</span>
                      </div>
                    </div>
                  )}

                  <div className="flex items-end justify-between gap-1 sm:gap-2 h-56 px-2">
                    {MATRIX_DATA.map((col, idx) => {
                      const isHovered = tooltipMonth === idx;
                      return (
                        <div
                          key={idx}
                          onMouseEnter={() => setTooltipMonth(idx)}
                          className="flex-1 flex flex-col items-center justify-end gap-1.5 cursor-pointer group"
                        >
                          {Array.from({ length: col.hatch }).map((_, hIdx) => (
                            <div
                              key={`h-${hIdx}`}
                              className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border border-orange-300 opacity-60 transition-transform group-hover:scale-110"
                              style={{
                                backgroundImage: 'repeating-linear-gradient(45deg, #FF6422, #FF6422 1.5px, transparent 1.5px, transparent 3px)',
                              }}
                            />
                          ))}

                          {Array.from({ length: col.solid }).map((_, sIdx) => (
                            <div
                              key={`s-${sIdx}`}
                              className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full transition-transform group-hover:scale-110 ${
                                isHovered ? 'bg-[#E55518] shadow-sm' : 'bg-[#FF6422]'
                              }`}
                            />
                          ))}

                          <span
                            className={`font-mono text-[10px] mt-2 transition-colors ${
                              isHovered ? 'text-[#FF6422] font-bold' : 'text-gray-400'
                            }`}
                          >
                            {MONTHS[idx]}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right: Available Food Queue from verified kitchens (5 cols) */}
              <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-gray-100 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-bold text-gray-900">
                      Surplus Available Near You
                    </h3>
                    <span className="font-mono text-[10px] text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full font-bold">
                      {availableBatches.length} Batches
                    </span>
                  </div>

                  <div className="space-y-3 mt-3">
                    {availableBatches.map((b) => (
                      <div
                        key={b.id}
                        className={`rounded-2xl border p-3.5 transition-all ${
                          !b.canCollect
                            ? 'border-red-200 bg-red-50/20 opacity-80'
                            : 'border-gray-100 hover:border-blue-200 hover:bg-blue-50/20'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-[9px] font-bold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                                {b.id}
                              </span>
                              <span className="text-[10px] font-semibold text-gray-500">
                                {b.donor}
                              </span>
                            </div>
                            <div className="text-xs font-bold text-gray-900 mt-1 truncate">
                              {b.item}
                            </div>
                            <div className="flex items-center gap-3 mt-1.5 text-[10px] text-gray-500">
                              <span className="font-semibold text-gray-700">{b.weight}</span>
                              <span className={!b.tempOk ? 'text-red-600 font-bold' : ''}>
                                {b.temp} {!b.tempOk && '⚠️ Danger Zone'}
                              </span>
                              <span>{b.distance}</span>
                            </div>
                          </div>

                          <div className="shrink-0">
                            {!b.canCollect ? (
                              <span className="text-[10px] font-bold text-red-600 bg-red-100 px-2 py-1 rounded-lg">
                                Temp Blocked
                              </span>
                            ) : (
                              <button
                                onClick={() => handleClaim(b)}
                                disabled={claiming === b.id}
                                className="rounded-xl bg-[#FF6422] hover:bg-[#E55518] text-white text-[11px] font-bold px-3 py-1.5 cursor-pointer shadow-2xs transition-all hover:scale-105"
                              >
                                {claiming === b.id ? 'Claiming…' : 'Claim Batch'}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                  <span>FSSAI Certified Dispatch</span>
                  <span className="text-emerald-700 font-bold">100% Traceable</span>
                </div>
              </div>

            </div>

            {/* Live GPS Fleet Transit Quick Banner (Switch to Dedicated Live Map) */}
            <div className="bg-gradient-to-r from-orange-50 via-white to-orange-50/40 rounded-3xl p-5 border border-orange-200/60 shadow-xs mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="h-11 w-11 rounded-2xl bg-[#FF6422] text-white flex items-center justify-center font-bold shadow-sm shadow-orange-500/20 shrink-0">
                  <Navigation className="h-5 w-5 rotate-45" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-900">
                      Live Delivery En Route • Batch #{trackingBatchId}
                    </span>
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">
                    EV Van approaching from Rajdhani Heritage Kitchen • Holding Temp 64.2°C • ETA ~7 mins
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveMenu('live-map')}
                className="px-4 py-2 rounded-xl bg-[#FF6422] hover:bg-[#E55518] text-white text-xs font-bold transition-all shadow-xs inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap hover:scale-105"
              >
                <span>Open Live Map</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* =============================================================== */}
            {/* ROW 3: MY COLLECTIONS & OTP VERIFICATION TABLE                  */}
            {/* =============================================================== */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-100 shadow-xs mt-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-gray-900">
                    Active Collections &amp; Handover Receipts
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Exchange OTP with donor upon arrival and log final distribution portions
                  </p>
                </div>
                <MoreHorizontal className="h-4 w-4 text-gray-400 cursor-pointer" />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-gray-100 font-mono text-[10px] text-gray-400 uppercase">
                      <th className="py-3 px-3">Batch ID &amp; Item ↓</th>
                      <th className="py-3 px-3">Status ↓</th>
                      <th className="py-3 px-3">Pickup OTP ↓</th>
                      <th className="py-3 px-3">Weighed Distributed ↓</th>
                      <th className="py-3 px-3 text-right">Beneficiary Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {acceptedBatches.map((b) => (
                      <tr key={b.id} className="hover:bg-gray-50/80 transition-colors">
                        <td className="py-3.5 px-3">
                          <div className="font-bold text-gray-900">{b.item}</div>
                          <div className="font-mono text-[10px] text-gray-400 mt-0.5">
                            {b.id} · {b.donor} · {b.weight}
                          </div>
                        </td>

                        <td className="py-3.5 px-3">
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                              b.status === 'Completed'
                                ? 'bg-emerald-50 text-emerald-700'
                                : 'bg-orange-50 text-[#FF6422]'
                            }`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                b.status === 'Completed' ? 'bg-emerald-500' : 'bg-[#FF6422]'
                              }`}
                            />
                            {b.status}
                          </span>
                        </td>

                        <td className="py-3.5 px-3 font-mono text-xs font-bold text-blue-900 bg-blue-50/60 rounded-lg px-2 py-1 w-fit">
                          OTP: {b.otp}
                        </td>

                        <td className="py-3.5 px-3 font-mono text-xs font-bold text-emerald-700">
                          {b.distributed !== '—' ? `${b.distributed} (${b.meals})` : 'In transit'}
                        </td>

                        <td className="py-3.5 px-3 text-right">
                          <button
                            onClick={() => {
                              setTrackingBatchId(b.id);
                              setActiveMenu('live-map');
                            }}
                            className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[10px] font-bold font-mono transition-all cursor-pointer mr-2 ${
                              trackingBatchId === b.id
                                ? 'bg-[#FF6422] text-white shadow-xs'
                                : 'bg-orange-50 hover:bg-[#FF6422] hover:text-white text-[#FF6422]'
                            }`}
                            title="Track Incoming Delivery Van"
                          >
                            <Navigation className="h-2.5 w-2.5 rotate-45" />
                            <span>Track GPS</span>
                          </button>
                          {b.status === 'In Progress' ? (
                            <button
                              onClick={() => handleConfirmDistribution(b.id)}
                              className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 text-xs cursor-pointer shadow-2xs transition-all hover:scale-105"
                            >
                              Confirm Distribution
                            </button>
                          ) : (
                            <span className="font-mono text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg font-semibold">
                              ✓ Verified
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            </>
            )}

            {/* =============================================================== */}
            {/* VIEW 3: AVAILABLE SURPLUS FOOD BATCHES (available)              */}
            {/* =============================================================== */}
            {activeMenu === 'available' && (
              <div className="mt-6 mb-8 space-y-5 animate-in fade-in duration-200">
                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-100 shadow-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-base font-bold text-gray-900">
                        Available Surplus Batches for Collection
                      </h3>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Single-claim reservation active to avoid duplicate NGO dispatches under FSSAI 2019
                      </p>
                    </div>

                    <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-200">
                      {availableBatches.length} Verified Batches in Jaipur
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {availableBatches.map((b) => (
                      <div
                        key={b.id}
                        className="rounded-2xl border border-gray-100 p-5 bg-gray-50/50 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between text-xs font-mono text-gray-400 mb-2">
                            <span>{b.id}</span>
                            <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                              {b.distance}
                            </span>
                          </div>

                          <h4 className="text-sm font-bold text-gray-900">{b.item}</h4>
                          <p className="text-xs text-gray-500 mt-1">{b.donor} • {b.donorType}</p>

                          <div className="mt-4 flex items-center justify-between text-xs font-mono py-2 border-y border-gray-100">
                            <span className="font-bold text-gray-800">{b.weight} ({b.meals})</span>
                            <span className={`font-bold ${b.tempOk ? 'text-emerald-700' : 'text-amber-700'}`}>
                              {b.temp}
                            </span>
                          </div>
                        </div>

                        <div className="mt-4 pt-2">
                          <button
                            onClick={() => handleClaim(b)}
                            disabled={!b.canCollect || claiming === b.id}
                            className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs ${
                              claiming === b.id
                                ? 'bg-gray-200 text-gray-500'
                                : b.canCollect
                                ? 'bg-[#FF6422] hover:bg-[#E55518] text-white hover:scale-102'
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                          >
                            {claiming === b.id
                              ? 'Reserving Batch…'
                              : b.canCollect
                              ? 'Claim Food Batch'
                              : 'Window Expired'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
