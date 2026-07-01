"use client";

import { useEffect, useState } from "react";
import StoryLoader from "@/app/components/StoryLoader";
import SmoothScroll from "@/app/components/SmoothScroll";
import SectionTransition from "@/app/components/SectionTransition";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import Hero from "@/app/components/Hero";
import About from "@/app/about/page";
import Impact from "@/app/components/Impact";
import Experience from "./experience/page";
import Projects from "@/app/projects/page";
import TechStack from "@/app/techstack/page";
import Contact from "@/app/contacts/page";

export default function Home() {
  const [showLoader, setShowLoader] = useState(true);
  const [isReady, setIsReady] = useState(false);

  const handleLoaderComplete = () => {
    setShowLoader(false);
    // Small delay before enabling content
    setTimeout(() => setIsReady(true), 300);
  };

  // Prevent scroll during loading
  useEffect(() => {
    if (showLoader) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showLoader]);

  return (
    <>
      {/* Cinematic Loader */}
      {showLoader && <StoryLoader onComplete={handleLoaderComplete} />}

      {/* Main Content */}
      <SmoothScroll>
        <div 
          className={`relative w-full transition-opacity duration-700 ${
            isReady ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Navigation */}
          <Navbar />

          <main className="w-full">
            {/* Hero Section */}
            <section id="home" className="min-h-screen">
              <Hero />
            </section>

            {/* About Section */}
            <SectionTransition id="about" transitionType="maskReveal">
              <About />
            </SectionTransition>

            {/* Impact Section */}
            <SectionTransition id="impact" transitionType="fade">
              <Impact />
            </SectionTransition>

            {/* Experience Section */}
            <SectionTransition id="experience" transitionType="slideUp">
              <Experience />
            </SectionTransition>

            {/* Projects Section */}
            <SectionTransition id="projects" transitionType="slideUp">
              <Projects />
            </SectionTransition>

            {/* TechStack Section */}
            <SectionTransition id="techstack" transitionType="fade">
              <TechStack />
            </SectionTransition>

            {/* Contact Section */}
            <SectionTransition id="contacts" transitionType="fade">
              <Contact />
            </SectionTransition>
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </SmoothScroll>
    </>
  );
}
