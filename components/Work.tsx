import Image from "next/image";
import LiveIndicator from "@/components/LiveIndicator";
import { site } from "@/config/site";

export default function Work() {
  return (
    <section className="work" id="work" aria-labelledby="work-title">
      <div className="work__heading">
        <h1 id="work-title">Things I’ve built.</h1>
        <p>AI engineer in Texas. I like useful tools, honest numbers, and small experiments.</p>
      </div>
      <div className="work-grid">
        {site.projects.map(project => {
          const isLive = Boolean(project.href && !project.href.includes("github.com/") && project.linkLabel !== "Download for Mac");
          const cardContent = (
            <>
              <span className="work-tile__image">
                <Image src={project.featured ? `/shots/${project.id}-1440.webp` : project.shot} alt={project.alt} width={720} height={450} loading="lazy" sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 33vw" />
                {isLive ? <LiveIndicator /> : <span className="work-tile__status">{project.linkLabel === "Download for Mac" ? "Mac app" : "Source"}</span>}
                <span className="work-tile__note">
                  <span className="work-tile__tags">{project.tags.join(" · ")}</span>
                  <span>{project.summary}</span>
                  <span className="work-tile__action">{project.linkLabel}</span>
                </span>
              </span>
              <span className="work-tile__content">
                <span className="work-tile__title">{project.name}</span>
                <span className="work-tile__teaser">{project.teaser}</span>
              </span>
            </>
          );
          return (
            <article className="work-tile" key={project.id}>
              {project.href ? (
                <a className="work-tile__main" href={project.href} target="_blank" rel="noopener noreferrer" aria-label={`${project.name}: ${project.linkLabel}, opens in a new tab`}>{cardContent}</a>
              ) : (
                <div className="work-tile__main" aria-label={`${project.name}: ${project.linkLabel}`}>{cardContent}</div>
              )}
              {project.sourceHref && <a className="work-tile__source" href={project.sourceHref} target="_blank" rel="noopener noreferrer">Source code<span className="sr-only"> for {project.name}, opens in a new tab</span></a>}
            </article>
          );
        })}
      </div>
    </section>
  );
}
