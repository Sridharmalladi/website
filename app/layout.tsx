import type { Metadata, Viewport } from "next";
import { site } from "@/config/site";
import "./globals.css";
import "@/aesthetics/sky.css";

export const metadata: Metadata = {
  title: "Sridhar Malladi | Associate AI Engineer",
  description: site.tagline,
  metadataBase: new URL(site.url),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Sridhar Malladi | AI Engineering & Data Science",
    description: site.tagline,
    url: site.url,
    siteName: site.name,
    type: "website",
    images: [{ url: "/social-card.png", width: 1200, height: 630, alt: "Sridhar Malladi. AI engineering and data science." }],
  },
  twitter: { card: "summary_large_image" },
};
export const viewport: Viewport = { themeColor: "#111916", colorScheme: "dark", width: "device-width", initialScale: 1 };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
