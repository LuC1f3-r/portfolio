"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const sections = [
  { id: "home", label: "01" },
  { id: "about", label: "02" },
  { id: "experience", label: "03" },
  { id: "projects", label: "04" },
  { id: "services", label: "05" },
  { id: "techstack", label: "06" },
  { id: "contacts", label: "07" },
];

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show after a delay
    const showTimer = setTimeout(() => setIsVisible(true), 100);

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setProgress(scrollPercent);

      // Determine active section
      sections.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            setActiveSection(id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      clearTimeout(showTimer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 20 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-1"
    >
      {/* Progress line background */}
      <div className="absolute right-[11px] top-0 w-[2px] h-full bg-zinc-800 rounded-full" />
      
      {/* Progress line fill */}
      <motion.div
        className="absolute right-[11px] top-0 w-[2px] bg-gradient-to-b from-purple-500 to-pink-500 rounded-full origin-top"
        style={{ height: `${progress}%` }}
      />

      {/* Section dots */}
      {sections.map(({ id, label }, index) => {
        const isActive = activeSection === id;
        const isPast = sections.findIndex((s) => s.id === activeSection) > index;

        return (
          <button
            key={id}
            onClick={() => scrollToSection(id)}
            className="group relative flex items-center py-3"
          >
            {/* Dot */}
            <motion.div
              className={`w-6 h-6 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                isActive
                  ? "border-purple-500 bg-purple-500"
                  : isPast
                  ? "border-purple-500/50 bg-purple-500/20"
                  : "border-zinc-600 bg-zinc-900"
              }`}
              whileHover={{ scale: 1.2 }}
            >
              {isActive && (
                <motion.div
                  layoutId="activeDot"
                  className="w-2 h-2 bg-white rounded-full"
                />
              )}
            </motion.div>

            {/* Label on hover */}
            <motion.span
              initial={{ opacity: 0, x: 10 }}
              whileHover={{ opacity: 1, x: 0 }}
              className="absolute right-10 text-xs font-mono text-zinc-400 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
            >
              {label} — {id.charAt(0).toUpperCase() + id.slice(1)}
            </motion.span>
          </button>
        );
      })}

      {/* Current section indicator */}
      <div className="mt-4 text-xs font-mono text-zinc-500">
        {String(sections.findIndex((s) => s.id === activeSection) + 1).padStart(2, "0")}
        <span className="text-zinc-700">/</span>
        {String(sections.length).padStart(2, "0")}
      </div>
    </motion.div>
  );
}
