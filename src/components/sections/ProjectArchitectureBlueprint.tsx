'use client';

import React from 'react';
import { Project } from '@/data/projects';
import { Database, Laptop, Server, ArrowDown, Cpu } from 'lucide-react';

export function ProjectArchitectureBlueprint({ project }: { project: Project }) {
  const { tier1, tier2, tier3 } = project.architectureBlueprint;

  return (
    <div className="w-full h-full min-h-[300px] bg-[#0E0E10] p-5 sm:p-6 rounded-2xl border border-[#FF4D00]/40 flex flex-col justify-between font-mono relative overflow-hidden select-none">
      {/* Blueprint Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-15">
        <div className="w-full h-full grid grid-cols-4 grid-rows-4 border-b border-white/10">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="border-r border-b border-[#FF4D00]/30" />
          ))}
        </div>
      </div>

      {/* Blueprint Header */}
      <div className="relative z-10 flex items-center justify-between text-[11px] text-[#8E8D8A] border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#FF4D00] animate-pulse" />
          <span className="text-[#F4F3EF] font-bold">SYSTEM BLUEPRINT // 3-TIER SPECIFICATION</span>
        </div>
        <span className="text-[#FF4D00] text-[10px] uppercase">VERIFIED ARCHITECTURE</span>
      </div>

      {/* 3-Tier Blueprint Flow */}
      <div className="relative z-10 py-3 space-y-2.5">
        
        {/* Tier 1: Presentation / Client */}
        <div className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#FF4D00]/50 transition-colors">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-[10px] text-[#FF4D00] font-bold tracking-wider">
              [TIER 01 // PRESENTATION & CLIENT]
            </span>
            <div className="flex items-center gap-1.5 text-[#8E8D8A] text-[10px]">
              <Laptop className="w-3 h-3" />
              <span>{tier1.label}</span>
            </div>
          </div>
          <p className="text-xs text-[#F4F3EF] leading-relaxed font-sans font-medium">
            {tier1.details}
          </p>
        </div>

        {/* Connector 1: Data Contract Pipe */}
        <div className="flex items-center justify-center -my-1">
          <div className="flex items-center gap-2 text-[9px] text-[#8E8D8A] bg-[#141416] px-3 py-0.5 rounded-full border border-white/10 shadow-xs">
            <ArrowDown className="w-2.5 h-2.5 text-[#FF4D00] animate-bounce" />
            <span>ENCRYPTED REST / IPC CONTRACT</span>
            <ArrowDown className="w-2.5 h-2.5 text-[#FF4D00] animate-bounce" />
          </div>
        </div>

        {/* Tier 2: Backend / Sync / Business Logic */}
        <div className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#FF4D00]/50 transition-colors">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-[10px] text-amber-400 font-bold tracking-wider">
              [TIER 02 // LOGIC & TRANSACTION PIPELINE]
            </span>
            <div className="flex items-center gap-1.5 text-[#8E8D8A] text-[10px]">
              <Server className="w-3 h-3" />
              <span>{tier2.label}</span>
            </div>
          </div>
          <p className="text-xs text-[#F4F3EF] leading-relaxed font-sans font-medium">
            {tier2.details}
          </p>
        </div>

        {/* Connector 2: Storage Contract Pipe */}
        <div className="flex items-center justify-center -my-1">
          <div className="flex items-center gap-2 text-[9px] text-[#8E8D8A] bg-[#141416] px-3 py-0.5 rounded-full border border-white/10 shadow-xs">
            <ArrowDown className="w-2.5 h-2.5 text-emerald-400 animate-bounce" />
            <span>TRANSACTIONAL COMMIT / WAL ENGINE</span>
            <ArrowDown className="w-2.5 h-2.5 text-emerald-400 animate-bounce" />
          </div>
        </div>

        {/* Tier 3: Storage / Database / Edge Performance */}
        <div className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#FF4D00]/50 transition-colors">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-[10px] text-emerald-400 font-bold tracking-wider">
              [TIER 03 // STORAGE & EDGE PERSISTENCE]
            </span>
            <div className="flex items-center gap-1.5 text-[#8E8D8A] text-[10px]">
              <Database className="w-3 h-3" />
              <span>{tier3.label}</span>
            </div>
          </div>
          <p className="text-xs text-[#F4F3EF] leading-relaxed font-sans font-medium">
            {tier3.details}
          </p>
        </div>

      </div>

      {/* Blueprint Footer */}
      <div className="relative z-10 flex items-center justify-between text-[10px] text-[#8E8D8A] pt-3 border-t border-white/10">
        <span>SECURITY: ZERO-TRUST</span>
        <span className="text-[#FF4D00]">CONCURRENCY-SAFE DEPLOYMENT</span>
      </div>
    </div>
  );
}
