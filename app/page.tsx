"use client";

import { useEffect, useState } from "react";
import Navbar from "@/app/components/Navbar"; // Adjust the import path as needed
import Hero from "@/app/components/Hero";
import About from "@/app/about/page";
import Experience from "./experience/page";
import Projects from "@/app/projects/page";
import Services from "@/app/services/page";
import TechStack from "@/app/techstack/page";
import Contact from "@/app/contacts/page";

export default function Home() {
  const [showHero, setShowHero] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 4500);
    const hideTimer = setTimeout(() => setShowHero(false), 5000);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  // Hero splash screen with Navbar
  // if (showHero) {
  //   return (
  //     <div className="relative w-full h-screen overflow-hidden">
  //       <Navbar />
  //       <main className="flex items-center justify-center w-full h-full">
  //         <div
  //           className={`flex items-center justify-center w-full h-full transition-opacity duration-500 ${
  //             fadeOut ? "opacity-0" : "opacity-100"
  //           }`}
  //         >
  //           <Hero />
  //         </div>
  //       </main>
  //     </div>
  //   );
  // }

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
