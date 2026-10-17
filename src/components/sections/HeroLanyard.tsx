'use client';

import React, { useState, useEffect } from 'react';
import { Lanyard } from '@/components/ui/Lanyard';

export function HeroLanyard() {
  const [anchor, setAnchor] = useState<number>(0.75);
  const [cardSize, setCardSize] = useState<number>(0.52);
  const [strapLength, setStrapLength] = useState<number>(0.22);

  useEffect(() => {
    const updateMetrics = () => {
      if (typeof window === 'undefined') return;
      const w = window.innerWidth;
      if (w >= 1024) {
        // Exact horizontal center of the right 5 columns on desktop
        const containerW = Math.min(w, 1280);
        const margin = (w - containerW) / 2;
        const targetCenter = margin + containerW * (9.5 / 12);
        setAnchor(targetCenter / w);
        setCardSize(0.52);
        setStrapLength(0.22);
      } else if (w >= 640) {
        setAnchor(0.5);
        setCardSize(0.54);
        setStrapLength(0.35);
      } else {
        // On mobile: Prominent, large, visible card centered below headline
        setAnchor(0.5);
        setCardSize(0.52);
        setStrapLength(0.64);
      }
    };

    updateMetrics();
    window.addEventListener('resize', updateMetrics);
    return () => window.removeEventListener('resize', updateMetrics);
  }, []);

  return (
    <div className="w-full h-full relative select-none overflow-visible pointer-events-none">
      <Lanyard
        frontImage="/card-front.png"
        backImage="/card-back.png"
        strapImage="/band.png"
        strapColor="#f97316"
        cardColor="#000000"
        anchor={anchor}
        size={cardSize}
        strapLength={strapLength}
        strapWidth={0.65}
        gravity={0.9}
        breeze={0.35}
        intro={false}
      />
    </div>
  );
}

export default HeroLanyard;
