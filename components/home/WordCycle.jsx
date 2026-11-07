"use client";

import { useEffect, useState } from "react";

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

export default function WordCycle({ first = "ARSLAN", second = "STUDIO" }) {
  const [index, setIndex] = useState(0);
  const [parked, setParked] = useState(true);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return undefined;

    let alive = true;
    let parkedTimer = 0;
    let loopTimer = 0;

    const swap = () => {
      if (!alive) return;
      setIndex((value) => (value + 1) % 2);
      setParked(false);
      parkedTimer = window.setTimeout(() => {
        if (alive) setParked(true);
      }, 1200);
      loopTimer = window.setTimeout(swap, 2800);
    };

    const start = window.setTimeout(swap, 1600);
    return () => {
      alive = false;
      window.clearTimeout(start);
      window.clearTimeout(parkedTimer);
      window.clearTimeout(loopTimer);
    };
  }, []);

  const words = [String(first || "ARSLAN"), String(second || "STUDIO")];

  return (
    <div className="relative mx-auto h-[1em] overflow-hidden font-pixel text-[clamp(4.5rem,12.5vw,15rem)] leading-none tracking-[-0.04em] text-white">
      <span className="sr-only">{words[0]}</span>
      {words.map((word, wordIndex) => {
        const visible = wordIndex === index;
        const instant = !visible && parked;
        const shift = visible ? "translateY(0)" : `translateY(${parked ? "100%" : "-100%"})`;
        const letters = Array.from(word);

        return (
          <div key={word} aria-hidden className="absolute inset-0 flex items-end justify-center">
            {letters.map((letter, letterIndex) => (
              <span
                key={`${word}-${letterIndex}`}
                className={instant ? "inline-block" : "inline-block will-change-transform"}
                style={{
                  transform: shift,
                  transition: instant ? "none" : `transform 700ms ${EASE} ${letterIndex * 50}ms`,
                }}
              >
                {letter}
              </span>
            ))}
            {wordIndex === 0 ? (
              <span
                className="mb-[0.12em] ml-[0.04em] inline-block text-[0.42em] font-medium leading-none tracking-normal"
                style={{
                  fontFamily: "var(--font-switzer), sans-serif",
                  transform: shift,
                  transition: instant ? "none" : `transform 700ms ${EASE} ${letters.length * 50}ms`,
                }}
              >
                ®
              </span>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
