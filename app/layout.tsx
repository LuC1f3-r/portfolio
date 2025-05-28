import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import "./globals.css";
import PageWrapper from "./components/pageWrapper";
import CursorTrail from "./components/cursorTrail";

export const metadata = {
  title: "LuC1f3-r | Backend Engineer of Chaos",
  description:
    "Portfolio of Niyaz Ahamad Herkal a.k.a LuC1f3-r — Microservices Specialist, Backend Developer, and Code Whisperer.",
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
    title: "LuC1f3-r | Engineer of Chaos",
    description:
      "Experience my digital empire. Backend excellence, microservice mastery, and engineered chaos.",
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
    title: "LuC1f3-r | Engineer of Chaos",
    description: "Backend Developer | Code Whisperer | Portfolio",
    images: ["/preview.png"],
  },
};

<script
  async
  defer
  data-domain="luc1f3r.vercel.app"
  src="https://plausible.io/js/plausible.js"
></script>;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <Navbar />
        <CursorTrail />
        <PageWrapper>
          {children}
        </PageWrapper>
        <Footer />
      </body>
    </html>
  );
}
