"use client";
import { Code, Server, MonitorSmartphone, Activity, Lock, Wand2 } from "lucide-react";

export default function Services() {
  const services = [
    {
      title: "Backend Engineering",
      icon: <Server size={28} className="text-purple-400" />,
      description: "I build scalable, high-performance APIs and systems using Node.js, Flask, PostgreSQL, Redis, and more.",
    },
    {
      title: "Frontend Development",
      icon: <MonitorSmartphone size={28} className="text-purple-400" />,
      description: "React, Next.js, Tailwind — I craft responsive UI components and performant frontend systems.",
    },
    {
      title: "DevOps & Deployment",
      icon: <Activity size={28} className="text-purple-400" />,
      description: "CI/CD pipelines, Docker, GitHub Actions, Linux — I ship production-ready systems with zero-downtime deployments.",
    },
    {
      title: "Cybersecurity",
      icon: <Lock size={28} className="text-purple-400" />,
      description: "Hardened backends, secure architecture, and good opsec practices — security baked into every layer.",
    },
    {
      title: "Automation & Scripting",
      icon: <Wand2 size={28} className="text-purple-400" />,
      description: "Custom bots, automation tools, data pipelines — I automate the boring to focus on scale.",
    },
    {
      title: "System Design",
      icon: <Code size={28} className="text-purple-400" />,
      description: "I design fault-tolerant, modular systems optimized for uptime, scalability, and observability.",
    },
  ];

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-black via-zinc-900 to-purple-950 flex items-center justify-center">
      <section className="py-20 w-full px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-extrabold text-purple-500 text-center mb-16 drop-shadow-lg">
            What I Do
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-zinc-900 border border-zinc-800 hover:border-purple-500 rounded-2xl p-6 shadow-lg hover:shadow-purple-800/20 transition-all duration-300 group"
              >
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-400 transition">
                  {service.title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
