import Work from "@/components/Work";
import CopyEmail from "@/components/CopyEmail";
import { site } from "@/config/site";

/**
 * No prose. The name, a row of boxed links across the top, and the shelf of
 * products below it. Everything the page says, it says with pictures.
 */
export default function Portfolio() {
  return (
    <>
      <a href="#work" className="skip-link">
        Skip to projects
      </a>

      <main className="page">
        <header className="masthead">
          <span className="wordmark">
            Sridhar
            <br />
            Malladi
          </span>

          <nav className="links" aria-label="Elsewhere">
            <a
              className="chip"
              href={site.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              className="chip"
              href={site.socials.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <CopyEmail className="chip">Email</CopyEmail>
          </nav>
        </header>

        <div id="work">
          <Work />
        </div>
      </main>
    </>
  );
}
