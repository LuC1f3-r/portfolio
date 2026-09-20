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
import { useLenis } from "./SmoothScroll";

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

// The name line lives inside this mask so it can be swept up from the baseline
// during the intro. Same padding on day + night so the two cores stay pixel-
// aligned as the wipe crosses (no jump). Descender room via paddingBottom.
const MASK_BASE: CSSProperties = { paddingBottom: "0.12em" };

// Soft-edged right->left reveal driven by the --wipe custom property (0 = fully
// revealed, 112 = fully hidden). The 12% gradient band is the feathered edge.
const featherMask =
  "linear-gradient(to right, transparent calc((var(--wipe) - 12) * 1%), #000 calc(var(--wipe) * 1%))";

interface HeroProps {
  play?: boolean;
}

export default function Hero({ play = false }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const dayRef = useRef<HTMLDivElement>(null);

  const [reduced, setReduced] = useState(false);
  const [phrase, setPhrase] = useState(0); // incoming / current role index
  const [prev, setPrev] = useState(0); // outgoing role index (shown mid-swap)
  const [swapping, setSwapping] = useState(false);
  const idxRef = useRef(0);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Role cycling — overlap crossfade-glitch. 15 = lcm(5 day, 3 night).
  useEffect(() => {
    if (reduced) return;
    let settle: ReturnType<typeof setTimeout>;
    const tick = setInterval(() => {
      const cur = idxRef.current;
      const next = (cur + 1) % 15;
      idxRef.current = next;
      setPrev(cur);
      setPhrase(next);
      setSwapping(true);
      settle = setTimeout(() => setSwapping(false), 460);
    }, 2600);
    return () => {
      clearInterval(tick);
      clearTimeout(settle);
    };
  }, [reduced]);

  // Pre-stage the DAY intro elements the moment the hero mounts (still hidden
  // behind the loader), so nothing flashes before the choreography plays.
  useEffect(() => {
    if (reduced || !dayRef.current) return;
    const d = dayRef.current;
    gsap.set(d.querySelectorAll(".hero-line"), { yPercent: 118 });
    gsap.set(d.querySelectorAll(".day-kicker"), { autoAlpha: 0, x: -24 });
    gsap.set(d.querySelectorAll(".role-swap"), { autoAlpha: 0, y: 30 });
    gsap.set(d.querySelectorAll(".day-extras > *"), { autoAlpha: 0, y: 30 });
  }, [reduced]);

  // The intro. Fires when the loader hands off (`play`). Masked name lines
  // sweep up in sequence, then the kicker, roles and support elements cascade.
  useEffect(() => {
    if (!play || reduced || !dayRef.current) return;
    const d = dayRef.current;
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    tl.to(d.querySelectorAll(".hero-line"), {
      yPercent: 0,
      duration: 1.15,
      stagger: 0.12,
    })
      .to(
        d.querySelectorAll(".day-kicker"),
        { autoAlpha: 1, x: 0, duration: 0.8, ease: "power3.out" },
        "-=0.8"
      )
      .to(
        d.querySelectorAll(".role-swap"),
        { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.65"
      )
      .to(
        d.querySelectorAll(".day-extras > *"),
        { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.09 },
        "-=0.55"
      )
      // Let descenders (the y in Niyaz) breathe once the reveal has settled.
      .set(d.querySelectorAll(".hero-mask"), { overflow: "visible" });

    return () => {
      tl.kill();
    };
  }, [play, reduced]);

  // First scroll pins the hero; the night panel wipes in from the right with a
  // soft feathered edge (right -> left). --wipe lives on the section so the
  // light-leak edge can read the same value. ctx.revert() cleans up only this
  // component's triggers (never a global getAll().kill()).
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reduced) return;

    const ctx = gsap.context(() => {
      gsap.set(section, { "--wipe": 112 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=110%",
          scrub: 0.3,
          pin: true,
          pinSpacing: true,
        },
      });

      tl.to(section, { "--wipe": 0, ease: "none" });
    }, section);

    return () => {
      ctx.revert();
    };
  }, [reduced]);

  const lenis = useLenis();

  const handleViewWork = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    lenis.scrollTo("#projects");
  };

  // Shared centered core so the name + roles sit at the SAME spot in both
  // themes. `reveal` = day (masks clip for the intro sweep); night renders the
  // same geometry but with masks open so it reads normally under the wipe.
  const renderCore = ({
    nameColor,
    herkalColor,
    phrases,
    reveal,
    baseStyle,
  }: {
    nameColor: string;
    herkalColor: string;
    phrases: string[];
    reveal: boolean;
    baseStyle?: CSSProperties;
  }) => {
    const maskStyle: CSSProperties = {
      ...MASK_BASE,
      overflow: reveal ? "hidden" : "visible",
    };
    return (
      <div className="flex h-full w-full flex-col items-center justify-center text-center">
        <h1
          className="font-[family-name:var(--font-display)] tracking-tight"
          style={{ color: nameColor }}
        >
          <span className="hero-mask block" style={maskStyle}>
            <span className={`hero-line ${NAME_CLASS}`}>Niyaz Ahamad</span>
          </span>
          <span className="hero-mask -mt-[0.08em] block" style={maskStyle}>
            <span className={`hero-line ${NAME_CLASS}`}>
              <span style={{ color: herkalColor }}>Herkal</span>
            </span>
          </span>
        </h1>

        <div
          className={`role-swap mt-8 w-full ${swapping ? "is-swapping" : ""}`}
          aria-live="polite"
        >
          <span
            className={`role-swap__layer role-swap__in ${BAND_CLASS}`}
            style={baseStyle}
          >
            {phrases[phrase % phrases.length]}
          </span>
          <span
            className={`role-swap__layer role-swap__out ${BAND_CLASS}`}
            style={baseStyle}
            aria-hidden
          >
            {phrases[prev % phrases.length]}
          </span>
          <span
            className={`role-swap__layer role-swap__ghost role-swap__ghost--cyan ${BAND_CLASS}`}
            aria-hidden
          >
            {phrases[phrase % phrases.length]}
          </span>
          <span
            className={`role-swap__layer role-swap__ghost role-swap__ghost--lime ${BAND_CLASS}`}
            aria-hidden
          >
            {phrases[phrase % phrases.length]}
          </span>
        </div>
      </div>
    );
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

  // --- Full experience: night wipes in over day (soft edge, right -> left). ---
  const sectionStyle = {
    backgroundColor: "#f4f4f0",
    "--wipe": 112,
  } as CSSProperties;

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] w-full overflow-hidden px-6"
      style={sectionStyle}
    >
      {/* DAY */}
      <div ref={dayRef} className="absolute inset-0 z-10">
        <span className={`day-kicker ${KICKER_CLASS} text-[#888]`}>◐ By day</span>
        {renderCore({
          nameColor: "#111111",
          herkalColor: "#ff5c2b",
          phrases: dayCyclePhrases,
          reveal: true,
          baseStyle: { color: "#111111" },
        })}
        <div className="day-extras absolute inset-x-0 bottom-[9vh] flex flex-col items-center gap-6 px-6">
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
        className="absolute inset-0 z-20 bg-[#0a0a0a]"
        style={
          {
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
          reveal: false,
          baseStyle: { color: "#ededed" },
        })}
        <div className="absolute inset-x-0 bottom-[9vh] flex flex-col items-center gap-6 px-6">
          <p className="max-w-[42ch] text-center font-[family-name:var(--font-body)] text-sm text-[#888] md:text-base">
            By night — off the clock, always building something new.
          </p>
          <div className="flex items-center gap-6">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-lg text-[#888] transition-colors duration-300 hover:text-[#ededed]"
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

      {/* Lime light-leak riding the wipe's leading edge. Reads the same --wipe
          as the mask; GPU-friendly translateX (no layout). */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-30 w-[2px]"
        style={{
          transform: "translateX(calc(var(--wipe) * 1vw))",
          background:
            "linear-gradient(to bottom, transparent, #c8ff00 45%, #eaff8a 50%, #c8ff00 55%, transparent)",
          boxShadow: "0 0 28px 6px rgba(200,255,0,0.5)",
        }}
      />
    </section>
  );
}
