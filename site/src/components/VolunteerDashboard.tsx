import { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  ClipboardList,
  Navigation,
  Package,
  BarChart3,
  Bell,
  Settings,
  Search,
  HelpCircle,
  MapPin,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  Leaf,
  Users,
  Store,
  Heart,
  Phone,
  Calendar,
  LogOut,
  ChevronRight,
  Plus,
  Minus,
  Trophy,
  Award,
  Check,
  X,
  ExternalLink,
  ChevronDown,
  Bike,
  Timer,
  Flame,
  Snowflake,
  Box,
  ShieldCheck,
  Play,
  Pause,
  RotateCcw,
  Key,
  Car,
  FileText,
  Download,
  Info,
  Utensils,
  AlertTriangle
} from 'lucide-react';
import { UserProfile } from '../types';

interface VolunteerDashboardProps {
  user?: UserProfile;
  onClose: () => void;
  onSwitchRole?: (role: 'restaurant' | 'ngo') => void;
  onSignOut?: () => void;
}

type TabType =
  | 'dashboard'
  | 'tasks'
  | 'tracking'
  | 'history'
  | 'impact'
  | 'notifications'
  | 'settings';

interface VolunteerTask {
  id: string;
  title: string;
  donor: string;
  distance: string;
  time: string;
  status: 'In Progress' | 'Scheduled' | 'Completed';
  category: string;
  image: string;
  pickupAddress: string;
  deliveryAddress: string;
  quantity: string;
  servings: string;
  recipientOrg: string;
  contactPhone: string;
  otpCode: string;
  prepTime: string;
  activeDuration: string;
  expiresAt: string;
  expiryHoursLeft: number;
  expiryPercent: number;
  totalShelfLifeHours: number;
  itemsList: string[];
  dietary: string[];
  allergens?: string;
  storage: string;
  storageTemp: string;
  packaging: string;
  description: string;
}

export default function VolunteerDashboard({
  user,
  onClose,
  onSwitchRole,
  onSignOut,
}: VolunteerDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTask, setSelectedTask] = useState<VolunteerTask | null>(null);
  const [showTaskDetailModal, setShowTaskDetailModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [mapZoom, setMapZoom] = useState(1);
  const [taskFilter, setTaskFilter] = useState<'All' | 'In Progress' | 'Scheduled' | 'Completed'>('All');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Dashboard Live Tracking & View Switcher State (Ola / Uber dispatch console)
  const [dashboardBottomTab, setDashboardBottomTab] = useState<'tracking' | 'tasks'>('tracking');
  const [trackingProgress, setTrackingProgress] = useState(0.38);
  const [isTrackingPlaying, setIsTrackingPlaying] = useState(true);
  const [trackingSpeed, setTrackingSpeed] = useState<1 | 2 | 4>(1);

  // Professional Impact Histogram Graph State
  const [impactHistogramMetric, setImpactHistogramMetric] = useState<'meals' | 'kg' | 'hours' | 'co2'>('meals');
  const [hoveredImpactIndex, setHoveredImpactIndex] = useState<number | null>(null);

  // Auto-advance Ola/Uber live vehicle along navigation path
  useEffect(() => {
    if (!isTrackingPlaying) return;
    const interval = setInterval(() => {
      setTrackingProgress((prev) => {
        const next = prev + 0.005 * trackingSpeed;
        return next >= 1 ? 0 : next;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [isTrackingPlaying, trackingSpeed]);

  // Route calculation along city grid waypoints (720x360 map canvas)
  const getCarCoords = (t: number) => {
    let x = 80;
    let y = 180;
    let angle = 0;

    if (t < 0.25) {
      const segT = t / 0.25;
      x = 80 + segT * (220 - 80);
      y = 180;
      angle = 0;
    } else if (t < 0.45) {
      const segT = (t - 0.25) / 0.2;
      x = 220;
      y = 180 - segT * (180 - 90);
      angle = -90;
    } else if (t < 0.75) {
      const segT = (t - 0.45) / 0.3;
      x = 220 + segT * (480 - 220);
      y = 90;
      angle = 0;
    } else if (t < 0.90) {
      const segT = (t - 0.75) / 0.15;
      x = 480;
      y = 90 + segT * (170 - 90);
      angle = 90;
    } else {
      const segT = (t - 0.90) / 0.1;
      x = 480 + segT * (640 - 480);
      y = 170;
      angle = 0;
    }
    return { x, y, angle };
  };

  const carCoords = getCarCoords(trackingProgress);
  const trackingPathD = "M 80,180 L 220,180 L 220,90 L 480,90 L 480,170 L 640,170";

  // 7-Day Volunteer Impact & Performance Dataset
  const volunteerImpactData = [
    { day: 'Mon', label: 'Monday, Oct 27', meals: 180, kg: 36, hours: 2.5, co2: 48, topDonor: 'Green Table' },
    { day: 'Tue', label: 'Tuesday, Oct 28', meals: 240, kg: 48, hours: 3.2, co2: 64, topDonor: 'Sunrise Kitchen' },
    { day: 'Wed', label: 'Wednesday, Oct 29', meals: 310, kg: 62, hours: 4.0, co2: 82, topDonor: 'Grand Hotel' },
    { day: 'Thu', label: 'Thursday, Oct 30', meals: 290, kg: 58, hours: 3.5, co2: 76, topDonor: 'City Bakery' },
    { day: 'Fri', label: 'Friday, Oct 31', meals: 380, kg: 76, hours: 4.8, co2: 102, topDonor: 'Campus Mess' },
    { day: 'Sat', label: 'Saturday, Nov 01', meals: 420, kg: 84, hours: 5.5, co2: 112, topDonor: 'Royal Caterers' },
    { day: 'Sun', label: 'Sunday, Nov 02', meals: 340, kg: 68, hours: 4.2, co2: 90, topDonor: 'Green Table' },
  ];

  // Active Volunteer Tasks with Full Food Specifications, Timers, and Expiry Tracking
  const [tasks, setTasks] = useState<VolunteerTask[]>([
    {
      id: 'TASK-101',
      title: 'Pick Up Rajma Masala & Steamed Jeera Basmati Rice',
      donor: 'The Green Table Restaurant',
      distance: '2.4 km',
      time: 'Today • 11:00 AM',
      status: 'In Progress',
      category: 'Curry / Cooked Meals',
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=400&q=80',
      pickupAddress: '125 Palm Street, West Palm Beach, FL',
      deliveryAddress: 'Hope Foundation Community Center, West Palm Beach, FL',
      quantity: '40 kg',
      servings: 'Feeds 50 people',
      recipientOrg: 'Hope Foundation',
      contactPhone: '+1 (561) 555-0192',
      otpCode: '5821',
      prepTime: 'Today, 09:30 AM',
      activeDuration: '1h 45m active',
      expiresAt: 'Today, 05:00 PM',
      expiryHoursLeft: 5.5,
      expiryPercent: 32,
      totalShelfLifeHours: 8,
      itemsList: [
        'Punjabi Rajma Masala (18 L)',
        'Steamed Jeera Basmati Rice (25 kg)',
        'Whole Wheat Phulkas (80 pcs)',
        'Pickled Spiced Salad'
      ],
      dietary: ['100% Vegetarian', 'FSSAI Certified Safe', 'Tamper-Evident Thermal Sealed'],
      allergens: 'None reported',
      storage: 'Hot Holding (>65°C)',
      storageTemp: '68.5°C Insulated Hot Pan',
      packaging: 'Thermal Stainless Insulated Containers',
      description: 'Slow-cooked authentic Punjabi rajma masala with aromatic jeera basmati rice, warm phulkas, and fresh salad packed in insulated thermal trays.'
    },
    {
      id: 'TASK-102',
      title: 'Collect Kesar Rasmalai & Gulab Jamun Sweet Trays',
      donor: 'Sunrise Sweets & Banquet',
      distance: '3.1 km',
      time: 'Today • 01:00 PM',
      status: 'Scheduled',
      category: 'Dairy / Dessert',
      image: 'https://images.unsplash.com/photo-1505253758473-96b3015f27eb?auto=format&fit=crop&w=400&q=80',
      pickupAddress: '88 Clematis St, West Palm Beach, FL',
      deliveryAddress: 'Palm Beach Senior Living Center, FL',
      quantity: '100 portions',
      servings: 'Feeds 60-70 people',
      recipientOrg: 'Senior Relief Program',
      contactPhone: '+1 (561) 555-0178',
      otpCode: '7419',
      prepTime: 'Today, 11:15 AM',
      activeDuration: '1h 15m active',
      expiresAt: 'Tomorrow, 12:00 PM',
      expiryHoursLeft: 23.0,
      expiryPercent: 18,
      totalShelfLifeHours: 28,
      itemsList: [
        'Kesar Pistachio Rasmalai (60 portions)',
        'Warm Gulab Jamun Trays (40 portions)',
        'Cardamom Pistachio Rabri'
      ],
      dietary: ['100% Vegetarian', 'Hot Holding Standard', 'FSSAI Safe'],
      allergens: 'Contains Dairy (Butter in Dal)',
      storage: 'Hot Holding (> 65°C)',
      storageTemp: '68°C Logged on Dispatch',
      packaging: 'Thermal Insulated Foil Boxes',
      description: 'Fresh hot cooked surplus meals from lunch buffet line, strictly unserved and unhandled by guests. Sealed in food-grade thermal containers.'
    },
    {
      id: 'TASK-103',
      title: 'Bakery Bread Baskets',
      donor: 'Palm Beach Bakery',
      distance: '4.0 km',
      time: 'Tomorrow • 10:00 AM',
      status: 'Scheduled',
      category: 'Bakery',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80',
      pickupAddress: '310 Royal Poinciana Way, Palm Beach, FL',
      deliveryAddress: 'West Palm Beach Youth Haven, FL',
      quantity: '10 boxes',
      servings: 'Feeds 50+ people',
      recipientOrg: 'Youth Haven Shelter',
      contactPhone: '+1 (561) 555-0143',
      otpCode: '3902',
      prepTime: 'Today, 07:00 AM',
      activeDuration: '4h 30m active',
      expiresAt: 'Tomorrow, 07:00 AM',
      expiryHoursLeft: 18.0,
      expiryPercent: 25,
      totalShelfLifeHours: 24,
      itemsList: [
        'Artisan Sourdough Batards',
        'Whole Wheat Baguettes',
        'Multigrain Dinner Rolls',
        'Brioche Buns'
      ],
      dietary: ['Eggless', 'Vegetarian', 'Dry Ambient Sealed'],
      allergens: 'Contains Gluten (Wheat)',
      storage: 'Ambient Dry Room Temp (22°C)',
      storageTemp: '21.5°C Dry Ambient',
      packaging: 'Food-Grade Kraft Paper Liners & Sealed Crates',
      description: 'Freshly baked artisanal loaves and dinner rolls baked early morning. Safe for ambient redistribution within 24 hours.'
    },
  ]);

  const handleCompleteTask = (taskId: string) => {
    setTasks(
      tasks.map((t) =>
        t.id === taskId ? { ...t, status: 'Completed' as const } : t
      )
    );
    setShowTaskDetailModal(false);
    setToastMessage('Awesome job! Food rescue delivery verified and completed.');
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="flex h-screen w-full bg-[#F4F6F4] text-[#1C1917] font-sans antialiased overflow-hidden selection:bg-[#F59E0B]/30">
      
      {/* ======================================================== */}
      {/* 1. LEFT SIDEBAR (Deep Forest Green #0A3F2F)               */}
      {/* ======================================================== */}
      <aside className="hidden md:flex flex-col w-64 lg:w-72 bg-[#0A3F2F] text-white flex-shrink-0 z-30 select-none shadow-xl border-r border-[#072F23]">
        
        {/* Brand Header */}
        <div className="h-20 px-6 flex items-center justify-between border-b border-emerald-900/60 bg-[#072F23]/60">
          <div 
            onClick={onClose}
            className="flex items-center gap-2 cursor-pointer group"
            title="Return to homepage"
          >
            <div className="w-8 h-8 rounded-full bg-[#F59E0B] flex items-center justify-center text-stone-950 font-black shadow-inner group-hover:scale-105 transition-transform">
              <Leaf className="w-4 h-4 fill-stone-950" />
            </div>
            <div>
              <h1 className="font-extrabold text-white text-sm tracking-wider uppercase leading-none">
                PALM BEACH
              </h1>
              <p className="font-black text-[#F59E0B] text-xs tracking-widest leading-tight">
                HARVEST
              </p>
            </div>
          </div>
        </div>

        {/* Volunteer Profile Card */}
        <div className="p-4 border-b border-emerald-900/40">
          <div className="bg-[#072F23] rounded-2xl p-3 border border-emerald-900/50 flex items-center gap-3 shadow-inner">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                alt="Rahul Sharma"
                className="w-11 h-11 rounded-full object-cover border-2 border-[#F59E0B] shadow-sm"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[#072F23]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <h4 className="font-bold text-xs text-white truncate">Rahul Sharma</h4>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400/20 flex-shrink-0" />
              </div>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="bg-emerald-500/25 text-emerald-300 text-[10px] px-2 py-0.5 rounded-full font-bold border border-emerald-500/30">
                  Volunteer
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Nav Items */}
        <nav className="flex-1 overflow-y-auto px-4 py-3 space-y-1 custom-scrollbar">
          {/* Dashboard */}
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'dashboard'
                ? 'bg-[#F59E0B] text-stone-950 font-bold shadow-md'
                : 'text-emerald-100/80 hover:bg-emerald-900/40 hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </button>

          {/* My Tasks */}
          <button
            onClick={() => setActiveTab('tasks')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'tasks'
                ? 'bg-[#F59E0B] text-stone-950 font-bold shadow-md'
                : 'text-emerald-100/80 hover:bg-emerald-900/40 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <ClipboardList className="w-4 h-4" />
              <span>My Tasks</span>
            </div>
            <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
              2
            </span>
          </button>

          {/* Live Tracking */}
          <button
            onClick={() => setActiveTab('tracking')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'tracking'
                ? 'bg-[#F59E0B] text-stone-950 font-bold shadow-md'
                : 'text-emerald-100/80 hover:bg-emerald-900/40 hover:text-white'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Live Tracking</span>
          </button>

          {/* Pickup History */}
          <button
            onClick={() => setActiveTab('history')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'history'
                ? 'bg-[#F59E0B] text-stone-950 font-bold shadow-md'
                : 'text-emerald-100/80 hover:bg-emerald-900/40 hover:text-white'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Pickup History</span>
          </button>

          {/* Impact Report */}
          <button
            onClick={() => setActiveTab('impact')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'impact'
                ? 'bg-[#F59E0B] text-stone-950 font-bold shadow-md'
                : 'text-emerald-100/80 hover:bg-emerald-900/40 hover:text-white'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Impact Report</span>
          </button>

          {/* Notifications */}
          <button
            onClick={() => setActiveTab('notifications')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'notifications'
                ? 'bg-[#F59E0B] text-stone-950 font-bold shadow-md'
                : 'text-emerald-100/80 hover:bg-emerald-900/40 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <Bell className="w-4 h-4" />
              <span>Notifications</span>
            </div>
            <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
              3
            </span>
          </button>

          {/* Settings */}
          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-[#F59E0B] text-stone-950 font-bold shadow-md'
                : 'text-emerald-100/80 hover:bg-emerald-900/40 hover:text-white'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>
        </nav>

        {/* Decorative Motto Card */}
        <div className="p-4 border-t border-emerald-900/40 bg-[#072F23]/60">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-900/60 to-emerald-950/80 p-3.5 border border-emerald-800/40">
            <div className="flex items-center gap-2 mb-1">
              <Leaf className="w-5 h-5 text-emerald-400" />
              <span className="font-serif italic font-bold text-white text-xs tracking-tight">Serve Today Greener Tomorrow</span>
            </div>
            <p className="text-[10px] text-emerald-200/70 leading-relaxed">
              Every pickup bridges the gap between surplus food and empty plates.
            </p>
          </div>

          {/* Role Switcher */}
          <div className="flex items-center gap-2 mt-3 pt-2 border-t border-emerald-900/30">
            {onSwitchRole && (
              <div className="flex-1 flex gap-1.5">
                <button
                  onClick={() => onSwitchRole('restaurant')}
                  className="flex-1 py-1.5 px-2 bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 rounded-lg text-[9px] font-semibold border border-emerald-800/60 transition-colors text-center cursor-pointer"
                  title="Switch to Restaurant Dashboard"
                >
                  Restaurant
                </button>
                <button
                  onClick={() => onSwitchRole('ngo')}
                  className="flex-1 py-1.5 px-2 bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 rounded-lg text-[9px] font-semibold border border-emerald-800/60 transition-colors text-center cursor-pointer"
                  title="Switch to NGO Dashboard"
                >
                  NGO
                </button>
              </div>
            )}
            {onSignOut && (
              <button
                onClick={onSignOut}
                className="flex items-center justify-center p-1.5 bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 rounded-lg border border-rose-900/50 transition-colors cursor-pointer"
                title="Sign Out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

      </aside>

      {/* ======================================================== */}
      {/* 2. MAIN CONTENT AREA                                      */}
      {/* ======================================================== */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Navbar */}
        <header className="h-20 bg-white border-b border-stone-200 px-4 sm:px-6 flex items-center justify-between gap-4 z-20 flex-shrink-0">
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="md:hidden p-2 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-100 cursor-pointer"
          >
            <LayoutDashboard className="w-5 h-5" />
          </button>

          {/* Search Input */}
          <div className="flex-1 max-w-xl relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search donations, restaurants, or locations..."
              className="w-full pl-11 pr-4 py-2.5 rounded-full bg-stone-100/90 border border-transparent focus:border-[#F59E0B] focus:bg-white text-xs text-stone-800 placeholder-stone-400 focus:outline-none transition-all shadow-inner"
            />
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Bell */}
            <button
              onClick={() => setActiveTab('notifications')}
              className="relative p-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer"
              title="3 Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[9px] font-black rounded-full flex items-center justify-center border-2 border-white">
                3
              </span>
            </button>

            {/* Help Question Icon */}
            <button
              onClick={() => setShowHelpModal(true)}
              className="p-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer"
              title="Help & Volunteer Helpline"
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            {/* Rahul Sharma Profile Snippet */}
            <div
              onClick={() => setActiveTab('settings')}
              className="flex items-center gap-2.5 pl-2 sm:pl-3 border-l border-stone-200 cursor-pointer group"
            >
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                alt="Rahul Sharma"
                className="w-9 h-9 rounded-full object-cover border-2 border-[#F59E0B] shadow-sm group-hover:scale-105 transition-transform"
              />
              <div className="hidden sm:block text-left">
                <div className="flex items-center gap-1">
                  <span className="font-bold text-xs text-stone-900 leading-tight">Rahul Sharma</span>
                  <ChevronDown className="w-3 h-3 text-stone-400" />
                </div>
                <div className="text-[10px] text-stone-500 font-medium">Volunteer</div>
              </div>
            </div>
          </div>
        </header>

        {/* Toast Alert */}
        {toastMessage && (
          <div className="bg-emerald-600 text-white px-6 py-2.5 flex items-center justify-between text-xs font-semibold animate-in slide-in-from-top duration-300 z-10 shadow-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-200" />
              <span>{toastMessage}</span>
            </div>
            <button onClick={() => setToastMessage(null)} className="text-emerald-200 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Scrollable Dashboard Body */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-7 space-y-6 custom-scrollbar bg-[#F4F6F4]">

          {/* ======================================================== */}
          {/* TAB 1: DASHBOARD (EXACT REPLICA OF USER UPLOADED DESIGN)  */}
          {/* ======================================================== */}
          {activeTab === 'dashboard' && (
            <>
              {/* Top Banner: Good Morning, Rahul! */}
              <div className="relative w-full rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-950 via-[#0A3F2F] to-emerald-900 shadow-xl border border-emerald-900/30">
                <div className="absolute inset-0 opacity-45 mix-blend-overlay">
                  <img
                    src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1600&q=80"
                    alt="Volunteer sharing meals"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="relative z-10 p-6 sm:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div className="max-w-2xl space-y-2">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
                      Good Morning, Rahul!
                      <span className="inline-block animate-bounce">👋</span>
                    </h2>
                    <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-xl">
                      Your efforts help reduce food waste and feed those in need.
                    </p>
                    <div className="pt-2">
                      <button
                        onClick={() => setActiveTab('impact')}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#072F23] hover:bg-black text-white text-xs font-bold shadow-md hover:scale-105 transition-all border border-emerald-500/30 cursor-pointer"
                      >
                        <span>View Your Impact</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#F59E0B]" />
                      </button>
                    </div>
                  </div>

                  {/* Right Header Badge */}
                  <div className="hidden lg:flex items-center gap-3 bg-[#072F23]/80 backdrop-blur-md px-5 py-3.5 rounded-2xl border border-emerald-700/40">
                    <div className="w-10 h-10 rounded-full bg-emerald-600/30 border border-emerald-400 flex items-center justify-center text-emerald-300">
                      <Leaf className="w-5 h-5 fill-emerald-400 text-emerald-400" />
                    </div>
                    <div className="text-white text-left">
                      <h4 className="font-extrabold text-xs tracking-tight">Together</h4>
                      <p className="font-bold text-xs text-[#F59E0B]">We Make a Difference</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4 KPI Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                
                {/* 1. Assigned Tasks */}
                <div className="bg-white rounded-3xl p-5 border border-stone-200/80 shadow-sm relative overflow-hidden group">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200/60 flex items-center justify-center text-emerald-600">
                      <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
                    </div>
                    {/* Watermark calendar icon */}
                    <Calendar className="w-10 h-10 text-stone-100 absolute right-4 top-4 pointer-events-none" />
                  </div>
                  <div className="mt-4">
                    <div className="text-3xl font-black text-stone-900 tracking-tight">8</div>
                    <div className="text-xs font-bold text-stone-800 mt-0.5">Assigned Tasks</div>
                    <div className="text-[11px] font-semibold text-emerald-600 mt-1">Active tasks</div>
                  </div>
                </div>

                {/* 2. Food Picked Up */}
                <div className="bg-white rounded-3xl p-5 border border-stone-200/80 shadow-sm relative overflow-hidden group">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200/60 flex items-center justify-center text-[#F59E0B]">
                      <Package className="w-6 h-6" />
                    </div>
                    <Package className="w-10 h-10 text-stone-100 absolute right-4 top-4 pointer-events-none" />
                  </div>
                  <div className="mt-4">
                    <div className="text-3xl font-black text-stone-900 tracking-tight">245 kg</div>
                    <div className="text-xs font-bold text-stone-800 mt-0.5">Food Picked Up</div>
                    <div className="text-[11px] font-semibold text-stone-400 mt-1">This Month</div>
                  </div>
                </div>

                {/* 3. People Helped */}
                <div className="bg-white rounded-3xl p-5 border border-stone-200/80 shadow-sm relative overflow-hidden group">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200/60 flex items-center justify-center text-teal-600">
                      <Users className="w-6 h-6" />
                    </div>
                    <Users className="w-10 h-10 text-stone-100 absolute right-4 top-4 pointer-events-none" />
                  </div>
                  <div className="mt-4">
                    <div className="text-3xl font-black text-stone-900 tracking-tight">1,200</div>
                    <div className="text-xs font-bold text-stone-800 mt-0.5">People Helped</div>
                    <div className="text-[11px] font-semibold text-stone-400 mt-1">This Month</div>
                  </div>
                </div>

                {/* 4. CO2 Avoided */}
                <div className="bg-white rounded-3xl p-5 border border-stone-200/80 shadow-sm relative overflow-hidden group">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200/60 flex items-center justify-center text-purple-600">
                      <Leaf className="w-6 h-6" />
                    </div>
                    <Leaf className="w-10 h-10 text-stone-100 absolute right-4 top-4 pointer-events-none" />
                  </div>
                  <div className="mt-4">
                    <div className="text-3xl font-black text-stone-900 tracking-tight">320 kg</div>
                    <div className="text-xs font-bold text-stone-800 mt-0.5">CO₂ Avoided</div>
                    <div className="text-[11px] font-semibold text-stone-400 mt-1">This Month</div>
                  </div>
                </div>

              </div>

              {/* ======================================================== */}
              {/* ROW 1: OLA/UBER LIVE DISPATCH CONSOLE & IMPACT HISTOGRAM  */}
              {/* ======================================================== */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* Left Column (lg:col-span-7): Real-time Ola/Uber GPS Live Tracking & Tasks Console */}
                <div className="lg:col-span-7 bg-white rounded-3xl p-5 sm:p-6 border border-stone-200/80 shadow-sm space-y-4 flex flex-col justify-between">
                  
                  {/* Header with Switcher Tabs */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                        <Car className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-extrabold text-stone-900 text-sm sm:text-base">
                            Ola / Uber Live Volunteer Dispatch
                          </h3>
                          <span className="flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[9px] font-black uppercase px-2 py-0.5 rounded-full border border-emerald-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping" />
                            Live Route
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-500 font-medium">
                          Active volunteer GPS navigation &amp; surplus food handover console
                        </p>
                      </div>
                    </div>

                    {/* View Switcher Toggle */}
                    <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl self-start sm:self-auto text-xs font-bold">
                      <button
                        onClick={() => setDashboardBottomTab('tracking')}
                        className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                          dashboardBottomTab === 'tracking'
                            ? 'bg-[#0A3F2F] text-white shadow-xs'
                            : 'text-stone-600 hover:text-stone-900'
                        }`}
                      >
                        <Navigation className="w-3.5 h-3.5" />
                        <span>Live Route</span>
                      </button>
                      <button
                        onClick={() => setDashboardBottomTab('tasks')}
                        className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                          dashboardBottomTab === 'tasks'
                            ? 'bg-[#0A3F2F] text-white shadow-xs'
                            : 'text-stone-600 hover:text-stone-900'
                        }`}
                      >
                        <ClipboardList className="w-3.5 h-3.5" />
                        <span>Tasks ({tasks.length})</span>
                      </button>
                    </div>
                  </div>

                  {/* TAB A: REAL OLA/UBER LIVE TRACKING CONSOLE */}
                  {dashboardBottomTab === 'tracking' ? (
                    <div className="space-y-4">
                      
                      {/* 1. Ola/Uber Driver & Vehicle Banner */}
                      <div className="bg-gradient-to-r from-stone-900 via-[#1C1917] to-stone-900 text-white rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md border border-stone-800">
                        <div className="flex items-center gap-3.5">
                          <div className="relative">
                            <img
                              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                              alt="Rahul Sharma"
                              className="w-13 h-13 rounded-2xl object-cover border-2 border-[#F59E0B] shadow-md"
                            />
                            <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-stone-950 font-black text-[9px] px-1.5 py-0.2 rounded-full border border-stone-900">
                              ⭐ 4.96
                            </span>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-extrabold text-sm text-white">Rahul Sharma</h4>
                              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                                Active Volunteer
                              </span>
                            </div>
                            <p className="text-xs text-stone-300 mt-0.5 font-medium">
                              White Mahindra Bolero EV Cargo • <span className="font-mono text-amber-300">DL 01 AB 4092</span>
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[10px] text-stone-400">Insulated Cargo: 3.2°C logged</span>
                              <span className="text-[10px] text-emerald-400 font-bold">• 184 Deliveries</span>
                            </div>
                          </div>
                        </div>

                        {/* Handover OTP Pin & ETA (Ola/Uber Driver Display) */}
                        <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-800">
                          <div className="bg-[#F59E0B] text-stone-950 px-3 py-1.5 rounded-xl font-black text-xs shadow flex items-center gap-1.5">
                            <Key className="w-3.5 h-3.5 text-stone-950" />
                            <span>HANDOVER OTP: 5821</span>
                          </div>
                          <div className="text-[11px] text-stone-300 mt-1.5 font-semibold text-right">
                            ETA: <span className="text-white font-bold font-mono">
                              {Math.max(1, Math.round((1 - trackingProgress) * 12))} mins
                            </span> ({((1 - trackingProgress) * 3.8).toFixed(1)} km)
                          </div>
                        </div>
                      </div>

                      {/* 2. Turn-by-Turn In-Ride HUD (Navigation bar) */}
                      <div className="bg-[#0A3F2F] text-white rounded-xl px-4 py-2.5 flex items-center justify-between shadow-sm">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-emerald-500 text-stone-950 flex items-center justify-center font-black">
                            <Navigation className="w-4 h-4 fill-stone-950" />
                          </div>
                          <span className="font-bold text-xs truncate max-w-xs sm:max-w-md">
                            {trackingProgress < 0.25
                              ? 'Head East on Palm St toward Clematis St (350m)'
                              : trackingProgress < 0.55
                              ? 'In 180m, turn left onto Palm Beach Blvd'
                              : trackingProgress < 0.85
                              ? 'Continue straight past Royal Poinciana Way (1.2 km)'
                              : 'Arriving at Hope Foundation Shelter on your right'}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-xs font-mono shrink-0">
                          <span className="text-emerald-200">
                            Speed: <span className="font-bold text-white">{isTrackingPlaying ? Math.round(32 + Math.sin(trackingProgress * 16) * 4) : 0} km/h</span>
                          </span>
                        </div>
                      </div>

                      {/* 3. Interactive Animated Vector GPS Map */}
                      <div className="w-full h-64 sm:h-72 rounded-2xl overflow-hidden border border-stone-200 bg-[#E8ECE8] relative shadow-inner">
                        <svg className="w-full h-full" viewBox="0 0 720 360" preserveAspectRatio="xMidYMid slice">
                          <defs>
                            <linearGradient id="volRoadGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#059669" />
                              <stop offset="100%" stopColor="#10B981" />
                            </linearGradient>
                            <filter id="volShadow" x="-20%" y="-20%" width="140%" height="140%">
                              <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.25" />
                            </filter>
                          </defs>

                          {/* Background Map Land */}
                          <rect width="720" height="360" fill="#E4EAE4" />

                          {/* Water Lagoon */}
                          <path d="M 0,280 Q 240,260 400,310 T 720,290 L 720,360 L 0,360 Z" fill="#CBE1ED" />
                          <text x="560" y="330" fill="#6B9CB7" fontSize="11" fontWeight="bold">LAKE WORTH LAGOON</text>

                          {/* City Park */}
                          <rect x="230" y="110" width="140" height="100" rx="14" fill="#D3E4D1" />
                          <text x="250" y="165" fill="#5F885D" fontSize="10" fontWeight="bold">PALM MEMORIAL PARK</text>

                          {/* City Grid City Blocks */}
                          <rect x="30" y="20" width="130" height="130" rx="8" fill="#D8DFD8" />
                          <rect x="30" y="210" width="130" height="50" rx="8" fill="#D8DFD8" />
                          <rect x="230" y="20" width="140" height="60" rx="8" fill="#D8DFD8" />
                          <rect x="430" y="20" width="120" height="70" rx="8" fill="#D8DFD8" />
                          <rect x="430" y="120" width="100" height="90" rx="8" fill="#D8DFD8" />
                          <rect x="610" y="20" width="90" height="70" rx="8" fill="#D8DFD8" />
                          <rect x="610" y="160" width="90" height="90" rx="8" fill="#D8DFD8" />

                          {/* Streets */}
                          <line x1="0" y1="50" x2="720" y2="50" stroke="#FFFFFF" strokeWidth="6" />
                          <line x1="0" y1="210" x2="720" y2="210" stroke="#FFFFFF" strokeWidth="6" />
                          <line x1="180" y1="0" x2="180" y2="280" stroke="#FFFFFF" strokeWidth="6" />

                          {/* Active Navigation Route Path */}
                          <path
                            d={trackingPathD}
                            fill="none"
                            stroke="#10B981"
                            strokeWidth="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            opacity="0.9"
                          />
                          <path
                            d={trackingPathD}
                            fill="none"
                            stroke="#FFFFFF"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeDasharray="6 6"
                          />

                          {/* Pickup Marker (Green Table Restaurant) */}
                          <g transform="translate(80, 180)">
                            <circle r="16" fill="#F59E0B" opacity="0.3" className="animate-ping" />
                            <circle r="10" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="3" />
                            <text x="0" y="-16" textAnchor="middle" fill="#1C1917" fontSize="10" fontWeight="900">
                              PICKUP: GREEN TABLE
                            </text>
                          </g>

                          {/* Dropoff Marker (Hope Foundation) */}
                          <g transform="translate(640, 170)">
                            <circle r="12" fill="#0A3F2F" stroke="#FFFFFF" strokeWidth="3" />
                            <text x="0" y="-16" textAnchor="middle" fill="#0A3F2F" fontSize="10" fontWeight="900">
                              DROPOFF: HOPE FOUNDATION
                            </text>
                          </g>

                          {/* Moving Animated Vehicle (Volunteer Scooter / EV Cargo) */}
                          <g
                            transform={`translate(${carCoords.x}, ${carCoords.y}) rotate(${carCoords.angle})`}
                            filter="url(#volShadow)"
                          >
                            <circle r="18" fill="#10B981" opacity="0.2" className="animate-pulse" />
                            <rect x="-14" y="-8" width="28" height="16" rx="4" fill="#0A3F2F" stroke="#FFFFFF" strokeWidth="2" />
                            <rect x="5" y="-5" width="4" height="10" rx="1" fill="#F59E0B" />
                            <circle cx="9" cy="-8" r="2" fill="#FDE047" />
                            <circle cx="9" cy="8" r="2" fill="#FDE047" />
                          </g>
                        </svg>

                        {/* Live Controls Bar on bottom */}
                        <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md rounded-xl p-2.5 shadow-md border border-stone-200 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setIsTrackingPlaying(!isTrackingPlaying)}
                              className="p-1.5 rounded-lg bg-[#0A3F2F] text-white hover:bg-black font-bold cursor-pointer"
                            >
                              {isTrackingPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                            </button>
                            <button
                              onClick={() => {
                                setTrackingProgress(0);
                                setIsTrackingPlaying(true);
                              }}
                              className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 cursor-pointer"
                              title="Reset Route"
                            >
                              <RotateCcw className="w-3.5 h-3.5" />
                            </button>
                            <span className="text-[11px] font-bold text-stone-700">
                              Trip Progress: {Math.round(trackingProgress * 100)}%
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] text-stone-400 font-semibold uppercase">Speed:</span>
                            {([1, 2, 4] as const).map((spd) => (
                              <button
                                key={spd}
                                onClick={() => setTrackingSpeed(spd)}
                                className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer ${
                                  trackingSpeed === spd
                                    ? 'bg-[#F59E0B] text-stone-950 font-black'
                                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                                }`}
                              >
                                {spd}x
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Cargo Specs Under Route */}
                      <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 text-xs flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Utensils className="w-4 h-4 text-emerald-600" />
                          <span className="font-bold text-stone-800">Rajma Masala &amp; Steamed Jeera Rice • 40 kg (Feeds 50)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <a
                            href="tel:+15615550192"
                            className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold text-xs"
                          >
                            <Phone className="w-3 h-3" />
                            <span>Call Kitchen</span>
                          </a>
                          <button
                            onClick={() => {
                              setSelectedTask(tasks[0]);
                              setShowTaskDetailModal(true);
                            }}
                            className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[#0A3F2F] text-white hover:bg-stone-900 font-bold text-xs cursor-pointer"
                          >
                            <span>Verify Handover</span>
                            <ArrowRight className="w-3 h-3 text-[#F59E0B]" />
                          </button>
                        </div>
                      </div>

                    </div>
                  ) : (
                    /* TAB B: ASSIGNED TASKS QUICK TABLE */
                    <div className="space-y-3">
                      {tasks.map((task) => (
                        <div
                          key={task.id}
                          onClick={() => {
                            setSelectedTask(task);
                            setShowTaskDetailModal(true);
                          }}
                          className="p-3.5 rounded-2xl border border-stone-200/80 hover:border-emerald-500/50 hover:bg-emerald-50/20 transition-all flex items-center justify-between gap-3 cursor-pointer group"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <img
                              src={task.image}
                              alt={task.title}
                              className="w-12 h-12 rounded-xl object-cover shrink-0 shadow-xs"
                            />
                            <div className="min-w-0">
                              <h4 className="font-extrabold text-xs text-stone-900 group-hover:text-emerald-900 transition-colors truncate">
                                {task.title}
                              </h4>
                              <p className="text-[11px] text-stone-500 font-medium truncate">
                                {task.donor} ➔ {task.recipientOrg}
                              </p>
                              <div className="flex items-center gap-2 mt-0.5 text-[10px]">
                                <span className="bg-stone-100 px-2 py-0.2 rounded font-bold text-stone-800">{task.quantity}</span>
                                <span className="text-emerald-700 font-bold flex items-center gap-0.5">
                                  <Clock className="w-2.5 h-2.5" />
                                  {task.activeDuration}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col items-end gap-1.5 shrink-0">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              task.status === 'In Progress'
                                ? 'bg-amber-100 text-amber-800'
                                : task.status === 'Completed'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {task.status}
                            </span>
                            <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/80">
                              Exp: {task.expiryHoursLeft}h left
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                </div>

                {/* Right Column (lg:col-span-5): Professional Volunteer Impact & Performance Histogram Report */}
                <div className="lg:col-span-5 bg-white rounded-3xl p-5 sm:p-6 border border-stone-200/80 shadow-sm space-y-4 flex flex-col justify-between">
                  
                  {/* Header & Metrics Switcher */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-xl bg-[#F59E0B] text-stone-950 flex items-center justify-center">
                          <BarChart3 className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="font-extrabold text-stone-900 text-sm sm:text-base">
                            Volunteer Impact Report
                          </h3>
                          <p className="text-[11px] text-stone-500 font-medium">
                            Weekly rescue volume &amp; active transit hours
                          </p>
                        </div>
                      </div>

                      <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full">
                        +28.4% this week
                      </span>
                    </div>

                    {/* Metric Switcher Tabs */}
                    <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl text-[11px] font-bold">
                      <button
                        onClick={() => setImpactHistogramMetric('meals')}
                        className={`flex-1 py-1 rounded-lg transition-all cursor-pointer text-center ${
                          impactHistogramMetric === 'meals'
                            ? 'bg-[#0A3F2F] text-white shadow-xs'
                            : 'text-stone-600 hover:text-stone-900'
                        }`}
                      >
                        Meals
                      </button>
                      <button
                        onClick={() => setImpactHistogramMetric('kg')}
                        className={`flex-1 py-1 rounded-lg transition-all cursor-pointer text-center ${
                          impactHistogramMetric === 'kg'
                            ? 'bg-[#0A3F2F] text-white shadow-xs'
                            : 'text-stone-600 hover:text-stone-900'
                        }`}
                      >
                        Weight (kg)
                      </button>
                      <button
                        onClick={() => setImpactHistogramMetric('hours')}
                        className={`flex-1 py-1 rounded-lg transition-all cursor-pointer text-center ${
                          impactHistogramMetric === 'hours'
                            ? 'bg-[#0A3F2F] text-white shadow-xs'
                            : 'text-stone-600 hover:text-stone-900'
                        }`}
                      >
                        Hours
                      </button>
                      <button
                        onClick={() => setImpactHistogramMetric('co2')}
                        className={`flex-1 py-1 rounded-lg transition-all cursor-pointer text-center ${
                          impactHistogramMetric === 'co2'
                            ? 'bg-[#0A3F2F] text-white shadow-xs'
                            : 'text-stone-600 hover:text-stone-900'
                        }`}
                      >
                        CO₂ Offset
                      </button>
                    </div>
                  </div>

                  {/* PROFESSIONAL SVG / HTML HISTOGRAM CANVAS */}
                  <div className="relative pt-4 pb-2 bg-gradient-to-b from-stone-50/80 to-stone-100/40 rounded-2xl p-4 border border-stone-200/80">
                    
                    {/* Target Benchmark Line (e.g. 300 meals or 4 hours) */}
                    <div className="absolute left-9 right-4 top-[38%] border-b border-dashed border-[#F59E0B] z-10 flex items-center justify-end pointer-events-none">
                      <span className="text-[9px] font-mono font-black text-amber-800 bg-amber-100 px-1.5 py-0.2 rounded -mt-4 border border-amber-300">
                        Daily Benchmark: {impactHistogramMetric === 'meals' ? '300 Meals' : impactHistogramMetric === 'kg' ? '60 kg' : impactHistogramMetric === 'hours' ? '4.0 Hours' : '80 kg CO₂'}
                      </span>
                    </div>

                    {/* Histogram Grid & Bars */}
                    <div className="h-52 flex items-end justify-between gap-2 sm:gap-3 pl-8 pr-2 relative">
                      
                      {/* Y-Axis Gridlines & Labels */}
                      <div className="absolute left-1 top-0 bottom-6 flex flex-col justify-between text-[9px] font-mono text-stone-400 font-bold select-none">
                        <span>{impactHistogramMetric === 'meals' ? '500' : impactHistogramMetric === 'kg' ? '100' : impactHistogramMetric === 'hours' ? '6.0' : '125'}</span>
                        <span>{impactHistogramMetric === 'meals' ? '375' : impactHistogramMetric === 'kg' ? '75' : impactHistogramMetric === 'hours' ? '4.5' : '95'}</span>
                        <span>{impactHistogramMetric === 'meals' ? '250' : impactHistogramMetric === 'kg' ? '50' : impactHistogramMetric === 'hours' ? '3.0' : '65'}</span>
                        <span>{impactHistogramMetric === 'meals' ? '125' : impactHistogramMetric === 'kg' ? '25' : impactHistogramMetric === 'hours' ? '1.5' : '30'}</span>
                        <span>0</span>
                      </div>

                      {/* 7 Histogram Bars */}
                      {volunteerImpactData.map((bar, idx) => {
                        const val = impactHistogramMetric === 'meals'
                          ? bar.meals
                          : impactHistogramMetric === 'kg'
                          ? bar.kg * 5
                          : impactHistogramMetric === 'hours'
                          ? bar.hours * 80
                          : bar.co2 * 4;
                        const heightPct = Math.min(100, Math.max(16, (val / 500) * 100));
                        const isHovered = hoveredImpactIndex === idx;

                        return (
                          <div
                            key={bar.day}
                            className="flex-1 flex flex-col items-center h-full justify-end relative group cursor-pointer"
                            onMouseEnter={() => setHoveredImpactIndex(idx)}
                            onMouseLeave={() => setHoveredImpactIndex(null)}
                          >
                            {/* Hover Tooltip Popover */}
                            {isHovered && (
                              <div className="absolute -top-16 z-30 bg-[#1C1917] text-white p-2.5 rounded-xl shadow-xl text-left border border-stone-700 whitespace-nowrap animate-in zoom-in-95 pointer-events-none">
                                <span className="text-[10px] font-bold text-amber-400 block">{bar.label}</span>
                                <span className="text-xs font-black text-white block">
                                  {impactHistogramMetric === 'meals'
                                    ? `${bar.meals} Meals Delivered`
                                    : impactHistogramMetric === 'kg'
                                    ? `${bar.kg} kg Food Saved`
                                    : impactHistogramMetric === 'hours'
                                    ? `${bar.hours} Hours On Duty`
                                    : `${bar.co2} kg CO₂ Offset`}
                                </span>
                                <span className="text-[9px] text-stone-300 block">Top Partner: {bar.topDonor}</span>
                              </div>
                            )}

                            {/* Value Label above bar */}
                            <span className={`text-[10px] font-mono font-bold mb-1 transition-colors ${
                              isHovered ? 'text-emerald-700 font-black scale-110' : 'text-stone-500'
                            }`}>
                              {impactHistogramMetric === 'meals' ? bar.meals : impactHistogramMetric === 'kg' ? bar.kg : impactHistogramMetric === 'hours' ? `${bar.hours}h` : bar.co2}
                            </span>

                            {/* Graphical Bar */}
                            <div className="w-full max-w-[34px] bg-stone-200 rounded-t-xl overflow-hidden h-full flex items-end">
                              <div
                                style={{ height: `${heightPct}%` }}
                                className={`w-full rounded-t-xl transition-all duration-300 ${
                                  isHovered
                                    ? 'bg-gradient-to-t from-emerald-700 to-[#F59E0B]'
                                    : 'bg-gradient-to-t from-[#0A3F2F] to-emerald-500'
                                }`}
                              />
                            </div>

                            {/* X-Axis Day Label */}
                            <span className={`text-[11px] font-bold mt-2 select-none ${
                              isHovered ? 'text-emerald-800 font-black' : 'text-stone-500'
                            }`}>
                              {bar.day}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Summary Metric Footer Cards */}
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-stone-100 text-center">
                    <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                      <span className="text-[10px] font-bold text-stone-400 uppercase block">Weekly Total</span>
                      <span className="text-xs sm:text-sm font-black text-stone-900">2,160 Meals</span>
                    </div>
                    <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                      <span className="text-[10px] font-bold text-stone-400 uppercase block">Peak Hour</span>
                      <span className="text-xs sm:text-sm font-black text-amber-700">1:15 PM</span>
                    </div>
                    <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                      <span className="text-[10px] font-bold text-stone-400 uppercase block">On-Time Rate</span>
                      <span className="text-xs sm:text-sm font-black text-emerald-700">99.4%</span>
                    </div>
                  </div>

                </div>

              </div>

              {/* ======================================================== */}
              {/* ROW 2: DETAILED RESCUE TASKS & TODAY'S SCHEDULE          */}
              {/* ======================================================== */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* Left Column (lg:col-span-7): Full Assigned Rescue Tasks with "Kya hai" and "Kitna chal rahi hai" */}
                <div className="lg:col-span-7 bg-white rounded-3xl p-5 sm:p-6 border border-stone-200/80 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ClipboardList className="w-4 h-4 text-emerald-700" />
                      <div>
                        <h3 className="font-extrabold text-stone-900 text-sm sm:text-base">
                          Your Assigned Surplus Rescue Tasks
                        </h3>
                        <p className="text-[11px] text-stone-500 font-medium">
                          Food specifications, active running timers &amp; safe expiry countdowns
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveTab('tasks')}
                      className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer"
                    >
                      <span>View All ({tasks.length})</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Tasks Cards List */}
                  <div className="space-y-4">
                    {tasks.map((task) => (
                      <div
                        key={task.id}
                        onClick={() => {
                          setSelectedTask(task);
                          setShowTaskDetailModal(true);
                        }}
                        className="p-4 sm:p-5 rounded-2xl border border-stone-200 hover:border-emerald-500/60 hover:bg-emerald-50/10 transition-all cursor-pointer group shadow-2xs space-y-3"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex items-center gap-3.5 min-w-0">
                            <img
                              src={task.image}
                              alt={task.title}
                              className="w-16 h-16 rounded-2xl object-cover shrink-0 shadow-xs border border-stone-100 group-hover:scale-105 transition-transform"
                            />
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <h4 className="font-extrabold text-sm text-stone-900 group-hover:text-emerald-900 transition-colors truncate">
                                  {task.title}
                                </h4>
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100 shrink-0" />
                              </div>
                              <p className="text-xs text-stone-500 font-medium mt-0.5 truncate">
                                From: <strong className="text-stone-800">{task.donor}</strong> ➔ To: <strong className="text-stone-800">{task.recipientOrg}</strong>
                              </p>
                              <div className="text-[11px] text-stone-400 mt-0.5">
                                Route: {task.distance} • Scheduled: {task.time}
                              </div>
                            </div>
                          </div>

                          {/* Status and Expiry Pill */}
                          <div className="flex sm:flex-col items-start sm:items-end justify-between sm:justify-center gap-1.5 shrink-0">
                            <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                              task.status === 'In Progress'
                                ? 'bg-amber-100 text-amber-800 border-amber-300'
                                : task.status === 'Completed'
                                ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                                : 'bg-blue-100 text-blue-800 border-blue-200'
                            }`}>
                              ● {task.status}
                            </span>
                            <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/80 inline-flex items-center gap-1">
                              <Timer className="w-3 h-3 text-amber-600" />
                              Exp: {task.expiryHoursLeft}h left
                            </span>
                          </div>
                        </div>

                        {/* Badges for "Kya hai" & "Kitna chal rahi hai" */}
                        <div className="bg-stone-50 p-3 rounded-xl border border-stone-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="bg-[#F59E0B]/20 text-stone-950 font-bold px-2 py-0.5 rounded text-[10px] uppercase">
                              {task.category}
                            </span>
                            <span className="bg-white border border-stone-200 text-stone-800 font-bold px-2 py-0.5 rounded text-[10px]">
                              {task.quantity} • {task.servings}
                            </span>
                            <span className="inline-flex items-center gap-1 text-emerald-800 font-bold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded text-[10px]">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              {task.activeDuration}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveTab('tracking');
                              }}
                              className="px-3 py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs rounded-lg transition-colors cursor-pointer"
                            >
                              GPS Route
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedTask(task);
                                setShowTaskDetailModal(true);
                              }}
                              className="px-3.5 py-1 bg-[#0A3F2F] hover:bg-black text-white font-bold text-xs rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                            >
                              <span>Details &amp; Handover</span>
                              <ArrowRight className="w-3 h-3 text-[#F59E0B]" />
                            </button>
                          </div>
                        </div>

                        {/* Included Dishes Chips */}
                        {task.itemsList && task.itemsList.length > 0 && (
                          <div className="flex flex-wrap items-center gap-1 pt-0.5">
                            <span className="text-[10px] font-bold text-stone-400 uppercase mr-1">Includes:</span>
                            {task.itemsList.slice(0, 3).map((dish, i) => (
                              <span key={i} className="text-[10px] font-semibold bg-stone-100 text-stone-700 px-2 py-0.5 rounded-md border border-stone-200/70">
                                {dish}
                              </span>
                            ))}
                            {task.itemsList.length > 3 && (
                              <span className="text-[10px] font-bold text-stone-400">
                                +{task.itemsList.length - 3} more
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column (lg:col-span-5): Today's Schedule & Live Timeline */}
                <div className="lg:col-span-5 space-y-6">
                  
                  {/* Today's Schedule Stepper */}
                  <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200/80 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-emerald-700" />
                        <h3 className="font-extrabold text-stone-900 text-sm sm:text-base">Today's Schedule</h3>
                      </div>
                      <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        3 Dispatches
                      </span>
                    </div>

                    <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200">
                      
                      {/* 11:00 AM */}
                      <div className="relative">
                        <div className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-emerald-600 ring-4 ring-emerald-100" />
                        <div>
                          <span className="font-black text-xs text-stone-900 block">11:00 AM</span>
                          <h5 className="font-bold text-xs text-stone-800 mt-0.5">Pick up Rajma Masala &amp; Steamed Jeera Basmati Rice</h5>
                          <p className="text-[11px] text-stone-500">The Green Table Restaurant ➔ Hope Foundation Center</p>
                        </div>
                      </div>

                      {/* 01:00 PM */}
                      <div className="relative">
                        <div className="absolute -left-6 top-0.5 w-4 h-4 rounded-full border-2 border-emerald-600 bg-white ring-4 ring-white" />
                        <div>
                          <span className="font-black text-xs text-stone-900 block">01:00 PM</span>
                          <h5 className="font-bold text-xs text-stone-800 mt-0.5">Collect Kesar Rasmalai &amp; Gulab Jamun Sweet Trays</h5>
                          <p className="text-[11px] text-stone-500">Sunrise Sweets &amp; Banquet ➔ Palm Beach Senior Center</p>
                        </div>
                      </div>

                      {/* 03:00 PM */}
                      <div className="relative">
                        <div className="absolute -left-6 top-0.5 w-4 h-4 rounded-full border-2 border-stone-300 bg-white" />
                        <div>
                          <span className="font-black text-xs text-stone-500 block">03:00 PM</span>
                          <h5 className="font-bold text-xs text-stone-700 mt-0.5">Community Distribution Support</h5>
                          <p className="text-[11px] text-stone-500">Palm Beach Youth Haven Shelter</p>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Impact Hero Card */}
                  <div className="bg-[#0A3F2F] rounded-3xl p-6 text-white shadow-xl border border-emerald-900 flex flex-col justify-between relative overflow-hidden">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-2xl bg-emerald-800/60 border border-emerald-500/30 flex items-center justify-center text-emerald-300">
                        <Leaf className="w-5 h-5 fill-emerald-400" />
                      </div>
                      <span className="bg-[#F59E0B] text-stone-950 font-black text-[10px] px-2.5 py-0.5 rounded-full">
                        LEVEL 4 HERO
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <h4 className="text-lg font-black text-white tracking-tight">Zero Food Spoilage Record</h4>
                      <p className="text-xs text-emerald-100/80 leading-relaxed">
                        Rahul has completed 184 surplus rescues with 100% on-time transit and verified temperature logs.
                      </p>
                    </div>

                    <div className="pt-4 flex items-center justify-between border-t border-emerald-800/60 mt-4 text-xs">
                      <span className="text-emerald-200 font-medium">FSSAI Safe Transport Certified</span>
                      <button
                        onClick={() => setActiveTab('impact')}
                        className="font-bold text-[#F59E0B] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>View Full Report</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            </>
          )}

          {/* ======================================================== */}
          {/* TAB 2: MY TASKS TAB                                      */}
          {/* ======================================================== */}
          {activeTab === 'tasks' && (
            <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black text-stone-900">Assigned Delivery Tasks</h2>
                  <p className="text-xs text-stone-500">Pickups dispatched to your route today with live expiry deadlines</p>
                </div>
                <div className="flex items-center gap-1.5 bg-stone-100 p-1 rounded-2xl">
                  {(['All', 'In Progress', 'Scheduled', 'Completed'] as const).map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setTaskFilter(filter)}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        taskFilter === filter
                          ? 'bg-[#0A3F2F] text-white shadow-sm'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {tasks
                  .filter((t) => taskFilter === 'All' || t.status === taskFilter)
                  .map((task) => (
                    <div
                      key={task.id}
                      onClick={() => {
                        setSelectedTask(task);
                        setShowTaskDetailModal(true);
                      }}
                      className="p-5 rounded-3xl border border-stone-200 hover:border-emerald-500/80 hover:bg-emerald-50/10 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer group shadow-2xs"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <img
                          src={task.image}
                          alt={task.title}
                          className="w-18 h-18 rounded-2xl object-cover shrink-0 shadow-sm border border-stone-100 group-hover:scale-105 transition-transform"
                        />
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="font-extrabold text-sm text-stone-900 group-hover:text-emerald-900 transition-colors truncate">
                              {task.title}
                            </h4>
                            <span
                              className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                                task.status === 'In Progress'
                                  ? 'bg-amber-100 text-amber-800'
                                  : task.status === 'Completed'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-blue-100 text-blue-800'
                              }`}
                            >
                              ● {task.status}
                            </span>
                          </div>
                          <p className="text-xs text-stone-500 font-medium mt-0.5 truncate">
                            From: <strong className="text-stone-800">{task.donor}</strong> ➔ To: <strong className="text-stone-800">{task.recipientOrg}</strong>
                          </p>

                          {/* "Kya hai" & "Kitna chal rahi hai" details */}
                          <div className="flex flex-wrap items-center gap-2 text-xs text-stone-600 font-semibold mt-2">
                            <span className="bg-stone-100 px-2 py-0.5 rounded-md font-bold text-stone-800 text-[11px]">
                              {task.quantity} • {task.servings}
                            </span>
                            <span className="inline-flex items-center gap-1 text-emerald-800 font-bold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md text-[11px]">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              {task.activeDuration}
                            </span>
                            <span className="inline-flex items-center gap-1 text-amber-800 font-bold bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md text-[11px]">
                              <Timer className="w-3 h-3 text-amber-600" />
                              Exp: {task.expiryHoursLeft}h left ({task.expiresAt})
                            </span>
                            <span className="text-[11px] text-stone-400">
                              Route: {task.distance}
                            </span>
                          </div>

                          {/* Included Dishes Chips */}
                          {task.itemsList && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {task.itemsList.map((dish, i) => (
                                <span key={i} className="text-[10px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded font-medium border border-stone-200/60">
                                  {dish}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-2 shrink-0">
                        <span className="text-[11px] text-stone-500 font-medium">
                          OTP: <strong className="font-mono text-stone-900 bg-amber-100 px-2 py-0.5 rounded">{task.otpCode}</strong>
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveTab('tracking');
                            }}
                            className="px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-all cursor-pointer"
                          >
                            GPS Route
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedTask(task);
                              setShowTaskDetailModal(true);
                            }}
                            className="px-5 py-2 rounded-xl bg-[#0A3F2F] hover:bg-black text-white text-xs font-bold transition-all cursor-pointer shadow-sm"
                          >
                            {task.status === 'Completed' ? 'View Details' : 'Verify & Handover'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 3: LIVE TRACKING (Full Ola / Uber Driver Console)     */}
          {/* ======================================================== */}
          {activeTab === 'tracking' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Driver HUD, Phone & Handover OTP */}
              <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-stone-200/80 shadow-sm space-y-5">
                <div>
                  <div className="flex items-center gap-2">
                    <Car className="w-5 h-5 text-emerald-700" />
                    <h2 className="text-xl font-black text-stone-900">Active Navigation Route</h2>
                  </div>
                  <p className="text-xs text-stone-500 mt-0.5">Ola / Uber real-time driver dispatch guidance</p>
                </div>

                {/* Driver & Vehicle Profile */}
                <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                        alt="Rahul Sharma"
                        className="w-12 h-12 rounded-2xl object-cover border-2 border-emerald-600"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-extrabold text-sm text-stone-900">Rahul Sharma</h4>
                          <span className="text-amber-500 text-xs font-black">★ 4.96</span>
                        </div>
                        <p className="text-[11px] text-stone-500 font-medium">Mahindra Bolero EV Cargo</p>
                        <span className="font-mono font-bold text-[10px] text-stone-900 bg-amber-300 px-1.5 py-0.2 rounded">
                          DL 01 AB 4092
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-bold text-stone-400 uppercase block">Insulated Temp</span>
                      <span className="text-xs font-black text-emerald-800">3.2°C Logged</span>
                    </div>
                  </div>
                </div>

                {/* In-Transit Maneuver Banner */}
                <div className="bg-[#0A3F2F] text-white p-4 rounded-2xl shadow-sm space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">Next Maneuver</span>
                    <span className="text-xs font-mono font-bold text-emerald-200">
                      Speed: {isTrackingPlaying ? Math.round(32 + Math.sin(trackingProgress * 16) * 4) : 0} km/h
                    </span>
                  </div>
                  <h4 className="font-extrabold text-sm text-white flex items-center gap-2">
                    <Navigation className="w-4 h-4 text-[#F59E0B]" />
                    <span>In 180m, turn left onto Palm Beach Blvd</span>
                  </h4>
                  <p className="text-xs text-emerald-100/80">Continue past Clematis St. Destination Hope Foundation Center.</p>
                </div>

                {/* Route Details */}
                <div className="space-y-3 text-xs text-stone-700 bg-stone-50 p-4 rounded-2xl border border-stone-200">
                  <div className="flex justify-between py-1.5 border-b border-stone-200/60">
                    <span className="text-stone-500">Pickup Location:</span>
                    <strong className="text-right text-stone-900">Green Table Restaurant (125 Palm St)</strong>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-stone-200/60">
                    <span className="text-stone-500">Delivery Location:</span>
                    <strong className="text-right text-stone-900">Hope Foundation Center</strong>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-stone-200/60">
                    <span className="text-stone-500">Food Cargo:</span>
                    <strong className="text-right text-emerald-800">Rajma Masala &amp; Steamed Jeera Rice (40 kg • Feeds 50)</strong>
                  </div>
                  <div className="flex justify-between items-center pt-1.5">
                    <span className="text-stone-700 font-bold uppercase text-[11px]">Handover Verification OTP:</span>
                    <span className="font-mono text-sm font-black text-stone-950 bg-amber-100 px-3 py-0.5 rounded-lg border border-amber-300">
                      5821
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <a
                    href="tel:+15615550192"
                    className="flex-1 py-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold text-center flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Restaurant</span>
                  </a>
                  <button
                    onClick={() => {
                      setSelectedTask(tasks[0]);
                      setShowTaskDetailModal(true);
                    }}
                    className="flex-1 py-3 rounded-xl bg-[#0A3F2F] hover:bg-black text-white text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <Check className="w-3.5 h-3.5 text-[#F59E0B] stroke-[3]" />
                    <span>Confirm Handover</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Live GPS Vector Map with Animated Vehicle */}
              <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-stone-200/80 shadow-sm flex flex-col justify-between space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-700" />
                    <h3 className="font-extrabold text-stone-900 text-sm sm:text-base">Live GPS Ola / Uber Vector Map</h3>
                  </div>
                  <span className="text-xs bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-bold">
                    ETA: ~{Math.max(1, Math.round((1 - trackingProgress) * 12))} Minutes
                  </span>
                </div>

                <div className="w-full h-96 rounded-2xl overflow-hidden border border-stone-200 bg-[#E8ECE8] relative shadow-inner">
                  <svg className="w-full h-full" viewBox="0 0 720 360" preserveAspectRatio="xMidYMid slice">
                    <defs>
                      <filter id="trackVolShadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.25" />
                      </filter>
                    </defs>

                    <rect width="720" height="360" fill="#E4EAE4" />
                    <path d="M 0,280 Q 240,260 400,310 T 720,290 L 720,360 L 0,360 Z" fill="#CBE1ED" />
                    <rect x="230" y="110" width="140" height="100" rx="14" fill="#D3E4D1" />

                    <rect x="30" y="20" width="130" height="130" rx="8" fill="#D8DFD8" />
                    <rect x="30" y="210" width="130" height="50" rx="8" fill="#D8DFD8" />
                    <rect x="230" y="20" width="140" height="60" rx="8" fill="#D8DFD8" />
                    <rect x="430" y="20" width="120" height="70" rx="8" fill="#D8DFD8" />
                    <rect x="430" y="120" width="100" height="90" rx="8" fill="#D8DFD8" />
                    <rect x="610" y="20" width="90" height="70" rx="8" fill="#D8DFD8" />
                    <rect x="610" y="160" width="90" height="90" rx="8" fill="#D8DFD8" />

                    <line x1="0" y1="50" x2="720" y2="50" stroke="#FFFFFF" strokeWidth="6" />
                    <line x1="0" y1="210" x2="720" y2="210" stroke="#FFFFFF" strokeWidth="6" />
                    <line x1="180" y1="0" x2="180" y2="280" stroke="#FFFFFF" strokeWidth="6" />

                    <path d={trackingPathD} fill="none" stroke="#10B981" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
                    <path d={trackingPathD} fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="6 6" />

                    <g transform="translate(80, 180)">
                      <circle r="16" fill="#F59E0B" opacity="0.3" className="animate-ping" />
                      <circle r="10" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="3" />
                      <text x="0" y="-16" textAnchor="middle" fill="#1C1917" fontSize="10" fontWeight="900">
                        PICKUP: GREEN TABLE
                      </text>
                    </g>

                    <g transform="translate(640, 170)">
                      <circle r="12" fill="#0A3F2F" stroke="#FFFFFF" strokeWidth="3" />
                      <text x="0" y="-16" textAnchor="middle" fill="#0A3F2F" fontSize="10" fontWeight="900">
                        DROPOFF: HOPE FOUNDATION
                      </text>
                    </g>

                    <g transform={`translate(${carCoords.x}, ${carCoords.y}) rotate(${carCoords.angle})`} filter="url(#trackVolShadow)">
                      <circle r="18" fill="#10B981" opacity="0.2" className="animate-pulse" />
                      <rect x="-14" y="-8" width="28" height="16" rx="4" fill="#0A3F2F" stroke="#FFFFFF" strokeWidth="2" />
                      <rect x="5" y="-5" width="4" height="10" rx="1" fill="#F59E0B" />
                      <circle cx="9" cy="-8" r="2" fill="#FDE047" />
                      <circle cx="9" cy="8" r="2" fill="#FDE047" />
                    </g>
                  </svg>

                  {/* Playback Controls */}
                  <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md rounded-xl p-2.5 shadow-md border border-stone-200 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsTrackingPlaying(!isTrackingPlaying)}
                        className="p-1.5 rounded-lg bg-[#0A3F2F] text-white hover:bg-black font-bold cursor-pointer"
                      >
                        {isTrackingPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                      </button>
                      <button
                        onClick={() => {
                          setTrackingProgress(0);
                          setIsTrackingPlaying(true);
                        }}
                        className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 cursor-pointer"
                        title="Reset Route"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-[11px] font-bold text-stone-700">
                        Trip Progress: {Math.round(trackingProgress * 100)}%
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-stone-400 font-semibold uppercase">Speed:</span>
                      {([1, 2, 4] as const).map((spd) => (
                        <button
                          key={spd}
                          onClick={() => setTrackingSpeed(spd)}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer ${
                            trackingSpeed === spd
                              ? 'bg-[#F59E0B] text-stone-950 font-black'
                              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                          }`}
                        >
                          {spd}x
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 4: IMPACT REPORT (Comprehensive Volunteer Report)     */}
          {/* ======================================================== */}
          {activeTab === 'impact' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-sm space-y-8">
              
              {/* Report Header Banner */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-200">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-black text-stone-900">Rahul's Volunteer Impact &amp; Rescue Report</h2>
                    <span className="bg-[#F59E0B] text-stone-950 font-black text-xs px-2.5 py-0.5 rounded-full shadow-xs">
                      LEVEL 4 HERO
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 mt-1">
                    Official verified FSSAI redistribution and transit log for Palm Beach County
                  </p>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => {
                      setToastMessage('Official Volunteer Impact Certificate (PDF) generated successfully!');
                      setTimeout(() => setToastMessage(null), 4000);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0A3F2F] hover:bg-black text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-[#F59E0B]" />
                    <span>Download Certificate (PDF)</span>
                  </button>
                </div>
              </div>

              {/* 4 Summary Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
                  <span className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider block">Meals Distributed</span>
                  <span className="text-3xl font-black text-emerald-950 block">1,200</span>
                  <span className="text-[11px] text-emerald-700 font-medium block">Reached 4 verified shelters</span>
                </div>
                <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 space-y-1">
                  <span className="text-[10px] text-amber-700 font-bold uppercase tracking-wider block">Food Rescued</span>
                  <span className="text-3xl font-black text-amber-950 block">245 kg</span>
                  <span className="text-[11px] text-amber-700 font-medium block">0 kg transit spoilage</span>
                </div>
                <div className="p-5 rounded-2xl bg-teal-50 border border-teal-200 space-y-1">
                  <span className="text-[10px] text-teal-700 font-bold uppercase tracking-wider block">Volunteer Hours</span>
                  <span className="text-3xl font-black text-teal-950 block">32.5h</span>
                  <span className="text-[11px] text-teal-700 font-medium block">28 active dispatch shifts</span>
                </div>
                <div className="p-5 rounded-2xl bg-purple-50 border border-purple-200 space-y-1">
                  <span className="text-[10px] text-purple-700 font-bold uppercase tracking-wider block">CO₂ Offset</span>
                  <span className="text-3xl font-black text-purple-950 block">320 kg CO₂</span>
                  <span className="text-[11px] text-purple-700 font-medium block">Top 5% Volunteer in State</span>
                </div>
              </div>

              {/* DEDICATED FULL-SIZE PROFESSIONAL HISTOGRAM GRAPH */}
              <div className="bg-stone-50/70 p-6 rounded-3xl border border-stone-200 space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="font-extrabold text-base text-stone-900">
                      Weekly Redistribution Volume &amp; Activity Histogram
                    </h3>
                    <p className="text-xs text-stone-500">
                      Hover over any bar to view daily breakdown and top donating partner
                    </p>
                  </div>

                  {/* Metric Switcher */}
                  <div className="flex items-center gap-1.5 bg-white border border-stone-200 p-1 rounded-xl text-xs font-bold">
                    <button
                      onClick={() => setImpactHistogramMetric('meals')}
                      className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                        impactHistogramMetric === 'meals'
                          ? 'bg-[#0A3F2F] text-white shadow-xs'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      Meals Rescued
                    </button>
                    <button
                      onClick={() => setImpactHistogramMetric('kg')}
                      className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                        impactHistogramMetric === 'kg'
                          ? 'bg-[#0A3F2F] text-white shadow-xs'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      Weight (kg)
                    </button>
                    <button
                      onClick={() => setImpactHistogramMetric('hours')}
                      className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                        impactHistogramMetric === 'hours'
                          ? 'bg-[#0A3F2F] text-white shadow-xs'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      Volunteer Hours
                    </button>
                    <button
                      onClick={() => setImpactHistogramMetric('co2')}
                      className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                        impactHistogramMetric === 'co2'
                          ? 'bg-[#0A3F2F] text-white shadow-xs'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      CO₂ Offset
                    </button>
                  </div>
                </div>

                {/* SVG Histogram Graph Canvas */}
                <div className="relative pt-6 pb-2 bg-white rounded-2xl p-5 border border-stone-200 shadow-2xs">
                  
                  {/* Daily Target Benchmark Line */}
                  <div className="absolute left-10 right-6 top-[38%] border-b border-dashed border-[#F59E0B] z-10 flex items-center justify-end pointer-events-none">
                    <span className="text-[10px] font-mono font-black text-amber-900 bg-amber-100 px-2 py-0.5 rounded -mt-4 border border-amber-300">
                      Standard Benchmark: {impactHistogramMetric === 'meals' ? '300 Meals' : impactHistogramMetric === 'kg' ? '60 kg' : impactHistogramMetric === 'hours' ? '4.0 Hours' : '80 kg CO₂'}
                    </span>
                  </div>

                  <div className="h-64 flex items-end justify-between gap-3 sm:gap-6 pl-10 pr-4 relative">
                    
                    {/* Y-Axis */}
                    <div className="absolute left-2 top-0 bottom-6 flex flex-col justify-between text-[10px] font-mono text-stone-400 font-bold select-none">
                      <span>{impactHistogramMetric === 'meals' ? '500' : impactHistogramMetric === 'kg' ? '100' : impactHistogramMetric === 'hours' ? '6.0' : '125'}</span>
                      <span>{impactHistogramMetric === 'meals' ? '375' : impactHistogramMetric === 'kg' ? '75' : impactHistogramMetric === 'hours' ? '4.5' : '95'}</span>
                      <span>{impactHistogramMetric === 'meals' ? '250' : impactHistogramMetric === 'kg' ? '50' : impactHistogramMetric === 'hours' ? '3.0' : '65'}</span>
                      <span>{impactHistogramMetric === 'meals' ? '125' : impactHistogramMetric === 'kg' ? '25' : impactHistogramMetric === 'hours' ? '1.5' : '30'}</span>
                      <span>0</span>
                    </div>

                    {volunteerImpactData.map((bar, idx) => {
                      const val = impactHistogramMetric === 'meals'
                        ? bar.meals
                        : impactHistogramMetric === 'kg'
                        ? bar.kg * 5
                        : impactHistogramMetric === 'hours'
                        ? bar.hours * 80
                        : bar.co2 * 4;
                      const heightPct = Math.min(100, Math.max(16, (val / 500) * 100));
                      const isHovered = hoveredImpactIndex === idx;

                      return (
                        <div
                          key={bar.day}
                          className="flex-1 flex flex-col items-center h-full justify-end relative group cursor-pointer"
                          onMouseEnter={() => setHoveredImpactIndex(idx)}
                          onMouseLeave={() => setHoveredImpactIndex(null)}
                        >
                          {isHovered && (
                            <div className="absolute -top-16 z-30 bg-[#1C1917] text-white p-3 rounded-xl shadow-2xl text-left border border-stone-700 whitespace-nowrap animate-in zoom-in-95 pointer-events-none">
                              <span className="text-[10px] font-bold text-amber-400 block">{bar.label}</span>
                              <span className="text-xs font-black text-white block">
                                {impactHistogramMetric === 'meals'
                                  ? `${bar.meals} Meals Distributed`
                                  : impactHistogramMetric === 'kg'
                                  ? `${bar.kg} kg Food Saved`
                                  : impactHistogramMetric === 'hours'
                                  ? `${bar.hours} Hours Logged`
                                  : `${bar.co2} kg CO₂ Offset`}
                              </span>
                              <span className="text-[9px] text-stone-300 block">Donor: {bar.topDonor} • 100% Insulated Safe</span>
                            </div>
                          )}

                          <span className={`text-[11px] font-mono font-bold mb-1.5 transition-colors ${
                            isHovered ? 'text-emerald-700 font-black scale-110' : 'text-stone-500'
                          }`}>
                            {impactHistogramMetric === 'meals' ? bar.meals : impactHistogramMetric === 'kg' ? bar.kg : impactHistogramMetric === 'hours' ? `${bar.hours}h` : bar.co2}
                          </span>

                          <div className="w-full max-w-[48px] bg-stone-100 rounded-t-xl overflow-hidden h-full flex items-end">
                            <div
                              style={{ height: `${heightPct}%` }}
                              className={`w-full rounded-t-xl transition-all duration-300 ${
                                isHovered
                                  ? 'bg-gradient-to-t from-emerald-700 to-[#F59E0B]'
                                  : 'bg-gradient-to-t from-[#0A3F2F] to-emerald-500'
                              }`}
                            />
                          </div>

                          <span className={`text-xs font-bold mt-2.5 select-none ${
                            isHovered ? 'text-emerald-800 font-black' : 'text-stone-500'
                          }`}>
                            {bar.day}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Performance Audit Highlights */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <div className="bg-white p-4 rounded-2xl border border-stone-200">
                    <span className="text-[10px] font-bold text-stone-400 uppercase block">On-Time Handover Rate</span>
                    <span className="text-lg font-black text-stone-900 mt-0.5 block">99.4% Verified</span>
                    <p className="text-[11px] text-stone-500 mt-1">Average delivery duration: 17.2 mins from donor kitchen</p>
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-stone-200">
                    <span className="text-[10px] font-bold text-stone-400 uppercase block">Cold-Chain Compliance</span>
                    <span className="text-lg font-black text-emerald-800 mt-0.5 block">100% FSSAI Standard</span>
                    <p className="text-[11px] text-stone-500 mt-1">All hot food &gt; 65°C and chilled produce &lt; 4°C during transit</p>
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-stone-200">
                    <span className="text-[10px] font-bold text-stone-400 uppercase block">Beneficiary Impact</span>
                    <span className="text-lg font-black text-[#F59E0B] mt-0.5 block">1,200 Individuals Fed</span>
                    <p className="text-[11px] text-stone-500 mt-1">Dispatched to 4 senior shelters and youth community kitchens</p>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 5: PICKUP HISTORY                                    */}
          {/* ======================================================== */}
          {activeTab === 'history' && (
            <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-sm space-y-6">
              <div>
                <h2 className="text-xl font-black text-stone-900">Completed Pickup History</h2>
                <p className="text-xs text-stone-500">Log of all surplus food handovers successfully completed</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-stone-200 text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                      <th className="pb-3 pl-2">Food Surplus</th>
                      <th className="pb-3">Donor Kitchen</th>
                      <th className="pb-3">Recipient NGO</th>
                      <th className="pb-3">Date Completed</th>
                      <th className="pb-3">Weight</th>
                      <th className="pb-3 pr-2 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    <tr className="hover:bg-stone-50">
                      <td className="py-3 pl-2 font-bold text-stone-900">Fresh Salad & Herb Crates</td>
                      <td className="py-3 text-stone-600">Green Table Restaurant</td>
                      <td className="py-3 text-stone-600">Community Center</td>
                      <td className="py-3 text-stone-500">Today • 09:30 AM</td>
                      <td className="py-3 font-bold text-stone-900">12 kg</td>
                      <td className="py-3 pr-2 text-right">
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          Delivered
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-stone-50">
                      <td className="py-3 pl-2 font-bold text-stone-900">Warm Soup & Bread Rolls</td>
                      <td className="py-3 text-stone-600">Sunrise Kitchen</td>
                      <td className="py-3 text-stone-600">Hope Foundation</td>
                      <td className="py-3 text-stone-500">Yesterday • 02:00 PM</td>
                      <td className="py-3 font-bold text-stone-900">28 kg</td>
                      <td className="py-3 pr-2 text-right">
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          Delivered
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 6: SETTINGS                                          */}
          {/* ======================================================== */}
          {activeTab === 'settings' && (
            <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-sm max-w-3xl space-y-6">
              <div>
                <h2 className="text-xl font-black text-stone-900">Volunteer Profile & Vehicle Settings</h2>
                <p className="text-xs text-stone-500">Manage your contact number, transport mode, and delivery zone</p>
              </div>

              <div className="flex items-center gap-4 pb-6 border-b border-stone-200">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                  alt="Rahul Sharma"
                  className="w-16 h-16 rounded-full object-cover border-2 border-[#F59E0B] shadow-md"
                />
                <div>
                  <h4 className="font-extrabold text-sm text-stone-900">Rahul Sharma</h4>
                  <p className="text-xs text-stone-500">Certified Food Rescue Driver • Palm Beach Fleet</p>
                  <span className="mt-1 inline-block bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    FL Driver License Verified ✓
                  </span>
                </div>
              </div>

              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Profile updated successfully!'); }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">Full Name</label>
                    <input
                      type="text"
                      defaultValue="Rahul Sharma"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-emerald-600 font-medium"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">Phone Number</label>
                    <input
                      type="text"
                      defaultValue="+1 (561) 555-0188"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-emerald-600 font-medium"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">Vehicle Type</label>
                    <select className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs font-medium focus:outline-none focus:border-emerald-600 bg-white">
                      <option>Delivery Van / SUV (Large Capacity)</option>
                      <option>Electric Scooter (Speed Dispatch)</option>
                      <option>Sedan / Hatchback</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">Assigned Dispatch Zone</label>
                    <input
                      type="text"
                      defaultValue="West Palm Beach / Downtown Coastal"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-emerald-600 font-medium"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#0A3F2F] hover:bg-black text-white text-xs font-bold rounded-xl shadow-md transition-colors cursor-pointer"
                  >
                    Save Vehicle Settings
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 7: NOTIFICATIONS                                     */}
          {/* ======================================================== */}
          {activeTab === 'notifications' && (
            <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-sm max-w-3xl space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-stone-900">Volunteer Dispatch Notifications</h2>
                  <p className="text-xs text-stone-500">Live task alerts and pickup confirmation updates</p>
                </div>
                <button
                  onClick={() => alert('Marked all as read')}
                  className="text-xs font-bold text-emerald-800 hover:text-emerald-950"
                >
                  Mark all as read
                </button>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <ClipboardList className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-bold text-xs text-stone-900">New Pickup Task Assigned</h5>
                    <p className="text-xs text-stone-600 mt-0.5">The Green Table Restaurant has 40 kg Rajma Masala &amp; Steamed Jeera Basmati Rice ready for pickup.</p>
                    <span className="text-[10px] text-stone-400 mt-1 block font-semibold">3 hours ago</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-bold text-xs text-stone-900">Delivery Confirmed!</h5>
                    <p className="text-xs text-stone-600 mt-0.5">Community Center staff signed off on 60 Portions Kesar Rasmalai &amp; Gulab Jamun sweet donation.</p>
                    <span className="text-[10px] text-stone-400 mt-1 block font-semibold">2 hours ago</span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>

        {/* ======================================================== */}
        {/* BOTTOM TICKER BANNER (GET INVOLVED)                      */}
        {/* ======================================================== */}
        <div className="h-10 bg-[#F59E0B] text-stone-950 font-black text-[11px] tracking-wider uppercase flex items-center justify-center overflow-hidden border-t border-[#D97706]/40 select-none flex-shrink-0">
          <div className="flex items-center gap-8 whitespace-nowrap animate-marquee">
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className="flex items-center gap-2">
                <Leaf className="w-3.5 h-3.5 fill-stone-950" />
                GET INVOLVED
              </span>
            ))}
          </div>
        </div>

      </div>

      {/* ======================================================== */}
      {/* 3. TASK VERIFICATION & SURPLUS FOOD DETAILS MODAL        */}
      {/* ======================================================== */}
      {showTaskDetailModal && selectedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-5 sm:p-8 border border-stone-200 max-h-[92vh] overflow-y-auto space-y-5 animate-in zoom-in-95 duration-200">
            
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-stone-400">
                  Rescue Task &gt; Surplus Food Details &amp; Expiry
                </span>
                <span className="bg-stone-100 text-stone-700 font-mono text-[10px] px-2 py-0.5 rounded font-bold">
                  {selectedTask.id}
                </span>
              </div>
              <button
                onClick={() => setShowTaskDetailModal(false)}
                className="p-1.5 rounded-full hover:bg-stone-100 text-stone-500 hover:text-stone-800 transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Hero Image with Floating Badges */}
            <div className="relative rounded-2xl overflow-hidden shadow-sm">
              <img
                src={selectedTask.image}
                alt={selectedTask.title}
                className="w-full h-48 sm:h-56 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-between p-4 sm:p-5">
                <div className="flex items-center justify-between gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md shadow-sm ${
                    selectedTask.status === 'In Progress'
                      ? 'bg-amber-500/90 text-stone-950 border-amber-300/50'
                      : selectedTask.status === 'Completed'
                      ? 'bg-emerald-600/90 text-white border-emerald-400/50'
                      : 'bg-blue-600/90 text-white border-blue-400/50'
                  }`}>
                    ● {selectedTask.status}
                  </span>

                  {/* Expiry / Freshness Pill */}
                  <span className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md shadow-sm flex items-center gap-1.5 ${
                    selectedTask.expiryHoursLeft <= 3
                      ? 'bg-red-500/90 text-white border border-red-400/50'
                      : selectedTask.expiryHoursLeft <= 8
                      ? 'bg-amber-500/90 text-stone-950 border border-amber-300/50'
                      : 'bg-emerald-600/90 text-white border border-emerald-400/50'
                  }`}>
                    <Timer className="w-3.5 h-3.5" />
                    <span>
                      {selectedTask.expiryHoursLeft <= 3
                        ? `Urgent: ${selectedTask.expiryHoursLeft}h left`
                        : `Fresh: ${selectedTask.expiryHoursLeft}h safe`}
                    </span>
                  </span>
                </div>

                <div className="text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-[#F59E0B] text-stone-950 text-[10px] font-black uppercase px-2 py-0.5 rounded">
                      {selectedTask.category}
                    </span>
                    <span className="text-stone-300 text-xs font-medium">
                      {selectedTask.quantity} • {selectedTask.servings}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight drop-shadow-xs">
                    {selectedTask.title}
                  </h3>
                  <p className="text-xs text-stone-300 mt-0.5">
                    Donor: <span className="font-bold text-white">{selectedTask.donor}</span> ➔ Recipient: <span className="font-bold text-white">{selectedTask.recipientOrg}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* ======================================================== */}
            {/* SECTION 1: TIME PERIOD & EXPIRY TRACKING ("Kitna chal    */}
            {/* rahi hai & Expiry kab ki hai")                          */}
            {/* ======================================================== */}
            <div className="rounded-2xl border-2 border-amber-500/30 bg-gradient-to-br from-amber-50/70 via-stone-50 to-emerald-50/40 p-4 sm:p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-amber-500 text-white">
                    <Timer className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-stone-950">
                      Time Period &amp; Live Expiry Tracking
                    </h4>
                    <p className="text-[11px] text-stone-500">
                      Real-time duration active and safe redistribution countdown
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-amber-800 bg-amber-100/80 px-2.5 py-0.5 rounded-full border border-amber-300/60">
                  {selectedTask.totalShelfLifeHours}h Total Safe Window
                </span>
              </div>

              {/* 3-Column Time Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                {/* 1. Preparation Time */}
                <div className="bg-white/90 p-3 rounded-xl border border-stone-200/80 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-stone-400 text-[10px] font-bold uppercase tracking-wider mb-1">
                    <Utensils className="w-3 h-3 text-stone-500" />
                    <span>Prepared / Cooked</span>
                  </div>
                  <div className="font-black text-sm text-stone-900">
                    {selectedTask.prepTime}
                  </div>
                  <div className="text-[10px] text-stone-500 mt-0.5 font-medium">
                    Scheduled: {selectedTask.time}
                  </div>
                </div>

                {/* 2. Active Running Duration */}
                <div className="bg-white/90 p-3 rounded-xl border border-emerald-200/80 shadow-2xs bg-emerald-50/30">
                  <div className="flex items-center gap-1.5 text-emerald-700 text-[10px] font-bold uppercase tracking-wider mb-1">
                    <Clock className="w-3 h-3 text-emerald-600" />
                    <span>Active &amp; Running For</span>
                  </div>
                  <div className="font-black text-sm text-emerald-950 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    {selectedTask.activeDuration}
                  </div>
                  <div className="text-[10px] text-emerald-700 mt-0.5 font-medium">
                    Broadcasted to fleet
                  </div>
                </div>

                {/* 3. Expiry Deadline */}
                <div className="bg-white/90 p-3 rounded-xl border border-amber-200/80 shadow-2xs bg-amber-50/30">
                  <div className="flex items-center gap-1.5 text-amber-700 text-[10px] font-bold uppercase tracking-wider mb-1">
                    <AlertTriangle className="w-3 h-3 text-amber-600" />
                    <span>Expiry Cutoff Time</span>
                  </div>
                  <div className="font-black text-sm text-amber-950">
                    {selectedTask.expiresAt}
                  </div>
                  <div className="text-[10px] text-amber-800 mt-0.5 font-medium">
                    Strict FSSAI cutoff
                  </div>
                </div>
              </div>

              {/* Visual Expiry Timeline Progress Bar */}
              <div className="bg-white/90 p-3.5 rounded-xl border border-stone-200/80 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-stone-600 flex items-center gap-1">
                    <span>Safe Window Progress:</span>
                    <span className="font-bold text-stone-900">
                      {selectedTask.expiryPercent}% Elapsed
                    </span>
                  </span>
                  <span className="text-amber-800 font-bold bg-amber-100/70 px-2 py-0.5 rounded text-[11px]">
                    ⏳ {selectedTask.expiryHoursLeft} Hours Remaining
                  </span>
                </div>

                <div className="w-full bg-stone-100 h-2.5 rounded-full overflow-hidden p-0.5 border border-stone-200">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      selectedTask.expiryPercent > 70
                        ? 'bg-red-500'
                        : selectedTask.expiryPercent > 45
                        ? 'bg-amber-500'
                        : 'bg-emerald-500'
                    }`}
                    style={{ width: `${Math.min(100, selectedTask.expiryPercent)}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[10px] font-medium text-stone-400 pt-0.5">
                  <span>🟢 Cooked (0h)</span>
                  <span className="text-stone-700 font-semibold">
                    📍 Current: {selectedTask.activeDuration}
                  </span>
                  <span>🔴 Expiry Deadline ({selectedTask.totalShelfLifeHours}h)</span>
                </div>
              </div>
            </div>

            {/* ======================================================== */}
            {/* SECTION 2: DONATION DETAILS ("Kya hai" - Food Specs)     */}
            {/* ======================================================== */}
            <div className="space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-stone-500" />
                Donation Details &amp; Food Specifications
              </h4>

              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed bg-stone-50 p-3.5 rounded-xl border border-stone-200/70">
                {selectedTask.description}
              </p>

              {/* Dishes & Menu Items Breakdown */}
              {selectedTask.itemsList && selectedTask.itemsList.length > 0 && (
                <div>
                  <span className="block text-[11px] font-bold text-stone-500 mb-1.5 uppercase tracking-wider">
                    Included Dishes &amp; Items:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedTask.itemsList.map((item, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 bg-stone-100 text-stone-800 px-3 py-1.5 rounded-xl text-xs font-semibold border border-stone-200/90"
                      >
                        <Utensils className="w-3 h-3 text-[#F59E0B]" />
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Dietary Badges */}
              {selectedTask.dietary && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {selectedTask.dietary.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-lg"
                    >
                      ✓ {tag}
                    </span>
                  ))}
                  {selectedTask.allergens && (
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded-lg">
                      Allergens: {selectedTask.allergens}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* ======================================================== */}
            {/* SECTION 3: STORAGE, PACKAGING & ROUTE ADDRESSES          */}
            {/* ======================================================== */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-stone-50 p-4 rounded-2xl border border-stone-200/80">
              <div className="space-y-1">
                <span className="text-stone-400 font-semibold block text-[10px] uppercase">
                  Storage &amp; Transit Temp
                </span>
                <span className="font-bold text-stone-900 block flex items-center gap-1.5">
                  {selectedTask.storage.includes('Hot') ? (
                    <Flame className="w-3.5 h-3.5 text-red-500" />
                  ) : (
                    <Snowflake className="w-3.5 h-3.5 text-blue-500" />
                  )}
                  {selectedTask.storage}
                </span>
                <span className="text-[10px] text-stone-500 font-medium">
                  Recorded: {selectedTask.storageTemp}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-stone-400 font-semibold block text-[10px] uppercase">
                  Packaging Container
                </span>
                <span className="font-bold text-stone-900 block flex items-center gap-1.5">
                  <Box className="w-3.5 h-3.5 text-emerald-600" />
                  {selectedTask.packaging}
                </span>
                <span className="text-[10px] text-stone-500 font-medium">
                  Tamper-evident hygiene sealed
                </span>
              </div>

              <div className="space-y-1 pt-2 sm:pt-0 sm:border-t-0 border-t border-stone-200/60">
                <span className="text-stone-400 font-semibold block text-[10px] uppercase">
                  Pickup Donor Kitchen
                </span>
                <span className="font-bold text-stone-900 block">
                  {selectedTask.donor}
                </span>
                <span className="text-[10px] text-stone-500 font-medium block">
                  {selectedTask.pickupAddress}
                </span>
                <span className="text-[10px] text-emerald-800 font-semibold block">
                  Phone: {selectedTask.contactPhone}
                </span>
              </div>

              <div className="space-y-1 pt-2 sm:pt-0 sm:border-t-0 border-t border-stone-200/60">
                <span className="text-stone-400 font-semibold block text-[10px] uppercase">
                  Destination Shelter NGO
                </span>
                <span className="font-bold text-emerald-800 block">
                  {selectedTask.recipientOrg}
                </span>
                <span className="text-[10px] text-stone-500 font-medium block">
                  {selectedTask.deliveryAddress}
                </span>
                <span className="text-[10px] text-stone-500 font-medium block">
                  Route Distance: {selectedTask.distance}
                </span>
              </div>
            </div>

            {/* FSSAI Standards Tag */}
            <div className="bg-emerald-50/80 border border-emerald-200 p-3 rounded-xl flex items-center gap-2.5 text-xs text-emerald-900">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <span className="font-bold block">FSSAI Safe Transport Certified</span>
                <span className="text-[10px] text-emerald-700">
                  Strictly unused and unserved surplus food. Temperature log maintained during transport.
                </span>
              </div>
            </div>

            {/* ======================================================== */}
            {/* SECTION 4: VOLUNTEER HANDOVER VERIFICATION & OTP         */}
            {/* ======================================================== */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-stone-900 to-[#1C1917] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-300 block">Handover Verification OTP</span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="font-mono text-xl font-black text-white tracking-widest bg-stone-800 px-3 py-1 rounded-xl border border-stone-700">
                    {selectedTask.otpCode}
                  </span>
                  <span className="text-xs text-stone-400">Share this code with receiver</span>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setShowTaskDetailModal(false)}
                  className="px-4 py-2.5 rounded-xl text-stone-300 hover:text-white hover:bg-stone-800 text-xs font-bold cursor-pointer transition-colors"
                >
                  Close
                </button>
                {selectedTask.status !== 'Completed' && (
                  <button
                    onClick={() => handleCompleteTask(selectedTask.id)}
                    className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl bg-[#F59E0B] hover:bg-amber-400 text-stone-950 text-xs font-black shadow-md hover:scale-105 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Confirm Handover</span>
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 4. HELP & SUPPORT MODAL                                  */}
      {/* ======================================================== */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 border border-stone-200">
            <button
              onClick={() => setShowHelpModal(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center font-bold text-sm cursor-pointer"
            >
              ✕
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-stone-900">Volunteer Dispatch Helpline</h3>
                <p className="text-xs text-stone-500">Live Assistance on the Road</p>
              </div>
            </div>
            <div className="space-y-3 text-xs text-stone-600">
              <p>Experiencing vehicle trouble or need address clarification during a food rescue pickup?</p>
              <div className="bg-stone-50 p-3 rounded-2xl border border-stone-200 font-medium space-y-1">
                <div>📞 Roadside Coordinator: <strong>+1 (561) 555-ROAD</strong></div>
                <div>✉️ Dispatch Desk: <strong>dispatch@palmbeachharvest.com</strong></div>
              </div>
            </div>
            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setShowHelpModal(false)}
                className="px-5 py-2 bg-[#0A3F2F] text-white text-xs font-bold rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

function TreeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 2L4 12h5l-3 6h12l-3-6h5L12 2z" />
      <path d="M12 18v4" />
    </svg>
  );
}

