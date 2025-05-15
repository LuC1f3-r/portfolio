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
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setCurrentText(fullText.substring(0, typingIndex + 1));
          setTypingIndex(typingIndex + 1);
          if (typingIndex + 1 === fullText.length) {
            setTimeout(() => setIsDeleting(true), 1500);
          }
        } else {
          setCurrentText(fullText.substring(0, typingIndex - 1));
          setTypingIndex(typingIndex - 1);
          if (typingIndex - 1 === 0) {
            setIsDeleting(false);
            setRoleIndex((roleIndex + 1) % roles.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );

    return () => clearTimeout(timeout);
  }, [typingIndex, isDeleting, roleIndex]);

  return (
    <section className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-gray-900 px-6 sm:px-12">
      <div className="text-center">
        <h1 className="text-5xl sm:text-7xl font-extrabold text-zinc-100 drop-shadow-glow">
          LuC1f3-r
        </h1>
        <p className="mt-4 text-xl sm:text-3xl text-purple-400 min-h-[2.5rem]">
          {currentText}
          <span className="animate-pulse">|</span>
        </p>
        <p className="mt-6 max-w-xl mx-auto text-zinc-400 text-sm sm:text-base">
          I don’t build apps. I design systems that never crash.
        </p>
      </div>
    </section>
  );
}
