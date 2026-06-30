"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const [open, setOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Title animation
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Text animation
    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Skills animation
    if (skillsRef.current) {
      const bars = skillsRef.current.querySelectorAll(".skill-bar");
      gsap.fromTo(
        bars,
        { scaleX: 0, transformOrigin: "left" },
        {
          scaleX: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === section || trigger.vars.trigger === skillsRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);

  const skills = [
    { label: "Backend Development", value: 90, color: "from-purple-500 to-violet-600" },
    { label: "System Design", value: 85, color: "from-violet-500 to-purple-600" },
    { label: "DevOps & Cloud", value: 80, color: "from-pink-500 to-purple-600" },
    { label: "Frontend Development", value: 75, color: "from-purple-500 to-pink-500" },
  ];

  return (
    <section
      ref={sectionRef}
      className="w-full min-h-screen py-24 px-6 flex flex-col items-center bg-gradient-to-br from-zinc-950 via-zinc-900 to-black text-zinc-100 overflow-hidden"
    >
      {/* Section indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-6"
      >
        <span className="text-xs font-mono text-purple-500 tracking-widest uppercase">
          // 01. About
        </span>
      </motion.div>

      {/* Title */}
      <h2
        ref={titleRef}
        className="text-4xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 mb-16 text-center"
      >
        Who am I?
      </h2>

      {/* Two Column Layout */}
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left: Story Text */}
        <div ref={textRef} className="space-y-8">
          <div className="inline-block px-3 py-1 bg-purple-500/10 border border-purple-500/30 rounded-full mb-4">
            <span className="text-purple-400 text-xs font-mono">~/luc1f3r/about</span>
          </div>

          <p className="text-lg md:text-xl text-zinc-300 leading-relaxed">
            Hi, I am{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-bold">
              Niyaz Ahamad Herkal
            </span>{" "}
            (a.k.a{" "}
            <span className="text-purple-400 font-mono font-bold">LuC1f3-r</span>
            ). I engineer resilient systems with an obsession for{" "}
            <span className="text-purple-300 font-semibold">uptime</span>,{" "}
            <span className="text-purple-300 font-semibold">scalability</span>, and{" "}
            <span className="text-purple-300 font-semibold">chaos resistance</span>.
          </p>

          <p className="text-lg text-zinc-400 leading-relaxed">
            I thrive in fast-paced environments, love solving complex problems, and
            enjoy collaborating with teams to deliver high-impact solutions. When I&apos;m
            not coding, you&apos;ll find me exploring new tech, contributing to open source,
            or gaming.
          </p>

          {/* CTA Button */}
          <div className="relative inline-block">
            <button
              onClick={() => setOpen(!open)}
              className="relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold text-white overflow-hidden group transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30"
            >
              <span className="relative z-10">Download CV</span>
              <motion.span
                animate={{ rotate: open ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="relative z-10"
              >
                ↓
              </motion.span>
            </button>

            {/* Dropdown */}
            <motion.div
              initial={false}
              animate={{ 
                opacity: open ? 1 : 0,
                y: open ? 0 : -10,
                pointerEvents: open ? "auto" : "none"
              }}
              className="absolute mt-3 w-60 rounded-xl backdrop-blur-md border border-purple-500/30 shadow-xl bg-zinc-900/90 text-white overflow-hidden z-50"
            >
              <a
                href="/assets/niyazahamadherkal-dark.pdf"
                download
                className="flex items-center gap-3 w-full px-5 py-3 text-sm hover:bg-purple-500/10 transition-colors"
              >
                <span className="text-xl">🥷🏼</span>
                <span>Dark Theme</span>
              </a>
              <a
                href="/assets/niyazahamadherkal-light.pdf"
                download
                className="flex items-center gap-3 w-full px-5 py-3 text-sm hover:bg-purple-500/10 transition-colors"
              >
                <span className="text-xl">🧝🏻‍♂️</span>
                <span>Light Theme</span>
              </a>
            </motion.div>
          </div>
        </div>

        {/* Right: Skills */}
        <div ref={skillsRef} className="space-y-6">
          <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
            <span className="w-8 h-px bg-gradient-to-r from-purple-500 to-transparent" />
            Core Competencies
          </h3>

          {skills.map((skill, i) => (
            <div key={i} className="group">
              <div className="flex justify-between mb-2">
                <span className="text-zinc-300 group-hover:text-white transition-colors">
                  {skill.label}
                </span>
                <span className="text-purple-400 font-mono text-sm">
                  {skill.value}%
                </span>
              </div>
              <div className="relative w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className={`skill-bar absolute inset-y-0 left-0 bg-gradient-to-r ${skill.color} rounded-full`}
                  style={{ width: `${skill.value}%` }}
                />
                {/* Glow effect */}
                <div
                  className={`skill-bar absolute inset-y-0 left-0 bg-gradient-to-r ${skill.color} rounded-full blur-sm opacity-50`}
                  style={{ width: `${skill.value}%` }}
                />
              </div>
            </div>
          ))}

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-zinc-800">
            {[
              { value: "3+", label: "Years Exp" },
              { value: "10+", label: "Projects" },
              { value: "98%", label: "Uptime" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  {stat.value}
                </div>
                <div className="text-xs text-zinc-500 font-mono mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
