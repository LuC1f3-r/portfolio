export default function About() {
  return (
    <section className="px-6 py-16 bg-zinc-950 text-zinc-100">
      <div className="max-w-4xl mx-auto text-left">
        <h2 className="text-3xl sm:text-4xl font-bold text-purple-500 mb-6">
          About Me
        </h2>

        <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-6 font-mono shadow-xl">
          <p className="text-zinc-400 text-sm mb-2">~/luc1f3r/about</p>
          <p className="text-lg text-zinc-300 leading-relaxed">
            My name is <span className="text-purple-400">Niyaz Ahamad Herkal</span>, alias <span className="text-purple-400">LuC1f3-r</span>.<br />
            I engineer systems with an obsession for uptime, scalability, and chaos resistance.
          </p>

          <div className="mt-6 text-zinc-400 border-t border-zinc-700 pt-4">
            <p className="italic text-zinc-500">
              “In a world full of APIs and outages, I build what survives the storm.”
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
