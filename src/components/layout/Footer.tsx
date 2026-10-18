'use client';

import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSmoothScroll } from '@/components/providers/SmoothScrollProvider';

interface NavLinkProps {
  label: string;
  href: string;
  isExternal?: boolean;
}

function NakulaNavLink({ label, href, isExternal }: NavLinkProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { scrollTo } = useSmoothScroll();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isExternal && href.startsWith('#')) {
      e.preventDefault();
      scrollTo(href, { duration: 1.2 });
    }
  };

  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative inline-flex flex-col py-1 text-decoration-none select-none w-fit cursor-pointer"
    >
      <div className="flex items-center gap-2">
        <span
          className={`font-sans text-[22px] sm:text-[24px] font-medium tracking-[-1.2px] leading-[26px] transition-colors duration-300 ${
            isHovered ? 'text-white' : 'text-[#CACACA]'
          }`}
        >
          {label}
        </span>
        {isExternal && (
          <svg
            className={`w-3.5 h-3.5 transition-all duration-300 ${
              isHovered ? 'text-[#FF4925] translate-x-0.5 -translate-y-0.5' : 'text-[#777777]'
            }`}
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
        )}
      </div>

      {/* Nakula Signature Expanding Accent Line Underneath */}
      <div className="relative h-[2px] w-full overflow-hidden mt-1">
        <div
          className={`h-full bg-[#FF4925] transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] ${
            isHovered ? 'w-full' : 'w-0'
          }`}
        />
      </div>
    </a>
  );
}

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const orangeBannerRef = useRef<HTMLDivElement>(null);
  const bigWordmarkRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const footer = footerRef.current;
    const banner = orangeBannerRef.current;
    const wordmark = bigWordmarkRef.current;
    const tagline = taglineRef.current;

    if (!footer || !banner) return;

    const ctx = gsap.context(() => {
      // 1. Smooth upward reveal of the Orange Banner
      gsap.fromTo(
        banner,
        {
          opacity: 0.85,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: banner,
            start: 'top 95%',
            end: 'top 70%',
            scrub: 0.5,
          },
        }
      );

      // 2. Monumental Wordmark (ELARABY ®) Smooth Kinetic Lift
      if (wordmark) {
        gsap.fromTo(
          wordmark,
          {
            yPercent: 25,
            opacity: 0,
          },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.1,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: banner,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // 3. Tagline (Beyond Visuals. Built with Vision.) Staggered Slide In
      if (tagline) {
        gsap.fromTo(
          tagline,
          {
            yPercent: 30,
            opacity: 0,
          },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1,
            delay: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: banner,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, footer);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="w-full relative select-none">
      {/* =========================================================================
          BLOCK 1: TOP MAIN SECTION (#0A0A0A)
          Exact Nakula .framer-11myxzf styles:
          Padding: 56px 24px 24px | Gap: 64px | Max-width: 1400px
      ========================================================================= */}
      <div className="w-full bg-[#0A0A0A] text-[#F4F3EF] px-5 sm:px-6 md:px-8 lg:px-12 pt-8 sm:pt-14 pb-8 border-t border-[#1C1C1E]">
        <div className="max-w-[1400px] mx-auto w-full flex flex-col gap-16">
          
          {/* TOP CONTACT ROW: (EMAIL) & (PHONE) */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 sm:gap-16 md:gap-24">
            
            {/* Email Column */}
            <div className="flex items-center gap-5 sm:gap-6">
              <span className="font-sans text-[14px] uppercase text-[#8F8F8F] tracking-[-0.56px] leading-[16.8px] select-none">
                (EMAIL)
              </span>
              <a
                href="mailto:contact@ahmedelaraby.dev"
                className="font-sans text-[22px] sm:text-[26px] font-semibold text-[#FF4925] tracking-[-1.3px] leading-[26px] hover:brightness-125 transition-all duration-300"
              >
                contact@ahmedelaraby.dev
              </a>
            </div>

            {/* Phone Column */}
            <div className="flex items-center gap-4 sm:gap-5">
              <span className="font-sans text-[14px] uppercase text-[#8F8F8F] tracking-[-0.56px] leading-[16.8px] select-none">
                (PHONE)
              </span>
              <a
                href="tel:01050150780"
                className="font-sans text-[20px] sm:text-[24px] font-semibold text-[#CACACA] tracking-[-0.96px] leading-[24px] hover:text-white transition-colors duration-300"
              >
                +20 105 015 0780
              </a>
            </div>

          </div>

          {/* MIDDLE ROW: (LINKS) AND (SOCIALS) */}
          <div className="flex flex-row justify-start items-start gap-16 sm:gap-28 md:gap-36 w-full">
            
            {/* LINKS */}
            <div className="flex flex-col items-start gap-4 min-w-[120px]">
              <p className="font-sans text-[14px] uppercase text-[#8F8F8F] tracking-[-0.56px] leading-[16.8px] select-none">
                (LINKS)
              </p>
              <div className="flex flex-col items-start gap-1">
                <NakulaNavLink label="Home" href="#hero" />
                <NakulaNavLink label="About" href="#about" />
                <NakulaNavLink label="Works" href="#works" />
                <NakulaNavLink label="Process" href="#process" />
                <NakulaNavLink label="Contact" href="#contact" />
              </div>
            </div>

            {/* SOCIALS */}
            <div className="flex flex-col items-start gap-4 min-w-[130px]">
              <p className="font-sans text-[14px] uppercase text-[#8F8F8F] tracking-[-0.56px] leading-[16.8px] select-none">
                (SOCIALS)
              </p>
              <div className="flex flex-col items-start gap-1">
                <NakulaNavLink label="GitHub" href="https://github.com/AhmedElaraby" isExternal />
                <NakulaNavLink label="LinkedIn" href="https://www.linkedin.com/in/ahmed-elaraby" isExternal />
                <NakulaNavLink label="Twitter / X" href="https://x.com" isExternal />
                <NakulaNavLink label="Behance" href="https://www.behance.net" isExternal />
              </div>
            </div>

          </div>

          {/* BOTTOM SUBFOOTER ROW: COPYRIGHT & CREDITS */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 pt-4">
            
            {/* Left: Copyright */}
            <div className="flex items-center">
              <p className="font-sans text-[12px] uppercase text-[#777777] tracking-[-0.48px] select-none">
                @2026 AHMED ELARABY. ALL RIGHTS RESERVED
              </p>
            </div>

            {/* Right: Made By Indicator */}
            <div className="flex items-center gap-2 text-[12px] font-mono text-[#777777] select-none">
              <span>MADE BY</span>
              <span className="font-sans font-bold text-white tracking-wider">
                AHMED ELARABY
              </span>
            </div>

          </div>

        </div>
      </div>

      {/* =========================================================================
          BLOCK 2: FIERY ORANGE BANNER (#FF4925)
          Exact Nakula .framer-7zarxj styles:
          Background: rgb(255, 73, 37) | Padding: 100px 24px 24px | Max-width: 1400px
          Left: Monumental Wordmark in Anton font (ELARABY ®)
          Right: Stacked Tagline "Beyond Visuals. Built with Vision." (48px, text-right, 240px wide)
      ========================================================================= */}
      <div
        ref={orangeBannerRef}
        className="w-full bg-[#FF4925] text-black px-4 sm:px-6 md:px-8 lg:px-12 pt-20 sm:pt-24 md:pt-28 pb-6 sm:pb-8 relative overflow-hidden"
      >
        <div className="max-w-[1400px] mx-auto w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-8 md:gap-12">
          
          {/* LEFT: MONUMENTAL LOGO (ELARABY ®) */}
          <div
            ref={bigWordmarkRef}
            className="flex items-start select-none will-change-transform"
          >
            <h2
              className="font-anton uppercase tracking-[-0.03em] text-black leading-[0.82] text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] xl:text-[13rem] 2xl:text-[14.5rem]"
              style={{ fontFamily: 'var(--font-anton), Impact, sans-serif' }}
            >
              ELARABY
            </h2>
            {/* Crisp Trademark Registration Symbol ® */}
            <span
              className="text-black font-sans font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl 2xl:text-5xl ml-1 sm:ml-2 mt-1 sm:mt-2 select-none"
              style={{ lineHeight: '1' }}
            >
              ®
            </span>
          </div>

          {/* RIGHT: STACKED TAGLINE (Build What Others Can't.) */}
          <div
            ref={taglineRef}
            className="w-full md:w-[240px] shrink-0 flex flex-col items-start md:items-end select-none will-change-transform pb-2"
          >
            <h3
              className="font-sans font-semibold text-[#0A0A0A] text-3xl sm:text-4xl md:text-[44px] lg:text-[48px] tracking-[-2px] sm:tracking-[-2.88px] leading-[1.05] text-left md:text-right"
              style={{ fontFamily: 'var(--font-sans), sans-serif' }}
            >
              Build What<br />Others<br />Can&apos;t.
            </h3>
          </div>

        </div>
      </div>
    </footer>
  );
}
