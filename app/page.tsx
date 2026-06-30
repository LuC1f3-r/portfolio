"use client";

import { useEffect, useState } from "react";
import StoryLoader from "@/app/components/StoryLoader";
import SmoothScroll from "@/app/components/SmoothScroll";
import ScrollProgress from "@/app/components/ScrollProgress";
import SectionTransition from "@/app/components/SectionTransition";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import Hero from "@/app/components/Hero";
import About from "@/app/about/page";
import Experience from "./experience/page";
import Projects from "@/app/projects/page";
import Services from "@/app/services/page";
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
          
          {/* Scroll Progress Indicator */}
          <ScrollProgress />

          <main className="w-full">
            {/* Hero Section */}
            <section id="home" className="min-h-screen">
              <Hero />
            </section>

            {/* About Section */}
            <SectionTransition id="about" transitionType="maskReveal">
              <About />
            </SectionTransition>

            {/* Experience Section */}
            <SectionTransition id="experience" transitionType="diagonalWipe">
              <Experience />
            </SectionTransition>

            {/* Projects Section */}
            <SectionTransition id="projects" transitionType="slideUp">
              <Projects />
            </SectionTransition>

            {/* Services Section */}
            <SectionTransition id="services" transitionType="scaleIn">
              <Services />
            </SectionTransition>

            {/* TechStack Section */}
            <SectionTransition id="techstack" transitionType="maskReveal">
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
