import { useEffect, useRef, useCallback } from 'react';

export function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      el.classList.add('visible');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold }
    );

    // Observe the element itself and all children with .reveal
    const revealEls = el.querySelectorAll('.reveal');
    revealEls.forEach((child) => observer.observe(child));
    if (el.classList.contains('reveal')) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}

export function useScrollProgress() {
  const update = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
    const bar = document.getElementById('scroll-progress');
    if (bar) {
      bar.style.width = `${progress * 100}%`;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, [update]);
}

export function useCountUp(target: number, duration = 2000, startOnView = true) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasAnimated.current) return;

    const animate = () => {
      if (hasAnimated.current) return;
      hasAnimated.current = true;

      const start = performance.now();
      const tick = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(eased * target);
        el.textContent = current.toLocaleString();
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    if (!startOnView) {
      animate();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animate();
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, startOnView]);

  return ref;
}

