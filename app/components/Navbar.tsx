"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#techstack", label: "Tech" },
  { href: "#contacts", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide/show on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      // Add background when scrolled
      setScrolled(currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Desktop Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-[#1a1a1a]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="#home"
              onClick={(e) => handleNavClick(e, "#home")}
              className="group flex items-center gap-2"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-xl font-bold text-[#ededed] font-[family-name:var(--font-mono)] tracking-tight"
              >
                Niyaz · LuC1f3-r
              </motion.div>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={(e) => handleNavClick(e, href)}
                  className="relative px-4 py-2 text-sm text-[#888] hover:text-[#c8ff00] transition-colors duration-200 group font-[family-name:var(--font-mono)]"
                >
                  <span className="relative z-10">{label}</span>
                  <div className="absolute inset-0 bg-[#1a1a1a] rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-[#888] hover:text-[#c8ff00] transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-3/4 max-w-sm bg-[#0a0a0a] border-l border-[#1a1a1a] p-8 pt-24"
            >
              <nav className="flex flex-col gap-4">
                {navLinks.map(({ href, label }, index) => (
                  <motion.div
                    key={href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.07 }}
                  >
                    <Link
                      href={href}
                      onClick={(e) => handleNavClick(e, href)}
                      className="block py-3 text-xl text-[#ededed] hover:text-[#c8ff00] transition-colors border-b border-[#1a1a1a]"
                    >
                      <span className="text-[#c8ff00]/40 font-[family-name:var(--font-mono)] text-sm mr-3">
                        0{index + 1}
                      </span>
                      {label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Social links in mobile menu */}
              <div className="absolute bottom-8 left-8 right-8">
                <p className="text-xs text-[#888] font-[family-name:var(--font-mono)] mb-3">CONNECT</p>
                <div className="flex gap-4">
                  <a
                    href="https://github.com/LuC1f3-r"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#888] hover:text-[#c8ff00] transition-colors font-[family-name:var(--font-mono)] text-sm"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://linkedin.com/in/niyazherkal"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#888] hover:text-[#c8ff00] transition-colors font-[family-name:var(--font-mono)] text-sm"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
