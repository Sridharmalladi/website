import type { ReactNode } from "react";
import Descent from "@/components/Descent";
import DepthGauge from "@/components/DepthGauge";
import SocialLinks from "@/components/SocialLinks";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Work from "@/components/Work";
import Contact from "@/components/Contact";
import { ANCHORS, pct } from "@/config/bands";

/**
 * Copy anchored to the strip at the depth it belongs to. Positions come from
 * the shared band map rather than hand-typed percentages, and each block sits
 * on its own scrim so it stays readable whatever art is behind it.
 */
function Layer({
  at,
  label,
  id,
  children,
}: {
  at: number;
  label: string;
  id: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-label={label}
      className="absolute inset-x-0 px-5"
      style={{ top: pct(at) }}
    >
      <div className="relative mx-auto max-w-3xl text-center">
        <div className="copy-scrim" aria-hidden />
        {children}
      </div>
    </section>
  );
}

export default function Portfolio() {
  return (
    <>
      <a href="#about" className="skip-link">
        Skip to content
      </a>

      <main className="relative mx-auto w-[min(94vw,1200px)]">
        <DepthGauge />
        <Descent />

        {/* first screen: links at the very top, name at the bottom */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 flex flex-col justify-between px-5 py-7"
          style={{ height: "100svh" }}
        >
          <SocialLinks className="pointer-events-auto justify-center" />
          <div className="pointer-events-auto relative text-center">
            <div className="copy-scrim" aria-hidden />
            <Hero />
          </div>
        </div>

        <Layer at={ANCHORS.about} id="about" label="About">
          <About />
        </Layer>

        <Layer at={ANCHORS.work} id="work" label="Work">
          <Work />
        </Layer>

        <Layer at={ANCHORS.contact} id="contact" label="Contact">
          <Contact />
        </Layer>
      </main>
    </>
  );
}
