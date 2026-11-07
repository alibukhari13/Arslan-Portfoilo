"use client";

import { useEffect, useRef, useState } from "react";
import Photo from "../ui/Photo";
import Reveal from "../ui/Reveal";
import ScrollWords from "../ui/ScrollWords";

export default function Process({ process }) {
  const sectionRef = useRef(null);
  const [step, setStep] = useState(0);
  const steps = process?.steps || [];

  useEffect(() => {
    if (!steps.length) return undefined;
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const total = el.offsetHeight - window.innerHeight;
      const passed = Math.min(Math.max(-el.getBoundingClientRect().top, 0), Math.max(total, 1));
      const progress = total > 0 ? passed / total : 0;
      const index = Math.min(steps.length - 1, Math.floor(progress * steps.length));
      setStep(index);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [steps]);

  return (
    <section id="process" ref={sectionRef} className="relative h-auto bg-ink md:h-[280vh]">
      <div className="md:sticky md:top-0 md:flex md:h-svh md:items-center">
        <div className="mx-auto grid w-full max-w-[1240px] items-center gap-10 px-5 py-20 md:px-8 lg:grid-cols-2">
          <div>
            <Reveal>
              <ScrollWords
                as="h2"
                text={process.titleLead}
                muted={process.titleRest}
                mutedColor="rgba(255,255,255,0.3)"
                className="max-w-[11ch] text-[clamp(2.5rem,5vw,4.6rem)] font-medium uppercase leading-[0.9] tracking-tight"
              />
            </Reveal>
            <ol className="mt-10 space-y-3">
              {steps.map((item, index) => (
                <li key={item.title}>
                  <button
                    type="button"
                    onClick={() => setStep(index)}
                    className={`font-pixel text-left text-lg font-normal uppercase transition-colors md:text-2xl ${
                      index === step ? "text-white" : "text-white/30 hover:text-white/60"
                    }`}
                  >
                    {item.number} {item.title}
                  </button>
                  <p className={`max-w-md overflow-hidden text-sm leading-relaxed text-mist transition-all ${index === step ? "mt-2 max-h-24 opacity-100" : "max-h-0 opacity-0"}`}>
                    {item.text}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden bg-panel">
            {steps.map((item, index) => (
              <Photo
                key={item.title}
                src={item.image}
                alt=""
                fill
                className={`object-cover transition-all duration-700 ${index === step ? "scale-100 opacity-100" : "scale-110 opacity-0"}`}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
