"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const sections = [
  { id: "home", label: "01" },
  { id: "about", label: "02" },
  { id: "experience", label: "03" },
  { id: "projects", label: "04" },
  { id: "techstack", label: "05" },
  { id: "contacts", label: "06" },
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
      <div className="absolute right-[11px] top-0 w-[2px] h-full bg-[#1a1a1a] rounded-full" />

      {/* Progress line fill */}
      <motion.div
        className="absolute right-[11px] top-0 w-[2px] bg-[#c8ff00] rounded-full origin-top"
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
                  ? "border-[#c8ff00] bg-[#c8ff00]"
                  : isPast
                  ? "border-[#c8ff00]/40 bg-[#c8ff00]/10"
                  : "border-[#333] bg-[#0a0a0a]"
              }`}
              whileHover={{ scale: 1.2 }}
            >
              {isActive && (
                <motion.div
                  layoutId="activeDot"
                  className="w-2 h-2 bg-black rounded-full"
                />
              )}
            </motion.div>

            {/* Label on hover */}
            <motion.span
              initial={{ opacity: 0, x: 10 }}
              whileHover={{ opacity: 1, x: 0 }}
              className="absolute right-10 text-xs font-[family-name:var(--font-mono)] text-[#888] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
            >
              {label} — {id.charAt(0).toUpperCase() + id.slice(1)}
            </motion.span>
          </button>
        );
      })}

      {/* Current section indicator */}
      <div className="mt-4 text-xs font-[family-name:var(--font-mono)] text-[#888]">
        {String(sections.findIndex((s) => s.id === activeSection) + 1).padStart(2, "0")}
        <span className="text-[#333]">/</span>
        {String(sections.length).padStart(2, "0")}
      </div>
    </motion.div>
  );
}
