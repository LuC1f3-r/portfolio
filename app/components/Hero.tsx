"use client";

import { useEffect, useState } from "react";

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
    <section className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-gray-900 m-0 p-0">
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
      <div className="text-center w-full">
        <h1 className="text-5xl sm:text-7xl font-extrabold text-zinc-100 glow select-none">
          LuC1f3-r
        </h1>
        <p className="mt-4 text-xl sm:text-3xl text-purple-400 min-h-[2.5rem] select-none">
          {currentText}
          <span className="animate-pulse">|</span>
        </p>
        <p className="mt-8 max-w-xl mx-auto text-sm sm:text-base essence px-4 py-2 select-none">
          I don’t build apps. I design systems that never crash.
        </p>
      </div>
    </section>
  );
}
