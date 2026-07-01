"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const metrics = [
  { value: "3", suffix: "", label: "years coding" },
  { value: "7", suffix: "", label: "projects shipped" },
  { value: "10,000", suffix: "+", label: "daily booking transactions" },
  { value: "60", suffix: "%", label: "fewer redundant auth transactions" },
  { value: "20", suffix: "%", label: "lower inter-service latency" },
];

export default function Impact() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      itemRefs.current.forEach((el) => {
        if (el) gsap.set(el, { opacity: 1, y: 0 });
      });
      return;
    }

    const ctx = gsap.context(() => {
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            delay: i * 0.08,
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              once: true,
            },
          }
        );
      });
    }, section);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#0a0a0a] px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1400px]">
        {/* Kicker */}
        <p className="mb-16 font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-[#888]">
          By the numbers
        </p>

        {/* Metrics grid */}
        <div className="grid grid-cols-2 gap-0 md:grid-cols-5">
          {metrics.map(({ value, suffix, label }, i) => (
            <div
              key={label}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              className={`py-10 pr-8 opacity-0 ${
                i !== 0
                  ? "border-l border-[#1a1a1a] pl-8"
                  : ""
              } ${
                // On mobile (2-col grid), add top border to items in row 2+
                i >= 2 ? "col-span-1 border-t border-[#1a1a1a] md:border-t-0 pt-10 md:pt-10" : ""
              }`}
            >
              {/* Numeral */}
              <p className="font-[family-name:var(--font-display)] text-[clamp(3rem,6vw,5.5rem)] font-bold leading-none tracking-tight text-[#ededed]">
                {value}
                <span className="text-[#c8ff00]">{suffix}</span>
              </p>
              {/* Caption */}
              <p className="mt-4 font-[family-name:var(--font-mono)] text-xs text-[#888] leading-relaxed">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
