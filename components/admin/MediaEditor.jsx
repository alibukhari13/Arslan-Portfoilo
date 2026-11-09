"use client";

import { liveMedia } from "@/data/liveMedia";

const inputClass = "h-11 w-full border border-white/12 bg-[#101010] px-3 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-lime";
const labelClass = "mb-2 block text-[11px] font-medium uppercase tracking-[0.14em] text-white/45";

export function MediaEditor({ page, media, onChange, ids }) {
  const source = ids?.length
    ? ids.map((id) => liveMedia.find((item) => item.id === id)).filter(Boolean)
    : liveMedia.filter((item) => item.pages.includes(page));
  const groups = [];
  source.forEach((item) => {
    const last = groups[groups.length - 1];
    if (!last || last.name !== item.group) groups.push({ name: item.group, items: [item] });
    else last.items.push(item);
  });

  function update(id, value) {
    onChange({ ...media, [id]: value });
  }

  return (
    <div className="space-y-4">
      {ids ? null : (
        <p className="text-sm leading-6 text-white/55">
          Each box is one photo on the site. Arslan’s photo is labeled as his. Other person means that photo should stay someone else. Paste a link to replace it, or Remove to hide it, then press Save this section.
        </p>
      )}
      {groups.map((group) => (
        <section key={group.name} className="border border-white/10 bg-panel">
          <header className="border-b border-white/10 px-5 py-4">
            <h2 className="text-sm uppercase tracking-[0.14em]">{group.name}</h2>
          </header>
          <div className="space-y-5 p-5">
            {group.items.map((item) => {
              const stored = Object.prototype.hasOwnProperty.call(media, item.id);
              const value = stored ? media[item.id] : item.src;
              const removed = stored && !String(value || "").trim();
              return (
                <label key={item.id} className="block">
                  <span className={labelClass}>{item.label}</span>
                  <span className="mb-2 block text-sm leading-6 text-white/55"><span className="font-medium text-lime">Where: </span>{item.where}</span>
                  {item.how ? <span className="mb-3 block text-sm leading-6 text-white/55"><span className="font-medium text-lime">How: </span>{item.how}</span> : null}
                  <input
                    className={inputClass}
                    value={value || ""}
                    placeholder={item.kind === "video" ? "https://example.com/video.mp4" : "https://example.com/photo.jpg"}
                    onChange={(event) => update(item.id, event.target.value)}
                  />
                  <span className="mt-2 flex items-center justify-between gap-3 text-xs leading-5 text-white/40">
                    <span>{removed ? "Hidden on the website after you save." : item.kind === "video" ? "Paste a video link. Files are not uploaded." : "Paste an image link to replace it. Files are not uploaded."}</span>
                    <button type="button" className="shrink-0 border border-white/15 px-2 py-1 uppercase tracking-[0.12em] text-white/70 hover:border-white/40 hover:text-white" onClick={() => update(item.id, "")}>Remove</button>
                  </span>
                  {!removed && value ? (
                    item.kind === "video" ? (
                      <video src={value} muted playsInline className="mt-3 h-28 w-48 border border-white/10 bg-[#101010] object-cover" />
                    ) : (
                      <img src={value} alt="" className="mt-3 h-28 w-44 border border-white/10 bg-[#101010] object-cover" />
                    )
                  ) : null}
                </label>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
