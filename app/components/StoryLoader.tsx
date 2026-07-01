"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface StoryLoaderProps {
  onComplete: () => void;
}

export default function StoryLoader({ onComplete }: StoryLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "settled" | "exiting">(
    "loading"
  );

  // Honor reduced-motion: skip the whole loader.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onComplete();
    }
  }, [onComplete]);

  // Simulated load progress (~4.5s). The color wipe across the name tracks this.
  useEffect(() => {
    if (phase !== "loading") return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(prev + (Math.random() * 1.3 + 0.9), 100);
        if (next >= 100) {
          clearInterval(interval);
          // Let the color "lock in", then reveal the site.
          setTimeout(() => setPhase("settled"), 320);
          setTimeout(() => setPhase("exiting"), 1000);
        }
        return next;
      });
    }, 75);
    return () => clearInterval(interval);
  }, [phase]);

  // Color fills the word left→right by load progress; cyan drops on settle.
  const revealClip = `inset(0 ${100 - progress}% 0 0)`;
  const cyanOpacity = phase === "settled" ? 0 : 1;

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0a0a] overflow-hidden"
      initial={{ opacity: 1 }}
      animate={
        phase === "exiting"
          ? { clipPath: "circle(0% at 50% 50%)" }
          : { clipPath: "circle(150% at 50% 50%)" }
      }
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => {
        if (phase === "exiting") onComplete();
      }}
    >
      {/* Subtle scan lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.05) 2px, rgba(255,255,255,0.05) 4px)",
        }}
      />

      {/* The glitching username IS the loading screen */}
      <div
        className={`load-glitch relative z-10 px-6 ${
          phase === "loading" ? "is-loading" : ""
        }`}
        aria-label="LuC1f3-r"
      >
        <span className="load-glitch__layer load-glitch__base font-[family-name:var(--font-mono)] text-[16vw] font-bold leading-none tracking-tighter md:text-[11vw]">
          LuC1f3-r
        </span>

        {/* Colored copies revealed left→right by progress */}
        <div className="load-glitch__reveal" style={{ clipPath: revealClip }}>
          <span
            className="load-glitch__layer load-glitch__ghost--cyan font-[family-name:var(--font-mono)] text-[16vw] font-bold leading-none tracking-tighter md:text-[11vw]"
            style={{ opacity: cyanOpacity }}
          >
            LuC1f3-r
          </span>
          <span className="load-glitch__layer load-glitch__ghost--lime font-[family-name:var(--font-mono)] text-[16vw] font-bold leading-none tracking-tighter md:text-[11vw]">
            LuC1f3-r
          </span>
        </div>
      </div>
    </motion.div>
  );
}
