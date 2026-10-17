'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSmoothScroll } from '@/components/providers/SmoothScrollProvider';

const NAV_ITEMS = [
  { label: 'HOME', href: '#hero' },
  { label: 'WORKS', href: '#works' },
  { label: 'ABOUT', href: '#about' },
  { label: 'PROCESS', href: '#process' },
  { label: 'CONTACT', href: '#contact' },
];

const SOCIAL_ITEMS = [
  { label: 'GitHub', href: 'https://github.com/AhmedElaraby' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ahmed-elaraby' },
  { label: 'Twitter / X', href: 'https://x.com' },
  { label: 'Behance', href: 'https://www.behance.net' },
];

export function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#hero');
  const { scrollTo } = useSmoothScroll();

  // Robust body scroll lock & unlock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = ['hero', 'works', 'about', 'process', 'contact'];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(`#${id}`);
            }
          });
        },
        { threshold: 0.25 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  // Instant drawer close + smooth scroll
  const handleLinkClick = useCallback((href: string) => {
    setIsOpen(false);
    setActiveSection(href);
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';

    // Scroll seamlessly to section
    setTimeout(() => {
      if (href === '#hero') {
        scrollTo(0, { duration: 0.9 });
      } else {
        scrollTo(href, { offset: -70, duration: 0.9 });
      }
    }, 120);
  }, [scrollTo]);

  return (
    <div className="block md:hidden">
      {/* =========================================================================
          FIXED TOP BAR (Closed State) - Pixel-perfect match to Nakula Mobile
          ========================================================================= */}
      <header className="fixed top-0 left-0 right-0 z-40 h-[64px] px-5 flex items-center justify-between bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/[0.08] transition-all">
        {/* Left: Brand Logo (ELARABY ®) */}
        <button
          type="button"
          onClick={() => handleLinkClick('#hero')}
          className="flex items-start select-none group cursor-pointer bg-transparent border-0 p-0 text-left"
        >
          <span
            className="font-anton uppercase tracking-[-0.02em] text-[#F4F3EF] text-2xl leading-none"
            style={{ fontFamily: 'var(--font-anton), Impact, sans-serif' }}
          >
            ELARABY
          </span>
          <span className="text-[#FF4925] font-sans font-bold text-xs ml-0.5 -mt-0.5 select-none">
            ®
          </span>
        </button>

        {/* Right: "LET'S TALK" Pill + Circular Hamburger Button */}
        <div className="flex items-center gap-3">
          {/* Pill Button */}
          <button
            type="button"
            onClick={() => handleLinkClick('#contact')}
            className="px-3.5 py-1.5 rounded-full border border-white/20 bg-white/5 text-[11px] font-sans font-semibold uppercase tracking-wider text-[#F4F3EF] hover:bg-white hover:text-black active:scale-95 transition-all cursor-pointer"
          >
            LET&apos;S TALK
          </button>

          {/* Circular Hamburger Button */}
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="w-10 h-10 rounded-full border border-white/15 bg-[#141414] flex flex-col items-center justify-center gap-1.5 cursor-pointer hover:border-white/30 active:scale-90 transition-all"
            aria-label="Open mobile menu"
          >
            <span className="w-4 h-[1.5px] bg-white rounded-full block pointer-events-none" />
            <span className="w-4 h-[1.5px] bg-white rounded-full block pointer-events-none" />
          </button>
        </div>
      </header>

      {/* =========================================================================
          FULL-SCREEN MOBILE MENU DRAWER (Opened State)
          ========================================================================= */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            key="nakula-mobile-nav-drawer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-[#0A0A0A] text-[#F4F3EF] flex flex-col justify-between px-6 pt-5 pb-8 overflow-y-auto select-none"
          >
            {/* Top Bar inside Drawer: "■ MENU" on Left, Circular "✕" on Right */}
            <div className="flex items-center justify-between pb-6 border-b border-white/[0.08] shrink-0">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-[1px] bg-[#FF4925] shrink-0" />
                <span className="font-mono text-xs font-bold tracking-widest text-[#8F8F8F] uppercase">
                  MENU
                </span>
              </div>

              {/* Circular Close Button with ✕ */}
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  document.body.style.overflow = '';
                  document.documentElement.style.overflow = '';
                }}
                className="w-10 h-10 rounded-full border border-white/15 bg-[#141414] flex items-center justify-center text-white cursor-pointer hover:border-white/30 active:scale-90 transition-all"
                aria-label="Close mobile menu"
              >
                <svg
                  className="w-4 h-4 text-white pointer-events-none"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M4 12L12 4M4 4l8 8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {/* Navigation Links: Stacked Anton items with thin dividers */}
            <div className="flex-1 flex flex-col justify-center py-6">
              {NAV_ITEMS.map((item, index) => {
                const isActive = activeSection === item.href;
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * index, duration: 0.25 }}
                    className="border-b border-[#222] py-4"
                  >
                    <button
                      type="button"
                      onClick={() => handleLinkClick(item.href)}
                      className="group flex items-center justify-between cursor-pointer w-full text-left bg-transparent border-0 p-0"
                    >
                      <span
                        className={`font-anton uppercase tracking-[-0.01em] text-4xl sm:text-5xl transition-colors duration-200 ${
                          isActive ? 'text-white' : 'text-[#CACACA] group-hover:text-white'
                        }`}
                        style={{ fontFamily: 'var(--font-anton), Impact, sans-serif' }}
                      >
                        {item.label}
                      </span>
                      {/* Active indicator: Orange square dot ■ */}
                      {isActive && (
                        <span className="w-2.5 h-2.5 rounded-[1px] bg-[#FF4925] shrink-0" />
                      )}
                    </button>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom Info Block: (EMAIL) + (SOCIALS) */}
            <div className="pt-4 shrink-0 space-y-5">
              {/* Email */}
              <div>
                <p className="font-sans text-[11px] uppercase text-[#8F8F8F] tracking-wider mb-1 select-none">
                  (EMAIL)
                </p>
                <a
                  href="mailto:contact@ahmedelaraby.dev"
                  className="font-sans text-lg font-semibold text-[#FF4925] hover:brightness-125 transition-all"
                >
                  contact@ahmedelaraby.dev
                </a>
              </div>

              {/* Socials Grid */}
              <div>
                <p className="font-sans text-[11px] uppercase text-[#8F8F8F] tracking-wider mb-2 select-none">
                  (SOCIALS)
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {SOCIAL_ITEMS.map((soc) => (
                    <a
                      key={soc.label}
                      href={soc.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-sans text-sm text-[#CACACA] hover:text-white flex items-center gap-1.5 transition-colors group"
                    >
                      <span>{soc.label}</span>
                      <svg
                        className="w-3 h-3 text-[#777] group-hover:text-[#FF4925] transition-colors"
                        viewBox="0 0 12 12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M2.5 9.5L9.5 2.5" />
                        <path d="M4 2.5h5.5V8" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default MobileNavbar;
