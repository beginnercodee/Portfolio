import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "block",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "block",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "block",
});

import CommandPalette from "@/components/CommandPalette";
import TerminalOverlay from "@/components/TerminalOverlay";
import KonamiCode from "@/components/KonamiCode";

export const metadata: Metadata = {
  metadataBase: new URL("https://jamalnadeem.com"),
  title: {
    default: "Jamal Nadeem | Automation Engineer",
    template: "%s | Jamal Nadeem",
  },
  description: "Portfolio of Jamal Nadeem, a full-stack developer and AI automation expert specializing in building massive architecture and autonomous systems.",
  keywords: ["Software Engineer", "AI Integrations", "Full-Stack Developer", "Next.js", "Automation", "Jamal Nadeem"],
  authors: [{ name: "Jamal Nadeem" }],
  creator: "Jamal Nadeem",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jamalnadeem.com",
    title: "Jamal Nadeem | System Architect",
    description: "Full-stack developer and AI integration specialist. Building intelligent, scalable systems that eliminate manual work.",
    siteName: "Jamal Nadeem Portfolio",
    images: [
      {
        url: "/og-image.jpg", // Make sure to add this image to /public later!
        width: 1200,
        height: 630,
        alt: "Jamal Nadeem | Automation Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jamal Nadeem | System Architect",
    description: "Full-stack developer and AI integration specialist.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: import("next").Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased bg-background text-primary`}>
        {children}
        <CommandPalette />
        <TerminalOverlay />
        <KonamiCode />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
