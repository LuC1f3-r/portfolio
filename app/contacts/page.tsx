"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { Send, ArrowUpRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ContactPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!formRef.current) return;

    const inputs = formRef.current.querySelectorAll("input, textarea, button");
    
    gsap.fromTo(
      inputs,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const contactInfo = [
    {
      icon: FaPhoneAlt,
      label: "Phone",
      value: "+91 88848 01005",
      href: "tel:+918884801005",
    },
    {
      icon: FaEnvelope,
      label: "Email",
      value: "niyaz47nhh@gmail.com",
      href: "mailto:niyaz47nhh@gmail.com",
    },
    {
      icon: FaMapMarkerAlt,
      label: "Location",
      value: "Bangalore, India",
      href: null,
    },
  ];

  return (
    <main
      ref={sectionRef}
      className="min-h-screen w-full py-24 px-6 flex flex-col items-center justify-center bg-gradient-to-br from-purple-950/50 via-black to-zinc-950 relative overflow-hidden text-zinc-100"
    >
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl -top-48 -left-48" />
        <div className="absolute w-96 h-96 bg-pink-500/10 rounded-full blur-3xl -bottom-48 -right-48" />
      </div>

      {/* Section indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 mb-6"
      >
        <span className="text-xs font-mono text-purple-500 tracking-widest uppercase">
          // 07. Contact
        </span>
      </motion.div>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 text-4xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 mb-4 text-center"
      >
        Get In Touch
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="relative z-10 text-zinc-400 text-lg text-center mb-12 max-w-lg"
      >
        Have a project, idea, or opportunity?{" "}
        <span className="text-purple-400">Let&apos;s build something together.</span>
      </motion.p>

      {/* Main content grid */}
      <div className="relative z-10 w-full max-w-4xl grid grid-cols-1 lg:grid-cols-5 gap-12">
        {/* Contact Form */}
        <form
          ref={formRef}
          className="lg:col-span-3 flex flex-col gap-5 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl p-8"
          action="https://formsubmit.co/niyaz47nhh@gmail.com"
          method="POST"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-zinc-500 font-mono mb-2 block">Name</label>
              <input
                type="text"
                name="name"
                required
                placeholder="John Doe"
                className="w-full p-4 rounded-xl bg-zinc-800/50 border border-zinc-700 placeholder-zinc-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 transition-all"
              />
            </div>
            <div>
              <label className="text-xs text-zinc-500 font-mono mb-2 block">Email</label>
              <input
                type="email"
                name="email"
                required
                placeholder="john@example.com"
                className="w-full p-4 rounded-xl bg-zinc-800/50 border border-zinc-700 placeholder-zinc-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-zinc-500 font-mono mb-2 block">Subject</label>
            <input
              type="text"
              name="subject"
              placeholder="Project Inquiry"
              className="w-full p-4 rounded-xl bg-zinc-800/50 border border-zinc-700 placeholder-zinc-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 transition-all"
            />
          </div>

          <div>
            <label className="text-xs text-zinc-500 font-mono mb-2 block">Message</label>
            <textarea
              name="message"
              required
              placeholder="Tell me about your project..."
              rows={5}
              className="w-full p-4 rounded-xl bg-zinc-800/50 border border-zinc-700 placeholder-zinc-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 transition-all resize-none"
            />
          </div>

          {/* Hidden formsubmit fields */}
          <input type="hidden" name="_next" value="https://luc1f3r.vercel.app" />
          <input type="hidden" name="_captcha" value="false" />

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="mt-2 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all text-white font-semibold shadow-lg shadow-purple-500/20 flex items-center justify-center gap-2 group"
          >
            <span>Send Message</span>
            <Send size={18} className="transition-transform group-hover:translate-x-1" />
          </motion.button>
        </form>

        {/* Contact Info Side */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Contact cards */}
          {contactInfo.map((info, idx) => {
            const Icon = info.icon;
            const Wrapper = info.href ? "a" : "div";
            
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Wrapper
                  {...(info.href ? { href: info.href } : {})}
                  className="group flex items-center gap-4 p-5 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl hover:border-purple-500/50 transition-all cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                    <Icon size={20} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-zinc-500 font-mono">{info.label}</p>
                    <p className="text-white group-hover:text-purple-400 transition-colors">
                      {info.value}
                    </p>
                  </div>
                  {info.href && (
                    <ArrowUpRight size={18} className="text-zinc-600 group-hover:text-purple-400 transition-colors" />
                  )}
                </Wrapper>
              </motion.div>
            );
          })}

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-4 p-6 bg-gradient-to-br from-purple-900/30 to-pink-900/20 border border-purple-500/20 rounded-xl"
          >
            <p className="text-sm text-zinc-400 mb-3">
              Prefer a quick call? Let&apos;s schedule a meeting.
            </p>
            <a
              href="https://cal.com/niyazherkal"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-purple-400 hover:text-pink-400 transition-colors text-sm font-medium"
            >
              <span>Book a call</span>
              <ArrowUpRight size={14} />
            </a>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
