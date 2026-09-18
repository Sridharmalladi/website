import Status from "@/components/Status";
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

      {/* Drops over the whole page while a product is hovered, so the one
          under the cursor is the only thing still lit. */}
      <div className="veil" aria-hidden />

      <main className="page">
        <Status />

        <header className="masthead">
          <span className="wordmark">
            {/* one flex item per word, or the gap between them lands between the
                initial and the rest of the word */}
            <span>
              <span className="wordmark__initial">S</span>ridhar
            </span>
            <span className="wordmark__family">
              <span className="wordmark__lower">m</span>alladi
            </span>
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
