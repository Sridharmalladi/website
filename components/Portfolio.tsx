import Descent from "@/components/Descent";
import DepthGauge from "@/components/DepthGauge";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Contact from "@/components/Contact";

/**
 * One centered column: a single continuous strip of artwork with page
 * background either side of it. Copy is positioned over the strip at the depth
 * it belongs to — all of it dark background at those points, so it stays legible.
 */
export default function Portfolio() {
  return (
    <div className="relative mx-auto w-[min(94vw,1200px)]">
      <DepthGauge />
      <Descent />

      <div className="absolute inset-x-0 px-5 text-center" style={{ top: "3.5%" }}>
        <Hero />
      </div>

      <div className="absolute inset-x-0 px-5 text-center" style={{ top: "45.5%" }}>
        <About />
      </div>

      <div className="absolute inset-x-0 px-5 text-center" style={{ top: "86.5%" }}>
        <Contact />
      </div>
    </div>
  );
}
