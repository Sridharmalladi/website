import type { Metadata, Viewport } from "next";
import { Lato } from "next/font/google";
import { site } from "@/config/site";
import Sky from "@/aesthetics/Sky";
import Emergence from "@/aesthetics/Emergence";
import "./globals.css";
import "@/aesthetics/sky.css";

/**
 * Lato. A plain grotesque to match the reference layout — the page is a grid of
 * image tiles, and the type's job is to stay out of their way. Three real
 * weights shipped, so nothing has to be synthesised.
 */
const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sridhar Malladi",
  description: site.tagline,
  metadataBase: new URL("https://sridharmalladi.online"),
  // No icons entry on purpose. Setting one here writes a plain <link
  // href="/icon.svg">, and a browser caches a favicon hard enough that a
  // changed icon at an unchanged path never gets picked up. Left alone, Next
  // finds app/icon.svg on its own and stamps the link with a hash of the file,
  // so a new icon arrives at a new URL and shows up immediately.
  openGraph: {
    title: site.name,
    description: site.tagline,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0d0f13",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={lato.variable}>
      <body>
        <Sky />
        {children}
        <Emergence />
      </body>
    </html>
  );
}
