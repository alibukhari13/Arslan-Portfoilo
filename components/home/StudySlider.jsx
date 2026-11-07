"use client";

import { useEffect, useRef, useState } from "react";

const GAP = 24;
const SLIDE_MS = 1200;
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const AUTO_MS = 4200;

function Stars() {
  return (
    <div className="flex" aria-hidden>
      {Array.from({ length: 5 }, (_, index) => (
        <svg key={index} viewBox="0 0 24 24" className="h-6 w-6">
          <path
            fill="#ecfdad"
            d="M12 1.6 14.8 8.2l7.2.6-5.5 4.8 1.7 7L12 16.8 6 20.6l1.7-7L2.2 8.8l7.2-.6L12 1.6Z"
          />
        </svg>
      ))}
    </div>
  );
}

function Card({ item }) {
  return (
    <article className="flex h-full min-h-[420px] w-full flex-col bg-panel sm:h-[434px] sm:flex-row">
      <div className="relative h-[220px] w-full shrink-0 overflow-hidden sm:h-full sm:w-[337px]">
        {item.image ? <img src={item.image} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" /> : null}
      </div>
      <div className="flex min-h-[250px] flex-1 flex-col justify-between p-8 sm:h-full sm:min-h-0 sm:w-[430px]">
        <div className="flex max-w-[365px] flex-col gap-6">
          <Stars />
          <p className="text-[20px] font-medium leading-[30px] tracking-[-0.01em] text-white">“{item.quote}”</p>
        </div>
        <div className="mt-8 flex flex-col gap-1 sm:mt-0">
          <p className="text-[20px] font-semibold leading-[30px] tracking-[-0.01em]">{item.name}</p>
          <p className="text-base leading-[22.4px] text-[#b9b8b8]">{item.role}</p>
        </div>
      </div>
    </article>
  );
}

export default function StudySlider({ items = [] }) {
  const count = items.length;
  const frame = useRef(null);
  const paused = useRef(false);
  const drag = useRef(null);
  const [page, setPage] = useState(0);
  const [width, setWidth] = useState(767);
  const [animate, setAnimate] = useState(true);
  const [dragX, setDragX] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const node = frame.current;
    if (!node) return;
    const measure = () => {
      const card = node.querySelector("[data-card]");
      if (card) setWidth(card.getBoundingClientRect().width);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [count]);

  useEffect(() => {
    if (page < count) return undefined;
    const timer = window.setTimeout(() => {
      setAnimate(false);
      setPage(0);
    }, SLIDE_MS);
    return () => window.clearTimeout(timer);
  }, [page, count]);

  useEffect(() => {
    if (animate) return undefined;
    const frameId = window.requestAnimationFrame(() => setAnimate(true));
    return () => window.cancelAnimationFrame(frameId);
  }, [animate]);

  useEffect(() => {
    if (reduced || count < 2) return undefined;
    const timer = window.setInterval(() => {
      if (paused.current) return;
      setPage((current) => (current >= count ? current : current + 1));
    }, AUTO_MS);
    return () => window.clearInterval(timer);
  }, [count, reduced]);

  const slides = count > 1 ? [...items, items[0]] : items;
  const step = width + GAP;
  const offset = page * step - dragX;

  function onPointerDown(event) {
    if (event.button !== 0 || count < 2) return;
    drag.current = { x: event.clientX, pointer: event.pointerId };
    paused.current = true;
    setAnimate(false);
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event) {
    if (!drag.current || drag.current.pointer !== event.pointerId) return;
    setDragX(event.clientX - drag.current.x);
  }

  function onPointerUp(event) {
    if (!drag.current || drag.current.pointer !== event.pointerId) return;
    const delta = event.clientX - drag.current.x;
    drag.current = null;
    setDragX(0);
    setAnimate(true);
    paused.current = false;
    if (delta <= -48) setPage((current) => Math.min(count, (current % count) + 1));
    else if (delta >= 48) setPage((current) => Math.max(0, (current % count) - 1));
  }

  return (
    <div
      onMouseEnter={() => {
        paused.current = true;
      }}
      onMouseLeave={() => {
        paused.current = false;
      }}
    >
      <div ref={frame} className="overflow-hidden">
        <div
          className="flex touch-pan-y"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          style={{
            gap: GAP,
            transform: `translate3d(${-offset}px, 0, 0)`,
            transition: animate && dragX === 0 ? `transform ${SLIDE_MS}ms ${EASE}` : "none",
          }}
        >
          {slides.map((item, index) => (
            <div key={`${item.name}-${index}`} data-card className="w-[min(86vw,767px)] shrink-0">
              <Card item={item} />
            </div>
          ))}
        </div>
      </div>
      {count > 1 ? (
        <div className="mt-[38px] flex items-center justify-center">
          {items.map((item, index) => (
            <button
              key={item.name}
              type="button"
              aria-label={`Scroll to page ${index + 1}`}
              aria-current={index === page % count ? "true" : undefined}
              onClick={() => {
                if (page === count && index === 0) {
                  setAnimate(false);
                  setPage(0);
                  return;
                }
                setAnimate(true);
                setPage(index);
              }}
              className="grid h-7 place-items-center px-[5px]"
            >
              <span className={`block h-2 w-2 rounded-full bg-white ${index === page % count ? "opacity-100" : "opacity-40"}`} />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
