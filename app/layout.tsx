import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'LuC1f3-r | Engineer of Chaos',
  description: 'Official portfolio of LuC1f3-r — backend dev & code whisperer',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">{children}</body>
    </html>
  )
}
