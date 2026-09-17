import { site } from "@/config/site";

/** Kept short and specific: what the work actually involves. */
export default function About() {
  return (
    <div className="about">
      {site.about.map((line) => (
        <p key={line}>{line}</p>
      ))}
    </div>
  );
}
