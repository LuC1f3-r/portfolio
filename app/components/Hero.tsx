"use client";

import { useEffect, useRef } from "react";
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

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineOneRef = useRef<HTMLSpanElement>(null);
  const lineTwoRef = useRef<HTMLSpanElement>(null);
  const igniteRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      // Final, fully visible state, no scroll-driven motion.
      gsap.set(section, { backgroundColor: "#000000" });
      if (lineOneRef.current) gsap.set(lineOneRef.current, { x: 0 });
      if (lineTwoRef.current) gsap.set(lineTwoRef.current, { x: 0 });
      if (igniteRef.current) gsap.set(igniteRef.current, { color: "#c8ff00" });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      tl.fromTo(
        section,
        { backgroundColor: "#0a0a0a" },
        { backgroundColor: "#000000", ease: "none" },
        0
      );

      if (lineOneRef.current) {
        tl.to(lineOneRef.current, { x: "-2.5%", ease: "none" }, 0);
      }

      if (lineTwoRef.current) {
        tl.to(lineTwoRef.current, { x: "2.5%", ease: "none" }, 0);
      }

      if (igniteRef.current) {
        tl.to(igniteRef.current, { color: "#c8ff00", ease: "none" }, 0.15);
      }
    }, section);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleViewWork = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0a] px-6"
    >
      {/* Static ghost monogram (the glitch reveal now lives in the loader) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 grid place-items-center"
      >
        <span className="font-[family-name:var(--font-mono)] text-[26vw] font-bold leading-none tracking-tighter text-[#131313] md:text-[20vw]">
          LuC1f3-r
        </span>
      </div>

      <div className="relative z-10 flex w-full max-w-[1400px] flex-col items-center text-center">
        {/* Name */}
        <h1 className="font-[family-name:var(--font-display)] text-[#ededed] leading-[0.92] tracking-tight">
          <span
            ref={lineOneRef}
            className="block text-[14vw] sm:text-[12vw] md:text-[9vw] lg:text-[7.5vw]"
          >
            Niyaz Ahamad
          </span>
          <span
            ref={lineTwoRef}
            className="block text-[14vw] sm:text-[12vw] md:text-[9vw] lg:text-[7.5vw]"
          >
            <span ref={igniteRef} className="text-[#ededed]">
              Herkal
            </span>
          </span>
        </h1>

        {/* Roles */}
        <p className="mt-10 font-[family-name:var(--font-mono)] text-xs sm:text-sm md:text-base text-[#888] tracking-wide">
          Backend Engineer
          <span className="text-[#c8ff00]"> &middot; </span>
          Microservices &amp; Event-Driven Systems
          <span className="text-[#c8ff00]"> &middot; </span>
          AWS Cloud
        </p>

        {/* Tagline */}
        <p className="mt-4 max-w-[40ch] font-[family-name:var(--font-body)] text-sm sm:text-base text-[#888]">
          Full-time developer by day, freelancer &amp; explorer by night.
        </p>

        {/* Social links */}
        <div className="mt-10 flex items-center gap-6 font-[family-name:var(--font-mono)]">
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-lg text-[#888] transition-colors duration-300 hover:text-[#c8ff00]"
            >
              <Icon />
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#projects"
          onClick={handleViewWork}
          className="mt-12 inline-flex items-center gap-2 border border-[#333] px-6 py-3 font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.18em] text-[#ededed] transition-colors duration-300 hover:border-[#c8ff00] hover:text-[#c8ff00]"
        >
          View my work
        </a>
      </div>
    </section>
  );
}
