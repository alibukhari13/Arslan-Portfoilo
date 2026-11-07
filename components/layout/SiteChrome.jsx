"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";
import Navbar from "./Navbar";
import SmoothScroll from "../ui/SmoothScroll";

export default function SiteChrome({ site, children }) {
  const pathname = usePathname();
  const admin = pathname.startsWith("/admin");

  if (admin) return children;

  return (
    <>
      <SmoothScroll />
      <a href="#content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-lime focus:px-3 focus:py-2 focus:text-ink">
        {site.copy.skipToContent}
      </a>
      <Navbar nav={site.nav} cta={site.copy.navCta} name={site.profile.name} />
      <div id="content">{children}</div>
      <Footer profile={site.profile} footerNav={site.footerNav} resourceNav={site.resourceNav} copy={site.copy} />
    </>
  );
}
