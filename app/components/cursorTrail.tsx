'use client';

import { useEffect, useRef } from 'react';

export default function CursorTrail() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      const dot = dotRef.current;
      if (!dot) return;

      dot.animate(
        {
          left: `${e.clientX}px`,
          top: `${e.clientY}px`,
        },
        { duration: 300, fill: 'forwards' }
      );
    };

    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <div
      ref={dotRef}
      className="fixed w-4 h-4 rounded-full pointer-events-none z-[9999] bg-purple-500 blur-sm opacity-70 mix-blend-lighten"
      style={{
        transform: 'translate(-50%, -50%)',
      }}
    />
  );
}
