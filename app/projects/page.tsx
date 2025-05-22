'use client'

import React from "react";

const projects = [
  {
    name: "Serpico",
    description:
      "A framework that fuses data extraction and analytical capabilities into one powerful pipeline.",
    link: "https://github.com/LuC1f3-r/Serpico-TK",
  },
  {
    name: "URL Shortener",
    description:
      "Fast and scalable URL shortener with tracking and analytics — built for heavy traffic scenarios.",
    link: "https://github.com/LuC1f3-r/url-shortener",
  },
  {
    name: "Self Driving Car",
    description:
      "Browser-based JS simulation with neural networks that mimic autonomous driving logic.",
    link: "https://github.com/LuC1f3-r/self-driving-car",
  },
];

export default function Projects() {
  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-black via-zinc-900 to-purple-950 flex items-center justify-center">
      <section className="w-full max-w-6xl px-6 py-24">
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-purple-400 drop-shadow-lg mb-4 animate-fade-in">
            Projects
          </h2>
          <p className="text-zinc-300 text-lg text-center max-w-2xl animate-fade-in delay-100">
            Explore some of my favorite projects, each crafted with passion and a focus on performance, scalability, and creativity.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="group bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-xl transition-all duration-300 hover:scale-105 hover:border-purple-500 hover:shadow-purple-700/40 relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition duration-300 pointer-events-none bg-gradient-to-tr from-purple-500 via-transparent to-purple-900" />
              <h3 className="text-2xl font-bold text-purple-300 mb-3 group-hover:text-purple-400 transition">
                {project.name}
              </h3>
              <p className="text-zinc-300 text-base mb-6">{project.description}</p>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 rounded bg-purple-600 text-white font-medium shadow hover:bg-purple-700 transition"
              >
                View on GitHub →
              </a>
            </div>
          ))}
        </div>
      </section>
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in {
          animation: fade-in 0.8s cubic-bezier(0.4,0,0.2,1) both;
        }
        .delay-100 {
          animation-delay: 0.1s;
        }
      `}</style>
    </main>
  );
}