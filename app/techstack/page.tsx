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

type IconComponent = React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>;

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

function TechEntry({ item }: { item: TechItem }) {
  const entryRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    const el = entryRef.current;
    if (!el) return;
    el.querySelectorAll<HTMLElement>(".tech-icon, .tech-label").forEach((node) => {
      node.style.color = "#c8ff00";
    });
  };

  const handleMouseLeave = () => {
    const el = entryRef.current;
    if (!el) return;
    el.querySelectorAll<HTMLElement>(".tech-icon, .tech-label").forEach((node) => {
      node.style.color = "#888";
    });
  };

  return (
    <div
      ref={entryRef}
      className="tech-entry flex items-center gap-2 cursor-default"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {item.icon !== null && (
        <item.icon
          size={13}
          className="flex-shrink-0 transition-colors duration-200 tech-icon"
          style={{ color: "#888" }}
        />
      )}
      <span
        className="tech-label text-sm leading-none transition-colors duration-200"
        style={{
          fontFamily: "var(--font-mono)",
          color: "#888",
        }}
      >
        {item.name}
      </span>
    </div>
  );
}

export default function TechStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      rowRefs.current.forEach((row) => {
        if (row) {
          const items = row.querySelectorAll<HTMLElement>(".tech-entry");
          gsap.set(items, { y: 0, opacity: 1 });
        }
      });
      return;
    }

    const ctx = gsap.context(() => {
      rowRefs.current.forEach((row) => {
        if (!row) return;
        const items = row.querySelectorAll<HTMLElement>(".tech-entry");
        gsap.fromTo(
          items,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.06,
            ease: "power2.out",
            scrollTrigger: {
              trigger: row,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full py-24 px-6 md:px-12 lg:px-24"
    >
      <div className="max-w-4xl mx-auto">
        {/* Kicker */}
        <p
          className="text-xs tracking-[0.2em] uppercase mb-4"
          style={{
            fontFamily: "var(--font-mono)",
            color: "var(--fg-muted)",
          }}
        >
          {`// 06`}
        </p>

        {/* Title */}
        <h2
          className="text-5xl sm:text-6xl md:text-7xl font-black mb-16 leading-none"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--fg)",
          }}
        >
          Stack
        </h2>

        {/* Categories */}
        <div>
          {techCategories.map((category, catIdx) => (
            <div
              key={catIdx}
              ref={(el) => { rowRefs.current[catIdx] = el; }}
              className="border-t py-10"
              style={{ borderColor: "#1a1a1a" }}
            >
              {/* Category label */}
              <p
                className="text-xs tracking-[0.15em] uppercase mb-8"
                style={{
                  fontFamily: "var(--font-mono)",
                  color: "var(--fg-muted)",
                }}
              >
                {category.title}
              </p>

              {/* Items */}
              <div className="flex flex-wrap gap-x-8 gap-y-5">
                {category.items.map((item, idx) => (
                  <TechEntry key={idx} item={item} />
                ))}
              </div>
            </div>
          ))}

          {/* Bottom border */}
          <div className="border-t" style={{ borderColor: "#1a1a1a" }} />
        </div>
      </div>
    </section>
  );
}
