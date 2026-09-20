"use client";

import { useEffect, useRef, ReactNode } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SmoothScrollProps {
  children: ReactNode;
}

let globalLenis: Lenis | null = null;

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis with snappy, high-performance settings
    const lenis = new Lenis({
      lerp: 0.1, // Snappy linear interpolation (feels fast, responsive & fluid)
      wheelMultiplier: 1.15, // Responsive wheel speed without sluggish drag
      smoothWheel: true,
      syncTouch: false, // Keep native 120Hz hardware scrolling on touch/mobile
      orientation: "vertical",
      gestureOrientation: "vertical",
    });

    lenisRef.current = lenis;
    globalLenis = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    // Smooth over occasional frame drops instead of hard freezing (lagSmoothing 0 caused stutter)
    gsap.ticker.lagSmoothing(500, 33);

    // Cleanup
    return () => {
      lenis.destroy();
      globalLenis = null;
      gsap.ticker.remove(updateTicker);
    };
  }, []);

  return <>{children}</>;
}

// Export hook for scrollTo functionality using Lenis directly
export function useLenis() {
  return {
    scrollTo: (target: string | number, options?: { offset?: number; duration?: number }) => {
      if (globalLenis) {
        globalLenis.scrollTo(target, {
          offset: options?.offset || 0,
          duration: options?.duration ?? 1.0,
        });
      } else if (typeof window !== "undefined") {
        const element = typeof target === "string" ? document.querySelector(target) : null;
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        } else if (typeof target === "number") {
          window.scrollTo({ top: target, behavior: "smooth" });
        }
      }
    },
  };
}
