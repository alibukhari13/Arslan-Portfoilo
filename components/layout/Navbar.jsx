"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Mark } from "../ui/Icons";
import ArrowButton from "../ui/ArrowButton";
import RollText from "../ui/RollText";

export default function Navbar({ nav = [], cta = "Book a call", name = "Home" }) {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y < 40) {
        setHidden(false);
        lastY.current = y;
        return;
      }
      if (y > lastY.current + 12) setHidden(true);
      else if (y < lastY.current - 12) setHidden(false);
      else return;
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-[#0e0e0e] transition-transform duration-500 ease-out ${hidden && !open ? "-translate-y-full" : "translate-y-0"}`}
    >
      <div className="mx-auto flex h-[104px] max-w-[1440px] items-center justify-between px-5 md:px-10">
        <Link href="/" aria-label={`${name}, home`} className="text-white">
          <Mark />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group text-[14px] font-medium uppercase leading-[1.5em] ${active ? "text-white" : "text-[#dbd7d7]"}`}
              >
                <RollText text={item.label} />
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <ArrowButton href="/contact">
            <RollText text={cta} />
          </ArrowButton>
        </div>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center border border-white/15 lg:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="relative block h-3 w-4">
            <span className={`absolute left-0 h-px w-4 bg-white transition ${open ? "top-1.5 rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 top-1.5 h-px w-4 bg-white transition ${open ? "opacity-0" : ""}`} />
            <span className={`absolute left-0 h-px w-4 bg-white transition ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
          </span>
        </button>
      </div>

      {open ? (
        <nav className="border-t border-white/10 bg-ink px-6 py-6 lg:hidden" aria-label="Mobile">
          <ul className="space-y-4">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="font-pixel text-3xl font-normal uppercase">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <ArrowButton href="/contact">{cta}</ArrowButton>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
