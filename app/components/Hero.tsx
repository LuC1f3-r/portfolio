"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaInstagram,
  FaLinkedin,
  FaEnvelope,
  FaTwitter,
  FaGithub,
} from "react-icons/fa";

const roles = [
  "Backend Developer",
  "Microservices Specialist",
  "Engineer of Chaos",
  "Code Whisperer",
];

export default function Hero() {
  const [currentText, setCurrentText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [typingIndex, setTypingIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = roles[roleIndex];
    let delay = isDeleting ? 25 : 50; // Faster animation

    if (!isDeleting && typingIndex === fullText.length) {
      delay = 700; // Shorter pause at end
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
    // eslint-disable-next-line
  }, [typingIndex, isDeleting, roleIndex]);

  return (
    <section className="min-h-screen pt-0 w-full flex items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-gray-900 p-6 sm:p-12">
      <style>{`
        .glow {
          text-shadow:
            0 0 8px #a78bfa,
            0 0 16px #a78bfa,
            0 0 32px #a78bfa,
            0 0 64px #a78bfa;
          animation: glowPulse 2s infinite alternate;
        }
        @keyframes glowPulse {
          0% { text-shadow: 0 0 8px #a78bfa, 0 0 16px #a78bfa, 0 0 32px #a78bfa, 0 0 64px #a78bfa; }
          100% { text-shadow: 0 0 16px #c4b5fd, 0 0 32px #c4b5fd, 0 0 64px #c4b5fd, 0 0 128px #c4b5fd; }
        }
        .essence {
          background: linear-gradient(90deg, rgba(200,200,200,0.08) 0%, rgba(180,180,180,0.13) 100%);
          color: #e5e7eb;
          border-radius: 0.5rem;
          box-shadow: 0 2px 32px 0 rgba(200,200,200,0.08);
        }
      `}</style>

      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 max-w-6xl w-full">
        {/* LEFT SIDE */}
        <div className="text-center md:text-left w-full md:w-1/2 space-y-4">
          <h1 className="text-lg sm:text-xl text-zinc-400">Heya, I am</h1>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-zinc-100 glow select-none">
            Niyaz Ahamad Herkal
          </h2>

          <div className="flex items-center gap-4 border-t border-b border-zinc-700 px-2 py-2 w-[300px] justify-center md:justify-start mt-6">
            <div className="text-purple-400 text-xl sm:text-2xl min-h-[2.5rem] font-medium">
              {currentText}
              <span className="animate-pulse">|</span>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex gap-5 mt-8 justify-center md:justify-start text-2xl">
            <a
              href="https://www.instagram.com/niy4z_ahmed/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-pink-400 transition"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com/in/niyazherkal/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-blue-400 transition"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://x.com/Niyaznhh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-cyan-400 transition"
            >
              <FaTwitter />
            </a>
            <a
              href="mailto:niyaz47nhh@gmail.com"
              className="text-purple-400 hover:text-red-400 transition"
            >
              <FaEnvelope />
            </a>
            <a
              href="https://github.com/LuC1f3-r"
              className="text-purple-400 hover:text-red-400 transition"
            >
              <FaGithub />
            </a>
          </div>

          {/* CTA Button */}
          <div className="mt-6">
            <Link
              href="#about"
              className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-all duration-300"
            >
              View my Portfolio
            </Link>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          {/* <div className="relative group w-[240px] h-[330px] rounded-xl overflow-hidden shadow-2xl border-4 border-purple-500 essence transition-transform duration-300 hover:scale-105">
            <img
              src="/assets/profile-picture.png"
              alt="Niyaz"
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-black/40 text-zinc-100 text-center text-lg font-semibold tracking-wide">
              Niyaz Ahamad Herkal
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}
