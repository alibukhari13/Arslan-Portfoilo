"use client";

import { useState } from "react";

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
        {item.image ? <img src={item.image} alt="" className="absolute inset-0 h-full w-full object-cover" /> : null}
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
  const [page, setPage] = useState(0);
  const slides = items.length > 1 ? [...items, items[0]] : items;

  return (
    <div>
      <div className="overflow-hidden md:overflow-visible">
        <div
          className="flex gap-6 motion-reduce:transition-none transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ transform: `translate3d(calc(${page} * -1 * (min(86vw, 767px) + 24px)), 0, 0)` }}
        >
          {slides.map((item, index) => (
            <div key={`${item.name}-${index}`} className="w-[min(86vw,767px)] shrink-0">
              <Card item={item} />
            </div>
          ))}
        </div>
      </div>
      {items.length > 1 ? (
        <div className="mt-[38px] flex items-center justify-center">
          {items.map((item, index) => (
            <button
              key={item.name}
              type="button"
              aria-label={`Scroll to page ${index + 1}`}
              aria-current={index === page ? "true" : undefined}
              onClick={() => setPage(index)}
              className="grid h-7 place-items-center px-[5px]"
            >
              <span className={`block h-2 w-2 rounded-full bg-white ${index === page ? "opacity-100" : "opacity-40"}`} />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
