"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

export default function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return undefined;

    const lenis = new Lenis({
      lerp: 0.075,
      wheelMultiplier: 0.9,
      touchMultiplier: 1,
      smoothWheel: true,
      anchors: true,
      autoRaf: true,
    });

    return () => lenis.destroy();
  }, []);

  return null;
}
