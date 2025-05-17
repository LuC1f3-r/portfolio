'use client';

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "TechStack", href: "/techstack" },
  { label: "Contacts", href: "/contacts" },
];

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/70 backdrop-blur border-b border-zinc-800 shadow-sm">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center text-zinc-200">
        <h1 className="text-purple-500 text-xl font-bold">LuC1f3-r</h1>
        <ul className="flex gap-6 text-sm sm:text-base">
          {navItems.map((item, idx) => (
            <li key={idx}>
              <a href={item.href} className="hover:text-purple-400 transition">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
adasfadasd