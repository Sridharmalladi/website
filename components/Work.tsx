import { site } from "@/config/site";

/** The shelf: one tile per product, each tile the whole link to the project. */
export default function Work() {
  if (site.projects.length === 0) return null;

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
            <span className="tile__plate">
              <span className="tile__name">{p.name}</span>
              <span className="tile__go" aria-hidden>
                ↗
              </span>
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
