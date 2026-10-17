'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export function CustomMagneticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    // Only enable on desktop devices with fine pointer (mouse)
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    setIsEnabled(true);

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    // GSAP quickTo for silky performance
    const xCursor = gsap.quickTo(cursor, 'x', { duration: 0.1, ease: 'power3.out' });
    const yCursor = gsap.quickTo(cursor, 'y', { duration: 0.1, ease: 'power3.out' });

    const xFollower = gsap.quickTo(follower, 'x', { duration: 0.35, ease: 'power3.out' });
    const yFollower = gsap.quickTo(follower, 'y', { duration: 0.35, ease: 'power3.out' });

    let isHovering = false;

    const handleMouseMove = (e: MouseEvent) => {
      xCursor(e.clientX);
      yCursor(e.clientY);
      xFollower(e.clientX);
      yFollower(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('a, button, [data-cursor], input, textarea, select');
      if (interactive && !isHovering) {
        isHovering = true;
        gsap.to(cursor, { scale: 0.4, opacity: 0.6, duration: 0.25, ease: 'power2.out' });
        gsap.to(follower, {
          scale: 1.8,
          backgroundColor: 'rgba(255, 255, 255, 0.12)',
          borderColor: 'rgba(255, 255, 255, 0.8)',
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('a, button, [data-cursor], input, textarea, select');
      if (interactive && isHovering) {
        // Verify we aren't still inside an interactive target
        const related = (e.relatedTarget as HTMLElement | null)?.closest('a, button, [data-cursor], input, textarea, select');
        if (!related) {
          isHovering = false;
          gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.25, ease: 'power2.out' });
          gsap.to(follower, {
            scale: 1,
            backgroundColor: 'transparent',
            borderColor: 'rgba(255, 255, 255, 0.4)',
            duration: 0.3,
            ease: 'power2.out',
          });
        }
      }
    };

    const handleMouseEnter = () => {
      gsap.to([cursor, follower], { opacity: 1, duration: 0.2 });
    };

    const handleMouseLeave = () => {
      gsap.to([cursor, follower], { opacity: 0, duration: 0.2 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (!isEnabled) return null;

  return (
    <>
      {/* Central crisp dot */}
      <div
        ref={cursorRef}
        className="hidden md:block fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full bg-white pointer-events-none z-[9999] mix-blend-difference will-change-transform"
        style={{ opacity: 0 }}
      />
      {/* Smooth fluid follower ring */}
      <div
        ref={followerRef}
        className="hidden md:block fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 rounded-full border border-white/40 pointer-events-none z-[9998] mix-blend-difference will-change-transform transition-[border-color,background-color] duration-150"
        style={{ opacity: 0 }}
      />
    </>
  );
}
