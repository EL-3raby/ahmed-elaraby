'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export type ThemeMode = 'paper' | 'obsidian' | 'stone';

export interface ThemeColors {
  bg: string;
  fg: string;
  muted: string;
  card: string;
  border: string;
  accent: string;
}

export const THEME_CONFIG: Record<ThemeMode, ThemeColors> = {
  paper: {
    bg: '#F4F3EF',
    fg: '#111111',
    muted: '#666560',
    card: 'rgba(17, 17, 17, 0.03)',
    border: 'rgba(17, 17, 17, 0.12)',
    accent: '#FF4D00',
  },
  obsidian: {
    bg: '#0B0B0C',
    fg: '#F4F3EF',
    muted: '#8E8D8A',
    card: 'rgba(244, 243, 239, 0.04)',
    border: 'rgba(244, 243, 239, 0.12)',
    accent: '#FF4D00',
  },
  stone: {
    bg: '#E6E4DD',
    fg: '#111111',
    muted: '#575652',
    card: 'rgba(17, 17, 17, 0.04)',
    border: 'rgba(17, 17, 17, 0.15)',
    accent: '#111111',
  },
};

interface ThemeContextType {
  currentTheme: ThemeMode;
  setThemeDirectly: (theme: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  currentTheme: 'paper',
  setThemeDirectly: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export function ThemeScrollManager({ children }: { children?: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeMode>('paper');

  const applyTheme = (theme: ThemeMode, immediate: boolean = false) => {
    const config = THEME_CONFIG[theme];
    if (!config) return;

    setCurrentTheme(theme);
    document.documentElement.setAttribute('data-active-theme', theme);

    if (immediate) {
      gsap.set(document.documentElement, {
        '--bg': config.bg,
        '--fg': config.fg,
        '--muted': config.muted,
        '--card': config.card,
        '--border': config.border,
        '--accent': config.accent,
      });
    } else {
      gsap.to(document.documentElement, {
        '--bg': config.bg,
        '--fg': config.fg,
        '--muted': config.muted,
        '--card': config.card,
        '--border': config.border,
        '--accent': config.accent,
        duration: 0.65,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Initial check: find which section currently overlaps the viewport trigger zone
    const sections = Array.from(document.querySelectorAll<HTMLElement>('section[data-theme]'));
    if (sections.length === 0) return;

    const triggers: ScrollTrigger[] = [];

    sections.forEach((section) => {
      const theme = (section.getAttribute('data-theme') as ThemeMode) || 'paper';

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: 'top 55%',
        end: 'bottom 55%',
        onEnter: () => applyTheme(theme),
        onEnterBack: () => applyTheme(theme),
      });

      triggers.push(trigger);
    });

    // Refresh ScrollTrigger to calculate initial positions accurately
    ScrollTrigger.refresh();

    // Check immediate active section based on current scroll position
    const scrollPos = window.scrollY + window.innerHeight * 0.55;
    for (const section of sections) {
      const rect = section.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      const bottom = top + rect.height;
      if (scrollPos >= top && scrollPos <= bottom) {
        const theme = (section.getAttribute('data-theme') as ThemeMode) || 'paper';
        applyTheme(theme, true);
        break;
      }
    }

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <ThemeContext.Provider value={{ currentTheme, setThemeDirectly: applyTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
