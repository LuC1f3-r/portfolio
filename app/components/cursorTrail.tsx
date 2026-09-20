'use client';

import { useEffect, useRef, useState } from 'react';

export default function CursorTrail() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Disable on touch devices or when reduced-motion is set
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isCoarse || reducedMotion) return;

    setEnabled(true);

    const move = (e: MouseEvent) => {
      const dot = dotRef.current;
      const ring = ringRef.current;

      if (dot) {
        dot.animate(
          { left: `${e.clientX}px`, top: `${e.clientY}px` },
          { duration: 80, fill: 'forwards' }
        );
      }
      if (ring) {
        ring.animate(
          { left: `${e.clientX}px`, top: `${e.clientY}px` },
          { duration: 220, fill: 'forwards' }
        );
      }
    };

    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  if (!enabled) return null;

  return (
    <>
      {/* Lime dot */}
      <div
        ref={dotRef}
        className="fixed w-2 h-2 rounded-full pointer-events-none z-[9999] bg-[#c8ff00]"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      {/* Trailing ring */}
      <div
        ref={ringRef}
        className="fixed w-7 h-7 rounded-full pointer-events-none z-[9998] border border-[#c8ff00]/40"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
    </>
  );
}
