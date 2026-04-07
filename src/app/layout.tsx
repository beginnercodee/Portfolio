import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

import CommandPalette from "@/components/CommandPalette";
import TerminalOverlay from "@/components/TerminalOverlay";

export const metadata: Metadata = {
  title: "Jamal Nadeem | Automation Engineer",
  description: "Portfolio of Jamal Nadeem, a full-stack developer and AI automation expert.",
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
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
