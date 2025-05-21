'use client';
import Link from 'next/link';

const navItems = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "TechStack", href: "/techstack" },
  { label: "Contacts", href: "/contacts" },
];

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/30 backdrop-blur-lg border-b border-zinc-800 shadow-lg">
      <nav className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center text-zinc-200">
        <h1
          className="text-purple-400 text-3xl font-extrabold tracking-wide animate-breathing-glow drop-shadow-lg"
          style={{ fontFamily: 'Fira Mono, monospace' }}
        >
          LuC1f3-r
        </h1>
        <ul className="flex gap-8 text-base sm:text-lg">
          {navItems.map((item, idx) => (
            <li key={idx}>
              <Link
                href={item.href}
                className="relative px-4 py-2 rounded-md transition-all duration-200
                  hover:bg-purple-900/30 hover:text-purple-400
                  active:scale-95 active:bg-purple-800/60
                  focus:outline-none focus:ring-2 focus:ring-purple-500
                  before:absolute before:inset-0 before:rounded-md before:opacity-0
                  before:transition-all before:duration-300
                  hover:before:opacity-100 hover:before:shadow-[0_0_16px_4px_rgba(168,85,247,0.3)]"
                style={{ zIndex: 1 }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <style jsx global>{`
        @keyframes breathing-glow {
          0%, 100% {
            text-shadow:
              0 0 8px #a855f7,
              0 0 16px #a855f7,
              0 0 24px #a855f7;
            color: #a855f7;
          }
          50% {
            text-shadow:
              0 0 24px #a855f7,
              0 0 48px #a855f7,
              0 0 64px #a855f7;
            color: #c084fc;
          }
        }
        .animate-breathing-glow {
          animation: breathing-glow 2.5s ease-in-out infinite;
        }
      `}</style>
    </header>
  );
}
