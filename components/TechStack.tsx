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

export default function TechStack() {
  return (
    <section className="px-6 py-20 bg-zinc-950 text-zinc-100">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-purple-500 mb-10">
          Tech Arsenal
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 place-items-center">
          {tech.map(({ icon: Icon, name }, idx) => (
            <div
              key={idx}
              className="group relative flex flex-col items-center justify-center p-4 rounded-xl bg-zinc-900 border border-zinc-700 hover:border-purple-500 hover:shadow-purple-700/40 transition duration-300"
            >
              <Icon className="text-3xl text-purple-400 group-hover:scale-110 transition-transform" />
              <span className="absolute -bottom-6 text-xs text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
