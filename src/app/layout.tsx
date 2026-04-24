import type { Metadata } from "next";
import "./globals.css";
import { LenisProvider } from "@/components/lenis-provider";
import { ScrollProgress } from "@/components/scroll-progress";
import { SiteNav } from "@/components/site-nav";
import { Starfield } from "@/components/starfield";
import { SITE } from "@/data/site";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ThemeScript } from "@/components/theme/theme-script";
import { CursorGlow } from "@/components/cursor-glow";
import { ScrollScene } from "@/components/scroll-scene";
import { Inter, JetBrains_Mono } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  title: `${SITE.name} — ${SITE.tagline}`,
  description: SITE.description,
  keywords: [...SITE.keywords],
  metadataBase: new URL(SITE.url),
  alternates: {
    canonical: "/"
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png"
  },
  openGraph: {
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${SITE.name} Portfolio`
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    creator: SITE.twitter,
    images: ["/og-image.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className={`${inter.variable} ${mono.variable}`}>
        <ThemeProvider>
          <LenisProvider>
            <main className="relative">
              <ScrollScene />
              <CursorGlow />
              <Starfield />
              <ScrollProgress />
              <SiteNav />
              {children}
              <footer className="border-t border-border/70">
                <div className="container py-10 text-sm text-muted">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <p>
                      © {new Date().getFullYear()} {SITE.name}. All rights reserved.
                    </p>
                    <p className="opacity-80">Made with ❤️ in India.</p>
                  </div>
                </div>
              </footer>
            </main>
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
