"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import LiveIndicator from "@/components/LiveIndicator";
import { site, type Project } from "@/config/site";

export default function Work() {
  const [active, setActive] = useState<Project | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (active && !dialog.current?.open) dialog.current?.showModal();
  }, [active]);

  return (
    <section className="work" id="work" aria-labelledby="work-title">
      <div className="work__heading">
        <h1 id="work-title">Some of my <em>work.</em></h1>
        <p>Associate AI Engineer. Curious · Collaborative · Pragmatic.</p>
      </div>
      <div className="work-grid">
        {site.projects.map(project => {
          const isLive = !project.href.includes("github.com/");
          return (
            <article className="work-tile" key={project.id}>
              <a className="work-tile__main" href={project.href} target="_blank" rel="noopener noreferrer" aria-label={`${project.name}, ${isLive ? "live project" : "source code"}, opens in a new tab`}>
                <span className="work-tile__image">
                  <Image src={project.featured ? `/shots/${project.id}-1440.webp` : project.shot} alt={project.alt} width={720} height={450} loading="lazy" sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 33vw" />
                  {isLive ? <LiveIndicator /> : <span className="work-tile__status">Source</span>}
                </span>
                <span className="work-tile__content">
                  <span className="work-tile__tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</span>
                  <span className="work-tile__title">{project.name}</span>
                  <span className="work-tile__teaser">{project.teaser}</span>
                </span>
              </a>
              <button type="button" className="work-tile__more" onClick={() => setActive(project)} aria-label={`Read about ${project.name}`}>Details</button>
            </article>
          );
        })}
      </div>
      <dialog ref={dialog} className="project-dialog" aria-labelledby="project-dialog-title" onClose={() => setActive(null)} onClick={event => { if (event.target === event.currentTarget) event.currentTarget.close(); }}>
        {active && (
          <div className="project-dialog__layout">
            <div className="project-dialog__image">
              <Image src={active.featured ? `/shots/${active.id}-1440.webp` : active.shot} alt={active.alt} width={1000} height={1000} sizes="(max-width: 700px) 100vw, 45vw" />
            </div>
            <div className="project-dialog__content">
              <button type="button" className="project-dialog__close" onClick={() => dialog.current?.close()} aria-label="Close project details">×</button>
              <p className="project-dialog__category">{active.category}</p>
              <h2 id="project-dialog-title">{active.name}</h2>
              <p className="project-dialog__teaser">{active.teaser}</p>
              <div className="project-dialog__tags">{active.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
              <p>{active.summary}</p>
              <p>{active.detail}</p>
              <a className="project-dialog__link" href={active.href} target="_blank" rel="noopener noreferrer">{active.linkLabel}<span className="sr-only">, opens in a new tab</span></a>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
