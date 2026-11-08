"use client";

import { useEffect, useState } from "react";

export default function FramerFrame({ src, title, background = "#ffffff" }) {
  const [url, setUrl] = useState(src);

  useEffect(() => {
    const hash = window.location.hash;
    setUrl(hash ? `${src}${hash}` : src);
  }, [src]);

  return (
    <iframe
      src={url}
      title={title}
      className="fixed inset-0 z-[80] block h-[100dvh] w-screen border-0"
      style={{ background }}
    />
  );
}
