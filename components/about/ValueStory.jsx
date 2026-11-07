"use client";

import { useEffect, useRef, useState } from "react";
import Photo from "../ui/Photo";
import ScrollWords from "../ui/ScrollWords";

export default function ValueStory({ items, lead = "How the work ", rest = "stays clear" }) {
  const sectionRef = useRef(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const total = el.offsetHeight - window.innerHeight;
      const passed = Math.min(Math.max(-el.getBoundingClientRect().top, 0), Math.max(total, 1));
      const progress = total > 0 ? passed / total : 0;
      setStep(Math.min(items.length - 1, Math.floor(progress * items.length)));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [items.length]);

  return (
    <section ref={sectionRef} className="relative bg-ink md:h-[320vh]">
      <div className="md:sticky md:top-0 md:flex md:h-svh md:items-center">
        <div className="mx-auto grid w-full max-w-[1240px] items-center gap-10 px-5 py-20 md:px-8 lg:grid-cols-2">
          <div>
            <ScrollWords
              as="h2"
              text={lead}
              muted={rest}
              mutedColor="rgba(255,255,255,0.3)"
              className="max-w-[12ch] text-[clamp(2.4rem,5vw,4.4rem)] font-medium uppercase leading-[0.9] tracking-tight"
            />
            <ol className="mt-10 space-y-4">
              {items.map((item, index) => {
                const active = index === step;
                return (
                  <li key={item.title}>
                    <button
                      type="button"
                      onClick={() => setStep(index)}
                      className={`font-pixel text-left text-lg font-normal uppercase transition-all duration-500 md:text-2xl ${
                        active ? "translate-x-0 text-white" : "-translate-x-3 text-white/30 hover:text-white/60"
                      }`}
                    >
                      0{index + 1}. {item.title}
                    </button>
                    <p
                      className={`max-w-md overflow-hidden text-sm leading-relaxed text-mist transition-all duration-500 ${
                        active ? "mt-2 max-h-28 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      {item.text}
                    </p>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden bg-panel">
            {items.map((item, index) => (
              <Photo
                key={item.title}
                src={item.image}
                alt=""
                fill
                className={`object-cover transition-all duration-700 ${
                  index === step ? "scale-100 opacity-100" : "scale-110 opacity-0"
                }`}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
