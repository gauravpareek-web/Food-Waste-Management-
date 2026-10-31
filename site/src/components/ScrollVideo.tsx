import { useEffect, useRef, useState } from 'react';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260729_102822_0e6c87e8-c141-4744-bf32-ad30db296371.mp4';

interface ScrollVideoProps {
  progressRef?: React.MutableRefObject<number>;
}

export default function ScrollVideo({ progressRef }: ScrollVideoProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animId: number;
    let targetProgress = 0;
    let smoothedProgress = 0;
    let isSeeking = false;

    // Dimension management
    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Fallback scroll listener if progressRef is not supplied by Lenis
    const handleScroll = () => {
      if (progressRef) {
        targetProgress = progressRef.current;
      } else {
        const docH = document.documentElement.scrollHeight - window.innerHeight;
        targetProgress = docH > 0 ? Math.min(Math.max(window.scrollY / docH, 0), 1) : 0;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Fast drawing function
    const drawCurrentFrame = () => {
      if (!video || !ctx || video.readyState < 2) return;
      const cw = canvas.width;
      const ch = canvas.height;
      const vw = video.videoWidth || 1920;
      const vh = video.videoHeight || 1080;

      // Object cover calculations
      const scale = Math.max(cw / vw, ch / vh);
      const dw = vw * scale;
      const dh = vh * scale;
      const dx = (cw - dw) / 2;
      const dy = (ch - dh) / 2;

      ctx.drawImage(video, dx, dy, dw, dh);
    };

    const onSeeked = () => {
      isSeeking = false;
      drawCurrentFrame();
    };

    video.addEventListener('seeked', onSeeked);

    // Continuous render loop
    const render = () => {
      if (progressRef) {
        targetProgress = progressRef.current;
      }

      // Smooth progress with low latency lerp
      smoothedProgress += (targetProgress - smoothedProgress) * 0.16;

      if (video.duration && video.readyState >= 2) {
        const targetTime = Math.max(0, Math.min(smoothedProgress * (video.duration - 0.04), video.duration));

        if (Math.abs(video.currentTime - targetTime) > 0.015 && !isSeeking) {
          isSeeking = true;
          if (typeof (video as any).fastSeek === 'function') {
            (video as any).fastSeek(targetTime);
          } else {
            video.currentTime = targetTime;
          }
        }
      }

      drawCurrentFrame();
      animId = requestAnimationFrame(render);
    };

    const onLoaded = () => {
      setVideoLoaded(true);
      video.pause();
      drawCurrentFrame();
      render();
    };

    video.addEventListener('loadeddata', onLoaded);
    if (video.readyState >= 2) {
      onLoaded();
    }

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', handleScroll);
      video.removeEventListener('seeked', onSeeked);
      video.removeEventListener('loadeddata', onLoaded);
    };
  }, [progressRef]);

  return (
    <div
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#0a0a0a]"
      aria-hidden="true"
    >
      {/* Cinematic subtle contrast vignette & gradient overlays */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#0a0a0a]/70 via-[#0a0a0a]/40 to-[#0a0a0a]/85 pointer-events-none" />
      <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#0a0a0a]/30 to-[#0a0a0a]/80 pointer-events-none" />

      {/* Offscreen driver video */}
      <video
        ref={videoRef}
        src={VIDEO_URL}
        muted
        playsInline
        preload="auto"
        crossOrigin="anonymous"
        className="hidden"
      />

      {/* Main hardware-accelerated canvas */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
          videoLoaded ? 'opacity-90' : 'opacity-0'
        }`}
      />
    </div>
  );
}
