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
import React, { useState, useEffect } from "react";

const tech = [
  { icon: SiJavascript, name: "JavaScript" },
  { icon: SiTypescript, name: "TypeScript" },
  { icon: SiHtml5, name: "HTML5" },
  { icon: SiCss3, name: "CSS3" },
  { icon: SiC, name: "C" },
  { icon: SiCplusplus, name: "C++" },
  { icon: SiPython, name: "Python" },
  { icon: SiReact, name: "React" },
  { icon: SiAngular, name: "Angular" },
  { icon: SiNextdotjs, name: "Next.js" },
  { icon: SiNestjs, name: "NestJS" },
  { icon: SiNodedotjs, name: "Node.js" },
  { icon: SiFlask, name: "Flask" },
  { icon: SiDocker, name: "Docker" },
  { icon: SiPostgresql, name: "PostgreSQL" },
  { icon: SiMongodb, name: "MongoDB" },
  { icon: SiGit, name: "Git" },
  { icon: SiLinux, name: "Linux" },
];

// Simple stars background component with CSS-in-JS approach
const StarsBackground = () => {
  const stars = Array.from({ length: 80 });
  
  // Define keyframes animation in a style element added to the document head
  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.innerHTML = `
      @keyframes twinkle {
        0%, 100% { opacity: 0.6; }
        50% { opacity: 1; }
      }
    `;
    document.head.appendChild(styleEl);
    
    return () => {
      document.head.removeChild(styleEl);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {stars.map((_, i) => {
        const size = Math.random() * 2 + 1;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const duration = Math.random() * 2 + 2;
        return (
          <div
            key={i}
            className="bg-white rounded-full opacity-60"
            style={{
              position: "absolute",
              width: `${size}px`,
              height: `${size}px`,
              left: `${left}%`,
              top: `${top}%`,
              animation: `twinkle ${duration}s infinite alternate`,
            }}
          />
        );
      })}
    </div>
  );
};

// Randomizing tech icon component
type TechIconProps = {
  icon: React.ComponentType<{ className?: string }>;
  name: string;
  index: number;
};
const TechIcon: React.FC<TechIconProps> = ({ icon: Icon, name, index }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [nextPosition, setNextPosition] = useState({ x: 0, y: 0 });
  const [speed, setSpeed] = useState(0);
  
  // Initialize random starting position
  useEffect(() => {
    // Seed initial position based on index for SSR consistency
    const left = (Math.sin(index * 13.13) * 0.5 + 0.5) * 80 + 10; // 10% - 90%
    const top = (Math.cos(index * 7.77) * 0.5 + 0.5) * 70 + 15; // 15% - 85%
    
    setPosition({ 
      x: left, 
      y: top 
    });
    
    // Set a random movement speed for this icon
    setSpeed(5 + Math.random() * 10); // Between 5-15 seconds for movement
  }, [index]);
  
  // Move to a new random position
  useEffect(() => {
    const moveToNewPosition = () => {
      // Generate new random position within boundaries
      const newX = Math.random() * 80 + 10; // 10% - 90% 
      const newY = Math.random() * 70 + 15; // 15% - 85%
      
      setNextPosition({ x: newX, y: newY });
      
      // Update actual position after transition completes
      setTimeout(() => {
        setPosition({ x: newX, y: newY });
        // Generate a new random speed for the next movement
        setSpeed(5 + Math.random() * 10);
      }, speed * 1000);
    };
    
    // Start movement timer
    const timer = setTimeout(moveToNewPosition, speed * 1000);
    
    // Initial movement
    if (position.x === nextPosition.x && position.y === nextPosition.y) {
      moveToNewPosition();
    }
    
    return () => clearTimeout(timer);
  }, [position, speed]);

  return (
    <div
      className="group absolute flex flex-col items-center justify-center p-4 rounded-xl bg-zinc-900 border border-zinc-700 hover:border-purple-500 hover:shadow-purple-700/40 transition duration-300 pointer-events-auto"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: `translate(-50%, -50%)`,
        transition: `left ${speed}s ease-in-out, top ${speed}s ease-in-out`,
        zIndex: 30,
      }}
    >
      <Icon className="text-3xl text-purple-400 group-hover:scale-110 transition-transform" />
      <span className="absolute -bottom-6 text-xs text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity">
        {name}
      </span>
    </div>
  );
};

export default function TechStack() {
  return (
    <section className="relative min-h-screen w-full bg-zinc-950 text-zinc-100 flex items-center justify-center overflow-hidden">
      <StarsBackground />
      
      {/* Icons randomly floating around */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        {tech.map(({ icon, name }, idx) => (
          <TechIcon key={idx} icon={icon} name={name} index={idx} />
        ))}
      </div>
      
      {/* Heading */}
      <div className="relative z-10 max-w-5xl mx-auto text-center pointer-events-none">
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-10 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent drop-shadow-lg tracking-tight relative">
          Tech Arsenal
          <span className="block h-1 w-1/2 mx-auto mt-3 bg-gradient-to-r from-purple-500 via-pink-400 to-blue-400 rounded-full blur-sm opacity-80"></span>
        </h2>
        <p className="text-zinc-400 text-lg sm:text-xl font-medium mb-2">
          My favorite tools, languages, and frameworks.
        </p>
      </div>
    </section>
  );
}