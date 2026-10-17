import React from 'react';  
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { WorksSection } from '@/components/sections/WorksSection';
import { WorkflowSection } from '@/components/sections/WorkflowSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { Footer } from '@/components/layout/Footer';

export default function Home() {
  return (
    <div className="w-full relative">
      {/* SECTION 01: EDITORIAL HERO (Paper Theme) */}
      <HeroSection />

      {/* SECTION 02: ABOUT & MANIFESTO (Obsidian Theme) */}
      <AboutSection />

      {/* SECTION 03: SELECTED WORKS & SYSTEM BLUEPRINTS (Obsidian Theme) */}
      <WorksSection />

      {/* SECTION 04: EXECUTION WORKFLOW & ARSENAL MATRIX (Obsidian Theme) */}
      <WorkflowSection />

      {/* SECTION 05: INITIATE COLLABORATION & CONTACT (Obsidian Theme) */}
      <ContactSection />

      {/* SECTION 06: NAKULA EDITORIAL FOOTER & MONUMENTAL BANNER */}
      <Footer />
    </div>
  );
}
