"use client";

import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";

const socialLinks = [
  { icon: FaGithub, href: "https://github.com/LuC1f3-r", label: "GitHub" },
  { icon: FaLinkedin, href: "https://linkedin.com/in/niyazherkal", label: "LinkedIn" },
  { icon: FaTwitter, href: "https://x.com/Niyaznhh", label: "Twitter" },
  { icon: FaInstagram, href: "https://instagram.com/niy4z_ahmed/", label: "Instagram" },
];

const footerLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contacts" },
];

export default function Footer() {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative bg-[#0a0a0a] border-t border-[#1a1a1a] py-16 px-6 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Top section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          {/* Brand */}
          <div className="text-center md:text-left">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-[#ededed] font-[family-name:var(--font-mono)] mb-2 tracking-tight"
            >
              LuC1f3-r
            </motion.h3>
            <p className="text-[#888] text-sm font-[family-name:var(--font-mono)]">
              Backend Engineer · Bangalore
            </p>
          </div>

          {/* Quick Links */}
          <nav className="flex flex-wrap justify-center gap-6">
            {footerLinks.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={(e) => handleNavClick(e, href)}
                className="text-[#888] hover:text-[#c8ff00] transition-colors duration-200 text-sm font-[family-name:var(--font-mono)]"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex gap-4">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-10 h-10 rounded-full bg-[#0a0a0a] border border-[#1a1a1a] flex items-center justify-center text-[#888] hover:text-[#c8ff00] hover:border-[#c8ff00]/30 transition-all"
                aria-label={label}
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#1a1a1a] mb-8" />

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-[#888] text-sm font-[family-name:var(--font-mono)]">
            © {new Date().getFullYear()} Niyaz Ahamad Herkal. All rights reserved.
          </p>
          <p className="text-[#888] text-xs font-[family-name:var(--font-mono)]">
            Crafted with <span className="text-[#c8ff00]">♦</span> Next.js & GSAP
          </p>
        </div>
      </div>
    </footer>
  );
}
