import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NEXUS | Digital Architect",
  description: "A futuristic personal portfolio showcasing digital craftsmanship, creative coding, and immersive web experiences. Built with neon aesthetics and cyberpunk vibes.",
  keywords: ["Nexus", "Portfolio", "Cyberpunk", "Futuristic", "Developer", "Creative Coder", "Digital Architect", "Neon", "WebGL"],
  authors: [{ name: "Nexus" }],
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>",
  },
  openGraph: {
    title: "NEXUS | Digital Architect",
    description: "A futuristic personal portfolio with neon aesthetics",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NEXUS | Digital Architect",
    description: "A futuristic personal portfolio with neon aesthetics",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
