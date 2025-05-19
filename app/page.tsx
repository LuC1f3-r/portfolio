import Hero from "@/app/components/Hero";
import About from '@/app/about/About'
import Projects from '@/app/projects/Projects'
import TechStack from '@/app/techstack/TechStack'
import Contact from '@/app/contacts/Contacts'

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