"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaInstagram,
  FaLinkedin,
  FaEnvelope,
  FaTwitter,
  FaGithub,
} from "react-icons/fa";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const socialLinks = [
  { icon: FaInstagram, href: "https://www.instagram.com/niy4z_ahmed/", label: "Instagram" },
  { icon: FaLinkedin, href: "https://www.linkedin.com/in/niyazherkal/", label: "LinkedIn" },
  { icon: FaTwitter, href: "https://x.com/Niyaznhh", label: "X" },
  { icon: FaEnvelope, href: "mailto:niyaz47nhh@gmail.com", label: "Email" },
  { icon: FaGithub, href: "https://github.com/LuC1f3-r", label: "GitHub" },
];

// The middle band cycles these in a glitchy manner (the "hybrid" layout).
const cyclePhrases = [
  "LuC1f3-r",
  "Backend Engineer",
  "Microservices Architect",
  "Event-Driven Systems",
  "AWS Cloud",
];

// TODO(night copy): replace with the user's exact "by night" wording.
const NIGHT_TITLE = "By night, I'm Batman.";
const NIGHT_SUB = "Freelancer & explorer after dark.";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const dayRef = useRef<HTMLDivElement>(null);
  const nightRef = useRef<HTMLDivElement>(null);

  const [reduced, setReduced] = useState(false);
  const [phrase, setPhrase] = useState(0);
  const [cycleGlitch, setCycleGlitch] = useState(false);

  // Detect reduced-motion once on mount.
  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Glitchy phrase cycling for the roles band (skipped under reduced-motion).
  useEffect(() => {
    if (reduced) return;
    let swap: ReturnType<typeof setTimeout>;
    let settle: ReturnType<typeof setTimeout>;
    const tick = setInterval(() => {
      setCycleGlitch(true);
      swap = setTimeout(() => setPhrase((p) => (p + 1) % cyclePhrases.length), 170);
      settle = setTimeout(() => setCycleGlitch(false), 360);
    }, 2200);
    return () => {
      clearInterval(tick);
      clearTimeout(swap);
      clearTimeout(settle);
    };
  }, [reduced]);

  // Pinned day -> night scroll transition (skipped under reduced-motion).
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reduced) return;

    const ctx = gsap.context(() => {
      gsap.set(nightRef.current, { opacity: 0, yPercent: 16 });
      gsap.set(dayRef.current, { opacity: 1, yPercent: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=110%",
          scrub: 1,
          pin: true,
          pinSpacing: true,
        },
      });

      tl.to(section, { backgroundColor: "#0a0a0a", ease: "none" }, 0)
        .to(dayRef.current, { opacity: 0, yPercent: -18, ease: "power1.in" }, 0)
        .to(nightRef.current, { opacity: 1, yPercent: 0, ease: "power1.out" }, 0.25);
    }, section);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [reduced]);

  const handleViewWork = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  };

  // --- Reduced-motion: static, stacked, fully readable, no pin. ---
  if (reduced) {
    return (
      <section className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center gap-10 bg-[#f4f4f0] px-6 py-24 text-center">
        <div>
          <h1 className="font-[family-name:var(--font-display)] text-[13vw] leading-[0.92] tracking-tight text-[#111] md:text-[8vw]">
            Niyaz Ahamad Herkal
          </h1>
          <p className="mt-6 font-[family-name:var(--font-mono)] text-sm text-[#333]">
            Backend Engineer · Microservices · AWS Cloud
          </p>
          <p className="mt-3 font-[family-name:var(--font-body)] text-[#555]">
            By day — I ship scalable, event-driven backends.
          </p>
        </div>
        <div className="border-t border-[#111]/15 pt-8">
          <p className="font-[family-name:var(--font-display)] text-2xl text-[#111]">
            {NIGHT_TITLE}
          </p>
          <p className="mt-1 font-[family-name:var(--font-mono)] text-xs text-[#555]">
            {NIGHT_SUB}
          </p>
        </div>
      </section>
    );
  }

  // --- Full experience: day state crossfades to night on pinned scroll. ---
  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] w-full overflow-hidden bg-[#f4f4f0] px-6"
    >
      {/* DAY */}
      <div
        ref={dayRef}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center"
      >
        {/* 60% — Name */}
        <span className="mb-6 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.35em] text-[#888]">
          ◐ By day
        </span>
        <h1 className="font-[family-name:var(--font-display)] leading-[0.9] tracking-tight text-[#111]">
          <span className="block text-[13vw] md:text-[8.5vw]">Niyaz Ahamad</span>
          <span className="block text-[13vw] md:text-[8.5vw]">Herkal</span>
        </h1>

        {/* 20% — glitchy cycling roles / nicknames */}
        <div
          className={`glitch-word mt-8 ${cycleGlitch ? "is-glitching" : ""}`}
          aria-live="polite"
        >
          <span className="glitch-word__layer glitch-word__base font-[family-name:var(--font-mono)] text-2xl font-bold tracking-tight md:text-4xl">
            {cyclePhrases[phrase]}
          </span>
          <span className="glitch-word__layer glitch-word__ghost glitch-word__ghost--cyan font-[family-name:var(--font-mono)] text-2xl font-bold tracking-tight md:text-4xl">
            {cyclePhrases[phrase]}
          </span>
          <span className="glitch-word__layer glitch-word__ghost glitch-word__ghost--lime font-[family-name:var(--font-mono)] text-2xl font-bold tracking-tight md:text-4xl">
            {cyclePhrases[phrase]}
          </span>
        </div>

        {/* 20% — day line + socials + CTA */}
        <p className="mt-8 max-w-[42ch] font-[family-name:var(--font-body)] text-sm text-[#555] md:text-base">
          By day — I ship scalable, event-driven backends.
        </p>

        <div className="mt-8 flex items-center gap-6">
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-lg text-[#555] transition-colors duration-300 hover:text-[#111]"
            >
              <Icon />
            </a>
          ))}
        </div>

        <a
          href="#projects"
          onClick={handleViewWork}
          className="mt-10 inline-flex items-center gap-2 bg-[#c8ff00] px-6 py-3 font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.18em] text-[#0a0a0a] transition-transform duration-300 hover:-translate-y-0.5"
        >
          View my work
        </a>

        <span className="absolute bottom-8 left-1/2 -translate-x-1/2 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.3em] text-[#999]">
          Scroll into the night ↓
        </span>
      </div>

      {/* NIGHT */}
      <div
        ref={nightRef}
        className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center"
      >
        <span className="mb-6 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.35em] text-[#c8ff00]">
          ◑ By night
        </span>
        <h2 className="max-w-[16ch] font-[family-name:var(--font-display)] text-[10vw] leading-[0.95] tracking-tight text-[#ededed] md:text-[6vw]">
          {NIGHT_TITLE}
        </h2>
        <p className="mt-6 font-[family-name:var(--font-mono)] text-sm text-[#888]">
          {NIGHT_SUB}
        </p>
      </div>
    </section>
  );
}
