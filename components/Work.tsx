import { site } from "@/config/site";

/**
 * The shelf: one cell per product. The cell holds the tile, which is the whole
 * link, and a caption that stays hidden until the cell is hovered or focused.
 * The caption sits outside the anchor on purpose — inside it, it would be read
 * out as part of the link's name.
 */
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

        return (
          <div className="cell" key={p.name}>
            {p.href ? (
              <a
                className="tile"
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {body}
              </a>
            ) : (
              <div className="tile">{body}</div>
            )}
            <p className="cell__blurb">{p.blurb}</p>
          </div>
        );
      })}
    </div>
  );
}
