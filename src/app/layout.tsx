import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL("https://ocms.pages.dev"),
  title: {
    default: "OpenCode Marketplace (OCM) — Skills, Agents & Tools",
    template: "%s | OpenCode Marketplace",
  },
  description:
    "Find community-built coding agents, skills, commands, plugins, and MCP servers for OpenCode. Browse the independent OpenCode Marketplace and inspect sources before installing.",
  applicationName: "OpenCode Marketplace",
  category: "developer tools",
  keywords: [
    "OpenCode",
    "OpenCode marketplace",
    "OpenCode skills",
    "coding agents",
    "AI coding tools",
    "OpenCode agents",
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
    title: "OpenCode Marketplace (OCM) — Skills, Agents & Tools",
    description:
      "Discover community-built skills, coding agents, commands, plugins, and MCP servers for OpenCode. Inspect the source before installing.",
    url: "/",
    siteName: "OpenCode Marketplace",
    type: "website",
    images: ["/icon.svg"],
  },
  twitter: {
    card: "summary",
    title: "OpenCode Marketplace (OCM)",
    description:
      "Community-built skills, coding agents, commands, plugins, and MCP servers for OpenCode.",
    images: ["/icon.svg"],
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
