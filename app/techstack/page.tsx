"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss3,
  SiPython,
  SiReact,
  SiNextdotjs,
  SiNestjs,
  SiNodedotjs,
  SiFlask,
  SiDocker,
  SiPostgresql,
  SiMongodb,
  SiGit,
  SiLinux,
  SiRedis,
  SiTailwindcss,
  SiAmazon,
} from "react-icons/si";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const techCategories = [
  {
    title: "Languages",
    items: [
      { icon: SiJavascript, name: "JavaScript", color: "#F7DF1E" },
      { icon: SiTypescript, name: "TypeScript", color: "#3178C6" },
      { icon: SiPython, name: "Python", color: "#3776AB" },
      { icon: SiHtml5, name: "HTML5", color: "#E34F26" },
      { icon: SiCss3, name: "CSS3", color: "#1572B6" },
    ],
  },
  {
    title: "Frameworks",
    items: [
      { icon: SiReact, name: "React", color: "#61DAFB" },
      { icon: SiNextdotjs, name: "Next.js", color: "#ffffff" },
      { icon: SiNestjs, name: "NestJS", color: "#E0234E" },
      { icon: SiNodedotjs, name: "Node.js", color: "#339933" },
      { icon: SiFlask, name: "Flask", color: "#ffffff" },
      { icon: SiTailwindcss, name: "Tailwind", color: "#06B6D4" },
    ],
  },
  {
    title: "Infrastructure",
    items: [
      { icon: SiDocker, name: "Docker", color: "#2496ED" },
      { icon: SiPostgresql, name: "PostgreSQL", color: "#4169E1" },
      { icon: SiMongodb, name: "MongoDB", color: "#47A248" },
      { icon: SiRedis, name: "Redis", color: "#DC382D" },
      { icon: SiGit, name: "Git", color: "#F05032" },
      { icon: SiLinux, name: "Linux", color: "#FCC624" },
      { icon: SiAmazon, name: "AWS", color: "#FF9900" },
    ],
  },
];

const StarsBackground = () => {
  const [stars, setStars] = useState<
    { size: number; left: number; top: number; duration: number }[]
  >([]);

  useEffect(() => {
    setStars(
      Array.from({ length: 60 }).map(() => ({
        size: Math.random() * 2 + 0.5,
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: Math.random() * 3 + 2,
      }))
    );
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {stars.map((star, i) => (
        <motion.div
          key={i}
          className="absolute bg-white rounded-full"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            left: `${star.left}%`,
            top: `${star.top}%`,
            filter: "drop-shadow(0 0 4px #fff)",
          }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const TechStack = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!categoriesRef.current) return;

    const categories = categoriesRef.current.querySelectorAll(".tech-category");

    categories.forEach((category, i) => {
      const items = category.querySelectorAll(".tech-item");
      
      gsap.fromTo(
        items,
        { y: 40, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: category,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          delay: i * 0.2,
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full py-24 px-6 bg-zinc-950 text-zinc-100 flex flex-col items-center overflow-hidden"
    >
      <StarsBackground />

      {/* Section indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 mb-6"
      >
        <span className="text-xs font-mono text-purple-500 tracking-widest uppercase">
          // 06. Tech Stack
        </span>
      </motion.div>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 text-4xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 mb-6 text-center"
      >
        Tech Arsenal
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative z-10 text-zinc-400 text-lg text-center mb-16"
      >
        Tools, languages, and frameworks I work with daily.
      </motion.p>

      {/* Categories */}
      <div ref={categoriesRef} className="relative z-10 max-w-5xl w-full space-y-12">
        {techCategories.map((category, catIdx) => (
          <div key={catIdx} className="tech-category">
            <h3 className="text-sm font-mono text-purple-400 uppercase tracking-wider mb-6 flex items-center gap-3">
              <span className="w-8 h-px bg-gradient-to-r from-purple-500 to-transparent" />
              {category.title}
            </h3>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-4">
              {category.items.map(({ icon: Icon, name, color }, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="tech-item group flex flex-col items-center justify-center p-4 bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-xl transition-all duration-300 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10 cursor-pointer"
                >
                  <Icon
                    size={32}
                    className="transition-all duration-300 group-hover:scale-110"
                    style={{ color: color }}
                  />
                  <span className="mt-2 text-xs text-zinc-500 group-hover:text-zinc-300 transition-colors text-center">
                    {name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Decorative gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
};

export default TechStack;
