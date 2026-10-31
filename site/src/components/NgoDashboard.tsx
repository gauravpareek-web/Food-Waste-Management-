import { useState } from 'react';
import {
  LayoutDashboard,
  Search,
  ClipboardList,
  CheckCircle2,
  Truck,
  Box,
  BarChart3,
  Clock,
  Bell,
  Settings,
  HelpCircle,
  MapPin,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Heart,
  ShieldCheck,
  Utensils,
  Leaf,
  Cloud,
  Users,
  Check,
  X,
  Phone,
  Calendar,
  LogOut,
  ChevronRight,
  Plus,
  Minus,
  Sparkles,
  ExternalLink,
  Info,
  Navigation,
  Share2
} from 'lucide-react';
import { UserProfile } from '../types';

interface NgoDashboardProps {
  user?: UserProfile;
  onClose: () => void;
  onSwitchRole?: () => void;
  onSignOut?: () => void;
}

type TabType =
  | 'dashboard'
  | 'explore'
  | 'requests'
  | 'accepted'
  | 'tracking'
  | 'distribution'
  | 'analytics'
  | 'history'
  | 'notifications'
  | 'settings';

interface FoodItem {
  id: string;
  title: string;
  restaurant: string;
  distance: string;
  quantity: string;
  pickupTime: string;
  date: string;
  status: 'Available' | 'Expiring Soon' | 'Claimed';
  category: 'Vegetables' | 'Cooked Meals' | 'Fruits' | 'Bakery';
  image: string;
  storage: string;
  allergens: string;
  donorPhone: string;
  donorAddress: string;
}

export default function NgoDashboard({
  user,
  onClose,
  onSwitchRole,
  onSignOut,
}: NgoDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'All' | 'Vegetables' | 'Cooked Meals' | 'Fruits' | 'Bakery'>('All');
  const [sortOption, setSortOption] = useState<'Nearest First' | 'Expiring Soon' | 'Largest Quantity'>('Nearest First');
  const [selectedItemForClaim, setSelectedItemForClaim] = useState<FoodItem | null>(null);
  const [claimSuccessMessage, setClaimSuccessMessage] = useState<string | null>(null);
  const [selectedMapItem, setSelectedMapItem] = useState<string>('DON-01');
  const [mapZoom, setMapZoom] = useState(1);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [claimQuantity, setClaimQuantity] = useState('Full Surplus');
  const [claimBeneficiary, setClaimBeneficiary] = useState('West Palm Beach Community Shelter');
  const [claimNotes, setClaimNotes] = useState('');

  // Sample Food Surplus Donated by Local Palm Beach Restaurants
  const [availableFood, setAvailableFood] = useState<FoodItem[]>([
    {
      id: 'DON-01',
      title: 'Fresh Vegetable Box',
      restaurant: 'Green Table Restaurant',
      distance: '2.4 km',
      quantity: '15 kg',
      pickupTime: 'Today 12 PM',
      date: 'Apr 27, 2025',
      status: 'Available',
      category: 'Vegetables',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80',
      storage: 'Refrigerated (2-4°C)',
      allergens: 'None',
      donorPhone: '+1 (561) 555-0192',
      donorAddress: '125 Palm Street, West Palm Beach, FL',
    },
    {
      id: 'DON-02',
      title: 'Cooked Meals (Veg)',
      restaurant: 'Sunrise Kitchen',
      distance: '3.1 km',
      quantity: '25 portions',
      pickupTime: 'Today 1 PM',
      date: 'Apr 27, 2025',
      status: 'Expiring Soon',
      category: 'Cooked Meals',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80',
      storage: 'Hot-held (>65°C)',
      allergens: 'Dairy (Paneer)',
      donorPhone: '+1 (561) 555-0178',
      donorAddress: '88 Clematis St, West Palm Beach, FL',
    },
    {
      id: 'DON-03',
      title: 'Bakery Items',
      restaurant: 'Palm Beach Bakery',
      distance: '4.0 km',
      quantity: '10 boxes',
      pickupTime: 'Today 2 PM',
      date: 'Apr 27, 2025',
      status: 'Available',
      category: 'Bakery',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80',
      storage: 'Ambient dry shelf',
      allergens: 'Wheat, Gluten',
      donorPhone: '+1 (561) 555-0143',
      donorAddress: '310 Royal Poinciana Way, Palm Beach, FL',
    },
    {
      id: 'DON-04',
      title: 'Florida Sweet Oranges & Apples',
      restaurant: 'Healthy Bites Cafe',
      distance: '4.8 km',
      quantity: '12 kg',
      pickupTime: 'Today 3:30 PM',
      date: 'Apr 27, 2025',
      status: 'Available',
      category: 'Fruits',
      image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=400&q=80',
      storage: 'Cool dry pantry',
      allergens: 'None',
      donorPhone: '+1 (561) 555-0167',
      donorAddress: '550 S Ocean Blvd, Palm Beach, FL',
    },
  ]);

  // NGO's Outgoing Requests
  const [myRequests, setMyRequests] = useState([
    {
      id: 'REQ-801',
      foodItem: 'Fresh Salad Box',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=200&q=80',
      restaurant: 'Green Table Restaurant',
      quantity: '10 kg',
      requestDate: 'Apr 26, 2025',
      status: 'Pending' as const,
      pickupWindow: 'Today 2:00 PM',
    },
    {
      id: 'REQ-802',
      foodItem: 'Warm Lentil Soup Bowls',
      image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=200&q=80',
      restaurant: 'Harbor Grille',
      quantity: '30 portions',
      requestDate: 'Apr 25, 2025',
      status: 'Accepted' as const,
      pickupWindow: 'Tomorrow 11:30 AM',
    },
  ]);

  // Filter food items based on category and search query
  const filteredFood = availableFood.filter((item) => {
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.restaurant.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleClaimSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItemForClaim) return;

    // Add to My Requests
    const newReq = {
      id: `REQ-${Date.now().toString().slice(-3)}`,
      foodItem: selectedItemForClaim.title,
      image: selectedItemForClaim.image,
      restaurant: selectedItemForClaim.restaurant,
      quantity: selectedItemForClaim.quantity,
      requestDate: 'Apr 27, 2025',
      status: 'Pending' as const,
      pickupWindow: selectedItemForClaim.pickupTime,
    };

    setMyRequests([newReq, ...myRequests]);

    // Show temporary confirmation
    setClaimSuccessMessage(`Claim request sent for ${selectedItemForClaim.title}! Restaurant notified.`);
    setTimeout(() => setClaimSuccessMessage(null), 4000);

    setSelectedItemForClaim(null);
  };

  return (
    <div className="flex h-screen w-full bg-[#F4F6F4] text-[#1C1917] font-sans antialiased overflow-hidden selection:bg-[#F59E0B]/30">
      
      {/* ======================================================== */}
      {/* 1. LEFT SIDEBAR (Deep Forest Green Theme #0A3F2F)         */}
      {/* ======================================================== */}
      <aside className="hidden md:flex flex-col w-64 lg:w-72 bg-[#0A3F2F] text-white flex-shrink-0 z-30 select-none shadow-xl border-r border-[#072F23]">
        {/* Brand Header */}
        <div className="h-20 px-6 flex items-center justify-between border-b border-emerald-900/60 bg-[#072F23]/60">
          <div 
            onClick={onClose}
            className="flex items-center gap-2 cursor-pointer group"
            title="Click to return to homepage"
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

        {/* NGO Profile Header Card */}
        <div className="p-4 border-b border-emerald-900/40">
          <div className="bg-[#072F23] rounded-2xl p-3 border border-emerald-900/50 flex items-center gap-3 shadow-inner">
            <div className="relative">
              <div className="w-11 h-11 rounded-full bg-rose-500/20 border-2 border-rose-400 flex items-center justify-center text-rose-500 shadow-sm overflow-hidden">
                <Heart className="w-6 h-6 fill-rose-500 text-rose-500" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[#072F23]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <h4 className="font-bold text-xs text-white truncate">Hope Foundation</h4>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400/20 flex-shrink-0" />
              </div>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="bg-emerald-500/25 text-emerald-300 text-[10px] px-2 py-0.5 rounded-full font-bold border border-emerald-500/30">
                  Verified NGO
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

          {/* Explore Food */}
          <button
            onClick={() => setActiveTab('explore')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'explore'
                ? 'bg-[#F59E0B] text-stone-950 font-bold shadow-md'
                : 'text-emerald-100/80 hover:bg-emerald-900/40 hover:text-white'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>Explore Food</span>
          </button>

          {/* My Requests */}
          <button
            onClick={() => setActiveTab('requests')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'requests'
                ? 'bg-[#F59E0B] text-stone-950 font-bold shadow-md'
                : 'text-emerald-100/80 hover:bg-emerald-900/40 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <ClipboardList className="w-4 h-4" />
              <span>My Requests</span>
            </div>
            <span className="w-5 h-5 rounded-full bg-emerald-800 text-emerald-200 text-[10px] font-bold flex items-center justify-center">
              {myRequests.length}
            </span>
          </button>

          {/* Accepted Donations */}
          <button
            onClick={() => setActiveTab('accepted')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'accepted'
                ? 'bg-[#F59E0B] text-stone-950 font-bold shadow-md'
                : 'text-emerald-100/80 hover:bg-emerald-900/40 hover:text-white'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Accepted Donations</span>
          </button>

          {/* Pickup Tracking */}
          <button
            onClick={() => setActiveTab('tracking')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'tracking'
                ? 'bg-[#F59E0B] text-stone-950 font-bold shadow-md'
                : 'text-emerald-100/80 hover:bg-emerald-900/40 hover:text-white'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>Pickup Tracking</span>
          </button>

          {/* Distribution */}
          <button
            onClick={() => setActiveTab('distribution')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'distribution'
                ? 'bg-[#F59E0B] text-stone-950 font-bold shadow-md'
                : 'text-emerald-100/80 hover:bg-emerald-900/40 hover:text-white'
            }`}
          >
            <Box className="w-4 h-4" />
            <span>Distribution</span>
          </button>

          {/* Impact Analytics */}
          <button
            onClick={() => setActiveTab('analytics')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'analytics'
                ? 'bg-[#F59E0B] text-stone-950 font-bold shadow-md'
                : 'text-emerald-100/80 hover:bg-emerald-900/40 hover:text-white'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Impact Analytics</span>
          </button>

          {/* History */}
          <button
            onClick={() => setActiveTab('history')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'history'
                ? 'bg-[#F59E0B] text-stone-950 font-bold shadow-md'
                : 'text-emerald-100/80 hover:bg-emerald-900/40 hover:text-white'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>History</span>
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

        {/* Decorative Bottom Motto Card */}
        <div className="p-4 border-t border-emerald-900/40 bg-[#072F23]/60">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-900/60 to-emerald-950/80 p-3.5 border border-emerald-800/40">
            <div className="flex items-center gap-2 mb-1">
              <Leaf className="w-5 h-5 text-emerald-400" />
              <span className="font-serif italic font-bold text-white text-xs tracking-tight">Together We Feed Hope</span>
            </div>
            <p className="text-[10px] text-emerald-200/70 leading-relaxed">
              Empowering Palm Beach charities & communities every day.
            </p>
          </div>

          {/* Quick Exit / Switch buttons */}
          <div className="flex items-center gap-2 mt-3 pt-2 border-t border-emerald-900/30">
            {onSwitchRole && (
              <button
                onClick={onSwitchRole}
                className="flex-1 py-1.5 px-2 bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 rounded-lg text-[10px] font-semibold border border-emerald-800/60 transition-colors text-center cursor-pointer"
                title="Switch to Restaurant Portal"
              >
                Switch Role
              </button>
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

          {/* Search Box */}
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

          {/* Right Controls: Notifications, Help, User Profile */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Notification Bell */}
            <button
              onClick={() => setActiveTab('notifications')}
              className="relative p-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer"
              title="3 New Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[9px] font-black rounded-full flex items-center justify-center border-2 border-white">
                3
              </span>
            </button>

            {/* Help (?) Icon */}
            <button
              onClick={() => setShowHelpModal(true)}
              className="p-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer"
              title="Help & Support"
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            {/* Coordinator Profile Snippet */}
            <div 
              onClick={() => setActiveTab('settings')}
              className="flex items-center gap-3 pl-2 sm:pl-3 border-l border-stone-200 cursor-pointer group"
            >
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80"
                alt="Priya Sharma"
                className="w-9 h-9 rounded-full object-cover border-2 border-emerald-600 shadow-sm group-hover:scale-105 transition-transform"
              />
              <div className="hidden sm:block text-left">
                <div className="font-bold text-xs text-stone-900 leading-tight">
                  Priya Sharma
                </div>
                <div className="text-[10px] text-stone-500 font-medium">
                  NGO Coordinator
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Success Alert Banner (Dismissible) */}
        {claimSuccessMessage && (
          <div className="bg-emerald-600 text-white px-6 py-2.5 flex items-center justify-between text-xs font-semibold animate-in slide-in-from-top duration-300 z-10 shadow-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-200" />
              <span>{claimSuccessMessage}</span>
            </div>
            <button 
              onClick={() => setClaimSuccessMessage(null)}
              className="text-emerald-200 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Scrollable Dashboard Body */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-7 space-y-6 custom-scrollbar bg-[#F4F6F4]">

          {/* ======================================================== */}
          {/* TAB 1: MAIN DASHBOARD (EXACT MATCH OF UPLOADED DESIGN)   */}
          {/* ======================================================== */}
          {activeTab === 'dashboard' && (
            <>
              {/* Top Banner: Good Morning, Hope Foundation! */}
              <div className="relative w-full rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-950 via-[#0A3F2F] to-emerald-900 shadow-xl border border-emerald-900/30">
                <div className="absolute inset-0 opacity-40 mix-blend-overlay">
                  <img
                    src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1600&q=80"
                    alt="Volunteers sharing food"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="relative z-10 p-6 sm:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div className="max-w-2xl space-y-2">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
                      Good Morning, Hope Foundation!
                      <span className="inline-block animate-bounce">👋</span>
                    </h2>
                    <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-xl">
                      Together we can reduce food waste and bring smiles to people in need.
                    </p>
                    <div className="pt-2">
                      <button
                        onClick={() => setActiveTab('explore')}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#072F23] hover:bg-black text-white text-xs font-bold shadow-md hover:scale-105 transition-all border border-emerald-500/30 cursor-pointer"
                      >
                        <span>Explore Nearby Food</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#F59E0B]" />
                      </button>
                    </div>
                  </div>

                  {/* Right Header Thumbnail / Badge */}
                  <div className="hidden lg:flex items-center gap-4 bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/20">
                    <img
                      src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=300&q=80"
                      alt="Food distribution box"
                      className="w-20 h-20 rounded-xl object-cover shadow-sm"
                    />
                    <div className="text-white text-left pr-2">
                      <span className="text-[10px] font-mono text-[#F59E0B] uppercase tracking-wider block font-bold">
                        ACTIVE SERVICE HUB
                      </span>
                      <h4 className="font-bold text-sm">West Palm Beach</h4>
                      <p className="text-[11px] text-emerald-100/80">3 Active volunteer drivers on route</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4 Metric / KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                
                {/* 1. Food Requests */}
                <div className="bg-white rounded-3xl p-5 border border-stone-200/80 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200/60 flex items-center justify-center text-emerald-600">
                      <Box className="w-6 h-6" />
                    </div>
                    <div className="flex items-center gap-1 text-emerald-600 font-bold text-xs bg-emerald-50 px-2 py-0.5 rounded-full">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>12%</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="text-3xl font-black text-stone-900 tracking-tight">42</div>
                    <div className="text-xs font-semibold text-stone-500 mt-0.5">Food Requests</div>
                  </div>
                  {/* Green Sparkline Curve */}
                  <div className="mt-3 h-8 w-full">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 100 25" preserveAspectRatio="none">
                      <path
                        d="M0 20 Q 25 22, 50 14 T 100 4"
                        fill="none"
                        stroke="#10B981"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>

                {/* 2. Meals Received */}
                <div className="bg-white rounded-3xl p-5 border border-stone-200/80 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200/60 flex items-center justify-center text-[#F59E0B]">
                      <Utensils className="w-6 h-6" />
                    </div>
                    <div className="flex items-center gap-1 text-emerald-600 font-bold text-xs bg-emerald-50 px-2 py-0.5 rounded-full">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>18%</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="text-3xl font-black text-stone-900 tracking-tight">1,850</div>
                    <div className="text-xs font-semibold text-stone-500 mt-0.5">Meals Received</div>
                  </div>
                  {/* Orange Sparkline Curve */}
                  <div className="mt-3 h-8 w-full">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 100 25" preserveAspectRatio="none">
                      <path
                        d="M0 22 Q 25 18, 50 16 T 100 5"
                        fill="none"
                        stroke="#F59E0B"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>

                {/* 3. People Helped */}
                <div className="bg-white rounded-3xl p-5 border border-stone-200/80 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200/60 flex items-center justify-center text-teal-600">
                      <Users className="w-6 h-6" />
                    </div>
                    <div className="flex items-center gap-1 text-emerald-600 font-bold text-xs bg-emerald-50 px-2 py-0.5 rounded-full">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>15%</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="text-3xl font-black text-stone-900 tracking-tight">520</div>
                    <div className="text-xs font-semibold text-stone-500 mt-0.5">People Helped</div>
                  </div>
                  {/* Teal Sparkline Curve */}
                  <div className="mt-3 h-8 w-full">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 100 25" preserveAspectRatio="none">
                      <path
                        d="M0 20 Q 30 22, 60 12 T 100 6"
                        fill="none"
                        stroke="#0D9488"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>

                {/* 4. Pending Pickups */}
                <div className="bg-white rounded-3xl p-5 border border-stone-200/80 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200/60 flex items-center justify-center text-purple-600">
                      <Leaf className="w-6 h-6" />
                    </div>
                    <div className="flex items-center gap-1 text-rose-600 font-bold text-xs bg-rose-50 px-2 py-0.5 rounded-full">
                      <TrendingDown className="w-3.5 h-3.5" />
                      <span>2%</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="text-3xl font-black text-stone-900 tracking-tight">6</div>
                    <div className="text-xs font-semibold text-stone-500 mt-0.5">Pending Pickups</div>
                  </div>
                  {/* Purple Sparkline Curve */}
                  <div className="mt-3 h-8 w-full">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 100 25" preserveAspectRatio="none">
                      <path
                        d="M0 10 Q 30 8, 60 16 T 100 20"
                        fill="none"
                        stroke="#9333EA"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>

              </div>

              {/* 3-Column Mid Section: Nearby Food | Map View | Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* Left (Col 1-5): Nearby Available Food */}
                <div className="lg:col-span-5 bg-white rounded-3xl p-5 sm:p-6 border border-stone-200/80 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Utensils className="w-4 h-4 text-emerald-700" />
                      <h3 className="font-extrabold text-stone-900 text-sm sm:text-base">Nearby Available Food</h3>
                    </div>
                    <button
                      onClick={() => setActiveTab('explore')}
                      className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer"
                    >
                      <span>View All</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Filter Chips & Sort */}
                  <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {(['All', 'Vegetables', 'Cooked Meals', 'Fruits', 'Bakery'] as const).map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setCategoryFilter(cat)}
                          className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                            categoryFilter === cat
                              ? 'bg-[#0A3F2F] text-white shadow-sm'
                              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                    <select
                      value={sortOption}
                      onChange={(e) => setSortOption(e.target.value as any)}
                      className="text-[11px] font-semibold bg-stone-100 border border-stone-200 rounded-full px-2.5 py-1 text-stone-700 focus:outline-none cursor-pointer"
                    >
                      <option>Nearest First</option>
                      <option>Expiring Soon</option>
                      <option>Largest Quantity</option>
                    </select>
                  </div>

                  {/* Food Items List */}
                  <div className="space-y-3">
                    {filteredFood.slice(0, 3).map((item) => (
                      <div
                        key={item.id}
                        className="p-3.5 rounded-2xl border border-stone-200/70 hover:border-emerald-500/50 hover:bg-emerald-50/20 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-14 h-14 rounded-2xl object-cover flex-shrink-0 shadow-sm border border-stone-100"
                          />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <h4 className="font-extrabold text-xs text-stone-900 group-hover:text-emerald-900 transition-colors">
                                {item.title}
                              </h4>
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" />
                            </div>
                            <p className="text-[11px] text-stone-500 font-medium">
                              {item.restaurant} • <span className="font-semibold text-stone-700">{item.distance}</span>
                            </p>
                            <div className="flex items-center gap-2 mt-1 text-[10px] text-stone-500 font-semibold">
                              <span className="bg-stone-100 px-2 py-0.5 rounded-md text-stone-800">{item.quantity}</span>
                              <span className="flex items-center gap-1 text-emerald-700">
                                <Clock className="w-2.5 h-2.5" />
                                {item.pickupTime}
                              </span>
                              <span className="text-stone-400">{item.date}</span>
                            </div>
                          </div>
                        </div>

                        {/* Status & Claim Button */}
                        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2">
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                              item.status === 'Expiring Soon'
                                ? 'bg-amber-100 text-amber-800 border-amber-300'
                                : 'bg-emerald-100 text-emerald-800 border-emerald-200'
                            }`}
                          >
                            {item.status}
                          </span>
                          <button
                            onClick={() => setSelectedItemForClaim(item)}
                            className="px-3.5 py-1.5 rounded-xl bg-[#0A3F2F] hover:bg-stone-900 text-white text-[11px] font-bold flex items-center gap-1.5 shadow-sm hover:scale-105 transition-all cursor-pointer"
                          >
                            <span>Claim Food</span>
                            <ArrowRight className="w-3 h-3 text-[#F59E0B]" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Middle (Col 6-9): Nearby Donations Map */}
                <div className="lg:col-span-4 bg-white rounded-3xl p-5 sm:p-6 border border-stone-200/80 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-emerald-700" />
                        <h3 className="font-extrabold text-stone-900 text-sm sm:text-base">Nearby Donations Map</h3>
                      </div>
                      <button
                        onClick={() => setActiveTab('explore')}
                        className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer"
                      >
                        <span>View Full Map</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Stylized Coastal Map Component */}
                    <div className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden border border-stone-200 bg-[#E8F0E8] flex items-center justify-center">
                      
                      {/* SVG Map Background with Coastline and Roadways */}
                      <svg
                        className="w-full h-full object-cover transition-transform duration-300"
                        style={{ transform: `scale(${mapZoom})` }}
                        viewBox="0 0 500 350"
                      >
                        {/* Land mass */}
                        <rect x="0" y="0" width="380" height="350" fill="#EBF3E8" />
                        {/* Lake / Intracoastal Waterway */}
                        <path
                          d="M380,0 Q370,120 385,200 T390,350 L500,350 L500,0 Z"
                          fill="#D4E6F1"
                        />
                        {/* Island Barrier (Palm Beach) */}
                        <path
                          d="M420,10 Q430,150 425,340 L445,340 Q450,150 440,10 Z"
                          fill="#EBF3E8"
                          stroke="#BDD7EE"
                          strokeWidth="2"
                        />
                        {/* Atlantic Ocean */}
                        <rect x="445" y="0" width="55" height="350" fill="#CCE5FF" />
                        
                        {/* Arterial Roads & Avenues */}
                        <path d="M0,80 L380,80" stroke="#FFFFFF" strokeWidth="6" />
                        <path d="M0,170 L425,170" stroke="#FFFFFF" strokeWidth="8" />
                        <path d="M0,260 L390,260" stroke="#FFFFFF" strokeWidth="6" />
                        <path d="M120,0 L120,350" stroke="#FFFFFF" strokeWidth="6" />
                        <path d="M260,0 L260,350" stroke="#FFFFFF" strokeWidth="7" />
                        <path d="M360,0 L360,350" stroke="#FFFFFF" strokeWidth="5" />
                        
                        {/* Highway Interstate I-95 */}
                        <path
                          d="M190,0 Q180,160 200,350"
                          stroke="#FDE047"
                          strokeWidth="4"
                          strokeDasharray="4 2"
                        />

                        {/* City Label */}
                        <rect x="230" y="240" width="110" height="28" rx="14" fill="#0A3F2F" />
                        <text x="285" y="258" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle">
                          Palm Beach
                        </text>
                      </svg>

                      {/* Map Pins */}
                      {/* Pin 1: Available (Green Table) */}
                      <div
                        onClick={() => setSelectedMapItem('DON-01')}
                        className="absolute top-16 left-28 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 group"
                      >
                        <div className="w-8 h-8 rounded-full bg-[#0A3F2F] text-white flex items-center justify-center shadow-lg border-2 border-white group-hover:scale-125 transition-transform">
                          <Leaf className="w-4 h-4 text-emerald-300" />
                        </div>
                      </div>

                      {/* Pin 2: Expiring Soon (Sunrise Kitchen) */}
                      <div
                        onClick={() => setSelectedMapItem('DON-02')}
                        className="absolute top-36 left-48 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 group"
                      >
                        <div className="w-8 h-8 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center shadow-lg border-2 border-white group-hover:scale-125 transition-transform">
                          <Utensils className="w-4 h-4" />
                        </div>
                      </div>

                      {/* Pin 3: Your Location (Hope Foundation) */}
                      <div className="absolute top-48 left-36 transform -translate-x-1/2 -translate-y-1/2 z-10">
                        <div className="relative">
                          <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xl border-2 border-white ring-4 ring-blue-300/50 animate-pulse">
                            <Heart className="w-4 h-4 fill-white" />
                          </div>
                          <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-blue-900 text-white text-[9px] font-bold px-1.5 py-0.2 rounded whitespace-nowrap">
                            You
                          </span>
                        </div>
                      </div>

                      {/* Pin 4: Palm Beach Bakery */}
                      <div
                        onClick={() => setSelectedMapItem('DON-03')}
                        className="absolute top-24 right-20 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 group"
                      >
                        <div className="w-8 h-8 rounded-full bg-[#0A3F2F] text-white flex items-center justify-center shadow-lg border-2 border-white group-hover:scale-125 transition-transform">
                          <Box className="w-4 h-4 text-amber-300" />
                        </div>
                      </div>

                      {/* Selected Item Floating Tooltip Preview */}
                      <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md rounded-2xl p-2.5 shadow-xl border border-stone-200 flex items-center gap-2.5 z-20 max-w-[90%]">
                        <img
                          src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=120&q=80"
                          alt="Fresh Vegetable Box"
                          className="w-10 h-10 rounded-xl object-cover"
                        />
                        <div className="text-left pr-2">
                          <div className="font-extrabold text-xs text-stone-900">Fresh Vegetable Box</div>
                          <div className="text-[10px] text-stone-500 font-semibold">2.4 km • 15 kg</div>
                        </div>
                        <button
                          onClick={() => setSelectedItemForClaim(availableFood[0])}
                          className="bg-[#0A3F2F] text-white text-[10px] font-bold px-2 py-1 rounded-lg hover:bg-black"
                        >
                          Claim
                        </button>
                      </div>

                      {/* Map Zoom Controls */}
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

                  {/* Map Legend */}
                  <div className="flex items-center justify-between text-[11px] font-semibold text-stone-600 pt-3 border-t border-stone-100 mt-2">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                      <span>Available</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                      <span>Expiring Soon</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                      <span>Your Location</span>
                    </div>
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
                  <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200">
                    
                    {/* Event 1 */}
                    <div className="relative">
                      <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center ring-4 ring-white">
                        <Leaf className="w-3 h-3" />
                      </div>
                      <div>
                        <h5 className="font-bold text-xs text-stone-900">New donation posted</h5>
                        <p className="text-[11px] text-stone-500 font-medium">Fresh Vegetables Box</p>
                        <span className="text-[10px] text-stone-400 font-semibold block mt-0.5">2 mins ago</span>
                      </div>
                    </div>

                    {/* Event 2 */}
                    <div className="relative">
                      <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center ring-4 ring-white">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <div>
                        <h5 className="font-bold text-xs text-stone-900">Your request accepted</h5>
                        <p className="text-[11px] text-stone-500 font-medium">25 portions of Meals</p>
                        <span className="text-[10px] text-stone-400 font-semibold block mt-0.5">15 mins ago</span>
                      </div>
                    </div>

                    {/* Event 3 */}
                    <div className="relative">
                      <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center ring-4 ring-white">
                        <Truck className="w-3 h-3" />
                      </div>
                      <div>
                        <h5 className="font-bold text-xs text-stone-900">Pickup scheduled</h5>
                        <p className="text-[11px] text-stone-500 font-medium">Today at 1:00 PM</p>
                        <span className="text-[10px] text-blue-600 font-bold block mt-0.5">By Volunteer Rahul</span>
                      </div>
                    </div>

                    {/* Event 4 */}
                    <div className="relative">
                      <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center ring-4 ring-white">
                        <CheckCircle2 className="w-3 h-3" />
                      </div>
                      <div>
                        <h5 className="font-bold text-xs text-stone-900">Food delivered</h5>
                        <p className="text-[11px] text-stone-500 font-medium">To Community Center</p>
                        <span className="text-[10px] text-stone-400 font-semibold block mt-0.5">1 hour ago</span>
                      </div>
                    </div>

                  </div>
                </div>

              </div>

              {/* Bottom Row: My Food Requests (Left) & Our Impact Together (Right) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* My Food Requests Table (Col 1-7) */}
                <div className="lg:col-span-7 bg-white rounded-3xl p-5 sm:p-6 border border-stone-200/80 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ClipboardList className="w-4 h-4 text-emerald-700" />
                      <h3 className="font-extrabold text-stone-900 text-sm sm:text-base">My Food Requests</h3>
                    </div>
                    <button
                      onClick={() => setActiveTab('requests')}
                      className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer"
                    >
                      <span>View All</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-stone-200 text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                          <th className="pb-3 pl-2">Food Item</th>
                          <th className="pb-3">Restaurant</th>
                          <th className="pb-3">Quantity</th>
                          <th className="pb-3">Request Date</th>
                          <th className="pb-3">Status</th>
                          <th className="pb-3 pr-2 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100 text-xs">
                        {myRequests.map((req) => (
                          <tr key={req.id} className="hover:bg-stone-50/80 transition-colors">
                            <td className="py-3.5 pl-2 font-bold text-stone-900 flex items-center gap-2.5">
                              <img
                                src={req.image}
                                alt={req.foodItem}
                                className="w-9 h-9 rounded-xl object-cover shadow-xs border border-stone-200"
                              />
                              <span>{req.foodItem}</span>
                            </td>
                            <td className="py-3.5 text-stone-600 font-medium">{req.restaurant}</td>
                            <td className="py-3.5 font-bold text-stone-900">{req.quantity}</td>
                            <td className="py-3.5 text-stone-500 font-medium">{req.requestDate}</td>
                            <td className="py-3.5">
                              <span
                                className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                                  req.status === 'Pending'
                                    ? 'bg-amber-100 text-amber-800 border-amber-200'
                                    : 'bg-emerald-100 text-emerald-800 border-emerald-200'
                                }`}
                              >
                                {req.status}
                              </span>
                            </td>
                            <td className="py-3.5 pr-2 text-right">
                              <button
                                onClick={() => setActiveTab('requests')}
                                className="px-3 py-1 bg-stone-900 hover:bg-black text-white text-[11px] font-bold rounded-lg transition-colors cursor-pointer"
                              >
                                View
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Our Impact Together (Col 8-12) */}
                <div className="lg:col-span-5 bg-gradient-to-br from-[#072F23] to-[#0A3F2F] rounded-3xl p-6 sm:p-7 text-white shadow-xl border border-emerald-900 flex flex-col justify-between relative overflow-hidden">
                  
                  {/* Decorative Globe & Hands watermark graphic */}
                  <div className="absolute -right-6 -bottom-6 w-48 h-48 opacity-15 pointer-events-none">
                    <svg viewBox="0 0 200 200" fill="currentColor">
                      <circle cx="100" cy="100" r="80" />
                      <path d="M60,100 C60,60 140,60 140,100 C140,140 60,140 60,100" fill="#F59E0B" />
                    </svg>
                  </div>

                  <div className="space-y-2 relative z-10">
                    <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">Our Impact Together</h3>
                    <p className="text-xs text-emerald-100/80 leading-relaxed max-w-sm">
                      You've helped in rescuing food and reducing environmental waste.
                    </p>
                    <div className="pt-2">
                      <button
                        onClick={() => setActiveTab('analytics')}
                        className="px-5 py-2.5 rounded-full bg-[#F59E0B] hover:bg-amber-400 text-stone-950 font-black text-xs shadow-md transition-all hover:scale-105 cursor-pointer"
                      >
                        View Impact Report →
                      </button>
                    </div>
                  </div>

                  {/* 3 Metrics Row */}
                  <div className="grid grid-cols-3 gap-3 pt-6 mt-6 border-t border-emerald-800/60 relative z-10">
                    <div>
                      <div className="flex items-center gap-1.5 text-amber-400 mb-1">
                        <Utensils className="w-4 h-4" />
                      </div>
                      <div className="text-xl sm:text-2xl font-black text-white">1,850</div>
                      <div className="text-[10px] font-semibold text-emerald-200/80">Meals Rescued</div>
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5 text-emerald-400 mb-1">
                        <Leaf className="w-4 h-4" />
                      </div>
                      <div className="text-xl sm:text-2xl font-black text-white">520 kg</div>
                      <div className="text-[10px] font-semibold text-emerald-200/80">Food Saved</div>
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5 text-teal-300 mb-1">
                        <Cloud className="w-4 h-4" />
                      </div>
                      <div className="text-xl sm:text-2xl font-black text-white">720 kg</div>
                      <div className="text-[10px] font-semibold text-emerald-200/80">CO₂ Avoided</div>
                    </div>
                  </div>

                </div>

              </div>
            </>
          )}

          {/* ======================================================== */}
          {/* TAB 2: EXPLORE FOOD (Full Gallery View)                  */}
          {/* ======================================================== */}
          {activeTab === 'explore' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-stone-200/80">
                <div>
                  <h2 className="text-xl font-black text-stone-900">Explore Available Surplus Food</h2>
                  <p className="text-xs text-stone-500">Real-time surplus listings ready for immediate rescue in Palm Beach</p>
                </div>
                <div className="flex items-center gap-2">
                  {(['All', 'Vegetables', 'Cooked Meals', 'Fruits', 'Bakery'] as const).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategoryFilter(cat)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                        categoryFilter === cat
                          ? 'bg-[#0A3F2F] text-white'
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFood.map((food) => (
                  <div
                    key={food.id}
                    className="bg-white rounded-3xl overflow-hidden border border-stone-200/80 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="relative h-48 w-full overflow-hidden">
                        <img
                          src={food.image}
                          alt={food.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <span
                          className={`absolute top-3 right-3 px-3 py-1 rounded-full text-[11px] font-bold shadow-md ${
                            food.status === 'Expiring Soon'
                              ? 'bg-amber-500 text-stone-950'
                              : 'bg-emerald-600 text-white'
                          }`}
                        >
                          {food.status}
                        </span>
                        <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-white text-[11px] font-bold flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#F59E0B]" />
                          <span>{food.distance} away</span>
                        </div>
                      </div>

                      <div className="p-5 space-y-3">
                        <div>
                          <h3 className="font-extrabold text-base text-stone-900">{food.title}</h3>
                          <p className="text-xs text-stone-500 font-medium">{food.restaurant}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs text-stone-600 bg-stone-50 p-3 rounded-2xl">
                          <div>
                            <span className="text-[10px] text-stone-400 font-bold block uppercase">Quantity</span>
                            <span className="font-bold text-stone-900">{food.quantity}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-stone-400 font-bold block uppercase">Storage</span>
                            <span className="font-bold text-stone-900">{food.storage}</span>
                          </div>
                          <div className="col-span-2">
                            <span className="text-[10px] text-stone-400 font-bold block uppercase">Pickup Window</span>
                            <span className="font-bold text-emerald-800">{food.pickupTime} ({food.date})</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 pt-0">
                      <button
                        onClick={() => setSelectedItemForClaim(food)}
                        className="w-full py-3 rounded-2xl bg-[#0A3F2F] hover:bg-stone-900 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                      >
                        <span>Claim This Food Surplus</span>
                        <ArrowRight className="w-4 h-4 text-[#F59E0B]" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 3: MY REQUESTS TAB                                   */}
          {/* ======================================================== */}
          {activeTab === 'requests' && (
            <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-stone-900">Food Requests Sent to Donors</h2>
                  <p className="text-xs text-stone-500">Track and manage reservations submitted to commercial kitchens</p>
                </div>
                <button
                  onClick={() => setActiveTab('explore')}
                  className="px-4 py-2 bg-[#0A3F2F] text-white text-xs font-bold rounded-full hover:bg-black transition-colors cursor-pointer"
                >
                  + Request More Food
                </button>
              </div>

              <div className="space-y-4">
                {myRequests.map((req) => (
                  <div
                    key={req.id}
                    className="p-4 rounded-2xl border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-emerald-500 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <img src={req.image} alt={req.foodItem} className="w-16 h-16 rounded-2xl object-cover shadow-sm" />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-extrabold text-sm text-stone-900">{req.foodItem}</h4>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              req.status === 'Pending'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {req.status}
                          </span>
                        </div>
                        <p className="text-xs text-stone-500 font-medium">Donor: {req.restaurant}</p>
                        <p className="text-xs text-stone-700 font-bold mt-1">Quantity: {req.quantity} • Pickup: {req.pickupWindow}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setActiveTab('tracking')}
                        className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-colors cursor-pointer"
                      >
                        Track Status
                      </button>
                      <button
                        onClick={() => setMyRequests(myRequests.filter((r) => r.id !== req.id))}
                        className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 transition-colors"
                        title="Cancel Request"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 4: ACCEPTED DONATIONS                                */}
          {/* ======================================================== */}
          {activeTab === 'accepted' && (
            <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-sm space-y-6">
              <div>
                <h2 className="text-xl font-black text-stone-900">Accepted Surplus Ready for Handover</h2>
                <p className="text-xs text-stone-500">Commercial kitchens that approved your request. Show the verification code at pickup.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-3xl border-2 border-emerald-500 bg-emerald-50/20 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                      Ready for Pickup
                    </span>
                    <span className="font-mono text-xs font-bold text-emerald-800">OTP: 4892</span>
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-stone-900">Cooked Meals (Veg) - 25 Portions</h3>
                    <p className="text-xs text-stone-500">Sunrise Kitchen • 88 Clematis St, West Palm Beach</p>
                  </div>
                  <div className="bg-white p-3 rounded-2xl border border-stone-200 text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-stone-500">Donor Contact:</span>
                      <span className="font-bold text-stone-900">+1 (561) 555-0178</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Assigned Volunteer:</span>
                      <span className="font-bold text-emerald-800">Rahul (Van #4)</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab('tracking')}
                    className="w-full py-2.5 rounded-xl bg-[#0A3F2F] text-white text-xs font-bold hover:bg-black transition-colors"
                  >
                    Open Live GPS Tracking
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 5: PICKUP TRACKING                                   */}
          {/* ======================================================== */}
          {activeTab === 'tracking' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-stone-200/80 shadow-sm space-y-6">
                <div>
                  <h2 className="text-xl font-black text-stone-900">Live Delivery Tracking</h2>
                  <p className="text-xs text-stone-500">Tracking volunteer vehicle en route to Sunrise Kitchen</p>
                </div>

                <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold">
                      RS
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-stone-900">Rahul Sharma</h4>
                      <p className="text-[11px] text-stone-500">Palm Beach Rescue Driver</p>
                    </div>
                  </div>
                  <a
                    href="tel:+15615550188"
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0A3F2F] text-white rounded-xl text-xs font-bold hover:bg-black transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call</span>
                  </a>
                </div>

                {/* Progress Stepper */}
                <div className="space-y-4 pl-2">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <div>
                      <h5 className="font-bold text-xs text-stone-900">Task Dispatched</h5>
                      <p className="text-[10px] text-stone-400">10:15 AM</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <div>
                      <h5 className="font-bold text-xs text-stone-900">Volunteer Arrived at Kitchen</h5>
                      <p className="text-[10px] text-stone-400">10:45 AM</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full border-2 border-emerald-600 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping" />
                    </div>
                    <div>
                      <h5 className="font-bold text-xs text-emerald-800">Food Picked Up - On the Way</h5>
                      <p className="text-[10px] text-emerald-600 font-semibold">ETA ~ 12 Minutes</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 opacity-50">
                    <div className="w-5 h-5 rounded-full border-2 border-stone-300" />
                    <div>
                      <h5 className="font-bold text-xs text-stone-500">Drop-off at Hope Foundation Shelter</h5>
                      <p className="text-[10px] text-stone-400">Pending</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Live Map Representation */}
              <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-stone-200/80 shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-sm text-stone-900">Volunteer GPS Route</h3>
                  <span className="text-xs bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-bold">
                    Vehicle Moving (28 km/h)
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
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-bold shadow-sm">
                    Green Table (Pickup) ➔ Hope Foundation (Drop-off)
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 6: IMPACT ANALYTICS                                  */}
          {/* ======================================================== */}
          {activeTab === 'analytics' && (
            <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-stone-900">Hope Foundation Impact Analytics</h2>
                  <p className="text-xs text-stone-500">Verified audit trail of surplus redistribution & carbon offset in Palm Beach County</p>
                </div>
                <button className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs rounded-full cursor-pointer">
                  Export PDF Report
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200">
                  <span className="text-xs text-emerald-700 font-bold block uppercase">Total Meals Rescued</span>
                  <span className="text-3xl font-black text-emerald-950 mt-1 block">1,850</span>
                  <span className="text-[11px] text-emerald-700 mt-2 block">+18% compared to last quarter</span>
                </div>
                <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200">
                  <span className="text-xs text-amber-700 font-bold block uppercase">Edible Food Recovered</span>
                  <span className="text-3xl font-black text-amber-950 mt-1 block">520 kg</span>
                  <span className="text-[11px] text-amber-700 mt-2 block">Zero safe surplus wasted</span>
                </div>
                <div className="p-5 rounded-2xl bg-teal-50 border border-teal-200">
                  <span className="text-xs text-teal-700 font-bold block uppercase">CO₂ Footprint Avoided</span>
                  <span className="text-3xl font-black text-teal-950 mt-1 block">720 kg CO₂</span>
                  <span className="text-[11px] text-teal-700 mt-2 block">Equivalent to 62 planted trees</span>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 7: SETTINGS & PROFILE                                */}
          {/* ======================================================== */}
          {activeTab === 'settings' && (
            <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-sm max-w-3xl space-y-6">
              <div>
                <h2 className="text-xl font-black text-stone-900">Hope Foundation Profile & Settings</h2>
                <p className="text-xs text-stone-500">Configure your NGO registry, contact info, and distribution capacity</p>
              </div>

              <div className="flex items-center gap-4 pb-6 border-b border-stone-200">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
                  alt="Priya Sharma"
                  className="w-16 h-16 rounded-full object-cover border-2 border-emerald-600 shadow-md"
                />
                <div>
                  <h4 className="font-extrabold text-sm text-stone-900">Priya Sharma</h4>
                  <p className="text-xs text-stone-500">NGO Coordinator • Hope Foundation</p>
                  <span className="mt-1 inline-block bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    FL Registered Charity #501(c)(3)
                  </span>
                </div>
              </div>

              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Settings saved successfully!'); }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">Organization Name</label>
                    <input
                      type="text"
                      defaultValue="Hope Foundation"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-emerald-600 font-medium"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">Coordinator Email</label>
                    <input
                      type="email"
                      defaultValue="hope.foundation@palmbeachharvest.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-emerald-600 font-medium"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">Phone Number</label>
                    <input
                      type="text"
                      defaultValue="+1 (561) 555-0144"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-emerald-600 font-medium"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">Primary Distribution Center</label>
                    <input
                      type="text"
                      defaultValue="420 Palm Beach Lakes Blvd, FL"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-emerald-600 font-medium"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#0A3F2F] hover:bg-black text-white text-xs font-bold rounded-xl shadow-md transition-colors cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 8: NOTIFICATIONS                                     */}
          {/* ======================================================== */}
          {activeTab === 'notifications' && (
            <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-sm max-w-3xl space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-stone-900">Notifications & Alerts</h2>
                  <p className="text-xs text-stone-500">Live feed of surplus postings and pickup status updates</p>
                </div>
                <button
                  onClick={() => alert('Marked all as read')}
                  className="text-xs font-bold text-emerald-800 hover:text-emerald-950"
                >
                  Mark all as read
                </button>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Leaf className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-bold text-xs text-stone-900">Fresh surplus donation posted!</h5>
                    <p className="text-xs text-stone-600 mt-0.5">Green Table Restaurant added 15 kg of Fresh Vegetables Box.</p>
                    <span className="text-[10px] text-stone-400 mt-1 block font-semibold">2 mins ago</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-bold text-xs text-stone-900">Expiring surplus alert</h5>
                    <p className="text-xs text-stone-600 mt-0.5">Sunrise Kitchen's cooked meals will expire in 2 hours.</p>
                    <span className="text-[10px] text-stone-400 mt-1 block font-semibold">15 mins ago</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-200 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Truck className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-bold text-xs text-stone-900">Pickup assigned to Volunteer Rahul</h5>
                    <p className="text-xs text-stone-600 mt-0.5">Vehicle en route to collect 25 portions of prepared meals.</p>
                    <span className="text-[10px] text-stone-400 mt-1 block font-semibold">45 mins ago</span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>

        {/* ======================================================== */}
        {/* BOTTOM TICKER BANNER (Identical to reference mockup)    */}
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
      {/* 3. CLAIM FOOD MODAL                                      */}
      {/* ======================================================== */}
      {selectedItemForClaim && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 sm:p-7 border border-stone-200 animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedItemForClaim(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center font-bold text-sm cursor-pointer"
            >
              ✕
            </button>

            <div className="flex items-center gap-4 pb-4 border-b border-stone-200">
              <img
                src={selectedItemForClaim.image}
                alt={selectedItemForClaim.title}
                className="w-16 h-16 rounded-2xl object-cover shadow-sm border border-stone-200"
              />
              <div>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                  {selectedItemForClaim.status}
                </span>
                <h3 className="font-extrabold text-lg text-stone-900 mt-1">{selectedItemForClaim.title}</h3>
                <p className="text-xs text-stone-500 font-medium">Donor: {selectedItemForClaim.restaurant} ({selectedItemForClaim.distance})</p>
              </div>
            </div>

            <form onSubmit={handleClaimSubmit} className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-3 text-xs bg-stone-50 p-3.5 rounded-2xl border border-stone-100">
                <div>
                  <span className="text-stone-400 font-bold block uppercase text-[10px]">Total Available</span>
                  <span className="font-bold text-stone-900">{selectedItemForClaim.quantity}</span>
                </div>
                <div>
                  <span className="text-stone-400 font-bold block uppercase text-[10px]">Storage Condition</span>
                  <span className="font-bold text-stone-900">{selectedItemForClaim.storage}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-stone-400 font-bold block uppercase text-[10px]">Pickup Deadline</span>
                  <span className="font-bold text-emerald-800">{selectedItemForClaim.pickupTime} ({selectedItemForClaim.date})</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Quantity to Claim</label>
                <select
                  value={claimQuantity}
                  onChange={(e) => setClaimQuantity(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs font-medium focus:outline-none focus:border-emerald-600 bg-white"
                >
                  <option>Full Surplus ({selectedItemForClaim.quantity})</option>
                  <option>50% Partial Batch</option>
                  <option>Emergency Need Only (25%)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Target Beneficiary Facility</label>
                <input
                  type="text"
                  value={claimBeneficiary}
                  onChange={(e) => setClaimBeneficiary(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs font-medium focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Pickup Notes / Instructions for Kitchen</label>
                <textarea
                  rows={2}
                  value={claimNotes}
                  onChange={(e) => setClaimNotes(e.target.value)}
                  placeholder="e.g. Volunteer driver will arrive with insulated cool-boxes at 11:45 AM"
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setSelectedItemForClaim(null)}
                  className="px-4 py-2 rounded-xl text-stone-600 text-xs font-bold hover:bg-stone-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#0A3F2F] hover:bg-black text-white text-xs font-bold shadow-md hover:scale-105 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Submit Food Claim Request</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#F59E0B]" />
                </button>
              </div>
            </form>
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
                <h3 className="font-extrabold text-base text-stone-900">Palm Beach Harvest NGO Support</h3>
                <p className="text-xs text-stone-500">24/7 Coordinator Assistance</p>
              </div>
            </div>
            <div className="space-y-3 text-xs text-stone-600">
              <p>For urgent food surplus routing or logistics questions, contact our volunteer dispatch coordinator:</p>
              <div className="bg-stone-50 p-3 rounded-2xl border border-stone-200 font-medium space-y-1">
                <div>📞 Phone: <strong>+1 (561) 555-HELP</strong></div>
                <div>✉️ Email: <strong>support@palmbeachharvest.com</strong></div>
                <div>📍 Dispatch Center: <strong>West Palm Beach, FL</strong></div>
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

