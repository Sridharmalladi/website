import type { Metadata, Viewport } from "next";
import { Pixelify_Sans, Nunito_Sans } from "next/font/google";
import { site } from "@/config/site";
import "./globals.css";

const pixel = Pixelify_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-pixel",
  display: "swap",
});

const body = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${site.name} — Portfolio`,
  description: site.tagline,
  metadataBase: new URL("https://sridharmalladi.online"),
  openGraph: {
    title: `${site.name} — a tiny sleek platformer`,
    description: site.tagline,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#7b2ff7",
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-world="DAY" className={`${pixel.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
