/**
 * Folderol — the slowly drifting waves from the original aprovan.com hero.
 * Ported as-is (palette + motion), with the animation loop on rAF timing.
 */
import React, { useEffect, useRef, useState } from "react";

const DEFAULT_PALETTE = ["#4A4A4A", "#3A3A3A", "gray"];

export interface FolderolProps extends React.HTMLAttributes<HTMLDivElement> {
  palette?: string[];
}

export default function Folderol({
  className,
  palette = DEFAULT_PALETTE,
}: FolderolProps) {
  const [t, setT] = useState<number>(0);
  const frame = useRef<number>(0);

  useEffect(() => {
    let last = performance.now();
    const tick = (now: number) => {
      // Match the original cadence (~0.25 per 10ms) without hammering setState.
      const delta = now - last;
      last = now;
      setT((prev) => (prev > 1e9 ? 0 : prev + delta * 0.025));
      frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
  }, []);

  const f = (x: number): number => Math.cos((x * Math.PI) / 180) * 50;

  return (
    <div className={`h-full w-full overflow-hidden opacity-[0.15] ${className ?? ""}`}>
      {palette.map((color, index) => {
        const dt = index * 180 + index * t;
        const origin = -40 - index * 10 - f(t);
        const mid = 50 + 30 * index;
        const end = 150 + index * 10 + f(t);

        return (
          <div className="absolute bottom-0 left-0 h-full w-full" key={color}>
            <svg
              className="h-full w-full"
              width="100"
              height="100"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <path
                className="drop-shadow-md"
                fill={color}
                d={`
                M ${origin}, ${end}
                Q ${mid / 2}, ${f(t + dt)} ${mid}, ${mid}
                T ${end}, ${mid}
                L ${end}, ${end}
                L ${origin}, ${end}
              `}
              />
            </svg>
          </div>
        );
      })}
    </div>
  );
}
