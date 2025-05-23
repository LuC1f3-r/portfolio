'use client'

import React, { useEffect } from "react";
import {
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss3,
  SiC,
  SiCplusplus,
  SiPython,
  SiReact,
  SiAngular,
  SiNextdotjs,
  SiNestjs,
  SiNodedotjs,
  SiFlask,
  SiDocker,
  SiPostgresql,
  SiMongodb,
  SiGit,
  SiLinux,
} from "react-icons/si";

const tech = [
  { icon: SiJavascript, name: "JavaScript" },
  { icon: SiTypescript, name: "TypeScript" },
  { icon: SiReact, name: "React" },
  { icon: SiNextdotjs, name: "Next.js" },
  { icon: SiNodedotjs, name: "Node.js" },
  { icon: SiPython, name: "Python" },
  { icon: SiHtml5, name: "HTML5" },
  { icon: SiCss3, name: "CSS3" },
  { icon: SiAngular, name: "Angular" },
  { icon: SiNestjs, name: "NestJS" },
  { icon: SiFlask, name: "Flask" },
  { icon: SiC, name: "C" },
  { icon: SiCplusplus, name: "C++" },
  { icon: SiDocker, name: "Docker" },
  { icon: SiPostgresql, name: "PostgreSQL" },
  { icon: SiMongodb, name: "MongoDB" },
  { icon: SiGit, name: "Git" },
  { icon: SiLinux, name: "Linux" },
];

const StarsBackground = () => {
  const [stars, setStars] = React.useState<
    { size: number; left: number; top: number; duration: number }[]
  >([]);

  useEffect(() => {
    setStars(
      Array.from({ length: 80 }).map(() => ({
        size: Math.random() * 2 + 1,
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: Math.random() * 3 + 2,
      }))
    );
  }, []);

  useEffect(() => {
    const styleEl = document.createElement("style");
    styleEl.innerHTML = `
      @keyframes twinkle {
        0%, 100% { opacity: 0.5; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.3); }
      }

      @keyframes backgroundMove {
        0% { transform: translate(0, 0); }
        50% { transform: translate(-10px, -10px); }
        100% { transform: translate(0, 0); }
      }
    `;
    document.head.appendChild(styleEl);
    return () => {
      document.head.removeChild(styleEl);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div
        className="absolute inset-0 animate-backgroundMove"
        style={{ animation: "backgroundMove 60s infinite linear" }}
      >
        {stars.map((star, i) => (
          <div
            key={i}
            className="bg-white rounded-full"
            style={{
              position: "absolute",
              width: `${star.size}px`,
              height: `${star.size}px`,
              left: `${star.left}%`,
              top: `${star.top}%`,
              animation: `twinkle ${star.duration}s infinite ease-in-out`,
              filter: "drop-shadow(0 0 6px #fff)",
            }}
          />
        ))}
      </div>
    </div>
  );
};

const TechStack = () => {
  return (
    <section className="relative min-h-screen w-full bg-zinc-950 text-zinc-100 flex flex-col items-center justify-center overflow-hidden">
      <StarsBackground />

      <div className="relative z-10 text-center mb-10 px-4">
        <h2 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent drop-shadow-lg">
          Tech Arsenal
        </h2>
        <p className="text-zinc-400 text-lg sm:text-xl font-medium mt-2">
          My favorite tools, languages, and frameworks.
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 px-4 sm:px-10 pointer-events-auto">
        {tech.map(({ icon, name }, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center p-4 bg-zinc-900 border border-zinc-700 rounded-xl hover:border-purple-500 hover:shadow-lg hover:shadow-purple-700/40 transition-all hover:scale-110 cursor-pointer group"
          >
            <span className="text-purple-400 text-3xl md:text-4xl">
              {React.createElement(icon)}
            </span>
            <span className="mt-2 text-xs text-zinc-400 opacity-80 group-hover:opacity-100 transition-opacity">
              {name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechStack;
