"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send, ArrowUpRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const contactItems = [
  { label: "Email", value: "niyaz47nhh@gmail.com", href: "mailto:niyaz47nhh@gmail.com" },
  { label: "Phone", value: "+91 88848 01005", href: "tel:+918884801005" },
  { label: "Location", value: "Bangalore, India", href: null },
];

const MASK_STYLE: CSSProperties = { overflow: "hidden", paddingBottom: "0.1em" };
const inputClass =
  "w-full rounded-none border border-[#1a1a1a] bg-[#0e0e0e] px-4 py-3 text-[#ededed] placeholder-[#555] transition-colors duration-200 focus:border-[#c8ff00] focus:outline-none focus:ring-1 focus:ring-[#c8ff00]";
const labelClass =
  "mb-2 block font-[family-name:var(--font-mono)] text-xs uppercase tracking-wide text-[#888]";

export default function ContactPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reduced) return;

    const ctx = gsap.context(() => {
      gsap.set(".contact-line", { yPercent: 120 });

      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            io.disconnect();
            const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
            tl.to(".contact-line", { yPercent: 0, duration: 1.0, stagger: 0.1 }).set(
              ".contact-mask",
              { overflow: "visible" }
            );
          }
        },
        { threshold: 0.4 }
      );
      io.observe(section);

      if (formRef.current) {
        gsap.from(formRef.current.querySelectorAll("input, textarea, button"), {
          y: 24,
          opacity: 0,
          duration: 0.55,
          stagger: 0.07,
          ease: "power3.out",
          scrollTrigger: { trigger: formRef.current, start: "top 82%" },
        });
      }

      return () => io.disconnect();
    }, section);

    return () => ctx.revert();
  }, [reduced]);

  // Magnetic send button — the transform trails the cursor via the CSS
  // transition, off the React render loop.
  const onBtnMove = (e: React.MouseEvent) => {
    const b = btnRef.current;
    if (!b || reduced) return;
    const r = b.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    b.style.transform = `translate(${x * 0.3}px, ${y * 0.45}px)`;
  };
  const onBtnLeave = () => {
    if (btnRef.current) btnRef.current.style.transform = "translate(0,0)";
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] w-full overflow-hidden bg-[#060606] px-6 py-28 text-[#ededed]"
    >
      <div className="mx-auto w-full max-w-4xl">
        <p className="mb-8 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.3em] text-[#888]">
          Contact
        </p>

        {/* Masked kinetic headline */}
        <h2 className="mb-16 font-[family-name:var(--font-display)] text-6xl font-bold leading-[0.9] tracking-tight text-[#ededed] sm:text-7xl md:text-8xl">
          <span className="contact-mask block" style={MASK_STYLE}>
            <span className="contact-line block">Let&apos;s build</span>
          </span>
          <span className="contact-mask block" style={MASK_STYLE}>
            <span className="contact-line block">
              something <span className="text-[#c8ff00]">good.</span>
            </span>
          </span>
        </h2>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
          <form
            ref={formRef}
            className="flex flex-col gap-5 lg:col-span-3"
            action="https://formsubmit.co/niyaz47nhh@gmail.com"
            method="POST"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Name</label>
                <input type="text" name="name" required placeholder="Bruce Wayne" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Email</label>
                <input type="email" name="email" required placeholder="you@company.com" className={inputClass} />
              </div>
            </div>
            <div>
              <label className={labelClass}>Subject</label>
              <input type="text" name="subject" placeholder="Project inquiry" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Message</label>
              <textarea
                name="message"
                required
                rows={5}
                placeholder="Tell me about what you're building..."
                className={`${inputClass} resize-none`}
              />
            </div>

            {/* Hidden formsubmit fields — do not remove */}
            <input type="hidden" name="_next" value="https://luc1f3r.vercel.app" />
            <input type="hidden" name="_captcha" value="false" />

            <button
              ref={btnRef}
              type="submit"
              onMouseMove={onBtnMove}
              onMouseLeave={onBtnLeave}
              className="mt-1 inline-flex items-center justify-center gap-2 bg-[#c8ff00] px-8 py-4 font-[family-name:var(--font-mono)] text-xs font-bold uppercase tracking-[0.18em] text-[#0a0a0a] transition-transform duration-300 ease-out active:scale-[0.98]"
            >
              <span>Send message</span>
              <Send size={15} />
            </button>
          </form>

          {/* Info side */}
          <div className="flex flex-col gap-8 lg:col-span-2">
            <ul className="flex flex-col gap-5">
              {contactItems.map((item) => (
                <li key={item.label} className="border-b border-[#1a1a1a] pb-5">
                  <span className="mb-1 block font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-widest text-[#888]">
                    {item.label}
                  </span>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-base text-[#ededed] transition-colors duration-200 hover:text-[#c8ff00]"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className="text-base text-[#ededed]">{item.value}</span>
                  )}
                </li>
              ))}
            </ul>

            <div>
              <p className="mb-2 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-widest text-[#888]">
                Schedule
              </p>
              <a
                href="https://cal.com/niyazherkal"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 text-sm text-[#ededed] transition-colors duration-200 hover:text-[#c8ff00]"
              >
                <span>Book a call</span>
                <ArrowUpRight
                  size={14}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Batman closer — the payoff the whole night has been building to */}
        <p className="mt-28 font-[family-name:var(--font-mono)] text-sm tracking-wide text-[#555]">
          Full-time developer by day. And by night, I&apos;m{" "}
          <span className="text-[#c8ff00]">Batman</span>.
        </p>
      </div>
    </section>
  );
}
