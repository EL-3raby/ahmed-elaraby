'use client';

import React, { useRef } from 'react';
import { useSmoothScroll } from '@/components/providers/SmoothScrollProvider';
import gsap from 'gsap';

export function EditorialNavbar() {
  const { scrollTo } = useSmoothScroll();
  const ctaRef = useRef<HTMLButtonElement>(null);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollTo(href, { offset: 0 });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = ctaRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);

    gsap.to(btn, {
      x: x * 0.35,
      y: y * 0.35,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    const btn = ctaRef.current;
    if (!btn) return;
    gsap.to(btn, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)',
    });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] px-4 md:px-8 py-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between backdrop-blur-md bg-[var(--bg)]/75 border border-[var(--border)] px-4 sm:px-6 py-3 rounded-full transition-colors duration-500 shadow-xs">
        
        {/* Brand & Monospace Subtitle */}
        <div className="flex items-center gap-3">
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center gap-2.5 group"
          >
            <span className="font-display font-bold tracking-tight text-sm sm:text-base text-[var(--fg)] group-hover:text-[var(--accent)] transition-colors">
              AHMED ELARABY
            </span>
            <span className="font-mono text-[10px] tracking-wider px-1.5 py-0.5 rounded border border-[var(--border)] text-[var(--muted)]">
              [FS // ENG]
            </span>
          </a>

          {/* Live Availability Status Pill */}
          <div className="hidden lg:flex items-center gap-2 pl-3 ml-1 border-l border-[var(--border)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-mono text-[11px] tracking-wider uppercase text-[var(--muted)]">
              Available For Freelance
            </span>
          </div>
        </div>

        {/* Navigation Anchors */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs font-mono tracking-wider uppercase">
          <a
            href="#about"
            onClick={(e) => handleNavClick(e, '#about')}
            className="text-[var(--muted)] hover:text-[var(--fg)] transition-colors relative py-1"
          >
            About
          </a>
          <a
            href="#works"
            onClick={(e) => handleNavClick(e, '#works')}
            className="text-[var(--muted)] hover:text-[var(--fg)] transition-colors relative py-1"
          >
            Works
          </a>
          <a
            href="#process"
            onClick={(e) => handleNavClick(e, '#process')}
            className="text-[var(--muted)] hover:text-[var(--fg)] transition-colors relative py-1"
          >
            Process
          </a>
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="text-[var(--muted)] hover:text-[var(--fg)] transition-colors relative py-1"
          >
            Contact
          </a>
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <button
            ref={ctaRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => scrollTo('#contact', { offset: 0 })}
            className="relative inline-flex items-center justify-center px-4 sm:px-5 py-2 text-xs font-mono font-medium uppercase tracking-wider rounded-full bg-[var(--fg)] text-[var(--bg)] hover:bg-[var(--accent)] hover:text-white transition-colors duration-200 cursor-pointer shadow-sm"
          >
            <span>Start a Project</span>
          </button>
        </div>

      </div>
    </header>
  );
}
