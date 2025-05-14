import { FaEnvelope, FaLinkedin } from "react-icons/fa";

export default function Contact() {
  return (
    <section className="px-6 py-24 bg-black text-zinc-100">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-purple-500 mb-6">
          Contact Me
        </h2>

        <p className="text-zinc-400 mb-8">
          Want to collaborate or talk backend architecture?
          <br />
          Let’s connect.
        </p>

        <div className="flex justify-center gap-6 text-purple-400">
          <a
            href="mailto:niyaz47nhh@gmail.com"
            className="flex items-center gap-2 hover:text-purple-300 transition"
          >
            <FaEnvelope />
            <span className="text-sm">Email</span>
          </a>

          <a
            href="https://www.linkedin.com/in/niyazherkal/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-purple-300 transition"
          >
            <FaLinkedin />
            <span className="text-sm">LinkedIn</span>
          </a>
        </div>
      </div>
    </section>
  );
}
