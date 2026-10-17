'use client';

import React, { useState } from 'react';
import {
  ArchitectureIcon,
  GaugeMeterIcon,
  SyncLoopIcon,
  ShieldLockIcon,
  LayersStackIcon,
  CpuChipIcon,
  DatabaseNodeIcon,
  CheckVectorIcon,
  SparkleNodeIcon,
  ArrowDownAnimated,
} from '@/components/ui/EditorialIcons';
import { useSmoothScroll } from '@/components/providers/SmoothScrollProvider';

export function ValueSection() {
  const { scrollTo } = useSmoothScroll();
  const [activeTierNode, setActiveTierNode] = useState<'frontend' | 'backend' | 'database'>('backend');

  return (
    <section
      id="capabilities"
      data-theme="stone"
      className="min-h-screen w-full px-4 sm:px-8 lg:px-12 py-24 sm:py-32 border-b border-[var(--border)] relative bg-[var(--bg)] text-[var(--fg)] transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between pb-10 border-b border-[var(--border)] gap-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] sm:text-xs uppercase tracking-widest text-[var(--muted)] mb-4">
              <span className="inline-block w-2 h-2 rounded-full bg-[var(--fg)]" />
              <span>[03 // ARCHITECTURAL VALUE PROPOSITION]</span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[var(--fg)] leading-[1.02]">
              Engineered for <span className="font-serif italic font-normal text-[1.1em]">business</span> authority & conversion speed.
            </h2>
          </div>

          <div className="text-right">
            <span className="font-mono text-xs text-[var(--fg)] font-bold block uppercase tracking-wider">
              HIGH-TICKET FREELANCE ARCHITECT
            </span>
            <span className="font-mono text-xs text-[var(--muted)] mt-1 block">
              ZERO AGENCY HANDOFF FRICTION
            </span>
          </div>
        </div>

        {/* 21st.dev-Style Asymmetric Bento Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          
          {/* Card 01: (7 cols on lg) — End-to-End Full-Stack Ownership */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--fg)]/40 transition-all duration-300 flex flex-col justify-between group shadow-xs">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[var(--border)] text-xs font-mono text-[var(--muted)]">
                <span className="font-bold text-[var(--fg)]">[01 // FULL-STACK OWNERSHIP]</span>
                <span>SINGLE-DEVELOPER VELOCITY</span>
              </div>

              <div className="mt-6">
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[var(--fg)]">
                  The End of Agency Overhead & Tech Handoff Friction.
                </h3>
                <p className="mt-3 text-sm sm:text-base text-[var(--muted)] font-sans leading-relaxed">
                  Traditional agencies divide your project across 4 disconnected specialists. I personally engineer the entire pipeline — from pixel-perfect Next.js motion to transactional SQLite WAL databases and symbolic AI.
                </p>
              </div>

              {/* Interactive Vector Node Pipeline */}
              <div className="mt-8 p-6 rounded-2xl bg-black/[0.04] border border-[var(--border)]">
                <div className="text-[10px] font-mono text-[var(--muted)] uppercase tracking-wider mb-4 flex items-center justify-between">
                  <span>Interactive Pipeline Topology</span>
                  <span className="text-[var(--fg)] font-medium">CLICK A NODE TO INSPECT CONTRACT</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Node 1: Frontend */}
                  <div
                    onClick={() => setActiveTierNode('frontend')}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      activeTierNode === 'frontend'
                        ? 'bg-[var(--fg)] text-[var(--bg)] border-[var(--fg)] shadow-sm'
                        : 'bg-white/40 border-[var(--border)] hover:border-[var(--fg)]/30 text-[var(--fg)]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono tracking-wider uppercase font-bold">
                        01 // FRONTEND
                      </span>
                      <LayersStackIcon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-bold font-mono block">Next.js App Router</span>
                    <span className="text-[10px] opacity-75 font-sans block mt-0.5">GSAP • Lenis • 3D Canvas</span>
                  </div>

                  {/* Node 2: Backend */}
                  <div
                    onClick={() => setActiveTierNode('backend')}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      activeTierNode === 'backend'
                        ? 'bg-[var(--fg)] text-[var(--bg)] border-[var(--fg)] shadow-sm'
                        : 'bg-white/40 border-[var(--border)] hover:border-[var(--fg)]/30 text-[var(--fg)]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono tracking-wider uppercase font-bold">
                        02 // LOGIC CORE
                      </span>
                      <CpuChipIcon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-bold font-mono block">Node • Python • C#</span>
                    <span className="text-[10px] opacity-75 font-sans block mt-0.5">REST APIs • Prolog AI</span>
                  </div>

                  {/* Node 3: Database */}
                  <div
                    onClick={() => setActiveTierNode('database')}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      activeTierNode === 'database'
                        ? 'bg-[var(--fg)] text-[var(--bg)] border-[var(--fg)] shadow-sm'
                        : 'bg-white/40 border-[var(--border)] hover:border-[var(--fg)]/30 text-[var(--fg)]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono tracking-wider uppercase font-bold">
                        03 // DATA LAYER
                      </span>
                      <DatabaseNodeIcon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-bold font-mono block">Relational & SQLite</span>
                    <span className="text-[10px] opacity-75 font-sans block mt-0.5">Offline WAL • Delta Sync</span>
                  </div>
                </div>

                {/* Dynamic Node Details Display */}
                <div className="mt-4 pt-4 border-t border-[var(--border)] text-xs font-mono text-[var(--muted)] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckVectorIcon className="w-3.5 h-3.5 text-[var(--fg)]" />
                    <span>
                      {activeTierNode === 'frontend' && 'SSR hydration + zero layout shift on mobile viewports.'}
                      {activeTierNode === 'backend' && 'Stateless API bridges with strict cryptographic token rate-limiting.'}
                      {activeTierNode === 'database' && 'Atomic ACID transactions guaranteed offline with automatic cloud retry queue.'}
                    </span>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-[var(--fg)]">ZERO-DRIFT</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[var(--border)] flex items-center justify-between text-xs font-mono text-[var(--muted)]">
              <span>ESTIMATED VELOCITY: 2.8X FASTER THAN TEAMS</span>
              <span className="text-[var(--fg)] font-bold">100% ACCOUNTABILITY</span>
            </div>
          </div>

          {/* Right Column (5 cols on lg) with 2 Stacked Bento Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6 lg:gap-8">
            
            {/* Card 02: 99.8% Lighthouse & Sub-Second Speed */}
            <div className="p-8 rounded-3xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--fg)]/40 transition-all duration-300 flex flex-col justify-between group shadow-xs">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[var(--border)] text-xs font-mono text-[var(--muted)]">
                  <span className="font-bold text-[var(--fg)]">[02 // PERFORMANCE]</span>
                  <GaugeMeterIcon className="w-4 h-4 text-[var(--fg)]" />
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--fg)] mt-4">
                  Locked 60FPS Animations With 99+ Lighthouse Scores.
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[var(--muted)] font-sans leading-relaxed">
                  Heavy visuals shouldn&apos;t hurt your Google rankings or conversion rate. My custom WebP/AVIF asset pipelines and GSAP ticker sync guarantee sub-second page loads.
                </p>

                {/* Visual Telemetry Bars */}
                <div className="mt-6 space-y-2.5 font-mono text-xs">
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-[var(--muted)]">LIGHTHOUSE PERFORMANCE</span>
                      <span className="font-bold text-[var(--fg)]">99 / 100</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-black/10 overflow-hidden">
                      <div className="h-full bg-[var(--fg)] w-[99%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-[var(--muted)]">FIRST CONTENTFUL PAINT (FCP)</span>
                      <span className="font-bold text-[var(--fg)]">0.42s</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-black/10 overflow-hidden">
                      <div className="h-full bg-[var(--fg)] w-[92%]" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[var(--border)] text-[11px] font-mono text-[var(--muted)]">
                BUILT-IN EDGE CACHING & CODE SPLITTING
              </div>
            </div>

            {/* Card 03: Hybrid Cloud & Offline-First Mastery */}
            <div className="p-8 rounded-3xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--fg)]/40 transition-all duration-300 flex flex-col justify-between group shadow-xs">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[var(--border)] text-xs font-mono text-[var(--muted)]">
                  <span className="font-bold text-[var(--fg)]">[03 // HYBRID RESILIENCE]</span>
                  <SyncLoopIcon className="w-4 h-4 text-[var(--fg)]" />
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--fg)] mt-4">
                  Offline Desktop Speed Meets Real-Time Cloud SaaS.
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[var(--muted)] font-sans leading-relaxed">
                  Cashiers and factory floors cannot pause when internet drops. I build offline-first desktop nodes (PySide6 / WPF) that operate with zero lag and reconcile conflicts automatically upon reconnecting.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[var(--border)] flex items-center justify-between text-xs font-mono text-[var(--muted)]">
                <span className="flex items-center gap-1.5">
                  <CheckVectorIcon className="w-3.5 h-3.5 text-[var(--fg)]" />
                  <span>BI-DIRECTIONAL DELTA SYNC</span>
                </span>
                <span className="text-[var(--fg)] font-bold">WAL ENGINE</span>
              </div>
            </div>

          </div>

          {/* Card 04: (Full-Width 12 cols) — Production Security & Scalable Schemas */}
          <div className="lg:col-span-12 p-8 sm:p-10 rounded-3xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--fg)]/40 transition-all duration-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 group shadow-xs">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-mono text-[var(--fg)] font-bold mb-3 uppercase tracking-wider">
                <ShieldLockIcon className="w-4 h-4" />
                <span>[04 // ENTERPRISE ARCHITECTURAL INTEGRITY]</span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--fg)]">
                Relational Schemas Built to Scale Without Structural Refactors.
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[var(--muted)] font-sans leading-relaxed">
                Normalized database schemas, parameterized SQL defense, role-based access control (RBAC), and strict type validation across both backend and frontend layers.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <div className="px-3.5 py-2 rounded-xl bg-white/40 border border-[var(--border)] font-mono text-xs flex items-center gap-2">
                <CheckVectorIcon className="w-3.5 h-3.5 text-[var(--fg)]" />
                <span>Zero SQL Injection</span>
              </div>
              <div className="px-3.5 py-2 rounded-xl bg-white/40 border border-[var(--border)] font-mono text-xs flex items-center gap-2">
                <CheckVectorIcon className="w-3.5 h-3.5 text-[var(--fg)]" />
                <span>Encrypted Backups</span>
              </div>
              <div className="px-3.5 py-2 rounded-xl bg-white/40 border border-[var(--border)] font-mono text-xs flex items-center gap-2">
                <CheckVectorIcon className="w-3.5 h-3.5 text-[var(--fg)]" />
                <span>Strict REST Contracts</span>
              </div>
            </div>
          </div>

        </div>

        {/* Section Footer Scroll Cue */}
        <div className="mt-16 flex justify-between items-center text-xs font-mono text-[var(--muted)]">
          <div>VALUE DELIVERY MODEL: ARCHITECTURAL EXCELLENCE</div>
          <button
            onClick={() => scrollTo('#process', { offset: 0 })}
            className="flex items-center gap-2 text-[var(--fg)] hover:underline cursor-pointer group"
          >
            <span>SCROLL TO OBSIDIAN WORKFLOW</span>
            <ArrowDownAnimated className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
}
