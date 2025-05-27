'use client'

import { useEffect, useState, useRef } from "react";

export default function Experience() {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set([1, 2, 3]));
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Intersection Observer for scroll animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = parseInt(entry.target.getAttribute('data-id') || '0');
            setVisibleItems(prev => new Set([...prev, id]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    return () => observerRef.current?.disconnect();
  }, []);

  const experiences = [
    {
      id: 1,
      title: "Software Engineer at CodeHaste",
      info: "Developed scalable microservices in NestJS, integrated AWS Cognito for secure authentication, led end-to-end product development, enhanced system metrics and logging, and implemented CI/CD pipelines and comprehensive testing with Jest, achieving 95% test coverage.",
      startYear: 2024,
      duration: "1 year",
      isCurrent: true,
    },
    {
      id: 2,
      title: "Software Development Engineer at Zluri",
      info: "Engineered backend features for high-traffic platforms (Monday.com, Jumploud, Azure, JFrog, Gitbook), optimizing performance, reliability, and security while reducing latency and system downtime.",
      startYear: 2023,
      duration: "7 months",
      isCurrent: false,
    },
    {
      id: 3,
      title: "Backend Developer Intern at BTrees Technologies",
      info: "Led a team of 3 developers to build a dynamic web application for an educational institution, enhancing user engagement by 30%. Reduced page load time by 40%, improving overall application performance. Streamlined business processes, boosting customer satisfaction by 20%. Achieved a 95% on-time delivery rate, maintaining 100% client satisfaction.",
      startYear: 2022,
      duration: "5 months",
      isCurrent: false,
    },
  ];

  const attachObserver = (element: HTMLElement | null, id: number) => {
    if (element && observerRef.current) {
      element.setAttribute('data-id', id.toString());
      observerRef.current.observe(element);
    }
  };

  return (
    <main className="w-screen min-h-screen pt-16 px-4 sm:px-8 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-800 text-zinc-100 flex flex-col items-center overflow-x-hidden">
      
      <div className="text-center mb-20">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 drop-shadow-lg mb-4">
          My Journey
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
          A timeline of my professional growth and experiences
        </p>
      </div>

      <div className="relative max-w-6xl w-full pb-12">
        {/* Vertical center line - hidden on mobile */}
        <div className="hidden md:block absolute top-0 left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-purple-500 via-purple-700 to-transparent h-full" />

        {/* Timeline items */}
        <div className="flex flex-col space-y-16 md:space-y-32">
          {experiences.map((exp, index) => {
            const isLeft = exp.id % 2 !== 0;
            const isVisible = visibleItems.has(exp.id);

            return (
              <div
                key={exp.id}
                ref={(el) => attachObserver(el, exp.id)}
                className="relative flex justify-center md:justify-start w-full"
              >
                {/* Mobile Layout */}
                <div className="md:hidden w-full max-w-lg">
                  {/* Year Circle - Mobile */}
                  <div className="flex justify-center mb-6">
                    <div
                      className={`flex flex-col items-center justify-center w-20 h-20 rounded-full text-xs text-center font-mono transition-all duration-700 transform ${
                        isVisible ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
                      } ${
                        exp.isCurrent
                          ? "bg-gradient-to-tr from-purple-500 via-purple-600 to-pink-500 text-white shadow-2xl shadow-purple-500/50 animate-glow-soft"
                          : "bg-zinc-800 border-2 border-purple-700 text-purple-300"
                      }`}
                    >
                      <div className="font-bold text-xl">
                        {exp.startYear}
                      </div>
                      <div className="mt-1 text-xs opacity-80 font-normal">
                        {exp.duration}
                      </div>
                    </div>
                  </div>

                  {/* Experience Card - Mobile */}
                  <div
                    className={`relative bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-2xl p-6 shadow-2xl border transition-all duration-700 transform ${
                      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                    } ${
                      exp.isCurrent
                        ? "border-purple-400 shadow-purple-500/20"
                        : "border-zinc-700 hover:border-purple-600"
                    }`}
                  >
                    {exp.isCurrent && (
                      <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-full animate-ping" />
                    )}
                    
                    <div className="flex flex-col space-y-3">
                      <div>
                        <h2 className="text-xl font-bold text-purple-400 mb-1">
                          {exp.title}
                          {exp.isCurrent && (
                            <span className="block mt-2 px-3 py-1 text-xs bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-semibold tracking-wide w-fit">
                              CURRENT
                            </span>
                          )}
                        </h2>
                      </div>
                      
                      <p className="text-zinc-400 leading-relaxed text-sm">
                        {exp.info}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className={`hidden md:flex ${isLeft ? 'justify-start' : 'justify-end'} w-full`}>
                  {/* Experience Card - Desktop */}
                  <div
                    className={`relative bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-2xl p-8 shadow-2xl w-full max-w-2/5 z-10 border transition-all duration-700 transform ${
                      isVisible ? 'translate-x-0 opacity-100' : `${isLeft ? '-translate-x-8' : 'translate-x-8'} opacity-0`
                    } ${
                      exp.isCurrent
                        ? "border-purple-400 shadow-purple-500/20"
                        : "border-zinc-700 hover:border-purple-600"
                    } ${
                      isLeft ? 'mr-40' : 'ml-40'
                    }`}
                    style={{
                      animationDelay: `${index * 200}ms`
                    }}
                  >
                    {exp.isCurrent && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-full animate-ping" />
                    )}
                    
                    <div className="flex flex-col space-y-4">
                      <div>
                        <h2 className="text-2xl font-bold text-purple-400 mb-1">
                          {exp.title}
                          {exp.isCurrent && (
                            <span className="ml-3 px-3 py-1 text-xs bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-semibold tracking-wide">
                              CURRENT
                            </span>
                          )}
                        </h2>
                      </div>
                      
                      <p className="text-zinc-400 leading-relaxed text-base">
                        {exp.info}
                      </p>
                    </div>
                    
                    {/* Card connector line */}
                    <div
                      className={`absolute top-1/2 ${isLeft ? '-right-28 bg-gradient-to-r' : '-left-28 bg-gradient-to-l'} w-28 h-1 from-purple-500/70 to-transparent transform -translate-y-1/2`}
                    />
                  </div>

                  {/* Year Circle - Desktop */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                    <div
                      className={`flex flex-col items-center justify-center w-32 h-32 rounded-full text-sm text-center font-mono transition-all duration-700 transform ${
                        isVisible ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
                      } ${
                        exp.isCurrent
                          ? "bg-gradient-to-tr from-purple-500 via-purple-600 to-pink-500 text-white shadow-2xl shadow-purple-500/50 animate-glow-soft"
                          : "bg-zinc-800 border-2 border-purple-700 text-purple-300 hover:bg-zinc-700 hover:border-purple-500"
                      }`}
                      style={{
                        animationDelay: `${index * 200 + 300}ms`
                      }}
                    >aaaaaa
                      <div className="font-bold text-2xl">
                        {exp.startYear}
                      </div>
                      <div className="mt-1 text-xs opacity-80 font-normal">
                        {exp.duration}
                      </div>
                    </div>
                  </div>

                  {/* Floating particles for current role - Desktop only */}
                  {exp.isCurrent && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                      {[...Array(6)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-1 h-1 bg-purple-400 rounded-full animate-float"
                          style={{
                            left: `${Math.cos(i * 60 * Math.PI / 180) * 60}px`,
                            top: `${Math.sin(i * 60 * Math.PI / 180) * 60}px`,
                            animationDelay: `${i * 0.5}s`,
                            animationDuration: '3s'
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes slide-in-left {
          from {
            transform: translateX(-100px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes slide-in-right {
          from {
            transform: translateX(100px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes glow-soft {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(168, 85, 247, 0.4), 0 0 40px rgba(236, 72, 153, 0.2);
            transform: scale(1);
          }
          50% { 
            box-shadow: 0 0 30px rgba(168, 85, 247, 0.6), 0 0 60px rgba(236, 72, 153, 0.4);
            transform: scale(1.02);
          }
        }
        
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) scale(1);
            opacity: 0.7;
          }
          50% { 
            transform: translateY(-20px) scale(1.2);
            opacity: 1;
          }
        }
        
        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out forwards;
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out forwards;
        }
        
        .animate-glow-soft {
          animation: glow-soft 3s ease-in-out infinite;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        @media (max-width: 768px) {
          .animate-slide-in-left,
          .animate-slide-in-right {
            animation: slide-in-left 0.8s ease-out forwards;
          }
        }
      `}</style>
    </main>
  );
}