"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const experiences = [
  {
    id: 1,
    company: "CodeHaste",
    role: "Software Engineer",
    years: "2024 – present",
    isCurrent: true,
    description:
      "Developed scalable microservices in NestJS, integrated AWS Cognito for secure authentication, led end-to-end product development, enhanced system metrics and logging, and implemented CI/CD pipelines and comprehensive testing with Jest, achieving 95% test coverage.",
  },
  {
    id: 2,
    company: "Zluri",
    role: "Software Development Engineer",
    years: "2023",
    duration: "7 months",
    isCurrent: false,
    description:
      "Engineered backend features for high-traffic platforms (Monday.com, JumpCloud, Azure, JFrog, GitBook), optimizing performance, reliability, and security while reducing latency and system downtime.",
  },
  {
    id: 3,
    company: "BTrees Technologies",
    role: "Backend Developer Intern",
    years: "2022",
    duration: "5 months",
    isCurrent: false,
    description:
      "Led a team of 3 developers to build a dynamic web application for an educational institution, enhancing user engagement by 30%. Reduced page load time by 40%, improving overall application performance.",
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      rowRefs.current.forEach((row) => {
        if (row) gsap.set(row, { y: 0, opacity: 1 });
      });
      return;
    }

    const ctx = gsap.context(() => {
      rowRefs.current.forEach((row, i) => {
        if (!row) return;
        gsap.fromTo(
          row,
          { y: 48, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 80%",
              toggleActions: "play none none reverse",
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
      className="w-full py-24 px-6 bg-[#0a0a0a] overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Mono kicker */}
        <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-[#888] mb-8">
          Experience
        </p>

        {/* Section heading */}
        <h2 className="font-[family-name:var(--font-display)] text-[#ededed] text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight mb-16 max-w-[18ch]">
          Where I&apos;ve built things.
        </h2>

        {/* Timeline rows */}
        <div className="space-y-0">
          {experiences.map((exp, i) => (
            <div
              key={exp.id}
              ref={(el) => { rowRefs.current[i] = el; }}
              className="group border-t border-[#1e1e1e] py-10 grid grid-cols-[6rem_1fr] sm:grid-cols-[8rem_1fr] md:grid-cols-[10rem_1fr] gap-6 md:gap-12 items-start"
            >
              {/* Year column */}
              <div className="pt-1">
                <span className="font-[family-name:var(--font-mono)] text-xs text-[#888] tracking-[0.1em] whitespace-nowrap">
                  {exp.years}
                </span>
                {exp.duration && (
                  <span className="block font-[family-name:var(--font-mono)] text-[10px] text-[#555] tracking-[0.08em] mt-1">
                    {exp.duration}
                  </span>
                )}
              </div>

              {/* Content column */}
              <div className="min-w-0">
                {/* Role + company */}
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-4">
                  <h3 className="font-[family-name:var(--font-display)] text-[#ededed] text-xl sm:text-2xl font-bold leading-tight tracking-tight">
                    {exp.role}
                  </h3>
                  <span className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.14em] text-[#555]">
                    {exp.company}
                  </span>
                  {exp.isCurrent && (
                    <span className="inline-flex items-center gap-1.5 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.18em] text-[#c8ff00]">
                      <span
                        aria-hidden
                        className="inline-block w-1.5 h-1.5 rounded-full bg-[#c8ff00]"
                      />
                      Current
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="font-[family-name:var(--font-body)] text-[#888] text-sm sm:text-base leading-[1.8] max-w-[62ch]">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}

          {/* Bottom border */}
          <div className="border-t border-[#1e1e1e]" />
        </div>
      </div>
    </section>
  );
}
