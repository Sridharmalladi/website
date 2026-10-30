import Sky from "@/aesthetics/Sky";
import CentralClock from "@/components/CentralClock";
import CopyEmail from "@/components/CopyEmail";
import Work from "@/components/Work";
import { site } from "@/config/site";

export default function Portfolio() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Sky />
      <div className="page" id="top">
        <header className="masthead">
          <a className="wordmark" href="#top" aria-label="Sridhar Malladi, home">
            <svg className="wordmark__mark" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
              <path d="M16 29C15 22 18 15 16 8M16 21C11 18 9 15 8 12M17 18C22 15 24 12 24 9" />
              <path className="wordmark__petal" d="M16 9C12 3 4 4 4 10C4 15 11 17 16 13C21 17 28 15 28 10C28 4 20 3 16 9Z" />
              <circle cx="16" cy="11" r="3" />
            </svg>
            {site.name}
          </a>
          <CentralClock />
          <nav aria-label="Main navigation">
            <a href={site.socials.github} target="_blank" rel="noopener noreferrer">GitHub<span className="sr-only">, opens in a new tab</span></a>
            <a href={site.socials.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn<span className="sr-only">, opens in a new tab</span></a>
            <span className="masthead__email"><CopyEmail className="masthead__email-button" email={site.socials.email}>Email</CopyEmail></span>
          </nav>
        </header>
        <main id="main" tabIndex={-1}>
          <Work />
        </main>
        <footer className="footer"><span>© {new Date().getFullYear()} {site.name}</span><a href="#top">Back to top</a></footer>
      </div>
    </>
  );
}
