import { useState, useEffect, useRef } from 'react';
import {
  Navigation, Phone, ShieldCheck, Thermometer, BatteryCharging,
  Maximize2, Minimize2, Play, Pause, RotateCcw, FastForward,
  MapPin, CheckCircle2, AlertCircle, Compass, Layers, Car
} from 'lucide-react';

interface VelaLiveDispatchMapProps {
  batchId?: string;
  donorName?: string;
  donorAddress?: string;
  receiverName?: string;
  receiverAddress?: string;
  foodDescription?: string;
  temperature?: string;
  quantity?: string;
  onClose?: () => void;
  fullWidth?: boolean;
}

export default function VelaLiveDispatchMap({
  batchId = 'SUR-8421',
  donorName = 'Rajdhani Royal Heritage Kitchen',
  donorAddress = 'MI Road, C-Scheme, Jaipur',
  receiverName = 'Akshaya Aahar Community Center',
  receiverAddress = 'Sector 4, Jawahar Nagar, Jaipur',
  foodDescription = '340 Meals • Shahi Paneer, Dal Makhani & Jeera Rice',
  temperature = '64.5°C',
  quantity = '85 kg',
  fullWidth = true,
}: VelaLiveDispatchMapProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0.42); // 0 to 1
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [mapTheme, setMapTheme] = useState<'clean' | 'night'>('clean');
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedWaypoint, setSelectedWaypoint] = useState<'donor' | 'car' | 'receiver'>('car');

  const pathRef = useRef<SVGPathElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  // Path definition across Jaipur street grid:
  // Starts at Donor (x: 140, y: 170) -> turns through C-Scheme -> Statue Circle -> JLN Marg -> Jawahar Nagar Dropoff (x: 820, y: 490)
  const routePathD = "M 150 160 L 290 160 Q 310 160 310 180 L 310 270 Q 310 290 330 290 L 460 290 Q 480 290 480 310 L 480 370 Q 480 390 500 400 L 630 460 Q 650 470 670 470 L 800 470 Q 820 470 820 490 L 820 530";

  // Vehicle coordinate state
  const [carPos, setCarPos] = useState({ x: 420, y: 290, angle: 0 });

  // Update car position along SVG path
  useEffect(() => {
    if (!pathRef.current) return;
    const path = pathRef.current;
    const totalLength = path.getTotalLength();
    const currentLength = Math.max(0, Math.min(totalLength, progress * totalLength));

    const pt = path.getPointAtLength(currentLength);
    const lookAhead = Math.min(totalLength, currentLength + 4);
    const nextPt = path.getPointAtLength(lookAhead);

    const angle = Math.atan2(nextPt.y - pt.y, nextPt.x - pt.x) * (180 / Math.PI);
    setCarPos({ x: pt.x, y: pt.y, angle });
  }, [progress]);

  // RequestAnimationFrame animation loop
  useEffect(() => {
    if (!isPlaying) return;

    const animate = (time: number) => {
      if (lastTimeRef.current !== null) {
        const delta = (time - lastTimeRef.current) / 1000;
        // Total route time ~ 35 seconds at 1x speed
        const speed = (1 / 32) * speedMultiplier;
        setProgress((prev) => {
          const next = prev + speed * delta;
          if (next >= 1) {
            return 0; // Loop or reach destination
          }
          return next;
        });
      }
      lastTimeRef.current = time;
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      lastTimeRef.current = null;
    };
  }, [isPlaying, speedMultiplier]);

  // Derived Real-Time Stats
  const totalDistanceKm = 4.8;
  const remainingDistanceKm = Math.max(0.1, (totalDistanceKm * (1 - progress))).toFixed(1);
  const remainingMinutes = Math.max(1, Math.round(14 * (1 - progress)));
  const currentSpeed = isPlaying ? Math.round(34 + Math.sin(progress * 20) * 6) : 0;
  const currentTemp = (64.8 - progress * 1.6).toFixed(1); // Gradually cools slightly from 64.8°C to 63.2°C, well above 60°C

  return (
    <div
      className={`relative rounded-3xl overflow-hidden transition-all duration-300 border border-gray-200/80 shadow-md ${
        isExpanded ? 'fixed inset-4 z-[990] bg-white m-0' : 'w-full bg-white'
      } ${mapTheme === 'night' ? 'bg-[#11161B]' : 'bg-[#F8F9F6]'}`}
    >
      {/* =================================================================== */}
      {/* TOP BAR / DISPATCH CONTROLS                                         */}
      {/* =================================================================== */}
      <div
        className={`px-5 py-3.5 flex flex-wrap items-center justify-between gap-3 border-b transition-colors ${
          mapTheme === 'night'
            ? 'bg-[#182026] border-white/10 text-white'
            : 'bg-white border-gray-100 text-gray-900'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-2xl bg-[#FF6422] text-white flex items-center justify-center font-bold text-sm shadow-sm shadow-orange-500/20">
            <Navigation className="h-4 w-4 rotate-45" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold font-mono tracking-tight text-[#FF6422]">
                LIVE GPS DISPATCH
              </span>
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-mono text-gray-400 font-semibold">
                #{batchId}
              </span>
            </div>
            <div className="text-sm font-bold truncate max-w-xs sm:max-w-md">
              {foodDescription}
            </div>
          </div>
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2">
          {/* Map theme toggle */}
          <button
            onClick={() => setMapTheme(mapTheme === 'clean' ? 'night' : 'clean')}
            className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              mapTheme === 'night'
                ? 'bg-white/10 hover:bg-white/20 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
            title="Toggle Map Style"
          >
            <Layers className="h-3.5 w-3.5" />
            <span className="hidden sm:inline text-[11px]">
              {mapTheme === 'clean' ? 'Night GPS' : 'Light Street'}
            </span>
          </button>

          {/* Speed Multiplier */}
          <button
            onClick={() => setSpeedMultiplier((prev) => (prev === 1 ? 2 : prev === 2 ? 4 : 1))}
            className={`px-2.5 py-1.5 rounded-xl font-mono text-[11px] font-bold transition-all cursor-pointer ${
              mapTheme === 'night' ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-800'
            }`}
            title="Playback Speed"
          >
            {speedMultiplier}x
          </button>

          {/* Play/Pause */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded-xl bg-[#0D0D0C] text-white hover:bg-gray-800 transition-colors cursor-pointer"
            title={isPlaying ? 'Pause Simulation' : 'Resume Simulation'}
          >
            {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
          </button>

          {/* Reset Route */}
          <button
            onClick={() => setProgress(0)}
            className={`p-2 rounded-xl transition-colors cursor-pointer ${
              mapTheme === 'night' ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-700'
            }`}
            title="Restart Route from Kitchen"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>

          {/* Expand Fullscreen Toggle */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`p-2 rounded-xl transition-colors cursor-pointer ${
              mapTheme === 'night' ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-700'
            }`}
            title={isExpanded ? 'Contract Map' : 'Full Screen Map'}
          >
            {isExpanded ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>

      {/* =================================================================== */}
      {/* INTERACTIVE VECTOR MAP CANVAS (Jaipur Cold-Chain Corridor)          */}
      {/* =================================================================== */}
      <div className="relative w-full h-[360px] sm:h-[440px] md:h-[480px] select-none overflow-hidden">
        
        <svg
          viewBox="0 0 960 620"
          className="w-full h-full object-cover"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* Street Grid pattern */}
            <pattern id="street-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke={mapTheme === 'night' ? '#1D2730' : '#EAECE6'}
                strokeWidth="1"
              />
            </pattern>

            {/* Linear gradient for completed route */}
            <linearGradient id="route-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="60%" stopColor="#FF6422" />
              <stop offset="100%" stopColor="#FF4500" />
            </linearGradient>

            {/* Radar glow filter */}
            <filter id="radar-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Base Map Background */}
          <rect
            width="960"
            height="620"
            fill={mapTheme === 'night' ? '#0F161C' : '#F6F7F3'}
          />

          {/* City Grid Texture */}
          <rect width="960" height="620" fill="url(#street-grid)" />

          {/* =============================================================== */}
          {/* CITY PARKS & LANDMARKS (Greenery & Geography)                   */}
          {/* =============================================================== */}
          {/* Central Park Jaipur */}
          <g opacity={mapTheme === 'night' ? 0.35 : 0.85}>
            <rect
              x="220"
              y="320"
              width="180"
              height="150"
              rx="24"
              fill={mapTheme === 'night' ? '#132820' : '#E3EEDC'}
              stroke={mapTheme === 'night' ? '#1B3B2F' : '#CFE3C5'}
              strokeWidth="1.5"
            />
            <text
              x="310"
              y="400"
              fill={mapTheme === 'night' ? '#5FA782' : '#4E8A5E'}
              fontSize="11"
              fontWeight="bold"
              fontFamily="sans-serif"
              textAnchor="middle"
              letterSpacing="0.05em"
            >
              CENTRAL PARK
            </text>
            <text
              x="310"
              y="418"
              fill={mapTheme === 'night' ? '#43795E' : '#6F9D7D'}
              fontSize="9"
              fontFamily="sans-serif"
              textAnchor="middle"
            >
              Green Buffer Zone
            </text>
          </g>

          {/* Albert Hall & Ram Niwas Garden */}
          <g opacity={mapTheme === 'night' ? 0.35 : 0.85}>
            <rect
              x="540"
              y="180"
              width="140"
              height="120"
              rx="18"
              fill={mapTheme === 'night' ? '#132820' : '#E3EEDC'}
              stroke={mapTheme === 'night' ? '#1B3B2F' : '#CFE3C5'}
              strokeWidth="1.5"
            />
            <text
              x="610"
              y="245"
              fill={mapTheme === 'night' ? '#5FA782' : '#4E8A5E'}
              fontSize="10"
              fontWeight="bold"
              fontFamily="sans-serif"
              textAnchor="middle"
            >
              RAM NIWAS BAGH
            </text>
          </g>

          {/* Commercial City Blocks */}
          {[
            { x: 80, y: 80, w: 180, h: 60, label: 'C-SCHEME COMMERCIAL' },
            { x: 340, y: 80, w: 160, h: 60, label: 'CIVIL LINES ENCLAVE' },
            { x: 680, y: 90, w: 190, h: 70, label: 'ADARSH NAGAR' },
            { x: 100, y: 350, w: 100, h: 140, label: 'PRITHVIRAJ ROAD' },
            { x: 520, y: 330, w: 110, h: 90, label: 'SMS HOSPITAL ZONE' },
            { x: 670, y: 330, w: 160, h: 110, label: 'JAWAHAR NAGAR SECTORS' },
            { x: 740, y: 520, w: 170, h: 70, label: 'TRANSPORT NAGAR' },
          ].map((b, i) => (
            <g key={i} opacity={mapTheme === 'night' ? 0.5 : 0.9}>
              <rect
                x={b.x}
                y={b.y}
                width={b.w}
                height={b.h}
                rx="8"
                fill={mapTheme === 'night' ? '#17202A' : '#ECEEE7'}
                stroke={mapTheme === 'night' ? '#212E3B' : '#DFE2D8'}
                strokeWidth="1"
              />
              <text
                x={b.x + b.w / 2}
                y={b.y + b.h / 2 + 3}
                fill={mapTheme === 'night' ? '#5E7082' : '#8A9284'}
                fontSize="8"
                fontFamily="monospace"
                fontWeight="600"
                textAnchor="middle"
              >
                {b.label}
              </text>
            </g>
          ))}

          {/* =============================================================== */}
          {/* MAJOR STREET ARTERIALS (Background Roads)                       */}
          {/* =============================================================== */}
          {/* MI Road (East-West corridor) */}
          <line
            x1="40"
            y1="160"
            x2="920"
            y2="160"
            stroke={mapTheme === 'night' ? '#263442' : '#D6DCD0'}
            strokeWidth="16"
            strokeLinecap="round"
          />
          <text
            x="200"
            y="152"
            fill={mapTheme === 'night' ? '#6B7E93' : '#737C6D'}
            fontSize="9"
            fontFamily="monospace"
            fontWeight="bold"
            letterSpacing="0.1em"
          >
            M.I. ROAD (COMMERCIAL ARTERIAL)
          </text>

          {/* Bhagwan Das Road */}
          <line
            x1="310"
            y1="60"
            x2="310"
            y2="540"
            stroke={mapTheme === 'night' ? '#263442' : '#D6DCD0'}
            strokeWidth="14"
            strokeLinecap="round"
          />

          {/* Ashok Marg */}
          <line
            x1="40"
            y1="290"
            x2="920"
            y2="290"
            stroke={mapTheme === 'night' ? '#263442' : '#D6DCD0'}
            strokeWidth="14"
            strokeLinecap="round"
          />
          <text
            x="360"
            y="282"
            fill={mapTheme === 'night' ? '#6B7E93' : '#737C6D'}
            fontSize="9"
            fontFamily="monospace"
            fontWeight="bold"
          >
            ASHOK MARG
          </text>

          {/* JLN Marg (South-East Arterial to Jawahar Nagar) */}
          <path
            d="M 480 290 L 480 370 L 630 460 L 920 460"
            fill="none"
            stroke={mapTheme === 'night' ? '#263442' : '#D6DCD0'}
            strokeWidth="16"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text
            x="540"
            y="410"
            fill={mapTheme === 'night' ? '#6B7E93' : '#737C6D'}
            fontSize="9"
            fontFamily="monospace"
            fontWeight="bold"
            transform="rotate(32, 540, 410)"
          >
            J.L.N. MARG EXPRESS
          </text>

          {/* Statue Circle Roundabout */}
          <circle
            cx="310"
            cy="290"
            r="28"
            fill={mapTheme === 'night' ? '#17232E' : '#E4E8DF'}
            stroke={mapTheme === 'night' ? '#324759' : '#CBD2C4'}
            strokeWidth="2"
          />
          <circle
            cx="310"
            cy="290"
            r="12"
            fill={mapTheme === 'night' ? '#1E3140' : '#CFD7C7'}
          />
          <text
            x="310"
            y="293"
            fill={mapTheme === 'night' ? '#7A91A8' : '#697463'}
            fontSize="7"
            fontFamily="sans-serif"
            fontWeight="bold"
            textAnchor="middle"
          >
            STATUE CIRCLE
          </text>

          {/* =============================================================== */}
          {/* DISPATCH ACTIVE ROUTE (Ola/Uber Style Polyline)                  */}
          {/* =============================================================== */}
          {/* 1. Underlying Route Halo/Glow */}
          <path
            d={routePathD}
            fill="none"
            stroke="#FF6422"
            strokeWidth="12"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.18"
          />

          {/* 2. Full Planned Route (Dashed Ahead) */}
          <path
            ref={pathRef}
            d={routePathD}
            fill="none"
            stroke={mapTheme === 'night' ? '#3B4E61' : '#CBD4C5'}
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="6 6"
          />

          {/* 3. Completed Route Trace (Solid Highlight behind car) */}
          {pathRef.current && (
            <path
              d={routePathD}
              fill="none"
              stroke="url(#route-gradient)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={`${progress * pathRef.current.getTotalLength()} ${pathRef.current.getTotalLength()}`}
            />
          )}

          {/* =============================================================== */}
          {/* WAYPOINT A: DONOR KITCHEN (Start Pin)                           */}
          {/* =============================================================== */}
          <g
            className="cursor-pointer transition-transform hover:scale-110"
            onClick={() => setSelectedWaypoint('donor')}
            transform="translate(150, 160)"
          >
            {/* Pulsing ring */}
            <circle cx="0" cy="0" r="18" fill="#10B981" opacity="0.2">
              <animate attributeName="r" values="12;24;12" dur="2.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.3;0;0.3" dur="2.4s" repeatCount="indefinite" />
            </circle>
            {/* Solid Pin */}
            <circle cx="0" cy="0" r="10" fill="#10B981" stroke="#FFFFFF" strokeWidth="2.5" />
            <text x="0" y="3.5" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle">
              A
            </text>

            {/* Label Card */}
            <g transform="translate(14, -20)">
              <rect
                x="0"
                y="0"
                width="140"
                height="32"
                rx="6"
                fill={mapTheme === 'night' ? '#17202A' : '#FFFFFF'}
                stroke="#10B981"
                strokeWidth="1.5"
                filter="drop-shadow(0 2px 4px rgba(0,0,0,0.12))"
              />
              <text
                x="8"
                y="13"
                fill="#10B981"
                fontSize="8"
                fontFamily="sans-serif"
                fontWeight="bold"
              >
                PICKUP (DONOR)
              </text>
              <text
                x="8"
                y="24"
                fill={mapTheme === 'night' ? '#FFFFFF' : '#0D0D0C'}
                fontSize="9"
                fontFamily="sans-serif"
                fontWeight="bold"
              >
                Rajdhani Royal Kitchen
              </text>
            </g>
          </g>

          {/* =============================================================== */}
          {/* WAYPOINT B: RECEIVER NGO / SCHOOL (Destination Pin)             */}
          {/* =============================================================== */}
          <g
            className="cursor-pointer transition-transform hover:scale-110"
            onClick={() => setSelectedWaypoint('receiver')}
            transform="translate(820, 530)"
          >
            {/* Pulsing target */}
            <circle cx="0" cy="0" r="22" fill="#FF6422" opacity="0.25">
              <animate attributeName="r" values="14;28;14" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.4;0;0.4" dur="2s" repeatCount="indefinite" />
            </circle>
            {/* Pin */}
            <circle cx="0" cy="0" r="11" fill="#FF6422" stroke="#FFFFFF" strokeWidth="2.5" />
            <text x="0" y="3.5" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle">
              B
            </text>

            {/* Label Card */}
            <g transform="translate(-165, -20)">
              <rect
                x="0"
                y="0"
                width="155"
                height="32"
                rx="6"
                fill={mapTheme === 'night' ? '#17202A' : '#FFFFFF'}
                stroke="#FF6422"
                strokeWidth="1.5"
                filter="drop-shadow(0 2px 4px rgba(0,0,0,0.12))"
              />
              <text
                x="8"
                y="13"
                fill="#FF6422"
                fontSize="8"
                fontFamily="sans-serif"
                fontWeight="bold"
              >
                DESTINATION (RECEIVER)
              </text>
              <text
                x="8"
                y="24"
                fill={mapTheme === 'night' ? '#FFFFFF' : '#0D0D0C'}
                fontSize="9"
                fontFamily="sans-serif"
                fontWeight="bold"
              >
                Akshaya Aahar Center
              </text>
            </g>
          </g>

          {/* =============================================================== */}
          {/* OLA / UBER REAL-TIME MOVING VEHICLE (Smooth Animated EV Van)    */}
          {/* =============================================================== */}
          <g
            transform={`translate(${carPos.x}, ${carPos.y}) rotate(${carPos.angle})`}
            className="cursor-pointer"
            onClick={() => setSelectedWaypoint('car')}
          >
            {/* Forward Headlight / Radar Cone */}
            <polygon
              points="0,0 70,-26 70,26"
              fill={mapTheme === 'night' ? '#FFD166' : '#FF9F1C'}
              opacity={mapTheme === 'night' ? '0.18' : '0.12'}
            />

            {/* Pulsing GPS Pulse Ring */}
            <circle cx="0" cy="0" r="24" fill="#FF6422" opacity="0.3">
              <animate attributeName="r" values="16;32;16" dur="1.6s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.4;0;0.4" dur="1.6s" repeatCount="indefinite" />
            </circle>

            {/* Drop Shadow under vehicle */}
            <ellipse cx="-2" cy="1" rx="14" ry="9" fill="black" opacity="0.35" />

            {/* Realistic Food Recovery EV Van Body (Top-down view) */}
            {/* Van Base / Cab */}
            <rect
              x="-14"
              y="-8"
              width="28"
              height="16"
              rx="4"
              fill="#0D0D0C"
              stroke="#FF6422"
              strokeWidth="2"
            />
            {/* Insulated Cold-Chain Cargo Compartment (Rear) */}
            <rect
              x="-12"
              y="-7"
              width="15"
              height="14"
              rx="2"
              fill="#FF6422"
            />
            {/* Vela Logo Symbol on Van Roof */}
            <text
              x="-4"
              y="3"
              fill="#FFFFFF"
              fontSize="6"
              fontWeight="bold"
              fontFamily="sans-serif"
              textAnchor="middle"
            >
              V
            </text>
            {/* Windshield */}
            <rect
              x="5"
              y="-5.5"
              width="5"
              height="11"
              rx="1.5"
              fill="#74C0FC"
            />
            {/* Headlights */}
            <circle cx="13" cy="-5" r="1.5" fill="#FFE066" />
            <circle cx="13" cy="5" r="1.5" fill="#FFE066" />
            {/* Tail lights */}
            <circle cx="-14" cy="-6" r="1.2" fill="#FA5252" />
            <circle cx="-14" cy="6" r="1.2" fill="#FA5252" />
          </g>
        </svg>

        {/* ================================================================= */}
        {/* FLOATING OLA / UBER DRIVER & TELEMETRY HUD CARD                  */}
        {/* ================================================================= */}
        <div className="absolute bottom-3 left-3 right-3 sm:right-auto sm:left-4 sm:bottom-4 z-20 max-w-sm w-full bg-white/95 dark:bg-[#1A2229]/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-black/5 dark:border-white/10">
          
          {/* ETA & Distance Hero Strip */}
          <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-white/10">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#FF6422] font-bold flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#FF6422] animate-ping" />
                <span>On Route to Receiver</span>
              </div>
              <div className="text-xl font-extrabold text-gray-900 dark:text-white mt-0.5">
                {remainingMinutes} min <span className="text-xs font-normal text-gray-400">({remainingDistanceKm} km left)</span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-mono text-gray-400">Holding Temp</span>
              <div className="text-sm font-bold text-emerald-600 flex items-center gap-1 justify-end font-mono">
                <Thermometer className="h-3.5 w-3.5" />
                <span>{currentTemp}°C</span>
              </div>
            </div>
          </div>

          {/* Driver & Cold-Chain Van Information */}
          <div className="flex items-center justify-between pt-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="h-10 w-10 rounded-xl bg-orange-100 border border-orange-200 flex items-center justify-center text-lg">
                  👨‍✈️
                </div>
                <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-[8px] text-white font-bold">
                  ✓
                </div>
              </div>

              <div>
                <div className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                  <span>Rameshwar G.</span>
                  <span className="text-[10px] font-mono bg-orange-50 text-[#FF6422] px-1.5 py-0.5 rounded font-bold">
                    ★ 4.96
                  </span>
                </div>
                <div className="text-[11px] text-gray-400 truncate max-w-[140px]">
                  Mahindra EV • RJ-14-EA-4821
                </div>
              </div>
            </div>

            {/* Quick Driver Action Buttons */}
            <div className="flex items-center gap-1.5">
              <a
                href="tel:+919829012345"
                className="h-8 w-8 rounded-xl bg-gray-100 hover:bg-[#FF6422] hover:text-white text-gray-700 flex items-center justify-center transition-colors cursor-pointer"
                title="Call Delivery Partner"
              >
                <Phone className="h-3.5 w-3.5" />
              </a>

              <div
                className="px-2 py-1 rounded-xl bg-emerald-50 text-emerald-700 font-mono text-[10px] font-bold border border-emerald-200"
                title="Real-time Speed"
              >
                {currentSpeed} km/h
              </div>
            </div>
          </div>

          {/* Handover OTP Pill for recipient */}
          <div className="mt-3 pt-2.5 border-t border-gray-100 dark:border-white/10 flex items-center justify-between text-[11px]">
            <span className="text-gray-400">Custody Handover OTP:</span>
            <span className="font-mono font-bold tracking-widest text-[#FF6422] bg-orange-50 dark:bg-orange-950/40 px-2 py-0.5 rounded border border-orange-200/50">
              8 4 2 1
            </span>
          </div>
        </div>

        {/* Floating Mini Compass & Speed Widget in Top-Right */}
        <div className="absolute top-4 right-4 z-10 hidden sm:flex flex-col gap-2">
          <div className="bg-white/90 dark:bg-[#1A2229]/90 backdrop-blur-md rounded-2xl p-2.5 shadow-md border border-black/5 dark:border-white/10 text-center">
            <Compass className="h-4 w-4 text-[#FF6422] mx-auto animate-spin" style={{ animationDuration: '16s' }} />
            <div className="text-[9px] font-mono text-gray-400 mt-1 font-bold">
              GPS LIVE
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

