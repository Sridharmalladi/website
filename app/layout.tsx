import type { Metadata, Viewport } from "next";
import { Della_Respira } from "next/font/google";
import { site } from "@/config/site";
import "./globals.css";

/**
 * Della Respira. It ships a single 400 weight, so hierarchy comes from size,
 * letter-spacing and colour rather than boldness — asking the browser to
 * synthesise bold from one weight just smears the serifs.
 */
const della = Della_Respira({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sridhar Malladi",
  description: site.tagline,
  metadataBase: new URL("https://sridharmalladi.online"),
  icons: { icon: "/icon.svg" },
  openGraph: {
    title: site.name,
    description: site.tagline,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#05040c",
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
    <html lang="en" className={della.variable}>
      <body>{children}</body>
    </html>
  );
}
