'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HeroLanyard } from './HeroLanyard';
import { FlipWords } from '@/components/ui/FlipWords';

const FLIP_PHRASES = [
  'high-ticket web apps',
  'offline desktop ERPs',
  'hybrid cloud SaaS',
  'symbolic AI engines',
];

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const [isDesktop, setIsDesktop] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const update = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // 3D Cinematic Perspective Mask Reveal Entrance Animation
  useEffect(() => {
    const runEntrance = () => {
      const lines = heroRef.current?.querySelectorAll('.hero-line-inner');

      const tl = gsap.timeline({ delay: 0.08 });

      if (lines && lines.length > 0) {
        // High-end 3D Perspective Mask Velocity Lift + Focus Pull
        tl.fromTo(
          lines,
          {
            yPercent: 125,
            opacity: 0,
            rotateX: 42,
            rotateZ: 2,
            filter: 'blur(14px)',
            transformOrigin: '0% 100%',
          },
          {
            yPercent: 0,
            opacity: 1,
            rotateX: 0,
            rotateZ: 0,
            filter: 'blur(0px)',
            duration: 1.35,
            stagger: 0.12,
            ease: 'power4.out',
            onComplete: () => {
              lines.forEach((el) => {
                const htmlEl = el as HTMLElement;
                htmlEl.style.filter = '';
                htmlEl.classList.remove('opacity-0');
              });
              const masks = heroRef.current?.querySelectorAll('.hero-line-mask');
              masks?.forEach((el) => {
                (el as HTMLElement).style.overflow = 'visible';
              });
            },
          }
        );
      }
    };

    runEntrance();
  }, []);

  // Scroll Parallax & Cinematic Depth Exit when scrolling from Section 01 to Section 02
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const contentEl = heroRef.current?.querySelector('.hero-content-wrapper');
      const lanyardEl = heroRef.current?.querySelector('.hero-lanyard-wrapper');

      if (heroRef.current && contentEl) {
        gsap.to(contentEl, {
          yPercent: -18,
          scale: 0.90,
          opacity: 0,
          filter: 'blur(12px)',
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom 10%',
            scrub: 0.6,
          },
        });
      }

      if (heroRef.current && lanyardEl) {
        gsap.to(lanyardEl, {
          yPercent: -25,
          scale: 0.85,
          opacity: 0,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom 10%',
            scrub: 0.6,
          },
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Word Physics Simulation Engine: 3D Lanyard Card Collision, Tumble & Spring Recovery
  useEffect(() => {
    interface WordPhysicsNode {
      el: HTMLElement;
      pageX: number;
      pageY: number;
      radius: number;
      x: number;
      y: number;
      vx: number;
      vy: number;
      rot: number;
      vRot: number;
      isScattered: boolean;
    }

    let wordNodes: WordPhysicsNode[] = [];
    let isInitialized = false;

    const measureWords = () => {
      if (typeof window !== 'undefined' && window.innerWidth < 1024) return;
      const elements = heroRef.current?.querySelectorAll<HTMLElement>('.scatter-word');
      if (!elements || elements.length === 0) return;

      wordNodes = Array.from(elements).map((el) => {
        const prevTransform = el.style.transform;
        el.style.transform = '';
        const rect = el.getBoundingClientRect();
        el.style.transform = prevTransform;

        return {
          el,
          pageX: rect.left + window.scrollX + rect.width / 2,
          pageY: rect.top + window.scrollY + rect.height / 2,
          radius: Math.max(rect.width, rect.height) * 0.45,
          x: 0,
          y: 0,
          vx: 0,
          vy: 0,
          rot: 0,
          vRot: 0,
          isScattered: false,
        };
      });
      isInitialized = true;
    };

    const initTimer = setTimeout(measureWords, 1200);

    let rafId: number;
    const tick = () => {
      rafId = requestAnimationFrame(tick);
      if (typeof window !== 'undefined' && window.innerWidth < 1024) return;

      const card = typeof window !== 'undefined' ? (window as any).__LANYARD_CARD__ : null;
      const cardActive = !!card && performance.now() - card.time < 350;
      const isCardGrabbed = cardActive && !!card.isGrabbed;
      const cardSpeed = cardActive ? Math.hypot(card.vx || 0, card.vy || 0) : 0;
      const canCollide = isCardGrabbed || cardSpeed > 6.0;

      // Lazy measurement if card becomes active early
      if ((!isInitialized || wordNodes.length === 0) && cardActive) {
        measureWords();
      }

      if (!isInitialized || wordNodes.length === 0) return;

      const scrollX = window.scrollX;
      const scrollY = window.scrollY;

      for (let i = 0; i < wordNodes.length; i++) {
        const w = wordNodes[i];
        const screenX = w.pageX - scrollX + w.x;
        const screenY = w.pageY - scrollY + w.y;

        let isHit = false;

        if (cardActive && canCollide) {
          const dx = screenX - card.x;
          const dy = screenY - card.y;
          const dist = Math.hypot(dx, dy);
          const hitRadius = card.radius + w.radius;

          if (dist < hitRadius) {
            isHit = true;
            const nx = dx / (dist || 1);
            const ny = dy / (dist || 1);
            const depth = hitRadius - dist;

            // Direct displacement push away from card
            w.x += nx * depth * 0.40;
            w.y += ny * depth * 0.40;

            // Velocity impulse
            w.vx += nx * (depth * 0.25 + 6);
            w.vy += ny * 4.0 + 8.5; // Gravity tumble impulse: words fall down

            w.vRot += (nx > 0 ? 1 : -1) * (14 + Math.random() * 18);

            w.isScattered = true;
          }
        }

        if (isHit) {
          // Being pushed and falling
          w.vx *= 0.88;
          w.vy *= 0.90;
          w.vRot *= 0.88;
          w.x += w.vx;
          w.y += w.vy;
          w.rot += w.vRot;
        } else if (isCardGrabbed && w.isScattered) {
          // User is still holding the card nearby: words stay tumbled/scattered with downward gravity
          w.vy += 0.55;
          w.vx *= 0.93;
          w.vy *= 0.95;
          w.vRot *= 0.92;

          w.x += w.vx;
          w.y += w.vy;
          w.rot += w.vRot;

          // Soft floor bounce
          if (w.y > 220) {
            w.y = 220;
            w.vy = -Math.abs(w.vy) * 0.20;
          }
        } else {
          // User released the card (!isCardGrabbed) or card moved away:
          // All scattered words smoothly spring back to their exact typographic place!
          const springK = 0.095;
          const damping = 0.80;

          const ax = -w.x * springK;
          const ay = -w.y * springK;
          const aRot = -w.rot * 0.082;

          w.vx = (w.vx + ax) * damping;
          w.vy = (w.vy + ay) * damping;
          w.vRot = (w.vRot + aRot) * damping;

          w.x += w.vx;
          w.y += w.vy;
          w.rot += w.vRot;

          // Clean snap threshold
          if (
            Math.abs(w.x) < 0.2 &&
            Math.abs(w.y) < 0.2 &&
            Math.abs(w.rot) < 0.2 &&
            Math.abs(w.vx) < 0.05 &&
            Math.abs(w.vy) < 0.05
          ) {
            w.x = 0;
            w.y = 0;
            w.rot = 0;
            w.vx = 0;
            w.vy = 0;
            w.vRot = 0;
            w.isScattered = false;
            w.el.style.transform = '';
            w.el.style.zIndex = '';
            continue;
          }
        }

        // Apply GPU transform
        if (w.x !== 0 || w.y !== 0 || w.rot !== 0) {
          w.el.style.transform = `translate3d(${w.x.toFixed(2)}px, ${w.y.toFixed(2)}px, 0px) rotate(${w.rot.toFixed(2)}deg)`;
          w.el.style.zIndex = '35';
        }
      }
    };

    rafId = requestAnimationFrame(tick);

    const handleResize = () => {
      measureWords();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(initTimer);
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      wordNodes.forEach((w) => {
        w.el.style.transform = '';
        w.el.style.zIndex = '';
      });
    };
  }, []);


  return (
    <section
      ref={heroRef}
      id="hero"
      data-theme="paper"
      className="min-h-screen w-full flex flex-col justify-center pt-24 sm:pt-28 pb-16 sm:pb-20 relative bg-[var(--bg)] transition-colors duration-500 overflow-hidden"
    >

      {/* Full-Section 3D Physics Lanyard Canvas (Active across entire hero on all devices) */}
      <div className="hero-lanyard-wrapper absolute inset-0 z-20 pointer-events-none overflow-visible will-change-transform">
        <HeroLanyard />
      </div>

      {/* Main 2-Column Hero Grid */}
      <div className="hero-content-wrapper max-w-7xl mx-auto w-full px-4 sm:px-8 py-6 sm:py-10 relative z-30 pointer-events-none grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto will-change-transform">
        
        {/* Left Column (7 cols): Editorial Typography, Kinetic FlipWords & Badges */}
        <div className="lg:col-span-7 flex flex-col justify-center relative z-30 select-none pointer-events-auto">
          

          {/* Masked Line-by-Line Entrance Monumental Heading with Scatterable Words */}
          <h1 className="font-display font-bold tracking-[-0.035em] leading-[0.98] text-[var(--fg)] text-[clamp(2.1rem,7vw,5.1rem)] [perspective:1200px]">
            <span className="hero-line-mask block overflow-hidden py-0.5">
              <span className="hero-line-inner block will-change-transform opacity-0 [transform-style:preserve-3d]">
                <span className="scatter-word inline-block will-change-transform">
                  Engineering
                </span>
              </span>
            </span>
            <span className="hero-line-mask block overflow-hidden py-0.5 min-h-[1.12em]">
              <span className="hero-line-inner block will-change-transform opacity-0 [transform-style:preserve-3d]">
                <span className="scatter-word inline-block will-change-transform">
                  <FlipWords
                    words={FLIP_PHRASES}
                    duration={2600}
                    className="font-serif italic font-normal text-[var(--accent)] text-[1.08em] pr-2"
                  />
                </span>
              </span>
            </span>
            <span className="hero-line-mask block overflow-hidden py-0.5">
              <span className="hero-line-inner block will-change-transform opacity-0 [transform-style:preserve-3d]">
                <span className="scatter-word inline-block will-change-transform">with</span>{' '}
                <span className="scatter-word inline-block will-change-transform">sub-second</span>{' '}
                <span className="scatter-word inline-block will-change-transform">speed</span>
              </span>
            </span>
            <span className="hero-line-mask block overflow-hidden py-0.5">
              <span className="hero-line-inner block will-change-transform text-[var(--muted)] font-medium opacity-0 [transform-style:preserve-3d]">
                <span className="scatter-word inline-block will-change-transform">&</span>{' '}
                <span className="scatter-word inline-block will-change-transform">bulletproof</span>{' '}
                <span className="scatter-word inline-block will-change-transform">scale.</span>
              </span>
            </span>
          </h1>


        </div>

        {/* Right Column (5 cols): Spatial Placeholder for 3D Lanyard */}
        <div className="lg:col-span-5 w-full flex items-center justify-center relative z-10 pointer-events-none min-h-[380px] sm:min-h-[440px] lg:min-h-[500px]" />

      </div>
    </section>
  );
}

export default HeroSection;
