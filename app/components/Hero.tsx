"use client";

import { useEffect, useRef, useState } from "react";
import {
  FaInstagram,
  FaLinkedin,
  FaEnvelope,
  FaTwitter,
  FaGithub,
} from "react-icons/fa";

const socialLinks = [
  { icon: FaInstagram, href: "https://www.instagram.com/niy4z_ahmed/", label: "Instagram" },
  { icon: FaLinkedin, href: "https://www.linkedin.com/in/niyazherkal/", label: "LinkedIn" },
  { icon: FaTwitter, href: "https://x.com/Niyaznhh", label: "X" },
  { icon: FaEnvelope, href: "mailto:niyaz47nhh@gmail.com", label: "Email" },
  { icon: FaGithub, href: "https://github.com/LuC1f3-r", label: "GitHub" },
];

// The middle band cycles these in a glitchy manner (the "hybrid" layout).
const dayCyclePhrases = [
  "LuC1f3-r",
  "Backend Engineer",
  "Microservices Architect",
  "Event-Driven Systems",
  "AWS Cloud",
];
const nightCyclePhrases = [
  "Full Stack Developer",
  "Product Architect",
  "Absorbing Something New",
];

const NAME_CLASS =
  "block text-[15vw] md:text-[10.5vw] font-extrabold leading-[0.86] tracking-[-0.02em]";
const BAND_CLASS =
  "font-[family-name:var(--font-mono)] text-3xl font-bold tracking-tight md:text-5xl";

export default function Hero() {
  const dayRef = useRef<HTMLDivElement>(null);
  const nightRef = useRef<HTMLDivElement>(null);

  const [reduced, setReduced] = useState(false);
  const [night, setNight] = useState(false);
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
      // 15 keeps the two bands aligned and the counter bounded.
      swap = setTimeout(() => setPhrase((p) => (p + 1) % 15), 170);
      settle = setTimeout(() => setCycleGlitch(false), 360);
    }, 2200);
    return () => {
      clearInterval(tick);
      clearTimeout(swap);
      clearTimeout(settle);
    };
  }, [reduced]);

  // Day -> night as a TIMED transition (not a scroll-scrub): once you scroll
  // past a small threshold, the whole hero crossfades white -> black. Fully
  // reversible, no pinning, no content sliding.
  useEffect(() => {
    if (reduced) return;
    const onScroll = () => {
      setNight(window.scrollY > window.innerHeight * 0.15);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [reduced]);

  const handleViewWork = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  };

  // --- Reduced-motion: static, stacked, fully readable. ---
  if (reduced) {
    return (
      <section className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center gap-10 bg-[#f4f4f0] px-6 py-24 text-center">
        <div>
          <h1 className="font-[family-name:var(--font-display)] text-[13vw] font-extrabold leading-[0.86] tracking-tight text-[#111] md:text-[8vw]">
            Niyaz Ahamad <span className="text-[#ff5c2b]">Herkal</span>
          </h1>
          <p className="mt-6 font-[family-name:var(--font-mono)] text-sm text-[#333]">
            Backend Engineer · Microservices · AWS Cloud
          </p>
        </div>
        <div className="border-t border-[#111]/15 pt-8">
          <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.35em] text-[#888]">
            During the night
          </p>
          <p className="mt-2 font-[family-name:var(--font-mono)] text-sm text-[#333]">
            Full Stack Developer · Product Architect · Absorbing Something New
          </p>
        </div>
      </section>
    );
  }

  // --- Full experience: day crossfades to night via timed transition. ---
  return (
    <section
      className="relative min-h-[100dvh] w-full overflow-hidden px-6 transition-colors duration-[900ms] ease-[cubic-bezier(0.76,0,0.24,1)]"
      style={{ backgroundColor: night ? "#0a0a0a" : "#f4f4f0" }}
    >
      {/* DAY */}
      <div
        ref={dayRef}
        className={`absolute inset-0 z-10 flex flex-col items-center justify-center text-center transition-opacity duration-[900ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
          night ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <span className="mb-6 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.35em] text-[#888]">
          ◐ By day
        </span>
        <h1 className="font-[family-name:var(--font-display)] tracking-tight text-[#111]">
          <span className={NAME_CLASS}>Niyaz Ahamad</span>
          <span className={NAME_CLASS}>
            <span className="text-[#ff5c2b]">Herkal</span>
          </span>
        </h1>

        {/* Glitchy cycling roles (centered) */}
        <div
          className={`glitch-word mx-auto mt-8 w-fit ${cycleGlitch ? "is-glitching" : ""}`}
          aria-live="polite"
        >
          <span className={`glitch-word__layer glitch-word__base ${BAND_CLASS}`}>
            {dayCyclePhrases[phrase % dayCyclePhrases.length]}
          </span>
          <span className={`glitch-word__layer glitch-word__ghost glitch-word__ghost--cyan ${BAND_CLASS}`}>
            {dayCyclePhrases[phrase % dayCyclePhrases.length]}
          </span>
          <span className={`glitch-word__layer glitch-word__ghost glitch-word__ghost--lime ${BAND_CLASS}`}>
            {dayCyclePhrases[phrase % dayCyclePhrases.length]}
          </span>
        </div>

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
      </div>

      {/* NIGHT — mirrors day: same name, then glitch role cycle */}
      <div
        ref={nightRef}
        className={`absolute inset-0 z-20 flex flex-col items-center justify-center text-center transition-opacity duration-[900ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
          night ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <span className="mb-6 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.35em] text-[#c8ff00]">
          ◑ During the night
        </span>
        <h2 className="font-[family-name:var(--font-display)] tracking-tight text-[#ededed]">
          <span className={NAME_CLASS}>Niyaz Ahamad</span>
          <span className={NAME_CLASS}>
            <span className="text-[#c8ff00]">Herkal</span>
          </span>
        </h2>

        {/* Glitchy cycling night roles (light base for the dark bg) */}
        <div
          className={`glitch-word mx-auto mt-8 w-fit ${cycleGlitch ? "is-glitching" : ""}`}
          aria-live="polite"
        >
          <span
            className={`glitch-word__layer glitch-word__base ${BAND_CLASS}`}
            style={{ color: "#ededed" }}
          >
            {nightCyclePhrases[phrase % nightCyclePhrases.length]}
          </span>
          <span className={`glitch-word__layer glitch-word__ghost glitch-word__ghost--cyan ${BAND_CLASS}`}>
            {nightCyclePhrases[phrase % nightCyclePhrases.length]}
          </span>
          <span className={`glitch-word__layer glitch-word__ghost glitch-word__ghost--lime ${BAND_CLASS}`}>
            {nightCyclePhrases[phrase % nightCyclePhrases.length]}
          </span>
        </div>

        <p className="mt-8 max-w-[42ch] font-[family-name:var(--font-body)] text-sm text-[#888] md:text-base">
          By night — off the clock, always building something new.
        </p>
      </div>
    </section>
  );
}
