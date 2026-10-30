export const CENTRAL_TIME_ZONE = "America/Chicago";
const palettes = [
  { hour: 0, high: "#0d1028", horizon: "#2b2a50", far: "#373958", middle: "#293c52", near: "#1a3b48", ground: "#102b32", blossom: "#c85f72", light: "#eac786", leaf: "#5f8f86" },
  { hour: 6, high: "#262849", horizon: "#70445f", far: "#55516d", middle: "#36515c", near: "#23505b", ground: "#163a42", blossom: "#e57872", light: "#f1cf92", leaf: "#72a99a" },
  { hour: 12, high: "#243b59", horizon: "#8d5b6e", far: "#5b596f", middle: "#38616a", near: "#22515d", ground: "#163a43", blossom: "#e77a70", light: "#f1d092", leaf: "#75a99a" },
  { hour: 18, high: "#2b234a", horizon: "#8d4a60", far: "#5c4968", middle: "#37495d", near: "#1e4652", ground: "#14343c", blossom: "#ea6f6e", light: "#f1c783", leaf: "#679888" },
  { hour: 21, high: "#12132f", horizon: "#3b3159", far: "#3d3c5c", middle: "#2b3e53", near: "#193b48", ground: "#102c33", blossom: "#d46679", light: "#e8c789", leaf: "#5f8d84" },
];
const keys = ["high", "horizon", "far", "middle", "near", "ground", "blossom", "light", "leaf"] as const;
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
