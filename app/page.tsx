import Hero from "@/components/Hero";
import About from '@/about/About'
import Projects from '@/projects/Projects'
import TechStack from '@/techstack/TechStack'
import Contact from '@/contacts/Contacts'

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center w-full">
      <Hero />
      <About />
      <Projects />
      <TechStack />
      <Contact />
    </main>
  )
}