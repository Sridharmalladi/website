import sharp from "sharp";

const shots = [
  ["cityfit", "png"],
  ["prior-auth-criteria-engine", "jpg"],
  ["judge-loop", "png"],
  ["dsbuddy", "png"],
];

for (const [name, extension] of shots) {
  for (const width of [720, 1440]) {
    let image = sharp(`public/shots/${name}.${extension}`);
    // The original CityFit capture includes browser chrome and docked DevTools.
    // Keep the actual application region; retain the untouched source capture.
    if (name === "cityfit") image = image.extract({ left: 10, top: 163, width: 2280, height: 1965 });
    await image.resize(width, Math.round(width / 1.6), { fit: "contain", background: "#f7f8f1" })
      .webp({ quality: 82 }).toFile(`public/shots/${name}-${width}.webp`);
  }
}

const card = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs><linearGradient id="sky" x2="0" y2="1"><stop stop-color="#171936"/><stop offset="1" stop-color="#62415f"/></linearGradient></defs>
  <rect width="1200" height="630" fill="url(#sky)"/>
  <circle cx="1040" cy="135" r="150" fill="#efc985" opacity=".09"/>
  <path d="M0 445Q165 330 345 430T700 410Q870 312 1040 404T1200 365V630H0Z" fill="#263f54"/>
  <path d="M0 505Q180 405 378 492T740 476Q930 388 1200 464V630H0Z" fill="#14353f"/>
  <text x="80" y="96" fill="#f4efe7" font-family="Georgia,serif" font-size="35">Sridhar Malladi</text>
  <path d="M80 133H1120M80 545H1120" stroke="#ee7c75" stroke-opacity=".32"/>
  <text x="80" y="238" fill="#75afa3" font-family="Arial,sans-serif" font-size="20" letter-spacing="2">ASSOCIATE AI ENGINEER</text>
  <text x="76" y="355" fill="#f4efe7" font-family="Georgia,serif" font-size="88">Some of my <tspan fill="#ee7c75" font-style="italic">work.</tspan></text>
  <text x="80" y="426" fill="#d2d0dc" font-family="Arial,sans-serif" font-size="23">Curious  ·  Collaborative  ·  Pragmatic</text>
  <g transform="translate(1015 405)"><path d="M0 105C-3 74 5 43 0 13" fill="none" stroke="#75afa3" stroke-width="5"/><path d="M0 14C-13-12-48-14-58 8C-68 32-37 49-4 31C29 50 64 31 58 7C51-16 14-13 0 14Z" fill="#ee7c75"/><ellipse cy="23" rx="12" ry="9" fill="#111a2b"/><g fill="#f1c985"><circle cx="-6" cy="21" r="2"/><circle cy="18" r="2"/><circle cx="6" cy="21" r="2"/></g></g>
  <text x="80" y="584" fill="#c2c6d3" font-family="Arial,sans-serif" font-size="18">sridharmalladi.online</text>
</svg>`;
await sharp(Buffer.from(card)).png().toFile("public/social-card.png");
console.log("Prepared responsive project images and social card.");
