'use client';

import { useEffect, useState } from 'react';

const roles = [
  'Backend Developer',
  'Microservices Specialist',
  'Engineer of Chaos',
  'Code Whisperer'
];

export default function Hero() {
  const [currentRole, setCurrentRole] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="flex flex-col items-center justify-center text-center h-screen px-4 bg-gradient-to-b from-black to-zinc-900">
      <h1 className="text-5xl sm:text-6xl font-extrabold text-purple-500 drop-shadow-lg">
        LuC1f3-r
      </h1>
      <p className="mt-4 text-xl sm:text-2xl text-zinc-300">
        {roles[currentRole]}
      </p>
      <p className="mt-6 max-w-xl text-zinc-400">
        I don't build apps. I design systems that never crash.
      </p>
    </section>
  );
}