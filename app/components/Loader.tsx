"use client";

import { useEffect, useState } from "react";

const lines = [
  "> Initializing portfolio...",
  "> Loading neural modules...",
  "> Compiling aesthetic layers...",
  "> Booting core personality...",
  "> Accessing interface...",
  "> Welcome back, Commander.",
];

export default function Typewriter({ onComplete }: { onComplete: () => void }) {
  const [text, setText] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;

    const currentLine = lines[lineIndex];

    if (charIndex < currentLine.length) {
      const delay = currentLine[charIndex] === "." ? 250 : 50;
      const timeout = setTimeout(() => {
        setText((prev) => prev + currentLine[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    } else if (lineIndex < lines.length - 1) {
      const timeout = setTimeout(() => {
        setText((prev) => prev + "\n");
        setLineIndex((prev) => prev + 1);
        setCharIndex(0);
      }, 400);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setDone(true);
        onComplete();
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, lineIndex, done, onComplete]);

  return <pre className="whitespace-pre-wrap">{text}</pre>;
}
