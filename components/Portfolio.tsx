import type { ReactNode } from "react";
import Descent from "@/components/Descent";
import DepthGauge from "@/components/DepthGauge";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Work from "@/components/Work";
import Contact from "@/components/Contact";


/**
 * Copy anchored to the strip at the depth it belongs to. Positions come from
 * the shared band map rather than hand-typed percentages, and each block sits
 * on its own scrim so it stays readable whatever art is behind it.
 */
function Layer({
  atVar,
  label,
  id,
  floor,
  children,
}: {
  /** CSS custom property holding this block's fraction of the artwork. */
  atVar: string;
  label: string;
  id: string;
  /** CSS length the block may never sit above (keeps it clear of the hero). */
  floor?: string;
  children: ReactNode;
}) {
  const place = `calc(var(--art-h) * var(${atVar}))`;
  const top = floor ? `max(${floor}, ${place})` : place;
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
          className="pointer-events-none absolute left-1/2 top-0 flex w-[var(--column)] -translate-x-1/2 flex-col justify-end px-5 pb-12"
          style={{ height: "100svh" }}
        >
          <div className="pointer-events-auto relative text-center">
            <div className="copy-scrim" aria-hidden />
            <Hero />
          </div>
        </div>

        <Layer atVar="--at-about" id="about" label="About" floor="calc(100svh + 6svh)">
          <About />
        </Layer>

        <Layer atVar="--at-work" id="work" label="Projects" floor="calc(100svh + 30svh)">
          <Work />
        </Layer>

        <Layer atVar="--at-contact" id="contact" label="Contact">
          <Contact />
        </Layer>
      </main>
    </>
  );
}
