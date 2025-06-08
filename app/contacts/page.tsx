"use client";

import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

export default function ContactPage() {
  return (
    <main className="min-h-screen w-screen flex flex-col items-center justify-between bg-gradient-to-br from-purple-900 via-black to-zinc-900 relative overflow-hidden text-zinc-100">
      {/* Animated background blobs */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute w-72 h-72 bg-purple-700 opacity-30 rounded-full mix-blend-multiply filter blur-2xl animate-pulse left-[-6rem] top-[-6rem]" />
        <div className="absolute w-96 h-96 bg-pink-500 opacity-20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse right-[-8rem] bottom-[-8rem]" />
        <div className="absolute w-60 h-60 bg-blue-500 opacity-20 rounded-full mix-blend-multiply filter blur-2xl animate-pulse left-[40%] top-[-4rem] animate-slow" />
        <div className="absolute w-80 h-80 bg-purple-400 opacity-15 rounded-full mix-blend-multiply filter blur-3xl animate-pulse right-[30%] bottom-[-6rem] animate-slower" />
      </div>

      {/* Contact Heading & Form */}
      <section className="py-24 px-4 max-w-4xl mx-auto text-center z-10 w-full">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 mb-8 drop-shadow-lg animate-fade-in">
          Contact Me
        </h2>
        <p className="text-zinc-300 mb-12 text-lg animate-fade-in delay-100">
          Have a project, idea, or opportunity?
          <br />
          <span className="text-purple-300 font-semibold">
            Let’s build something together.
          </span>
        </p>

        {/* Contact Form */}
        <form
          className="flex flex-col gap-4 animate-fade-in delay-200"
          action="https://formsubmit.co/niyaz47nhh@gmail.com"
          method="POST"
        >
          <input
            type="text"
            placeholder="Your Name"
            className="p-3 rounded bg-zinc-800 border border-zinc-700 placeholder-zinc-500 focus:outline-none focus:border-purple-500"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="p-3 rounded bg-zinc-800 border border-zinc-700 placeholder-zinc-500 focus:outline-none focus:border-purple-500"
          />
          <textarea
            placeholder="Your Message"
            rows={5}
            className="p-3 rounded bg-zinc-800 border border-zinc-700 placeholder-zinc-500 focus:outline-none focus:border-purple-500"
          ></textarea>
          <button
            type="submit"
            className="mt-4 px-6 py-3 rounded bg-gradient-to-r from-purple-600 to-pink-500 hover:brightness-110 transition text-white font-semibold shadow-lg"
          >
            Send Message
          </button>
        </form>
      </section>

      {/* Bottom Icons Section */}
      <div className="w-full max-w-4xl mx-auto px-4 pb-10 grid grid-cols-1 sm:grid-cols-3 gap-8 text-purple-400 text-center z-10 animate-fade-in delay-300 border-t border-zinc-700 pt-8">
        <div className="group flex flex-col items-center gap-2 hover:text-pink-400 transition">
          <FaPhoneAlt
            size={28}
            className="group-hover:scale-110 transition-transform"
          />
          <span className="text-sm font-medium">+91 88848 01005</span>
        </div>
        <div className="group flex flex-col items-center gap-2 hover:text-pink-400 transition">
          <FaEnvelope
            size={28}
            className="group-hover:scale-110 transition-transform"
          />
          <span className="text-sm font-medium">niyaz47nhh@gmail.com</span>
        </div>
        <div className="group flex flex-col items-center gap-2 hover:text-pink-400 transition">
          <FaMapMarkerAlt
            size={28}
            className="group-hover:scale-110 transition-transform"
          />
          <span className="text-sm font-medium">Bangalore, India</span>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out both;
        }
        .delay-100 {
          animation-delay: 0.1s;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
        .animate-slow {
          animation-duration: 3s !important;
        }
        .animate-slower {
          animation-duration: 5s !important;
        }
      `}</style>
    </main>
  );
}
