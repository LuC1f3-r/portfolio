import "./globals.css";
import CursorTrail from "./components/cursorTrail";
import Script from "next/script";
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  title: "Niyaz Ahamad Herkal — Backend Engineer",
  description:
    "Backend Engineer building scalable APIs and event-driven microservices with Node.js, NestJS, and AWS. Architected a B2C platform scaled to 10,000+ daily transactions.",
  keywords: [
    "LuC1f3-r",
    "Niyaz Herkal",
    "Backend Developer",
    "Portfolio",
    "Microservices",
    "Node.js",
    "NestJS",
  ],
  authors: [{ name: "Niyaz Ahamad Herkal", url: "https://luc1f3r.vercel.app" }],
  creator: "LuC1f3-r",
  metadataBase: new URL("https://luc1f3r.vercel.app"),
  openGraph: {
    title: "Niyaz Ahamad Herkal — Backend Engineer",
    description:
      "Backend Engineer building scalable APIs and event-driven microservices with Node.js, NestJS, and AWS. Architected a B2C platform scaled to 10,000+ daily transactions.",
    url: "https://luc1f3r.vercel.app",
    siteName: "LuC1f3-r Portfolio",
    images: [
      {
        url: "/preview.png",
        width: 1200,
        height: 630,
        alt: "LuC1f3-r Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Niyaz Ahamad Herkal — Backend Engineer",
    description:
      "Backend Engineer building scalable APIs and event-driven microservices with Node.js, NestJS, and AWS.",
    images: ["/preview.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`lenis ${display.variable} ${body.variable} ${mono.variable}`}
    >
      <head>
        <Script
          async
          defer
          data-domain="luc1f3r.vercel.app"
          src="https://plausible.io/js/plausible.js"
          strategy="afterInteractive"
        />
      </head>
      <body className="bg-[#0A0A0A] text-[#EDEDED] antialiased font-[family-name:var(--font-body)]">
        <CursorTrail />
        {children}
      </body>
    </html>
  );
}
