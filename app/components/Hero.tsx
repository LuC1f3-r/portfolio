"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaInstagram,
  FaLinkedin,
  FaEnvelope,
  FaTwitter,
  FaGithub,
} from "react-icons/fa";

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
const KICKER_CLASS =
  "absolute left-6 top-28 z-10 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.35em]";

// Soft-edged right->left reveal driven by the --wipe custom property (0 = fully
// revealed, 112 = fully hidden). The 12% gradient band is the feathered edge.
const featherMask =
  "linear-gradient(to right, transparent calc((var(--wipe) - 12) * 1%), #000 calc(var(--wipe) * 1%))";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const nightRef = useRef<HTMLDivElement>(null);

  const [reduced, setReduced] = useState(false);
  const [phrase, setPhrase] = useState(0);
  const [cycleGlitch, setCycleGlitch] = useState(false);

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
      swap = setTimeout(() => setPhrase((p) => (p + 1) % 15), 170);
      settle = setTimeout(() => setCycleGlitch(false), 360);
    }, 2200);
    return () => {
      clearInterval(tick);
      clearTimeout(swap);
      clearTimeout(settle);
    };
  }, [reduced]);

  // First scroll pins the hero; the night panel wipes in from the right with a
  // soft feathered edge (right -> left), then the pin releases.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reduced) return;

    const ctx = gsap.context(() => {
      gsap.set(nightRef.current, { "--wipe": 112 });

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

      tl.to(nightRef.current, { "--wipe": 0, ease: "none" });
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

  // Shared centered core so the name + roles sit at the SAME spot in both
  // themes (so the name doesn't jump during the wipe). Plain render function
  // (not a nested component) so it doesn't remount on every state tick.
  const renderCore = ({
    nameColor,
    herkalColor,
    phrases,
    baseStyle,
  }: {
    nameColor: string;
    herkalColor: string;
    phrases: string[];
    baseStyle?: CSSProperties;
  }) => (
    <div className="flex h-full w-full flex-col items-center justify-center text-center">
      <h1
        className="font-[family-name:var(--font-display)] tracking-tight"
        style={{ color: nameColor }}
      >
        <span className={NAME_CLASS}>Niyaz Ahamad</span>
        <span className={NAME_CLASS}>
          <span style={{ color: herkalColor }}>Herkal</span>
        </span>
      </h1>

      <div
        className={`glitch-word mt-8 w-full justify-items-center ${
          cycleGlitch ? "is-glitching" : ""
        }`}
        aria-live="polite"
      >
        <span
          className={`glitch-word__layer glitch-word__base ${BAND_CLASS}`}
          style={baseStyle}
        >
          {phrases[phrase % phrases.length]}
        </span>
        <span className={`glitch-word__layer glitch-word__ghost glitch-word__ghost--cyan ${BAND_CLASS}`}>
          {phrases[phrase % phrases.length]}
        </span>
        <span className={`glitch-word__layer glitch-word__ghost glitch-word__ghost--lime ${BAND_CLASS}`}>
          {phrases[phrase % phrases.length]}
        </span>
      </div>
    </div>
  );

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

  // --- Full experience: night wipes in over day (soft edge, right -> left). ---
  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] w-full overflow-hidden px-6"
      style={{ backgroundColor: "#f4f4f0" }}
    >
      {/* DAY */}
      <div className="absolute inset-0 z-10">
        <span className={`${KICKER_CLASS} text-[#888]`}>◐ By day</span>
        {renderCore({
          nameColor: "#111111",
          herkalColor: "#ff5c2b",
          phrases: dayCyclePhrases,
        })}
        {/* theme-specific extras, anchored to the bottom (don't shift the name) */}
        <div className="absolute inset-x-0 bottom-[9vh] flex flex-col items-center gap-6 px-6">
          <p className="max-w-[42ch] text-center font-[family-name:var(--font-body)] text-sm text-[#555] md:text-base">
            By day — I ship scalable, event-driven backends.
          </p>
          <div className="flex items-center gap-6">
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
            className="inline-flex items-center gap-2 bg-[#c8ff00] px-6 py-3 font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.18em] text-[#0a0a0a] transition-transform duration-300 hover:-translate-y-0.5"
          >
            View my work
          </a>
        </div>
      </div>

      {/* NIGHT — same centered core, wipes in from the right with a soft edge */}
      <div
        ref={nightRef}
        className="absolute inset-0 z-20 bg-[#0a0a0a]"
        style={
          {
            "--wipe": 112,
            WebkitMaskImage: featherMask,
            maskImage: featherMask,
          } as CSSProperties
        }
      >
        <span className={`${KICKER_CLASS} text-[#c8ff00]`}>◑ During the night</span>
        {renderCore({
          nameColor: "#ededed",
          herkalColor: "#c8ff00",
          phrases: nightCyclePhrases,
          baseStyle: { color: "#ededed" },
        })}
        <div className="absolute inset-x-0 bottom-[9vh] flex flex-col items-center px-6">
          <p className="max-w-[42ch] text-center font-[family-name:var(--font-body)] text-sm text-[#888] md:text-base">
            By night — off the clock, always building something new.
          </p>
        </div>
      </div>
    </section>
  );
}
