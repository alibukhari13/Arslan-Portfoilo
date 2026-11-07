"use client";

import { useEffect, useRef } from "react";
import Photo from "../ui/Photo";
import ScrollWords from "../ui/ScrollWords";
import { startDamp } from "../ui/damp";

function progressFor(imageTop) {
  const start = window.innerHeight * 0.95;
  const end = window.innerHeight * 0.42;
  return Math.min(1, Math.max(0, (start - imageTop) / (start - end)));
}

export default function ServiceCards({ items }) {
  const listRef = useRef(null);

  useEffect(() => {
    const root = listRef.current;
    if (!root) return undefined;
    const cards = [...root.querySelectorAll("[data-service-card]")];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    return startDamp((damp) => {
      cards.forEach((card, index) => {
        const image = card.querySelector("[data-image]");
        if (!image) return;
        const box = image.getBoundingClientRect();
        const target = reduce ? 1 : progressFor(box.top);
        const progress = damp(`service-${index}`, target, 0.18);
        const wipe = card.querySelector("[data-wipe]");
        const number = card.querySelector("[data-num]");
        const travel = Math.max(box.width * 2.1, 800);
        const numberProgress = Math.min(1, progress / 0.45);
        if (wipe) wipe.style.transform = `translate3d(${progress * travel}px, 0, 0)`;
        if (number) number.style.transform = `translate3d(0, ${(1 - numberProgress) * 40}px, 0)`;
      });
    });
  }, [items]);

  return (
    <div ref={listRef} className="mx-auto max-w-[1320px] px-5 md:px-10">
      {items.map((item) => (
        <article
          key={item.title}
          data-service-card
          className="group flex flex-col gap-6 border-t border-white/10 py-8 lg:flex-row lg:items-center lg:gap-16 lg:py-10"
        >
          <div className="h-10 w-16 shrink-0 overflow-hidden">
            <p data-num className="font-pixel text-[40px] font-normal leading-none text-[#666] will-change-transform">
              {item.number}
            </p>
          </div>

          <div data-image className="relative h-[220px] w-full shrink-0 overflow-hidden bg-panel sm:h-[285px] lg:w-[379px]">
            <Photo
              src={item.image}
              alt=""
              fill
              sizes="379px"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            />
            <div data-wipe aria-hidden className="absolute inset-0 bg-[#0e0e0e] will-change-transform" />
          </div>

          <div className="min-w-0 flex-1">
            <ScrollWords
              as="h2"
              text={item.title}
              className="display-statement"
            />
            <p className="mt-4 max-w-[476px] text-base leading-relaxed text-[#b9b8b8] sm:text-lg">{item.description}</p>
            <ul className="mt-8 flex max-w-[540px] flex-wrap gap-x-6 gap-y-3">
              {item.tags.map((tag) => (
                <li key={tag} className="border border-white/20 px-4 py-2 text-base text-white">
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </div>
  );
}
