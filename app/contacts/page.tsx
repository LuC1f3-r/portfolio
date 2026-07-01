"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send, ArrowUpRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!formRef.current) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Skip animation — leave elements at their final visible state
      return;
    }

    const inputs = formRef.current.querySelectorAll("input, textarea, button");

    gsap.fromTo(
      inputs,
      { y: 24, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.55,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const contactItems = [
    {
      label: "Email",
      value: "niyaz47nhh@gmail.com",
      href: "mailto:niyaz47nhh@gmail.com",
    },
    {
      label: "Phone",
      value: "+91 88848 01005",
      href: "tel:+918884801005",
    },
    {
      label: "Location",
      value: "Bangalore, India",
      href: null,
    },
  ];

  return (
    <main className="min-h-screen w-full py-24 px-6 flex flex-col items-center justify-center bg-[#0a0a0a] relative overflow-hidden text-[#ededed]">

      {/* Kicker */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8 self-start w-full max-w-4xl mx-auto"
      >
        <span className="font-mono-token text-xs text-[#888] tracking-widest uppercase">
          Contact
        </span>
      </motion.div>

      {/* Closing statement */}
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none text-[#ededed] mb-16 self-start w-full max-w-4xl mx-auto"
      >
        Let&apos;s build<br />
        something.
      </motion.h2>

      {/* Main grid */}
      <div className="relative z-10 w-full max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">

        {/* Contact form */}
        <form
          ref={formRef}
          className="lg:col-span-3 flex flex-col gap-5"
          action="https://formsubmit.co/niyaz47nhh@gmail.com"
          method="POST"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-mono-token text-xs text-[#888] mb-2 block tracking-wide uppercase">
                Name
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="John Doe"
                className="w-full px-4 py-3 bg-[#111] border border-[#1a1a1a] text-[#ededed] placeholder-[#444] rounded-none focus:outline-none focus:border-[#c8ff00] focus:ring-1 focus:ring-[#c8ff00] transition-all duration-200"
              />
            </div>
            <div>
              <label className="font-mono-token text-xs text-[#888] mb-2 block tracking-wide uppercase">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="john@example.com"
                className="w-full px-4 py-3 bg-[#111] border border-[#1a1a1a] text-[#ededed] placeholder-[#444] rounded-none focus:outline-none focus:border-[#c8ff00] focus:ring-1 focus:ring-[#c8ff00] transition-all duration-200"
              />
            </div>
          </div>

          <div>
            <label className="font-mono-token text-xs text-[#888] mb-2 block tracking-wide uppercase">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              placeholder="Project Inquiry"
              className="w-full px-4 py-3 bg-[#111] border border-[#1a1a1a] text-[#ededed] placeholder-[#444] rounded-none focus:outline-none focus:border-[#c8ff00] focus:ring-1 focus:ring-[#c8ff00] transition-all duration-200"
            />
          </div>

          <div>
            <label className="font-mono-token text-xs text-[#888] mb-2 block tracking-wide uppercase">
              Message
            </label>
            <textarea
              name="message"
              required
              placeholder="Tell me about your project..."
              rows={5}
              className="w-full px-4 py-3 bg-[#111] border border-[#1a1a1a] text-[#ededed] placeholder-[#444] rounded-none focus:outline-none focus:border-[#c8ff00] focus:ring-1 focus:ring-[#c8ff00] transition-all duration-200 resize-none"
            />
          </div>

          {/* Hidden formsubmit fields — do not remove */}
          <input type="hidden" name="_next" value="https://luc1f3r.vercel.app" />
          <input type="hidden" name="_captcha" value="false" />

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="mt-1 px-8 py-4 bg-[#c8ff00] text-[#000] font-semibold tracking-wide flex items-center justify-center gap-2 group transition-opacity duration-200 hover:opacity-90"
          >
            <span>Send Message</span>
            <Send size={16} className="transition-transform group-hover:translate-x-1" />
          </motion.button>
        </form>

        {/* Info side */}
        <div className="lg:col-span-2 flex flex-col gap-8">

          {/* Contact list */}
          <ul className="flex flex-col gap-5">
            {contactItems.map((item, idx) => {
              const isLink = !!item.href;
              return (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.09, duration: 0.5, ease: "easeOut" }}
                  className="border-b border-[#1a1a1a] pb-5"
                >
                  <span className="font-mono-token text-[10px] text-[#888] tracking-widest uppercase block mb-1">
                    {item.label}
                  </span>
                  {isLink ? (
                    <a
                      href={item.href!}
                      className="text-[#ededed] hover:text-[#c8ff00] transition-colors duration-200 text-base"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className="text-[#ededed] text-base">{item.value}</span>
                  )}
                </motion.li>
              );
            })}
          </ul>

          {/* Book a call */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 }}
          >
            <p className="font-mono-token text-[10px] text-[#888] tracking-widest uppercase mb-2">
              Schedule
            </p>
            <a
              href="https://cal.com/niyazherkal"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#ededed] hover:text-[#c8ff00] transition-colors duration-200 text-sm group"
            >
              <span>Book a call</span>
              <ArrowUpRight
                size={14}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Batman easter egg */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="font-mono-token text-[11px] text-[#888] tracking-wide mt-20 self-start w-full max-w-4xl mx-auto hover:text-[#c8ff00] transition-colors duration-300 cursor-default select-none"
      >
        Full-time developer by day. And by night, I&apos;m Batman.
      </motion.p>
    </main>
  );
}
