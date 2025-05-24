"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  FaBars,
  FaTimes,
  FaTwitter,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "TechStack", href: "#techstack" },
  { label: "Contacts", href: "#contacts" },
];

const socialLinks = [
  { icon: <FaTwitter />, href: "https://x.com/Niyaznhh", label: "Twitter" },
  { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/niyazherkal/", label: "LinkedIn" },
  { icon: <FaGithub />, href: "https://github.com/LuC1f3-r", label: "GitHub" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* Fixed Navbar */}
      <header className="fixed top-0 left-0 w-full z-50 bg-black/30 backdrop-blur-lg border-b border-zinc-800 shadow-lg">
        <nav className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center text-zinc-200">
          {/* Logo */}
          <Link href="#home">
            <h1
              className="text-purple-400 text-xl font-extrabold tracking-wide animate-breathing-glow cursor-pointer"
              style={{ fontFamily: "Fira Mono, monospace" }}
            >
              LuC1f3-r
            </h1>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex gap-4 text-sm">
            {navItems.map((item, idx) => (
              <li key={idx}>
                <Link
                  href={item.href}
                  className="px-4 py-2 rounded-md transition-all duration-200 hover:bg-purple-900/30 hover:text-purple-400"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Hamburger Button for Mobile */}
          <button
            className="lg:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <FaBars className="text-zinc-200 text-xl" />
          </button>
        </nav>
      </header>

      {/* Fullscreen Overlay Menu */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-500 ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* Background */}
        <div
          className="absolute inset-0 bg-black/95 backdrop-blur-sm"
          onClick={closeMenu}
        />

        {/* Menu Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-6">
          {/* Close Button */}
          <button
            onClick={closeMenu}
            className="absolute top-8 right-8 p-3 rounded-full bg-white/10 hover:bg-white/20"
            aria-label="Close menu"
          >
            <FaTimes size={24} className="text-white" />
          </button>

          {/* Navigation Items */}
          <nav className="text-center">
            <ul className="space-y-8">
              {navItems.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className={`block text-4xl font-light text-white/90 hover:text-purple-400 transition-all duration-300 transform hover:scale-110 ${
                      menuOpen ? "animate-fade-in-up" : ""
                    }`}
                    style={{
                      animationDelay: `${idx * 100}ms`,
                      animationFillMode: "both",
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social Icons */}
          <div className="absolute bottom-12 flex gap-8">
            {socialLinks.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl text-white/70 hover:text-purple-400 hover:scale-125 transition-transform"
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }

        @keyframes breathing-glow {
          0%, 100% {
            text-shadow: 0 0 5px rgba(168, 85, 247, 0.5);
          }
          50% {
            text-shadow: 0 0 20px rgba(168, 85, 247, 0.8), 0 0 30px rgba(168, 85, 247, 0.6);
          }
        }

        .animate-breathing-glow {
          animation: breathing-glow 2s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
