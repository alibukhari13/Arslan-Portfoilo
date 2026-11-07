"use client";

import { useEffect, useRef } from "react";
import Photo from "../ui/Photo";

export default function HeroShot({ src, alt }) {
  const frameRef = useRef(null);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return undefined;
    const inner = frame.querySelector("[data-hero]");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      if (inner) inner.style.transform = "none";
      return undefined;
    }

    let current = 0;
    let frameId = 0;
    let alive = true;

    const tick = () => {
      if (!alive) return;
      const rect = frame.getBoundingClientRect();
      const start = window.innerHeight * 0.85;
      const end = window.innerHeight * 0.25;
      const span = Math.max(1, start - end);
      const target = Math.min(1, Math.max(0, (start - rect.top) / span));
      current += (target - current) * 0.08;
      if (Math.abs(target - current) < 0.001) current = target;
      if (inner) inner.style.transform = `scale(${0.88 + current * 0.12})`;
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => {
      alive = false;
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div ref={frameRef} className="relative mx-auto mt-12 h-[58vw] max-h-[743px] min-h-[240px] w-full max-w-[1320px] overflow-hidden">
      <div data-hero className="absolute inset-0 origin-center will-change-transform">
        <Photo src={src} alt={alt} fill priority className="object-cover" sizes="1320px" />
      </div>
    </div>
  );
}
