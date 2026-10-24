import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "OpenCode Community Marketplace — Skills, Agents & Tools",
  description:
    "Browse community-built skills, agents, and commands for OpenCode. An independent open-source community project.",
  openGraph: {
    title: "OpenCode Community Marketplace",
    description: "Community-built skills, tools, agents, and commands for OpenCode.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
