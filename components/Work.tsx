import { site } from "@/config/site";

/** The grid: one tile per project, each tile the whole link to the live site. */
export default function Work() {
  if (site.projects.length === 0) {
    return (
      <p style={{ color: "var(--text-dim)" }}>Project write-ups are going here next.</p>
    );
  }

  return (
    <div className="tiles">
      {site.projects.map((p) => {
        const body = (
          <>
            {p.shot && (
              <span className="tile__shot">
                <img src={p.shot} alt={p.alt ?? `${p.name} homepage`} loading="lazy" />
              </span>
            )}
            <span className="tile__fold" aria-hidden />
            <span className="tile__meta">
              <span className="tile__name">{p.name}</span>
              <span className="tile__blurb">{p.blurb}</span>
            </span>
          </>
        );

        return p.href ? (
          <a
            key={p.name}
            className="tile"
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {body}
          </a>
        ) : (
          <div key={p.name} className="tile">
            {body}
          </div>
        );
      })}
    </div>
  );
}
