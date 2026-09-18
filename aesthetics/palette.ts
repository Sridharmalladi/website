/**
 * The sky's colours over one day, and where the sun or moon sits in it.
 *
 * Everything here is keyed to wall-clock time in America/Chicago — CDT in
 * summer, CST in winter, which the browser works out on its own — so the page
 * is lit the way the sky is lit where I am, not where the reader is.
 *
 * The stops are read off the Oogway valley: the blue noon of the peach tree,
 * the amber of the late afternoon, and the deep violet night with the blossom
 * lit from below. Muted on purpose — the sky is painted at low opacity behind
 * the page, and everything here is a wash for the work to sit on.
 */

export type Sky = {
  /** top of the sky */
  high: string;
  /** the band the ridges sit against */
  horizon: string;
  /** haze lying in the valleys */
  haze: string;
  /** furthest ridge, nearly lost in the haze */
  ridgeFar: string;
  /** the ridge behind the page */
  ridgeMid: string;
  /** nearest ridge, darkest */
  ridgeNear: string;
  /** drifting cloud colour */
  cloud: string;
  /** blossom drifting across the page */
  petal: string;
  /** the sun or the moon */
  orb: string;
  /** what it throws onto the sky around it */
  orbGlow: string;
};

type Stop = Sky & { hour: number };

/** Colour at each hour that matters; everything between is mixed. */
const STOPS: Stop[] = [
  {
    hour: 0,
    high: "#04060f",
    horizon: "#0b1729",
    haze: "#132a44",
    ridgeFar: "#13263c",
    ridgeMid: "#0d1c2e",
    ridgeNear: "#070f1b",
    cloud: "#1b3550",
    petal: "#b9a6dc",
    orb: "#dfe6f5",
    orbGlow: "#3c5a86",
  },
  {
    hour: 5.5,
    high: "#141d3d",
    horizon: "#5b4a6b",
    haze: "#2d3355",
    ridgeFar: "#2a2f4c",
    ridgeMid: "#1c2038",
    ridgeNear: "#101426",
    cloud: "#4a4568",
    petal: "#e5aec4",
    orb: "#f7d7b0",
    orbGlow: "#8a5f70",
  },
  {
    hour: 7,
    high: "#2b4f86",
    horizon: "#d99a7e",
    haze: "#7d7f9c",
    ridgeFar: "#4a5a72",
    ridgeMid: "#33445c",
    ridgeNear: "#1f2d41",
    cloud: "#9a8ea0",
    petal: "#f4bcd0",
    orb: "#ffd9a8",
    orbGlow: "#c98a72",
  },
  {
    hour: 12,
    high: "#2e7cc0",
    horizon: "#b6ddef",
    haze: "#7fb0c8",
    ridgeFar: "#6d94a0",
    ridgeMid: "#4a7480",
    ridgeNear: "#2f5560",
    cloud: "#dff0f8",
    petal: "#f7bcd6",
    orb: "#fff6de",
    orbGlow: "#a9d6ee",
  },
  {
    hour: 17,
    high: "#3b6ea8",
    horizon: "#e8b689",
    haze: "#a58ea0",
    ridgeFar: "#6a7788",
    ridgeMid: "#4a5668",
    ridgeNear: "#2c3646",
    cloud: "#d8b5a8",
    petal: "#f6c0cf",
    orb: "#ffe0a6",
    orbGlow: "#d59a74",
  },
  {
    hour: 19.5,
    high: "#22315f",
    horizon: "#b06a63",
    haze: "#4f4a72",
    ridgeFar: "#3c4260",
    ridgeMid: "#282c47",
    ridgeNear: "#171a2c",
    cloud: "#6d5570",
    petal: "#e7a9c0",
    orb: "#ffc98d",
    orbGlow: "#8f5a68",
  },
  {
    hour: 21.5,
    high: "#0a1130",
    horizon: "#2d3163",
    haze: "#22305a",
    ridgeFar: "#1e2c48",
    ridgeMid: "#141f36",
    ridgeNear: "#0b1220",
    cloud: "#2a3a63",
    petal: "#c0a9e0",
    orb: "#e8edfb",
    orbGlow: "#41608c",
  },
];

const hex = (c: string) => [
  parseInt(c.slice(1, 3), 16),
  parseInt(c.slice(3, 5), 16),
  parseInt(c.slice(5, 7), 16),
];

const mix = (a: string, b: string, t: number) => {
  const [ar, ag, ab] = hex(a);
  const [br, bg, bb] = hex(b);
  const r = Math.round(ar + (br - ar) * t);
  const g = Math.round(ag + (bg - ag) * t);
  const bl = Math.round(ab + (bb - ab) * t);
  return `rgb(${r} ${g} ${bl})`;
};

/** Hours past midnight, as a fraction, in the timezone I live in. */
export function hourInChicago(now: Date = new Date()): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value ?? 0);
  // 24 comes back for midnight in some engines
  return (get("hour") % 24) + get("minute") / 60;
}

/** The sky at a given hour, mixed between the two stops it falls between. */
export function skyAt(hour: number): Sky {
  let from = STOPS[STOPS.length - 1];
  let to = STOPS[0];
  let span = 24 - from.hour + to.hour;
  let into = (hour - from.hour + 24) % 24;

  for (let i = 0; i < STOPS.length - 1; i += 1) {
    if (hour >= STOPS[i].hour && hour < STOPS[i + 1].hour) {
      from = STOPS[i];
      to = STOPS[i + 1];
      span = to.hour - from.hour;
      into = hour - from.hour;
      break;
    }
  }

  const t = span === 0 ? 0 : into / span;
  const keys = [
    "high",
    "horizon",
    "haze",
    "ridgeFar",
    "ridgeMid",
    "ridgeNear",
    "cloud",
    "petal",
    "orb",
    "orbGlow",
  ] as const;

  return Object.fromEntries(
    keys.map((k) => [k, mix(from[k], to[k], t)]),
  ) as Sky;
}

const SUNRISE = 6.4;
const SUNSET = 19.6;

/**
 * Where the sun or the moon sits, as percentages across and down the sky. Both
 * ride the same arc: the sun from sunrise to sunset, the moon over the night
 * that follows, so something is always up there and it is always in the right
 * part of its journey.
 */
export function orbAt(hour: number): { x: number; y: number; moon: boolean } {
  const day = hour >= SUNRISE && hour < SUNSET;
  const t = day
    ? (hour - SUNRISE) / (SUNSET - SUNRISE)
    : ((hour - SUNSET + 24) % 24) / (24 - (SUNSET - SUNRISE));

  return {
    x: 8 + t * 84,
    // a shallow arc: highest in the middle of its run
    y: 74 - Math.sin(t * Math.PI) * 56,
    moon: !day,
  };
}
