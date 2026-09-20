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
  // `play` fires the hero intro choreography the instant the loader hands off.
  const [play, setPlay] = useState(false);
  // Scroll stays locked through the loader AND the intro reveal, so the
  // choreographed moment can't be scrolled through.
  const [locked, setLocked] = useState(true);

  const handleLoaderComplete = () => {
    setShowLoader(false);
    setPlay(true);
    // Release scroll once the intro sequence has played out.
    window.setTimeout(() => setLocked(false), 1600);
  };

  useEffect(() => {
    document.body.style.overflow = locked ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [locked]);

  return (
    <>
      {/* Cinematic Loader */}
      {showLoader && <StoryLoader onComplete={handleLoaderComplete} />}

      {/* Main Content — always mounted so the hero can pre-stage its intro
          behind the loader, then reveal the instant the curtain irises away. */}
      <SmoothScroll>
        <div className="relative w-full">
          {/* Navigation */}
          <Navbar />

          <main className="w-full">
            {/* Hero Section */}
            <section id="home" className="min-h-screen">
              <Hero play={play} />
            </section>

            {/* About pins + tears open via CSS sticky — render outside the
                transform-based SectionTransition so sticky isn't broken. */}
            <div id="about">
              <About />
            </div>

            {/* Impact Section */}
            <SectionTransition id="impact" transitionType="fade">
              <Impact />
            </SectionTransition>

            {/* Experience + Projects use CSS sticky to pin. A transformed
                ancestor (any SectionTransition type) breaks sticky, so these
                render in plain id wrappers — they handle their own motion. */}
            <div id="experience">
              <Experience />
            </div>

            <div id="projects">
              <Projects />
            </div>

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
