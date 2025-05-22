"use client";

import { useEffect, useState } from "react";
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
    const fadeTimer = setTimeout(() => setFadeOut(true), 4500); // Start fade after 2.5s
    const hideTimer = setTimeout(() => setShowHero(false), 5000); // Hide after 3s
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  // if (showHero) {
  //   return (
  //     <main
  //       className={`flex items-center justify-center w-full h-screen transition-opacity duration-500 ${
  //         fadeOut ? "opacity-0" : "opacity-100"
  //       }`}
  //     >
  //       <Hero />
  //     </main>
  //   );
  // }

  return (
    <main className="flex flex-col items-center justify-center w-full">
      <Hero />
      <About />
      <Services />
      <Experience />
    </main>
  );
}
