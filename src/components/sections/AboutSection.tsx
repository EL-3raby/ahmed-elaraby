'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// 100% Full-Stack Impactful Manifesto in Inter font
const ABOUT_TEXT =
  'I engineer complete full-stack web platforms from database architecture to 60fps interactive UI with single-developer velocity.';

const ABOUT_WORDS = ABOUT_TEXT.split(' ');

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const wordsContainerRef = useRef<HTMLParagraphElement>(null);
  const gridWrapperRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const words = wordsContainerRef.current?.querySelectorAll('.about-word');
      if (!words || words.length === 0) return;

      // 0. Left-aligned tag animation: slides in from the left
      if (tagRef.current) {
        gsap.fromTo(
          tagRef.current,
          {
            x: -50,
            opacity: 0,
            filter: 'blur(6px)',
          },
          {
            x: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // 1. Entrance lift & focus pull as user arrives from Hero into About
      if (gridWrapperRef.current) {
        gsap.fromTo(
          gridWrapperRef.current,
          {
            yPercent: 10,
            scale: 0.95,
            opacity: 0.5,
            filter: 'blur(8px)',
          },
          {
            yPercent: 0,
            scale: 1,
            opacity: 1,
            filter: 'blur(0px)',
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'top top',
              scrub: 0.5,
            },
          }
        );
      }

      const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;

      // 2. Main Pinned Timeline with Kinetic Word Scrub + Smooth Exit Lift
      const pinnedTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: isMobile ? '+=380' : '+=1200',
          pin: pinContainerRef.current,
          anticipatePin: 1,
          scrub: 0.4,
        },
      });

      // Initial state of each word: physically offset down, 3D tilted, blurred, and dim
      gsap.set(words, {
        opacity: 0.18,
        color: '#444444',
        y: 20,
        rotateX: 18,
        filter: 'blur(5px)',
        transformOrigin: '50% 100%',
      });

      // Phase 1: Dynamic 3D Lift & Focus scrub as user scrolls down
      pinnedTl.to(words, {
        opacity: 1,
        color: '#FFFFFF',
        y: 0,
        rotateX: 0,
        filter: 'blur(0px)',
        stagger: 0.05,
        ease: 'power1.out',
        duration: 1.2,
      });

      // Small pause where all words are fully illuminated and readable
      pinnedTl.to({}, { duration: 0.3 });

      // Phase 2: Smooth exit parallax lift when continuing scroll DOWN towards Works
      // On mobile, keep opacity clean so user does not scroll through an empty black void
      if (gridWrapperRef.current) {
        pinnedTl.to(gridWrapperRef.current, {
          yPercent: isMobile ? -8 : -22,
          scale: isMobile ? 0.98 : 0.94,
          opacity: isMobile ? 0.85 : 0.15,
          filter: isMobile ? 'blur(0px)' : 'blur(10px)',
          duration: 0.8,
          ease: 'power2.in',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      data-theme="obsidian"
      className="relative w-full bg-[#0B0B0C] text-[var(--fg)] transition-colors duration-500 overflow-hidden"
    >
      {/* Pinned Viewport Stage - 100% Clean without any header lines or cues */}
      <div
        ref={pinContainerRef}
        className="min-h-[85vh] sm:h-screen w-full flex items-center justify-center px-5 sm:px-12 md:px-16 lg:px-24 max-w-7xl mx-auto relative select-none py-12 sm:py-0"
      >
        {/* Main 2-Column Editorial Grid (Pixel-Perfect match to reference Image 2) */}
        <div
          ref={gridWrapperRef}
          className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 lg:gap-14 items-start will-change-transform [perspective:1200px]"
        >
          {/* Left Column: Clean (ABOUT) Tag */}
          <div className="md:col-span-2 lg:col-span-2 pt-1.5 sm:pt-2.5 overflow-hidden">
            <span
              ref={tagRef}
              className="font-mono text-xs sm:text-sm font-semibold tracking-wider uppercase text-white/50 block will-change-transform"
            >
              (ABOUT)
            </span>
          </div>

          {/* Right Column: Monumental 3-Line Full-Stack Text in Inter font */}
          <div className="md:col-span-10 lg:col-span-10">
            <p
              ref={wordsContainerRef}
              className="[font-family:var(--font-inter)] font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-[4rem] tracking-[-0.035em] leading-[1.14] max-w-5xl [perspective:1200px]"
            >
              {ABOUT_WORDS.map((word, index) => (
                <span
                  key={index}
                  className="about-word inline-block mr-[0.26em] will-change-transform"
                >
                  {word}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
