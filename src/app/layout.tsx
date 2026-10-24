import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "OpenCode Marketplace — Free Skills, Tools & Agents",
  description:
    "Browse and install free community skills, tools, agents, and commands for OpenCode. Made by OpenCode's own AI. 100% free and open source.",
  openGraph: {
    title: "OpenCode Marketplace",
    description: "Free skills, tools, agents, and commands for OpenCode. Made by OpenCode's own AI.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
