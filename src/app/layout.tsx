import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL("https://ocms.pages.dev"),
  title: "OCM — OpenCode Marketplace",
  description:
    "Discover community-built skills, agents, commands, and tools for OpenCode. An independent community project.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "OCM — OpenCode Marketplace",
    description: "An independent directory of community-built skills and tools for OpenCode.",
    url: "/",
    siteName: "OpenCode Marketplace",
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
