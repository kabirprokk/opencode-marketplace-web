import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL("https://ocms.pages.dev"),
  title: {
    default: "OpenCode Skills & Agents Marketplace | OCM",
    template: "%s | OpenCode Marketplace",
  },
  description:
    "Find OpenCode skills, AI coding agents, commands, skill packs, and MCP servers in an independent community directory. Browse listings and inspect sources before installing.",
  applicationName: "OpenCode Marketplace",
  category: "developer tools",
  keywords: [
    "OpenCode",
    "OpenCode marketplace",
    "OpenCode skills",
    "coding agents",
    "AI coding tools",
    "OpenCode agents",
    "OpenCode commands",
    "OpenCode skill packs",
    "MCP servers for OpenCode",
    "OpenCode MCP servers",
    "MCP servers",
    "developer tools",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: "TcpX8wM2gOfL2XigaiM58ssNxeyO5uGO3Eo0SL3fYFU",
  },
  openGraph: {
    title: "OpenCode Skills & Agents Marketplace | OCM",
    description:
      "Discover community-built OpenCode skills, agents, commands, skill packs, and MCP servers. Inspect each source before installing.",
    url: "/",
    siteName: "OpenCode Marketplace",
    type: "website",
    images: [{ url: "/opencode-intro-poster.jpg", width: 960, height: 540, alt: "OpenCode Marketplace community directory" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenCode Skills & Agents Marketplace | OCM",
    description:
      "Community-built OpenCode skills, agents, commands, skill packs, and MCP servers.",
    images: ["/opencode-intro-poster.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://ocms.pages.dev/#organization",
                  name: "OpenCode Marketplace",
                  alternateName: "OCM",
                  url: "https://ocms.pages.dev/",
                  description:
                    "An independent community directory of skills, agents, commands, plugins, and MCP servers for OpenCode.",
                  sameAs: [
                    "https://github.com/kabirprokk/opencode-marketplace",
                    "https://github.com/kabirprokk/opencode-registry",
                  ],
                },
                {
                  "@type": "WebSite",
                  "@id": "https://ocms.pages.dev/#website",
                  name: "OpenCode Marketplace",
                  alternateName: "OCM",
                  url: "https://ocms.pages.dev/",
                  publisher: { "@id": "https://ocms.pages.dev/#organization" },
                  inLanguage: "en",
                },
              ],
            }).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
