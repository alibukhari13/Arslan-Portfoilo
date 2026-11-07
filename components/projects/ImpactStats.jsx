"use client";

import { useEffect, useRef, useState } from "react";
import ScrollWords from "../ui/ScrollWords";

function parseStat(value) {
  const text = String(value ?? "").trim();
  const match = text.match(/^(\d+)([\s\S]*)$/);
  if (!match) return { kind: "text", text };
  return {
    kind: "num",
    target: Number(match[1]),
    suffix: match[2],
    width: match[1].length,
  };
}

function formatStat(parsed, current) {
  if (parsed.kind !== "num") return parsed.text;
  return String(current).padStart(parsed.width, "0") + parsed.suffix;
}

function CountValue({ value, play }) {
  const [shown, setShown] = useState(() => {
    const parsed = parseStat(value);
    return parsed.kind === "num" ? formatStat(parsed, 0) : parsed.text;
  });

  useEffect(() => {
    const parsed = parseStat(value);
    const finalText = parsed.kind === "num" ? formatStat(parsed, parsed.target) : parsed.text;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (parsed.kind !== "num" || reduced || !play) {
      setShown(parsed.kind === "num" && !play && !reduced ? formatStat(parsed, 0) : finalText);
      return;
    }

    let frame = 0;
    const start = performance.now();
    const duration = 2800;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - t) ** 3;
      setShown(formatStat(parsed, Math.round(eased * parsed.target)));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [play, value]);

  return shown;
}

export default function ImpactStats({ intro, impacts, title = "Project impact" }) {
  const ref = useRef(null);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const show = () => {
      el.querySelectorAll(".reveal").forEach((node) => node.classList.add("is-in"));
      setPlay(true);
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      show();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        show();
        observer.disconnect();
      },
      { threshold: 0.28, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="mx-auto w-full max-w-[872px] px-5 py-20 min-[920px]:px-0 md:py-24">
      <div className="reveal">
        <ScrollWords
          as="h2"
          text={title}
          className="display-statement"
          style={{ letterSpacing: "-0.02em" }}
        />
        {intro ? (
          <p className="mt-4 text-lg leading-[1.5] tracking-[-0.01em] text-[#b9b8b8]">{intro}</p>
        ) : null}
      </div>
      {impacts.length ? (
        <div
          className="reveal mt-10 grid gap-4 min-[920px]:grid-cols-3"
          style={{ transitionDelay: "150ms" }}
        >
          {impacts.map((item) => (
            <article key={`${item.value}-${item.label}`} className="flex h-[252px] flex-col justify-between bg-panel p-6">
              <p className="font-pixel text-[64px] leading-none text-white" style={{ letterSpacing: "0px" }}>
                <CountValue value={item.value} play={play} />
              </p>
              <p className="text-lg leading-[27px] tracking-[-0.01em] text-[#b9b8b8]">{item.label}</p>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  );
}
