"use client";

import { useEffect, useState } from "react";
import { CENTRAL_TIME_ZONE } from "@/aesthetics/palette";

export default function CentralClock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const update = () => setNow(new Date());
    update();
    const timer = window.setInterval(update, 30_000);
    return () => window.clearInterval(timer);
  }, []);

  const time = now
    ? new Intl.DateTimeFormat("en-US", {
        timeZone: CENTRAL_TIME_ZONE,
        hour: "numeric",
        minute: "2-digit",
      }).format(now)
    : "––:––";

  return (
    <div className="central-clock" aria-label="Current time in Texas">
      <span className="central-clock__label">Texas time</span>
      <time dateTime={now?.toISOString()}>{time}</time>
    </div>
  );
}
