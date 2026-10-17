'use client';

import React, { useMemo, useState, useEffect, useRef } from 'react';
import { PROJECTS, Project } from '@/data/projects';
import { WorksWheel, type WorksWheelItem, type WorksWheelHandle } from '@/components/ui/works-wheel';
import { ProjectArchitectureBlueprint } from './ProjectArchitectureBlueprint';
import { ProjectVisualPreview } from './ProjectVisualPreview';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Eye, Layers } from 'lucide-react';
import { ArchitectureIcon, ArrowUpRightAnimated } from '@/components/ui/EditorialIcons';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';
import { useSmoothScroll } from '@/components/providers/SmoothScrollProvider';
import { AdmitOneTicket } from '@/components/ui/admit-one-ticket';

// Top 4 Flagship Full-Stack Projects
const FEATURED_FULLSTACK_IDS = [
  'centr-edtech',
  'xpower-nutrition',
  'nyx-clothing',
  'pos-cloud-saas',
];

// Curated skills dataset for the incoming transition stage (Balanced 11 skills per card)
const SKILL_CATEGORIES = [
  {
    tag: '[01 // WEB & SAAS]',
    title: 'Full-Stack & Cloud Architecture',
    skills: [
      'Next.js App Router',
      'TypeScript',
      'Tailwind CSS',
      'React 19',
      'Node.js Edge APIs',
      'REST & GraphQL',
      'PostgreSQL / SQLite',
      'Normalized Schema',
      'High-Conversion UI',
      'Sub-second Hydration',
      'Docker & CI/CD',
    ],
    initialCount: 6,
  },
  {
    tag: '[02 // 3D & MOTION]',
    title: 'Creative Motion & WebGL 3D',
    skills: [
      'Three.js',
      'WebGL Shaders',
      'GSAP ScrollTrigger',
      'Framer Motion',
      'Lenis Smooth Scroll',
      'HTML5 Canvas',
      '3D Product Renders',
      'Awwwards Physics',
      'Verlet Simulation',
      'Kinetic Typography',
      'Split-Text Animations',
    ],
    initialCount: 6,
  },
  {
    tag: '[03 // DESKTOP & AI]',
    title: 'Desktop ERP & Logic Systems',
    skills: [
      'Python PySide6',
      'C# WPF (MVVM)',
      'SQLite WAL Engine',
      'Real-Time Cloud Sync',
      'SWI-Prolog HTTP',
      'Scikit-Learn Regression',
      'Pandas ETL Pipeline',
      'Offline-First Architecture',
      'Encrypted Local Storage',
      'Automated DB Snapshots',
      'Anomaly Detection ML',
    ],
    initialCount: 6,
  },
];

// Tailored generative shader presets matching the portfolio's Obsidian & Warm Amber/Orange design system
const TICKET_TEXTURES = [
  {
    engine: "generative" as const,
    colorBack: "#ef671c",
    colorFront: "#ffc691",
    colorHighlight: "#fe9046",
    shape: "warp",
    type: "random",
    size: 0.5,
    colorSteps: 4,
    originalColors: true,
    scale: 1,
    rotation: 0,
    offsetX: 0,
    offsetY: 0,
    speed: 0,
  },
  {
    engine: "generative" as const,
    colorBack: "#f05a18",
    colorFront: "#ffd4a8",
    colorHighlight: "#ff914d",
    shape: "swirl",
    type: "4x4",
    size: 1.0,
    colorSteps: 4,
    originalColors: true,
    scale: 1.1,
    rotation: 15,
    offsetX: 0,
    offsetY: 0,
    speed: 0,
  },
  {
    engine: "generative" as const,
    colorBack: "#d94a08",
    colorFront: "#ffe2c6",
    colorHighlight: "#f57c36",
    shape: "swirl",
    type: "4x4",
    size: 1.0,
    colorSteps: 4,
    originalColors: true,
    scale: 1.1,
    rotation: -25,
    offsetX: 0,
    offsetY: 0,
    speed: 0,
  },
];

export function WorksSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [blueprintMode, setBlueprintMode] = useState<'blueprint' | 'preview'>('blueprint');
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const stageContentRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const wheelStageRef = useRef<HTMLDivElement>(null);
  const moreBtnRef = useRef<HTMLDivElement>(null);
  const worksWheelRef = useRef<WorksWheelHandle>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const transitionPanelRef = useRef<HTMLDivElement>(null);
  
  // Refs for sequential scroll cards
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);

  const { scrollTo } = useSmoothScroll();

  // Responsive ticket sizing
  const [ticketWidth, setTicketWidth] = useState(640);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 440) {
        setTicketWidth(Math.min(340, w - 32));
      } else if (w < 640) {
        setTicketWidth(Math.min(460, w - 48));
      } else if (w < 840) {
        setTicketWidth(540);
      } else {
        setTicketWidth(640);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Filter only the 4 flagship Full-Stack projects
  const fullStackProjects = useMemo(() => {
    return PROJECTS.filter((p) => FEATURED_FULLSTACK_IDS.includes(p.id));
  }, []);

  const activeProject = fullStackProjects[activeCardIndex] || fullStackProjects[0];

  // Map to clean WorksWheelItems showing only the name and image
  const wheelItems: WorksWheelItem[] = useMemo(() => {
    return fullStackProjects.map((p) => ({
      id: p.id,
      title: p.title,
      image: p.image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop',
      href: p.liveUrl || 'https://github.com/AhmedElaraby',
      category: p.category,
      categoryLabel: p.categoryLabel,
      tagline: p.tagline,
      impactMetric: p.impactMetric,
      stack: p.stack,
      year: p.year,
      role: p.role,
    }));
  }, [fullStackProjects]);

  // GSAP ScrollTrigger Sequence:
  // 1. As Section 2 rises over Hero, the entire stage elevates with 3D perspective, scale, and focus pull.
  // 2. "Latest work." and the left editorial panel smoothly emerge into place.
  // 3. At top:0, the section pins seamlessly.
  // 4. Continued scroll smoothly reveals the 3D desktop monitor card and rotates through all 4 flagship builds.
  // 5. At the end, the compact "MORE PROJECTS" pill button appears.
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Cinematic 3D Perspective Lift & Focus Entrance as Section 2 ascends over Hero
      if (stageContentRef.current) {
        gsap.fromTo(
          stageContentRef.current,
          {
            yPercent: 12,
            scale: 0.93,
            rotateX: 4,
            filter: 'blur(12px)',
            opacity: 0.6,
            transformOrigin: '50% 100%',
          },
          {
            yPercent: 0,
            scale: 1,
            rotateX: 0,
            filter: 'blur(0px)',
            opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'top top',
              scrub: 0.6,
            },
          }
        );
      }

      // 2. Entrance reveal for the monumental title as section enters viewport
      // 2. Entrance reveal for the monumental left-aligned title as section enters viewport
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          {
            x: -60,
            yPercent: 100,
            rotateZ: -2,
            opacity: 0,
            filter: 'blur(12px)',
          },
          {
            x: 0,
            yPercent: 0,
            rotateZ: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 1.1,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // 3. Entrance reveal for the left editorial panel
      if (leftPanelRef.current) {
        gsap.fromTo(
          leftPanelRef.current,
          {
            x: -45,
            opacity: 0,
            filter: 'blur(10px)',
          },
          {
            x: 0,
            opacity: 1,
            filter: 'blur(0px)',
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              end: 'top 20%',
              scrub: 0.5,
            },
          }
        );
      }

      // 4. Pinned timeline: First scroll reveals Card 01 under the title, then turns through all cards
      const turnProxy = { val: 1 };

      const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;

      const pinnedTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: isMobile ? '+=1800' : '+=5800',
          pin: pinContainerRef.current,
          anticipatePin: 1,
          scrub: 0.4,
        },
      });

      // Initially hide the cards stage until user scrolls a bit
      gsap.set(wheelStageRef.current, {
        opacity: 0,
        y: 60,
        scale: 0.94,
      });

      // Initially hide the MORE PROJECTS button until last card is reached
      gsap.set(moreBtnRef.current, {
        opacity: 0,
        y: 25,
        scale: 0.95,
        pointerEvents: 'none',
      });

      // Initially position the next section lateral transition panel offscreen to the right
      if (transitionPanelRef.current) {
        gsap.set(transitionPanelRef.current, {
          xPercent: 100,
          pointerEvents: 'none',
        });
      }

      // Initially position the 3 sequential skill cards with explicit zIndex and hidden states
      if (card1Ref.current && card2Ref.current && card3Ref.current) {
        gsap.set(card1Ref.current, {
          xPercent: 0,
          y: 80,
          opacity: 0,
          scale: 0.94,
          filter: 'blur(0px)',
          pointerEvents: 'none',
          zIndex: 30,
        });
        gsap.set(card2Ref.current, {
          xPercent: 120,
          y: 0,
          opacity: 0,
          scale: 0.92,
          filter: 'blur(8px)',
          pointerEvents: 'none',
          zIndex: 20,
        });
        gsap.set(card3Ref.current, {
          xPercent: 120,
          y: 0,
          opacity: 0,
          scale: 0.92,
          filter: 'blur(8px)',
          pointerEvents: 'none',
          zIndex: 10,
        });
      }

      // Phase 1: Scroll a bit to smoothly reveal the first card under Latest work
      pinnedTl.to(wheelStageRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: 'power2.out',
      });

      // Phase 2: Continue scrolling to cycle through all 4 flagship production builds
      pinnedTl.to(turnProxy, {
        val: fullStackProjects.length, // 4
        duration: 4.8,
        ease: 'none',
        onUpdate: () => {
          worksWheelRef.current?.setTurn(turnProxy.val);
        },
      });

      // Phase 3: Reveal MORE PROJECTS button after scrolling through the last card!
      pinnedTl.to(moreBtnRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        pointerEvents: 'auto',
        duration: 0.8,
        ease: 'power2.out',
      });

      // Phase 4: Lateral Scroll Transition (Brings in the skills section from the right)
      if (transitionPanelRef.current && stageContentRef.current) {
        pinnedTl.to(
          transitionPanelRef.current,
          {
            xPercent: 0,
            pointerEvents: 'auto',
            duration: 2.0,
            ease: 'power2.inOut',
          },
          '+=0.15'
        );

        pinnedTl.to(
          stageContentRef.current,
          {
            xPercent: -35,
            scale: 0.94,
            opacity: 0.25,
            filter: 'blur(10px)',
            duration: 2.0,
            ease: 'power2.inOut',
          },
          '<'
        );

        // Explicitly set baseline states at timeline scrub point (cards waiting hidden)
        pinnedTl.set(card1Ref.current, { xPercent: 0, y: 80, opacity: 0, scale: 0.94, filter: 'blur(0px)', zIndex: 30, pointerEvents: 'none' }, '<');
        pinnedTl.set(card2Ref.current, { xPercent: 120, y: 0, opacity: 0, scale: 0.92, filter: 'blur(8px)', zIndex: 20, pointerEvents: 'none' }, '<');
        pinnedTl.set(card3Ref.current, { xPercent: 120, y: 0, opacity: 0, scale: 0.92, filter: 'blur(8px)', zIndex: 10, pointerEvents: 'none' }, '<');

        // Stage 1: Spotlight on the section title alone ("Technical Mastery.") first
        pinnedTl.to({}, { duration: 0.7 });

        // Stage 2: After user scrolls past the title, Card 01 smoothly reveals from bottom into view
        pinnedTl.to(card1Ref.current, {
          y: 0,
          opacity: 1,
          scale: 1,
          pointerEvents: 'auto',
          duration: 1.1,
          ease: 'power2.out',
        });

        // Hold on Card 01 (Full-Stack & Cloud Architecture) for comfortable reading
        pinnedTl.to({}, { duration: 0.7 });

        // Phase 5: Transition from Card 01 -> Card 02
        pinnedTl.to(card1Ref.current, {
          xPercent: -120,
          opacity: 0,
          scale: 0.92,
          filter: 'blur(8px)',
          pointerEvents: 'none',
          duration: 1.1,
          ease: 'power2.inOut',
        });

        pinnedTl.to(
          card2Ref.current,
          {
            xPercent: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
            pointerEvents: 'auto',
            zIndex: 35,
            duration: 1.1,
            ease: 'power2.inOut',
          },
          '<'
        );

        // Hold on Card 02 (Creative Motion & WebGL 3D) for comfortable reading
        pinnedTl.to({}, { duration: 0.7 });

        // Phase 6: Transition from Card 02 -> Card 03
        pinnedTl.to(card2Ref.current, {
          xPercent: -120,
          opacity: 0,
          scale: 0.92,
          filter: 'blur(8px)',
          pointerEvents: 'none',
          duration: 1.1,
          ease: 'power2.inOut',
        });

        pinnedTl.to(
          card3Ref.current,
          {
            xPercent: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
            pointerEvents: 'auto',
            zIndex: 40,
            duration: 1.1,
            ease: 'power2.inOut',
          },
          '<'
        );

        // Hold on Card 03 (Desktop ERP & Logic Systems) before unpinning
        pinnedTl.to({}, { duration: 0.9 });
      }

      scrollTriggerRef.current = pinnedTl.scrollTrigger || null;
    }, sectionRef);

    return () => ctx.revert();
  }, [fullStackProjects.length]);

  const handleOpenProject = (item: { id?: string }) => {
    const proj = fullStackProjects.find((p) => p.id === item.id);
    if (proj) {
      setSelectedProject(proj);
      setBlueprintMode('blueprint');
    }
  };

  return (
    <section
      ref={sectionRef}
      id="works"
      data-theme="obsidian"
      className="relative z-20 w-full bg-[#0B0B0C] text-[var(--fg)] transition-colors duration-500"
    >
      {/* Pinned Viewport Container */}
      <div
        ref={pinContainerRef}
        className="h-screen w-full flex flex-col justify-between pt-16 sm:pt-12 pb-5 px-4 sm:px-8 lg:px-12 overflow-hidden relative"
      >

        {/* Inner Stage Wrapper with 3D Perspective Lift Entrance */}
        <div
          ref={stageContentRef}
          className="w-full h-full flex flex-col justify-between will-change-transform [perspective:1200px]"
        >
          {/* Top Header - Exact match with HOW WE WORK font style */}
          <div className="max-w-7xl mx-auto w-full flex items-center justify-start pb-2 shrink-0 z-20">
            <div className="overflow-hidden py-2">
              <h2
                ref={titleRef}
                className="font-anton uppercase tracking-[-0.01em] text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-[#D1D1D1] leading-[0.88] select-none will-change-transform"
                style={{ fontFamily: 'var(--font-anton), Impact, sans-serif' }}
              >
                LATEST <span style={{ color: 'var(--accent, #FF4D00)' }}>WORK.</span>
              </h2>
            </div>
          </div>

          {/* 3D Wheel Stage with Split Editorial Layout (matching Images 1 & 2) */}
          <div
            ref={wheelStageRef}
            className="flex-1 w-full max-w-[1440px] mx-auto relative min-h-0 pt-2 will-change-transform"
          >
            {/* Left Editorial Info Panel (matching Image 1) */}
            <div
              ref={leftPanelRef}
              className="absolute top-0 bottom-0 left-0 w-full sm:w-[45%] lg:w-[32%] flex flex-col justify-between py-2 sm:py-4 z-20 pointer-events-none will-change-transform"
            >
              {/* Top Block: Giant Number + Project Tracker List */}
              <div>
                {/* Giant Number Watermark (e.g. 02.) */}
                <div className="font-display font-black text-6xl sm:text-7xl lg:text-[8.5rem] text-white/15 leading-none select-none tracking-tight">
                  0{activeCardIndex + 1}.
                </div>

                {/* Minimal Project List (- CENTR, — XPower Nutrition, etc.) */}
                <div className="flex flex-col gap-2 mt-3 sm:mt-4 pointer-events-auto">
                  {fullStackProjects.map((p, idx) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        worksWheelRef.current?.setTurn(idx + 1);
                        setActiveCardIndex(idx);
                      }}
                      className={cn(
                        "flex items-center gap-2.5 text-left font-mono text-xs sm:text-sm tracking-wide transition-all cursor-pointer group",
                        idx === activeCardIndex
                          ? "text-white font-bold translate-x-1"
                          : "text-white/35 hover:text-white/80"
                      )}
                    >
                      <span className={idx === activeCardIndex ? "text-[var(--accent)] font-bold" : "opacity-40"}>
                        {idx === activeCardIndex ? '—' : '-'}
                      </span>
                      <span className="group-hover:underline">{p.title.split('—')[0].trim()}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Bottom Block: Big Title & Tagline Subtitle (matching Image 1 Bima layout) */}
              <div className="pointer-events-auto pb-2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeProject.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  >
                    <h3 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-none drop-shadow-sm">
                      {activeProject.title.split('—')[0].trim()}
                    </h3>
                    <p className="font-sans text-sm sm:text-base text-[#8E8D8A] leading-relaxed max-w-md mt-3 font-normal">
                      {activeProject.tagline}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* 3D Wheel: Desktop Monitor (Right / Center) */}
            <WorksWheel
              ref={worksWheelRef}
              items={wheelItems}
              onActiveChange={setActiveCardIndex}
              onItemClick={handleOpenProject}
              className="size-full"
            />
          </div>

          {/* Bottom Bar: MORE PROJECTS Pill Button (reveals after last card scroll) */}
          <div
            ref={moreBtnRef}
            className="max-w-[1440px] mx-auto w-full pt-2 shrink-0 z-20 flex justify-center will-change-transform"
          >
            <button
              onClick={() => setIsArchiveOpen(true)}
              className="w-auto min-w-[220px] sm:min-w-[260px] max-w-xs py-2 sm:py-2.5 px-8 rounded-full border border-white/20 bg-transparent hover:bg-[#333333] hover:border-white/30 transition-all duration-300 flex items-center justify-center cursor-pointer group shadow-lg"
            >
              <span className="font-mono text-xs font-bold tracking-widest text-[var(--accent)] uppercase transition-transform group-hover:scale-[1.03]">
                MORE PROJECTS
              </span>
            </button>
          </div>
        </div>

        {/* Lateral Transition Stage: Pinned Sequential Scroll for Technical Arsenal (01 -> 02 -> 03) */}
        <div
          ref={transitionPanelRef}
          className="absolute inset-0 z-30 w-full h-full bg-[#0B0B0C] shadow-[-30px_0_60px_rgba(0,0,0,0.85)] flex flex-col justify-between pt-16 sm:pt-12 pb-5 px-4 sm:px-8 lg:px-12 will-change-transform overflow-hidden"
        >
          {/* Top Header - Exact match with HOW WE WORK font style */}
          <div className="max-w-7xl mx-auto w-full flex items-center justify-start pb-2 shrink-0 z-20">
            <div className="overflow-hidden py-2">
              <h2
                className="font-anton uppercase tracking-[-0.01em] text-3xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl text-[#D1D1D1] leading-[0.88] select-none"
                style={{ fontFamily: 'var(--font-anton), Impact, sans-serif' }}
              >
                TECHNICAL <span style={{ color: 'var(--accent, #FF4D00)' }}>MASTERY.</span>
              </h2>
            </div>
          </div>

          {/* Sequential Scroll Stage with 3 Stacked Cards */}
          <div className="flex-1 w-full max-w-7xl mx-auto relative min-h-0 flex items-center justify-center">
            {/* Pinned Stage: 3 Stacked Admit-One Skill Tickets with GSAP Scrub Transition */}
            <div className="relative w-full h-[375px] sm:h-[400px] flex items-center justify-center overflow-visible">
              {/* Card 01: Web & SaaS Ticket */}
              <div
                ref={card1Ref}
                className="absolute inset-0 w-full h-full flex items-center justify-center will-change-transform z-30 pointer-events-none"
              >
                <AdmitOneTicket
                  width={ticketWidth}
                  tilt={false}
                  name="Full-Stack & Cloud Architecture"
                  venue="NEXT.JS · EDGE RUNTIME · CLOUD"
                  dates="2026 ARCHITECTURE"
                  stubText="ENGINEERING"
                  watermark="01"
                  texture={TICKET_TEXTURES[0]}
                  skills={SKILL_CATEGORIES[0].skills}
                />
              </div>

              {/* Card 02: 3D & Motion Ticket */}
              <div
                ref={card2Ref}
                className="absolute inset-0 w-full h-full flex items-center justify-center will-change-transform z-20 pointer-events-none"
              >
                <AdmitOneTicket
                  width={ticketWidth}
                  tilt={false}
                  name="Creative Motion & WebGL 3D"
                  venue="THREE.JS · WEBGL · SHADERS"
                  dates="60FPS HARDWARE ACCEL"
                  stubText="CREATIVE"
                  watermark="02"
                  texture={TICKET_TEXTURES[1]}
                  skills={SKILL_CATEGORIES[1].skills}
                />
              </div>

              {/* Card 03: Desktop & AI Ticket */}
              <div
                ref={card3Ref}
                className="absolute inset-0 w-full h-full flex items-center justify-center will-change-transform z-10 pointer-events-none"
              >
                <AdmitOneTicket
                  width={ticketWidth}
                  tilt={false}
                  name="Desktop ERP & Logic Systems"
                  venue="PYSIDE6 · C# WPF · PROLOG"
                  dates="OFFLINE-FIRST WAL"
                  stubText="ENTERPRISE"
                  watermark="03"
                  texture={TICKET_TEXTURES[2]}
                  skills={SKILL_CATEGORIES[2].skills}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Full-Stack Architecture Modal on Card Click */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.45, bounce: 0.15 }}
              className="relative z-10 w-full max-w-4xl bg-[#121214] border border-[#FF4D00]/30 rounded-3xl p-6 sm:p-8 shadow-2xl text-[var(--fg)] overflow-hidden max-h-[90vh] flex flex-col"
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 shrink-0">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] animate-pulse" />
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-[var(--muted)]">
                      <span className="text-[var(--accent)] font-bold">[{selectedProject.year || '2024'}]</span>
                      <span>•</span>
                      <span className="uppercase text-white/90">FULL-STACK SYSTEM</span>
                    </div>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-white mt-0.5">
                      {selectedProject.title}
                    </h3>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Tagline & Mode Switcher */}
              <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
                <p className="text-xs sm:text-sm text-[#8E8D8A] font-sans max-w-lg">
                  {selectedProject.tagline}
                </p>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setBlueprintMode('blueprint')}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-all ${
                      blueprintMode === 'blueprint'
                        ? 'bg-[#FF4D00] text-white shadow-sm'
                        : 'bg-white/5 hover:bg-white/10 text-white/70 border border-white/10'
                    }`}
                  >
                    <ArchitectureIcon className="w-3.5 h-3.5" />
                    <span>3-Tier Blueprint</span>
                  </button>

                  <button
                    onClick={() => setBlueprintMode('preview')}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-all ${
                      blueprintMode === 'preview'
                        ? 'bg-[#FF4D00] text-white shadow-sm'
                        : 'bg-white/5 hover:bg-white/10 text-white/70 border border-white/10'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Visual Prototype</span>
                  </button>
                </div>
              </div>

              {/* Scrollable Stage Content */}
              <div className="flex-1 overflow-y-auto pr-1 my-2">
                <AnimatePresence mode="wait">
                  {blueprintMode === 'blueprint' ? (
                    <motion.div
                      key="blueprint-modal"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                    >
                      <ProjectArchitectureBlueprint project={selectedProject} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="preview-modal"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                    >
                      <ProjectVisualPreview project={selectedProject} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Modal Footer */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shrink-0">
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded text-[11px] font-mono bg-white/5 border border-white/10 text-[#8E8D8A]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => {
                    setSelectedProject(null);
                    const contactEl = document.querySelector('#contact');
                    if (contactEl) {
                      contactEl.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="px-5 py-2.5 rounded-full bg-[var(--accent)] text-white font-mono text-xs uppercase tracking-wider font-bold hover:brightness-110 transition-all inline-flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <span>Build Similar Full-Stack Platform</span>
                  <ArrowUpRightAnimated className="w-3.5 h-3.5" />
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Comprehensive Archive Modal for MORE PROJECTS */}
      <AnimatePresence>
        {isArchiveOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsArchiveOpen(false)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
            />

            {/* Archive Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.45, bounce: 0.15 }}
              className="relative z-10 w-full max-w-5xl bg-[#121214] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl text-[var(--fg)] overflow-hidden max-h-[88vh] flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-5 border-b border-white/10 shrink-0">
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] font-bold">
                    [ ARCHIVE // ALL 08 PRODUCTION BUILDS ]
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
                    Complete Engineering Index
                  </h3>
                </div>

                <button
                  onClick={() => setIsArchiveOpen(false)}
                  className="p-2.5 rounded-full border border-white/15 text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Projects List */}
              <div className="overflow-y-auto pr-1 mt-4 space-y-3 flex-1 custom-scrollbar">
                {PROJECTS.map((proj, idx) => (
                  <div
                    key={proj.id}
                    className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/25 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
                  >
                    <div className="flex items-start gap-4">
                      <span className="font-mono text-xs sm:text-sm text-[var(--accent)] font-bold mt-0.5">
                        0{idx + 1}
                      </span>
                      <div>
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <h4 className="font-display text-base sm:text-lg font-bold text-white group-hover:text-[var(--accent)] transition-colors">
                            {proj.title}
                          </h4>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/50">
                            {proj.categoryLabel}
                          </span>
                        </div>
                        <p className="font-sans text-xs sm:text-sm text-white/60 mt-1 max-w-2xl leading-relaxed">
                          {proj.tagline}
                        </p>
                        <div className="flex flex-wrap gap-1.5 mt-2.5">
                          {proj.stack.slice(0, 5).map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 border border-white/10 text-white/50"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-center">
                      <button
                        onClick={() => {
                          setIsArchiveOpen(false);
                          handleOpenProject(proj);
                        }}
                        className="px-3.5 py-1.5 rounded-full border border-[var(--accent)]/50 text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white transition-all font-mono text-xs uppercase tracking-wider font-semibold cursor-pointer"
                      >
                        Blueprint
                      </button>
                      {proj.liveUrl && (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-black transition-all font-mono text-xs uppercase tracking-wider font-semibold cursor-pointer inline-flex items-center gap-1"
                        >
                          <span>Live ↗</span>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default WorksSection;
