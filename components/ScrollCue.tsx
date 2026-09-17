"use client";

/** Short page, so say plainly that there is more below the first screen. */
export default function ScrollCue() {
  return (
    <div className="scroll-cue" aria-hidden>
      <span className="scroll-cue__label">Scroll</span>
      <span className="scroll-cue__rail">
        <span className="scroll-cue__dot anim" />
      </span>
    </div>
  );
}
