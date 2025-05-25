"use client";

import React, { useState } from "react";

export default function About() {
  const [open, setOpen] = useState(false);
  return (
    <section className="w-screen min-h-screen pt-16 flex flex-col items-center bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-800 text-zinc-100">
      {/* Centered About Me Title at Top */}
      <h2 className="text-4xl sm:text-5xl font-extrabold text-purple-500 drop-shadow-lg mb-12">
        About Me
      </h2>

      {/* Two Columns Grid */}
      <div className="max-w-6xl w-full px-8 py-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Left Side - About Text */}
        <div className="space-y-6">
          <p className="text-zinc-400 text-sm font-mono">~/luc1f3r/about</p>
          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed">
            Hi, I'm{" "}
            <span className="text-purple-400 font-semibold">
              Niyaz Ahamad Herkal
            </span>{" "}
            (<span className="text-purple-400">LuC1f3-r</span>). I engineer
            resilient systems with an obsession for{" "}
            <span className="text-purple-300">uptime</span>,{" "}
            <span className="text-purple-300">scalability</span>, and{" "}
            <span className="text-purple-300">chaos resistance</span>.{" "}
            <span className="text-lg sm:text-xl text-zinc-300 leading-relaxed">
              I thrive in fast-paced environments, love solving complex
              problems, and enjoy collaborating with teams to deliver
              high-impact solutions. When I’m not coding, you’ll find me
              exploring new tech, contributing to open source, or gaming.
            </span>
          </p>

          <div className="relative inline-block">
            <button
              onClick={() => setOpen(!open)}
              className="relative inline-block text-white font-semibold py-3 px-6 rounded-full transition-transform transform hover:scale-105 shadow-lg overflow-hidden group border border-fuchsia-500/30"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 animate-gradient-x z-0"></span>
              <span className="relative z-10">Download CV</span>
            </button>

            {open && (
              <div className="absolute mt-3 w-60 rounded-xl backdrop-blur-md border border-fuchsia-500/30 shadow-lg bg-gradient-to-br from-[#1a1a1a]/90 to-[#2a003f]/80 text-white">
                {/* No internal padding */}
                <a
                  href="/assets/niyazahamadherkal-dark.pdf"
                  download
                  className="block w-full px-5 py-3 text-sm font-medium hover:bg-fuchsia-500/10 hover:pl-6 transition-all"
                >
                  🥷🏼 Download Dark Theme
                </a>
                <a
                  href="/assets/niyazahamadherkal-dark.pdf"
                  download
                  className="block w-full px-5 py-3 text-sm font-medium hover:bg-fuchsia-500/10 hover:pl-6 transition-all"
                >
                  🧝🏻‍♂️ Download Light Theme
                </a>
              </div>
            )}
          </div>
          <style>{`
            @keyframes gradient-x {
              0% {
                background-position: 0% 50%;
              }
              100% {
                background-position: 100% 50%;
              }
            }
            .animate-gradient-x {
              background-size: 200% 200%;
              animation: gradient-x 3s linear infinite;
            }
          `}</style>
        </div>

        {/* Right Side - Skills */}
        <div className="space-y-6">
          <div className="space-y-4">
            {[
              { label: "Backend Development", value: 90 },
              { label: "Web Design", value: 80 },
              { label: "UI Development", value: 80 },
              { label: "Copywriting", value: 85 },
            ].map((skill, i) => (
              <div key={i}>
                <div className="flex justify-between mb-1">
                  <span className="text-m text-zinc-300">{skill.label}</span>
                  <span className="text-m text-zinc-400">{skill.value}%</span>
                </div>
                <div className="w-full bg-zinc-700 rounded-full h-2">
                  <div
                    className="bg-purple-500 h-2 rounded-full transition-all duration-500 ease-in-out"
                    style={{ width: `${skill.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
