# Sridhar Malladi

Personal portfolio at [sridharmalladi.online](https://sridharmalladi.online), built with Next.js, React, TypeScript, and plain CSS. The site exports static files for GitHub Pages.

## Develop

Use Node.js 24 LTS (Node.js 22 or newer is supported).

```sh
npm ci
npm run dev
```

Before opening a pull request:

```sh
npm run check
npm run build
npm run preview
```

`check` runs TypeScript and ESLint. `build` creates `out/`. `preview` serves that export at `http://localhost:3000`; `npm start` does the same.

## Edit

- `config/site.ts`: identity, project content, and contact links.
- `components/`: page sections and small interactive controls.
- `app/globals.css`: colors, typography, responsive layouts, and focus styles.
- `aesthetics/`: the time-aware landscape.
- `public/`: project screenshots and other static assets.
- `app/layout.tsx`: document metadata.

After replacing source screenshots, run `npm run assets` to regenerate the checked-in optimized images and social card.

Keep short project tags visible. The grid shows all projects; each card links to the project or source, while its Details button opens a native dialog with the fuller description. Use real screenshots, descriptive links, semantic headings, and reduced-motion styles. Check narrow screens and keyboard navigation when changing the layout. The full-page landscape follows America/Chicago (Texas Central Time), including daylight saving, with subtle birds, stars, UFOs, and mist.

`legacy/` preserves the previous site and is excluded from the current build.

## Deploy

Pull requests run checks and a production build. Pushes to `main` additionally deploy `out/` through GitHub Actions. Set the repository's Pages source to **GitHub Actions**. The custom domain is stored in `public/CNAME`; keep it aligned with the canonical URL in site metadata.

This deployment has no application server. Features that require request-time server code need a separate backend or a different hosting configuration.

The package override keeps Next.js 15's PostCSS dependency on a patched release. Recheck it when updating Next.js.
