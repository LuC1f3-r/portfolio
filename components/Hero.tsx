'use client'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const typingTexts = [
  'Backend Developer.',
  'Code Whisperer.',
  'Engineer of Chaos.',
]

export default function Hero() {
  return (
    <section className="h-screen w-full flex flex-col items-center justify-center text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-tr from-[#0f0f0f] via-[#111827] to-[#0f0f0f] opacity-80 z-0" />
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="z-10 text-5xl sm:text-6xl md:text-7xl font-bold text-white drop-shadow-[0_0_10px_#00ffcc]"
      >
        LuC1f3-r
      </motion.h1>

      <motion.div
        className="z-10 mt-6 text-xl sm:text-2xl md:text-3xl text-[#00ffcc] font-mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <Typewriter texts={typingTexts} speed={100} delay={1500} />
      </motion.div>
    </section>
  )
}

function Typewriter({ texts, speed = 100, delay = 1500 }: { texts: string[], speed?: number, delay?: number }) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [subIndex, setSubIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      const currentText = texts[index]
      if (!deleting) {
        setText(currentText.substring(0, subIndex + 1))
        setSubIndex(subIndex + 1)
        if (subIndex === currentText.length) {
          setDeleting(true)
        }
      } else {
        setText(currentText.substring(0, subIndex - 1))
        setSubIndex(subIndex - 1)
        if (subIndex === 0) {
          setDeleting(false)
          setIndex((index + 1) % texts.length)
        }
      }
    }, deleting ? speed / 2 : speed)
    return () => clearTimeout(timeout)
  }, [text, deleting])

  return <div>{text}|</div>
}
