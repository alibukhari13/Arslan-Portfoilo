"use client";

import { useEffect, useState } from "react";

export default function StartupLoader({ name = "Arslan" }) {
  const [phase, setPhase] = useState("in");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setPhase("done");
      return;
    }
    const split = window.setTimeout(() => setPhase("out"), 1500);
    const done = window.setTimeout(() => setPhase("done"), 2300);
    return () => {
      window.clearTimeout(split);
      window.clearTimeout(done);
    };
  }, []);

  if (phase === "done") return null;

  const letters = String(name || "Arslan").split("");

  return (
    <div className="fixed inset-0 z-[80] overflow-hidden" role="presentation">
      <div
        className={`absolute inset-x-0 top-0 h-1/2 bg-[#F9452D] transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.18,1)] ${phase === "out" ? "-translate-y-full" : ""}`}
      />
      <div
        className={`absolute inset-x-0 bottom-0 h-1/2 bg-[#F9452D] transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.18,1)] ${phase === "out" ? "translate-y-full" : ""}`}
      />
      <div
        className={`absolute left-1/2 top-1/2 w-max max-w-[100vw] -translate-x-1/2 text-center text-white transition-all duration-700 ease-[cubic-bezier(0.77,0,0.18,1)] ${phase === "out" ? "-translate-y-[160%] scale-150 opacity-0" : "-translate-y-1/2 scale-[2.2] min-[900px]:scale-[3.5]"}`}
      >
        <p className="font-bebas flex items-start justify-center whitespace-nowrap text-[49px] leading-[0.85] text-white">
          {letters.map((letter, index) => (
            <span key={`${letter}-${index}`} className="loader-letter" style={{ animationDelay: `${index * 70}ms` }}>
              {letter}
            </span>
          ))}
          <span className="loader-sub ml-1 text-[18px] leading-[0.85]">®</span>
        </p>
        <p className="loader-sub mt-3 text-center font-sans text-[16px] font-medium leading-[1.3] tracking-[-0.04em] text-white" style={{ animationDelay: "0.55s" }}>
          Why great web design is more than just looks
        </p>
      </div>
    </div>
  );
}
