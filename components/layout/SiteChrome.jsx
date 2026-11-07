"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";
import Navbar from "./Navbar";
import SmoothScroll from "../ui/SmoothScroll";

export default function SiteChrome({
  skip,
  showNav,
  showFooter,
  nav,
  cta,
  name,
  profile,
  footerNav,
  resourceNav,
  copy,
  children,
}) {
  const pathname = usePathname();
  const admin = pathname.startsWith("/admin");

  if (admin) return children;

  return (
    <>
      <SmoothScroll />
      <a href="#content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-lime focus:px-3 focus:py-2 focus:text-ink">
        {skip}
      </a>
      {showNav ? <Navbar nav={nav} cta={cta} name={name} /> : null}
      <div id="content">{children}</div>
      {showFooter ? <Footer profile={profile} footerNav={footerNav} resourceNav={resourceNav} copy={copy} /> : null}
    </>
  );
}
