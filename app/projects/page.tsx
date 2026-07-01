"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Github } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const projects = [
  {
    name: "Serpico",
    description:
      "A framework that fuses data extraction and analytical capabilities into one powerful pipeline. Built for scalability and real-time processing.",
    link: "https://github.com/LuC1f3-r/Serpico-TK",
    tags: ["Python", "Data Pipeline", "Analytics"],
  },
  {
    name: "URL Shortener",
    description:
      "Fast and scalable URL shortener with tracking and analytics — built for heavy traffic scenarios with Redis caching.",
    link: "https://github.com/LuC1f3-r/url-shortener",
    tags: ["Node.js", "Redis", "PostgreSQL"],
  },
  {
    name: "Self Driving Car",
    description:
      "Browser-based JS simulation with neural networks that mimic autonomous driving logic using machine learning.",
    link: "https://github.com/LuC1f3-r/Self-Driving-Car",
    tags: ["JavaScript", "ML", "Canvas"],
  },
];


export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const caseStudyRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (caseStudyRef.current) {
        const els = caseStudyRef.current.querySelectorAll<HTMLElement>(
          ".reveal-item"
        );
        els.forEach((el) => gsap.set(el, { y: 0, opacity: 1 }));
      }
      if (rowsRef.current) {
        const rows = rowsRef.current.querySelectorAll<HTMLElement>(".project-row");
        rows.forEach((row) => gsap.set(row, { y: 0, opacity: 1 }));
      }
      return;
    }

    const ctx = gsap.context(() => {
      // Case study block — stagger each reveal-item in
      if (caseStudyRef.current) {
        const els = caseStudyRef.current.querySelectorAll<HTMLElement>(
          ".reveal-item"
        );
        els.forEach((el, i) => {
          gsap.fromTo(
            el,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.75,
              ease: "power3.out",
              delay: i * 0.1,
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });
      }

      // Project rows stagger
      if (rowsRef.current) {
        const rows = rowsRef.current.querySelectorAll<HTMLElement>(".project-row");
        rows.forEach((row, i) => {
          gsap.fromTo(
            row,
            { y: 48, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
              delay: i * 0.1,
              scrollTrigger: {
                trigger: row,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });
      }
    }, section);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <main
      ref={sectionRef}
      className="w-full py-24 px-6 bg-[#0a0a0a] overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto">

        {/* Mono kicker */}
        <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-[#888] mb-16">
          Selected Work
        </p>

        {/* ── Featured Case Study ── */}
        <div ref={caseStudyRef} className="mb-24">

          {/* Case study label */}
          <p className="reveal-item font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-[#c8ff00] mb-4">
            Case Study · CodeHaste
          </p>

          {/* Big display headline */}
          <h2 className="reveal-item font-[family-name:var(--font-display)] text-[#ededed] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.0] tracking-tight mb-3 max-w-[20ch]">
            B2C Services Platform
          </h2>

          {/* Sub-label */}
          <p className="reveal-item font-[family-name:var(--font-mono)] text-[13px] text-[#888] tracking-wide mb-12">
            Lead Backend Engineer · Node.js · NestJS · AWS · Kafka
          </p>

          {/* Divider */}
          <div className="reveal-item w-full h-px bg-[#222] mb-12" />

          {/* Achievement bullets */}
          <ul className="space-y-10">
            {/* Booking module */}
            <li className="reveal-item flex gap-6 items-start">
              <span
                className="font-[family-name:var(--font-mono)] text-[#c8ff00] text-2xl sm:text-3xl font-bold leading-none shrink-0 pt-1"
                aria-hidden
              >
                10k+
              </span>
              <p className="font-[family-name:var(--font-body)] text-[#888] text-base sm:text-lg leading-[1.75]">
                Architected a multi-job booking module (overlapping/standalone
                appointment scheduling, Google-Calendar-style logic) scaling to{" "}
                <strong className="text-[#c8ff00] font-bold">
                  10,000+ booking transactions/day
                </strong>
                , eliminating manual job-entry workflows.
              </p>
            </li>

            {/* Auth */}
            <li className="reveal-item flex gap-6 items-start">
              <span
                className="font-[family-name:var(--font-mono)] text-[#c8ff00] text-2xl sm:text-3xl font-bold leading-none shrink-0 pt-1"
                aria-hidden
              >
                −60%
              </span>
              <p className="font-[family-name:var(--font-body)] text-[#888] text-base sm:text-lg leading-[1.75]">
                Rebuilt authentication on{" "}
                <strong className="text-[#ededed] font-semibold">AWS Cognito</strong>{" "}
                with JWT-backed persistent token refresh —{" "}
                <strong className="text-[#c8ff00] font-bold">60% fewer</strong>{" "}
                redundant auth transactions (~10k/day → ~4k/day) and no more
                unwanted session logouts.
              </p>
            </li>

            {/* Kafka migration */}
            <li className="reveal-item flex gap-6 items-start">
              <span
                className="font-[family-name:var(--font-mono)] text-[#c8ff00] text-2xl sm:text-3xl font-bold leading-none shrink-0 pt-1"
                aria-hidden
              >
                −20%
              </span>
              <p className="font-[family-name:var(--font-body)] text-[#888] text-base sm:text-lg leading-[1.75]">
                Migrated a monolith to{" "}
                <strong className="text-[#ededed] font-semibold">
                  message-based microservices (Kafka + AWS SQS)
                </strong>
                , decoupling services and cutting inter-service processing
                latency{" "}
                <strong className="text-[#c8ff00] font-bold">20%</strong>.
              </p>
            </li>
          </ul>
        </div>

        {/* ── Editorial section label ── */}
        <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-[#888] mb-8">
          Open Source
        </p>

        {/* Divider */}
        <div className="w-full h-px bg-[#222] mb-0" />

        {/* ── Project rows ── */}
        <div ref={rowsRef}>
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="project-row group border-b border-[#222] py-10 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 transition-colors duration-200 hover:border-[#444]"
            >
              {/* Left — name + tags */}
              <div className="flex-1 min-w-0">
                <h3 className="font-[family-name:var(--font-display)] text-[#ededed] text-2xl sm:text-3xl md:text-4xl font-bold leading-tight tracking-tight mb-3 group-hover:text-[#c8ff00] transition-colors duration-200">
                  {project.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.18em] text-[#555] border border-[#2a2a2a] px-2.5 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Center — description */}
              <p className="font-[family-name:var(--font-body)] text-[#888] text-sm sm:text-base leading-[1.75] max-w-[44ch] sm:mx-8 flex-shrink-0">
                {project.description}
              </p>

              {/* Right — link */}
              <div className="flex items-start gap-4 shrink-0">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${project.name} on GitHub`}
                  className="inline-flex items-center gap-2 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-[#555] border border-[#2a2a2a] px-4 py-2.5 transition-colors duration-200 hover:text-[#c8ff00] hover:border-[#c8ff00]"
                >
                  <Github size={13} />
                  View Project
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* ── View all on GitHub ── */}
        <div className="mt-12 flex items-center justify-between">
          <a
            href="https://github.com/LuC1f3-r"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.18em] text-[#888] transition-colors duration-200 hover:text-[#c8ff00]"
          >
            <span>View all on GitHub</span>
            <ExternalLink size={13} />
          </a>
        </div>

      </div>
    </main>
  );
}
