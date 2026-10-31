import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only activate on devices with a mouse/trackpad pointer
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasFinePointer) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isVisible = false;
    let isHovered = false;
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        ringX = mouseX;
        ringY = mouseY;
        dot.style.opacity = '1';
        ring.style.opacity = '1';
      }

      // Crisp center dot moves 1:1 with mouse with ZERO lag (GPU accelerated)
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;

      // Check for clickable / interactive elements
      const target = e.target as HTMLElement | null;
      const interactive =
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.closest('button') ||
          target.closest('a') ||
          target.closest('.interactive-element') ||
          target.closest('[role="button"]') ||
          target.closest('[class*="agentation"]') ||
          target.closest('[data-agentation]'));

      if (interactive && !isHovered) {
        isHovered = true;
        ring.classList.add('cursor-hovered');
      } else if (!interactive && isHovered) {
        isHovered = false;
        ring.classList.remove('cursor-hovered');
      }
    };

    const onMouseDown = () => {
      ring.classList.add('cursor-active');
    };

    const onMouseUp = () => {
      ring.classList.remove('cursor-active');
    };

    const onMouseLeave = () => {
      isVisible = false;
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };

    const onMouseEnter = () => {
      isVisible = true;
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    };

    // Smooth RAF loop for the trailing ring
    const render = () => {
      if (isVisible) {
        // Responsive lerp speed (0.35): fluid, natural trailing with zero stickiness
        ringX += (mouseX - ringX) * 0.35;
        ringY += (mouseY - ringY) * 0.35;
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }
      animId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      {/* Outer fluid trailing ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] opacity-0 will-change-transform mix-blend-multiply transition-opacity duration-150"
        aria-hidden="true"
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      >
        <div className="h-7 w-7 rounded-full border border-[#0D0D0C]/40 bg-transparent transition-all duration-200 ease-out [.cursor-hovered_&]:h-11 [.cursor-hovered_&]:w-11 [.cursor-hovered_&]:border-[#0D0D0C]/80 [.cursor-hovered_&]:bg-[#0D0D0C]/10 [.cursor-active_&]:scale-90" />
      </div>

      {/* Inner crisp dot — follows cursor immediately with 0ms delay */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] opacity-0 will-change-transform transition-opacity duration-150"
        aria-hidden="true"
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      >
        <div className="h-1.5 w-1.5 rounded-full bg-[#0D0D0C]" />
      </div>
    </>
  );
}
