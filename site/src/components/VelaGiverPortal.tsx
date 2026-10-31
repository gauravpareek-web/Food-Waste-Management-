import { useState } from 'react';
import {
  Search, Bell, Mail, Plus, Clock, TrendingUp, ChevronDown,
  Filter, MoreHorizontal, ArrowUpRight, CheckCircle2, AlertTriangle,
  ArrowLeft, ArrowLeftRight, LogOut, Sliders, Calendar, Share2,
  Package, Truck, Shield, Weight, Thermometer, User, Building, QrCode,
  Navigation, MapPin
} from 'lucide-react';
import { UserProfile, DEMO_DONOR_USER } from '../types';
import VelaLiveDispatchMap from './VelaLiveDispatchMap';

interface VelaGiverPortalProps {
  user?: UserProfile;
  onClose: () => void;
  onSwitchRole?: () => void;
  onSignOut?: () => void;
}

interface BatchItem {
  id: string;
  item: string;
  weight: string;
  temp: string;
  prepTime: string;
  deadline: string;
  status: 'Completed' | 'In Progress' | 'Pending';
  stage: number;
  receiver: string;
  location: string;
  distributed: string;
  meals: string;
  hash: string;
}

const INITIAL_BATCHES: BatchItem[] = [
  {
    id: 'VB-2024-0041',
    item: 'Dal Makhani + Tandoori Roti (80 portions)',
    weight: '28 kg',
    temp: '68°C',
    prepTime: '18:30',
    deadline: '21:30',
    status: 'Completed',
    stage: 5,
    receiver: 'Akshaya Aahar Foundation',
    location: 'C-Scheme, Jaipur',
    distributed: '26.5 kg',
    meals: '75 meals',
    hash: 'a3f9b2c1…',
  },
  {
    id: 'VB-2024-0042',
    item: 'Paneer Butter Masala + Jeera Rice',
    weight: '18 kg',
    temp: '65°C',
    prepTime: '19:00',
    deadline: '22:00',
    status: 'In Progress',
    stage: 3,
    receiver: 'Robin Hood Army Jaipur',
    location: 'Mansarovar, Jaipur',
    distributed: '—',
    meals: '—',
    hash: 'b71c3d8e…',
  },
  {
    id: 'VB-2024-0043',
    item: 'Vegetable Biryani with Boondi Raita',
    weight: '14 kg',
    temp: '64°C',
    prepTime: '19:45',
    deadline: '22:45',
    status: 'Pending',
    stage: 1,
    receiver: 'Awaiting Matching',
    location: 'Vaishali Nagar, Jaipur',
    distributed: '—',
    meals: '—',
    hash: 'c82a1d94…',
  },
  {
    id: 'VB-2024-0044',
    item: 'Aloo Gobi Matar + 50 Rotis',
    weight: '16 kg',
    temp: '67°C',
    prepTime: '20:15',
    deadline: '23:30',
    status: 'In Progress',
    stage: 2,
    receiver: 'Feeding India Jaipur Hub',
    location: 'Malviya Nagar, Jaipur',
    distributed: '—',
    meals: '—',
    hash: 'd49e1f82…',
  },
];

export default function VelaGiverPortal({
  user = DEMO_DONOR_USER,
  onClose,
  onSwitchRole,
  onSignOut,
}: VelaGiverPortalProps) {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [batches, setBatches] = useState<BatchItem[]>(INITIAL_BATCHES);
  const [partnerFilter, setPartnerFilter] = useState<'all' | 'completed' | 'pending'>('all');
  const [showNewBatchModal, setShowNewBatchModal] = useState(false);
  const [postForm, setPostForm] = useState({
    item: '', weight: '', temp: '', prepTime: '20:00', deadline: '23:30', plateLeftovers: false
  });
  const [tooltipMonth, setTooltipMonth] = useState<number | null>(4); // April selected by default
  const [trackingBatchId, setTrackingBatchId] = useState<string>('VB-2024-0042');

  const handlePostBatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (postForm.plateLeftovers || !postForm.item || !postForm.weight) return;

    const newId = `VB-2024-00${45 + batches.length}`;
    const weightNum = parseFloat(postForm.weight) || 16;
    const mealsNum = Math.round((weightNum * 1000) / 350);

    const newEntry: BatchItem = {
      id: newId,
      item: postForm.item,
      weight: `${postForm.weight} kg`,
      temp: `${postForm.temp || '66'}°C`,
      prepTime: postForm.prepTime,
      deadline: postForm.deadline,
      status: 'In Progress',
      stage: 1,
      receiver: 'Vela Auto-Dispatch Engine',
      location: 'Civil Lines, Jaipur',
      distributed: '—',
      meals: `~${mealsNum} meals`,
      hash: Math.random().toString(36).substring(2, 10) + '…',
    };

    setBatches([newEntry, ...batches]);
    setShowNewBatchModal(false);
    setPostForm({ item: '', weight: '', temp: '', prepTime: '20:00', deadline: '23:30', plateLeftovers: false });
  };

  // Dot matrix columns data for the analytics chart matching image
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const MATRIX_DATA = [
    { solid: 2, hatch: 1 },
    { solid: 4, hatch: 2 },
    { solid: 5, hatch: 2 },
    { solid: 8, hatch: 3 }, // Apr peak
    { solid: 3, hatch: 2 },
    { solid: 5, hatch: 2 },
    { solid: 4, hatch: 3 },
    { solid: 6, hatch: 2 },
    { solid: 7, hatch: 3 },
    { solid: 5, hatch: 2 },
    { solid: 4, hatch: 2 },
    { solid: 6, hatch: 3 },
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
                <div className="h-10 w-10 rounded-full bg-[#0D0D0C] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                  V
                </div>
                <div>
                  <div className="text-sm font-bold text-[#0D0D0C] tracking-tight leading-tight">
                    VelaHub
                  </div>
                  <div className="text-[10px] text-gray-400 font-medium">
                    Surplus FBO Cloud
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
                {/* Active Dashboard item matching orange pill */}
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
                    <span>Dashboard</span>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setActiveMenu('live-map');
                    document.getElementById('live-dispatch-map-section')?.scrollIntoView({ behavior: 'smooth' });
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
                  onClick={() => setActiveMenu('batches')}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-medium transition-all cursor-pointer ${
                    activeMenu === 'batches'
                      ? 'bg-[#FF6422] text-white'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Package className="h-4 w-4" />
                    <span>Surplus Batches</span>
                  </div>
                  <span className="text-[10px] bg-gray-100 text-gray-600 font-mono px-2 py-0.5 rounded-full font-bold">
                    {batches.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveMenu('kitchens')}
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-medium text-gray-600 hover:bg-gray-50 transition-all cursor-pointer"
                >
                  <Building className="h-4 w-4" />
                  <span>Kitchen Storage</span>
                </button>

                <button
                  onClick={() => setActiveMenu('estimates')}
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-medium text-gray-600 hover:bg-gray-50 transition-all cursor-pointer"
                >
                  <Weight className="h-4 w-4" />
                  <span>Calibrated Scales</span>
                </button>

                <button
                  onClick={() => setActiveMenu('manifests')}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-medium text-gray-600 hover:bg-gray-50 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Shield className="h-4 w-4" />
                    <span>FSSAI Form B</span>
                  </div>
                  <span className="text-[10px] bg-orange-100 text-[#FF6422] font-mono px-2 py-0.5 rounded-full font-bold">
                    100%
                  </span>
                </button>

                <button
                  onClick={() => setActiveMenu('schedule')}
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-medium text-gray-600 hover:bg-gray-50 transition-all cursor-pointer"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Pickup Schedule</span>
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
                <button
                  onClick={() => setActiveMenu('analytics')}
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-medium text-gray-600 hover:bg-gray-50 transition-all cursor-pointer"
                >
                  <TrendingUp className="h-4 w-4" />
                  <span>Analytics</span>
                </button>
                <button
                  onClick={() => setActiveMenu('telemetry')}
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-medium text-gray-600 hover:bg-gray-50 transition-all cursor-pointer"
                >
                  <Sliders className="h-4 w-4" />
                  <span>Thermal Telemetry</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Bottom Profile Bar matching reference image */}
          <div className="pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between p-2 rounded-2xl hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="h-9 w-9 rounded-xl bg-orange-100 border border-orange-200 flex items-center justify-center text-lg shrink-0">
                  👨‍🍳
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
                Dashboard
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
                placeholder="Search batches, OTPs, FSSAI hashes..."
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
                <div className="h-7 w-7 rounded-full bg-amber-200 border-2 border-white flex items-center justify-center text-[10px] font-bold">
                  SK
                </div>
                <div className="h-7 w-7 rounded-full bg-blue-200 border-2 border-white flex items-center justify-center text-[10px] font-bold">
                  PS
                </div>
                <div className="h-7 w-7 rounded-full bg-emerald-200 border-2 border-white flex items-center justify-center text-[10px] font-bold">
                  AK
                </div>
                <div className="h-7 w-7 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-[10px] text-gray-500 font-bold">
                  +
                </div>
              </div>

              {/* Action Buttons */}
              {onSwitchRole && (
                <button
                  onClick={onSwitchRole}
                  className="rounded-full border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer inline-flex items-center gap-1.5"
                >
                  <ArrowLeftRight className="h-3 w-3" />
                  <span className="hidden sm:inline">Receiver View</span>
                </button>
              )}

              <button
                onClick={() => setShowNewBatchModal(true)}
                className="rounded-full bg-[#FF6422] hover:bg-[#E55518] text-white px-4 py-2 text-xs font-bold transition-all shadow-sm cursor-pointer inline-flex items-center gap-1.5 hover:scale-105"
              >
                <span>+ Post Batch</span>
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
                      ? 'Live GPS Fleet Transit & Telemetry'
                      : activeMenu === 'batches'
                      ? 'Surplus Food Batches & Inventory'
                      : activeMenu === 'analytics'
                      ? 'Food Rescue Analytics & History'
                      : activeMenu === 'kitchens'
                      ? 'Commercial Kitchen Storage & Refrigeration'
                      : activeMenu === 'manifests'
                      ? 'FSSAI Form B Compliance & Logs'
                      : 'Surplus Dispatch Studio'}
                  </h1>
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {activeMenu === 'live-map'
                    ? 'Real-time vehicle movement tracking unserved surplus delivery from kitchen to certified receiver with live temperature audit.'
                    : activeMenu === 'batches'
                    ? 'Track unserved food inventory, batch expiration timelines, holding temperatures, and custody transfer receipts.'
                    : activeMenu === 'analytics'
                    ? 'Monthly kilograms rescued, hunger relief meal equivalents, and UNEP 2024 national food waste mitigation benchmarks.'
                    : 'Manage safe unserved food batches. Assign certified drivers, maintain holding temperatures, and record OTP custody handovers.'}
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

                <button
                  onClick={() => setShowNewBatchModal(true)}
                  className="rounded-xl bg-[#0D0D0C] text-white px-4 py-2 text-xs font-bold cursor-pointer hover:bg-gray-800 transition-colors inline-flex items-center gap-1.5 shadow-xs"
                >
                  <span>New Surplus</span>
                  <ChevronDown className="h-3 w-3" />
                </button>

                <button
                  onClick={onClose}
                  className="rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  ← Back to Web
                </button>
              </div>
            </div>

            {/* =============================================================== */}
            {/* VIEW 1: DEDICATED LIVE GPS FLEET MAP VIEW                       */}
            {/* =============================================================== */}
            {activeMenu === 'live-map' && (
              <div className="mt-6 mb-8 space-y-6 animate-in fade-in duration-200">
                {/* Active Batch Selector Pills */}
                <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-xs flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-700">Select Active Dispatch:</span>
                    <div className="flex flex-wrap items-center gap-2">
                      {batches.map((b) => (
                        <button
                          key={b.id}
                          onClick={() => setTrackingBatchId(b.id)}
                          className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                            trackingBatchId === b.id
                              ? 'bg-[#FF6422] text-white shadow-sm'
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                          }`}
                        >
                          {b.id} • {b.weight}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-gray-500 font-mono">
                    <span className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      GPS Satellite Lock: 99.8%
                    </span>
                  </div>
                </div>

                {/* Full Vector Interactive Map with Ola/Uber Style Animated Vehicle */}
                <VelaLiveDispatchMap
                  batchId={trackingBatchId}
                  donorName={user.org}
                  donorAddress={user.city || 'MI Road, C-Scheme, Jaipur'}
                  receiverName={batches.find(b => b.id === trackingBatchId)?.receiver || 'Akshaya Aahar Community Center'}
                  receiverAddress={batches.find(b => b.id === trackingBatchId)?.location || 'Sector 4, Jawahar Nagar, Jaipur'}
                  foodDescription={batches.find(b => b.id === trackingBatchId)?.item || '340 Meals • Shahi Paneer & Basmati'}
                  temperature={batches.find(b => b.id === trackingBatchId)?.temp || '64.5°C'}
                  quantity={batches.find(b => b.id === trackingBatchId)?.weight || '85 kg'}
                  fullWidth={true}
                />

                {/* 3 Relevant Option Output Sections for the Map View */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {/* Option Output 1: Transit Route Checkpoints */}
                  <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-[#FF6422]" />
                        <span>Route Milestones</span>
                      </h4>
                      <span className="text-[10px] font-mono text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                        On Schedule
                      </span>
                    </div>

                    <div className="space-y-4 text-xs">
                      <div className="flex items-start gap-3">
                        <div className="h-6 w-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                          ✓
                        </div>
                        <div>
                          <div className="font-bold text-gray-900">Rajdhani Heritage Kitchen</div>
                          <div className="text-gray-400 text-[11px]">Weighed, Inspected &gt;65°C • 19:35</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="h-6 w-6 rounded-full bg-orange-100 text-[#FF6422] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5 animate-pulse">
                          ●
                        </div>
                        <div>
                          <div className="font-bold text-gray-900">Statue Circle Transit Corridor</div>
                          <div className="text-gray-400 text-[11px]">Vehicle in transit • 38 km/h current</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="h-6 w-6 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                          3
                        </div>
                        <div>
                          <div className="font-bold text-gray-900">Akshaya Aahar Center (Jawahar Nagar)</div>
                          <div className="text-gray-400 text-[11px]">Arrival ETA: ~7 mins • Crew waiting</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Option Output 2: Cold-Chain Telemetry */}
                  <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                        <Thermometer className="h-4 w-4 text-emerald-600" />
                        <span>Thermal Telemetry</span>
                      </h4>
                      <span className="text-[10px] font-mono text-gray-400">Sensor #T-88</span>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-100">
                        <span className="text-gray-600">Compartment Temperature</span>
                        <span className="font-mono font-bold text-emerald-700 text-sm">64.2°C</span>
                      </div>

                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 border border-gray-100">
                        <span className="text-gray-600">Thermal Holding Status</span>
                        <span className="font-bold text-emerald-600">Safe (&gt;60°C Hot Hold)</span>
                      </div>

                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 border border-gray-100">
                        <span className="text-gray-600">EV Van Battery SOC</span>
                        <span className="font-mono font-bold text-gray-800">82% (48 km range)</span>
                      </div>
                    </div>
                  </div>

                  {/* Option Output 3: Driver & Handover Verification */}
                  <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                        <Shield className="h-4 w-4 text-[#FF6422]" />
                        <span>Custody Handover</span>
                      </h4>
                      <span className="text-[10px] font-mono text-gray-400">FSSAI Form B</span>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-orange-50/60 border border-orange-100">
                        <span className="text-gray-600">Digital Handover OTP:</span>
                        <span className="font-mono font-bold text-lg text-[#FF6422] tracking-widest">8 4 2 1</span>
                      </div>

                      <div className="flex items-center justify-between text-gray-600 pt-1">
                        <span>Courier Name:</span>
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
                          Dashboard View
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* =============================================================== */}
            {/* VIEW 2: MAIN DASHBOARD OVERVIEW (ConstructHub Default View)     */}
            {/* =============================================================== */}
            {activeMenu === 'dashboard' && (
              <>

            {/* =============================================================== */}
            {/* ROW 1: THREE TOP METRIC CARDS                                   */}
            {/* =============================================================== */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-6">
              
              {/* Card 1: Time Estimate Graph (Shelf-life consumption window) - 6 cols */}
              <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-gray-100 shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm font-bold text-gray-900">
                    Safe Consumption Time Estimate
                  </div>
                  <Clock className="h-4 w-4 text-gray-400" />
                </div>

                {/* Progress bar matching reference image with striped fill */}
                <div className="my-2">
                  <div className="relative w-full h-11 rounded-2xl overflow-hidden flex items-center bg-[#F3F4F6] border border-gray-100">
                    {/* Solid orange active portion */}
                    <div
                      className="h-full bg-[#FF6422] flex items-center justify-center text-white font-bold text-xs px-4"
                      style={{ width: '64%' }}
                    >
                      64% Safe Window
                    </div>
                    {/* Hatched remaining portion */}
                    <div
                      className="h-full flex-1 flex items-center justify-center text-gray-400 text-[11px] font-mono"
                      style={{
                        backgroundImage: 'repeating-linear-gradient(45deg, #FFE7DB, #FFE7DB 6px, #FFF2EC 6px, #FFF2EC 12px)',
                      }}
                    >
                      3h 15m remaining
                    </div>
                  </div>

                  <div className="flex items-center justify-between font-mono text-[10px] text-gray-400 mt-2 px-1">
                    <span>Prep Time: 19:00 Today</span>
                    <span className="font-semibold text-gray-700">Current Time</span>
                    <span>Deadline: 23:30 Today</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Active Sales -> Active Surplus Rescued - 3 cols */}
              <div className="lg:col-span-3 bg-white rounded-3xl p-6 border border-gray-100 shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-700">Rescued Weight</span>
                  <ArrowUpRight className="h-4 w-4 text-gray-400" />
                </div>

                <div className="flex items-end justify-between mt-3">
                  <div>
                    <div className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 mb-1">
                      ↗ 18%
                    </div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-mono tracking-tight">
                      428 kg
                    </div>
                    <div className="text-[10px] text-gray-400 mt-0.5">
                      vs last week
                    </div>
                  </div>

                  {/* Rising mini bars matching reference */}
                  <div className="flex items-end gap-1.5 h-14 pb-1">
                    <div className="w-2.5 h-6 rounded-t-sm bg-orange-100" />
                    <div className="w-2.5 h-8 rounded-t-sm bg-orange-300" />
                    <div className="w-2.5 h-11 rounded-t-sm bg-[#FF6422]" />
                    <div className="w-2.5 h-14 rounded-t-sm bg-[#E55518]" />
                  </div>
                </div>
              </div>

              {/* Card 3: Product Revenue -> Verified Meals Donated - 3 cols */}
              <div className="lg:col-span-3 bg-white rounded-3xl p-6 border border-gray-100 shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-700">Meals Rescued</span>
                  <ArrowUpRight className="h-4 w-4 text-gray-400" />
                </div>

                <div className="flex items-end justify-between mt-3">
                  <div>
                    <div className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 mb-1">
                      ↗ 26%
                    </div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-mono tracking-tight">
                      1,220
                    </div>
                    <div className="text-[10px] text-gray-400 mt-0.5">
                      verified distributed
                    </div>
                  </div>

                  {/* Donut percentage ring matching reference */}
                  <div className="relative w-14 h-14 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-orange-100"
                        stroke="currentColor"
                        strokeWidth="3.8"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-[#FF6422]"
                        strokeDasharray="86, 100"
                        stroke="currentColor"
                        strokeWidth="3.8"
                        strokeLinecap="round"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <span className="absolute text-[10px] font-mono font-bold text-gray-800">
                      86%
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* =============================================================== */}
            {/* ROW 2: ANALYTICS HISTORY (DOT MATRIX) & PROJECT HISTORY TABLE    */}
            {/* =============================================================== */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-6">
              
              {/* Left: Signature Dot-Matrix Analytics History Chart (7 cols) */}
              <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-gray-100 shadow-xs relative">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-base font-bold text-gray-900">
                      Surplus Recovery Analytics History
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Cumulative kilograms rescued vs safe unserved threshold
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

                {/* The Dot Matrix Chart */}
                <div className="relative pt-6 pb-2">
                  
                  {/* Floating Tooltip matching image over peak column */}
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
                        <span>Completed: 85%</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400 mt-0.5">
                        <span className="h-2 w-2 rounded-full bg-gray-500" />
                        <span>In Progress: 15%</span>
                      </div>
                    </div>
                  )}

                  {/* Dot Grid Columns */}
                  <div className="flex items-end justify-between gap-1 sm:gap-2 h-56 px-2">
                    {MATRIX_DATA.map((col, idx) => {
                      const isHovered = tooltipMonth === idx;
                      return (
                        <div
                          key={idx}
                          onMouseEnter={() => setTooltipMonth(idx)}
                          className="flex-1 flex flex-col items-center justify-end gap-1.5 cursor-pointer group"
                        >
                          {/* Hatched / Pending Circles */}
                          {Array.from({ length: col.hatch }).map((_, hIdx) => (
                            <div
                              key={`h-${hIdx}`}
                              className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border border-orange-300 opacity-60 transition-transform group-hover:scale-110"
                              style={{
                                backgroundImage: 'repeating-linear-gradient(45deg, #FF6422, #FF6422 1.5px, transparent 1.5px, transparent 3px)',
                              }}
                            />
                          ))}

                          {/* Solid Orange Completed Circles */}
                          {Array.from({ length: col.solid }).map((_, sIdx) => (
                            <div
                              key={`s-${sIdx}`}
                              className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full transition-transform group-hover:scale-110 ${
                                isHovered ? 'bg-[#E55518] shadow-sm' : 'bg-[#FF6422]'
                              }`}
                            />
                          ))}

                          {/* Month Label */}
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

              {/* Right: Partner Distribution Queue / Project History (5 cols) */}
              <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-gray-100 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-bold text-gray-900">
                      Partner History
                    </h3>

                    <div className="flex rounded-xl bg-gray-100 p-0.5 text-xs font-semibold">
                      <button
                        onClick={() => setPartnerFilter('completed')}
                        className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                          partnerFilter === 'completed' || partnerFilter === 'all'
                            ? 'bg-black text-white'
                            : 'text-gray-500 hover:text-black'
                        }`}
                      >
                        Completed
                      </button>
                      <button
                        onClick={() => setPartnerFilter('pending')}
                        className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                          partnerFilter === 'pending'
                            ? 'bg-black text-white'
                            : 'text-gray-500 hover:text-black'
                        }`}
                      >
                        Pending
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 text-[10px] font-mono text-gray-400 uppercase py-2 border-b border-gray-100">
                    <span className="col-span-6">Partner / Driver</span>
                    <span className="col-span-3">Location</span>
                    <span className="col-span-3 text-right">Batch</span>
                  </div>

                  {/* Partner Rows */}
                  <div className="divide-y divide-gray-50 mt-1">
                    {batches.map((b) => (
                      <div key={b.id} className="grid grid-cols-12 items-center py-2.5 text-xs">
                        <div className="col-span-6 flex items-center gap-2.5 min-w-0 pr-2">
                          <div className="h-7 w-7 rounded-full bg-orange-100 border border-orange-200 flex items-center justify-center text-xs font-bold text-orange-700 shrink-0">
                            {b.receiver.charAt(0)}
                          </div>
                          <div className="min-w-0">
                            <div className="font-bold text-gray-900 truncate">
                              {b.receiver}
                            </div>
                            <div className="text-[10px] text-gray-400 truncate">
                              {b.item}
                            </div>
                          </div>
                        </div>

                        <div className="col-span-3 text-[11px] text-gray-500 truncate">
                          {b.location}
                        </div>

                        <div className="col-span-3 text-right font-mono text-[11px] font-bold text-[#FF6422]">
                          {b.weight}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                  <span>Verified FSSAI Handover Protocol</span>
                  <span className="text-emerald-700 font-bold">100% On-Time</span>
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
                      Live GPS Transit Active • Batch #{trackingBatchId}
                    </span>
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">
                    EV Van #RJ-14-EA-4821 en route to Akshaya Aahar Community Center • 64.2°C Hot Hold Verified
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveMenu('live-map')}
                className="px-4 py-2 rounded-xl bg-[#FF6422] hover:bg-[#E55518] text-white text-xs font-bold transition-all shadow-xs inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap hover:scale-105"
              >
                <span>Open Live Fleet Map</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* =============================================================== */}
            {/* ROW 3: MY ASSIGNMENTS / LIVE SURPLUS BATCHES TABLE              */}
            {/* =============================================================== */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-100 shadow-xs mt-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-gray-900">
                    My Surplus Dispatches
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Real-time custody tracking with 4-digit OTP exchange
                  </p>
                </div>
                <MoreHorizontal className="h-4 w-4 text-gray-400 cursor-pointer" />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-gray-100 font-mono text-[10px] text-gray-400 uppercase">
                      <th className="py-3 px-3">Batch Name ↓</th>
                      <th className="py-3 px-3">Working Status ↓</th>
                      <th className="py-3 px-3">Holding Temp ↓</th>
                      <th className="py-3 px-3">Time Deadline ↓</th>
                      <th className="py-3 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {batches.map((b) => (
                      <tr key={b.id} className="hover:bg-gray-50/80 transition-colors">
                        <td className="py-3.5 px-3">
                          <div className="font-bold text-gray-900">{b.item}</div>
                          <div className="font-mono text-[10px] text-gray-400 mt-0.5">
                            {b.id} · {b.weight}
                          </div>
                        </td>

                        <td className="py-3.5 px-3">
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                              b.status === 'Completed'
                                ? 'bg-emerald-50 text-emerald-700'
                                : b.status === 'In Progress'
                                ? 'bg-orange-50 text-[#FF6422]'
                                : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                b.status === 'Completed'
                                  ? 'bg-emerald-500'
                                  : b.status === 'In Progress'
                                  ? 'bg-[#FF6422]'
                                  : 'bg-gray-400'
                              }`}
                            />
                            {b.status}
                          </span>
                        </td>

                        <td className="py-3.5 px-3 font-mono text-xs font-semibold text-gray-800">
                          {b.temp}
                        </td>

                        <td className="py-3.5 px-3 font-mono text-xs text-gray-500">
                          Consume by {b.deadline}
                        </td>

                        <td className="py-3.5 px-3 text-right">
                          <button
                            onClick={() => {
                              setTrackingBatchId(b.id);
                              setActiveMenu('live-map');
                            }}
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-[10px] font-bold font-mono transition-all cursor-pointer mr-1.5 ${
                              trackingBatchId === b.id
                                ? 'bg-[#FF6422] text-white shadow-xs'
                                : 'bg-orange-50 hover:bg-[#FF6422] hover:text-white text-[#FF6422]'
                            }`}
                            title="Track on Live GPS Map"
                          >
                            <Navigation className="h-2.5 w-2.5 rotate-45" />
                            <span>Track GPS</span>
                          </button>
                          <span className="font-mono text-[11px] text-gray-400 bg-gray-50 border border-gray-200 px-2 py-1 rounded-lg">
                            {b.hash}
                          </span>
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
            {/* VIEW 3: SURPLUS BATCHES & INVENTORY (batches)                   */}
            {/* =============================================================== */}
            {activeMenu === 'batches' && (
              <div className="mt-6 mb-8 space-y-5 animate-in fade-in duration-200">
                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-100 shadow-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-base font-bold text-gray-900">
                        All Surplus Batches & Inventory
                      </h3>
                      <p className="text-xs text-gray-400 mt-0.5">
                        FSSAI Form B registered surplus batches with temperature verification logs
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setShowNewBatchModal(true)}
                        className="rounded-xl bg-[#FF6422] text-white px-4 py-2 text-xs font-bold transition-all shadow-xs cursor-pointer inline-flex items-center gap-1.5 hover:scale-105"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        <span>Post Surplus Batch</span>
                      </button>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-gray-100 font-mono text-[10px] text-gray-400 uppercase">
                          <th className="py-3 px-3">Batch ID & Food Item</th>
                          <th className="py-3 px-3">Status</th>
                          <th className="py-3 px-3">Holding Temp</th>
                          <th className="py-3 px-3">Destination Partner</th>
                          <th className="py-3 px-3">Deadline</th>
                          <th className="py-3 px-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {batches.map((b) => (
                          <tr key={b.id} className="hover:bg-gray-50/80 transition-colors">
                            <td className="py-3.5 px-3">
                              <div className="font-bold text-gray-900">{b.item}</div>
                              <div className="font-mono text-[10px] text-gray-400 mt-0.5">
                                {b.id} · {b.weight} · {b.meals}
                              </div>
                            </td>
                            <td className="py-3.5 px-3">
                              <span
                                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                                  b.status === 'Completed'
                                    ? 'bg-emerald-50 text-emerald-700'
                                    : b.status === 'In Progress'
                                    ? 'bg-orange-50 text-[#FF6422]'
                                    : 'bg-gray-100 text-gray-700'
                                }`}
                              >
                                {b.status}
                              </span>
                            </td>
                            <td className="py-3.5 px-3 font-mono text-xs font-semibold text-gray-800">
                              {b.temp}
                            </td>
                            <td className="py-3.5 px-3">
                              <div className="font-bold text-gray-900">{b.receiver}</div>
                              <div className="text-[11px] text-gray-400">{b.location}</div>
                            </td>
                            <td className="py-3.5 px-3 font-mono text-xs text-gray-500">
                              {b.deadline}
                            </td>
                            <td className="py-3.5 px-3 text-right">
                              <button
                                onClick={() => {
                                  setTrackingBatchId(b.id);
                                  setActiveMenu('live-map');
                                }}
                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-orange-50 hover:bg-[#FF6422] hover:text-white text-[#FF6422] text-xs font-bold transition-all cursor-pointer mr-2"
                              >
                                <Navigation className="h-3 w-3 rotate-45" />
                                <span>Track on Map</span>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* =============================================================== */}
            {/* VIEW 4: ANALYTICS HISTORY (analytics)                           */}
            {/* =============================================================== */}
            {activeMenu === 'analytics' && (
              <div className="mt-6 mb-8 space-y-6 animate-in fade-in duration-200">
                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-100 shadow-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-base font-bold text-gray-900">
                        Surplus Recovery Analytics & History
                      </h3>
                      <p className="text-xs text-gray-400 mt-0.5">
                        12-Month dot matrix comparison of recovered unserved surplus vs safe window compliance
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                        1,240 kg Rescued (2024 YTD)
                      </span>
                    </div>
                  </div>

                  {/* Dot Grid Columns */}
                  <div className="flex items-end justify-between gap-1 sm:gap-2 h-64 px-2 pt-6 pb-2">
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
            )}

          </div>
        </div>

      </div>

      {/* ================================================================= */}
      {/* POPUP MODAL FOR NEW SURPLUS BATCH                                */}
      {/* ================================================================= */}
      {showNewBatchModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">
                + Create Food Surplus Batch
              </h3>
              <button
                onClick={() => setShowNewBatchModal(false)}
                className="p-1 rounded-full text-gray-400 hover:text-black cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handlePostBatch} className="space-y-4 mt-4">
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">
                  Food Item Description *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Shahi Paneer + 50 Rotis"
                  value={postForm.item}
                  onChange={(e) => setPostForm({ ...postForm, item: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-xs outline-none focus:border-[#FF6422]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Batch Weight (kg) *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 20"
                    value={postForm.weight}
                    onChange={(e) => setPostForm({ ...postForm, weight: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-xs outline-none focus:border-[#FF6422]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Holding Temp (°C) *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 67 (>60°C hot)"
                    value={postForm.temp}
                    onChange={(e) => setPostForm({ ...postForm, temp: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-xs outline-none focus:border-[#FF6422]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Cooking Finished *
                  </label>
                  <input
                    type="time"
                    required
                    value={postForm.prepTime}
                    onChange={(e) => setPostForm({ ...postForm, prepTime: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-xs outline-none focus:border-[#FF6422]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Consume Deadline *
                  </label>
                  <input
                    type="time"
                    required
                    value={postForm.deadline}
                    onChange={(e) => setPostForm({ ...postForm, deadline: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-xs outline-none focus:border-[#FF6422]"
                  />
                </div>
              </div>

              {/* FSSAI Plate leftovers guard */}
              <div className="rounded-xl border border-gray-200 p-3 bg-gray-50">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={postForm.plateLeftovers}
                    onChange={(e) => setPostForm({ ...postForm, plateLeftovers: e.target.checked })}
                    className="h-4 w-4"
                  />
                  <span className="text-xs font-medium text-gray-800">
                    Contains plate leftovers / served food
                  </span>
                </label>
                {postForm.plateLeftovers && (
                  <p className="text-[11px] text-red-600 mt-2 font-medium">
                    ⚠️ FSSAI 2019 Block: Served leftovers cannot be redistributed. Uncheck to proceed.
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={postForm.plateLeftovers}
                className="w-full py-3 rounded-full bg-[#FF6422] hover:bg-[#E55518] text-white font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-40 cursor-pointer shadow-md"
              >
                Sign &amp; Publish FSSAI Manifest
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
