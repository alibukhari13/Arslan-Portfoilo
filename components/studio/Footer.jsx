"use client";

import Link from "next/link";
import { useState } from "react";

export default function Footer({ name, role, phone, phoneHref, email, socials = [], copy = {} }) {
  const [address, setAddress] = useState("");
  const [done, setDone] = useState(false);

  function onSubmit(event) {
    event.preventDefault();
    const subject = encodeURIComponent(copy.footerMailSubject || "Portfolio newsletter");
    const body = encodeURIComponent(`${copy.footerMailBody || "Please keep me posted."}\n\nEmail: ${address}`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    setDone(true);
  }

  const pages = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy", href: "/privacy-policy" },
    { label: "Terms", href: "/terms-conditions" },
  ];

  return (
    <footer className="border-t border-black/10 bg-white text-[#0b0b0c]">
      <div className="mx-auto grid max-w-[1440px] gap-14 px-5 py-16 md:px-10 lg:grid-cols-[1.2fr_.8fr]">
        <div>
          <h2 className="max-w-[520px] text-[clamp(36px,4vw,56px)] leading-[1.05] tracking-[-0.05em]">
            {copy.newsletterTitle || "Stay connected"}
          </h2>
          <p className="mt-4 max-w-md text-sm leading-6 text-[#666]">
            {copy.footerNote || "Notes on product design, interfaces, and work in progress."}
          </p>
          <form onSubmit={onSubmit} className="mt-8 flex max-w-md border-b border-black/20">
            <label className="sr-only" htmlFor="studio-news">Email</label>
            <input
              id="studio-news"
              required
              type="email"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              placeholder={copy.footerPlaceholder || "E-mail"}
              className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-black/35"
            />
            <button type="submit" className="px-3 text-sm" aria-label={copy.footerSend || "Send email"}>
              →
            </button>
          </form>
          {done ? <p className="mt-3 text-xs text-[#666]">{copy.footerNoteDone || "Your email app should open."}</p> : null}
        </div>

        <div className="grid grid-cols-2 gap-8 text-sm">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-[#888]">Pages</p>
            <ul className="mt-4 space-y-2">
              {pages.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-[#F9452D]">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-[#888]">Follow</p>
            <ul className="mt-4 space-y-2">
              {socials.map((item) => (
                <li key={item.name}>
                  <a href={item.href} target="_blank" rel="noreferrer" className="hover:text-[#F9452D]">{item.name}</a>
                </li>
              ))}
              {phone ? <li><a href={phoneHref} className="hover:text-[#F9452D]">{phone}</a></li> : null}
              {email ? <li><a href={`mailto:${email}`} className="hover:text-[#F9452D]">{email}</a></li> : null}
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-black/10">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-5 py-6 text-sm text-[#666] md:flex-row md:items-center md:justify-between md:px-10">
          <p>Designing thoughtful digital products where usability and clarity come together.</p>
          <p>© {new Date().getFullYear()} {name}. {role}.</p>
        </div>
      </div>
    </footer>
  );
}
