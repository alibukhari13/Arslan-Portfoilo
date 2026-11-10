"use client";

import { useLayoutEffect, useRef } from "react";

const extra = `
.framer-fyydzk-container,
.framer-1a4qqw4-container {
  opacity: 1 !important;
  transform: none !important;
}
header.menu-open.framer-185cz0f {
  height: 100vh !important;
  width: 100% !important;
  overflow: visible !important;
  background-color: rgb(249, 69, 45) !important;
}
header.menu-open .framer-1ydu5x,
header.menu-open .framer-1w3jqcb,
header.menu-open .framer-9ezvvw,
header.menu-open .framer-12hhivf,
header.menu-open .framer-1oywgs7 {
  opacity: 1 !important;
}
`;

export default function HomeChrome({ showNav, showFooter, children }) {
  const host = useRef(null);

  useLayoutEffect(() => {
    const el = host.current;
    if (!el) return;
    let cancelled = false;

    Promise.all([
      fetch("/chrome/home.css").then((response) => response.text()),
      showNav ? fetch("/chrome/header.html").then((response) => response.text()) : Promise.resolve(""),
      showFooter ? fetch("/chrome/footer.html?v=2").then((response) => response.text()) : Promise.resolve(""),
    ]).then(([css, header, footer]) => {
      if (cancelled || !host.current || host.current.shadowRoot) return;
      const shadow = host.current.attachShadow({ mode: "open" });
      const style = document.createElement("style");
      style.textContent = `${css}\n${extra}`;
      shadow.appendChild(style);
      const wrap = document.createElement("div");
      wrap.className = "framer-L4aOu framer-Xa3sQ";
      wrap.style.display = "contents";
      wrap.innerHTML = `${header}<slot></slot>${footer}`;
      shadow.appendChild(wrap);
      shadow.addEventListener("click", (event) => {
        const button = event.target.closest?.(".framer-1xpg40s");
        if (!button) return;
        const bar = button.closest("header");
        if (!bar) return;
        event.preventDefault();
        event.stopPropagation();
        bar.classList.toggle("menu-open");
        bar.classList.toggle("framer-v-m5ha19");
        bar.classList.toggle("framer-v-7tbwy4");
        const icon = button.querySelector(".framer-wxKNO");
        if (icon) {
          icon.classList.toggle("framer-v-5wdnmg");
          icon.classList.toggle("framer-v-3vmo9c");
        }
      });
      shadow.addEventListener(
        "submit",
        (event) => {
          event.preventDefault();
          event.stopPropagation();
        },
        true,
      );
    });

    return () => {
      cancelled = true;
    };
  }, [showFooter, showNav]);

  return (
    <div ref={host} style={{ display: "block", width: "100%" }}>
      {children}
    </div>
  );
}
