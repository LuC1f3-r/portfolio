"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/app/components/Navbar";
import Typewriter from "./components/Loader";
import Hero from "@/app/components/Hero";
import About from "@/app/about/page";
import Experience from "./experience/page";
import Projects from "@/app/projects/page";
import Services from "@/app/services/page";
import TechStack from "@/app/techstack/page";
import Contact from "@/app/contacts/page";

export default function Home() {
  const [showHero, setShowHero] = useState(true);

  useEffect(() => {
    const hideTimer = setTimeout(() => setShowHero(false), 5000);
    return () => clearTimeout(hideTimer);
  }, []);

  // Show loading animation splash screen on reload
  if (showHero) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black text-green-400 font-mono px-4">
        <motion.div
          className="text-lg md:text-2xl leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 7, ease: "easeInOut" }}
          exit={{ opacity: 0, transition: { duration: 10 } }}
        >
          <Typewriter onComplete={() => setShowHero(false)} />
        </motion.div>
      </div>
    );
  }

  // Main content with all sections
  return (
    <div className="relative w-full">
      <Navbar />
      {/* Add padding-top to account for fixed navbar */}
      <main className="w-full">
        {/* Each section should have proper spacing and IDs for navigation */}
        <section id="home" className="min-h-screen">
          <Hero />
        </section>

        <section id="about" className="min-h-screen">
          <About />
        </section>

        <section id="experience" className="min-h-screen">
          <Experience />
        </section>

        <section id="projects" className="min-h-screen">
          <Projects />
        </section>

        <section id="services" className="min-h-screen">
          <Services />
        </section>

        <section id="techstack" className="min-h-screen">
          <TechStack />
        </section>

        <section id="contacts" className="min-h-screen">
          <Contact />
        </section>
      </main>
    </div>
  );
}
