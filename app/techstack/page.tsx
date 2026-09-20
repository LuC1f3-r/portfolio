"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiHtml5,
  SiCss3,
  SiReact,
  SiNextdotjs,
  SiNestjs,
  SiNodedotjs,
  SiFlask,
  SiTailwindcss,
  SiDocker,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiApachekafka,
  SiGit,
  SiLinux,
  SiAmazon,
} from "react-icons/si";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type IconComponent = React.ComponentType<{ size?: number; className?: string }>;
type TechItem = { icon: IconComponent | null; name: string };

const techCategories: { title: string; items: TechItem[] }[] = [
  {
    title: "Languages",
    items: [
      { icon: SiJavascript, name: "JavaScript" },
      { icon: SiTypescript, name: "TypeScript" },
      { icon: SiPython, name: "Python" },
      { icon: SiHtml5, name: "HTML5" },
      { icon: SiCss3, name: "CSS3" },
    ],
  },
  {
    title: "Frameworks",
    items: [
      { icon: SiReact, name: "React" },
      { icon: SiNextdotjs, name: "Next.js" },
      { icon: SiNestjs, name: "NestJS" },
      { icon: SiNodedotjs, name: "Node.js" },
      { icon: SiFlask, name: "Flask" },
      { icon: SiTailwindcss, name: "Tailwind" },
    ],
  },
  {
    title: "Infrastructure",
    items: [
      { icon: SiDocker, name: "Docker" },
      { icon: SiPostgresql, name: "PostgreSQL" },
      { icon: SiMongodb, name: "MongoDB" },
      { icon: SiRedis, name: "Redis" },
      { icon: SiApachekafka, name: "Kafka" },
      { icon: null, name: "AWS SQS" },
      { icon: SiGit, name: "Git" },
      { icon: SiLinux, name: "Linux" },
      { icon: SiAmazon, name: "AWS" },
    ],
  },
];

export default function TechStack() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(".tech-name", {
        y: 24,
        opacity: 0,
        duration: 0.6,
        stagger: 0.03,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 70%" },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    // The one DAY beat low on the page — light, airy, a palette cleanser
    // between two dark sections.
    <section
      ref={sectionRef}
      className="w-full bg-[#f4f4f0] px-6 py-32 text-[#111] md:py-48"
    >
      <div className="mx-auto max-w-[1400px]">
        <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.3em] text-[#888]">
          Stack
        </p>
        <h2 className="mt-5 max-w-[16ch] font-[family-name:var(--font-display)] text-5xl font-bold leading-[0.95] tracking-tight text-[#111] md:text-7xl">
          Tools I build with.
        </h2>

        <div className="mt-20 space-y-14">
          {techCategories.map((category) => (
            <div
              key={category.title}
              className="grid grid-cols-1 gap-4 border-t border-[#111]/10 pt-8 md:grid-cols-[10rem_1fr] md:gap-10"
            >
              <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.2em] text-[#999]">
                {category.title}
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-3">
                {category.items.map((item) => (
                  <span
                    key={item.name}
                    className="tech-name inline-flex items-center gap-2 px-1.5 py-0.5 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[#1a1a1a] transition-colors duration-200 hover:bg-[#c8ff00] hover:text-[#0a0a0a] md:text-4xl"
                  >
                    {item.icon && <item.icon size={22} className="opacity-70" />}
                    {item.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
