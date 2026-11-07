"use client";

import { useState } from "react";
import { PlusIcon } from "./Icons";

export default function FaqList({ items }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="border-t border-white/10">
      {items.map((item, index) => {
        const isOpen = open === index;
        return (
          <div key={item.question} className="border-b border-white/10">
            <button
              type="button"
              className="flex w-full items-center justify-between gap-6 py-6 text-left"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? -1 : index)}
            >
              <span className="text-[20px] font-medium leading-[30px] tracking-[-0.01em]">{item.question}</span>
              <span className={`shrink-0 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>
                <PlusIcon />
              </span>
            </button>
            <div className={`grid transition-[grid-template-rows] duration-500 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
              <div className="overflow-hidden">
                <p className="max-w-3xl pb-6 text-sm leading-relaxed text-mist md:text-base">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
