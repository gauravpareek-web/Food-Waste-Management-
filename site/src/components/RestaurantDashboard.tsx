import { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  PlusCircle,
  Package,
  Inbox,
  Truck,
  BarChart3,
  History,
  Bell,
  Settings,
  Search,
  Menu,
  X,
  ChevronRight,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  Utensils,
  Leaf,
  Cloud,
  Sparkles,
  Upload,
  Calendar,
  MoreVertical,
  ExternalLink,
  ShieldCheck,
  Check,
  LogOut,
  ArrowRight,
  TrendingUp,
  Store,
  RefreshCw,
  AlertTriangle,
  Timer,
  Info,
  Flame,
  Snowflake
} from 'lucide-react';
import { UserProfile } from '../types';

export interface DonationItem {
  id: string;
  title: string;
  description: string;
  itemsList: string[];
  quantity: string;
  servings: string;
  category: string;
  foodCategory?: string;
  status: 'Available' | 'Claimed' | 'Pickup Pending' | 'Delivered' | 'Expiring Soon' | 'Rejected';
  statusColor: string;
  pickupDate: string;
  pickupSlot: string;
  prepDate: string;
  prepTime: string;
  preparedAt?: string;
  activeDuration: string;
  expiresAt: string;
  expiryHoursLeft: number;
  totalShelfLifeHours: number;
  expiryPercent: number;
  safeUntil: string;
  packaging: string;
  storage: string;
  storageCondition?: 'Refrigerated' | 'Room Temperature' | 'Hot Holding';
  storageTemp: string;
  allergens: string;
  dietary: string[];
  image: string;
  distance: string;
  claimedBy: string | null;
  fssaiCompliant: boolean;
  hygieneConfirmed?: boolean;
  contaminationReported?: boolean;
  donorDeclaration?: boolean;
  safetyStatus?: 'verified' | 'pending_review' | 'rejected' | 'expired';
  safetyReviewNotes?: string;
}

interface RestaurantDashboardProps {
  user?: UserProfile;
  onClose: () => void;
  onSwitchRole?: () => void;
  onSignOut?: () => void;
}

type TabType =
  | 'overview'
  | 'create'
  | 'donations'
  | 'requests'
  | 'tracking'
  | 'analytics'
  | 'history'
  | 'notifications'
  | 'settings'
  | 'live-map';

export default function RestaurantDashboard({
  user,
  onClose,
  onSwitchRole,
  onSignOut,
}: RestaurantDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDonationDetail, setSelectedDonationDetail] = useState<any | null>(null);

  // Filter tabs for My Donations
  const [donationFilter, setDonationFilter] = useState<'active' | 'completed' | 'drafts'>('active');

  // Filter tabs for Donation Requests
  const [requestFilter, setRequestFilter] = useState<'pending' | 'accepted' | 'completed'>('pending');

  // Create Donation Form State
  const [formFoodName, setFormFoodName] = useState('');
  const [formCategory, setFormCategory] = useState('Cooked Meals');
  const [formFoodCategory, setFormFoodCategory] = useState<'Rice' | 'Roti' | 'Curry' | 'Vegetables' | 'Dairy' | 'Bakery' | 'Packaged Food' | 'Other'>('Curry');
  const [formDescription, setFormDescription] = useState('');
  const [formQuantity, setFormQuantity] = useState('');
  const [formUnit, setFormUnit] = useState('portions');
  const [formServings, setFormServings] = useState('Feeds ~35 adults');
  const [formItemsList, setFormItemsList] = useState('Fresh Rice, Lentil Curry, Mixed Veg, Flatbreads');
  const [formPreparedAt, setFormPreparedAt] = useState(() => {
    const d = new Date();
    d.setMinutes(d.getMinutes() - 25);
    return d.toISOString().slice(0, 16);
  });
  const [formPrepDate, setFormPrepDate] = useState('2026-10-31');
  const [formPrepTime, setFormPrepTime] = useState('11:30 AM');
  const [formShelfLifeHours, setFormShelfLifeHours] = useState('6');
  const [formPickupTime, setFormPickupTime] = useState('12:00 PM - 02:30 PM');
  const [formPackaging, setFormPackaging] = useState('Sealed Food-Grade Containers');
  const [formStorage, setFormStorage] = useState('Hot-held (>65°C)');
  const [formStorageCondition, setFormStorageCondition] = useState<'Hot Holding' | 'Refrigerated' | 'Room Temperature'>('Hot Holding');
  const [formAllergens, setFormAllergens] = useState('None / Dairy mentioned');
  const [formAddress, setFormAddress] = useState('125 Palm Street, Palm Beach, FL');
  const [formHygieneConfirmed, setFormHygieneConfirmed] = useState(true);
  const [formContaminationReported, setFormContaminationReported] = useState(false);
  const [formDonorDeclaration, setFormDonorDeclaration] = useState(true);
  const [formImageFile, setFormImageFile] = useState<File | null>(null);
  const [formImagePreview, setFormImagePreview] = useState<string>('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80');
  const [formApiError, setFormApiError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmittedToast, setFormSubmittedToast] = useState(false);

  // Settings State
  const [settingsName, setSettingsName] = useState(user?.name || 'Chef Michael');
  const [settingsEmail, setSettingsEmail] = useState(user?.email || 'chef@greentable.com');
  const [settingsPhone, setSettingsPhone] = useState(user?.phone || '+1 (561) 555-0192');
  const [settingsSavedToast, setSettingsSavedToast] = useState(false);

  // Data: Donations List
  const [donationsList, setDonationsList] = useState<DonationItem[]>([
    {
      id: 'DON-101',
      title: 'Fresh Vegetables Box',
      description: 'Assorted farm-fresh organic vegetables packed directly from kitchen stock, pre-washed, unchopped, and temperature-controlled.',
      itemsList: ['Organic Spinach (4 kg)', 'Carrots & Cucumbers (5 kg)', 'Bell Peppers (3 kg)', 'Fresh Tomatoes (3 kg)'],
      quantity: '15 kg',
      servings: 'Feeds ~45 people',
      category: 'Vegetables',
      status: 'Available',
      statusColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      pickupDate: 'Apr 27, 2026',
      pickupSlot: '10:00 AM - 12:00 PM',
      prepDate: 'Apr 27, 2026',
      prepTime: '09:00 AM',
      activeDuration: '1h 45m active',
      expiresAt: 'Apr 28, 2026 • 06:00 PM',
      expiryHoursLeft: 18,
      totalShelfLifeHours: 24,
      expiryPercent: 25,
      safeUntil: 'Apr 28, 2026',
      packaging: 'Moisture-controlled ventilated food crates',
      storage: 'Refrigerated (2-4°C)',
      storageTemp: '3.2°C logged',
      allergens: 'None',
      dietary: ['100% Vegetarian', 'Raw Fresh Produce', 'Gluten-Free'],
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
      distance: '4.2 km',
      claimedBy: null,
      fssaiCompliant: true,
    },
    {
      id: 'DON-102',
      title: 'Cooked Meals (Paneer Curry & Basmati Rice)',
      description: 'Freshly prepared hot banquet lunch, untouched in heated steam pans, strictly unserved surplus meeting FSSAI surplus-food safety standards.',
      itemsList: ['Shahi Paneer Curry (15 L)', 'Steamed Jeera Basmati Rice (20 kg)', 'Whole Wheat Rotis (70 pcs)', 'Fresh Cucumber Salad'],
      quantity: '35 portions',
      servings: 'Feeds ~35 adults',
      category: 'Cooked Meals',
      status: 'Claimed',
      statusColor: 'bg-blue-100 text-blue-800 border-blue-200',
      pickupDate: 'Apr 27, 2026',
      pickupSlot: '01:30 PM - 03:00 PM',
      prepDate: 'Apr 27, 2026',
      prepTime: '11:15 AM',
      activeDuration: '2h 10m active',
      expiresAt: 'Today at 05:30 PM',
      expiryHoursLeft: 3.5,
      totalShelfLifeHours: 6,
      expiryPercent: 58,
      safeUntil: 'Apr 27, 2026 (5:30 PM)',
      packaging: 'Sealed food-grade stainless thermal containers',
      storage: 'Hot-held (>65°C)',
      storageTemp: '68°C verified',
      allergens: 'Dairy (Paneer & Butter)',
      dietary: ['Vegetarian', 'Nut-Free', 'Fresh Cooked'],
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
      distance: '2.5 km',
      claimedBy: 'Hope Foundation',
      fssaiCompliant: true,
    },
    {
      id: 'DON-103',
      title: 'Artisan Bakery & Morning Breads',
      description: 'Same-day baked artisan sourdough loaves, baguettes, and dinner rolls from morning bake cycle, properly wrapped in parchment bags.',
      itemsList: ['Sourdough Loaves (6)', 'Whole Grain Baguettes (8)', 'Multigrain Dinner Rolls (40 pcs)'],
      quantity: '10 boxes',
      servings: 'Feeds ~50-60 people',
      category: 'Bakery',
      status: 'Pickup Pending',
      statusColor: 'bg-amber-100 text-amber-800 border-amber-200',
      pickupDate: 'Apr 27, 2026',
      pickupSlot: '04:00 PM - 06:00 PM',
      prepDate: 'Apr 27, 2026',
      prepTime: '07:30 AM',
      activeDuration: '5h 15m active',
      expiresAt: 'Apr 28, 2026 • 12:00 PM',
      expiryHoursLeft: 22,
      totalShelfLifeHours: 30,
      expiryPercent: 30,
      safeUntil: 'Apr 28, 2026',
      packaging: 'Food-safe kraft paper bags & sealed cartons',
      storage: 'Dry Room Temp',
      storageTemp: '22°C ambient',
      allergens: 'Gluten (Wheat)',
      dietary: ['Vegetarian', 'Eggless', 'No Preservatives'],
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
      distance: '6.7 km',
      claimedBy: 'Community Care Shelter',
      fssaiCompliant: true,
    },
    {
      id: 'DON-104',
      title: 'Fresh Seasonal Fruits Pack',
      description: 'Whole unpeeled fresh apples, bananas, and oranges, sorted and inspected for zero bruising, high nutrition for shelter children.',
      itemsList: ['Sweet Oranges (3 kg)', 'Shimla Apples (3 kg)', 'Ripe Bananas (2 dozen)'],
      quantity: '8 kg',
      servings: 'Feeds ~25 people',
      category: 'Fruits',
      status: 'Available',
      statusColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      pickupDate: 'Apr 27, 2026',
      pickupSlot: '11:00 AM - 01:00 PM',
      prepDate: 'Apr 27, 2026',
      prepTime: '08:45 AM',
      activeDuration: '3h 30m active',
      expiresAt: 'Apr 29, 2026 • 08:00 PM',
      expiryHoursLeft: 48,
      totalShelfLifeHours: 72,
      expiryPercent: 15,
      safeUntil: 'Apr 29, 2026',
      packaging: 'Cushioned ventilated fruit crates',
      storage: 'Cool Ambient',
      storageTemp: '18°C ambient',
      allergens: 'None',
      dietary: ['100% Vegan', 'Raw Fruit', 'Gluten-Free'],
      image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=600&q=80',
      distance: '3.8 km',
      claimedBy: null,
      fssaiCompliant: true,
    },
  ]);

  // Data: NGO Requests List
  const [requestsList, setRequestsList] = useState<Array<{
    id: string;
    org: string;
    avatar: string;
    needs: string;
    date: string;
    distance: string;
    status: 'pending' | 'accepted';
  }>>([
    {
      id: 'REQ-201',
      org: 'Hope Foundation Shelter',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
      needs: 'Requested 35 Portions (Paneer Curry & Rice)',
      date: 'Today • 12:45 PM',
      distance: '2.5 km away',
      status: 'pending',
    },
    {
      id: 'REQ-202',
      org: 'Community Care Kitchen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
      needs: 'Requested 15 kg Fresh Vegetables Box',
      date: 'Today • 11:15 AM',
      distance: '4.2 km away',
      status: 'pending',
    },
    {
      id: 'REQ-203',
      org: 'Palm Beach Youth Shelter',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80',
      needs: 'Requested 10 boxes Artisan Morning Breads',
      date: 'Today • 09:30 AM',
      distance: '6.7 km away',
      status: 'accepted',
    },
  ]);

  // Data: Notifications List
  const [notificationsList, setNotificationsList] = useState<Array<{
    id: string;
    title: string;
    desc: string;
    time: string;
    color: string;
  }>>([
    {
      id: 'NOTIF-1',
      title: 'New Food Request Received',
      desc: 'Hope Foundation submitted a priority pickup request for 35 portions of Paneer Curry & Rice.',
      time: '10 min ago',
      color: 'bg-emerald-500',
    },
    {
      id: 'NOTIF-2',
      title: 'Food Safety Check Verified',
      desc: 'FSSAI compliant temperature log verified for Fresh Vegetables Box (DON-101).',
      time: '1 hour ago',
      color: 'bg-blue-500',
    },
    {
      id: 'NOTIF-3',
      title: 'Donation Claimed & Driver Dispatched',
      desc: 'Volunteer Rahul Sharma is on route to collect Artisan Bakery box from your back kitchen dock.',
      time: '3 hours ago',
      color: 'bg-amber-500',
    },
    {
      id: 'NOTIF-4',
      title: 'Tax Exemption Receipt Generated',
      desc: '80G Certificate for 50kg rescued food has been archived in your History & Reports tab.',
      time: 'Yesterday',
      color: 'bg-purple-500',
    },
  ]);

  // Helper: map API donation to local DonationItem
  const mapApiDonationToItem = (item: any): DonationItem => {
    const isRejected = item.safety_status === 'rejected';
    const isExpired = item.safety_status === 'expired';
    const isClaimed = item.status === 'claimed';

    return {
      id: item.id,
      title: item.title,
      description: item.description,
      itemsList: Array.isArray(item.items_list)
        ? item.items_list
        : (typeof item.items_list === 'string' ? JSON.parse(item.items_list || '[]') : [item.title]),
      quantity: item.quantity,
      servings: item.servings,
      category: item.food_category || item.category || 'Cooked Meals',
      foodCategory: item.food_category,
      status: isRejected ? 'Rejected' : isExpired ? 'Expiring Soon' : isClaimed ? 'Claimed' : 'Available',
      statusColor: isRejected
        ? 'bg-red-100 text-red-800 border-red-200'
        : isExpired
        ? 'bg-rose-100 text-rose-800 border-rose-200'
        : isClaimed
        ? 'bg-blue-100 text-blue-800 border-blue-200'
        : 'bg-emerald-100 text-emerald-800 border-emerald-200',
      pickupDate: new Date(item.created_at || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      pickupSlot: item.pickup_window || 'Next 2-4 Hours',
      prepDate: new Date(item.prepared_at || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      prepTime: new Date(item.prepared_at || Date.now()).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      preparedAt: item.prepared_at,
      activeDuration: item.active_duration || 'Active',
      expiresAt: item.expiry_at ? new Date(item.expiry_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : 'In 6 hours',
      expiryHoursLeft: typeof item.hours_remaining === 'number' ? item.hours_remaining : (item.shelf_life_hours || 6),
      totalShelfLifeHours: item.shelf_life_hours || 6,
      expiryPercent: typeof item.percent_elapsed === 'number' ? item.percent_elapsed : 20,
      safeUntil: item.expiry_at ? new Date(item.expiry_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Today',
      packaging: item.packaging || 'Sealed Food-Grade Containers',
      storage: item.storage_condition || 'Hot Holding',
      storageCondition: item.storage_condition || 'Hot Holding',
      storageTemp: item.storage_temp || (item.storage_condition === 'Hot Holding' ? '>65°C maintained' : item.storage_condition === 'Refrigerated' ? '2-4°C chilled' : 'Ambient room temp'),
      allergens: item.allergens || 'None',
      dietary: Array.isArray(item.dietary) ? item.dietary : ['FSSAI Compliant'],
      image: item.food_image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
      distance: item.distance || '2.5 km',
      claimedBy: item.claimed_by || null,
      fssaiCompliant: Boolean(item.hygiene_confirmed && !item.contamination_reported && item.safety_status !== 'rejected'),
      hygieneConfirmed: Boolean(item.hygiene_confirmed),
      contaminationReported: Boolean(item.contamination_reported),
      donorDeclaration: Boolean(item.donor_declaration),
      safetyStatus: item.safety_status,
      safetyReviewNotes: item.safety_review_notes,
    };
  };

  const fetchLiveDonations = async () => {
    try {
      const res = await fetch('/api/donations');
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          const mapped = json.data.map(mapApiDonationToItem);
          setDonationsList(mapped);
        }
      }
    } catch {
      // Graceful offline/local mode fallback
    }
  };

  useEffect(() => {
    fetchLiveDonations();
  }, []);

  // Handle Publishing a New Donation with Food Safety Validation
  const handlePublishDonation = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormApiError(null);

    if (!formFoodName.trim() || !formQuantity) {
      setFormApiError('Food name and quantity are required.');
      return;
    }

    if (!formHygieneConfirmed) {
      setFormApiError('Food container hygiene confirmation is mandatory under FSSAI rules.');
      return;
    }

    if (!formDonorDeclaration) {
      setFormApiError('Donor declaration confirming food safety accuracy must be agreed to.');
      return;
    }

    // Client-side quick check for future prep time
    const prepDateObj = new Date(formPreparedAt);
    if (prepDateObj > new Date()) {
      setFormApiError('Food preparation date/time cannot be in the future.');
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('title', formFoodName);
      formData.append('food_category', formFoodCategory);
      formData.append('description', formDescription || 'Fresh surplus food prepared under commercial hygiene protocols.');
      formData.append('quantity', `${formQuantity} ${formUnit}`);
      formData.append('servings', formServings || `Feeds ~${formQuantity} portions`);
      formData.append('items_list', JSON.stringify(formItemsList.split(',').map((s) => s.trim()).filter(Boolean)));
      formData.append('prepared_at', prepDateObj.toISOString());
      formData.append('storage_condition', formStorageCondition);
      formData.append('storage_temp', formStorageCondition === 'Hot Holding' ? '>65°C maintained' : formStorageCondition === 'Refrigerated' ? '2-4°C chilled' : 'Ambient room temp');
      formData.append('hygiene_confirmed', formHygieneConfirmed ? 'true' : 'false');
      formData.append('contamination_reported', formContaminationReported ? 'true' : 'false');
      formData.append('donor_declaration', formDonorDeclaration ? 'true' : 'false');
      formData.append('allergens', formAllergens);
      formData.append('packaging', formPackaging);
      formData.append('pickup_window', formPickupTime);
      formData.append('donor_name', user?.name || 'The Green Table Restaurant');
      formData.append('donor_phone', user?.phone || '+1 (561) 555-0192');
      formData.append('donor_address', formAddress);

      if (formImageFile) {
        formData.append('food_image_file', formImageFile);
      } else {
        formData.append('image_url', formImagePreview);
      }

      const res = await fetch('/api/donations', {
        method: 'POST',
        body: formData,
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        setFormApiError(result.message || 'Validation failed. Please verify food safety requirements.');
        setIsSubmitting(false);
        return;
      }

      const newItem = mapApiDonationToItem(result.data);
      setDonationsList((prev) => [newItem, ...prev]);
      setFormFoodName('');
      setFormQuantity('');
      setFormDescription('');
      setFormSubmittedToast(true);
      setIsSubmitting(false);

      setTimeout(() => {
        setFormSubmittedToast(false);
        setActiveTab('donations');
      }, 1500);
    } catch {
      // Offline fallback
      if (formContaminationReported) {
        setFormApiError('Food Safety Violation: Contaminated food cannot be listed for redistribution.');
        setIsSubmitting(false);
        return;
      }

      const shelfLifeNum = parseFloat(formShelfLifeHours) || 6;
      const items = formItemsList.split(',').map((s) => s.trim()).filter(Boolean);
      const newDonation: DonationItem = {
        id: `DON-${Math.floor(100 + Math.random() * 900)}`,
        title: formFoodName,
        description: formDescription || 'Fresh surplus food prepared under commercial hygiene protocols.',
        itemsList: items.length > 0 ? items : [formFoodName],
        quantity: `${formQuantity} ${formUnit}`,
        servings: formServings || `Feeds ~${formQuantity} portions`,
        category: formFoodCategory,
        foodCategory: formFoodCategory,
        status: 'Available',
        statusColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        pickupDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        pickupSlot: formPickupTime,
        prepDate: prepDateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        prepTime: prepDateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        preparedAt: formPreparedAt,
        activeDuration: 'Just listed (0m)',
        expiresAt: `In ${shelfLifeNum} hours`,
        expiryHoursLeft: shelfLifeNum,
        totalShelfLifeHours: shelfLifeNum,
        expiryPercent: 0,
        safeUntil: `Valid for ${shelfLifeNum}h`,
        packaging: formPackaging,
        storage: formStorageCondition,
        storageCondition: formStorageCondition,
        storageTemp: formStorageCondition === 'Hot Holding' ? '>65°C maintained' : '2-4°C chilled',
        allergens: formAllergens,
        dietary: ['Verified Safe Surplus', 'FSSAI Compliant'],
        image: formImagePreview,
        distance: '0.0 km',
        claimedBy: null,
        fssaiCompliant: true,
        hygieneConfirmed: formHygieneConfirmed,
        contaminationReported: formContaminationReported,
        donorDeclaration: formDonorDeclaration,
        safetyStatus: 'verified',
      };

      setDonationsList((prev) => [newDonation, ...prev]);
      setFormFoodName('');
      setFormQuantity('');
      setFormDescription('');
      setFormSubmittedToast(true);
      setIsSubmitting(false);

      setTimeout(() => {
        setFormSubmittedToast(false);
        setActiveTab('donations');
      }, 1500);
    }
  };

  // Handle Accepting an NGO Request
  const handleAcceptRequest = (id: string) => {
    setRequestsList((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'accepted' } : r))
    );
  };

  return (
    <div className="min-h-screen w-full bg-[#FAF9F5] text-stone-900 font-sans flex flex-col antialiased selection:bg-[#F59E0B]/30 selection:text-black">
      
      {/* ======================================================== */}
      {/* MAIN LAYOUT: SIDEBAR + MAIN CONTENT AREA                 */}
      {/* ======================================================== */}
      <div className="flex-1 flex flex-row overflow-hidden relative">
        
        {/* ------------------------------------------------------ */}
        {/* 1. LEFT SIDEBAR NAVIGATION (Dark Green #0A3F2F)        */}
        {/* ------------------------------------------------------ */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#0A3F2F] text-white flex flex-col justify-between transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
            mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* Top Section: Brand + Restaurant Profile Card */}
          <div className="p-5 space-y-6">
            
            {/* Logo */}
            <div 
              onClick={onClose}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <div className="flex items-center gap-1.5 font-extrabold tracking-wider text-sm uppercase">
                <span className="text-white">PALM BEACH</span>
                <span className="bg-[#F59E0B] text-stone-950 px-2 py-0.5 rounded-full text-[11px] font-black">
                  HARVEST
                </span>
              </div>
            </div>

            {/* Restaurant Profile Card */}
            <div className="bg-[#072F23] rounded-2xl p-3 border border-emerald-900/40 flex items-center gap-3">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=120&q=80"
                  alt="The Green Table"
                  className="w-10 h-10 rounded-xl object-cover border border-[#F59E0B]/60"
                />
                <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[#072F23]" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-xs text-white truncate">The Green Table</h4>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="text-[10px] text-stone-300">Restaurant Partner</span>
                  <span className="bg-emerald-500/20 text-emerald-400 text-[9px] px-1.5 py-0.2 rounded font-semibold border border-emerald-500/30">
                    Verified
                  </span>
                </div>
              </div>
            </div>

            {/* Nav Menu Items */}
            <nav className="space-y-1">
              <button
                onClick={() => { setActiveTab('overview'); setMobileSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'overview'
                    ? 'bg-[#F59E0B] text-stone-950 shadow-md font-bold'
                    : 'text-stone-300 hover:bg-emerald-900/50 hover:text-white'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </button>

              <button
                onClick={() => { setActiveTab('create'); setMobileSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'create'
                    ? 'bg-[#F59E0B] text-stone-950 shadow-md font-bold'
                    : 'text-stone-300 hover:bg-emerald-900/50 hover:text-white'
                }`}
              >
                <PlusCircle className="w-4 h-4" />
                <span>Create Donation</span>
              </button>

              <button
                onClick={() => { setActiveTab('donations'); setMobileSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'donations'
                    ? 'bg-[#F59E0B] text-stone-950 shadow-md font-bold'
                    : 'text-stone-300 hover:bg-emerald-900/50 hover:text-white'
                }`}
              >
                <Package className="w-4 h-4" />
                <span>My Donations</span>
              </button>

              <button
                onClick={() => { setActiveTab('requests'); setMobileSidebarOpen(false); }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'requests'
                    ? 'bg-[#F59E0B] text-stone-950 shadow-md font-bold'
                    : 'text-stone-300 hover:bg-emerald-900/50 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Inbox className="w-4 h-4" />
                  <span>Donation Requests</span>
                </div>
                <span className="w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                  3
                </span>
              </button>

              <button
                onClick={() => { setActiveTab('tracking'); setMobileSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'tracking'
                    ? 'bg-[#F59E0B] text-stone-950 shadow-md font-bold'
                    : 'text-stone-300 hover:bg-emerald-900/50 hover:text-white'
                }`}
              >
                <Truck className="w-4 h-4" />
                <span>Pickup Tracking</span>
              </button>

              <button
                onClick={() => { setActiveTab('analytics'); setMobileSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'analytics'
                    ? 'bg-[#F59E0B] text-stone-950 shadow-md font-bold'
                    : 'text-stone-300 hover:bg-emerald-900/50 hover:text-white'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>Analytics</span>
              </button>

              <button
                onClick={() => { setActiveTab('history'); setMobileSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'history'
                    ? 'bg-[#F59E0B] text-stone-950 shadow-md font-bold'
                    : 'text-stone-300 hover:bg-emerald-900/50 hover:text-white'
                }`}
              >
                <History className="w-4 h-4" />
                <span>History</span>
              </button>

              <button
                onClick={() => { setActiveTab('notifications'); setMobileSidebarOpen(false); }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'notifications'
                    ? 'bg-[#F59E0B] text-stone-950 shadow-md font-bold'
                    : 'text-stone-300 hover:bg-emerald-900/50 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Bell className="w-4 h-4" />
                  <span>Notifications</span>
                </div>
                <span className="w-5 h-5 rounded-full bg-[#F59E0B] text-stone-950 text-[10px] font-bold flex items-center justify-center">
                  2
                </span>
              </button>

              <button
                onClick={() => { setActiveTab('settings'); setMobileSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'settings'
                    ? 'bg-[#F59E0B] text-stone-950 shadow-md font-bold'
                    : 'text-stone-300 hover:bg-emerald-900/50 hover:text-white'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>

              <button
                onClick={() => { setActiveTab('live-map'); setMobileSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'live-map'
                    ? 'bg-[#F59E0B] text-stone-950 shadow-md font-bold'
                    : 'text-stone-300 hover:bg-emerald-900/50 hover:text-white'
                }`}
              >
                <MapPin className="w-4 h-4" />
                <span>Live Map View</span>
              </button>
            </nav>
          </div>

          {/* Bottom Actions: Return to Site & Sign Out */}
          <div className="p-4 border-t border-emerald-900/50 space-y-2">
            <button
              onClick={onClose}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs text-white font-medium transition-colors cursor-pointer"
            >
              <span>Back to Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
            
            {onSignOut && (
              <button
                onClick={onSignOut}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl hover:bg-red-500/20 text-xs text-red-300 font-medium transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            )}
          </div>
        </aside>

        {/* Backdrop for mobile sidebar */}
        {mobileSidebarOpen && (
          <div
            onClick={() => setMobileSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 z-30 lg:hidden backdrop-blur-xs"
          />
        )}

        {/* ------------------------------------------------------ */}
        {/* 2. MAIN WORKSPACE AREA                                 */}
        {/* ------------------------------------------------------ */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          
          {/* Top Navbar */}
          <header className="sticky top-0 z-20 bg-white border-b border-stone-200/80 px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4 shadow-xs">
            
            {/* Left: Mobile Menu Toggle & Search Bar */}
            <div className="flex items-center gap-3 flex-1 max-w-xl">
              <button
                onClick={() => setMobileSidebarOpen(true)}
                className="lg:hidden p-2 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-50"
              >
                <Menu className="w-5 h-5" />
              </button>

              <div className="relative w-full">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                  <Search className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search donations, NGOs, or locations..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-stone-200 bg-stone-50 text-xs sm:text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#F59E0B] focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Right: Notifications & User Profile Pill */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveTab('notifications')}
                className="relative p-2 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-50 transition-colors cursor-pointer"
                aria-label="View notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
              </button>

              <div 
                onClick={() => setActiveTab('settings')}
                className="flex items-center gap-2.5 p-1.5 pr-3 rounded-full border border-stone-200 hover:bg-stone-50 transition-colors cursor-pointer"
              >
                <img
                  src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=120&q=80"
                  alt="Chef Michael"
                  className="w-7 h-7 rounded-full object-cover"
                />
                <div className="hidden sm:block text-left">
                  <h5 className="font-bold text-xs text-stone-900 leading-tight">Chef Michael</h5>
                  <p className="text-[10px] text-stone-500">Restaurant Owner</p>
                </div>
              </div>
            </div>

          </header>

          {/* Tab Content Rendering */}
          <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full">
            
            {/* ================================================== */}
            {/* TAB 1: OVERVIEW / DASHBOARD (Panel 1)              */}
            {/* ================================================== */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                
                {/* Greeting Banner + Create Button */}
                <div className="flex flex-col md:flex-row items-stretch justify-between gap-4">
                  
                  {/* Left: Greeting */}
                  <div className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-xs flex-1 flex flex-col justify-center">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-950 tracking-tight flex items-center gap-2">
                      Good Morning, Chef Michael! <span className="text-2xl">👋</span>
                    </h2>
                    <p className="text-xs sm:text-sm text-stone-500 mt-1 font-medium">
                      Your contribution helps feed people and protect our planet.
                    </p>
                  </div>

                  {/* Right: Promotional Banner */}
                  <div className="bg-gradient-to-r from-[#0C4533] to-[#082E22] text-white p-5 rounded-3xl shadow-sm flex items-center justify-between gap-4 min-w-[320px]">
                    <div className="space-y-2">
                      <h4 className="font-bold text-xs text-[#F59E0B] tracking-wide uppercase">
                        Every Meal Saved Makes a Difference
                      </h4>
                      <button
                        onClick={() => setActiveTab('create')}
                        className="px-4 py-2 rounded-xl bg-[#F59E0B] text-stone-950 font-bold text-xs hover:bg-[#D97706] transition-transform hover:scale-105 shadow cursor-pointer"
                      >
                        Create New Donation +
                      </button>
                    </div>
                    <img
                      src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=150&q=80"
                      alt="Meal preview"
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-[#F59E0B]/50 shrink-0"
                    />
                  </div>

                </div>

                {/* 4 KPI Stat Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  
                  {/* KPI 1 */}
                  <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs space-y-2">
                    <div className="flex items-center justify-between text-stone-400">
                      <span className="text-xs font-semibold text-stone-500">Total Donations</span>
                      <Package className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div className="text-3xl font-black text-stone-950 tracking-tight">24</div>
                    <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                      <TrendingUp className="w-3.5 h-3.5" /> +12% vs last month
                    </div>
                  </div>

                  {/* KPI 2 */}
                  <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs space-y-2">
                    <div className="flex items-center justify-between text-stone-400">
                      <span className="text-xs font-semibold text-stone-500">Meals Rescued</span>
                      <Utensils className="w-4 h-4 text-[#F59E0B]" />
                    </div>
                    <div className="text-3xl font-black text-stone-950 tracking-tight">680</div>
                    <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                      <TrendingUp className="w-3.5 h-3.5" /> +18% vs last month
                    </div>
                  </div>

                  {/* KPI 3 */}
                  <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs space-y-2">
                    <div className="flex items-center justify-between text-stone-400">
                      <span className="text-xs font-semibold text-stone-500">Food Saved</span>
                      <Leaf className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div className="text-3xl font-black text-stone-950 tracking-tight">125 kg</div>
                    <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                      <TrendingUp className="w-3.5 h-3.5" /> +15% vs last month
                    </div>
                  </div>

                  {/* KPI 4 */}
                  <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs space-y-2">
                    <div className="flex items-center justify-between text-stone-400">
                      <span className="text-xs font-semibold text-stone-500">CO₂ Avoided</span>
                      <Cloud className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div className="text-3xl font-black text-stone-950 tracking-tight">280 kg</div>
                    <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                      <TrendingUp className="w-3.5 h-3.5" /> +10% vs last month
                    </div>
                  </div>

                </div>

                {/* Middle Row: Donation Trends Chart + Recent Donations */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  
                  {/* Left: Donation Trends SVG Line Chart */}
                  <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-stone-200/80 shadow-xs space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-sm text-stone-900">Donation Trends</h3>
                      <span className="text-xs text-stone-400 font-medium">Last 7 days</span>
                    </div>

                    {/* SVG Chart */}
                    <div className="relative h-52 w-full pt-4">
                      <svg className="w-full h-full overflow-visible" viewBox="0 0 400 160">
                        {/* Grid lines */}
                        <line x1="0" y1="20" x2="400" y2="20" stroke="#F3F4F6" strokeDasharray="4" />
                        <line x1="0" y1="60" x2="400" y2="60" stroke="#F3F4F6" strokeDasharray="4" />
                        <line x1="0" y1="100" x2="400" y2="100" stroke="#F3F4F6" strokeDasharray="4" />
                        <line x1="0" y1="140" x2="400" y2="140" stroke="#E5E7EB" />

                        {/* Line curve */}
                        <path
                          d="M 20 130 Q 80 110 140 90 T 260 70 T 380 30"
                          fill="none"
                          stroke="#10B981"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                        />

                        {/* Interactive nodes */}
                        <circle cx="20" cy="130" r="4.5" fill="#10B981" />
                        <circle cx="80" cy="115" r="4.5" fill="#10B981" />
                        <circle cx="140" cy="90" r="4.5" fill="#10B981" />
                        <circle cx="200" cy="80" r="4.5" fill="#10B981" />
                        <circle cx="260" cy="70" r="4.5" fill="#10B981" />
                        <circle cx="320" cy="50" r="4.5" fill="#10B981" />
                        <circle cx="380" cy="30" r="5.5" fill="#F59E0B" stroke="#10B981" strokeWidth="2" />
                      </svg>

                      {/* X-axis labels */}
                      <div className="flex justify-between text-[10px] text-stone-400 font-medium pt-2">
                        <span>Apr 21</span>
                        <span>Apr 22</span>
                        <span>Apr 23</span>
                        <span>Apr 24</span>
                        <span>Apr 25</span>
                        <span>Apr 26</span>
                        <span>Apr 27</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Recent Donations */}
                  <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-stone-200/80 shadow-xs space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-sm text-stone-900">Recent Donations</h3>
                      <button
                        onClick={() => setActiveTab('donations')}
                        className="text-xs font-bold text-[#D97706] hover:underline cursor-pointer"
                      >
                        View All →
                      </button>
                    </div>

                    <div className="space-y-3">
                      {donationsList.slice(0, 3).map((item) => (
                        <div
                          key={item.id}
                          onClick={() => setSelectedDonationDetail(item)}
                          className="flex items-center justify-between p-3 rounded-2xl hover:bg-stone-50 border border-stone-100 transition-all cursor-pointer group hover:shadow-xs"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-12 h-12 rounded-xl object-cover shrink-0"
                            />
                            <div className="min-w-0">
                              <h5 className="font-bold text-xs text-stone-900 group-hover:text-[#0A3F2F] transition-colors truncate">
                                {item.title}
                              </h5>
                              <div className="flex items-center gap-2 text-[10px] text-stone-500 mt-0.5">
                                <span className="font-medium">{item.quantity}</span>
                                <span>•</span>
                                <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.2 rounded">
                                  <Clock className="w-2.5 h-2.5" />
                                  {item.activeDuration}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-1 shrink-0 ml-2">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${item.statusColor}`}
                            >
                              {item.status}
                            </span>
                            <span className="text-[10px] text-amber-700 bg-amber-50 border border-amber-200/60 px-1.5 py-0.2 rounded font-semibold flex items-center gap-1">
                              <Timer className="w-2.5 h-2.5 text-amber-600" />
                              Exp: {item.expiryHoursLeft}h left
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Panel 16: Impact Summary Banner */}
                <div className="bg-[#0C4533] text-white p-6 sm:p-8 rounded-3xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
                  <div className="space-y-2 relative z-10">
                    <h3 className="text-xl sm:text-2xl font-black text-white">
                      Together We're Reducing Food Waste
                    </h3>
                    <p className="text-stone-300 text-xs sm:text-sm max-w-md">
                      And building a greener, healthier community for future generations.
                    </p>
                  </div>

                  <div className="flex items-center gap-4 sm:gap-6 relative z-10">
                    <div className="text-center">
                      <div className="text-xl sm:text-2xl font-black text-[#F59E0B]">680</div>
                      <div className="text-[10px] text-stone-300 uppercase">Meals Rescued</div>
                    </div>
                    <div className="h-8 w-px bg-white/20" />
                    <div className="text-center">
                      <div className="text-xl sm:text-2xl font-black text-[#F59E0B]">125 kg</div>
                      <div className="text-[10px] text-stone-300 uppercase">Food Saved</div>
                    </div>
                    <div className="h-8 w-px bg-white/20" />
                    <div className="text-center">
                      <div className="text-xl sm:text-2xl font-black text-[#F59E0B]">280 kg</div>
                      <div className="text-[10px] text-stone-300 uppercase">CO₂ Avoided</div>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* ================================================== */}
            {/* TAB 2: CREATE DONATION (Panel 4)                   */}
            {/* ================================================== */}
            {activeTab === 'create' && (
              <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/80 shadow-xs space-y-6">
                <div>
                  <h2 className="text-2xl font-extrabold text-stone-950 tracking-tight">
                    Create Donation
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
                    Share surplus food and make a difference with verified food safety compliance.
                  </p>
                </div>

                {formSubmittedToast && (
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Donation successfully published and passed safety checklist verification! Broadcasted to verified NGOs.
                  </div>
                )}

                {formApiError && (
                  <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs font-medium flex items-start gap-2.5 animate-in fade-in">
                    <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block text-red-900">Food Safety Verification Failed:</span>
                      <span>{formApiError}</span>
                    </div>
                  </div>
                )}

                <form onSubmit={handlePublishDonation} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* Left Column: Food Details */}
                    <div className="space-y-4">
                      <h4 className="font-bold text-xs uppercase tracking-wider text-stone-400">
                        Food Details &amp; Category
                      </h4>

                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                          Food Name *
                        </label>
                        <input
                          type="text"
                          value={formFoodName}
                          onChange={(e) => setFormFoodName(e.target.value)}
                          placeholder="e.g. Vegetable Curry & Basmati Rice"
                          required
                          className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-[#F59E0B]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                          Food Category (Safety Rules Matrix) *
                        </label>
                        <select
                          value={formFoodCategory}
                          onChange={(e) => setFormFoodCategory(e.target.value as any)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm text-stone-900 bg-white focus:outline-none focus:border-[#F59E0B] font-medium"
                        >
                          <option value="Curry">Curry (Lentils, Gravies, Paneer, Stews)</option>
                          <option value="Rice">Rice (Cooked Rice, Biryani, Pulao)</option>
                          <option value="Roti">Roti (Chapatis, Naan, Flatbreads)</option>
                          <option value="Vegetables">Vegetables (Cooked / Fresh Produce)</option>
                          <option value="Dairy">Dairy (Milk, Paneer, Yogurt, Sweets)</option>
                          <option value="Bakery">Bakery (Bread, Buns, Baked Goods)</option>
                          <option value="Packaged Food">Packaged Food (Sealed Dry Goods)</option>
                          <option value="Other">Other Surplus Food</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                          Description &amp; Quality Notes *
                        </label>
                        <textarea
                          rows={2}
                          value={formDescription}
                          onChange={(e) => setFormDescription(e.target.value)}
                          placeholder="Describe the surplus food, unserved kitchen batch, hygiene checks..."
                          className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-[#F59E0B]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                          Dishes / Included Items (Comma separated) *
                        </label>
                        <input
                          type="text"
                          value={formItemsList}
                          onChange={(e) => setFormItemsList(e.target.value)}
                          placeholder="e.g. Steamed Rice, Dal Tadka, Paneer Sabzi, Chapatis"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-[#F59E0B]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                            Estimated Servings
                          </label>
                          <input
                            type="text"
                            value={formServings}
                            onChange={(e) => setFormServings(e.target.value)}
                            placeholder="e.g. Feeds ~30 people"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-[#F59E0B]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                            Allergens / Dietary Info
                          </label>
                          <input
                            type="text"
                            value={formAllergens}
                            onChange={(e) => setFormAllergens(e.target.value)}
                            placeholder="e.g. Dairy, Gluten, None"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-[#F59E0B]"
                          />
                        </div>
                      </div>

                      {/* Upload Photo Dropzone with Preview */}
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                          Food Photograph (Mandatory Verification) *
                        </label>
                        <div className="flex items-center gap-3">
                          {formImagePreview && (
                            <img
                              src={formImagePreview}
                              alt="Preview"
                              className="w-16 h-16 rounded-xl object-cover border border-stone-300 shrink-0"
                            />
                          )}
                          <label className="flex-1 border-2 border-dashed border-stone-200 rounded-2xl p-3 text-center hover:border-[#F59E0B] transition-colors cursor-pointer bg-stone-50 block">
                            <Upload className="w-5 h-5 text-stone-400 mx-auto mb-1" />
                            <p className="text-xs font-semibold text-stone-700">Choose Food Photograph</p>
                            <p className="text-[10px] text-stone-400">JPG, PNG, WebP up to 5MB</p>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  setFormImageFile(file);
                                  const url = URL.createObjectURL(file);
                                  setFormImagePreview(url);
                                }
                              }}
                            />
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Quantity, Storage & Pickup Details */}
                    <div className="space-y-4">
                      <h4 className="font-bold text-xs uppercase tracking-wider text-stone-400">
                        Logistics, Packaging &amp; Storage
                      </h4>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                            Quantity *
                          </label>
                          <input
                            type="number"
                            value={formQuantity}
                            onChange={(e) => setFormQuantity(e.target.value)}
                            placeholder="e.g. 25"
                            required
                            className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-[#F59E0B]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                            Unit *
                          </label>
                          <select
                            value={formUnit}
                            onChange={(e) => setFormUnit(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm text-stone-900 bg-white focus:outline-none focus:border-[#F59E0B]"
                          >
                            <option value="portions">portions</option>
                            <option value="kg">kg</option>
                            <option value="boxes">boxes</option>
                            <option value="trays">trays</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                            Storage Condition *
                          </label>
                          <select
                            value={formStorageCondition}
                            onChange={(e) => setFormStorageCondition(e.target.value as any)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm text-stone-900 bg-white focus:outline-none focus:border-[#F59E0B]"
                          >
                            <option value="Hot Holding">Hot Holding (&gt;65°C / 149°F)</option>
                            <option value="Refrigerated">Refrigerated (2°C - 4°C)</option>
                            <option value="Room Temperature">Room Temperature (Ambient)</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                            Packaging Container *
                          </label>
                          <input
                            type="text"
                            value={formPackaging}
                            onChange={(e) => setFormPackaging(e.target.value)}
                            placeholder="e.g. Sealed Food-Grade Containers"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-[#F59E0B]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                            Pickup Window *
                          </label>
                          <input
                            type="text"
                            value={formPickupTime}
                            onChange={(e) => setFormPickupTime(e.target.value)}
                            placeholder="e.g. 12:00 PM - 02:30 PM"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-[#F59E0B]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                            Preparation Date *
                          </label>
                          <input
                            type="date"
                            value={formPrepDate}
                            onChange={(e) => setFormPrepDate(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-[#F59E0B]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                          Pickup Address *
                        </label>
                        <input
                          type="text"
                          value={formAddress}
                          onChange={(e) => setFormAddress(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-[#F59E0B]"
                        />
                      </div>
                    </div>

                  </div>

                  {/* ======================================================== */}
                  {/* MANDATORY FOOD SAFETY & HYGIENE CHECKLIST (PROMPT 1)     */}
                  {/* ======================================================== */}
                  <div className="p-5 sm:p-6 rounded-2xl border-2 border-emerald-600/30 bg-emerald-50/40 space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-emerald-600 text-white">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-sm text-emerald-950">
                          Mandatory Food Safety &amp; Hygiene Checklist
                        </h4>
                        <p className="text-[11px] text-emerald-800">
                          FSSAI Surplus Food Regulations compliance verification before redistribution broadcast
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      {/* 1. Exact Prep Date & Time (Cannot be in future) */}
                      <div className="bg-white p-3.5 rounded-xl border border-emerald-200">
                        <label className="block text-xs font-bold text-stone-800 mb-1 flex items-center justify-between">
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-emerald-600" />
                            Preparation Date &amp; Time *
                          </span>
                          <span className="text-[10px] text-stone-500 font-normal">Past only (No future)</span>
                        </label>
                        <input
                          type="datetime-local"
                          value={formPreparedAt}
                          max={new Date().toISOString().slice(0, 16)}
                          onChange={(e) => setFormPreparedAt(e.target.value)}
                          required
                          className="w-full px-3 py-2 rounded-lg border border-stone-200 text-xs font-medium text-stone-900 focus:outline-none focus:border-emerald-600 bg-stone-50"
                        />
                        <p className="text-[10px] text-stone-500 mt-1">
                          Expiry countdown calculated dynamically based on food category rules.
                        </p>
                      </div>

                      {/* 2. Container Hygiene Confirmation */}
                      <div className="bg-white p-3.5 rounded-xl border border-emerald-200 flex flex-col justify-between">
                        <label className="flex items-start gap-2.5 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formHygieneConfirmed}
                            onChange={(e) => setFormHygieneConfirmed(e.target.checked)}
                            className="w-4 h-4 mt-0.5 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                          />
                          <div>
                            <span className="text-xs font-bold text-stone-900 block">
                              Food Container Hygiene Confirmation *
                            </span>
                            <span className="text-[11px] text-stone-600">
                              I confirm all containers, vessels, and packages used are sanitized, food-grade, and properly sealed.
                            </span>
                          </div>
                        </label>
                      </div>
                    </div>

                    {/* 3. Contamination Screening */}
                    <div className={`p-3.5 rounded-xl border transition-colors ${
                      formContaminationReported ? 'bg-red-50 border-red-300' : 'bg-white border-emerald-200'
                    }`}>
                      <label className="flex items-start gap-2.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formContaminationReported}
                          onChange={(e) => setFormContaminationReported(e.target.checked)}
                          className="w-4 h-4 mt-0.5 rounded text-red-600 focus:ring-red-500 cursor-pointer"
                        />
                        <div>
                          <span className={`text-xs font-bold block ${
                            formContaminationReported ? 'text-red-900' : 'text-stone-900'
                          }`}>
                            Contamination / Temperature Abuse Exposure
                          </span>
                          <span className={`text-[11px] block mt-0.5 ${
                            formContaminationReported ? 'text-red-700 font-semibold' : 'text-stone-600'
                          }`}>
                            {formContaminationReported
                              ? '⚠️ WARNING: Food exposed to contamination cannot be accepted for human consumption. Submission will be rejected.'
                              : 'Check this box ONLY if this food has been exposed to dust, unwashed contact, insects, or temperature danger zones.'}
                          </span>
                        </div>
                      </label>
                    </div>

                    {/* 4. Donor Declaration */}
                    <div className="bg-white p-3.5 rounded-xl border border-emerald-200">
                      <label className="flex items-start gap-2.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formDonorDeclaration}
                          onChange={(e) => setFormDonorDeclaration(e.target.checked)}
                          className="w-4 h-4 mt-0.5 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                        />
                        <div>
                          <span className="text-xs font-bold text-stone-900 block">
                            Donor Food Safety Declaration *
                          </span>
                          <span className="text-[11px] text-stone-600">
                            I solemnly declare that the surplus food listed above was prepared under hygienic commercial kitchen conditions, has not been served to customers, and complies with FSSAI Surplus Food Regulations.
                          </span>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-end gap-3 pt-6 border-t border-stone-200">
                    <button
                      type="button"
                      onClick={() => setActiveTab('donations')}
                      className="px-5 py-2.5 rounded-xl border border-stone-200 text-stone-700 font-semibold text-xs hover:bg-stone-50 cursor-pointer"
                    >
                      Cancel / View Donations
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-7 py-2.5 rounded-xl bg-[#F59E0B] text-stone-950 font-bold text-xs hover:bg-[#D97706] shadow transition-all cursor-pointer flex items-center gap-2 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Verifying Safety &amp; Publishing...</span>
                        </>
                      ) : (
                        <span>Publish Donation with Safety Verification</span>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* ================================================== */}
            {/* TAB 3: MY DONATIONS (Panel 5 & Panel 6)            */}
            {/* ================================================== */}
            {activeTab === 'donations' && (
              <div className="space-y-6">
                
                {/* Header & Tabs */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-extrabold text-stone-950 tracking-tight">
                      My Donations
                    </h2>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Manage your surplus food donations and pickup status.
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveTab('create')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0A3F2F] text-white font-bold text-xs hover:bg-[#072F23] shadow transition-all cursor-pointer self-start sm:self-auto"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>+ New Donation</span>
                  </button>
                </div>

                {/* Filter Tabs */}
                <div className="flex items-center gap-2 border-b border-stone-200 pb-2 text-xs font-semibold">
                  <button
                    onClick={() => setDonationFilter('active')}
                    className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                      donationFilter === 'active'
                        ? 'bg-stone-900 text-white'
                        : 'text-stone-500 hover:text-stone-900'
                    }`}
                  >
                    Active ({donationsList.length})
                  </button>
                  <button
                    onClick={() => setDonationFilter('completed')}
                    className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                      donationFilter === 'completed'
                        ? 'bg-stone-900 text-white'
                        : 'text-stone-500 hover:text-stone-900'
                    }`}
                  >
                    Completed (12)
                  </button>
                  <button
                    onClick={() => setDonationFilter('drafts')}
                    className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                      donationFilter === 'drafts'
                        ? 'bg-stone-900 text-white'
                        : 'text-stone-500 hover:text-stone-900'
                    }`}
                  >
                    Drafts (3)
                  </button>
                </div>

                {/* Donations Table */}
                <div className="bg-white rounded-3xl border border-stone-200/80 shadow-xs overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase font-semibold text-[10px]">
                        <tr>
                          <th className="px-6 py-3.5">Food Item</th>
                          <th className="px-6 py-3.5">Quantity & Servings</th>
                          <th className="px-6 py-3.5">Category</th>
                          <th className="px-6 py-3.5">Status</th>
                          <th className="px-6 py-3.5">Active Period & Expiry</th>
                          <th className="px-6 py-3.5 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100 font-medium">
                        {donationsList.map((item) => (
                          <tr
                            key={item.id}
                            className="hover:bg-stone-50/70 transition-colors cursor-pointer group"
                            onClick={() => setSelectedDonationDetail(item)}
                          >
                            <td className="px-6 py-4 flex items-center gap-3">
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-11 h-11 rounded-xl object-cover shrink-0"
                              />
                              <div className="min-w-0">
                                <span className="font-bold text-stone-900 group-hover:text-[#0A3F2F] transition-colors block">
                                  {item.title}
                                </span>
                                <span className="text-[10px] text-stone-400 font-normal">
                                  ID: {item.id} • {item.servings}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-stone-700 font-semibold">{item.quantity}</td>
                            <td className="px-6 py-4 text-stone-600">{item.category}</td>
                            <td className="px-6 py-4">
                              <div className="flex flex-col gap-1">
                                <span
                                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border inline-block w-fit ${item.statusColor}`}
                                >
                                  {item.status}
                                </span>
                                {item.safetyStatus === 'rejected' ? (
                                  <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-red-100 text-red-800 border border-red-200 w-fit">
                                    ✗ Safety Rejected
                                  </span>
                                ) : item.safetyStatus === 'pending_review' ? (
                                  <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-amber-100 text-amber-800 border border-amber-200 w-fit">
                                    ⏳ Pending Review
                                  </span>
                                ) : (
                                  <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-emerald-50 text-emerald-800 border border-emerald-200 w-fit">
                                    ✓ Verified Safe
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex flex-col gap-1">
                                <span className="text-xs font-semibold text-stone-800 flex items-center gap-1">
                                  <Clock className="w-3 h-3 text-stone-400" />
                                  {item.activeDuration}
                                </span>
                                <div className="flex items-center gap-1.5">
                                  <span className="text-[10px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full font-bold border border-amber-200/80 inline-flex items-center gap-1">
                                    <Timer className="w-3 h-3 text-amber-600" />
                                    Exp: {item.expiryHoursLeft}h left
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedDonationDetail(item);
                                }}
                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-[#0A3F2F] text-stone-700 hover:text-white font-bold text-xs transition-colors cursor-pointer"
                              >
                                <span>Details</span>
                                <ChevronRight className="w-3.5 h-3.5" />
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

            {/* ================================================== */}
            {/* TAB 4: DONATION REQUESTS (Panel 7 & Panel 14)      */}
            {/* ================================================== */}
            {activeTab === 'requests' && (
              <div className="space-y-6">
                
                {/* Header & Tabs */}
                <div>
                  <h2 className="text-2xl font-extrabold text-stone-950 tracking-tight">
                    Donation Requests
                  </h2>
                  <p className="text-xs text-stone-500 mt-0.5">
                    NGOs and shelters requesting your surplus food.
                  </p>
                </div>

                {/* Filter Tabs */}
                <div className="flex items-center gap-2 border-b border-stone-200 pb-2 text-xs font-semibold">
                  <button
                    onClick={() => setRequestFilter('pending')}
                    className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                      requestFilter === 'pending'
                        ? 'bg-stone-900 text-white'
                        : 'text-stone-500 hover:text-stone-900'
                    }`}
                  >
                    Pending ({requestsList.filter((r) => r.status === 'pending').length})
                  </button>
                  <button
                    onClick={() => setRequestFilter('accepted')}
                    className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                      requestFilter === 'accepted'
                        ? 'bg-stone-900 text-white'
                        : 'text-stone-500 hover:text-stone-900'
                    }`}
                  >
                    Accepted ({requestsList.filter((r) => r.status === 'accepted').length})
                  </button>
                  <button
                    onClick={() => setRequestFilter('completed')}
                    className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                      requestFilter === 'completed'
                        ? 'bg-stone-900 text-white'
                        : 'text-stone-500 hover:text-stone-900'
                    }`}
                  >
                    Completed (7)
                  </button>
                </div>

                {/* Requests Cards List */}
                <div className="space-y-3">
                  {requestsList
                    .filter((r) => (requestFilter === 'pending' ? r.status === 'pending' : r.status === 'accepted'))
                    .map((req) => (
                      <div
                        key={req.id}
                        className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3.5">
                          <img
                            src={req.avatar}
                            alt={req.org}
                            className="w-12 h-12 rounded-full object-cover border-2 border-[#F59E0B]"
                          />
                          <div>
                            <h4 className="font-bold text-sm text-stone-900">{req.org}</h4>
                            <p className="text-xs font-semibold text-emerald-700 mt-0.5">{req.needs}</p>
                            <p className="text-[10px] text-stone-400 mt-0.5">
                              {req.date} • {req.distance}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-auto">
                          {req.status === 'accepted' ? (
                            <span className="px-4 py-2 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1.5">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Accepted & Assigned
                            </span>
                          ) : (
                            <button
                              onClick={() => handleAcceptRequest(req.id)}
                              className="px-5 py-2.5 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-stone-950 font-bold text-xs shadow transition-all cursor-pointer"
                            >
                              Accept Request
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                </div>

                {/* Panel 14: AI Smart Matching Suggestions */}
                <div className="bg-gradient-to-br from-[#0C4533] to-[#082E22] text-white p-6 rounded-3xl space-y-4 shadow-sm">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#F59E0B]" />
                    <h3 className="font-extrabold text-base text-white">AI Smart Matching</h3>
                  </div>
                  <p className="text-xs text-stone-300">
                    We found the best verified hunger relief NGOs based on your food type and location radius.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    <div className="bg-white/10 rounded-2xl p-3.5 border border-white/15 flex items-center justify-between">
                      <div>
                        <h5 className="font-bold text-xs text-white">Hope Foundation</h5>
                        <p className="text-[10px] text-emerald-300 font-semibold mt-0.5">96% Match</p>
                      </div>
                      <button
                        onClick={() => setActiveTab('requests')}
                        className="text-[10px] font-bold text-[#F59E0B] hover:underline cursor-pointer"
                      >
                        View →
                      </button>
                    </div>

                    <div className="bg-white/10 rounded-2xl p-3.5 border border-white/15 flex items-center justify-between">
                      <div>
                        <h5 className="font-bold text-xs text-white">Green Life NGO</h5>
                        <p className="text-[10px] text-emerald-300 font-semibold mt-0.5">91% Match</p>
                      </div>
                      <button
                        onClick={() => setActiveTab('requests')}
                        className="text-[10px] font-bold text-[#F59E0B] hover:underline cursor-pointer"
                      >
                        View →
                      </button>
                    </div>

                    <div className="bg-white/10 rounded-2xl p-3.5 border border-white/15 flex items-center justify-between">
                      <div>
                        <h5 className="font-bold text-xs text-white">Community Care</h5>
                        <p className="text-[10px] text-emerald-300 font-semibold mt-0.5">85% Match</p>
                      </div>
                      <button
                        onClick={() => setActiveTab('requests')}
                        className="text-[10px] font-bold text-[#F59E0B] hover:underline cursor-pointer"
                      >
                        View →
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* ================================================== */}
            {/* TAB 5: PICKUP TRACKING (Panel 8)                   */}
            {/* ================================================== */}
            {activeTab === 'tracking' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-extrabold text-stone-950 tracking-tight">
                    Pickup Tracking
                  </h2>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Track your food pickup and delivery in real-time.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  
                  {/* Left: Volunteer Card & Progress Stepper */}
                  <div className="lg:col-span-5 space-y-5">
                    
                    {/* Volunteer Card */}
                    <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                          alt="Rohit Sharma"
                          className="w-11 h-11 rounded-full object-cover border-2 border-emerald-500"
                        />
                        <div>
                          <h4 className="font-bold text-xs text-stone-900">Rohit Sharma</h4>
                          <p className="text-[10px] text-stone-400">Volunteer Assigned • FL-VOL-4021</p>
                        </div>
                      </div>
                      <a
                        href="tel:+15615550188"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-200 hover:bg-stone-50 text-xs font-bold text-stone-800"
                      >
                        <Phone className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Call</span>
                      </a>
                    </div>

                    {/* Progress Stepper */}
                    <div className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-xs space-y-6">
                      <h4 className="font-bold text-xs text-stone-400 uppercase tracking-wider">
                        Delivery Status
                      </h4>

                      <div className="space-y-6 relative pl-6 border-l-2 border-emerald-500/30">
                        
                        {/* Step 1 */}
                        <div className="relative">
                          <span className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white shadow-sm flex items-center justify-center text-white text-[8px]">
                            ✓
                          </span>
                          <h5 className="font-bold text-xs text-stone-900">Task Assigned</h5>
                          <p className="text-[10px] text-stone-400">Apr 27, 10:15 AM</p>
                        </div>

                        {/* Step 2 */}
                        <div className="relative">
                          <span className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white shadow-sm flex items-center justify-center text-white text-[8px]">
                            ✓
                          </span>
                          <h5 className="font-bold text-xs text-stone-900">Reached Restaurant</h5>
                          <p className="text-[10px] text-stone-400">Apr 27, 10:45 AM</p>
                        </div>

                        {/* Step 3 */}
                        <div className="relative">
                          <span className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-[#F59E0B] border-2 border-white shadow-sm animate-ping" />
                          <span className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-[#F59E0B] border-2 border-white shadow-sm" />
                          <h5 className="font-bold text-xs text-amber-900">Food Picked Up</h5>
                          <p className="text-[10px] text-[#D97706] font-semibold">In Progress</p>
                        </div>

                        {/* Step 4 */}
                        <div className="relative opacity-50">
                          <span className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-stone-300 border-2 border-white" />
                          <h5 className="font-bold text-xs text-stone-600">On the Way</h5>
                          <p className="text-[10px] text-stone-400">ETA: 15 mins</p>
                        </div>

                        {/* Step 5 */}
                        <div className="relative opacity-50">
                          <span className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-stone-300 border-2 border-white" />
                          <h5 className="font-bold text-xs text-stone-600">Delivered to Hope Foundation</h5>
                          <p className="text-[10px] text-stone-400">Pending confirmation</p>
                        </div>

                      </div>
                    </div>

                  </div>

                  {/* Right: GPS Routing Map */}
                  <div className="lg:col-span-7 bg-[#E2EBE2] rounded-3xl overflow-hidden shadow-xs border border-stone-200 min-h-[380px] relative flex items-center justify-center">
                    
                    {/* SVG Map Graphics */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 350" preserveAspectRatio="none">
                      <path d="M 420 0 Q 390 120 410 240 Q 430 300 450 350 L 500 350 L 500 0 Z" fill="#BFDBFE" />
                      <line x1="120" y1="0" x2="160" y2="350" stroke="#FDE68A" strokeWidth="8" />
                      <line x1="280" y1="0" x2="300" y2="350" stroke="#CBD5E1" strokeWidth="6" />
                      <line x1="0" y1="180" x2="420" y2="180" stroke="#FFFFFF" strokeWidth="6" />

                      {/* Route Line from Restaurant to Shelter */}
                      <path
                        d="M 120 180 Q 220 180 220 250 L 320 250"
                        stroke="#3B82F6"
                        strokeWidth="5"
                        strokeDasharray="6"
                        fill="none"
                      />
                    </svg>

                    {/* Start Pin: Restaurant */}
                    <div className="absolute top-[48%] left-[22%] -translate-x-1/2 -translate-y-1/2 z-10 text-center">
                      <div className="w-8 h-8 rounded-full bg-[#0A3F2F] text-white flex items-center justify-center shadow-lg mx-auto">
                        <Store className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-bold bg-white px-1.5 py-0.5 rounded shadow mt-1 block">
                        The Green Table
                      </span>
                    </div>

                    {/* Volunteer Moving Car Pin */}
                    <div className="absolute top-[60%] left-[44%] -translate-x-1/2 -translate-y-1/2 z-20 text-center animate-bounce">
                      <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xl mx-auto">
                        <Truck className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-bold bg-blue-900 text-white px-2 py-0.5 rounded-full shadow block mt-1">
                        Rohit (Volunteer)
                      </span>
                    </div>

                    {/* Destination Pin: Hope Foundation */}
                    <div className="absolute top-[68%] left-[64%] -translate-x-1/2 -translate-y-1/2 z-10 text-center">
                      <div className="w-8 h-8 rounded-full bg-[#F59E0B] text-stone-950 flex items-center justify-center shadow-lg mx-auto">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-bold bg-white px-1.5 py-0.5 rounded shadow mt-1 block">
                        Hope Foundation
                      </span>
                    </div>

                    {/* Live Location Tag */}
                    <div className="absolute bottom-4 right-4 bg-white/95 px-3 py-1.5 rounded-xl shadow-md border border-stone-200 text-xs font-semibold text-stone-800 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      <span>Live GPS Routing Active</span>
                    </div>
                  </div>

                </div>

              </div>
            )}

            {/* ================================================== */}
            {/* TAB 6: ANALYTICS (Panel 9)                         */}
            {/* ================================================== */}
            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-extrabold text-stone-950 tracking-tight">
                      Donation Analytics
                    </h2>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Track your community impact and waste reduction metrics.
                    </p>
                  </div>
                  <span className="text-xs font-semibold bg-white border border-stone-200 px-3 py-1.5 rounded-xl text-stone-700">
                    Last 30 days
                  </span>
                </div>

                {/* 4 Metrics */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs">
                    <span className="text-xs font-semibold text-stone-500">Total Donations</span>
                    <div className="text-3xl font-black text-stone-950 mt-1">24</div>
                    <span className="text-[11px] font-bold text-emerald-600 mt-1 block">+12%</span>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs">
                    <span className="text-xs font-semibold text-stone-500">Meals Rescued</span>
                    <div className="text-3xl font-black text-stone-950 mt-1">680</div>
                    <span className="text-[11px] font-bold text-emerald-600 mt-1 block">+18%</span>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs">
                    <span className="text-xs font-semibold text-stone-500">Food Saved</span>
                    <div className="text-3xl font-black text-stone-950 mt-1">125 kg</div>
                    <span className="text-[11px] font-bold text-emerald-600 mt-1 block">+15%</span>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs">
                    <span className="text-xs font-semibold text-stone-500">CO₂ Avoided</span>
                    <div className="text-3xl font-black text-stone-950 mt-1">280 kg</div>
                    <span className="text-[11px] font-bold text-emerald-600 mt-1 block">+11%</span>
                  </div>
                </div>

                {/* Trends Line Chart & Donut Chart */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  
                  {/* Left: Monthly Trend Chart */}
                  <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-stone-200/80 shadow-xs space-y-4">
                    <h3 className="font-bold text-sm text-stone-900">Donation Trends</h3>
                    <div className="h-48 w-full pt-4">
                      <svg className="w-full h-full" viewBox="0 0 400 140">
                        <path
                          d="M 20 120 Q 90 90 160 100 T 280 60 T 380 20"
                          fill="none"
                          stroke="#10B981"
                          strokeWidth="3.5"
                        />
                        <circle cx="20" cy="120" r="4" fill="#10B981" />
                        <circle cx="100" cy="90" r="4" fill="#10B981" />
                        <circle cx="180" cy="100" r="4" fill="#10B981" />
                        <circle cx="260" cy="65" r="4" fill="#10B981" />
                        <circle cx="340" cy="35" r="4" fill="#10B981" />
                        <circle cx="380" cy="20" r="5" fill="#F59E0B" />
                      </svg>
                      <div className="flex justify-between text-[10px] text-stone-400 font-medium">
                        <span>Apr 1</span>
                        <span>Apr 7</span>
                        <span>Apr 14</span>
                        <span>Apr 21</span>
                        <span>Apr 27</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Food Category Distribution (Donut Chart) */}
                  <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-stone-200/80 shadow-xs space-y-4">
                    <h3 className="font-bold text-sm text-stone-900">Food Category Distribution</h3>
                    
                    <div className="flex items-center justify-around gap-4 pt-2">
                      {/* SVG Donut */}
                      <div className="relative w-32 h-32 flex items-center justify-center">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                          <circle cx="18" cy="18" r="14" fill="none" stroke="#E5E7EB" strokeWidth="4" />
                          <circle
                            cx="18"
                            cy="18"
                            r="14"
                            fill="none"
                            stroke="#10B981"
                            strokeWidth="4"
                            strokeDasharray="40 100"
                          />
                          <circle
                            cx="18"
                            cy="18"
                            r="14"
                            fill="none"
                            stroke="#3B82F6"
                            strokeWidth="4"
                            strokeDasharray="25 100"
                            strokeDashoffset="-40"
                          />
                          <circle
                            cx="18"
                            cy="18"
                            r="14"
                            fill="none"
                            stroke="#F59E0B"
                            strokeWidth="4"
                            strokeDasharray="15 100"
                            strokeDashoffset="-65"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-xl font-black text-stone-950">24</span>
                          <span className="text-[9px] text-stone-400">Total</span>
                        </div>
                      </div>

                      {/* Legend */}
                      <div className="space-y-1.5 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                          <span className="text-stone-700 font-medium">Vegetables (40%)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]" />
                          <span className="text-stone-700 font-medium">Meals (25%)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                          <span className="text-stone-700 font-medium">Bakery (15%)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-stone-300" />
                          <span className="text-stone-700 font-medium">Others (20%)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            )}

            {/* ================================================== */}
            {/* TAB 7: DONATION HISTORY (Panel 10)                 */}
            {/* ================================================== */}
            {activeTab === 'history' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-extrabold text-stone-950 tracking-tight">
                    Donation History
                  </h2>
                  <p className="text-xs text-stone-500 mt-0.5">
                    All your past verified food rescue records.
                  </p>
                </div>

                <div className="bg-white rounded-3xl border border-stone-200/80 shadow-xs overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase font-semibold text-[10px]">
                      <tr>
                        <th className="px-6 py-3.5">Food Item</th>
                        <th className="px-6 py-3.5">Quantity</th>
                        <th className="px-6 py-3.5">Category</th>
                        <th className="px-6 py-3.5">Date</th>
                        <th className="px-6 py-3.5">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100 font-medium">
                      <tr>
                        <td className="px-6 py-4 flex items-center gap-3">
                          <img
                            src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=120&q=80"
                            alt="Vegetable Box"
                            className="w-9 h-9 rounded-xl object-cover"
                          />
                          <span className="font-bold text-stone-900">Vegetable Box</span>
                        </td>
                        <td className="px-6 py-4 font-semibold text-stone-700">15 kg</td>
                        <td className="px-6 py-4 text-stone-600">Vegetables</td>
                        <td className="px-6 py-4 text-stone-500">Apr 20, 2026</td>
                        <td className="px-6 py-4">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            Delivered
                          </span>
                        </td>
                      </tr>

                      <tr>
                        <td className="px-6 py-4 flex items-center gap-3">
                          <img
                            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=120&q=80"
                            alt="Cooked Meals"
                            className="w-9 h-9 rounded-xl object-cover"
                          />
                          <span className="font-bold text-stone-900">Cooked Meals</span>
                        </td>
                        <td className="px-6 py-4 font-semibold text-stone-700">25 portions</td>
                        <td className="px-6 py-4 text-stone-600">Meals</td>
                        <td className="px-6 py-4 text-stone-500">Apr 18, 2026</td>
                        <td className="px-6 py-4">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            Delivered
                          </span>
                        </td>
                      </tr>

                      <tr>
                        <td className="px-6 py-4 flex items-center gap-3">
                          <img
                            src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=120&q=80"
                            alt="Bakery Items"
                            className="w-9 h-9 rounded-xl object-cover"
                          />
                          <span className="font-bold text-stone-900">Bakery Items</span>
                        </td>
                        <td className="px-6 py-4 font-semibold text-stone-700">10 boxes</td>
                        <td className="px-6 py-4 text-stone-600">Bakery</td>
                        <td className="px-6 py-4 text-stone-500">Apr 15, 2026</td>
                        <td className="px-6 py-4">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                            Completed
                          </span>
                        </td>
                      </tr>

                      <tr>
                        <td className="px-6 py-4 flex items-center gap-3">
                          <img
                            src="https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=120&q=80"
                            alt="Fresh Fruits"
                            className="w-9 h-9 rounded-xl object-cover"
                          />
                          <span className="font-bold text-stone-900">Fresh Fruits</span>
                        </td>
                        <td className="px-6 py-4 font-semibold text-stone-700">8 kg</td>
                        <td className="px-6 py-4 text-stone-600">Fruits</td>
                        <td className="px-6 py-4 text-stone-500">Apr 12, 2026</td>
                        <td className="px-6 py-4">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                            Completed
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ================================================== */}
            {/* TAB 8: NOTIFICATIONS (Panel 11)                    */}
            {/* ================================================== */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-extrabold text-stone-950 tracking-tight">
                    Notifications
                  </h2>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Stay updated with the latest activity across your donations.
                  </p>
                </div>

                <div className="bg-white rounded-3xl border border-stone-200/80 shadow-xs divide-y divide-stone-100 overflow-hidden">
                  {notificationsList.map((notif) => (
                    <div
                      key={notif.id}
                      className="p-4 sm:p-5 flex items-start gap-3.5 hover:bg-stone-50/70 transition-colors"
                    >
                      <span className={`w-2.5 h-2.5 rounded-full ${notif.color} mt-1.5 shrink-0`} />
                      <div className="flex-1">
                        <h4 className="font-bold text-xs sm:text-sm text-stone-900">{notif.title}</h4>
                        <p className="text-xs text-stone-600 mt-0.5">{notif.desc}</p>
                      </div>
                      <span className="text-[10px] text-stone-400 font-medium whitespace-nowrap">
                        {notif.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ================================================== */}
            {/* TAB 9: SETTINGS (Panel 12)                         */}
            {/* ================================================== */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-extrabold text-stone-950 tracking-tight">
                    Settings
                  </h2>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Manage your account details and restaurant profile.
                  </p>
                </div>

                {settingsSavedToast && (
                  <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Profile settings successfully saved!
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  
                  {/* Left Tabs */}
                  <div className="md:col-span-4 bg-white p-4 rounded-3xl border border-stone-200/80 shadow-xs space-y-1 text-xs font-semibold">
                    <button className="w-full text-left px-3.5 py-2.5 rounded-xl bg-[#F59E0B] text-stone-950 font-bold">
                      Profile Information
                    </button>
                    <button className="w-full text-left px-3.5 py-2.5 rounded-xl text-stone-600 hover:bg-stone-50">
                      Restaurant Details
                    </button>
                    <button className="w-full text-left px-3.5 py-2.5 rounded-xl text-stone-600 hover:bg-stone-50">
                      Notification Preferences
                    </button>
                    <button className="w-full text-left px-3.5 py-2.5 rounded-xl text-stone-600 hover:bg-stone-50">
                      Security & Passwords
                    </button>
                    <button className="w-full text-left px-3.5 py-2.5 rounded-xl text-stone-600 hover:bg-stone-50">
                      Privacy & Data Sharing
                    </button>
                  </div>

                  {/* Right Form */}
                  <div className="md:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/80 shadow-xs space-y-6">
                    <div className="flex items-center gap-4">
                      <img
                        src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=140&q=80"
                        alt="Chef Michael"
                        className="w-16 h-16 rounded-2xl object-cover border-2 border-[#F59E0B]"
                      />
                      <div>
                        <h4 className="font-bold text-sm text-stone-900">Chef Michael</h4>
                        <p className="text-xs text-stone-500">Restaurant Owner</p>
                        <button className="text-xs font-bold text-[#D97706] hover:underline mt-1 cursor-pointer">
                          Change Photo
                        </button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={settingsName}
                          onChange={(e) => setSettingsName(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-[#F59E0B]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={settingsEmail}
                          onChange={(e) => setSettingsEmail(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-[#F59E0B]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="text"
                          value={settingsPhone}
                          onChange={(e) => setSettingsPhone(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-[#F59E0B]"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end pt-4 border-t border-stone-200">
                      <button
                        type="button"
                        onClick={() => {
                          setSettingsSavedToast(true);
                          setTimeout(() => setSettingsSavedToast(false), 2000);
                        }}
                        className="px-6 py-2.5 rounded-xl bg-[#F59E0B] text-stone-950 font-bold text-xs hover:bg-[#D97706] shadow transition-all cursor-pointer"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            )}

            {/* ================================================== */}
            {/* TAB 10: LIVE MAP VIEW (Panel 15)                   */}
            {/* ================================================== */}
            {activeTab === 'live-map' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-extrabold text-stone-950 tracking-tight">
                      Live Map View
                    </h2>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Explore active food donations, verified NGOs and volunteer dispatch routes.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold">
                      Available Donations
                    </span>
                    <span className="px-3 py-1.5 rounded-xl bg-amber-100 text-amber-800 text-xs font-bold">
                      Pickup Locations
                    </span>
                  </div>
                </div>

                <div className="bg-[#E2EBE2] rounded-3xl overflow-hidden shadow-md border border-stone-200 h-[520px] relative flex items-center justify-center">
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 520" preserveAspectRatio="none">
                    <path d="M 680 0 Q 640 180 660 360 Q 690 460 720 520 L 800 520 L 800 0 Z" fill="#BFDBFE" />
                    <line x1="200" y1="0" x2="240" y2="520" stroke="#FDE68A" strokeWidth="10" />
                    <line x1="420" y1="0" x2="450" y2="520" stroke="#CBD5E1" strokeWidth="8" />
                    <line x1="0" y1="260" x2="680" y2="260" stroke="#FFFFFF" strokeWidth="10" />
                  </svg>

                  {/* Legend Card */}
                  <div className="absolute top-5 left-5 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-stone-200 text-xs space-y-2 z-20">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                      <span className="font-semibold text-stone-800">Donations</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                      <span className="font-medium text-stone-600">NGOs</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]" />
                      <span className="font-medium text-stone-600">Volunteers</span>
                    </div>
                  </div>

                  {/* Interactive Map Pin */}
                  <div className="absolute top-[45%] left-[45%] z-20 text-center">
                    <div className="relative">
                      <span className="absolute -inset-1 rounded-full bg-emerald-500 animate-ping opacity-40" />
                      <div className="w-10 h-10 rounded-full bg-[#10B981] text-white flex items-center justify-center shadow-xl mx-auto">
                        <Store className="w-5 h-5" />
                      </div>
                    </div>
                    <div className="bg-white/95 px-3 py-1.5 rounded-xl shadow-lg border border-stone-200 mt-2 text-left">
                      <h5 className="font-bold text-xs text-stone-900">Fresh Vegetables Box</h5>
                      <p className="text-[10px] text-stone-500">15 kg • 4.2 km</p>
                      <button
                        onClick={() => setActiveTab('donations')}
                        className="text-[10px] font-bold text-[#D97706] hover:underline mt-1 block cursor-pointer"
                      >
                        View Details →
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            )}

          </main>
        </div>

      </div>

      {/* ======================================================== */}
      {/* DONATION DETAILS MODAL (Panel 6)                         */}
      {/* ======================================================== */}
      {selectedDonationDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto p-5 sm:p-8 shadow-2xl border border-stone-200 space-y-6">
            
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-stone-400">
                  My Donations &gt; Surplus Food Details &amp; Expiry
                </span>
                <span className="bg-stone-100 text-stone-700 font-mono text-[10px] px-2 py-0.5 rounded font-bold">
                  {selectedDonationDetail.id}
                </span>
              </div>
              <button
                onClick={() => setSelectedDonationDetail(null)}
                className="p-1.5 rounded-full hover:bg-stone-100 text-stone-500 hover:text-stone-800 transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Hero Image with Floating Badges */}
            <div className="relative rounded-2xl overflow-hidden shadow-sm">
              <img
                src={selectedDonationDetail.image}
                alt={selectedDonationDetail.title}
                className="w-full h-52 sm:h-60 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-between p-4 sm:p-5">
                <div className="flex items-center justify-between gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md shadow-sm ${selectedDonationDetail.statusColor}`}>
                    ● {selectedDonationDetail.status}
                  </span>
                  
                  {/* Freshness / Expiry Pill */}
                  <span className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md shadow-sm flex items-center gap-1.5 ${
                    selectedDonationDetail.expiryHoursLeft <= 4
                      ? 'bg-red-500/90 text-white border border-red-400/50'
                      : selectedDonationDetail.expiryHoursLeft <= 12
                      ? 'bg-amber-500/90 text-stone-950 border border-amber-300/50'
                      : 'bg-emerald-600/90 text-white border border-emerald-400/50'
                  }`}>
                    <Timer className="w-3.5 h-3.5" />
                    <span>
                      {selectedDonationDetail.expiryHoursLeft <= 4
                        ? `Urgent: ${selectedDonationDetail.expiryHoursLeft}h left`
                        : `Fresh: ${selectedDonationDetail.expiryHoursLeft}h safe`}
                    </span>
                  </span>
                </div>

                <div className="text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-[#F59E0B] text-stone-950 text-[10px] font-black uppercase px-2 py-0.5 rounded">
                      {selectedDonationDetail.category}
                    </span>
                    <span className="text-stone-300 text-xs font-medium">
                      {selectedDonationDetail.quantity} • {selectedDonationDetail.servings || 'Feeds multiple people'}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight drop-shadow-xs">
                    {selectedDonationDetail.title}
                  </h3>
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
                      Real-time duration active and safe consumption countdown
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-amber-800 bg-amber-100/80 px-2.5 py-0.5 rounded-full border border-amber-300/60">
                  {selectedDonationDetail.totalShelfLifeHours || 6}h Total Shelf Life
                </span>
              </div>

              {/* 3-Column Time Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                {/* 1. Preparation Time */}
                <div className="bg-white/90 p-3 rounded-xl border border-stone-200/80 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-stone-400 text-[10px] font-bold uppercase tracking-wider mb-1">
                    <Utensils className="w-3 h-3 text-stone-500" />
                    <span>Cooked / Prepared</span>
                  </div>
                  <div className="font-black text-sm text-stone-900">
                    {selectedDonationDetail.prepTime || 'Today, 11:30 AM'}
                  </div>
                  <div className="text-[10px] text-stone-500 mt-0.5 font-medium">
                    Date: {selectedDonationDetail.prepDate || selectedDonationDetail.pickupDate}
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
                    {selectedDonationDetail.activeDuration || '2h 10m active'}
                  </div>
                  <div className="text-[10px] text-emerald-700 mt-0.5 font-medium">
                    Broadcasted to nearby NGOs
                  </div>
                </div>

                {/* 3. Expiry Deadline */}
                <div className="bg-white/90 p-3 rounded-xl border border-amber-200/80 shadow-2xs bg-amber-50/30">
                  <div className="flex items-center gap-1.5 text-amber-700 text-[10px] font-bold uppercase tracking-wider mb-1">
                    <AlertTriangle className="w-3 h-3 text-amber-600" />
                    <span>Expiry Cutoff Time</span>
                  </div>
                  <div className="font-black text-sm text-amber-950">
                    {selectedDonationDetail.expiresAt || selectedDonationDetail.safeUntil}
                  </div>
                  <div className="text-[10px] text-amber-800 mt-0.5 font-medium">
                    Strict food safety limit
                  </div>
                </div>
              </div>

              {/* Visual Expiry Timeline Progress Bar */}
              <div className="bg-white/90 p-3.5 rounded-xl border border-stone-200/80 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-stone-600 flex items-center gap-1">
                    <span>Safe Window Progress:</span>
                    <span className="font-bold text-stone-900">
                      {selectedDonationDetail.expiryPercent || 40}% Elapsed
                    </span>
                  </span>
                  <span className="text-amber-800 font-bold bg-amber-100/70 px-2 py-0.5 rounded text-[11px]">
                    ⏳ {selectedDonationDetail.expiryHoursLeft} Hours Remaining
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-stone-100 h-2.5 rounded-full overflow-hidden p-0.5 border border-stone-200">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      (selectedDonationDetail.expiryPercent || 40) > 75
                        ? 'bg-red-500'
                        : (selectedDonationDetail.expiryPercent || 40) > 50
                        ? 'bg-amber-500'
                        : 'bg-emerald-500'
                    }`}
                    style={{ width: `${Math.min(100, selectedDonationDetail.expiryPercent || 40)}%` }}
                  />
                </div>

                {/* Timeline Markers */}
                <div className="flex items-center justify-between text-[10px] font-medium text-stone-400 pt-0.5">
                  <span>🟢 Cooked (0h)</span>
                  <span className="text-stone-700 font-semibold">
                    📍 Current: {selectedDonationDetail.activeDuration || 'Active'}
                  </span>
                  <span>🔴 Expiry Deadline ({selectedDonationDetail.totalShelfLifeHours || 6}h)</span>
                </div>
              </div>
            </div>

            {/* ======================================================== */}
            {/* SECTION 2: DONATION DETAILS ("Kya hai" - Contents)       */}
            {/* ======================================================== */}
            <div className="space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-stone-500" />
                Donation Details &amp; Food Specifications
              </h4>

              {/* Food Description */}
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed bg-stone-50 p-3.5 rounded-xl border border-stone-200/70">
                {selectedDonationDetail.description ||
                  'Fresh surplus meals prepared under verified food hygiene standards. 100% untouched and unserved surplus food.'}
              </p>

              {/* Dishes & Menu Items Breakdown */}
              {selectedDonationDetail.itemsList && selectedDonationDetail.itemsList.length > 0 && (
                <div>
                  <span className="block text-[11px] font-bold text-stone-500 mb-1.5 uppercase tracking-wider">
                    Included Items &amp; Dishes:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedDonationDetail.itemsList.map((item: string, idx: number) => (
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
              {selectedDonationDetail.dietary && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {selectedDonationDetail.dietary.map((tag: string, idx: number) => (
                    <span
                      key={idx}
                      className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-lg"
                    >
                      ✓ {tag}
                    </span>
                  ))}
                  {selectedDonationDetail.allergens && (
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded-lg">
                      Allergens: {selectedDonationDetail.allergens}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* ======================================================== */}
            {/* SECTION 3: LOGISTICS & FOOD SAFETY SPECS                 */}
            {/* ======================================================== */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-stone-50 p-4 rounded-2xl border border-stone-200/80">
              <div className="space-y-1">
                <span className="text-stone-400 font-semibold block text-[10px] uppercase">
                  Storage &amp; Temperature
                </span>
                <span className="font-bold text-stone-900 block flex items-center gap-1.5">
                  {selectedDonationDetail.storage.includes('Hot') ? (
                    <Flame className="w-3.5 h-3.5 text-red-500" />
                  ) : (
                    <Snowflake className="w-3.5 h-3.5 text-blue-500" />
                  )}
                  {selectedDonationDetail.storage}
                </span>
                <span className="text-[10px] text-stone-500 font-medium">
                  Recorded Temp: {selectedDonationDetail.storageTemp || 'Verified on dispatch'}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-stone-400 font-semibold block text-[10px] uppercase">
                  Packaging Container
                </span>
                <span className="font-bold text-stone-900 block flex items-center gap-1.5">
                  <Package className="w-3.5 h-3.5 text-emerald-600" />
                  {selectedDonationDetail.packaging || 'Food-Grade Sealed Containers'}
                </span>
                <span className="text-[10px] text-stone-500 font-medium">
                  Sealed &amp; tamper-evident
                </span>
              </div>

              <div className="space-y-1 pt-2 sm:pt-0 sm:border-t-0 border-t border-stone-200/60">
                <span className="text-stone-400 font-semibold block text-[10px] uppercase">
                  Pickup Slot
                </span>
                <span className="font-bold text-stone-900 block flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-500" />
                  {selectedDonationDetail.pickupSlot || '10:00 AM - 12:00 PM'}
                </span>
                <span className="text-[10px] text-stone-500 font-medium">
                  Pickup Date: {selectedDonationDetail.pickupDate}
                </span>
              </div>

              <div className="space-y-1 pt-2 sm:pt-0 sm:border-t-0 border-t border-stone-200/60">
                <span className="text-stone-400 font-semibold block text-[10px] uppercase">
                  Donor Restaurant
                </span>
                <span className="font-bold text-emerald-800 block flex items-center gap-1.5">
                  <Store className="w-3.5 h-3.5 text-emerald-700" />
                  The Green Table Restaurant
                </span>
                <span className="text-[10px] text-stone-500 font-medium">
                  {selectedDonationDetail.distance} away from volunteer hub
                </span>
              </div>
            </div>

            {/* Food Safety Guarantee Tag */}
            <div className="bg-emerald-50/80 border border-emerald-200 p-3 rounded-xl flex items-center gap-2.5 text-xs text-emerald-900">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <span className="font-bold block">FSSAI Surplus Food Regulations Certified</span>
                <span className="text-[10px] text-emerald-700">
                  Strictly unused and unserved food that has not been served to customers. Safe for human redistribution.
                </span>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setSelectedDonationDetail(null)}
                className="flex-1 py-3 rounded-xl bg-[#0A3F2F] text-white font-bold text-xs hover:bg-[#072F23] transition-all cursor-pointer text-center shadow-md hover:shadow-lg"
              >
                Close Details
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

