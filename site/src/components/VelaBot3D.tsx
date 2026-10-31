import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  tags?: string[];
}

const PRESET_QUESTIONS = [
  "How much food is wasted in India?",
  "Why are plate leftovers excluded from donation?",
  "How does the 5-stage donation workflow work?",
  "What are FSSAI Surplus Food Regulations?",
  "Why was Jaipur selected for the pilot?",
];

const KNOWLEDGE_BASE: Record<string, { reply: string; tags: string[] }> = {
  waste: {
    reply:
      "According to UNEP’s Food Waste Index Report 2024, Indian households generated an estimated 78.2 million tonnes of food waste in 2022 (~55 kg per person/year). This figure includes both edible food and inedible material (peels, bones)—it is NOT a measurement of 78.2M tonnes of donation-ready meals.",
    tags: ['UNEP Index 2024', '78.2M Tonnes', 'Household Scale'],
  },
  leftovers: {
    reply:
      "FSSAI Surplus Food Regulations 2019 strictly prohibit redistributing previously served food or plate leftovers. Our platform specifically coordinates safe, unserved food remaining in controlled commercial kitchen storage (restaurants, hostels, caterers) to prevent contamination.",
    tags: ['FSSAI 2019', 'Safe Unserved Surplus', 'Plate Waste Excluded'],
  },
  workflow: {
    reply:
      "Our 5-stage closed loop guarantees full traceability: 01. Listed (weighed kg, prep time, temp reading) → 02. Accepted (single-claim reservation) → 03. Collected (OTP exchange + temp check) → 04. Received (hub acknowledgment) → 05. Distribution Confirmed. Only verified portions distributed are logged on public impact dashboards!",
    tags: ['5-Stage Loop', 'OTP Handover', 'Zero Overstatement'],
  },
  fssai: {
    reply:
      "Under FSSAI Surplus Food Regulations, food business operators and receiving NGOs must maintain verified records of food name, source, temperature at handover (>60°C hot or <5°C cold), packaging condition, and last consumption deadline. Plate leftovers are completely barred.",
    tags: ['FSSAI Regulations', 'Food Safety', 'Cold/Hot Chain'],
  },
  jaipur: {
    reply:
      "Rajasthan reports ~7,909 tonnes/day of municipal solid waste (1,748 T/day treated). While Maharashtra reports higher total MSW, Jaipur was selected for our pilot cluster because of a high-density, collaborative network of commercial kitchens, student hostels, and active hunger-relief NGOs.",
    tags: ['Jaipur Cluster', 'Rajasthan MSW', 'Pilot Network'],
  },
  default: {
    reply:
      "Vela connects commercial kitchens with certified NGOs to prevent avoidable food surplus and safely redistribute unserved meals under FSSAI regulations. Ask me about UNEP stats, FSSAI rules, or our 5-stage verification workflow!",
    tags: ['Vela Assistant', 'Surplus Prevention'],
  },
};

function formatBold(str: string) {
  const parts = str.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-bold text-[#0D0D0C]">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

function StructuredMessageText({ text }: { text: string }) {
  const paragraphs = text.split(/\n\s*\n/);
  return (
    <div className="space-y-2">
      {paragraphs.map((p, pIdx) => {
        const lines = p.split('\n');
        return (
          <div key={pIdx} className="space-y-1">
            {lines.map((line, lIdx) => {
              const trimmed = line.trim();
              if (trimmed.startsWith('• ') || trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
                const bulletContent = trimmed.replace(/^[\u2022\-\*]\s*/, '');
                return (
                  <div key={lIdx} className="flex items-start gap-1.5 pl-1 text-[12px] sm:text-[13px] leading-relaxed">
                    <span className="text-[#FF6422] font-bold mt-0.5">•</span>
                    <span>{formatBold(bulletContent)}</span>
                  </div>
                );
              }
              if (/^\d+\.\s/.test(trimmed)) {
                const numMatch = trimmed.match(/^(\d+\.)\s*(.*)$/);
                return (
                  <div key={lIdx} className="flex items-start gap-1.5 pl-1 text-[12px] sm:text-[13px] leading-relaxed">
                    <span className="font-mono text-[#FF6422] font-bold text-xs mt-0.5">{numMatch?.[1]}</span>
                    <span>{formatBold(numMatch?.[2] || '')}</span>
                  </div>
                );
              }
              return (
                <p key={lIdx} className="text-[12px] sm:text-[13px] leading-relaxed">
                  {formatBold(line)}
                </p>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

type BotMood = 'idle' | 'thinking' | 'success_jump' | 'error_nod';

export default function VelaBot3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const dockRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrollingState, setIsScrollingState] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'bot',
      text: "Namaste! I'm your Vela AI Companion connected to our real-time food surplus intelligence network. I can help you understand food surplus prevention, FSSAI regulations, UNEP national statistics, live dispatches, and our 5-stage redistribution workflow. How can I help you today?",
      timestamp: 'Just now',
      tags: ['Vela AI', 'n8n Live Workflow', 'FSSAI Aligned'],
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [thinkingSeconds, setThinkingSeconds] = useState(0);

  // Auto-scroll anchor ref to scroll smoothly to newest responses
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  // Live timer while waiting for n8n cloud workflow (supports 30s-60s workflows)
  useEffect(() => {
    let interval: any;
    if (isTyping) {
      setThinkingSeconds(0);
      interval = setInterval(() => {
        setThinkingSeconds((s) => s + 1);
      }, 1000);
    } else {
      setThinkingSeconds(0);
    }
    return () => clearInterval(interval);
  }, [isTyping]);

  // Dynamic 3D Bot Emotional / Action State:
  // 'idle' = normal floating/waving
  // 'thinking' = head tilted, hand on chin, pulsing visor
  // 'success_jump' = joyful jump with 360 spin & hands raised in celebration
  // 'error_nod' = vigorous head shake "No!" on failure/error
  const botMoodRef = useRef<{ mood: BotMood; startTime: number }>({
    mood: 'idle',
    startTime: 0,
  });

  const triggerBotMood = (mood: BotMood) => {
    botMoodRef.current = { mood, startTime: performance.now() / 1000 };
  };

  // Ref to expose isOpen into the RAF loop without stale closure
  const isOpenRef = useRef(false);
  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  // Three.js 3D Character Canvas & Static-on-Scroll / Roam-on-Stop State
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene & Camera (FOV & Position tuned so character is fully framed even during high celebration jumps)
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 0.25, 6.2);

    // Renderer with transparency & high pixel density
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(180, 180);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // Lighting (Warm peach ambient + lilac fill + crisp rim light)
    const ambientLight = new THREE.AmbientLight(0xfff1e6, 1.7);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.6);
    dirLight1.position.set(3, 4, 4);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xd9c5ff, 1.4);
    dirLight2.position.set(-3, -2, 2);
    scene.add(dirLight2);

    const rimLight = new THREE.DirectionalLight(0xffd1a4, 2.5);
    rimLight.position.set(0, 3, -3);
    scene.add(rimLight);

    // Root Group for Character
    const characterGroup = new THREE.Group();
    scene.add(characterGroup);

    // 1. Head / Body Sphere (Warm pastel peach glow matching reference image)
    const headGeo = new THREE.SphereGeometry(1.0, 48, 48);
    const headMat = new THREE.MeshStandardMaterial({
      color: 0xffa87d,
      roughness: 0.32,
      metalness: 0.05,
      emissive: 0xff6b36,
      emissiveIntensity: 0.14,
    });
    const head = new THREE.Mesh(headGeo, headMat);
    characterGroup.add(head);

    // 2. Speech Bubble Visor (Seamless curved visor with speech-bubble tail)
    const bubbleShape = new THREE.Shape();
    const w = 1.36;
    const h = 0.60;
    const r = 0.18;
    const x0 = -w / 2;
    const x1 = w / 2;
    const y0 = -h / 2;
    const y1 = h / 2;

    bubbleShape.moveTo(x0 + r, y1);
    bubbleShape.lineTo(x1 - r, y1);
    bubbleShape.quadraticCurveTo(x1, y1, x1, y1 - r);
    bubbleShape.lineTo(x1, y0 + r);
    bubbleShape.quadraticCurveTo(x1, y0, x1 - r, y0);
    // Bottom edge towards speech tail (moving leftwards with strictly decreasing x)
    bubbleShape.lineTo(-0.12, y0);
    // Speech bubble triangle tail pointing down-left
    bubbleShape.lineTo(-0.28, y0 - 0.22);
    // Left edge of tail returning cleanly to bottom edge
    bubbleShape.lineTo(-0.36, y0);
    // Continue along bottom edge to bottom-left corner
    bubbleShape.lineTo(x0 + r, y0);
    bubbleShape.quadraticCurveTo(x0, y0, x0, y0 + r);
    bubbleShape.lineTo(x0, y1 - r);
    bubbleShape.quadraticCurveTo(x0, y1, x0 + r, y1);

    const extrudeSettings = {
      steps: 1,
      depth: 0.08,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.02,
      bevelSegments: 4,
    };
    const visorGeo = new THREE.ExtrudeGeometry(bubbleShape, extrudeSettings);
    visorGeo.center();

    // Cylindrical contour curvature to smoothly wrap the sphere without clipping/creases
    const vPos = visorGeo.attributes.position;
    for (let i = 0; i < vPos.count; i++) {
      const vx = vPos.getX(i);
      const vz = vPos.getZ(i);
      vPos.setZ(i, vz - (vx * vx) * 0.22);
    }
    vPos.needsUpdate = true;
    visorGeo.computeVertexNormals();

    const visorMat = new THREE.MeshPhysicalMaterial({
      color: 0x8a72e8,
      emissive: 0x5436d6,
      emissiveIntensity: 0.35,
      roughness: 0.28,
      metalness: 0.06,
      transparent: true,
      opacity: 0.90,
      clearcoat: 0.35,
      clearcoatRoughness: 0.25,
      reflectivity: 0.5,
    });
    const visor = new THREE.Mesh(visorGeo, visorMat);
    visor.position.set(0, 0.16, 1.05);
    characterGroup.add(visor);

    // 3. Two Capsule Eyes (Minimalist cartoon eyes on visor)
    const eyeGeo = new THREE.CapsuleGeometry(0.068, 0.18, 16, 16);
    const eyeMat = new THREE.MeshStandardMaterial({
      color: 0x141221,
      roughness: 0.15,
      metalness: 0.1,
    });

    const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
    leftEye.position.set(-0.24, 0.20, 1.10);
    leftEye.rotation.y = 0.08;
    characterGroup.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
    rightEye.position.set(0.24, 0.20, 1.10);
    rightEye.rotation.y = -0.08;
    characterGroup.add(rightEye);

    // 4. White Over-Ear Headphones with Lavender Cushions
    const bandCurve = new THREE.TorusGeometry(1.03, 0.065, 16, 48, Math.PI);
    const whiteMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.25,
      metalness: 0.05,
    });
    const lilacMat = new THREE.MeshStandardMaterial({
      color: 0xc8baff,
      roughness: 0.4,
    });

    const headband = new THREE.Mesh(bandCurve, whiteMat);
    headband.rotation.x = -Math.PI / 2;
    headband.rotation.z = Math.PI / 2;
    headband.position.set(0, 0.1, 0);
    characterGroup.add(headband);

    // Left Ear Cup
    const earCupGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.16, 24);
    const leftEar = new THREE.Mesh(earCupGeo, whiteMat);
    leftEar.rotation.z = Math.PI / 2;
    leftEar.position.set(-1.05, 0.1, 0);
    characterGroup.add(leftEar);

    const leftCushionGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.18, 24);
    const leftCushion = new THREE.Mesh(leftCushionGeo, lilacMat);
    leftCushion.rotation.z = Math.PI / 2;
    leftCushion.position.set(-0.98, 0.1, 0);
    characterGroup.add(leftCushion);

    // Right Ear Cup
    const rightEar = new THREE.Mesh(earCupGeo, whiteMat);
    rightEar.rotation.z = -Math.PI / 2;
    rightEar.position.set(1.05, 0.1, 0);
    characterGroup.add(rightEar);

    const rightCushion = new THREE.Mesh(leftCushionGeo, lilacMat);
    rightCushion.rotation.z = -Math.PI / 2;
    rightCushion.position.set(0.98, 0.1, 0);
    characterGroup.add(rightCushion);

    // 5. Floating Hands (Rayman style - no arms)
    const handGeo = new THREE.SphereGeometry(0.21, 24, 24);
    const handMat = new THREE.MeshStandardMaterial({
      color: 0xff9963,
      roughness: 0.35,
    });

    // Left hand (subtle floating sphere)
    const leftHand = new THREE.Mesh(handGeo, handMat);
    leftHand.position.set(-1.3, -0.05, 0.3);
    characterGroup.add(leftHand);

    // Right hand (Inquisitive "pointing / asking" hand)
    const rightHandGroup = new THREE.Group();
    const rightPalm = new THREE.Mesh(handGeo, handMat);
    rightHandGroup.add(rightPalm);

    // Pointing index finger capsule angled outwards
    const fingerGeo = new THREE.CapsuleGeometry(0.065, 0.22, 16, 16);
    const finger = new THREE.Mesh(fingerGeo, handMat);
    finger.rotation.z = -Math.PI / 3.2;
    finger.position.set(0.19, 0.13, 0);
    rightHandGroup.add(finger);

    rightHandGroup.position.set(1.3, 0.15, 0.35);
    characterGroup.add(rightHandGroup);

    // 6. Running Legs & Sneakers with Sole Treads (matching image)
    const legGeo = new THREE.CapsuleGeometry(0.09, 0.3, 16, 16);
    const legMat = new THREE.MeshStandardMaterial({ color: 0xff9052, roughness: 0.4 });

    // Sole plate material & tread material
    const soleMat = new THREE.MeshStandardMaterial({ color: 0xe8e8ec, roughness: 0.6 });
    const treadMat = new THREE.MeshStandardMaterial({ color: 0x8a8a92, roughness: 0.5 });
    const sneakerGeo = new THREE.BoxGeometry(0.24, 0.16, 0.42);
    const soleGeo = new THREE.BoxGeometry(0.26, 0.05, 0.44);
    const treadGeo = new THREE.BoxGeometry(0.18, 0.015, 0.035);

    // Left Leg Group
    const leftLegGroup = new THREE.Group();
    const leftLeg = new THREE.Mesh(legGeo, legMat);
    leftLegGroup.add(leftLeg);

    const leftSneaker = new THREE.Mesh(sneakerGeo, whiteMat);
    leftSneaker.position.set(0, -0.2, 0.08);
    leftLegGroup.add(leftSneaker);

    const leftSole = new THREE.Mesh(soleGeo, soleMat);
    leftSole.position.set(0, -0.29, 0.08);
    leftLegGroup.add(leftSole);

    // Three horizontal tread lines across the sole ≡
    [-0.07, 0.01, 0.09].forEach((zOff) => {
      const tread = new THREE.Mesh(treadGeo, treadMat);
      tread.position.set(0, -0.32, 0.08 + zOff);
      leftLegGroup.add(tread);
    });

    leftLegGroup.position.set(-0.35, -1.0, 0);
    characterGroup.add(leftLegGroup);

    // Right Leg Group
    const rightLegGroup = new THREE.Group();
    const rightLeg = new THREE.Mesh(legGeo, legMat);
    rightLegGroup.add(rightLeg);

    const rightSneaker = new THREE.Mesh(sneakerGeo, whiteMat);
    rightSneaker.position.set(0, -0.2, 0.08);
    rightLegGroup.add(rightSneaker);

    const rightSole = new THREE.Mesh(soleGeo, soleMat);
    rightSole.position.set(0, -0.29, 0.08);
    rightLegGroup.add(rightSole);

    // Three horizontal tread lines across the sole ≡
    [-0.07, 0.01, 0.09].forEach((zOff) => {
      const tread = new THREE.Mesh(treadGeo, treadMat);
      tread.position.set(0, -0.32, 0.08 + zOff);
      rightLegGroup.add(tread);
    });

    rightLegGroup.position.set(0.35, -1.0, 0);
    characterGroup.add(rightLegGroup);

    // State Variables for Static-on-Scroll & Roaming-on-Stop
    let mouseX = 0;
    let mouseY = 0;
    let animFrameId: number;
    let clock = new THREE.Clock();

    let isScrolling = false;
    let scrollStopTimer: NodeJS.Timeout;

    // Roaming patrol state (moves left and right by itself when scroll stops)
    let patrolX = 0;
    let patrolDirection = -1; // -1 = walking left, 1 = walking right
    let patrolPauseTimer = 0;
    let isWalking = true;

    // Scroll listener: locks character static in bottom-right whenever user scrolls
    const onScroll = () => {
      isScrolling = true;
      setIsScrollingState(true);

      clearTimeout(scrollStopTimer);
      scrollStopTimer = setTimeout(() => {
        isScrolling = false;
        setIsScrollingState(false);
      }, 240); // User stopped scrolling
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    const onWindowMouseMove = (e: MouseEvent) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      mouseX = (e.clientX - windowHalfX) / windowHalfX;
      mouseY = (e.clientY - windowHalfY) / windowHalfY;
    };

    window.addEventListener('mousemove', onWindowMouseMove, { passive: true });

    // Main 3D Render & Animation Loop
    const animate = () => {
      animFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Ensure NO sideways tilting! Keep Z-axis rotation strictly 0 (upright)
      characterGroup.rotation.z += (0 - characterGroup.rotation.z) * 0.15;

      // ── Chat open: freeze patrol, return home, gentle idle pose ──
      const chatOpen = isOpenRef.current;

      if (chatOpen || isScrolling) {
        // ==========================================
        // STATIC MODE: chat open OR user scrolling
        // Smoothly glide back to dock home (patrolX → 0)
        // ==========================================
        patrolX += (0 - patrolX) * 0.14;

        // Gentle breathing float (no lateral movement)
        const staticFloatY = Math.sin(elapsedTime * 2.2) * 3;

        if (dockRef.current) {
          dockRef.current.style.transform = `translate3d(${patrolX}px, ${staticFloatY}px, 0)`;
        }

        // Check active Bot Mood (thinking | success_jump | error_nod | idle)
        const currentMood = botMoodRef.current.mood;
        const moodTime = elapsedTime - botMoodRef.current.startTime;

        if (currentMood === 'thinking') {
          // ── 1. THINKING ANIMATION: head tilted, hand on chin, pulsing blue visor ──
          characterGroup.rotation.z = Math.sin(elapsedTime * 2.8) * 0.14;
          characterGroup.rotation.x = -0.12 + Math.sin(elapsedTime * 2.2) * 0.04;
          characterGroup.rotation.y = Math.sin(elapsedTime * 1.5) * 0.14;

          rightHandGroup.position.set(0.68, 0.38 + Math.sin(elapsedTime * 3) * 0.02, 0.88);
          rightHandGroup.rotation.set(-0.25, 0.35, -0.55);
          leftHand.position.set(-1.15, -0.15, 0.3);

          visorMat.emissive.setHex(0x3b82f6);
          visorMat.emissiveIntensity = 0.65 + Math.sin(elapsedTime * 6) * 0.3;

          characterGroup.position.y = Math.sin(elapsedTime * 2.5) * 0.06;
          head.scale.set(1, 1, 1);

        } else if (currentMood === 'success_jump') {
          // ── 2. JOYFUL CELEBRATION JUMP: calibrated launch height so bot stays 100% inside view ──
          const jumpDuration = 1.6;
          const progress = moodTime / jumpDuration;

          if (progress < 1) {
            const jumpArc = Math.sin(progress * Math.PI);
            characterGroup.position.y = jumpArc * 0.65;

            // Full celebratory 360 spin
            characterGroup.rotation.y = progress * Math.PI * 2;
            characterGroup.rotation.x = -jumpArc * 0.12;
            characterGroup.rotation.z = 0;

            // Both hands raised high in victory!
            rightHandGroup.position.set(1.28, 0.75 + jumpArc * 0.18, 0.2);
            rightHandGroup.rotation.set(0, 0, 0.55);
            leftHand.position.set(-1.28, 0.75 + jumpArc * 0.18, 0.2);

            // Legs kick joyfully
            leftLegGroup.rotation.x = Math.sin(progress * 18) * 0.35;
            rightLegGroup.rotation.x = -Math.sin(progress * 18) * 0.35;

            // Visor glows triumphant emerald green
            visorMat.emissive.setHex(0x10b981);
            visorMat.emissiveIntensity = 0.9;

            // Squash & stretch head (calibrated so top never clips)
            if (progress < 0.2) {
              head.scale.set(1.10, 0.90, 1.10); // Pre-jump crouch
            } else if (progress < 0.78) {
              head.scale.set(0.94, 1.15, 0.94); // Stretch in mid-air
            } else {
              head.scale.set(1.08, 0.94, 1.08); // Landing squash
            }
          } else {
            // Jump complete, smoothly transition to idle
            botMoodRef.current.mood = 'idle';
            characterGroup.position.y = 0;
            characterGroup.rotation.y = 0;
            characterGroup.rotation.x = 0;
            characterGroup.rotation.z = 0;
            head.scale.set(1, 1, 1);
            visorMat.emissive.setHex(0x5436d6);
            visorMat.emissiveIntensity = 0.35;
          }

        } else if (currentMood === 'error_nod') {
          // ── 3. HEAD SHAKE "NO" ON ERROR / NO OUTPUT: rapid side-to-side, dejected pose, red visor ──
          const nodDuration = 1.6;
          const progress = moodTime / nodDuration;

          if (progress < 1) {
            // Rapid head shake left and right (No!)
            characterGroup.rotation.y = Math.sin(progress * Math.PI * 8) * 0.45;
            characterGroup.rotation.x = 0.16; // Looking down sadly
            characterGroup.rotation.z = 0;
            characterGroup.position.y = -0.08;

            // Hands droop down at sides dejectedly
            rightHandGroup.position.set(1.1, -0.32, 0.2);
            rightHandGroup.rotation.set(0, 0, -0.2);
            leftHand.position.set(-1.1, -0.32, 0.2);

            // Visor pulses warning crimson
            visorMat.emissive.setHex(0xef4444);
            visorMat.emissiveIntensity = 0.65 + Math.sin(progress * 24) * 0.25;

            head.scale.set(1, 1, 1);
          } else {
            // Shake complete, return to idle
            botMoodRef.current.mood = 'idle';
            characterGroup.position.y = 0;
            characterGroup.rotation.y = 0;
            characterGroup.rotation.x = 0;
            characterGroup.rotation.z = 0;
            visorMat.emissive.setHex(0x5436d6);
            visorMat.emissiveIntensity = 0.35;
          }

        } else {
          // ── 4. NORMAL IDLE POSE ──
          characterGroup.rotation.y += (0 - characterGroup.rotation.y) * 0.14;
          characterGroup.rotation.x += (0 - characterGroup.rotation.x) * 0.14;
          characterGroup.rotation.z += (0 - characterGroup.rotation.z) * 0.14;
          characterGroup.position.y += (0 - characterGroup.position.y) * 0.14;
          head.scale.set(1, 1, 1);
          visorMat.emissive.setHex(0x5436d6);
          visorMat.emissiveIntensity = 0.35;

          // Idle leg sway
          leftLegGroup.rotation.x = Math.sin(elapsedTime * 2.5) * 0.08;
          rightLegGroup.rotation.x = -Math.sin(elapsedTime * 2.5) * 0.08;
          leftSneaker.rotation.x = 0;
          rightSneaker.rotation.x = 0;

          // Right hand wave when chat open
          if (chatOpen) {
            rightHandGroup.position.y = 0.32 + Math.sin(elapsedTime * 3.5) * 0.06;
            rightHandGroup.position.x = 1.34;
            rightHandGroup.rotation.z = -0.22 + Math.sin(elapsedTime * 3.5) * 0.12;
          } else {
            rightHandGroup.position.y = 0.18 + Math.sin(elapsedTime * 2.5) * 0.04;
            rightHandGroup.position.x = 1.32;
            rightHandGroup.rotation.z = 0;
          }

          leftHand.position.y = -0.05 + Math.cos(elapsedTime * 2.5) * 0.04;
          leftHand.position.z = 0.3;
        }

      } else {
        // ==========================================
        // PATROL MODE: chat closed + not scrolling
        // Bot roams left and right autonomously
        // ==========================================
        if (isWalking) {
          const walkSpeed = 0.82;
          patrolX += patrolDirection * walkSpeed;

          // Roaming bounds: 0px (dock home) to -135px (leftward roam)
          if (patrolDirection === -1 && patrolX <= -135) {
            patrolX = -135;
            isWalking = false;
            patrolPauseTimer = elapsedTime + 4.2;
            patrolDirection = 1;
          } else if (patrolDirection === 1 && patrolX >= 0) {
            patrolX = 0;
            isWalking = false;
            patrolPauseTimer = elapsedTime + 4.2;
            patrolDirection = -1;
          }
        } else {
          if (elapsedTime >= patrolPauseTimer) {
            isWalking = true;
          }
        }

        // Gentle organic ±8px vertical floating bob
        const floatY = Math.sin(elapsedTime * 1.8) * 8;

        if (dockRef.current) {
          dockRef.current.style.transform = `translate3d(${patrolX}px, ${floatY}px, 0)`;
        }

        // Body orientation while walking or paused
        let targetRotY = 0;
        let targetRotX = 0;

        if (isWalking) {
          targetRotY = patrolDirection === -1 ? -0.38 : 0.38;
          targetRotX = 0.04;
        } else {
          targetRotY = mouseX * 0.32;
          targetRotX = -mouseY * 0.18;
        }

        characterGroup.rotation.y += (targetRotY - characterGroup.rotation.y) * 0.09;
        characterGroup.rotation.x += (targetRotX - characterGroup.rotation.x) * 0.09;

        // Running legs when walking; gentle stance when paused
        const strideSpeed = isWalking ? 8.2 : 2.0;
        const legAmp = isWalking ? 0.52 : 0.08;
        const legAngle = Math.sin(elapsedTime * strideSpeed) * legAmp;

        leftLegGroup.rotation.x = legAngle;
        rightLegGroup.rotation.x = -legAngle;

        leftSneaker.rotation.x = Math.max(0, legAngle * 0.5);
        rightSneaker.rotation.x = Math.max(0, -legAngle * 0.5);

        const bounceAmp = isWalking ? 0.07 : 0.02;
        characterGroup.position.y = Math.abs(Math.sin(elapsedTime * strideSpeed * 2)) * bounceAmp - 0.04;

        if (!isWalking) {
          rightHandGroup.position.y = 0.34 + Math.sin(elapsedTime * 4.5) * 0.07;
          rightHandGroup.position.x = 1.34;
          rightHandGroup.rotation.z = -0.18 + Math.sin(elapsedTime * 3.5) * 0.1;
        } else {
          rightHandGroup.position.y = 0.15 + Math.sin(elapsedTime * strideSpeed) * 0.08;
          rightHandGroup.position.x = 1.3;
          rightHandGroup.rotation.z = Math.sin(elapsedTime * strideSpeed) * 0.15;
        }

        leftHand.position.y = -0.05 + Math.cos(elapsedTime * strideSpeed) * 0.06;
        leftHand.position.z = 0.3 + (isWalking ? Math.sin(elapsedTime * strideSpeed) * 0.15 : 0);
      }

      // Eye blink
      const blinkCycle = Math.sin(elapsedTime * 1.5);
      if (blinkCycle > 0.985) {
        leftEye.scale.y = 0.1;
        rightEye.scale.y = 0.1;
      } else {
        leftEye.scale.y = 1;
        rightEye.scale.y = 1;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onWindowMouseMove);
      renderer.dispose();
      headGeo.dispose();
      headMat.dispose();
      visorGeo.dispose();
      visorMat.dispose();
      eyeGeo.dispose();
      eyeMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputMessage;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    // 1. Instantly trigger 3D Bot "Thinking" animation (head tilt, hand on chin, blue pulsing visor)
    triggerBotMood('thinking');

    const webhookUrl =
      import.meta.env.VITE_N8N_WEBHOOK_URL ||
      'https://vela1234.app.n8n.cloud/webhook/75cae822-1367-46d4-89e3-7876fdf5a3fb';

    console.log('[VelaBot] Sending message to n8n Webhook:', webhookUrl, { query });

    try {
      const controller = new AbortController();
      // Extended timeout to 120s (2 minutes) to seamlessly accommodate 30s-60s n8n workflow execution
      const timeoutId = setTimeout(() => controller.abort(), 120000);

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json, text/plain, */*',
        },
        signal: controller.signal,
        body: JSON.stringify({
          message: query,
          chatInput: query,
          input: query,
          query: query,
          prompt: query,
          text: query,
          timestamp: new Date().toISOString(),
          source: 'Vela Platform AI Assistant',
        }),
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`n8n webhook error status: ${response.status}`);
      }

      const responseText = await response.text();
      console.log('[VelaBot] Raw response from n8n Webhook:', responseText);

      let botReply = '';
      let botTags: string[] = ['n8n Live Workflow', 'Cloud Connected'];

      try {
        const json = JSON.parse(responseText);
        if (typeof json === 'string') {
          botReply = json;
        } else if (Array.isArray(json) && json.length > 0) {
          const item = json[0];
          // Handle standard n8n node structure: item.json.<property> or item.<property>
          const dataObj = item.json || item;
          botReply =
            dataObj.output ||
            dataObj.reply ||
            dataObj.message ||
            dataObj.text ||
            dataObj.answer ||
            dataObj.response ||
            dataObj.result ||
            dataObj.content ||
            dataObj.data ||
            dataObj.chatOutput ||
            (typeof dataObj === 'string' ? dataObj : JSON.stringify(dataObj, null, 2));

          if (dataObj.tags && Array.isArray(dataObj.tags)) {
            botTags = dataObj.tags;
          }
        } else if (typeof json === 'object' && json !== null) {
          // Handle object response directly or inside .json / .data
          const dataObj = json.json || json.data || json;
          botReply =
            dataObj.output ||
            dataObj.reply ||
            dataObj.message ||
            dataObj.text ||
            dataObj.answer ||
            dataObj.response ||
            dataObj.result ||
            dataObj.content ||
            dataObj.chatOutput;

          if (!botReply && typeof dataObj === 'object') {
            const stringValues = Object.values(dataObj).filter((v) => typeof v === 'string');
            if (stringValues.length === 1) {
              botReply = stringValues[0] as string;
            } else {
              botReply = JSON.stringify(dataObj, null, 2);
            }
          }

          if (json.tags && Array.isArray(json.tags)) {
            botTags = json.tags;
          }
        }
      } catch {
        botReply = responseText;
      }

      console.log('[VelaBot] Parsed bot reply:', botReply);

      if (!botReply || botReply.trim().length === 0) {
        // No output returned: trigger head-shake "NO"
        triggerBotMood('error_nod');
        const botMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: "Workflow executed, but no response payload was returned. Please verify the output in your n8n workflow.",
          timestamp: 'Just now',
          tags: ['Empty Output', 'Workflow Warning'],
        };
        setMessages((prev) => [...prev, botMsg]);
        return;
      }

      // 2. SUCCESS! 3D Bot Jumps with happiness (360 spin, hands in air, green visor)
      triggerBotMood('success_jump');

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: botReply,
        timestamp: 'Just now',
        tags: botTags,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      console.warn('n8n Webhook connection error, bot shaking head:', err);

      // 3. ERROR / TIMEOUT / OFFLINE: 3D Bot shakes head "NO" vigorously!
      triggerBotMood('error_nod');

      // Match answer from verified knowledge base
      const lower = query.toLowerCase();
      let replyData = KNOWLEDGE_BASE.default;

      if (lower.includes('waste') || lower.includes('scale') || lower.includes('78') || lower.includes('tonnes') || lower.includes('55')) {
        replyData = KNOWLEDGE_BASE.waste;
      } else if (lower.includes('plate') || lower.includes('leftover') || lower.includes('served') || lower.includes('exclude')) {
        replyData = KNOWLEDGE_BASE.leftovers;
      } else if (lower.includes('workflow') || lower.includes('stage') || lower.includes('loop') || lower.includes('otp') || lower.includes('step')) {
        replyData = KNOWLEDGE_BASE.workflow;
      } else if (lower.includes('fssai') || lower.includes('regulation') || lower.includes('safety') || lower.includes('law')) {
        replyData = KNOWLEDGE_BASE.fssai;
      } else if (lower.includes('jaipur') || lower.includes('rajasthan') || lower.includes('pilot') || lower.includes('cluster')) {
        replyData = KNOWLEDGE_BASE.jaipur;
      }

      const errorNotice = err?.message?.includes('status')
        ? `*n8n Cloud Webhook Returned ${err.message}. (Ensure your n8n workflow toggle is ON / Active).*`
        : `*Unable to reach n8n webhook (workflow may be inactive in n8n Cloud).*`;

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: `${errorNotice}\n\n${replyData.reply}`,
        timestamp: 'Just now',
        tags: [...replyData.tags, 'FSSAI Knowledge'],
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/*
        ─────────────────────────────────────────────────────────────────
        OUTER DOCK: anchored bottom-right, moves with patrol animation.
        Contains: [Bot avatar] + (when open) [Chat panel to the right].
        ─────────────────────────────────────────────────────────────────
      */}
      <div
        ref={dockRef}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[990] flex flex-row items-end pointer-events-auto select-none will-change-transform"
      >
        {/* ── Chat Panel (slides in to the LEFT of the anchor, so bot is left, chat is right) ── */}
        {isOpen && (
          <div
            className="relative mr-3 w-[92vw] sm:w-[380px] max-h-[82vh] h-[540px] flex flex-col rounded-3xl border border-[#0D0D0C]/15 bg-[#FBF6EF]/95 shadow-2xl backdrop-blur-xl overflow-hidden"
            style={{
              animation: 'velaChatSlideIn 0.28s cubic-bezier(0.34, 1.3, 0.64, 1) both',
            }}
          >
            {/* Minimalist Floating Close Button (Top bar removed per user request) */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2.5 right-3 z-30 rounded-full p-1.5 text-[#0D0D0C]/60 hover:text-[#0D0D0C] hover:bg-black/5 bg-white/80 backdrop-blur-md transition-all cursor-pointer shadow-xs border border-[#0D0D0C]/10"
              aria-label="Close chat"
              title="Close chat"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Quick Preset Questions Chips (Positioned neatly at the top with right padding for close button) */}
            <div className="flex items-center gap-1.5 overflow-x-auto border-b border-[#0D0D0C]/10 bg-white/50 px-4 py-2.5 scrollbar-none shrink-0 pr-12">
              {PRESET_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q)}
                  className="shrink-0 rounded-full border border-[#0D0D0C]/10 bg-white/85 px-3 py-1 text-[11px] font-medium text-[#0D0D0C]/75 hover:bg-[#0D0D0C] hover:text-[#FBF6EF] transition-all cursor-pointer whitespace-nowrap shadow-2xs"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Message History with Lenis Scroll Prevention & Auto-scroll Anchor */}
            <div
              data-lenis-prevent="true"
              data-lenis-prevent-wheel="true"
              data-lenis-prevent-touch="true"
              onWheel={(e) => e.stopPropagation()}
              className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-3.5 select-text touch-pan-y"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(13, 13, 12, 0.2) transparent',
              }}
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-[13px] leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#0D0D0C] text-[#FBF6EF]'
                        : 'border border-[#0D0D0C]/10 bg-white/90 text-[#0D0D0C] shadow-xs'
                    }`}
                  >
                    <StructuredMessageText text={msg.text} />

                    {msg.tags && msg.tags.length > 0 && (
                      <div className="mt-2.5 flex flex-wrap gap-1.5 border-t border-[#0D0D0C]/10 pt-2">
                        {msg.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="rounded-md bg-[#0D0D0C]/5 px-2 py-0.5 font-mono text-[9px] text-[#0D0D0C]/60"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <span className="font-mono text-[9px] text-[#0D0D0C]/40 px-1 mt-1">
                    {msg.timestamp}
                  </span>
                </div>
              ))}

              {/* Real-time n8n Workflow Typing Indicator with Live Timer */}
              {isTyping && (
                <div className="flex flex-col items-start animate-in fade-in duration-200">
                  <div className="flex items-center gap-2.5 rounded-2xl border border-[#0D0D0C]/10 bg-white/95 px-4 py-3 text-xs text-gray-700 shadow-xs max-w-[90%]">
                    <div className="flex gap-1 items-center shrink-0">
                      <span className="h-2 w-2 rounded-full bg-[#FF6422] animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="h-2 w-2 rounded-full bg-[#FF6422] animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="h-2 w-2 rounded-full bg-[#FF6422] animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-mono text-[11px] text-gray-800 font-bold truncate">
                        {thinkingSeconds < 12
                          ? `Executing n8n AI workflow… (${thinkingSeconds}s)`
                          : thinkingSeconds < 30
                          ? `Synthesizing structured answer… (${thinkingSeconds}s)`
                          : thinkingSeconds < 60
                          ? `Formatting comprehensive output… (${thinkingSeconds}s)`
                          : `Finalizing detailed response… (${thinkingSeconds}s)`}
                      </span>
                      <span className="text-[10px] text-gray-400">
                        Active connection • Waiting up to 120s for full completion
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Anchor element to automatically scroll into view on new outputs */}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Row */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2 border-t border-[#0D0D0C]/10 bg-white/70 p-3 shrink-0"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Ask about FSSAI rules, surplus dispatches, live routes…"
                className="flex-1 rounded-xl border border-[#0D0D0C]/15 bg-white px-3.5 py-2 text-xs text-[#0D0D0C] placeholder-[#0D0D0C]/40 outline-none focus:border-[#0D0D0C] transition-colors"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isTyping}
                className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#0D0D0C] text-[#FBF6EF] disabled:opacity-40 hover:opacity-90 transition-opacity cursor-pointer"
                title="Send message (or hit Enter)"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>
        )}

        {/* ── Bot Avatar (always on the RIGHT edge of the combined widget, so it appears LEFT of chat) ── */}
        <div
          onClick={() => setIsOpen((o) => !o)}
          className="group relative cursor-pointer flex items-center justify-center transition-transform duration-300 hover:scale-105 active:scale-95 shrink-0"
          title="Click to talk with Vela AI Assistant"
        >
          {/* Warm glow aura */}
          <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-tr from-[#FFAE80]/40 to-[#9B84F5]/30 blur-xl opacity-75 group-hover:opacity-100 transition-opacity" />

          {/* Canvas Mount */}
          <div ref={mountRef} className="relative z-10 w-[180px] h-[180px] pointer-events-none" />

          {/* Status Badge */}
          <div className="absolute bottom-2 right-4 z-20 flex items-center gap-1 rounded-full border border-[#0D0D0C]/15 bg-[#FBF6EF] px-2.5 py-0.5 text-[10px] font-medium text-[#0D0D0C] shadow-sm backdrop-blur-sm">
            <Sparkles className="h-3 w-3 text-amber-500 fill-amber-500" />
            <span>{isOpen ? 'Chatting' : 'AI Assistant'}</span>
          </div>

          {/* Chat-open connector nub — tiny speech-bubble notch pointing right toward chat */}
          {isOpen && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-30">
              <div className="h-3 w-3 rotate-45 bg-[#FBF6EF]/95 border-l border-b border-[#0D0D0C]/12 shadow-sm" />
            </div>
          )}
        </div>
      </div>

      {/* Keyframe for chat panel slide-in */}
      <style>{`
        @keyframes velaChatSlideIn {
          from { opacity: 0; transform: translateX(24px) scale(0.96); }
          to   { opacity: 1; transform: translateX(0)   scale(1); }
        }
      `}</style>
    </>
  );
}
