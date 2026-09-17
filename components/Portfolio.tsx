import type { ReactNode } from "react";
import Descent from "@/components/Descent";
import DepthGauge from "@/components/DepthGauge";
import ScrollCue from "@/components/ScrollCue";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Work from "@/components/Work";
import Contact from "@/components/Contact";
import { ANCHORS, at as atArt } from "@/config/bands";

/**
 * Copy anchored to the strip at the depth it belongs to. Positions come from
 * the shared band map rather than hand-typed percentages, and each block sits
 * on its own scrim so it stays readable whatever art is behind it.
 */
function Layer({
  at,
  label,
  id,
  floor,
  children,
}: {
  at: number;
  label: string;
  id: string;
  /** CSS length the block may never sit above (keeps it clear of the hero). */
  floor?: string;
  children: ReactNode;
}) {
  const top = floor ? `max(${floor}, ${atArt(at)})` : atArt(at);
  return (
    <section
      id={id}
      aria-label={label}
      className="absolute left-1/2 w-[var(--column)] -translate-x-1/2 px-5"
      style={{ top }}
    >
      <div className="relative text-center">
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

      <DepthGauge />

      {/* The main column IS the ribbon: its width sets the page's scroll
          length. Copy sits in a wider column centred on top of it. */}
      <main className="stage">
        <Descent />

        {/* first screen: the name sits low, out of the planets */}
        <div
          className="pointer-events-none absolute left-1/2 top-0 flex w-[var(--column)] -translate-x-1/2 flex-col justify-end gap-9 px-5 pb-9"
          style={{ height: "100svh" }}
        >
          <div className="pointer-events-auto relative text-center">
            <div className="copy-scrim" aria-hidden />
            <Hero />
          </div>
          <ScrollCue />
        </div>

        <Layer at={ANCHORS.about} id="about" label="About" floor="calc(100svh + 7svh)">
          <About />
        </Layer>

        <Layer at={ANCHORS.work} id="work" label="Work" floor="calc(100svh + 36svh)">
          <Work />
        </Layer>

        <Layer at={ANCHORS.contact} id="contact" label="Contact">
          <Contact />
        </Layer>
      </main>
    </>
  );
}
