"use client";

interface Props {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
  format?: (v: number) => string;
}

export default function RangeSlider({
  label,
  min,
  max,
  step,
  value,
  onChange,
  format = (v) => v.toFixed(2),
}: Props) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between">
        <p className="text-[10px] font-semibold tracking-[0.22em] text-dim">
          {label}
        </p>
        <span className="font-mono text-[10px] text-white">{format(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-label={label}
        onChange={(e) => onChange(+e.target.value)}
        className="w-full accent-spectral-cyan"
      />
    </div>
  );
}
