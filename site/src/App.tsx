import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { Agentation } from 'agentation';
import { ArrowUp } from 'lucide-react';

import CustomCursor from './components/CustomCursor';
import VelaBot3D from './components/VelaBot3D';
import HarvestLandingPage from './components/HarvestLandingPage';
import VelaLiveDispatchMap from './components/VelaLiveDispatchMap';
import PalmBeachAuthPage, { AuthRole } from './components/PalmBeachAuthPage';
import RestaurantDashboard from './components/RestaurantDashboard';
import NgoDashboard from './components/NgoDashboard';
import VolunteerDashboard from './components/VolunteerDashboard';
import { UserProfile, DEMO_DONOR_USER, DEMO_RECEIVER_USER, DEMO_VOLUNTEER_USER } from './types';

export type AppView = 'landing' | 'auth' | 'donor-dashboard' | 'receiver-dashboard' | 'volunteer-dashboard';

export default function App() {
  const scrollProgressRef = useRef(0);
  const lenisRef = useRef<Lenis | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [showMapModal, setShowMapModal] = useState(false);
  const [targetAuthRole, setTargetAuthRole] = useState<AuthRole>('restaurant');

  // Sync initial hash route if present
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === '#/auth' || hash === '#auth') {
        setCurrentView('auth');
      } else if (
        hash === '#/donor-dashboard' ||
        hash === '#donor-dashboard' ||
        hash === '#/restaurant-dashboard' ||
        hash === '#restaurant-dashboard'
      ) {
        setCurrentView('donor-dashboard');
      } else if (
        hash === '#/receiver-dashboard' ||
        hash === '#receiver-dashboard' ||
        hash === '#/ngo-dashboard' ||
        hash === '#ngo-dashboard'
      ) {
        setCurrentView('receiver-dashboard');
      } else if (
        hash === '#/volunteer-dashboard' ||
        hash === '#volunteer-dashboard' ||
        hash === '#/volunteer' ||
        hash === '#volunteer'
      ) {
        setCurrentView('volunteer-dashboard');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigateTo = (view: AppView) => {
    setCurrentView(view);
    if (view === 'landing') {
      window.history.pushState(null, '', window.location.pathname);
    } else {
      window.location.hash = `/${view}`;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToAuthWithRole = (role: AuthRole = 'restaurant') => {
    setTargetAuthRole(role);
    navigateTo('auth');
  };

  const scrollToTop = () => {
    if (lenisRef.current && currentView === 'landing') {
      lenisRef.current.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Lenis smooth scroll active on landing page
  useEffect(() => {
    if (currentView !== 'landing') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !prefersReducedMotion,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    lenis.on('scroll', (e: { progress: number; scroll: number }) => {
      scrollProgressRef.current = e.progress;
      setShowScrollTop(e.scroll > 320);

      const bar = document.getElementById('scroll-progress-line');
      if (bar) {
        bar.style.width = `${e.progress * 100}%`;
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    const observeElements = () => {
      document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    };

    observeElements();
    const timeout = setTimeout(observeElements, 250);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, [currentView]);

  return (
    <div className="relative min-h-screen bg-[#FBF6EF] text-[#0D0D0C] selection:bg-[#0D0D0C]/15 selection:text-[#0D0D0C]">
      {/* Agentation Visual Feedback & Annotation Toolbar */}
      <Agentation endpoint="http://localhost:4747" appName="Vela / Food Surplus Platform" />

      {/* Custom Circular Cursor Follower */}
      <CustomCursor />

      {/* Interactive 3D Chatbot Companion (VelaBot) - Always Available Everywhere */}
      <VelaBot3D />

      {/* ======================================================== */}
      {/* VIEW 1: FULL-PAGE AUTH VIEW (Matching Uploaded Image)     */}
      {/* ======================================================== */}
      {currentView === 'auth' && (
        <PalmBeachAuthPage
          initialRole={targetAuthRole}
          onBackToHome={() => navigateTo('landing')}
          onLoginSuccess={(user) => {
            setCurrentUser(user);
            if (user.roleType === 'restaurant') {
              navigateTo('donor-dashboard');
            } else if (user.roleType === 'ngo') {
              navigateTo('receiver-dashboard');
            } else if (user.roleType === 'volunteer') {
              navigateTo('volunteer-dashboard');
            } else {
              navigateTo(user.role === 'giver' ? 'donor-dashboard' : 'receiver-dashboard');
            }
          }}
        />
      )}

      {/* ======================================================== */}
      {/* VIEW 2: FULL-PAGE DONOR DASHBOARD (Restaurant Dashboard) */}
      {/* ======================================================== */}
      {currentView === 'donor-dashboard' && (
        <RestaurantDashboard
          user={currentUser || DEMO_DONOR_USER}
          onClose={() => navigateTo('landing')}
          onSwitchRole={() => {
            setCurrentUser(DEMO_RECEIVER_USER);
            navigateTo('receiver-dashboard');
          }}
          onSignOut={() => {
            setCurrentUser(null);
            navigateTo('auth');
          }}
        />
      )}

      {/* ======================================================== */}
      {/* VIEW 3: FULL-PAGE NGO DASHBOARD (Hope Foundation)        */}
      {/* ======================================================== */}
      {currentView === 'receiver-dashboard' && (
        <NgoDashboard
          user={currentUser || DEMO_RECEIVER_USER}
          onClose={() => navigateTo('landing')}
          onSwitchRole={() => {
            setCurrentUser(DEMO_DONOR_USER);
            navigateTo('donor-dashboard');
          }}
          onSignOut={() => {
            setCurrentUser(null);
            navigateTo('auth');
          }}
        />
      )}

      {/* ======================================================== */}
      {/* VIEW 4: FULL-PAGE VOLUNTEER DASHBOARD (Rahul Sharma)      */}
      {/* ======================================================== */}
      {currentView === 'volunteer-dashboard' && (
        <VolunteerDashboard
          user={currentUser || DEMO_VOLUNTEER_USER}
          onClose={() => navigateTo('landing')}
          onSwitchRole={(targetRole) => {
            if (targetRole === 'restaurant') {
              setCurrentUser(DEMO_DONOR_USER);
              navigateTo('donor-dashboard');
            } else {
              setCurrentUser(DEMO_RECEIVER_USER);
              navigateTo('receiver-dashboard');
            }
          }}
          onSignOut={() => {
            setCurrentUser(null);
            navigateTo('auth');
          }}
        />
      )}

      {/* ======================================================== */}
      {/* VIEW 5: FULL-PAGE LANDING WEBSITE                        */}
      {/* ======================================================== */}
      {currentView === 'landing' && (
        <>
          {/* Floating Hover-to-Top Button */}
          <button
            onClick={scrollToTop}
            className={`group fixed bottom-6 left-6 z-[950] flex items-center gap-2 rounded-full border border-[#0D0D0C]/15 bg-[#FBF6EF]/90 px-3.5 py-2 text-xs font-medium text-[#0D0D0C] shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-[#0D0D0C] hover:text-[#FBF6EF] hover:border-[#0D0D0C] cursor-pointer ${
              showScrollTop
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 translate-y-4 pointer-events-none'
            }`}
            aria-label="Scroll to top"
            title="Hover & click to scroll to top"
          >
            <ArrowUp className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
            <span className="font-mono text-[11px] font-semibold tracking-tight">Top</span>
          </button>

          {/* Top Thin Scroll Progress Line */}
          <div
            id="scroll-progress-line"
            className="scroll-progress-line"
            aria-hidden="true"
          />

          {/* Palm Beach Harvest Landing Page Layout matching user's design */}
          <main className="w-full">
            <HarvestLandingPage 
              onNavigate={navigateTo} 
              onNavigateToAuth={navigateToAuthWithRole}
              onOpenMapModal={() => setShowMapModal(true)} 
            />
          </main>

          {/* Interactive Live Community Food Dispatch Map Modal */}
          {showMapModal && (
            <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
              <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-white rounded-3xl shadow-2xl p-6 border border-stone-200">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-stone-200">
                  <div>
                    <h3 className="text-xl font-black text-stone-900">Live Community Food Dispatch Map</h3>
                    <p className="text-xs text-stone-500">Real-time GPS routing between Food Donors, Volunteers & Shelters</p>
                  </div>
                  <button 
                    onClick={() => setShowMapModal(false)}
                    className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center font-bold text-sm cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
                <VelaLiveDispatchMap onClose={() => setShowMapModal(false)} />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
