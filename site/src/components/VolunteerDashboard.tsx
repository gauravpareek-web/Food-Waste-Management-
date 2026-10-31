import { useState } from 'react';
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
  Bike
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
  recipientOrg: string;
  contactPhone: string;
  otpCode: string;
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

  // Active Volunteer Tasks
  const [tasks, setTasks] = useState<VolunteerTask[]>([
    {
      id: 'TASK-101',
      title: 'Pick Up Fresh Vegetables Box',
      donor: 'Green Table Restaurant',
      distance: '2.4 km',
      time: 'Today • 11:00 AM',
      status: 'In Progress',
      category: 'Vegetables',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80',
      pickupAddress: '125 Palm Street, West Palm Beach, FL',
      deliveryAddress: 'Hope Foundation Community Center, West Palm Beach, FL',
      quantity: '15 kg',
      recipientOrg: 'Hope Foundation',
      contactPhone: '+1 (561) 555-0192',
      otpCode: '5821',
    },
    {
      id: 'TASK-102',
      title: 'Collect Cooked Meals',
      donor: 'Sunrise Kitchen',
      distance: '3.1 km',
      time: 'Today • 01:00 PM',
      status: 'Scheduled',
      category: 'Cooked Meals',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80',
      pickupAddress: '88 Clematis St, West Palm Beach, FL',
      deliveryAddress: 'Palm Beach Senior Living Center, FL',
      quantity: '25 portions',
      recipientOrg: 'Senior Relief Program',
      contactPhone: '+1 (561) 555-0178',
      otpCode: '7419',
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
      recipientOrg: 'Youth Haven Shelter',
      contactPhone: '+1 (561) 555-0143',
      otpCode: '3902',
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

              {/* 3-Column Mid Section: Your Assigned Tasks | Live Tracking | Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* Left (Col 1-5): Your Assigned Tasks */}
                <div className="lg:col-span-5 bg-white rounded-3xl p-5 sm:p-6 border border-stone-200/80 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ClipboardList className="w-4 h-4 text-emerald-700" />
                      <h3 className="font-extrabold text-stone-900 text-sm sm:text-base">Your Assigned Tasks</h3>
                    </div>
                    <button
                      onClick={() => setActiveTab('tasks')}
                      className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer"
                    >
                      <span>View All</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Tasks List */}
                  <div className="space-y-3.5">
                    {/* Task 1 */}
                    <div className="p-3.5 rounded-2xl border border-stone-200/70 hover:border-emerald-500/50 hover:bg-emerald-50/20 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group">
                      <div className="flex items-center gap-3">
                        <img
                          src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=200&q=80"
                          alt="Fresh Vegetables Box"
                          className="w-14 h-14 rounded-2xl object-cover flex-shrink-0 shadow-sm border border-stone-100"
                        />
                        <div>
                          <h4 className="font-extrabold text-xs text-stone-900 group-hover:text-emerald-900 transition-colors">
                            Pick Up Fresh Vegetables Box
                          </h4>
                          <div className="flex items-center gap-1 text-[11px] text-stone-500 font-medium">
                            <span>Green Table Restaurant</span>
                            <CheckCircle2 className="w-3 h-3 text-emerald-600 fill-emerald-100" />
                          </div>
                          <div className="flex items-center gap-2.5 mt-1 text-[10px] text-stone-500 font-semibold">
                            <span className="flex items-center gap-1 text-stone-700">
                              <MapPin className="w-3 h-3 text-emerald-700" />
                              2.4 km
                            </span>
                            <span className="flex items-center gap-1 text-stone-700">
                              <Clock className="w-3 h-3 text-[#F59E0B]" />
                              Today • 11:00 AM
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Status & Track Button */}
                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2">
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                          In Progress
                        </span>
                        <button
                          onClick={() => {
                            setSelectedTask(tasks[0]);
                            setShowTaskDetailModal(true);
                          }}
                          className="px-4 py-1.5 rounded-xl bg-[#0A3F2F] hover:bg-stone-900 text-white text-[11px] font-bold flex items-center gap-1.5 shadow-sm hover:scale-105 transition-all cursor-pointer"
                        >
                          <span>Track</span>
                          <ArrowRight className="w-3 h-3 text-[#F59E0B]" />
                        </button>
                      </div>
                    </div>

                    {/* Task 2 */}
                    <div className="p-3.5 rounded-2xl border border-stone-200/70 hover:border-emerald-500/50 hover:bg-emerald-50/20 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group">
                      <div className="flex items-center gap-3">
                        <img
                          src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=200&q=80"
                          alt="Cooked Meals"
                          className="w-14 h-14 rounded-2xl object-cover flex-shrink-0 shadow-sm border border-stone-100"
                        />
                        <div>
                          <h4 className="font-extrabold text-xs text-stone-900 group-hover:text-emerald-900 transition-colors">
                            Collect Cooked Meals
                          </h4>
                          <div className="flex items-center gap-1 text-[11px] text-stone-500 font-medium">
                            <span>Sunrise Kitchen</span>
                            <CheckCircle2 className="w-3 h-3 text-emerald-600 fill-emerald-100" />
                          </div>
                          <div className="flex items-center gap-2.5 mt-1 text-[10px] text-stone-500 font-semibold">
                            <span className="flex items-center gap-1 text-stone-700">
                              <MapPin className="w-3 h-3 text-emerald-700" />
                              3.1 km
                            </span>
                            <span className="flex items-center gap-1 text-stone-700">
                              <Clock className="w-3 h-3 text-[#F59E0B]" />
                              Today • 01:00 PM
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Status & View Button */}
                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2">
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                          Scheduled
                        </span>
                        <button
                          onClick={() => {
                            setSelectedTask(tasks[1]);
                            setShowTaskDetailModal(true);
                          }}
                          className="px-4 py-1.5 rounded-xl bg-[#0A3F2F] hover:bg-stone-900 text-white text-[11px] font-bold flex items-center gap-1.5 shadow-sm hover:scale-105 transition-all cursor-pointer"
                        >
                          <span>View</span>
                          <ArrowRight className="w-3 h-3 text-[#F59E0B]" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Middle (Col 6-9): Live Tracking Map */}
                <div className="lg:col-span-4 bg-white rounded-3xl p-5 sm:p-6 border border-stone-200/80 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Navigation className="w-4 h-4 text-emerald-700" />
                        <h3 className="font-extrabold text-stone-900 text-sm sm:text-base">Live Tracking</h3>
                      </div>
                      <button
                        onClick={() => setActiveTab('tracking')}
                        className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Stylized Route Map with Animated Scooter Rider */}
                    <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden border border-stone-200 bg-[#E8F0E8] flex items-center justify-center">
                      
                      {/* SVG Map Graphic */}
                      <svg
                        className="w-full h-full object-cover transition-transform duration-300"
                        style={{ transform: `scale(${mapZoom})` }}
                        viewBox="0 0 450 300"
                      >
                        {/* Background Road Grid */}
                        <rect width="450" height="300" fill="#EBF3E8" />
                        <path d="M0,70 L450,70" stroke="#FFFFFF" strokeWidth="5" />
                        <path d="M0,150 L450,150" stroke="#FFFFFF" strokeWidth="6" />
                        <path d="M0,230 L450,230" stroke="#FFFFFF" strokeWidth="5" />
                        <path d="M100,0 L100,300" stroke="#FFFFFF" strokeWidth="5" />
                        <path d="M220,0 L220,300" stroke="#FFFFFF" strokeWidth="7" />
                        <path d="M340,0 L340,300" stroke="#FFFFFF" strokeWidth="5" />

                        {/* Curved Delivery Green Path */}
                        <path
                          d="M60,180 Q140,210 220,170 T380,180"
                          fill="none"
                          stroke="#10B981"
                          strokeWidth="5"
                          strokeLinecap="round"
                        />
                      </svg>

                      {/* Storefront Pickup Pin (Green Table Restaurant) */}
                      <div className="absolute top-[58%] left-10 transform -translate-x-1/2 -translate-y-1/2 z-10">
                        <div className="w-8 h-8 rounded-full bg-[#0A3F2F] text-white flex items-center justify-center shadow-lg border-2 border-white" title="Pickup: Green Table Restaurant">
                          <Store className="w-4 h-4 text-emerald-300" />
                        </div>
                      </div>

                      {/* Animated Volunteer Rider on Route */}
                      <div className="absolute top-[52%] left-[52%] transform -translate-x-1/2 -translate-y-1/2 z-20">
                        <div className="relative">
                          <div className="w-9 h-9 rounded-full bg-[#F59E0B] text-stone-950 flex items-center justify-center shadow-xl border-2 border-white ring-4 ring-amber-300/60 animate-bounce">
                            <Bike className="w-5 h-5" />
                          </div>
                        </div>
                      </div>

                      {/* Destination Shelter Pin (Hope Foundation) */}
                      <div className="absolute top-[58%] right-10 transform translate-x-1/2 -translate-y-1/2 z-10">
                        <div className="w-8 h-8 rounded-full bg-[#0A3F2F] text-white flex items-center justify-center shadow-lg border-2 border-white" title="Delivery: Hope Foundation">
                          <Heart className="w-4 h-4 text-rose-300" />
                        </div>
                      </div>

                      {/* Floating ETA Badge */}
                      <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full shadow-lg border border-stone-200 flex items-center gap-2 z-20">
                        <Clock className="w-3.5 h-3.5 text-stone-700" />
                        <span className="font-extrabold text-xs text-stone-900">Arriving in 12 min</span>
                      </div>

                      {/* Zoom Controls */}
                      <div className="absolute bottom-3 right-3 flex flex-col gap-1 bg-white rounded-xl shadow-md border border-stone-200 p-1 z-10">
                        <button
                          onClick={() => setMapZoom(Math.min(mapZoom + 0.2, 1.8))}
                          className="w-6 h-6 flex items-center justify-center hover:bg-stone-100 rounded text-stone-700 font-bold"
                          title="Zoom In"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setMapZoom(Math.max(mapZoom - 0.2, 0.8))}
                          className="w-6 h-6 flex items-center justify-center hover:bg-stone-100 rounded text-stone-700 font-bold"
                          title="Zoom Out"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Status Indicator */}
                  <div className="flex items-center justify-center gap-2 pt-3 border-t border-stone-100 mt-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold text-stone-700">Volunteer on the way</span>
                  </div>
                </div>

                {/* Right (Col 10-12): Recent Activity */}
                <div className="lg:col-span-3 bg-white rounded-3xl p-5 sm:p-6 border border-stone-200/80 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-emerald-700" />
                      <h3 className="font-extrabold text-stone-900 text-sm sm:text-base">Recent Activity</h3>
                    </div>
                    <button
                      onClick={() => setActiveTab('notifications')}
                      className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer"
                    >
                      <span>View All</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Vertical Timeline */}
                  <div className="relative pl-6 space-y-5 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200">
                    
                    {/* Item 1 */}
                    <div className="relative flex items-start justify-between gap-2">
                      <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center ring-4 ring-white">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <div>
                        <h5 className="font-bold text-xs text-stone-900">Task Completed</h5>
                        <p className="text-[11px] text-stone-500 font-medium">You delivered food to Community Center</p>
                        <span className="text-[10px] text-stone-400 font-semibold block mt-0.5">2 hours ago</span>
                      </div>
                      <img
                        src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=100&q=80"
                        alt="Task completed"
                        className="w-9 h-9 rounded-xl object-cover flex-shrink-0 shadow-xs border border-stone-100"
                      />
                    </div>

                    {/* Item 2 */}
                    <div className="relative">
                      <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center ring-4 ring-white">
                        <ClipboardList className="w-3 h-3" />
                      </div>
                      <div>
                        <h5 className="font-bold text-xs text-stone-900">New Task Assigned</h5>
                        <p className="text-[11px] text-stone-500 font-medium leading-tight">Pick up Fresh Vegetables Box from Green Table Restaurant</p>
                        <span className="text-[10px] text-stone-400 font-semibold block mt-0.5">3 hours ago</span>
                      </div>
                    </div>

                    {/* Item 3 */}
                    <div className="relative flex items-start justify-between gap-2">
                      <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-[#F59E0B] text-stone-950 flex items-center justify-center ring-4 ring-white">
                        <Trophy className="w-3 h-3 fill-stone-950" />
                      </div>
                      <div>
                        <h5 className="font-bold text-xs text-stone-900">Impact Milestone</h5>
                        <p className="text-[11px] text-stone-500 font-medium">You helped 1,200 people! Keep going!</p>
                        <span className="text-[10px] text-amber-600 font-bold block mt-0.5">1 day ago</span>
                      </div>
                      <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-[#F59E0B] flex-shrink-0">
                        <Award className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Item 4 */}
                    <div className="relative">
                      <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center ring-4 ring-white">
                        <Bell className="w-3 h-3" />
                      </div>
                      <div>
                        <h5 className="font-bold text-xs text-stone-900">New Notification</h5>
                        <p className="text-[11px] text-stone-500 font-medium">Upcoming pickup at 11 AM</p>
                        <span className="text-[10px] text-stone-400 font-semibold block mt-0.5">1 day ago</span>
                      </div>
                    </div>

                  </div>
                </div>

              </div>

              {/* Bottom Row: Today's Schedule | Your Impact | Be the Change Card */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* 1. Today's Schedule (Col 1-4) */}
                <div className="lg:col-span-4 bg-white rounded-3xl p-5 sm:p-6 border border-stone-200/80 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-emerald-700" />
                      <h3 className="font-extrabold text-stone-900 text-sm sm:text-base">Today's Schedule</h3>
                    </div>
                    <button
                      onClick={() => setActiveTab('tasks')}
                      className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer"
                    >
                      <span>View Calendar</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Schedule Stepper */}
                  <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200">
                    
                    {/* 11:00 AM */}
                    <div className="relative">
                      <div className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-emerald-600 ring-4 ring-emerald-100" />
                      <div>
                        <span className="font-black text-xs text-stone-900 block">11:00 AM</span>
                        <h5 className="font-bold text-xs text-stone-800 mt-0.5">Pick up Vegetables Box</h5>
                        <p className="text-[11px] text-stone-400">(Green Table Restaurant)</p>
                      </div>
                    </div>

                    {/* 01:00 PM */}
                    <div className="relative">
                      <div className="absolute -left-6 top-0.5 w-4 h-4 rounded-full border-2 border-emerald-600 bg-white ring-4 ring-white" />
                      <div>
                        <span className="font-black text-xs text-stone-900 block">01:00 PM</span>
                        <h5 className="font-bold text-xs text-stone-800 mt-0.5">Deliver to NGO</h5>
                        <p className="text-[11px] text-stone-400">(Hope Foundation)</p>
                      </div>
                    </div>

                    {/* 03:00 PM */}
                    <div className="relative">
                      <div className="absolute -left-6 top-0.5 w-4 h-4 rounded-full border-2 border-stone-300 bg-white" />
                      <div>
                        <span className="font-black text-xs text-stone-500 block">03:00 PM</span>
                        <h5 className="font-bold text-xs text-stone-700 mt-0.5">Distribution Support</h5>
                        <p className="text-[11px] text-stone-400">(Community Center)</p>
                      </div>
                    </div>

                  </div>
                </div>

                {/* 2. Your Impact (Col 5-8) */}
                <div className="lg:col-span-5 bg-white rounded-3xl p-5 sm:p-6 border border-stone-200/80 shadow-sm flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Leaf className="w-4 h-4 text-emerald-700" />
                      <h3 className="font-extrabold text-stone-900 text-sm sm:text-base">Your Impact</h3>
                    </div>
                    <select className="text-[11px] font-semibold bg-stone-100 border border-stone-200 rounded-full px-2.5 py-1 text-stone-700 focus:outline-none">
                      <option>This Month</option>
                      <option>Last 3 Months</option>
                      <option>All Time</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                    
                    {/* Donut Progress Gauge */}
                    <div className="flex items-center justify-center">
                      <div className="relative w-32 h-32 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="40" stroke="#E5E7EB" strokeWidth="10" fill="transparent" />
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            stroke="#10B981"
                            strokeWidth="10"
                            strokeDasharray="251.2"
                            strokeDashoffset={251.2 * (1 - 0.78)}
                            strokeLinecap="round"
                            fill="transparent"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-2xl font-black text-stone-900">78%</span>
                          <span className="text-[9px] font-bold text-stone-400 uppercase">Goal Met</span>
                        </div>
                      </div>
                    </div>

                    {/* Stats List */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                          <Leaf className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-extrabold text-xs text-stone-900">320 kg</div>
                          <div className="text-[10px] text-stone-500">Food Saved</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
                          <Users className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-extrabold text-xs text-stone-900">1,200</div>
                          <div className="text-[10px] text-stone-500">People Helped</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                          <TreeIcon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-extrabold text-xs text-stone-900">120 kg</div>
                          <div className="text-[10px] text-stone-500">CO₂ Avoided</div>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Graphic Illustration */}
                  <div className="pt-3 border-t border-stone-100 flex items-center justify-center mt-3">
                    <p className="text-[11px] font-semibold text-emerald-800 text-center">
                      🌍 Protecting our planet, one meal rescue at a time.
                    </p>
                  </div>
                </div>

                {/* 3. Be the Change Card (Col 9-12) */}
                <div className="lg:col-span-3 bg-[#0A3F2F] rounded-3xl p-6 text-white shadow-xl border border-emerald-900 flex flex-col justify-between relative overflow-hidden">
                  
                  {/* Decorative Leaf Graphic */}
                  <div className="w-10 h-10 rounded-2xl bg-emerald-800/60 border border-emerald-500/30 flex items-center justify-center text-emerald-300 mb-4">
                    <Leaf className="w-5 h-5 fill-emerald-400" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-black text-white tracking-tight">Be the Change!</h3>
                    <p className="text-xs text-emerald-100/80 leading-relaxed">
                      Together we can build a hunger-free and sustainable world.
                    </p>
                  </div>

                  <div className="pt-6 flex justify-end">
                    <button
                      onClick={() => setActiveTab('tasks')}
                      className="w-10 h-10 rounded-full bg-[#F59E0B] hover:bg-amber-400 text-stone-950 flex items-center justify-center font-bold shadow-md hover:scale-110 transition-transform cursor-pointer"
                      title="Explore available tasks"
                    >
                      <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                    </button>
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
                  <p className="text-xs text-stone-500">Pickups dispatched to your route today</p>
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
                      className="p-5 rounded-3xl border border-stone-200 hover:border-emerald-500 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={task.image}
                          alt={task.title}
                          className="w-16 h-16 rounded-2xl object-cover shadow-sm border border-stone-100"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-extrabold text-sm text-stone-900">{task.title}</h4>
                            <span
                              className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                                task.status === 'In Progress'
                                  ? 'bg-amber-100 text-amber-800'
                                  : task.status === 'Completed'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-blue-100 text-blue-800'
                              }`}
                            >
                              {task.status}
                            </span>
                          </div>
                          <p className="text-xs text-stone-500 font-medium mt-0.5">
                            From: <strong className="text-stone-800">{task.donor}</strong> ➔ To: <strong className="text-stone-800">{task.recipientOrg}</strong>
                          </p>
                          <div className="flex items-center gap-3 text-xs text-stone-600 font-semibold mt-1.5">
                            <span>{task.quantity}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1 text-emerald-700">
                              <MapPin className="w-3 h-3" />
                              {task.distance}
                            </span>
                            <span>•</span>
                            <span>{task.time}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedTask(task);
                            setShowTaskDetailModal(true);
                          }}
                          className="px-5 py-2.5 rounded-xl bg-[#0A3F2F] hover:bg-black text-white text-xs font-bold transition-all cursor-pointer"
                        >
                          {task.status === 'Completed' ? 'View Details' : 'Verify & Handover'}
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 3: LIVE TRACKING                                     */}
          {/* ======================================================== */}
          {activeTab === 'tracking' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-stone-200/80 shadow-sm space-y-6">
                <div>
                  <h2 className="text-xl font-black text-stone-900">Active Navigation Route</h2>
                  <p className="text-xs text-stone-500">Turn-by-turn guidance to Green Table Restaurant</p>
                </div>

                <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 space-y-2">
                  <span className="text-[10px] font-bold uppercase text-emerald-700">Next Maneuver</span>
                  <h4 className="font-extrabold text-sm text-emerald-950">In 350 meters, turn right onto Clematis St</h4>
                  <p className="text-xs text-emerald-800">Destination will be on the right side.</p>
                </div>

                <div className="space-y-3 text-xs text-stone-700">
                  <div className="flex justify-between py-2 border-b border-stone-100">
                    <span className="text-stone-500">Pickup Location:</span>
                    <strong className="text-right">Green Table (125 Palm St)</strong>
                  </div>
                  <div className="flex justify-between py-2 border-b border-stone-100">
                    <span className="text-stone-500">Delivery Location:</span>
                    <strong className="text-right">Hope Foundation Center</strong>
                  </div>
                  <div className="flex justify-between py-2 border-b border-stone-100">
                    <span className="text-stone-500">Handover OTP:</span>
                    <strong className="text-right font-mono text-emerald-700">5821</strong>
                  </div>
                </div>

                <div className="flex gap-2">
                  <a
                    href="tel:+15615550192"
                    className="flex-1 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold text-center flex items-center justify-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Restaurant</span>
                  </a>
                  <button
                    onClick={() => handleCompleteTask('TASK-101')}
                    className="flex-1 py-2.5 rounded-xl bg-[#0A3F2F] hover:bg-black text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    Confirm Delivery
                  </button>
                </div>
              </div>

              <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-stone-200/80 shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-sm text-stone-900">Live GPS Routing Map</h3>
                  <span className="text-xs bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-bold">
                    ETA: 12 Minutes
                  </span>
                </div>
                <div className="w-full h-80 rounded-2xl overflow-hidden border border-stone-200 bg-[#E8F0E8] relative flex items-center justify-center">
                  <svg className="w-full h-full object-cover" viewBox="0 0 500 300">
                    <rect width="500" height="300" fill="#EBF3E8" />
                    <path d="M50,150 Q180,50 320,180 T450,120" fill="none" stroke="#10B981" strokeWidth="6" strokeDasharray="8 6" />
                    <circle cx="50" cy="150" r="10" fill="#0A3F2F" />
                    <circle cx="280" cy="160" r="12" fill="#F59E0B" stroke="#000" strokeWidth="2" />
                    <circle cx="450" cy="120" r="10" fill="#2563EB" />
                  </svg>
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl text-xs font-bold shadow-sm">
                    Green Table (Pickup) ➔ Hope Foundation (Drop-off)
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 4: IMPACT REPORT                                     */}
          {/* ======================================================== */}
          {activeTab === 'impact' && (
            <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-sm space-y-6">
              <div>
                <h2 className="text-xl font-black text-stone-900">Rahul's Volunteer Impact Report</h2>
                <p className="text-xs text-stone-500">Your personal contribution to hunger relief in Palm Beach County</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200">
                  <span className="text-xs text-emerald-700 font-bold block uppercase">Meals Distributed</span>
                  <span className="text-3xl font-black text-emerald-950 mt-1 block">1,200</span>
                  <span className="text-[11px] text-emerald-700 mt-2 block">Reached 4 community shelters</span>
                </div>
                <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200">
                  <span className="text-xs text-amber-700 font-bold block uppercase">Food Rescued</span>
                  <span className="text-3xl font-black text-amber-950 mt-1 block">245 kg</span>
                  <span className="text-[11px] text-amber-700 mt-2 block">Zero transit spoilage</span>
                </div>
                <div className="p-5 rounded-2xl bg-purple-50 border border-purple-200">
                  <span className="text-xs text-purple-700 font-bold block uppercase">CO₂ Offset</span>
                  <span className="text-3xl font-black text-purple-950 mt-1 block">320 kg CO₂</span>
                  <span className="text-[11px] text-purple-700 mt-2 block">Top 5% Volunteer Badge earned</span>
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
                    <p className="text-xs text-stone-600 mt-0.5">Green Table Restaurant has 15 kg Fresh Vegetables ready for pickup.</p>
                    <span className="text-[10px] text-stone-400 mt-1 block font-semibold">3 hours ago</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-bold text-xs text-stone-900">Delivery Confirmed!</h5>
                    <p className="text-xs text-stone-600 mt-0.5">Community Center staff signed off on 12 kg Salad donation.</p>
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
      {/* 3. TASK VERIFICATION & HANDOVER MODAL                    */}
      {/* ======================================================== */}
      {showTaskDetailModal && selectedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 sm:p-7 border border-stone-200 animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowTaskDetailModal(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center font-bold text-sm cursor-pointer"
            >
              ✕
            </button>

            <div className="flex items-center gap-4 pb-4 border-b border-stone-200">
              <img
                src={selectedTask.image}
                alt={selectedTask.title}
                className="w-16 h-16 rounded-2xl object-cover shadow-sm border border-stone-200"
              />
              <div>
                <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
                  {selectedTask.status}
                </span>
                <h3 className="font-extrabold text-base text-stone-900 mt-1">{selectedTask.title}</h3>
                <p className="text-xs text-stone-500 font-medium">Quantity: {selectedTask.quantity}</p>
              </div>
            </div>

            <div className="space-y-4 pt-4 text-xs">
              <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-100 space-y-2">
                <div className="flex justify-between">
                  <span className="text-stone-500 font-bold">Pickup Address:</span>
                  <span className="font-bold text-stone-900 text-right">{selectedTask.pickupAddress}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500 font-bold">Delivery Address:</span>
                  <span className="font-bold text-stone-900 text-right">{selectedTask.deliveryAddress}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500 font-bold">Donor Phone:</span>
                  <span className="font-bold text-emerald-800">{selectedTask.contactPhone}</span>
                </div>
                <div className="flex justify-between items-center pt-1 border-t border-stone-200/60">
                  <span className="text-stone-700 font-bold uppercase text-[11px]">Handover Verification OTP:</span>
                  <span className="font-mono text-sm font-black text-stone-950 bg-amber-100 px-2.5 py-0.5 rounded-md">
                    {selectedTask.otpCode}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowTaskDetailModal(false)}
                  className="px-4 py-2 rounded-xl text-stone-600 text-xs font-bold hover:bg-stone-100 cursor-pointer"
                >
                  Close
                </button>
                {selectedTask.status !== 'Completed' && (
                  <button
                    onClick={() => handleCompleteTask(selectedTask.id)}
                    className="px-6 py-2.5 rounded-xl bg-[#0A3F2F] hover:bg-black text-white text-xs font-bold shadow-md hover:scale-105 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5 text-[#F59E0B] stroke-[3]" />
                    <span>Complete Handover</span>
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

