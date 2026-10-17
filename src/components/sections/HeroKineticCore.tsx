'use client';

import React, { useEffect, useRef, useState } from 'react';
import { GaugeMeterIcon, ShieldLockIcon, SyncLoopIcon } from '@/components/ui/EditorialIcons';

interface Point3D {
  x: number;
  y: number;
  z: number;
}

export function HeroKineticCore() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [telemetry, setTelemetry] = useState({
    coords: '31.04° N // 30.47° E',
    fps: 60,
    cycle: 1,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = container.clientWidth * window.devicePixelRatio);
    let height = (canvas.height = container.clientHeight * window.devicePixelRatio);

    const handleResize = () => {
      if (!container || !canvas) return;
      width = canvas.width = container.clientWidth * window.devicePixelRatio;
      height = canvas.height = container.clientHeight * window.devicePixelRatio;
    };
    window.addEventListener('resize', handleResize);

    // 3D Geometry: Core Polyhedron Vertices
    const baseVertices: Point3D[] = [
      // Cube vertices
      { x: -1, y: -1, z: -1 },
      { x: 1, y: -1, z: -1 },
      { x: 1, y: 1, z: -1 },
      { x: -1, y: 1, z: -1 },
      { x: -1, y: -1, z: 1 },
      { x: 1, y: -1, z: 1 },
      { x: 1, y: 1, z: 1 },
      { x: -1, y: 1, z: 1 },
      // Octahedron cross vertices
      { x: 0, y: -1.45, z: 0 },
      { x: 0, y: 1.45, z: 0 },
      { x: -1.45, y: 0, z: 0 },
      { x: 1.45, y: 0, z: 0 },
      { x: 0, y: 0, z: -1.45 },
      { x: 0, y: 0, z: 1.45 },
    ];

    const edges: [number, number][] = [
      // Cube edges
      [0, 1], [1, 2], [2, 3], [3, 0],
      [4, 5], [5, 6], [6, 7], [7, 4],
      [0, 4], [1, 5], [2, 6], [3, 7],
      // Octahedron connects to cube vertices
      [8, 0], [8, 1], [8, 4], [8, 5],
      [9, 2], [9, 3], [9, 6], [9, 7],
      [10, 0], [10, 3], [10, 4], [10, 7],
      [11, 1], [11, 2], [11, 5], [11, 6],
      [12, 0], [12, 1], [12, 2], [12, 3],
      [13, 4], [13, 5], [13, 6], [13, 7],
    ];

    // Orbiting Satellites representing Architecture Tiers
    const satellites = [
      { label: 'Next.js App Router', angle: 0, radius: 2.3, speed: 0.012, yOffset: -0.4 },
      { label: 'Python / PySide6', angle: (Math.PI * 2) / 3, radius: 2.1, speed: 0.014, yOffset: 0.3 },
      { label: 'Symbolic AI / SQLite', angle: (Math.PI * 4) / 3, radius: 2.4, speed: 0.01, yOffset: -0.1 },
    ];

    // Mouse tracking for reactive tilt
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let rotX = 0.4;
    let rotY = 0.6;
    let rotZ = 0.2;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      targetRotY = x * 0.8;
      targetRotX = -y * 0.8;
    };
    container.addEventListener('mousemove', onMouseMove);

    let frameCount = 0;
    let lastTime = performance.now();

    const render = (time: number) => {
      // FPS measurement
      frameCount++;
      if (time - lastTime >= 1000) {
        setTelemetry((prev) => ({
          ...prev,
          fps: Math.round((frameCount * 1000) / (time - lastTime)),
          cycle: (prev.cycle + 1) % 100,
        }));
        frameCount = 0;
        lastTime = time;
      }

      ctx.clearRect(0, 0, width, height);

      // Smooth lerp mouse tilt
      rotX += (targetRotX + 0.3 - rotX) * 0.05;
      rotY += (targetRotY + time * 0.0004 - rotY) * 0.05;
      rotZ += 0.001;

      const scale = Math.min(width, height) * 0.22;
      const cx = width / 2;
      const cy = height / 2;

      // 3D rotation matrix calculation
      const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
      const cosZ = Math.cos(rotZ), sinZ = Math.sin(rotZ);

      const project = (p: Point3D): { x: number; y: number; z: number; scale: number } => {
        // Rotate around Z
        let x1 = p.x * cosZ - p.y * sinZ;
        let y1 = p.x * sinZ + p.y * cosZ;
        let z1 = p.z;

        // Rotate around Y
        let x2 = x1 * cosY + z1 * sinY;
        let y2 = y1;
        let z2 = -x1 * sinY + z1 * cosY;

        // Rotate around X
        let x3 = x2;
        let y3 = y2 * cosX - z2 * sinX;
        let z3 = y2 * sinX + z2 * cosX;

        // Perspective projection
        const fov = 4.2;
        const perspective = fov / (fov + z3);
        return {
          x: cx + x3 * scale * perspective,
          y: cy + y3 * scale * perspective,
          z: z3,
          scale: perspective,
        };
      };

      const projectedVertices = baseVertices.map(project);

      // Draw Orbiting Rings
      ctx.save();
      ctx.beginPath();
      ctx.ellipse(cx, cy, scale * 2.2, scale * 1.1, rotY * 0.5, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 77, 0, 0.12)';
      ctx.lineWidth = 1 * window.devicePixelRatio;
      ctx.setLineDash([4 * window.devicePixelRatio, 6 * window.devicePixelRatio]);
      ctx.stroke();
      ctx.restore();

      // Draw Polyhedron Wireframe Edges
      edges.forEach(([i, j]) => {
        const p1 = projectedVertices[i];
        const p2 = projectedVertices[j];
        const avgZ = (p1.z + p2.z) / 2;
        const alpha = Math.max(0.12, Math.min(0.75, (avgZ + 1.8) / 3.6));

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `rgba(255, 77, 0, ${alpha * 0.55})`;
        ctx.lineWidth = (avgZ > 0 ? 1.4 : 0.8) * window.devicePixelRatio;
        ctx.stroke();
      });

      // Draw Core Nodes
      projectedVertices.forEach((p, idx) => {
        const radius = (idx >= 8 ? 3.2 : 2.2) * p.scale * window.devicePixelRatio;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = idx >= 8 ? '#FF4D00' : 'rgba(17, 17, 17, 0.7)';
        ctx.fill();

        if (idx >= 8) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, radius * 2.2, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(255, 77, 0, 0.3)';
          ctx.lineWidth = 1 * window.devicePixelRatio;
          ctx.stroke();
        }
      });

      // Render Orbiting Satellites
      satellites.forEach((sat) => {
        sat.angle += sat.speed;
        const satPos: Point3D = {
          x: Math.cos(sat.angle) * sat.radius,
          y: sat.yOffset + Math.sin(sat.angle * 2) * 0.3,
          z: Math.sin(sat.angle) * sat.radius,
        };
        const proj = project(satPos);

        // Connecting laser to core center
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(proj.x, proj.y);
        ctx.strokeStyle = 'rgba(255, 77, 0, 0.15)';
        ctx.lineWidth = 0.8 * window.devicePixelRatio;
        ctx.stroke();

        // Satellite Node dot
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, 4 * proj.scale * window.devicePixelRatio, 0, Math.PI * 2);
        ctx.fillStyle = '#FF4D00';
        ctx.fill();

        // Satellite Node Label
        ctx.font = `${Math.round(9 * window.devicePixelRatio)}px JetBrains Mono, monospace`;
        ctx.fillStyle = 'rgba(17, 17, 17, 0.75)';
        ctx.fillText(sat.label, proj.x + 8 * window.devicePixelRatio, proj.y + 3 * window.devicePixelRatio);
      });

      if (isVisible) {
        animationId = requestAnimationFrame(render);
      }
    };

    let isVisible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const currentlyVisible = entry.isIntersecting;
          if (currentlyVisible && !isVisible) {
            isVisible = true;
            lastTime = performance.now();
            animationId = requestAnimationFrame(render);
          } else if (!currentlyVisible && isVisible) {
            isVisible = false;
            cancelAnimationFrame(animationId);
          }
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[440px] sm:h-[500px] lg:h-[560px] rounded-3xl bg-[var(--card)] border border-[var(--border)] overflow-hidden flex flex-col justify-between p-6 select-none shadow-xs group"
    >
      {/* Structural Wireframe Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <div className="w-full h-full grid grid-cols-6 grid-rows-6">
          {Array.from({ length: 36 }).map((_, i) => (
            <div key={i} className="border-r border-b border-[var(--border)]" />
          ))}
        </div>
      </div>

      {/* Top Telemetry Header */}
      <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-[var(--muted)]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-ping" />
          <span className="text-[var(--fg)] font-medium">CORE // 3D TOPOLOGY</span>
        </div>
        <div>{telemetry.coords}</div>
      </div>

      {/* Interactive 3D Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* Floating Architectural Glass Badges */}
      <div className="relative z-10 flex flex-col gap-2.5 max-w-[240px] pointer-events-none">
        <div className="backdrop-blur-md bg-[var(--bg)]/80 border border-[var(--border)] px-3 py-2 rounded-xl flex items-center gap-2.5 shadow-xs">
          <GaugeMeterIcon className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
          <div className="text-[10px] font-mono leading-tight">
            <span className="font-bold text-[var(--fg)]">99.8% LIGHTHOUSE</span>
            <span className="block text-[var(--muted)]">Edge-Hydrated Next.js</span>
          </div>
        </div>

        <div className="backdrop-blur-md bg-[var(--bg)]/80 border border-[var(--border)] px-3 py-2 rounded-xl flex items-center gap-2.5 shadow-xs">
          <SyncLoopIcon className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
          <div className="text-[10px] font-mono leading-tight">
            <span className="font-bold text-[var(--fg)]">SUB-50MS SYNC</span>
            <span className="block text-[var(--muted)]">Desktop WAL → Cloud SaaS</span>
          </div>
        </div>

        <div className="backdrop-blur-md bg-[var(--bg)]/80 border border-[var(--border)] px-3 py-2 rounded-xl flex items-center gap-2.5 shadow-xs">
          <ShieldLockIcon className="w-3.5 h-3.5 text-[var(--fg)] shrink-0" />
          <div className="text-[10px] font-mono leading-tight">
            <span className="font-bold text-[var(--fg)]">ANTI-CLICHÉ DESIGN</span>
            <span className="block text-[var(--muted)]">Zero Neon Blue AI Slop</span>
          </div>
        </div>
      </div>

      {/* Bottom Telemetry Footer */}
      <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-[var(--muted)] pt-3 border-t border-[var(--border)]">
        <div>STACK // NEXT.JS • PYTHON • PROLOG</div>
        <div className="flex items-center gap-3">
          <span>FPS: {telemetry.fps}</span>
          <span>CYCLE: {telemetry.cycle < 10 ? `0${telemetry.cycle}` : telemetry.cycle}</span>
        </div>
      </div>
    </div>
  );
}
