import About from "@/components/About";
import Work from "@/components/Work";
import CopyEmail from "@/components/CopyEmail";
import { site } from "@/config/site";

/**
 * One centred column on dark speckled paper: the name, a short welcome, what
 * the work is, and a grid of project tiles. Nothing here moves on its own.
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
        </header>

        <h1 className="welcome">Welcome.</h1>
        <p className="intro">
          Below are a few of my <a href="#work">projects</a>.
          <br />
          For anything <a href="#about">data</a> related, you can contact me{" "}
          <CopyEmail>here</CopyEmail>.
        </p>

        <h2 className="section-label" id="about">
          About
        </h2>
        <About />

        <h2 className="section-label" id="work">
          Projects
        </h2>
        <Work />

        <footer className="footer">
          <a href={site.socials.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href={site.socials.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <CopyEmail>Email</CopyEmail>
        </footer>
      </main>
    </>
  );
}
