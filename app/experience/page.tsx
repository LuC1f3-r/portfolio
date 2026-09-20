"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const experiences = [
  {
    id: 1,
    startYear: "2024",
    company: "CodeHaste",
    role: "Software Engineer",
    years: "2024 - Present",
    isCurrent: true,
    description:
      "Building scalable microservices in NestJS, integrating AWS Cognito for secure auth, leading end-to-end product work, and hardening CI/CD and testing to 95% coverage with Jest.",
  },
  {
    id: 2,
    startYear: "2023",
    company: "Zluri",
    role: "Software Development Engineer",
    years: "2023 · 7 months",
    isCurrent: false,
    description:
      "Engineered backend features for high-traffic integrations (Monday.com, JumpCloud, Azure, JFrog, GitBook), cutting latency and downtime while raising reliability and security.",
  },
  {
    id: 3,
    startYear: "2022",
    company: "BTrees Technologies",
    role: "Backend Developer Intern",
    years: "2022 · 5 months",
    isCurrent: false,
    description:
      "Led 3 developers to ship a dynamic web app for an educational institution, lifting engagement 30% and cutting page load time 40%.",
  },
];

const TRANSITION =
  "transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]";

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Scroll progress across the tall section drives which role is spotlighted.
  // The visual is pinned with native CSS `sticky` (robust under Lenis); GSAP
  // only reads progress — no pin-spacer, no global kills.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reduced) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const idx = Math.min(
            experiences.length - 1,
            Math.floor(self.progress * experiences.length)
          );
          if (idx !== activeRef.current) {
            activeRef.current = idx;
            setActive(idx);
          }
        },
      });
    }, section);

    return () => ctx.revert();
  }, [reduced]);

  // --- Reduced motion: plain stacked timeline. ---
  if (reduced) {
    return (
      <section className="w-full bg-[#0b0a09] px-6 py-24">
        <div className="mx-auto max-w-[1000px]">
          <p className="mb-8 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.3em] text-[#888]">
            Experience
          </p>
          <h2 className="mb-14 font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight text-[#ededed] md:text-5xl">
            Where I&apos;ve built things.
          </h2>
          <div className="border-t border-[#1e1e1e]">
            {experiences.map((exp) => (
              <div
                key={exp.id}
                className="grid grid-cols-[7rem_1fr] gap-6 border-b border-[#1e1e1e] py-8"
              >
                <span className="font-[family-name:var(--font-mono)] text-xs text-[#888]">
                  {exp.years}
                </span>
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-[#ededed]">
                    {exp.role}{" "}
                    <span className="text-[#555]">· {exp.company}</span>
                  </h3>
                  <p className="mt-3 max-w-[62ch] font-[family-name:var(--font-body)] text-sm leading-[1.8] text-[#888]">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // --- Full: pinned timeline. Section is tall; the inner panel sticks. ---
  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#0b0a09]"
      style={{ minHeight: "320vh" }}
    >
      {/* Dusk ember — orange (the day accent) bleeding up from the horizon,
          the visual bridge between day and full night. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(85% 55% at 50% 128%, rgba(255,92,43,0.07), transparent 72%)",
        }}
      />

      <div className="sticky top-0 flex h-[100dvh] items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-10 px-6 md:grid-cols-[0.85fr_1.15fr] md:items-center">
          {/* LEFT — pinned: kicker, heading, the changing year, progress */}
          <div className="relative">
            <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.3em] text-[#888]">
              Experience
            </p>
            <h2 className="mt-5 max-w-[14ch] font-[family-name:var(--font-display)] text-2xl font-bold leading-tight tracking-tight text-[#ededed] md:text-4xl">
              Where I&apos;ve built things.
            </h2>

            {/* Changing year */}
            <div className="relative mt-10 h-[18vw] md:h-[11vw]">
              {experiences.map((exp, i) => (
                <span
                  key={exp.id}
                  className={`absolute bottom-0 left-0 font-[family-name:var(--font-display)] text-[18vw] font-extrabold leading-none tracking-tight text-[#ededed] md:text-[11vw] ${TRANSITION} ${
                    active === i
                      ? "translate-y-0 opacity-100"
                      : "translate-y-3 opacity-0"
                  }`}
                >
                  {exp.startYear}
                </span>
              ))}
            </div>

            {/* Progress ticks + duration */}
            <div className="mt-8 flex items-center gap-3">
              {experiences.map((exp, i) => (
                <span
                  key={exp.id}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    active === i ? "w-8 bg-[#c8ff00]" : "w-1.5 bg-[#333]"
                  }`}
                />
              ))}
              <span className="ml-3 font-[family-name:var(--font-mono)] text-xs tracking-[0.1em] text-[#888]">
                {experiences[active].years}
              </span>
            </div>
          </div>

          {/* RIGHT — the spotlighted role, cross-fading as you scroll */}
          <div className="relative h-[46vh] min-h-[300px]">
            {experiences.map((exp, i) => (
              <div
                key={exp.id}
                className={`absolute inset-0 flex flex-col justify-center ${TRANSITION} ${
                  active === i
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none translate-y-8 opacity-0"
                }`}
              >
                <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                  <span className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-[#666]">
                    {exp.role}
                  </span>
                  {exp.isCurrent && (
                    <span className="inline-flex items-center gap-1.5 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.18em] text-[#c8ff00]">
                      <span
                        aria-hidden
                        className="inline-block h-1.5 w-1.5 rounded-full bg-[#c8ff00]"
                      />
                      Current
                    </span>
                  )}
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-5xl font-bold leading-[0.95] tracking-tight text-[#ededed] md:text-7xl">
                  {exp.company}
                </h3>
                <p className="mt-8 max-w-[52ch] font-[family-name:var(--font-body)] text-base leading-[1.8] text-[#999] md:text-lg">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
