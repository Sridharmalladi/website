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
  <rect width="1200" height="630" fill="#111916"/>
  <text x="80" y="96" fill="#eeeee4" font-family="Georgia,serif" font-size="35">Sridhar Malladi</text>
  <path d="M80 133H1120M80 545H1120" stroke="#344037"/>
  <text x="80" y="238" fill="#bbd2b0" font-family="Arial,sans-serif" font-size="20" letter-spacing="2">ASSOCIATE AI ENGINEER</text>
  <text x="76" y="355" fill="#eeeee4" font-family="Georgia,serif" font-size="88">Some of my <tspan fill="#bbd2b0" font-style="italic">work.</tspan></text>
  <text x="80" y="426" fill="#a7b3a9" font-family="Arial,sans-serif" font-size="23">Curious  ·  Collaborative  ·  Pragmatic</text>
  <circle cx="1018" cy="251" r="39" fill="#bbd2b0" opacity=".55"/>
  <path d="M846 477Q934 335 1014 402Q1070 305 1120 385V511H846Z" fill="#34493c"/>
  <path d="M857 511Q960 395 1034 454Q1080 423 1120 464V511Z" fill="#50614b"/>
  <text x="80" y="584" fill="#a7b3a9" font-family="Arial,sans-serif" font-size="18">sridharmalladi.online</text>
</svg>`;
await sharp(Buffer.from(card)).png().toFile("public/social-card.png");
console.log("Prepared responsive project images and social card.");
