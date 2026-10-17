'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const leftBrandRef = useRef<HTMLDivElement>(null);
  const rightHeadingRef = useRef<HTMLHeadingElement>(null);

  // Scroll animations for section entrance and cinematic card arrival from outside the screen
  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // 1. Subtle entrance of the whole section
      gsap.fromTo(
        section,
        {
          y: 30,
          opacity: 0.3,
        },
        {
          y: 0,
          opacity: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 98%',
            end: 'top 80%',
            scrub: 0.2,
          },
        }
      );

      // 2. Monumental Stacked Headline: Line-by-line 3D vertical lift from masked bottom
      const lines = [line1Ref.current, line2Ref.current].filter(Boolean);
      if (lines.length > 0) {
        gsap.fromTo(
          lines,
          {
            yPercent: 115,
            rotateX: 25,
            opacity: 0,
            filter: 'blur(10px)',
            transformOrigin: '0% 100%',
          },
          {
            yPercent: 0,
            rotateX: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 1.15,
            stagger: 0.15,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: headlineRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // 3. Cinematic entrance of the card from outside the screen after scrolling past headline
      const card = cardRef.current;
      if (card) {
        gsap.fromTo(
          card,
          {
            y: 280,
            opacity: 0,
            scale: 0.88,
            rotateX: 10,
            transformOrigin: '50% 100%',
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotateX: 0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 96%',
              end: 'top 52%',
              scrub: 0.8,
            },
          }
        );

        // 4. Card Left-Aligned Brand: Slides in from the left
        if (leftBrandRef.current) {
          gsap.fromTo(
            leftBrandRef.current,
            {
              x: -60,
              opacity: 0,
              filter: 'blur(8px)',
            },
            {
              x: 0,
              opacity: 1,
              filter: 'blur(0px)',
              duration: 1.0,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 75%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }

        // 5. Card Right-Aligned Heading: Slides in from the right
        if (rightHeadingRef.current) {
          gsap.fromTo(
            rightHeadingRef.current,
            {
              x: 70,
              opacity: 0,
              filter: 'blur(8px)',
            },
            {
              x: 0,
              opacity: 1,
              filter: 'blur(0px)',
              duration: 1.0,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 75%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      data-theme="obsidian"
      className="min-h-screen w-full px-4 sm:px-8 lg:px-12 pt-20 sm:pt-28 pb-12 sm:pb-16 relative bg-[#0B0B0C] text-[#F4F3EF] transition-colors duration-500 overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto [perspective:1200px]">

        {/* 1. MONUMENTAL HEADLINE (Image 1 Style) */}
        <div ref={headlineRef} className="py-8 sm:py-12 select-none overflow-hidden [perspective:1000px]">
          <div
            className="flex flex-col gap-3 sm:gap-5 md:gap-7 lg:gap-9 font-anton uppercase tracking-[-0.02em] text-[#D8D8D8] text-5xl sm:text-7xl md:text-9xl lg:text-[11rem] xl:text-[13rem] leading-[0.9] transition-colors duration-300"
            style={{ fontFamily: 'var(--font-anton), Impact, sans-serif' }}
          >
            <div className="overflow-hidden py-1">
              <div
                ref={line1Ref}
                className="hover:text-white transition-colors cursor-default will-change-transform"
              >
                LET&apos;S WORK
              </div>
            </div>
            <div className="overflow-hidden py-1">
              <div
                ref={line2Ref}
                className="hover:text-[#FF4D00] transition-colors cursor-default will-change-transform"
              >
                TOGETHER
              </div>
            </div>
          </div>
        </div>

        {/* 2. THE GLOWING AMBER/ORANGE FRAMED CARD (Image 2 Style) */}
        <div
          ref={cardRef}
          className="relative w-full rounded-[2.25rem] sm:rounded-[2.75rem] lg:rounded-[3rem] p-6 sm:p-12 lg:p-16 border border-white/15 overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.85)] mt-4 will-change-transform"
          style={{
            background:
              'radial-gradient(ellipse 90% 80% at 88% 92%, rgba(255, 77, 0, 0.65) 0%, rgba(200, 50, 0, 0.38) 35%, rgba(100, 22, 0, 0.2) 65%, transparent 85%), radial-gradient(ellipse 60% 50% at 20% 15%, rgba(255, 255, 255, 0.04) 0%, transparent 70%), linear-gradient(145deg, #080809 0%, #110804 35%, #1d0c04 65%, #2a1104 100%)',
          }}
        >
          {/* Subtle warm orange top-right light accent */}
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#FF4D00]/15 blur-3xl pointer-events-none" />

          {/* TOP ROW: Brand on Left, Headline + Pill CTA on Right */}
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-start justify-between gap-8 sm:gap-10">
            
            {/* Top Left: ELENA VOSS style -> AHMED ELARABY (slides from left) */}
            <div ref={leftBrandRef} className="will-change-transform">
              <div className="text-2xl sm:text-4xl md:text-5xl font-sans tracking-tight text-white font-bold leading-none">
                AHMED<span className="font-light text-white/70 ml-1.5">ELARABY</span>
              </div>
            </div>

            {/* Top Right: "Ready to Bring Your Vision to Life?" + Pill Button (slides from right) */}
            <div className="flex flex-col items-start md:items-end max-w-xl">
              <h3
                ref={rightHeadingRef}
                className="font-sans text-xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-white tracking-tight leading-[1.14] md:text-right will-change-transform"
              >
                Ready to Bring Your Vision to Life?
              </h3>

              <div className="mt-7">
                {/* Pill Button with Cinematic Ink-Bloom Dot-to-Black Expansion */}
                <a
                  href="mailto:contact@ahmedelaraby.dev?subject=Project%20Inquiry%20-%20Ahmed%20Elaraby"
                  className="relative inline-flex items-center justify-center gap-2.5 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-white font-sans text-sm sm:text-base font-semibold hover:border-white/20 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 shadow-xl cursor-pointer group overflow-hidden select-none"
                >
                  {/* Cinematic Expanding Dot: Expands from resting dot to engulf entire button in black */}
                  <span
                    aria-hidden="true"
                    className="w-2.5 h-2.5 rounded-full bg-black group-hover:scale-[48] transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] transform-gpu origin-center shrink-0 z-0 pointer-events-none"
                  />

                  {/* Text that lights up white and gently slides to center */}
                  <span className="relative z-10 text-black group-hover:text-white group-hover:-translate-x-2 transition-all duration-400 ease-out tracking-tight">
                    Get in Touch
                  </span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
