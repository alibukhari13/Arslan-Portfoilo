"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar({ wordmark = "ARSLAN", phone, phoneHref, email, projectCount = 0 }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const mark = String(wordmark || "ARSLAN").split(/\s+/)[0];
  const menu = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: `Projects (${projectCount})`, href: "/projects" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 h-[60px] bg-[#F9452D] text-white">
        <div className="relative flex h-full items-center px-5 md:px-8">
          <Link href="/" className="font-bebas relative z-10 flex items-start text-[50px] leading-[0.85] text-white">
            {mark}
            <span className="ml-0.5 mt-1 text-[16px] leading-none">®</span>
          </Link>
          <nav className="absolute inset-0 hidden items-center justify-around px-28 text-[12px] uppercase tracking-[0.16em] md:flex">
            {links.map((item) => (
              <Link key={item.href} href={item.href} className="hover:opacity-70">
                {item.label}
              </Link>
            ))}
          </nav>
          <button type="button" className="relative z-10 ml-auto text-[12px] uppercase tracking-[0.16em] md:hidden" onClick={() => setOpen(true)}>
            Menu
          </button>
        </div>
      </header>

      {open ? (
        <div className="fixed inset-0 z-[60] flex flex-col bg-[#0b0b0c] px-6 py-6 text-white">
          <div className="flex items-center justify-between">
            <p className="font-bebas text-[50px] leading-[0.85] text-white">
              {mark}
              <span className="ml-0.5 text-[16px]">®</span>
            </p>
            <button type="button" className="text-[12px] uppercase tracking-[0.16em]" onClick={() => setOpen(false)}>
              Close
            </button>
          </div>
          <nav className="mt-16 flex flex-col gap-5 text-4xl font-semibold tracking-[-0.045em]">
            {menu.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto space-y-2 text-sm text-white/70">
            {phone ? <a className="block" href={phoneHref}>{phone}</a> : null}
            {email ? <a className="block" href={`mailto:${email}`}>{email}</a> : null}
            <Link href="/contact" className="mt-4 inline-flex text-white">
              Let’s talk
            </Link>
          </div>
        </div>
      ) : null}
    </>
  );
}
