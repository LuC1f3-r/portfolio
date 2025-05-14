import Hero from "@/components/Hero";
import About from '@/components/About'
import Projects from '@/components/Projects'
import TechStack from '@/components/TechStack'
import Contact from '@/components/Contacts'

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