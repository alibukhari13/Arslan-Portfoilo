"use client";

import { usePathname } from "next/navigation";
import HomeChrome from "./HomeChrome";
import SmoothScroll from "../ui/SmoothScroll";

export default function SiteChrome({
  skip,
  showNav,
  showFooter,
  children,
}) {
  const pathname = usePathname();
  const savedDocument = pathname === "/" || pathname === "/about" || pathname === "/projects" || pathname === "/contact";
  if (pathname.startsWith("/admin") || savedDocument) return children;
  const nativeScroll = pathname === "/projects" || pathname === "/contact";

  return (
    <>
      {nativeScroll ? null : <SmoothScroll />}
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-16 focus:z-[70] focus:bg-[#F9452D] focus:px-3 focus:py-2 focus:text-white"
      >
        {skip}
      </a>
      <HomeChrome showNav={showNav} showFooter={showFooter}>
        <div id="content">{children}</div>
      </HomeChrome>
    </>
  );
}
