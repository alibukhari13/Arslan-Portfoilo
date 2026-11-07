"use client";

import { useEffect, useId, useRef } from "react";
import { startDamp } from "./damp";

function parts(text) {
  return String(text || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

export default function ScrollWords({
  text,
  muted = "",
  mutedColor = "#666666",
  className = "",
  as: Tag = "p",
  breakBeforeMuted = false,
  breakAt = -1,
  style,
}) {
  const ref = useRef(null);
  const key = useId();
  const lead = parts(text);
  const rest = parts(muted);
  const words = [...lead, ...rest];
  const mutedFrom = rest.length ? lead.length : -1;
  const lineBreak = breakBeforeMuted && rest.length ? lead.length : breakAt;

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const spans = [...el.querySelectorAll("[data-word]")];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    return startDamp((damp) => {
      const rect = el.getBoundingClientRect();
      const start = window.innerHeight * 0.85;
      const end = window.innerHeight * 0.25;
      const target = Math.min(1, Math.max(0, (start - rect.top) / (start - end + rect.height * 0.35)));
      const progress = reduce ? 1 : damp(key, target, 0.14);
      spans.forEach((span, index) => {
        const active = progress >= index / Math.max(spans.length, 1);
        const dim = mutedFrom >= 0 && index >= mutedFrom;
        span.style.color = dim ? mutedColor : "#ffffff";
        span.style.opacity = active ? "1" : dim ? "0.4" : "0.25";
      });
    });
  }, [key, muted, mutedColor, mutedFrom, text]);

  return (
    <Tag ref={ref} className={`font-pixel ${className}`} style={style}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} data-word>
          {index === lineBreak ? <br /> : null}
          {word}
          {index < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
