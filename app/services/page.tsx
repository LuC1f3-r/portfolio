"use client";
import React from "react";

export default function Services() {
  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-black via-zinc-900 to-purple-950 flex items-center justify-center">
      {/* Services/Skills Section */}
      <section className="py-20 bg-zinc-900 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-10">
            What I Do
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {/* Add skill cards here */}
            <div className="bg-zinc-800 p-6 rounded-xl border border-zinc-700 hover:border-purple-500 transition shadow-lg">
              <h3 className="text-xl font-semibold text-purple-400 mb-2">
                Backend Engineering
              </h3>
              <p className="text-zinc-400">
                Node.js, Flask, Python, PostgreSQL, MongoDB
              </p>
            </div>
            <div className="bg-zinc-800 p-6 rounded-xl border border-zinc-700 hover:border-purple-500 transition shadow-lg">
              <h3 className="text-xl font-semibold text-purple-400 mb-2">
                DevOps
              </h3>
              <p className="text-zinc-400">Docker, Linux, GitHub Actions</p>
            </div>
            <div className="bg-zinc-800 p-6 rounded-xl border border-zinc-700 hover:border-purple-500 transition shadow-lg">
              <h3 className="text-xl font-semibold text-purple-400 mb-2">
                Frontend (for Fun)
              </h3>
              <p className="text-zinc-400">React, Next.js, Tailwind</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
