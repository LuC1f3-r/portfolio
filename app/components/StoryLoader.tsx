"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface StoryLoaderProps {
  onComplete: () => void;
}

const loadingMessages = [
  "Initializing...",
  "Compiling experience...",
  "Loading fragments...",
  "Preparing matrix...",
  "Activating...",
];

export default function StoryLoader({ onComplete }: StoryLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "gate" | "entering">("loading");
  const [currentMessage, setCurrentMessage] = useState(0);
  const [holdProgress, setHoldProgress] = useState(0);
  const holdIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isHoldingRef = useRef(false);

  // Honor reduced-motion: skip to onComplete immediately
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onComplete();
    }
  }, [onComplete]);

  // Loading progress simulation
  useEffect(() => {
    if (phase !== "loading") return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const increment = Math.random() * 3 + 1;
        const next = Math.min(prev + increment, 100);

        // Update message based on progress
        const msgIndex = Math.floor((next / 100) * loadingMessages.length);
        setCurrentMessage(Math.min(msgIndex, loadingMessages.length - 1));

        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => setPhase("gate"), 500);
        }
        return next;
      });
    }, 80);

    return () => clearInterval(interval);
  }, [phase]);

  // Hold to enter logic
  const startHold = () => {
    if (phase !== "gate") return;
    isHoldingRef.current = true;

    holdIntervalRef.current = setInterval(() => {
      if (!isHoldingRef.current) return;

      setHoldProgress((prev) => {
        const next = prev + 2;
        if (next >= 100) {
          if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
          setPhase("entering");
          setTimeout(onComplete, 1200);
          return 100;
        }
        return next;
      });
    }, 20);
  };

  const endHold = () => {
    isHoldingRef.current = false;
    if (holdIntervalRef.current) {
      clearInterval(holdIntervalRef.current);
    }
    // Decay hold progress
    const decay = setInterval(() => {
      setHoldProgress((prev) => {
        if (prev <= 0) {
          clearInterval(decay);
          return 0;
        }
        return prev - 3;
      });
    }, 20);
  };

  return (
    <AnimatePresence>
      {phase !== "entering" || holdProgress < 100 ? (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0a0a] overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{
            clipPath: "circle(0% at 50% 50%)",
            transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] },
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

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Logo / Brand */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12 text-center"
            >
              <h1 className="text-5xl md:text-7xl font-bold text-[#ededed] font-[family-name:var(--font-mono)] tracking-tight">
                LuC1f3-r
              </h1>
              <p className="text-center text-[#888] font-[family-name:var(--font-mono)] text-xs mt-2 tracking-widest uppercase">
                Portfolio v2.0
              </p>
            </motion.div>

            {/* Loading Phase */}
            <AnimatePresence mode="wait">
              {phase === "loading" && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center"
                >
                  {/* Progress bar */}
                  <div className="w-64 md:w-80 h-[2px] bg-[#1a1a1a] overflow-hidden mb-4">
                    <motion.div
                      className="h-full bg-[#c8ff00]"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  {/* Progress text */}
                  <div className="flex items-center gap-4 font-[family-name:var(--font-mono)] text-sm">
                    <span className="text-[#c8ff00]">{Math.floor(progress)}%</span>
                    <span className="text-[#888]">|</span>
                    <motion.span
                      key={currentMessage}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-[#888]"
                    >
                      {loadingMessages[currentMessage]}
                    </motion.span>
                  </div>
                </motion.div>
              )}

              {/* Gate Phase - Click & Hold */}
              {phase === "gate" && (
                <motion.div
                  key="gate"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  className="flex flex-col items-center"
                >
                  {/* Hold button */}
                  <motion.button
                    onMouseDown={startHold}
                    onMouseUp={endHold}
                    onMouseLeave={endHold}
                    onTouchStart={startHold}
                    onTouchEnd={endHold}
                    className="relative w-32 h-32 md:w-40 md:h-40 rounded-full cursor-pointer group"
                    whileTap={{ scale: 0.96 }}
                  >
                    {/* Outer ring */}
                    <svg className="absolute inset-0 w-full h-full -rotate-90">
                      <circle
                        cx="50%"
                        cy="50%"
                        r="48%"
                        fill="none"
                        stroke="rgba(200,255,0,0.15)"
                        strokeWidth="2"
                      />
                      <circle
                        cx="50%"
                        cy="50%"
                        r="48%"
                        fill="none"
                        stroke="#c8ff00"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeDasharray={`${holdProgress * 3.01} 301`}
                        className="transition-all duration-100"
                      />
                    </svg>

                    {/* Inner content */}
                    <div className="absolute inset-4 rounded-full bg-[#0a0a0a] border border-[#1a1a1a] flex items-center justify-center group-hover:border-[#c8ff00]/30 transition-colors">
                      <div className="text-center">
                        <motion.div
                          animate={{ scale: [1, 1.08, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="text-[#c8ff00] text-2xl md:text-3xl mb-1"
                        >
                          ⟡
                        </motion.div>
                        <span className="text-xs text-[#888] font-[family-name:var(--font-mono)]">
                          HOLD
                        </span>
                      </div>
                    </div>
                  </motion.button>

                  {/* Instruction */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-6 text-[#888] text-xs font-[family-name:var(--font-mono)] tracking-widest uppercase"
                  >
                    Click &amp; hold to enter
                  </motion.p>
                </motion.div>
              )}

              {/* Entering Phase */}
              {phase === "entering" && (
                <motion.div
                  key="entering"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center"
                >
                  <motion.p
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-[#c8ff00] font-[family-name:var(--font-mono)] text-sm tracking-widest uppercase"
                  >
                    Entering experience...
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
