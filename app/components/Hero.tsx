"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaInstagram,
  FaLinkedin,
  FaEnvelope,
  FaTwitter,
  FaGithub,
} from "react-icons/fa";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const roles = [
  "Backend Developer",
  "Microservices Specialist",
  "Engineer of Chaos",
  "Code Whisperer",
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgLayer1Ref = useRef<HTMLDivElement>(null);
  const bgLayer2Ref = useRef<HTMLDivElement>(null);
  const bgLayer3Ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const [currentText, setCurrentText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [typingIndex, setTypingIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Typing effect
  useEffect(() => {
    const fullText = roles[roleIndex];
    let delay = isDeleting ? 25 : 50;

    if (!isDeleting && typingIndex === fullText.length) {
      delay = 700;
    }

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setCurrentText(fullText.substring(0, typingIndex + 1));
        setTypingIndex(typingIndex + 1);
        if (typingIndex + 1 === fullText.length) {
          setTimeout(() => setIsDeleting(true), 700);
        }
      } else {
        setCurrentText(fullText.substring(0, typingIndex - 1));
        setTypingIndex(typingIndex - 1);
        if (typingIndex - 1 === 0) {
          setIsDeleting(false);
          setRoleIndex((roleIndex + 1) % roles.length);
        }
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [typingIndex, isDeleting, roleIndex]);

  // Parallax scroll effects
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Trigger visibility after mount
    setIsVisible(true);

    // Parallax layers
    if (bgLayer1Ref.current) {
      gsap.to(bgLayer1Ref.current, {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    if (bgLayer2Ref.current) {
      gsap.to(bgLayer2Ref.current, {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    if (bgLayer3Ref.current) {
      gsap.to(bgLayer3Ref.current, {
        yPercent: -20,
        scale: 1.1,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    // Content fade out on scroll
    if (contentRef.current) {
      gsap.to(contentRef.current, {
        opacity: 0,
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "center top",
          scrub: true,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const socialLinks = [
    { icon: FaInstagram, href: "https://www.instagram.com/niy4z_ahmed/", label: "Instagram", hoverColor: "hover:text-pink-400" },
    { icon: FaLinkedin, href: "https://www.linkedin.com/in/niyazherkal/", label: "LinkedIn", hoverColor: "hover:text-blue-400" },
    { icon: FaTwitter, href: "https://x.com/Niyaznhh", label: "Twitter", hoverColor: "hover:text-cyan-400" },
    { icon: FaEnvelope, href: "mailto:niyaz47nhh@gmail.com", label: "Email", hoverColor: "hover:text-red-400" },
    { icon: FaGithub, href: "https://github.com/LuC1f3-r", label: "GitHub", hoverColor: "hover:text-white" },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Parallax Background Layers */}
      
      {/* Layer 1: Deep space gradient */}
      <div
        ref={bgLayer1Ref}
        className="absolute inset-0 w-full h-[130%]"
        style={{
          background: "radial-gradient(ellipse at center, rgba(88, 28, 135, 0.3) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(139, 92, 246, 0.2) 0%, transparent 40%)",
        }}
      />

      {/* Layer 2: Floating orbs */}
      <div ref={bgLayer2Ref} className="absolute inset-0 w-full h-[150%] pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-[40%] right-[5%] w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[20%] left-[30%] w-72 h-72 bg-violet-500/10 rounded-full blur-3xl" />
      </div>

      {/* Layer 3: Grid pattern */}
      <div
        ref={bgLayer3Ref}
        className="absolute inset-0 w-full h-[120%] opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/60 rounded-full"
            initial={{
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
              x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center justify-center text-center px-6"
      >
        {/* Glowing title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-4"
        >
          <span className="text-sm md:text-base text-purple-400 font-mono tracking-widest uppercase">
            Welcome to the experience
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-5xl sm:text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-white mb-4 leading-tight"
          style={{
            textShadow: "0 0 60px rgba(139, 92, 246, 0.5)",
          }}
        >
          Niyaz Ahamad
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            Herkal
          </span>
        </motion.h1>

        {/* Typing role */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex items-center gap-2 px-4 py-2 border border-purple-500/30 rounded-full bg-black/30 backdrop-blur-sm mb-8"
        >
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-purple-300 text-lg md:text-xl font-mono min-w-[280px]">
            {currentText}
            <span className="animate-pulse">|</span>
          </span>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex gap-6 mb-10"
        >
          {socialLinks.map(({ icon: Icon, href, label, hoverColor }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-2xl text-purple-400/70 ${hoverColor} transition-all duration-300`}
              aria-label={label}
              whileHover={{ scale: 1.2, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon />
            </motion.a>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <Link
            href="#about"
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold text-white overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30"
          >
            <span className="relative z-10">Explore My Story</span>
            <motion.span
              className="relative z-10"
              animate={{ y: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ↓
            </motion.span>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 0.5 : 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs text-zinc-500 font-mono tracking-widest">SCROLL</span>
            <div className="w-5 h-8 border-2 border-zinc-600 rounded-full flex justify-center pt-2">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1 h-2 bg-purple-400 rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Gradient overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}
