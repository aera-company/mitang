import type { Metadata, Viewport } from "next";
import { Geist_Mono, Instrument_Sans } from "next/font/google";
import "./globals.css";

// Instrument Sans carries display and body (wdth axis for the semi-condensed
// display cut, as on the AERA site). Geist Mono only for indexes/coordinates.
const sans = Instrument_Sans({
  variable: "--font-sans-src",
  subsets: ["latin"],
  axes: ["wdth"],
});

const mono = Geist_Mono({
  variable: "--font-mono-src",
  subsets: ["latin"],
  weight: ["400"],
});

// Private proposal: never indexed.
export const metadata: Metadata = {
  title: "AERA × MITANG · Proposta",
  description:
    "Growth, inteligência comercial e tecnologia para o comercial da MITANG.",
  robots: { index: false, follow: false },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#080a0b",
};

/* Runs before first paint: opt into motion start states only when motion is
   allowed, and drop them after 3s if no scene has started (JS failure). */
const MOTION_BOOT = `(function(){var d=document.documentElement;if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;d.classList.add('motion');setTimeout(function(){if(!window.__motionReady)d.classList.remove('motion')},3000)})()`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${sans.variable} ${mono.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: MOTION_BOOT }} />
      </head>
      <body className="relative min-h-svh">
        <a
          href="#main"
          className="type-micro fixed left-[var(--margin)] top-3 z-50 -translate-y-24 bg-[var(--paper)] px-3 py-2 text-[var(--ink)] focus:translate-y-0"
        >
          Pular para o conteúdo
        </a>
        {children}
      </body>
    </html>
  );
}
