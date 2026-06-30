"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface StoryLoaderProps {
  onComplete: () => void;
}

const loadingMessages = [
  "Initializing neural interface...",
  "Compiling experience nodes...",
  "Loading visual fragments...",
  "Preparing story matrix...",
  "Activating immersive mode...",
];

export default function StoryLoader({ onComplete }: StoryLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "gate" | "entering">("loading");
  const [currentMessage, setCurrentMessage] = useState(0);
  const [holdProgress, setHoldProgress] = useState(0);
  const holdIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isHoldingRef = useRef(false);

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
          setTimeout(onComplete, 1500);
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
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ 
            clipPath: "circle(0% at 50% 50%)",
            transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] }
          }}
        >
          {/* Animated background grid */}
          <div className="absolute inset-0 opacity-10">
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px',
                animation: 'gridMove 20s linear infinite',
              }}
            />
          </div>

          {/* Floating particles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-purple-500 rounded-full"
                initial={{
                  x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                  y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                  opacity: 0,
                }}
                animate={{
                  y: [null, -100],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Logo / Brand */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600">
                LuC1f3-r
              </h1>
              <p className="text-center text-zinc-500 font-mono text-sm mt-2">
                PORTFOLIO v2.0
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
                  <div className="w-64 md:w-80 h-1 bg-zinc-800 rounded-full overflow-hidden mb-4">
                    <motion.div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  
                  {/* Progress text */}
                  <div className="flex items-center gap-4 font-mono text-sm">
                    <span className="text-purple-400">{Math.floor(progress)}%</span>
                    <span className="text-zinc-500">|</span>
                    <motion.span
                      key={currentMessage}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-zinc-400"
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
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
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
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Outer ring */}
                    <svg className="absolute inset-0 w-full h-full -rotate-90">
                      <circle
                        cx="50%"
                        cy="50%"
                        r="48%"
                        fill="none"
                        stroke="rgba(139, 92, 246, 0.2)"
                        strokeWidth="2"
                      />
                      <circle
                        cx="50%"
                        cy="50%"
                        r="48%"
                        fill="none"
                        stroke="url(#gradient)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeDasharray={`${holdProgress * 3.01} 301`}
                        className="transition-all duration-100"
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#a855f7" />
                          <stop offset="100%" stopColor="#ec4899" />
                        </linearGradient>
                      </defs>
                    </svg>

                    {/* Inner content */}
                    <div className="absolute inset-4 rounded-full bg-zinc-900 border border-purple-500/30 flex items-center justify-center group-hover:border-purple-500/60 transition-colors">
                      <div className="text-center">
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="text-purple-400 text-2xl md:text-3xl mb-1"
                        >
                          ⟡
                        </motion.div>
                        <span className="text-xs text-zinc-400 font-mono">HOLD</span>
                      </div>
                    </div>
                  </motion.button>

                  {/* Instruction */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-6 text-zinc-500 text-sm font-mono"
                  >
                    CLICK & HOLD TO ENTER
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
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-purple-400 font-mono text-lg"
                  >
                    ENTERING EXPERIENCE...
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Scan lines overlay */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-5"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
            }}
          />

          <style jsx>{`
            @keyframes gridMove {
              0% { transform: translate(0, 0); }
              100% { transform: translate(50px, 50px); }
            }
          `}</style>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
