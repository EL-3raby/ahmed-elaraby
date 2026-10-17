'use client';

import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';

export function CinematicPreloader() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const isTransitioningRef = useRef(false);
  const router = useRouter();

  // Navigation transition engine for button clicks and route links
  const runTransition = (target: string | number) => {
    const overlay = overlayRef.current;
    const logo = logoRef.current;
    if (!overlay || !logo) return;
    if (isTransitioningRef.current) return;

    isTransitioningRef.current = true;
    document.body.style.overflow = 'hidden';
    overlay.style.pointerEvents = 'auto';

    // Clear any leftover CSS animation classes and manual strings so GSAP has 100% pure control
    overlay.classList.remove('nakula-curtain-initial');
    logo.classList.remove('nakula-logo-initial');
    overlay.style.transform = '';
    logo.style.transform = '';

    // Initialize GSAP position at top (-100%) and make visible
    gsap.set(overlay, { yPercent: -100, y: 0, autoAlpha: 1 });
    gsap.set(logo, { y: 60, opacity: 0 });

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = '';
        gsap.set(overlay, { autoAlpha: 0 });
        overlay.style.pointerEvents = 'none';
        isTransitioningRef.current = false;
      },
    });

    // 1. Curtain sweeps DOWN from top to cover the screen
    tl.to(overlay, {
      yPercent: 0,
      duration: 0.42,
      ease: 'power3.inOut',
    });

    // 2. Black brand wordmark ELARABY slides up smoothly into center
    tl.to(
      logo,
      {
        y: 0,
        opacity: 1,
        duration: 0.45,
        ease: 'power3.out',
      },
      '-=0.15'
    );

    // 3. Instant navigation execution while screen is hidden
    tl.call(() => {
      const lenis = typeof window !== 'undefined'
        ? (window as unknown as { __lenis?: { scrollTo: (t: number | Element, opts: { immediate: boolean }) => void } }).__lenis
        : null;

      if (typeof target === 'number') {
        if (lenis) {
          lenis.scrollTo(target, { immediate: true });
        } else {
          window.scrollTo({ top: target, behavior: 'instant' as ScrollBehavior });
        }
      } else if (typeof target === 'string') {
        if (target.startsWith('#')) {
          const el = document.querySelector(target);
          if (target === '#hero' || target === '#') {
            if (lenis) lenis.scrollTo(0, { immediate: true });
            else window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
          } else if (el) {
            if (lenis) lenis.scrollTo(el, { immediate: true });
            else el.scrollIntoView({ behavior: 'instant' as ScrollBehavior });
          }
        } else if (target.startsWith('/')) {
          router.push(target);
        }
      }
    });

    // 4. Brief cinematic hold
    tl.to({}, { duration: 0.22 });

    // 5. Logo fades out as curtain lifts
    tl.to(logo, {
      opacity: 0,
      y: -25,
      duration: 0.35,
      ease: 'power2.in',
    });

    // 6. Curtain sweeps UP and out of the viewport
    tl.to(
      overlay,
      {
        yPercent: -100,
        duration: 0.65,
        ease: 'power4.inOut',
      },
      '-=0.2'
    );
  };

  useEffect(() => {
    const overlay = overlayRef.current;
    const logo = logoRef.current;
    if (!overlay || !logo) return;

    if (typeof window !== 'undefined') {
      try {
        if ('scrollRestoration' in window.history) {
          window.history.scrollRestoration = 'manual';
        }
      } catch {
        // ignore
      }
      window.scrollTo(0, 0);
    }

    // After the initial pure CSS animation (2.2s total duration),
    // sync GSAP cache, lock position at -100%, hide visibility, and mark pointer-events none
    const timer = setTimeout(() => {
      if (overlay) {
        overlay.classList.remove('nakula-curtain-initial');
        overlay.style.transform = '';
        overlay.style.pointerEvents = 'none';
        gsap.set(overlay, { yPercent: -100, y: 0, autoAlpha: 0 });
      }
      if (logo) {
        logo.classList.remove('nakula-logo-initial');
        logo.style.transform = '';
        gsap.set(logo, { y: 0, opacity: 0 });
      }
      window.dispatchEvent(new CustomEvent('preloaderComplete'));
    }, 2250);

    // --- GLOBAL EVENT LISTENER FOR SECTION & PAGE TRANSITIONS ---
    const handleCurtainEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ target: string | number }>;
      if (customEvent.detail && customEvent.detail.target !== undefined) {
        runTransition(customEvent.detail.target);
      }
    };
    window.addEventListener('curtainTransition', handleCurtainEvent);

    // --- GLOBAL CLICK INTERCEPTOR FOR LINKS & BUTTONS ---
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Anchor tags
      const anchor = target.closest('a');
      if (anchor) {
        const href = anchor.getAttribute('href');
        if (!href) return;

        // Internal hash section link (e.g. #about, #works, #contact, #hero)
        if (href.startsWith('#') && href.length > 1) {
          e.preventDefault();
          e.stopPropagation();
          runTransition(href);
          return;
        }

        // Internal page route (e.g. /about, /projects)
        if (href.startsWith('/') && !href.startsWith('//') && !anchor.target) {
          e.preventDefault();
          e.stopPropagation();
          runTransition(href);
          return;
        }
      }

      // Buttons with data-nav-target
      const button = target.closest('button');
      if (button) {
        const navTarget = button.getAttribute('data-nav-target');
        if (navTarget) {
          e.preventDefault();
          e.stopPropagation();
          runTransition(navTarget);
          return;
        }
      }
    };

    window.addEventListener('click', handleGlobalClick, true);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('curtainTransition', handleCurtainEvent);
      window.removeEventListener('click', handleGlobalClick, true);
      document.body.style.overflow = '';
    };
  }, [router]);

  return (
    <>
      <style>{`
        @keyframes nakulaInitialLogo {
          0% {
            opacity: 0;
            transform: translate3d(0, 63px, 0);
          }
          10% {
            opacity: 0;
            transform: translate3d(0, 63px, 0);
          }
          45% {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
          68% {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
          82% {
            opacity: 0;
            transform: translate3d(0, -25px, 0);
          }
          100% {
            opacity: 0;
            transform: translate3d(0, -25px, 0);
          }
        }

        @keyframes nakulaInitialCurtain {
          0% {
            transform: translate3d(0, 0, 0);
          }
          68% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(0, -100%, 0);
          }
        }

        .nakula-curtain-initial {
          animation: nakulaInitialCurtain 2.2s cubic-bezier(0.72, 0.01, 0.24, 0.99) forwards;
          will-change: transform;
        }

        .nakula-logo-initial {
          animation: nakulaInitialLogo 2.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          will-change: transform, opacity;
        }
      `}</style>

      <div
        ref={overlayRef}
        className="nakula-curtain-initial fixed inset-0 z-[9999] w-screen h-screen flex items-center justify-center select-none pointer-events-auto overflow-hidden"
        style={{
          backgroundColor: '#FF4925', // Exact Nakula orange token rgb(255, 73, 37)
        }}
        aria-label="Curtain Transition"
      >
        {/* Centered Brand Wordmark - exactly like Nakula Framer preloader */}
        <div
          ref={logoRef}
          className="nakula-logo-initial flex items-center justify-center px-6 select-none"
        >
          <span
            className="font-anton text-black uppercase tracking-[0.02em] leading-none select-none text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[11rem] block font-normal"
            style={{
              fontFamily: 'var(--font-anton), Impact, sans-serif',
              color: '#000000',
            }}
          >
            ELARABY
          </span>
        </div>
      </div>
    </>
  );
}
