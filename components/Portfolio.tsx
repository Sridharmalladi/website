import Descent from "@/components/Descent";
import DepthGauge from "@/components/DepthGauge";
import SocialLinks from "@/components/SocialLinks";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Work from "@/components/Work";
import Contact from "@/components/Contact";

/**
 * One centered column holding the continuous strip, with the page background
 * either side. On entry the links sit at the very top of the screen and the
 * name at the bottom of it, with the planets in between. Everything below is
 * positioned at the depth it belongs to.
 */
export default function Portfolio() {
  return (
    <div className="relative mx-auto w-[min(94vw,1200px)]">
      <DepthGauge />
      <Descent />

      {/* first screen: links pinned top, name pinned bottom */}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex h-screen flex-col justify-between px-5 py-7">
        <SocialLinks className="pointer-events-auto justify-center" />
        <div className="pointer-events-auto text-center">
          <Hero />
        </div>
      </div>

      <div className="absolute inset-x-0 px-5 text-center" style={{ top: "28%" }}>
        <About />
      </div>

      <div className="absolute inset-x-0 px-5 text-center" style={{ top: "41%" }}>
        <Work />
      </div>

      <div className="absolute inset-x-0 px-5 text-center" style={{ top: "88%" }}>
        <Contact />
      </div>
    </div>
  );
}
