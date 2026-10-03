export const CENTRAL_TIME_ZONE = "America/Chicago";
const palettes = [
  { hour: 0, high: "#0b182a", horizon: "#344f61", far: "#2d4b57", middle: "#233e48", near: "#193732", ground: "#11261f", blossom: "#aaa9b8", light: "#e4e7d4" },
  { hour: 6, high: "#657f8d", horizon: "#e0bea0", far: "#809495", middle: "#5c7975", near: "#3d6055", ground: "#284537", blossom: "#e4c5b1", light: "#ffebc6" },
  { hour: 12, high: "#89afb5", horizon: "#e4dfc2", far: "#8ba9a4", middle: "#648981", near: "#42685b", ground: "#2a4b3a", blossom: "#ebd2bf", light: "#fff0cf" },
  { hour: 18, high: "#596c7e", horizon: "#c49b80", far: "#7c8180", middle: "#576d6e", near: "#35534d", ground: "#22392e", blossom: "#d6b4af", light: "#f5deba" },
  { hour: 21, high: "#152b40", horizon: "#4c6377", far: "#40586a", middle: "#2f4b53", near: "#223f3b", ground: "#162c24", blossom: "#b9aabc", light: "#e4e7d4" },
];
const keys = ["high", "horizon", "far", "middle", "near", "ground", "blossom", "light"] as const;
export function hourInCentral(date: Date): number {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: CENTRAL_TIME_ZONE, hour: "numeric", minute: "numeric", hourCycle: "h23" }).formatToParts(date);
  return Number(parts.find(p => p.type === "hour")?.value) + Number(parts.find(p => p.type === "minute")?.value) / 60;
}
export function paletteAt(hour: number) {
  const index = palettes.findLastIndex(p => hour >= p.hour);
  const from = palettes[Math.max(0, index)];
  const to = palettes[(index + 1) % palettes.length];
  const progress = (hour - from.hour) / ((to.hour || 24) - from.hour);
  return Object.fromEntries(keys.map(key => [key, `rgb(${[1,3,5].map(start => {
    const a = parseInt(from[key].slice(start,start + 2),16);
    const b = parseInt(to[key].slice(start,start + 2),16);
    return Math.round(a + (b - a) * progress);
  }).join(" ")})`])) as Record<(typeof keys)[number], string>;
}
