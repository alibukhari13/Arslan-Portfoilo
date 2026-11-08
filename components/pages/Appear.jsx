"use client";

import { useEffect } from "react";

export default function Appear({ code }) {
  useEffect(() => {
    if (!code) return;
    const script = document.createElement("script");
    script.text = code;
    document.body.appendChild(script);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const open = window.setTimeout(() => {
      const loader = document.querySelector(".framer-1euzf18-container");
      if (!loader) return;
      const box = loader.querySelector(".framer-wrxDY");
      box?.classList.remove("framer-v-jrv8u9");
      box?.classList.add("framer-v-1srj58c");
      const top = loader.querySelector(".framer-1g084ze");
      const bottom = loader.querySelector(".framer-b7gcby");
      [top, bottom].forEach((panel) => {
        if (!panel) return;
        panel.style.transition = "transform 700ms cubic-bezier(0.77, 0, 0.18, 1)";
      });
      window.requestAnimationFrame(() => {
        if (top) top.style.transform = "translateY(-100%)";
        if (bottom) bottom.style.transform = "translateY(100%)";
      });
      window.setTimeout(() => {
        loader.style.display = "none";
      }, reduced ? 0 : 760);
    }, reduced ? 0 : 1500);

    return () => {
      window.clearTimeout(open);
      script.remove();
    };
  }, [code]);

  return null;
}
