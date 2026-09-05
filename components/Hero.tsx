"use client";

import { ArrowDown } from "lucide-react";
import { site } from "@/config/site";
import SocialLinks from "@/components/SocialLinks";
import Cityscape from "@/components/Cityscape";

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      <Cityscape />

      {/* scrim so the text stays readable over the illustration */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%]"
        style={{
          background: "linear-gradient(to top, var(--bg) 20%, transparent 100%)",
        }}
      />

      <div className="relative z-10 flex min-h-[100svh] flex-col justify-end px-6 pb-20 sm:px-10">
        <p className="font-pixel text-xs tracking-[0.3em]" style={{ color: "var(--accent)" }}>
          PORTFOLIO / 2026
        </p>

        <h1 className="mt-4 max-w-3xl text-[13vw] font-black leading-[0.95] tracking-tight sm:text-6xl md:text-7xl">
          {site.name}
        </h1>

        <p className="mt-4 max-w-xl text-lg sm:text-xl" style={{ color: "var(--text-dim)" }}>
          {site.tagline}
        </p>

        <SocialLinks solid className="mt-8" />
      </div>

      <a
        href="#about"
        aria-label="Scroll to about section"
        className="animate-bounce-y absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-current opacity-60 transition-opacity hover:opacity-100"
      >
        <ArrowDown size={22} aria-hidden />
      </a>
    </section>
  );
}
