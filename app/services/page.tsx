"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code, Server, MonitorSmartphone, Activity, Lock, Wand2 } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const services = [
    {
      title: "Backend Engineering",
      icon: Server,
      description:
        "I build scalable, high-performance APIs and systems using Node.js, Flask, PostgreSQL, Redis, and more.",
      gradient: "from-purple-500 to-violet-600",
    },
    {
      title: "Frontend Development",
      icon: MonitorSmartphone,
      description:
        "React, Next.js, Tailwind — I craft responsive UI components and performant frontend systems.",
      gradient: "from-violet-500 to-purple-600",
    },
    {
      title: "DevOps & Deployment",
      icon: Activity,
      description:
        "CI/CD pipelines, Docker, GitHub Actions, Linux — I ship production-ready systems with zero-downtime deployments.",
      gradient: "from-pink-500 to-purple-600",
    },
    {
      title: "Cybersecurity",
      icon: Lock,
      description:
        "Hardened backends, secure architecture, and good opsec practices — security baked into every layer.",
      gradient: "from-purple-600 to-pink-500",
    },
    {
      title: "Automation & Scripting",
      icon: Wand2,
      description:
        "Custom bots, automation tools, data pipelines — I automate the boring to focus on scale.",
      gradient: "from-violet-600 to-purple-500",
    },
    {
      title: "System Design",
      icon: Code,
      description:
        "I design fault-tolerant, modular systems optimized for uptime, scalability, and observability.",
      gradient: "from-purple-500 to-pink-600",
    },
  ];

  useEffect(() => {
    if (!gridRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll(".service-card");
      if (!cards || cards.length === 0) return;

      gsap.fromTo(
        cards,
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, gridRef);

    return () => ctx.revert();
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
          {"// 05. Services"}
        </span>
      </motion.div>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-16 text-center"
      >
        What I Do
      </motion.h2>

      {/* Services Grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full"
      >
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <div
              key={index}
              className="service-card group relative bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6 transition-all duration-300 hover:border-purple-500/50 hover:bg-zinc-900/80 overflow-hidden"
            >
              {/* Background gradient on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
              />

              {/* Icon */}
              <div
                className={`relative z-10 w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} p-0.5 mb-4`}
              >
                <div className="w-full h-full bg-zinc-900 rounded-xl flex items-center justify-center">
                  <Icon
                    size={22}
                    className="text-purple-400 group-hover:text-white transition-colors"
                  />
                </div>
              </div>

              {/* Content */}
              <h3 className="relative z-10 text-lg font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                {service.title}
              </h3>
              <p className="relative z-10 text-sm text-zinc-400 leading-relaxed">
                {service.description}
              </p>

              {/* Hover indicator */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 group-hover:opacity-50 transition-opacity" />
            </div>
          );
        })}
      </div>
    </main>
  );
}
