"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowIcon, Mark } from "../ui/Icons";
import ScrollWords from "../ui/ScrollWords";

export default function Footer({ profile, footerNav = [], resourceNav = [], copy = {} }) {
  const newsletterTitle = copy.newsletterTitle || "Join the\nnewsletter";
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function onSubmit(event) {
    event.preventDefault();
    const subject = encodeURIComponent(copy.footerMailSubject || "Portfolio newsletter");
    const body = encodeURIComponent(`${copy.footerMailBody || "Please keep me posted."}\n\nEmail: ${email}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setDone(true);
  }

  return (
    <footer className="border-t border-white/10 bg-ink">
      <div className="mx-auto grid max-w-[1240px] gap-12 px-5 py-16 md:px-8 lg:grid-cols-[1.1fr_.9fr]">
        <div>
          <ScrollWords
            as="h2"
            text={newsletterTitle.split("\n").filter(Boolean).join(" ")}
            breakAt={newsletterTitle.split("\n")[0].trim().split(/\s+/).filter(Boolean).length}
            className="text-3xl font-medium uppercase leading-none tracking-tight md:text-5xl"
          />
          <form onSubmit={onSubmit} className="mt-8 flex max-w-md border border-white/15">
            <label className="sr-only" htmlFor="newsletter-email">
              {copy.footerEmail || "Email"}
            </label>
            <input
              id="newsletter-email"
              required
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder={copy.footerPlaceholder || "you@company.com"}
              className="w-full bg-transparent px-4 py-3 text-sm outline-none placeholder:text-white/30"
            />
            <button type="submit" aria-label={copy.footerSend || "Send email"} className="grid w-12 place-items-center bg-lime text-ink">
              <ArrowIcon />
            </button>
          </form>
          <p className="mt-3 text-xs text-white/40">
            {done ? copy.footerNoteDone : copy.footerNote}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-mist">{copy.footerPages}</p>
            <ul className="mt-4 space-y-2 text-sm">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-white/75 hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-mist">{copy.footerResources}</p>
            <ul className="mt-4 space-y-2 text-sm">
              {resourceNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-white/75 hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-mist">{copy.footerFollow}</p>
            <ul className="mt-4 space-y-2 text-sm">
              {profile.socials.map((item) => (
                <li key={item.name}>
                  <a href={item.href} target="_blank" rel="noreferrer" className="text-white/75 hover:text-white">
                    {item.name}
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${profile.email}`} className="text-white/75 hover:text-white">
                  {copy.footerEmail || "Email"}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-4 px-5 py-6 text-sm text-white/55 md:flex-row md:items-center md:justify-between md:px-8">
          <p className="flex items-center gap-3">
            <Mark />
            © {new Date().getFullYear()} {profile.name}. {copy.footerRights}
          </p>
          <p>{profile.location} · {profile.role}</p>
        </div>
      </div>
    </footer>
  );
}
