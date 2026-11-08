"use client";

import { heroCursorDefaults } from "@/data/liveMedia";

const inputClass = "h-11 w-full border border-white/12 bg-[#101010] px-3 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-lime";
const labelClass = "mb-2 block text-[11px] font-medium uppercase tracking-[0.14em] text-white/45";
const quietBtn = "inline-flex h-8 items-center justify-center border border-white/12 px-2.5 text-[11px] font-medium uppercase tracking-[0.12em] text-white/70 transition-colors hover:border-white/35 hover:text-white disabled:cursor-not-allowed disabled:opacity-30";
const iconBtn = "grid h-8 w-8 place-items-center border border-white/12 text-sm text-white/70 transition-colors hover:border-white/35 hover:text-white disabled:cursor-not-allowed disabled:opacity-30";

export function CursorTrailEditor({ items, onChange }) {
  const list = Array.isArray(items) ? items : heroCursorDefaults;

  function commit(next) {
    onChange(next);
  }

  function update(index, value) {
    commit(list.map((item, itemIndex) => (itemIndex === index ? value : item)));
  }

  function move(index, direction) {
    const target = index + direction;
    if (target < 0 || target >= list.length) return;
    const next = [...list];
    const [row] = next.splice(index, 1);
    next.splice(target, 0, row);
    commit(next);
  }

  return (
    <section className="border border-white/10 bg-panel">
      <header className="border-b border-white/10 px-5 py-4">
        <h2 className="text-sm uppercase tracking-[0.14em]">Pointer photos in the hero</h2>
      </header>
      <div className="space-y-5 p-5">
        <p className="text-sm leading-6 text-white/55">
          <span className="font-medium text-lime">Where: </span>
          Home page, Hero, the first screen. These photos cover that whole screen, on top of the headline.
        </p>
        <p className="text-sm leading-6 text-white/55">
          <span className="font-medium text-lime">How: </span>
          They are hidden until the pointer moves. Each one pops up at the pointer, then fades. They play in the order below, then start again. Add a photo to put another one in that sequence. Delete takes it out. Nothing is uploaded. Paste a link.
        </p>
        {list.map((src, index) => (
          <article key={`cursor-${index}`} className="border border-white/10">
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
              <span className="w-7 shrink-0 text-xs text-white/35">{String(index + 1).padStart(2, "0")}</span>
              <p className="min-w-0 flex-1 text-sm">Pointer photo {index + 1}</p>
              <div className="flex shrink-0 items-center gap-1">
                <button type="button" className={iconBtn} aria-label="Move up" disabled={index === 0} onClick={() => move(index, -1)}>↑</button>
                <button type="button" className={iconBtn} aria-label="Move down" disabled={index === list.length - 1} onClick={() => move(index, 1)}>↓</button>
                <button type="button" className={`${quietBtn} text-red-300 hover:text-red-200`} onClick={() => commit(list.filter((_, itemIndex) => itemIndex !== index))}>Delete</button>
              </div>
            </div>
            <label className="block p-4">
              <span className={labelClass}>Image link</span>
              <span className="mb-3 block text-sm leading-6 text-white/55">
                This is photo {index + 1} of {list.length}. On the Home hero it appears when the pointer reaches that turn in the sequence.
              </span>
              <input className={inputClass} value={src || ""} placeholder="https://example.com/photo.jpg" onChange={(event) => update(index, event.target.value)} />
              <span className="mt-2 block text-xs leading-5 text-white/40">Paste an image link. Files are not uploaded.</span>
              {src ? <img src={src} alt="" className="mt-3 h-28 w-24 border border-white/10 bg-[#101010] object-cover" /> : null}
            </label>
          </article>
        ))}
        <button
          type="button"
          className="flex h-12 w-full items-center justify-center border border-dashed border-white/20 text-[12px] font-medium uppercase tracking-[0.14em] text-lime hover:border-lime"
          onClick={() => commit([...list, ""])}
        >
          Add pointer photo
        </button>
      </div>
    </section>
  );
}
