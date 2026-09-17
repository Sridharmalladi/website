import AuroraField from "@/components/aurora/AuroraField";
import SocialLinks from "@/components/SocialLinks";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Work from "@/components/Work";
import { site } from "@/config/site";

/**
 * One centred column over the fixed aurora field. The background can't collide
 * with the copy or add to the page's height, so the page is exactly as long as
 * what's written on it.
 */
export default function Portfolio() {
  return (
    <>
      <a href="#about" className="skip-link">
        Skip to content
      </a>

      <AuroraField />

      <main className="page">
        <header className="pt-10 sm:pt-14">
          <SocialLinks solid />
        </header>

        <section className="pt-16 sm:pt-24" aria-label="Introduction">
          <Hero />
        </section>

        <section id="about" className="pt-20 sm:pt-28" aria-label="About">
          <About />
        </section>

        <section id="work" className="pt-20 sm:pt-28" aria-label="Projects">
          <Work />
        </section>

        <footer
          className="mt-24 border-t pb-14 pt-6 text-xs sm:mt-32"
          style={{ borderColor: "var(--panel-border)", color: "var(--text-dim)" }}
        >
          © {new Date().getFullYear()} {site.name}
        </footer>
      </main>
    </>
  );
}
