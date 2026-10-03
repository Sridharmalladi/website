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
            <span className="wordmark__emoji" aria-hidden="true">👋</span>
            {site.name}
          </a>
          <CentralClock />
          <nav aria-label="Main navigation">
            <a href={site.socials.github} target="_blank" rel="noopener noreferrer">GitHub<span className="sr-only">, opens in a new tab</span></a>
            <a href={site.socials.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn<span className="sr-only">, opens in a new tab</span></a>
            <span className="masthead__email"><a href={`mailto:${site.socials.email}`}>Email</a><CopyEmail className="masthead__copy" email={site.socials.email}><svg viewBox="0 0 20 20" aria-hidden="true" focusable="false"><rect x="6" y="6" width="10" height="11" rx="1.5"/><path d="M13 6V4a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h1"/></svg>Copy</CopyEmail></span>
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
