"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const [open, setOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const cvRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Gate all motion behind reduced-motion check
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Set final fully-visible state immediately
      if (titleRef.current) gsap.set(titleRef.current, { y: 0, opacity: 1 });
      if (bodyRef.current) gsap.set(bodyRef.current, { y: 0, opacity: 1 });
      if (cvRef.current) gsap.set(cvRef.current, { y: 0, opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      // Title reveal
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Body text reveal
      if (bodyRef.current) {
        gsap.fromTo(
          bodyRef.current,
          { y: 48, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            delay: 0.18,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 65%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // CV control reveal
      if (cvRef.current) {
        gsap.fromTo(
          cvRef.current,
          { y: 32, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: 0.32,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 60%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, section);

    return () => {
      // ctx.revert() handles only this section's triggers — never
      // getAll().kill(), which would nuke every other section on remount.
      ctx.revert();
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!cvRef.current?.contains(target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <section
      ref={sectionRef}
      className="w-full py-24 px-6 bg-[#0a0a0a] overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Mono kicker */}
        <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-[#888] mb-8">
          About
        </p>

        {/* Section heading */}
        <h2
          ref={titleRef}
          className="font-[family-name:var(--font-display)] text-[#ededed] text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight mb-12 max-w-[18ch]"
        >
          The engineer behind the work.
        </h2>

        {/* Editorial bio */}
        <div
          ref={bodyRef}
          className="max-w-[62ch] space-y-6"
        >
          <p className="font-[family-name:var(--font-body)] text-[#ededed] text-lg sm:text-xl leading-[1.75]">
            Results-driven Backend Engineer with 3 years of experience building
            scalable production APIs and{" "}
            <strong className="text-[#c8ff00] font-semibold">
              event-driven microservices
            </strong>{" "}
            using Node.js, NestJS, and{" "}
            <strong className="text-[#c8ff00] font-semibold">AWS</strong>.
            Currently leading backend architecture on a B2C platform scaled to{" "}
            <strong className="text-[#c8ff00] font-semibold">
              10,000+ daily transactions
            </strong>
            ; specialist in TypeScript,{" "}
            <strong className="font-semibold text-[#ededed]">
              AWS serverless
            </strong>
            , Kafka-based event flows, and distributed authentication systems.
          </p>

          <p className="font-[family-name:var(--font-body)] text-[#888] text-base sm:text-lg leading-[1.75]">
            Systems that hold under pressure are the ones worth building. That
            conviction shapes every architectural decision I make.
          </p>
        </div>

        {/* Download CV */}
        <div ref={cvRef} className="relative mt-12 inline-block">
          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-haspopup="listbox"
            className="inline-flex items-center gap-3 border border-[#c8ff00] px-6 py-3 font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.18em] text-[#c8ff00] transition-colors duration-200 hover:bg-[#c8ff00] hover:text-[#0a0a0a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8ff00]"
          >
            Download CV
            <span
              className="transition-transform duration-200"
              style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
              aria-hidden
            >
              ↓
            </span>
          </button>

          {/* Dropdown */}
          {open && (
            <div
              role="listbox"
              className="absolute left-0 mt-2 w-52 bg-[#111] border border-[#333] z-50"
            >
              <a
                href="/assets/niyazahamadherkal-dark.pdf"
                download
                role="option"
                aria-selected={false}
                className="flex items-center gap-3 w-full px-5 py-3 font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.14em] text-[#ededed] hover:bg-[#1a1a1a] hover:text-[#c8ff00] transition-colors duration-150"
                onClick={() => setOpen(false)}
              >
                <span className="w-2 h-2 bg-[#0a0a0a] border border-[#555] inline-block shrink-0" />
                Dark theme
              </a>
              <a
                href="/assets/niyazahamadherkal-light.pdf"
                download
                role="option"
                aria-selected={false}
                className="flex items-center gap-3 w-full px-5 py-3 font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.14em] text-[#ededed] hover:bg-[#1a1a1a] hover:text-[#c8ff00] transition-colors duration-150 border-t border-[#222]"
                onClick={() => setOpen(false)}
              >
                <span className="w-2 h-2 bg-[#ededed] border border-[#555] inline-block shrink-0" />
                Light theme
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
