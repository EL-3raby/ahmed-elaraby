'use client';

import React from 'react';
import Timeline from '@/components/ui/timeline';

export function WorkflowSection() {
  return (
    <section
      id="process"
      data-theme="obsidian"
      className="relative z-10 w-full bg-[#0B0B0C] text-[var(--fg)] transition-colors duration-500"
    >
      <Timeline />
    </section>
  );
}
