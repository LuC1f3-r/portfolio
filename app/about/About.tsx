export default function About() {
  return (
    <section className="w-screen min-h-screen pt-16 flex items-center justify-center bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-800 text-zinc-100">
      <div className="max-w-3xl w-full mx-auto text-center px-8 py-12 rounded-2xl shadow-2xl bg-zinc-900/80 border border-zinc-800 backdrop-blur-md">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-purple-500 mb-4 drop-shadow-lg">
          About Me
        </h2>
        <p className="text-zinc-400 text-sm mb-6 font-mono">~/luc1f3r/about</p>
        <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed mb-6">
          Hi, I'm <span className="text-purple-400 font-semibold">Niyaz Ahamad Herkal</span> (<span className="text-purple-400">LuC1f3-r</span>).
          <br />
          I engineer resilient systems with an obsession for <span className="text-purple-300">uptime</span>, <span className="text-purple-300">scalability</span>, and <span className="text-purple-300">chaos resistance</span>.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6 mb-8">
          <div className="bg-zinc-800/80 rounded-lg p-4 flex-1 border border-zinc-700 shadow">
            <h3 className="text-purple-400 font-bold mb-2 text-lg">Skills</h3>
            <ul className="text-zinc-300 text-left list-disc list-inside text-base">
              <li>Distributed Systems &amp; Cloud Architecture</li>
              <li>TypeScript, Go, Python</li>
              <li>DevOps &amp; SRE (Kubernetes, CI/CD, Observability)</li>
              <li>API Design &amp; Security</li>
            </ul>
          </div>
          <div className="bg-zinc-800/80 rounded-lg p-4 flex-1 border border-zinc-700 shadow">
            <h3 className="text-purple-400 font-bold mb-2 text-lg">Interests</h3>
            <ul className="text-zinc-300 text-left list-disc list-inside text-base">
              <li>Open Source &amp; Community</li>
              <li>Chaos Engineering</li>
              <li>Automation &amp; Tooling</li>
              <li>Learning &amp; Sharing Knowledge</li>
            </ul>
          </div>
        </div>
        <div className="mt-4 text-zinc-400 border-t border-zinc-700 pt-4">
          <p className="italic text-zinc-500 text-lg">
            “In a world full of APIs and outages, I build what survives the storm.”
          </p>
        </div>
      </div>
    </section>
  );
}
