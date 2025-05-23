'use client'

import { useEffect, useState } from "react";

export default function Experience() {
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const experiences = [
    {
      id: 1,
      title: "Placeholder Title 1",
      info: "Placeholder info 1 — this is your current job. Add more details later.",
      startYear: 2023,
      duration: "1.5 yrs",
      isCurrent: true,
    },
    {
      id: 2,
      title: "Placeholder Title 2",
      info: "Placeholder info 2 — add your experience details here later.",
      startYear: 2021,
      duration: "2 yrs",
      isCurrent: false,
    },
    {
      id: 3,
      title: "Placeholder Title 3",
      info: "Placeholder info 3 — add your experience details here later.",
      startYear: 2019,
      duration: "2 yrs",
      isCurrent: false,
    },
  ];

  return (
    <main className="w-screen min-h-screen pt-16 px-8 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-800 text-zinc-100 flex flex-col items-center">
      
      <h1 className="text-4xl sm:text-5xl font-extrabold text-purple-500 drop-shadow-lg mb-20">
        My Experiences
      </h1>

      <div className="relative max-w-5xl w-full">
        {/* Vertical center line */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 bg-purple-700 h-full rounded" />

        {/* Timeline items */}
        <div className="flex flex-col space-y-24">
          {experiences.map((exp) => {
            const isLeft = exp.id % 2 !== 0;

            return (
              <div
                key={exp.id}
                className={`relative flex justify-${isLeft ? "start" : "end"} w-full`}
              >
                {/* Experience Card */}
                <div
                  className={`bg-zinc-900 rounded-lg p-6 shadow-lg w-full max-w-md z-10 border ${
                    exp.isCurrent
                      ? "border-purple-400 animate-pulse-slow"
                      : "border-zinc-800"
                  }`}
                >
                  <h2 className="text-xl font-semibold text-purple-400 mb-2">
                    {exp.title}
                    {exp.isCurrent && (
                      <span className="ml-2 px-2 py-1 text-xs bg-purple-700 rounded-full text-white">
                        Current Role
                      </span>
                    )}
                  </h2>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {exp.info}
                  </p>
                </div>

                {/* Year Circle */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                  <div
                    className={`flex flex-col items-center justify-center w-28 h-28 rounded-full text-xs text-center font-mono ${
                      exp.isCurrent
                        ? "bg-gradient-to-tr from-purple-500 to-pink-500 text-white shadow-xl animate-glow"
                        : "bg-zinc-800 border border-purple-700 text-purple-300"
                    }`}
                  >
                    <div>{exp.startYear} – {exp.isCurrent ? "Present" : exp.startYear + parseInt(exp.duration)}</div>
                    <div className="mt-1 text-xs opacity-70">{exp.duration}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 10px #a855f7, 0 0 20px #ec4899; }
          50% { box-shadow: 0 0 25px #a855f7, 0 0 35px #ec4899; }
        }
        .animate-glow {
          animation: glow 2.5s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </main>
  );
}
