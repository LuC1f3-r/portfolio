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
    <section className="px-6 py-20 bg-black text-zinc-100">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-purple-500 mb-10">
          Projects
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="bg-zinc-900 border border-zinc-700 rounded-xl p-6 hover:border-purple-500 transition duration-300 shadow-lg hover:shadow-purple-700/30"
            >
              <h3 className="text-xl font-semibold text-purple-400 mb-2">
                {project.name}
              </h3>
              <p className="text-zinc-300 text-sm mb-4">{project.description}</p>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-purple-500 hover:underline"
              >
                View on GitHub →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}