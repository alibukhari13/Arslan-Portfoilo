"use client";

const inputClass = "h-11 w-full border border-white/12 bg-[#101010] px-3 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-lime";
const areaClass = "w-full border border-white/12 bg-[#101010] px-3 py-3 text-sm leading-6 text-white outline-none transition-colors placeholder:text-white/30 focus:border-lime";
const labelClass = "mb-2 block text-[11px] font-medium uppercase tracking-[0.14em] text-white/45";
const quietBtn = "inline-flex h-8 items-center justify-center border border-white/12 px-2.5 text-[11px] font-medium uppercase tracking-[0.12em] text-white/70 transition-colors hover:border-white/35 hover:text-white disabled:cursor-not-allowed disabled:opacity-30";
const iconBtn = "grid h-8 w-8 place-items-center border border-white/12 text-sm text-white/70 transition-colors hover:border-white/35 hover:text-white disabled:cursor-not-allowed disabled:opacity-30";

function Field({ label, value, long, hint, onChange }) {
  return (
    <label className={long ? "block sm:col-span-2" : "block"}>
      <span className={labelClass}>{label}</span>
      {long ? (
        <textarea rows={4} className={areaClass} value={value || ""} onChange={(event) => onChange(event.target.value)} />
      ) : (
        <input className={inputClass} value={value || ""} onChange={(event) => onChange(event.target.value)} />
      )}
      {hint ? <span className="mt-2 block text-xs leading-5 text-white/45">{hint}</span> : null}
    </label>
  );
}

function Lines({ label, value, hint, onChange }) {
  const text = Array.isArray(value) ? value.join("\n") : "";
  return (
    <label className="block sm:col-span-2">
      <span className={labelClass}>{label}</span>
      <textarea rows={4} className={areaClass} value={text} onChange={(event) => onChange(event.target.value.split("\n"))} />
      <span className="mt-2 block text-xs leading-5 text-white/45">{hint || "One line each. Delete a line to remove it. Add a line to add one."}</span>
    </label>
  );
}

function move(list, index, direction) {
  const target = index + direction;
  if (target < 0 || target >= list.length) return list;
  const next = [...list];
  const [row] = next.splice(index, 1);
  next.splice(target, 0, row);
  return next;
}

function ListBlock({ list, page, setList }) {
  const rows = page[list.key] || [];
  const allowAdd = list.allowAdd !== false;
  const allowMove = list.allowMove !== false;
  const allowDelete = list.allowDelete !== false;
  return (
    <div className="space-y-4">
      {list.heading ? <h2 className="text-sm uppercase tracking-[0.14em]">{list.heading}</h2> : null}
      {list.note ? <p className="text-sm leading-6 text-white/55">{list.note}</p> : null}
      {rows.map((item, index) => (
        <article key={`${list.key}-${index}`} className="border border-white/10 bg-panel">
          <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
            <span className="w-7 shrink-0 text-xs text-white/35">{String(index + 1).padStart(2, "0")}</span>
            <p className="min-w-0 flex-1 truncate text-sm">{item[list.titleKey] || list.empty || "New item"}</p>
            <div className="flex shrink-0 items-center gap-1">
              {allowMove ? <button type="button" className={iconBtn} aria-label="Move up" disabled={index === 0} onClick={() => setList(list.key, move(rows, index, -1))}>↑</button> : null}
              {allowMove ? <button type="button" className={iconBtn} aria-label="Move down" disabled={index === rows.length - 1} onClick={() => setList(list.key, move(rows, index, 1))}>↓</button> : null}
              {allowDelete ? <button type="button" className={`${quietBtn} text-red-300 hover:text-red-200`} onClick={() => setList(list.key, rows.filter((_, itemIndex) => itemIndex !== index))}>Delete</button> : null}
            </div>
          </div>
          <div className="grid gap-4 p-4 sm:grid-cols-2">
            {list.fields.filter((field) => !(field.hideEmpty && !String(item[field.key] || "").trim())).map((field) => field.lines ? (
              <Lines key={field.key} label={field.label} value={item[field.key]} onChange={(value) => {
                const next = [...rows];
                next[index] = { ...item, [field.key]: value };
                setList(list.key, next);
              }} />
            ) : (
              <Field key={field.key} label={field.label} long={field.long} hint={field.hint} value={item[field.key]} onChange={(value) => {
                const next = [...rows];
                next[index] = { ...item, [field.key]: value };
                setList(list.key, next);
              }} />
            ))}
          </div>
        </article>
      ))}
      {allowAdd ? (
        <button
          type="button"
          className="flex h-12 w-full items-center justify-center border border-dashed border-white/20 text-[12px] font-medium uppercase tracking-[0.14em] text-lime hover:border-lime"
          onClick={() => setList(list.key, [...rows, { ...list.blank, ...(list.lockId ? { id: `filter-${Date.now()}` } : {}) }])}
        >
          {list.addLabel}
        </button>
      ) : null}
    </div>
  );
}

export function LiveEditor({ section, pages, onChange }) {
  const pageKey = section.livePage;
  const fields = section.fields || [];
  const lists = [section.list, ...(section.moreLists || [])].filter(Boolean);

  return (
    <div className="space-y-4">
      {fields.length ? (
        <section className="border border-white/10 bg-panel">
          <header className="border-b border-white/10 px-5 py-4">
            <h2 className="text-sm uppercase tracking-[0.14em]">Words in this section</h2>
          </header>
          <div className="grid gap-4 p-5 sm:grid-cols-2">
            {fields.map((field) => {
              const ownerKey = field.page || pageKey;
              const owner = pages?.[ownerKey] || {};
              const write = (value) => onChange({ ...pages, [ownerKey]: { ...owner, [field.key]: value } });
              return field.lines ? (
                <Lines key={`${ownerKey}-${field.key}`} label={field.label} hint={field.hint} value={owner[field.key]} onChange={write} />
              ) : (
                <Field key={`${ownerKey}-${field.key}`} label={field.label} long={field.long} hint={field.hint} value={owner[field.key]} onChange={write} />
              );
            })}
          </div>
        </section>
      ) : null}

      {lists.map((list) => {
        const ownerKey = list.page || pageKey;
        const owner = pages?.[ownerKey] || {};
        return (
          <ListBlock
            key={`${ownerKey}-${list.key}`}
            list={list}
            page={owner}
            setList={(key, rows) => {
              const nextOwner = { ...owner, [key]: rows };
              if (key === "filters") {
                rows.forEach((row) => {
                  const id = String(row.id || "").trim().toLowerCase();
                  if (id === "dashboard") nextOwner.filterDashboard = row.label || "Dashboard";
                  if (id === "app") nextOwner.filterApp = row.label || "App";
                  if (id === "website") nextOwner.filterWebsite = row.label || "Website";
                });
              }
              onChange({ ...pages, [ownerKey]: nextOwner });
            }}
          />
        );
      })}
    </div>
  );
}
