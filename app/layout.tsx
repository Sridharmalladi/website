import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Archivo } from "next/font/google";
import { site } from "@/config/site";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Archivo({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${site.name} — ${site.role}`,
  description: site.bioLines[0],
  metadataBase: new URL("https://sridharmalladi.online"),
  openGraph: {
    title: `${site.name} — Spatial Portfolio`,
    description: site.bioLines[0],
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#05060a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="FROSTED GLASS" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
