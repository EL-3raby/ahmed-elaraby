'use client';

import React, { useState } from 'react';
import { Project } from '@/data/projects';
import { CheckVectorIcon, SparkleNodeIcon, SyncLoopIcon, PulseTerminalIcon } from '@/components/ui/EditorialIcons';
import { RefreshCw } from 'lucide-react';

export function ProjectVisualPreview({ project }: { project: Project }) {
  const [scratched, setScratched] = useState(false);
  const [syncCount, setSyncCount] = useState(1482);
  const [isSyncing, setIsSyncing] = useState(false);

  // 1. CENTR: EdTech Voucher Scratch Preview
  if (project.id === 'centr-edtech') {
    return (
      <div className="w-full h-full min-h-[260px] bg-[#141416] p-6 rounded-2xl border border-white/10 flex flex-col justify-between relative overflow-hidden font-mono select-none">
        <div className="flex items-center justify-between text-[11px] text-[#8E8D8A] border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF4D00]" />
            <span>CENTR // VOUCHER ENGINE</span>
          </div>
          <span className="text-emerald-400 text-[10px]">AUTH: SHA-256</span>
        </div>

        <div className="my-auto py-4 flex flex-col items-center justify-center text-center">
          <span className="text-[10px] text-[#8E8D8A] uppercase tracking-wider mb-2">
            Student Access Pass Verification
          </span>

          <div
            onClick={() => setScratched(!scratched)}
            className="w-full max-w-[280px] p-4 rounded-xl border border-dashed border-[#FF4D00]/50 bg-[#1D1D21] cursor-pointer hover:border-[#FF4D00] transition-colors relative group"
          >
            {scratched ? (
              <div className="flex flex-col items-center">
                <span className="text-xs text-emerald-400 font-bold tracking-widest">
                  CENTR-2026-X9F4
                </span>
                <span className="text-[9px] text-[#8E8D8A] mt-1 flex items-center gap-1">
                  <CheckVectorIcon className="w-3 h-3 text-emerald-400" />
                  SINGLE-USE HASH VERIFIED
                </span>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <span className="text-xs text-[#F4F3EF] tracking-wider group-hover:text-[#FF4D00] transition-colors">
                  [ CLICK TO SCRATCH ]
                </span>
                <span className="text-[9px] text-[#8E8D8A] mt-1">
                  Interactive HTML5 Canvas
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between text-[10px] text-[#8E8D8A] pt-3 border-t border-white/10">
          <span>CENTER DIRECTORY: ONLINE</span>
          <span>LATENCY: 18ms</span>
        </div>
      </div>
    );
  }

  // 2. XPower Nutrition: 3D Storefront HUD
  if (project.id === 'xpower-nutrition') {
    return (
      <div className="w-full h-full min-h-[260px] bg-[#141416] p-6 rounded-2xl border border-white/10 flex flex-col justify-between font-mono relative overflow-hidden select-none">
        <div className="flex items-center justify-between text-[11px] text-[#8E8D8A] border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF4D00]" />
            <span>XPOWER // 3D TURNTABLE</span>
          </div>
          <span className="text-[#FF4D00] text-[10px]">LIGHTHOUSE: 99/100</span>
        </div>

        <div className="my-auto py-3 flex items-center justify-around gap-4">
          {/* Wireframe Silhouette */}
          <div className="w-28 h-36 rounded-xl border border-white/15 bg-gradient-to-b from-white/10 to-transparent flex flex-col items-center justify-center relative p-3">
            <div className="w-12 h-4 rounded-t bg-[#FF4D00]/80 mb-1" />
            <div className="w-20 h-24 rounded border border-white/20 flex flex-col items-center justify-center bg-black/40">
              <span className="text-[10px] font-bold text-[#F4F3EF]">WHEY ISO</span>
              <span className="text-[8px] text-[#FF4D00]">100% PURE</span>
            </div>
            <div className="absolute -bottom-2 text-[9px] text-[#8E8D8A] bg-[#141416] px-2 border border-white/10 rounded-full">
              360° RENDER
            </div>
          </div>

          {/* Dynamic Supplement HUD */}
          <div className="text-[11px] space-y-2">
            <div className="p-2 rounded-lg bg-white/5 border border-white/10">
              <span className="text-[10px] text-[#8E8D8A] block">PROTEIN / SERVING</span>
              <span className="text-sm font-bold text-[#F4F3EF]">27.4g</span>
            </div>
            <div className="p-2 rounded-lg bg-white/5 border border-white/10">
              <span className="text-[10px] text-[#8E8D8A] block">BCAA PROFILE</span>
              <span className="text-sm font-bold text-emerald-400">6.8g</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-[10px] text-[#8E8D8A] pt-3 border-t border-white/10">
          <span>OPTIMISTIC CART: SYNCED</span>
          <span>AVIF / WEBP PIPELINE</span>
        </div>
      </div>
    );
  }

  // 3. NYX Clothing: Editorial Lookbook
  if (project.id === 'nyx-clothing') {
    return (
      <div className="w-full h-full min-h-[260px] bg-[#141416] p-6 rounded-2xl border border-white/10 flex flex-col justify-between font-mono relative overflow-hidden select-none">
        <div className="flex items-center justify-between text-[11px] text-[#8E8D8A] border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF4D00]" />
            <span>NYX // LOOKBOOK ENGINE</span>
          </div>
          <span className="text-[#8E8D8A] text-[10px]">SUB-SECOND HYDRATION</span>
        </div>

        <div className="my-auto py-4 flex items-center justify-between gap-4">
          <div className="flex-1">
            <span className="text-[10px] text-[#FF4D00] block mb-1">SS26 DROP // EDITORIAL</span>
            <span className="text-base font-bold text-[#F4F3EF] block">OVERSIZED BOMBER JACKET</span>
            <div className="flex gap-2 mt-3">
              {['S', 'M', 'L', 'XL'].map((s, i) => (
                <span
                  key={s}
                  className={`w-7 h-7 flex items-center justify-center rounded text-xs border ${
                    i === 1 ? 'border-[#FF4D00] text-[#FF4D00] bg-[#FF4D00]/10' : 'border-white/15 text-[#8E8D8A]'
                  }`}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="w-24 h-28 rounded-lg bg-white/5 border border-white/15 flex flex-col items-center justify-center p-2 text-center group">
            <SparkleNodeIcon className="w-6 h-6 text-[#8E8D8A] mb-1" />
            <span className="text-[9px] text-[#8E8D8A] mt-1">SHARED LAYOUT (layoutId)</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-[10px] text-[#8E8D8A] pt-3 border-t border-white/10">
          <span>VARIANT MATRIX: 4x2</span>
          <span>QUICK-ADD DRAWER: READY</span>
        </div>
      </div>
    );
  }

  // 4. Custom Rig: PC Configurator & BOM
  if (project.id === 'custom-rig-artisan') {
    return (
      <div className="w-full h-full min-h-[260px] bg-[#141416] p-6 rounded-2xl border border-white/10 flex flex-col justify-between font-mono relative overflow-hidden select-none">
        <div className="flex items-center justify-between text-[11px] text-[#8E8D8A] border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF4D00]" />
            <span>RIG BUILDER // COMPATIBILITY</span>
          </div>
          <span className="text-emerald-400 text-[10px]">ALL CHECKS PASSED</span>
        </div>

        <div className="my-auto py-3 space-y-2">
          <div className="flex items-center justify-between p-2 rounded bg-white/5 border border-white/10 text-xs">
            <span className="text-[#8E8D8A]">CPU: AMD Ryzen 9 7950X</span>
            <span className="text-emerald-400 text-[10px] flex items-center gap-1">
              AM5 <CheckVectorIcon className="w-3 h-3 text-emerald-400" />
            </span>
          </div>
          <div className="flex items-center justify-between p-2 rounded bg-white/5 border border-white/10 text-xs">
            <span className="text-[#8E8D8A]">GPU: RTX 4090 24GB OC</span>
            <span className="text-emerald-400 text-[10px] flex items-center gap-1">
              340mm <CheckVectorIcon className="w-3 h-3 text-emerald-400" />
            </span>
          </div>
          <div className="flex items-center justify-between p-2 rounded bg-white/5 border border-white/10 text-xs">
            <span className="text-[#8E8D8A]">PSU: 1000W Platinum Modular</span>
            <span className="text-[#FF4D00] text-[10px]">EST: 820W</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-[10px] text-[#8E8D8A] pt-3 border-t border-white/10">
          <span>DYNAMIC PRICING: ACTIVE</span>
          <span>REAL-TIME FORM FACTOR VALIDATION</span>
        </div>
      </div>
    );
  }

  // 5. Cloud-Synced POS & SaaS
  if (project.id === 'pos-cloud-saas') {
    return (
      <div className="w-full h-full min-h-[260px] bg-[#141416] p-6 rounded-2xl border border-white/10 flex flex-col justify-between font-mono relative overflow-hidden select-none">
        <div className="flex items-center justify-between text-[11px] text-[#8E8D8A] border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>HYBRID POS // BI-DIRECTIONAL SYNC</span>
          </div>
          <span className="text-[#FF4D00] text-[10px]">OFFLINE WAL DB</span>
        </div>

        <div className="my-auto py-3">
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <span className="text-[10px] text-[#8E8D8A] block">DESKTOP CASHIER NODE</span>
              <span className="text-xs font-bold text-[#F4F3EF] flex items-center gap-1.5 mt-1">
                <PulseTerminalIcon className="w-3.5 h-3.5 text-[#FF4D00]" />
                PySide6 + SQLite WAL
              </span>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <span className="text-[10px] text-[#8E8D8A] block">CLOUD SAAS HUB</span>
              <span className="text-xs font-bold text-[#F4F3EF] flex items-center gap-1.5 mt-1">
                <SyncLoopIcon className="w-3.5 h-3.5 text-emerald-400" />
                Next.js Real-Time
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#1D1D21] border border-white/10 text-xs">
            <span className="text-[#8E8D8A]">PROCESSED TRANSACTIONS:</span>
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#F4F3EF]">{syncCount}</span>
              <button
                onClick={() => {
                  setIsSyncing(true);
                  setTimeout(() => {
                    setSyncCount((c) => c + 1);
                    setIsSyncing(false);
                  }, 400);
                }}
                className="p-1 rounded bg-white/10 hover:bg-[#FF4D00] text-[#F4F3EF] transition-colors cursor-pointer"
                title="Trigger Manual Delta Sync"
              >
                <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-[10px] text-[#8E8D8A] pt-3 border-t border-white/10">
          <span>DELTA SYNC: 0 CONFLICTS</span>
          <span>LATENCY: 22ms</span>
        </div>
      </div>
    );
  }

  // 6. Mizan Legal ERP
  if (project.id === 'mizan-legal-erp') {
    return (
      <div className="w-full h-full min-h-[260px] bg-[#141416] p-6 rounded-2xl border border-white/10 flex flex-col justify-between font-mono relative overflow-hidden select-none">
        <div className="flex items-center justify-between text-[11px] text-[#8E8D8A] border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF4D00]" />
            <span>MIZAN (ميزان) // LEGAL SUITE</span>
          </div>
          <span className="text-emerald-400 text-[10px]">AES-256 ENCRYPTED</span>
        </div>

        <div className="my-auto py-3 space-y-2">
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-bold text-[#F4F3EF]">CASE #2024-C781 // APPEALS COURT</span>
              <span className="text-[10px] text-[#FF4D00] border border-[#FF4D00]/40 px-1.5 py-0.5 rounded">
                HEARING IN 48H
              </span>
            </div>
            <span className="text-[10px] text-[#8E8D8A] block">
              Commercial Arbitration & Contract Enforceability
            </span>
          </div>

          <div className="flex items-center justify-between text-[11px] p-2 rounded bg-white/5 border border-white/10">
            <span className="text-[#8E8D8A]">ARABIC CASE ARCHIVES:</span>
            <span className="text-[#F4F3EF]">4,290 INDEXED DOCS</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-[10px] text-[#8E8D8A] pt-3 border-t border-white/10">
          <span>AUTOMATED COURT REMINDER: ARMED</span>
          <span>MVVM DESKTOP ARCHITECTURE</span>
        </div>
      </div>
    );
  }

  // 7. NeuroLogic Prolog Engine
  if (project.id === 'neurologic-prolog') {
    return (
      <div className="w-full h-full min-h-[260px] bg-[#141416] p-6 rounded-2xl border border-white/10 flex flex-col justify-between font-mono relative overflow-hidden select-none">
        <div className="flex items-center justify-between text-[11px] text-[#8E8D8A] border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF4D00]" />
            <span>NEUROLOGIC // PROLOG INFERENCE</span>
          </div>
          <span className="text-[#FF4D00] text-[10px]">SWI-PROLOG HTTP</span>
        </div>

        <div className="my-auto py-3">
          <div className="p-3 rounded-xl bg-black/60 border border-white/10 mb-2">
            <div className="text-[10px] text-[#8E8D8A] mb-1">QUERY ENGINE:</div>
            <div className="text-xs text-emerald-400 font-bold">
              ?- solve_minimax(State, 4, BestMove).
            </div>
            <div className="text-[10px] text-[#8E8D8A] mt-1">
              Alpha-Beta Pruning: 1,840 branch cuts
            </div>
          </div>

          <div className="flex items-center justify-between text-xs p-2 rounded bg-white/5 border border-white/10">
            <span className="text-[#8E8D8A]">PREDICATE BACKTRACKING:</span>
            <span className="text-[#FF4D00] font-bold">STATELESS REST JSON</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-[10px] text-[#8E8D8A] pt-3 border-t border-white/10">
          <span>GAME TREE DEPTH: 8-PLY</span>
          <span>CONSTRAINT ENGINE: ACTIVE</span>
        </div>
      </div>
    );
  }

  // 8. RevPulse Sales Intelligence
  return (
    <div className="w-full h-full min-h-[260px] bg-[#141416] p-6 rounded-2xl border border-white/10 flex flex-col justify-between font-mono relative overflow-hidden select-none">
      <div className="flex items-center justify-between text-[11px] text-[#8E8D8A] border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#FF4D00]" />
          <span>REVPULSE // PREDICTIVE ML</span>
        </div>
        <span className="text-emerald-400 text-[10px]">SCIKIT-LEARN + PANDAS</span>
      </div>

      <div className="my-auto py-3">
        <div className="flex items-end justify-between h-20 px-2 pt-4 border-b border-white/15 gap-2">
          {[35, 48, 62, 54, 75, 82, 95].map((val, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div
                style={{ height: `${val}%` }}
                className={`w-full rounded-t transition-all ${
                  i === 6 ? 'bg-[#FF4D00]' : 'bg-white/20'
                }`}
              />
              <span className="text-[8px] text-[#8E8D8A]">W{i + 1}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between text-xs mt-3">
          <span className="text-[#8E8D8A]">Q3 REVENUE FORECAST:</span>
          <span className="text-emerald-400 font-bold">+28.4% SURGE PREDICTED</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-[10px] text-[#8E8D8A] pt-3 border-t border-white/10">
        <span>ANOMALY DETECTION: CALIBRATED</span>
        <span>AUTOMATED ETL PIPELINE</span>
      </div>
    </div>
  );
}
