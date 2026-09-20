"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { gsap } from "gsap";

// The production wins get top billing (they count up). The softer context
// stats sit in a quiet strip below.
const featured = [
  { prefix: "", target: 10000, suffix: "+", comma: true, label: "daily booking transactions" },
  { prefix: "−", target: 60, suffix: "%", comma: false, label: "fewer redundant auth calls" },
  { prefix: "−", target: 20, suffix: "%", comma: false, label: "lower inter-service latency" },
];

const marqueeItems = [
  "10,000+ transactions / day",
  "−60% redundant auth",
  "−20% inter-service latency",
  "95% test coverage",
];

const fmt = (n: number, comma: boolean) =>
  comma ? Math.round(n).toLocaleString("en-US") : Math.round(n).toString();

const MASK_STYLE: CSSProperties = { overflow: "hidden", paddingBottom: "0.1em" };

export default function Impact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nums = section.querySelectorAll<HTMLElement>(".stat-val");

    if (reduced) {
      nums.forEach((el, i) => {
        el.textContent = featured[i].prefix + fmt(featured[i].target, featured[i].comma);
      });
      return;
    }

    const ctx = gsap.context(() => {
      // Pre-stage: masked headline lines hidden, stat blocks lowered, numbers 0.
      gsap.set(".impact-line", { yPercent: 120 });
      gsap.set(".stat-block", { autoAlpha: 0, y: 30 });
      nums.forEach((el, i) => {
        el.textContent = featured[i].prefix + "0";
      });

      const startCounts = () => {
        featured.forEach((m, i) => {
          const el = nums[i];
          if (!el) return;
          const obj = { v: 0 };
          gsap.to(obj, {
            v: m.target,
            duration: 1.7,
            delay: i * 0.12,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = m.prefix + fmt(obj.v, m.comma);
            },
            // Lime "ignite" as each number locks in.
            onComplete: () => {
              gsap.fromTo(
                el,
                { color: "#c8ff00" },
                { color: "#ededed", duration: 0.7, ease: "power2.out" }
              );
            },
          });
        });
      };

      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            io.disconnect();
            const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
            tl.to(".impact-line", { yPercent: 0, duration: 1.0, stagger: 0.1 })
              .set(".impact-mask", { overflow: "visible" })
              .to(
                ".stat-block",
                { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power3.out" },
                "-=0.5"
              )
              .add(startCounts, "-=0.35");
          }
        },
        { threshold: 0.35 }
      );
      io.observe(section);

      return () => io.disconnect();
    }, section);

    return () => {
      // ctx.revert() handles this component's tweens only. Never getAll().kill().
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#070707] px-6 py-28 md:py-40"
    >
      {/* Deep-night vignette for cinematic depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 40%, transparent 55%, rgba(0,0,0,0.75) 100%)",
        }}
      />

      <div className="relative mx-auto max-w-[1400px]">
        <p className="mb-8 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.3em] text-[#666]">
          By the numbers
        </p>

        {/* Masked kinetic headline */}
        <h2 className="font-[family-name:var(--font-display)] text-[#ededed] text-5xl font-bold leading-[0.95] tracking-tight sm:text-6xl md:text-7xl">
          <span className="impact-mask block" style={MASK_STYLE}>
            <span className="impact-line block">The numbers</span>
          </span>
          <span className="impact-mask block" style={MASK_STYLE}>
            <span className="impact-line block">
              held <span className="text-[#c8ff00]">under load.</span>
            </span>
          </span>
        </h2>

        <p className="mt-6 max-w-[46ch] font-[family-name:var(--font-body)] text-base text-[#888] md:text-lg">
          Measured in production — real systems under real traffic.
        </p>

        {/* Featured production stats — count up + ignite lime */}
        <div className="mt-20 grid grid-cols-1 gap-y-14 md:grid-cols-3 md:gap-y-0">
          {featured.map((m, i) => (
            <div
              key={m.label}
              className={`stat-block ${
                i > 0 ? "md:border-l md:border-[#1c1c1c] md:pl-10" : ""
              }`}
            >
              <p className="font-[family-name:var(--font-display)] font-bold leading-none tracking-tight text-[#ededed] text-[clamp(3.5rem,8vw,6.5rem)]">
                <span className="stat-val">{m.prefix}0</span>
                <span className="text-[#c8ff00]">{m.suffix}</span>
              </p>
              <p className="mt-5 max-w-[22ch] font-[family-name:var(--font-mono)] text-xs leading-relaxed text-[#777]">
                {m.label}
              </p>
            </div>
          ))}
        </div>

        {/* Quiet context strip */}
        <p className="mt-20 font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-[#555]">
          3 years coding · 7 projects shipped
        </p>
      </div>

      {/* The page's single marquee — metric phrases drifting in outline type */}
      <div className="marquee relative mt-24 py-4" aria-hidden>
        <div className="marquee__track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className="mx-8 font-[family-name:var(--font-display)] text-4xl font-bold uppercase tracking-tight text-transparent md:text-6xl"
              style={{ WebkitTextStroke: "1px #242424" }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
