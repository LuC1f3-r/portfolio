"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Github } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const achievements = [
  {
    metric: "10K+",
    title: "Multi-job booking module",
    body: "Architected overlapping and standalone appointment scheduling (Google-Calendar-style logic) scaling to 10,000+ booking transactions a day, eliminating manual job-entry workflows.",
  },
  {
    metric: "−60%",
    title: "Auth rebuilt on AWS Cognito",
    body: "JWT-backed persistent token refresh cut redundant auth calls 60% (roughly 10k/day down to 4k) and ended the unwanted session logouts.",
  },
  {
    metric: "−20%",
    title: "Kafka + SQS migration",
    body: "Moved a monolith to message-based microservices, decoupling services and cutting inter-service processing latency 20%.",
  },
];

const projects = [
  {
    name: "Serpico",
    description:
      "A framework fusing data extraction and analytics into one pipeline, built for scalability and real-time processing.",
    link: "https://github.com/LuC1f3-r/Serpico-TK",
    tags: ["Python", "Data Pipeline", "Analytics"],
  },
  {
    name: "URL Shortener",
    description:
      "Fast, scalable URL shortener with tracking and analytics, built for heavy traffic with Redis caching.",
    link: "https://github.com/LuC1f3-r/url-shortener",
    tags: ["Node.js", "Redis", "PostgreSQL"],
  },
  {
    name: "Self Driving Car",
    description:
      "Browser-based JS simulation with neural networks mimicking autonomous driving logic through machine learning.",
    link: "https://github.com/LuC1f3-r/Self-Driving-Car",
    tags: ["JavaScript", "ML", "Canvas"],
  },
];

const TRANSITION =
  "transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]";

function GlitchName({ name }: { name: string }) {
  return (
    <span className="glitch-hover">
      <span className="glitch-hover__base">{name}</span>
      <span className="glitch-hover__ghost glitch-hover__ghost--cyan" aria-hidden>
        {name}
      </span>
      <span className="glitch-hover__ghost glitch-hover__ghost--lime" aria-hidden>
        {name}
      </span>
    </span>
  );
}

export default function Projects() {
  const caseRef = useRef<HTMLElement>(null);
  const rowsRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Scroll progress drives which achievement is spotlighted (pinned via
  // native sticky). Rows reveal on enter.
  useEffect(() => {
    if (reduced) return;

    const ctx = gsap.context(() => {
      if (caseRef.current) {
        ScrollTrigger.create({
          trigger: caseRef.current,
          start: "top top",
          end: "bottom bottom",
          onUpdate: (self) => {
            const idx = Math.min(
              achievements.length - 1,
              Math.floor(self.progress * achievements.length)
            );
            if (idx !== activeRef.current) {
              activeRef.current = idx;
              setActive(idx);
            }
          },
        });
      }

      if (rowsRef.current) {
        const rows = rowsRef.current.querySelectorAll<HTMLElement>(".project-row");
        gsap.from(rows, {
          y: 40,
          opacity: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: rowsRef.current, start: "top 80%" },
        });
      }
    });

    return () => ctx.revert();
  }, [reduced]);

  return (
    <main className="w-full bg-[#0a0a0a]">
      {/* ── Featured case study — pinned scrollytelling ── */}
      <section
        ref={caseRef}
        className="relative w-full"
        style={{ minHeight: reduced ? undefined : "320vh" }}
      >
        <div className="sticky top-0 flex h-[100dvh] items-center overflow-hidden">
          <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-10 px-6 md:grid-cols-[0.9fr_1.1fr] md:items-center">
            {/* LEFT — pinned title */}
            <div>
              <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.3em] text-[#c8ff00]">
                Case Study · CodeHaste
              </p>
              <h2 className="mt-5 max-w-[12ch] font-[family-name:var(--font-display)] text-4xl font-bold leading-[0.95] tracking-tight text-[#ededed] md:text-6xl">
                B2C Services Platform
              </h2>
              <p className="mt-6 font-[family-name:var(--font-mono)] text-[12px] tracking-wide text-[#777]">
                Lead Backend Engineer · Node.js · NestJS · AWS · Kafka
              </p>

              {/* progress ticks */}
              <div className="mt-10 flex items-center gap-3">
                {achievements.map((a, i) => (
                  <span
                    key={a.metric}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      active === i ? "w-8 bg-[#c8ff00]" : "w-1.5 bg-[#333]"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* RIGHT — the achievement chapters (or full list under reduced) */}
            {reduced ? (
              <ul className="space-y-10">
                {achievements.map((a) => (
                  <li key={a.metric} className="flex gap-6">
                    <span className="shrink-0 font-[family-name:var(--font-mono)] text-2xl font-bold text-[#c8ff00]">
                      {a.metric}
                    </span>
                    <div>
                      <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-[#ededed]">
                        {a.title}
                      </h3>
                      <p className="mt-2 max-w-[52ch] font-[family-name:var(--font-body)] text-sm leading-[1.8] text-[#888]">
                        {a.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="relative h-[48vh] min-h-[320px]">
                {achievements.map((a, i) => (
                  <div
                    key={a.metric}
                    className={`absolute inset-0 flex flex-col justify-center ${TRANSITION} ${
                      active === i
                        ? "translate-y-0 opacity-100"
                        : "pointer-events-none translate-y-8 opacity-0"
                    }`}
                  >
                    <p className="font-[family-name:var(--font-display)] text-[clamp(4rem,10vw,8rem)] font-bold leading-none tracking-tight text-[#c8ff00]">
                      {a.metric}
                    </p>
                    <h3 className="mt-6 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[#ededed] md:text-3xl">
                      {a.title}
                    </h3>
                    <p className="mt-5 max-w-[50ch] font-[family-name:var(--font-body)] text-base leading-[1.8] text-[#999] md:text-lg">
                      {a.body}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Open source rows — glitch on hover ── */}
      <section className="w-full px-6 pb-28 pt-8">
        <div className="mx-auto max-w-[1400px]">
          <p className="mb-8 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.3em] text-[#888]">
            Open Source
          </p>

          <div ref={rowsRef} className="border-t border-[#222]">
            {projects.map((project) => (
              <div
                key={project.name}
                className="project-row group grid grid-cols-1 gap-6 border-b border-[#222] py-10 transition-colors duration-200 hover:border-[#444] sm:grid-cols-[1fr_auto] sm:items-start"
              >
                <div className="min-w-0">
                  <h3 className="mb-3 font-[family-name:var(--font-display)] text-3xl font-bold leading-tight tracking-tight text-[#ededed] transition-colors duration-200 group-hover:text-[#c8ff00] md:text-4xl">
                    <GlitchName name={project.name} />
                  </h3>
                  <p className="mb-4 max-w-[54ch] font-[family-name:var(--font-body)] text-sm leading-[1.75] text-[#888]">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="border border-[#2a2a2a] px-2.5 py-1 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.18em] text-[#555]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${project.name} on GitHub`}
                  className="inline-flex h-fit shrink-0 items-center gap-2 border border-[#2a2a2a] px-4 py-2.5 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-[#555] transition-colors duration-200 hover:border-[#c8ff00] hover:text-[#c8ff00]"
                >
                  <Github size={13} />
                  View
                </a>
              </div>
            ))}
          </div>

          <div className="mt-12">
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
      </section>
    </main>
  );
}
