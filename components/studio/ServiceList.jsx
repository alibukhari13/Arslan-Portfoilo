"use client";

import { useState } from "react";
import Link from "next/link";

export default function ServiceList({ services = [] }) {
  const items = services;
  const [active, setActive] = useState(0);
  const current = items[active] || items[0];
  if (!current) return null;

  return (
    <div className="grid items-start gap-12 lg:grid-cols-2">
      <div>
        <p className="text-xs uppercase tracking-[0.16em] text-[#F9452D]">Services</p>
        <h3 className="mt-4 text-[clamp(36px,4vw,56px)] leading-none tracking-[-0.05em]">{current.title}</h3>
        <p className="mt-5 max-w-md text-base leading-7 text-[#555]">{current.description}</p>
        <Link href="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#0b0b0c] px-5 py-3 text-sm text-white">
          See pricing <span aria-hidden>→</span>
        </Link>
      </div>
      <ul className="divide-y divide-black/10 border-y border-black/10">
        {items.map((item, index) => (
          <li key={item.title}>
            <button
              type="button"
              onClick={() => setActive(index)}
              className={`flex w-full items-center justify-between py-6 text-left text-[clamp(28px,3vw,40px)] tracking-[-0.045em] ${index === active ? "text-[#0b0b0c]" : "text-black/30"}`}
            >
              <span>{item.title}</span>
              <span className="text-base text-[#F9452D]">{String(index + 1).padStart(2, "0")}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
