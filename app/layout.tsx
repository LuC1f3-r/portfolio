import type { Metadata } from "next";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "LuC1f3-r | Backend Engineer of Chaos",
  description: "Portfolio of Niyaz Ahamad Herkal a.k.a LuC1f3-r — Microservices Specialist, Backend Developer, and Code Whisperer.",
  keywords: ["LuC1f3-r", "Niyaz Herkal", "Backend Developer", "Portfolio", "Microservices", "Node.js", "NestJS"],
  authors: [{ name: "Niyaz Ahamad Herkal", url: "https://luc1f3r.vercel.app" }],
  creator: "LuC1f3-r",
};

<script async defer data-domain="luc1f3r.vercel.app" src="https://plausible.io/js/plausible.js"></script>

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
     <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
