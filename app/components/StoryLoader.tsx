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

  // Simulated load progress; the glitch/color intensity is driven by this value.
  useEffect(() => {
    if (phase !== "loading") return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(prev + (Math.random() * 3 + 1.5), 100);
        if (next >= 100) {
          clearInterval(interval);
          // Let the color "lock in", then reveal the site.
          setTimeout(() => setPhase("settled"), 260);
          setTimeout(() => setPhase("exiting"), 900);
        }
        return next;
      });
    }, 70);
    return () => clearInterval(interval);
  }, [phase]);

  // Color fades in with load progress; on settle the lime layer locks, cyan drops.
  const intensity = progress / 100;
  const limeOpacity = phase === "settled" ? 1 : 0.85 * intensity;
  const cyanOpacity = phase === "settled" ? 0 : 0.7 * intensity;

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0a0a] overflow-hidden"
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

      <div className="relative z-10 flex flex-col items-center px-6">
        {/* Glitching username = the loading screen */}
        <div
          className={`load-glitch ${phase === "loading" ? "is-loading" : ""}`}
          aria-label="LuC1f3-r"
        >
          <span className="load-glitch__layer load-glitch__base font-[family-name:var(--font-mono)] text-[16vw] font-bold leading-none tracking-tighter md:text-[11vw]">
            LuC1f3-r
          </span>
          <span
            className="load-glitch__layer load-glitch__ghost load-glitch__ghost--cyan font-[family-name:var(--font-mono)] text-[16vw] font-bold leading-none tracking-tighter md:text-[11vw]"
            style={{ opacity: cyanOpacity }}
          >
            LuC1f3-r
          </span>
          <span
            className="load-glitch__layer load-glitch__ghost load-glitch__ghost--lime font-[family-name:var(--font-mono)] text-[16vw] font-bold leading-none tracking-tighter md:text-[11vw]"
            style={{ opacity: limeOpacity }}
          >
            LuC1f3-r
          </span>
        </div>

        {/* Progress readout */}
        <div className="mt-10 flex w-full max-w-[min(80vw,520px)] items-center gap-4 font-[family-name:var(--font-mono)] text-xs text-[#888]">
          <div className="h-px flex-1 bg-[#1a1a1a]">
            <div
              className="h-px bg-[#c8ff00]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="tabular-nums text-[#c8ff00]">
            {String(Math.floor(progress)).padStart(3, "0")}%
          </span>
        </div>
      </div>
    </motion.div>
  );
}
