"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Github } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const projects = [
  {
    name: "Serpico",
    description:
      "A framework that fuses data extraction and analytical capabilities into one powerful pipeline. Built for scalability and real-time processing.",
    link: "https://github.com/LuC1f3-r/Serpico-TK",
    tags: ["Python", "Data Pipeline", "Analytics"],
    featured: true,
  },
  {
    name: "URL Shortener",
    description:
      "Fast and scalable URL shortener with tracking and analytics — built for heavy traffic scenarios with Redis caching.",
    link: "https://github.com/LuC1f3-r/url-shortener",
    tags: ["Node.js", "Redis", "PostgreSQL"],
    featured: true,
  },
  {
    name: "Self Driving Car",
    description:
      "Browser-based JS simulation with neural networks that mimic autonomous driving logic using machine learning.",
    link: "https://github.com/LuC1f3-r/Self-Driving-Car",
    tags: ["JavaScript", "ML", "Canvas"],
    featured: false,
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardsRef.current) return;

    const cards = cardsRef.current.querySelectorAll(".project-card");

    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { 
          y: 100, 
          opacity: 0,
          rotateX: -10,
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          delay: i * 0.1,
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <main
      ref={sectionRef}
      className="min-h-screen w-full py-24 px-6 bg-gradient-to-br from-black via-zinc-900 to-purple-950/30 flex flex-col items-center overflow-hidden"
    >
      {/* Section indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-6"
      >
        <span className="text-xs font-mono text-purple-500 tracking-widest uppercase">
          // 04. Projects
        </span>
      </motion.div>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-6 text-center"
      >
        Featured Work
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-zinc-400 text-lg text-center max-w-2xl mb-16"
      >
        Projects crafted with passion, focused on performance, scalability, and creativity.
      </motion.p>

      {/* Projects Grid */}
      <div
        ref={cardsRef}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl w-full"
      >
        {projects.map((project, idx) => (
          <div
            key={idx}
            className="project-card group relative bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl p-8 transition-all duration-500 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/10"
            style={{ perspective: "1000px" }}
          >
            {/* Featured badge */}
            {project.featured && (
              <div className="absolute -top-3 -right-3 px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-xs font-bold text-white shadow-lg">
                Featured
              </div>
            )}

            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 via-transparent to-pink-500/5" />
            </div>

            {/* Content */}
            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">
                  {project.name}
                </h3>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-zinc-500 hover:text-purple-400 transition-colors"
                  aria-label={`View ${project.name} on GitHub`}
                >
                  <Github size={20} />
                </a>
              </div>

              {/* Description */}
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs font-mono text-purple-400 bg-purple-500/10 border border-purple-500/20 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Link */}
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-purple-400 hover:text-pink-400 transition-colors group/link"
              >
                <span>View Project</span>
                <ExternalLink
                  size={14}
                  className="transition-transform group-hover/link:translate-x-1"
                />
              </a>
            </div>

            {/* Bottom glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
          </div>
        ))}
      </div>

      {/* View more link */}
      <motion.a
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        href="https://github.com/LuC1f3-r"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-12 inline-flex items-center gap-2 text-zinc-400 hover:text-purple-400 transition-colors"
      >
        <span className="text-sm font-mono">View all on GitHub</span>
        <ExternalLink size={14} />
      </motion.a>
    </main>
  );
}