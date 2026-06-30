"use client";

import { useEffect, useRef, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SectionTransitionProps {
  children: ReactNode;
  id: string;
  className?: string;
  transitionType?: "fade" | "slideUp" | "maskReveal" | "diagonalWipe" | "scaleIn";
  bgColor?: string;
}

export default function SectionTransition({
  children,
  id,
  className = "",
  transitionType = "fade",
  bgColor,
}: SectionTransitionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const section = sectionRef.current;
    const content = contentRef.current;

    // Create scroll trigger animations based on type
    let animation: gsap.core.Timeline;

    switch (transitionType) {
      case "maskReveal":
        gsap.set(content, { clipPath: "inset(100% 0% 0% 0%)" });
        animation = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 20%",
            scrub: 1,
          },
        });
        animation.to(content, {
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "power2.out",
        });
        break;

      case "diagonalWipe":
        gsap.set(content, { 
          clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
          opacity: 0.5,
        });
        animation = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            end: "top 30%",
            scrub: 1,
          },
        });
        animation.to(content, {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
          opacity: 1,
          ease: "power3.out",
        });
        break;

      case "slideUp":
        gsap.set(content, { y: 100, opacity: 0 });
        animation = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 40%",
            scrub: 1,
          },
        });
        animation.to(content, {
          y: 0,
          opacity: 1,
          ease: "power2.out",
        });
        break;

      case "scaleIn":
        gsap.set(content, { scale: 0.8, opacity: 0 });
        animation = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 40%",
            scrub: 1,
          },
        });
        animation.to(content, {
          scale: 1,
          opacity: 1,
          ease: "power2.out",
        });
        break;

      case "fade":
      default:
        gsap.set(content, { opacity: 0, y: 50 });
        animation = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 50%",
            scrub: 1,
          },
        });
        animation.to(content, {
          opacity: 1,
          y: 0,
          ease: "power2.out",
        });
        break;
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === section) {
          trigger.kill();
        }
      });
    };
  }, [transitionType]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`relative min-h-screen w-full ${className}`}
      style={{ backgroundColor: bgColor }}
    >
      <div ref={contentRef} className="w-full h-full">
        {children}
      </div>
    </section>
  );
}

// Parallax component for layered backgrounds
interface ParallaxLayerProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export function ParallaxLayer({ children, speed = 0.5, className = "" }: ParallaxLayerProps) {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!layerRef.current) return;

    gsap.to(layerRef.current, {
      yPercent: -100 * speed,
      ease: "none",
      scrollTrigger: {
        trigger: layerRef.current.parentElement,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === layerRef.current?.parentElement) {
          trigger.kill();
        }
      });
    };
  }, [speed]);

  return (
    <div ref={layerRef} className={className}>
      {children}
    </div>
  );
}

// Stagger animation for list items
interface StaggerRevealProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggerReveal({ children, className = "", staggerDelay = 0.1 }: StaggerRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const items = containerRef.current.children;

    gsap.set(items, { y: 50, opacity: 0 });

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 80%",
      onEnter: () => {
        gsap.to(items, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: staggerDelay,
          ease: "power3.out",
        });
      },
      once: true,
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === containerRef.current) {
          trigger.kill();
        }
      });
    };
  }, [staggerDelay]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

// Text reveal animation (character by character)
interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export function TextReveal({ text, className = "", delay = 0 }: TextRevealProps) {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const chars = textRef.current.querySelectorAll(".char");
    
    gsap.set(chars, { y: 100, opacity: 0 });

    ScrollTrigger.create({
      trigger: textRef.current,
      start: "top 85%",
      onEnter: () => {
        gsap.to(chars, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.02,
          delay,
          ease: "power3.out",
        });
      },
      once: true,
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === textRef.current) {
          trigger.kill();
        }
      });
    };
  }, [delay]);

  return (
    <span ref={textRef} className={`overflow-hidden inline-block ${className}`}>
      {text.split("").map((char, i) => (
        <span key={i} className="char inline-block" style={{ display: char === " " ? "inline" : "inline-block" }}>
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}
