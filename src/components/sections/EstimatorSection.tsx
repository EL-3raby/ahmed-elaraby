'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  PulseTerminalIcon,
  CopyVectorIcon,
  CheckVectorIcon,
  ArrowUpRightAnimated,
  GlobeVectorIcon,
  ClockVectorIcon,
  SparkleNodeIcon,
  ShieldLockIcon,
} from '@/components/ui/EditorialIcons';
import { useSmoothScroll } from '@/components/providers/SmoothScrollProvider';

const SYSTEM_TYPES = [
  { id: 'ecommerce', label: 'High-Conversion E-Commerce', defaultDays: '2–3 weeks' },
  { id: 'saas', label: 'Full-Stack Web / SaaS', defaultDays: '3–5 weeks' },
  { id: 'erp', label: 'Desktop ERP + Cloud Sync', defaultDays: '3–6 weeks' },
  { id: 'ai-custom', label: 'AI & Custom Engineering', defaultDays: '2–4 weeks' },
];

const PRIORITIES = [
  'Awwwards Motion UI',
  'Database & API Architecture',
  '3D Product Visuals',
  'Offline/Cloud Sync',
  'Speed & SEO Overhaul',
];

const TIMELINES = [
  { id: 'urgent', label: 'Urgent Sprint (1–2 Weeks)' },
  { id: 'standard', label: 'Standard Build (3–5 Weeks)' },
  { id: 'enterprise', label: 'Enterprise Ecosystem (2+ Months)' },
];

const PLATFORMS = [
  { name: 'Upwork', url: 'https://www.upwork.com/freelancers/~017c6999a0ffbfcbca', rating: 'Top-Rated' },
  { name: 'Nafezly', url: 'https://nafezly.com/u/ahmed_elaraby', rating: '5.0 / 5.0' },
  { name: 'Khamsat', url: 'https://khamsat.com/user/ahmed_elaraby', rating: 'Top Seller' },
  { name: 'Direct Contract', url: 'mailto:contact@ahmedelaraby.dev', rating: 'Zero Marketplace Fee' },
];

export function EstimatorSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollTo } = useSmoothScroll();
  const [selectedType, setSelectedType] = useState('ecommerce');
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([
    'Awwwards Motion UI',
    'Database & API Architecture',
  ]);
  const [selectedTimeline, setSelectedTimeline] = useState('standard');
  const [copied, setCopied] = useState(false);
  const [egyptTime, setEgyptTime] = useState<string>('');

  // Immediate, snappy GSAP entrance as EstimatorSection enters right after HOW WE WORK
  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section,
        {
          y: 50,
          opacity: 0.3,
        },
        {
          y: 0,
          opacity: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 98%',
            end: 'top 75%',
            scrub: 0.2,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  // Live Cairo Local Time calculation
  useEffect(() => {
    const updateTime = () => {
      try {
        const timeStr = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Africa/Cairo',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }).format(new Date());
        setEgyptTime(`${timeStr} UTC+2 (CAIRO)`);
      } catch {
        setEgyptTime('12:00:00 UTC+2 (CAIRO)');
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const togglePriority = (item: string) => {
    setSelectedPriorities((prev) =>
      prev.includes(item) ? prev.filter((p) => p !== item) : [...prev, item]
    );
  };

  const currentTypeObj = SYSTEM_TYPES.find((t) => t.id === selectedType);
  const currentTimelineObj = TIMELINES.find((t) => t.id === selectedTimeline);

  const briefText = `// CLIENT ARCHITECTURAL SPECIFICATION BRIEF
PROJECT TYPE : ${currentTypeObj?.label}
KEY FOCUS    : ${selectedPriorities.join(', ') || 'End-to-End Architecture'}
EST. TIMELINE: ${currentTimelineObj?.label}
ENGINEER     : Ahmed Elaraby (Full-Stack Creative Engineer)
CONTACT      : contact@ahmedelaraby.dev
STATUS       : READY FOR ARCHITECTURAL AUDIT & SCOPING`;

  const handleCopy = () => {
    navigator.clipboard.writeText(briefText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);

    const subject = encodeURIComponent(`Project Scoping: ${currentTypeObj?.label}`);
    const body = encodeURIComponent(`${briefText}\n\nHi Ahmed,\nI would like to discuss our product requirements...`);
    window.open(`mailto:contact@ahmedelaraby.dev?subject=${subject}&body=${body}`, '_blank');
  };

  return (
    <section
      ref={sectionRef}
      id="estimate"
      data-theme="paper"
      className="min-h-screen w-full px-4 sm:px-8 lg:px-12 py-24 sm:py-32 relative bg-[var(--bg)] text-[var(--fg)] transition-colors duration-500 border-t border-[var(--border)] z-30 shadow-[0_-25px_60px_rgba(0,0,0,0.5)]"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between pb-10 border-b border-[var(--border)] gap-6">
          <div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[var(--fg)] leading-[1.02]">
              Let&apos;s architect your next <span className="font-serif italic font-normal text-[1.1em] text-[var(--accent)]">flagship</span> system.
            </h2>
          </div>

          <div className="text-right">
            <span className="font-mono text-xs text-[var(--accent)] block uppercase tracking-wider">
              SELECTIVE FREELANCE INTAKE
            </span>
            <span className="font-mono text-xs text-[var(--muted)] mt-1 block">
              AVG PROPOSAL TURNAROUND: &lt; 4 HOURS
            </span>
          </div>
        </div>

        {/* 2-Column Layout: Interactive Configurator (Left) + Terminal Brief (Right) */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column (7 cols): Interactive Scope Selector */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Step 1: System Type */}
            <div>
              <span className="text-xs font-mono text-[var(--accent)] font-bold tracking-wider block mb-3 uppercase">
                STEP 01 // SELECT CORE SYSTEM TYPE
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SYSTEM_TYPES.map((type) => {
                  const isSelected = selectedType === type.id;

                  return (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={`relative p-4 rounded-2xl border text-left font-mono transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[var(--fg)] bg-[var(--card)] text-[var(--fg)] shadow-xs'
                          : 'border-[var(--border)] hover:border-[var(--fg)]/40 text-[var(--muted)]'
                      }`}
                    >
                      {isSelected && (
                        <motion.div
                          layoutId="selectedSystemTypePill"
                          className="absolute inset-0 border-2 border-[var(--fg)] rounded-2xl pointer-events-none"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}
                      <span className="text-xs font-bold block text-[var(--fg)] mb-1">
                        {type.label}
                      </span>
                      <span className="text-[10px] text-[var(--muted)]">
                        Est. Delivery: {type.defaultDays}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Key Priorities */}
            <div>
              <span className="text-xs font-mono text-[var(--accent)] font-bold tracking-wider block mb-3 uppercase">
                STEP 02 // KEY ARCHITECTURAL PRIORITIES (MULTI-SELECT)
              </span>
              <div className="flex flex-wrap gap-2 sm:gap-2.5">
                {PRIORITIES.map((priority) => {
                  const isChecked = selectedPriorities.includes(priority);

                  return (
                    <button
                      key={priority}
                      onClick={() => togglePriority(priority)}
                      className={`px-4 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider border transition-all cursor-pointer flex items-center gap-2 ${
                        isChecked
                          ? 'bg-[var(--fg)] text-[var(--bg)] border-[var(--fg)]'
                          : 'bg-white/40 border-[var(--border)] text-[var(--muted)] hover:border-[var(--fg)]/40'
                      }`}
                    >
                      {isChecked ? (
                        <CheckVectorIcon className="w-3.5 h-3.5 text-[var(--bg)]" />
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--muted)]" />
                      )}
                      <span>{priority}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Target Timeline */}
            <div>
              <span className="text-xs font-mono text-[var(--accent)] font-bold tracking-wider block mb-3 uppercase">
                STEP 03 // TARGET TIMELINE SPRINT
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {TIMELINES.map((time) => {
                  const isSelected = selectedTimeline === time.id;

                  return (
                    <button
                      key={time.id}
                      onClick={() => setSelectedTimeline(time.id)}
                      className={`p-3.5 rounded-xl border text-center font-mono text-xs transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[var(--fg)] text-[var(--bg)] border-[var(--fg)] font-bold'
                          : 'bg-white/40 border-[var(--border)] text-[var(--muted)] hover:border-[var(--fg)]/40'
                      }`}
                    >
                      {time.label}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column (5 cols): Live Generated Terminal Brief & Conversion Actions */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-[#0B0B0C] text-[#F4F3EF] border border-[var(--border)] shadow-xl relative overflow-hidden font-mono">
            
            {/* Terminal Header */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs text-[#8E8D8A]">
                <div className="flex items-center gap-2">
                  <PulseTerminalIcon className="w-4 h-4 text-[#FF4D00]" />
                  <span className="text-[#F4F3EF] font-bold">TERMINAL // SCOPING ENGINE</span>
                </div>
                <span className="text-emerald-400 text-[10px]">PARSED // OK</span>
              </div>

              {/* Code Box */}
              <div className="my-6 p-4 rounded-xl bg-black/60 border border-white/10 text-[11px] leading-relaxed text-[#8E8D8A]">
                <pre className="whitespace-pre-wrap font-mono select-all">
                  {briefText}
                </pre>
              </div>
            </div>

            {/* Conversion CTA Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              
              {/* Primary Action Button */}
              <button
                onClick={handleCopy}
                className="w-full py-4 px-6 rounded-full bg-[#FF4D00] hover:bg-[#ff5d1a] text-white font-mono text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg group"
              >
                {copied ? (
                  <>
                    <CheckVectorIcon className="w-4 h-4 text-white" />
                    <span>COPIED BRIEF & OPENING EMAIL</span>
                  </>
                ) : (
                  <>
                    <CopyVectorIcon className="w-4 h-4" />
                    <span>COPY BRIEF & OPEN DIRECT EMAIL</span>
                  </>
                )}
              </button>

              {/* Freelance Marketplace Selector Pills */}
              <div className="pt-2">
                <span className="text-[10px] text-[#8E8D8A] block uppercase mb-2 text-center">
                  OR HIRE DIRECTLY ON PREFERRED PLATFORM:
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {PLATFORMS.map((plat) => (
                    <a
                      key={plat.name}
                      href={plat.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-between transition-colors group cursor-pointer"
                    >
                      <span className="font-bold text-[#F4F3EF]">{plat.name}</span>
                      <span className="text-[10px] text-[#8E8D8A] group-hover:text-[#FF4D00]">
                        {plat.rating}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Architectural Colophon & Egypt Live Time Footer */}
        <div id="contact" className="mt-24 pt-12 border-t border-[var(--border)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 font-mono text-xs text-[var(--muted)]">
          
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <ClockVectorIcon className="w-4 h-4 text-[var(--fg)]" />
              <span>TIME: {egyptTime || 'CAIRO // EEST'}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[var(--fg)] font-medium">AVAILABLE FOR CONTRACTS</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => scrollTo(0, { duration: 1.2 })}
              className="px-4 py-2 rounded-full border border-[var(--border)] text-[var(--fg)] hover:border-[var(--fg)] flex items-center gap-1.5 transition-colors cursor-pointer group"
            >
              <span>BACK TO TOP</span>
              <ArrowUpRightAnimated className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        <div className="mt-8 text-center text-[11px] font-mono text-[var(--muted)]">
          © 2026 AHMED ELARABY. CRAFTED WITH ARCHITECTURAL DISCIPLINE • ZERO TEMPLATES
        </div>

      </div>
    </section>
  );
}
