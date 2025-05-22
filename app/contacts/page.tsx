"use client";

import { FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";

export default function ContactPage() {
  return (
    <main className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-black to-zinc-900 relative overflow-hidden text-zinc-100">
      {" "}
      {/* Animated background blobs */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute w-72 h-72 bg-purple-700 opacity-30 rounded-full mix-blend-multiply filter blur-2xl animate-pulse left-[-6rem] top-[-6rem]" />
        <div className="absolute w-96 h-96 bg-pink-500 opacity-20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse right-[-8rem] bottom-[-8rem]" />
        <div className="absolute w-60 h-60 bg-blue-500 opacity-20 rounded-full mix-blend-multiply filter blur-2xl animate-pulse left-[40%] top-[-4rem] animate-slow" />
        <div className="absolute w-80 h-80 bg-purple-400 opacity-15 rounded-full mix-blend-multiply filter blur-3xl animate-pulse right-[30%] bottom-[-6rem] animate-slower" />
      </div>
      <section
        id="contact"
        className="py-24 px-4 max-w-4xl mx-auto text-center"
      >
        <h2 className="text-4xl font-semibold mb-6 text-gradient">
          Get In Touch
        </h2>
        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Name"
            className="p-3 rounded bg-zinc-800 border border-zinc-700"
          />
          <input
            type="email"
            placeholder="Email"
            className="p-3 rounded bg-zinc-800 border border-zinc-700"
          />
          <textarea
            placeholder="Message"
            rows={5}
            className="p-3 rounded bg-zinc-800 border border-zinc-700"
          ></textarea>
          <button
            type="submit"
            className="mt-4 px-6 py-2 rounded bg-purple-600 hover:bg-purple-700 transition text-white font-semibold"
          >
            Send Message
          </button>
        </form>
      </section>
      <section className="w-full px-6 py-24 z-10">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 mb-6 drop-shadow-lg animate-fade-in">
            Contact Me
          </h2>
          <p className="text-zinc-300 mb-8 text-lg animate-fade-in delay-100">
            Want to collaborate or talk backend architecture?
            <br />
            <span className="text-purple-300 font-semibold">
              Let’s connect.
            </span>
          </p>
          <div className="flex justify-center gap-8 text-purple-300 animate-fade-in delay-200">
            <a
              href="mailto:niyaz47nhh@gmail.com"
              className="flex items-center gap-2 hover:text-pink-300 transition text-lg font-medium"
            >
              <FaEnvelope size={24} />
              <span>Email</span>
            </a>
            <a
              href="https://www.linkedin.com/in/niyazherkal/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-pink-300 transition text-lg font-medium"
            >
              <FaLinkedin size={24} />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://github.com/niyazherkal"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-pink-300 transition text-lg font-medium"
            >
              <FaGithub size={24} />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </section>
      {/* Simple fade-in animation */}
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
          animation: fade-in 1s cubic-bezier(0.4, 0, 0.2, 1) both;
        }
        .delay-100 {
          animation-delay: 0.1s;
        }
        .delay-200 {
          animation-delay: 0.2s;
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
