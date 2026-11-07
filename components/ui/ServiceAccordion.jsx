"use client";

import { useState } from "react";
import Photo from "./Photo";

export default function ServiceAccordion({ items }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, index) => {
        const isOpen = open === index;
        const toggle = () => setOpen(isOpen ? -1 : index);

        return (
          <article key={item.title} className="border border-white/12">
            <div className="grid grid-cols-[52px_minmax(0,1fr)_36px] items-center md:grid-cols-[88px_minmax(0,1fr)_48px]">
              <button type="button" className="self-stretch text-left" aria-expanded={isOpen} onClick={toggle}>
                <span className="flex h-full items-center pl-4 text-sm text-white/75 md:pl-8 md:text-base">{item.number}</span>
              </button>

              <div className="min-w-0 py-5">
                <button
                  type="button"
                  onClick={toggle}
                  className={`w-full overflow-hidden text-center font-pixel text-[32px] font-normal uppercase leading-10 transition-all duration-300 md:text-[40px] ${
                    isOpen ? "h-0 py-0 opacity-0" : "py-2 opacity-100"
                  }`}
                >
                  {item.title}
                </button>
                <div className={`grid transition-[grid-template-rows] duration-500 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <div className="grid items-center gap-6 py-2 md:grid-cols-[220px_minmax(0,1fr)] md:gap-10 md:py-4">
                      <div className="relative aspect-square overflow-hidden bg-panel">
                        <Photo src={item.image} alt="" fill className="object-cover" sizes="220px" />
                        {isOpen ? <div aria-hidden className="wipe-in absolute inset-0 bg-ink" /> : null}
                      </div>
                      <div className="text-left">
                        <h3 className="font-pixel text-[32px] font-normal uppercase leading-10 md:text-[40px]" style={{ letterSpacing: "-0.02em" }}>{item.title}</h3>
                        <p className="mt-4 max-w-md text-sm leading-relaxed text-mist md:text-base">{item.description}</p>
                        <ul className="mt-5 flex flex-wrap gap-2">
                          {item.tags.map((tag) => (
                            <li key={tag} className="border border-white/20 px-3 py-1.5 text-xs text-white/85">
                              {tag}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button type="button" className="self-stretch" aria-label={isOpen ? `Close ${item.title}` : `Open ${item.title}`} onClick={toggle}>
                <span className="flex h-full items-center justify-center pr-3 text-2xl font-light leading-none text-white md:pr-6">
                  {isOpen ? "−" : "+"}
                </span>
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}
