function Row({ items, render, gap }) {
  const pad = gap.startsWith("gap-") ? gap.replace("gap-", "pr-") : "pr-3";
  return (
    <div className={`flex ${gap} ${pad}`}>
      {items.map((item, index) => (
        <div key={index} className="shrink-0">
          {render(item, index)}
        </div>
      ))}
    </div>
  );
}

export default function Marquee({ items, render, slow = false, reverse = false, className = "", gap = "gap-3" }) {
  const track = reverse ? "animate-ticker-reverse" : slow ? "animate-ticker-slow" : "animate-ticker";

  return (
    <div className={`marquee min-w-0 overflow-hidden ${className}`}>
      <div className={`flex w-max ${track}`}>
        <Row items={items} render={render} gap={gap} />
        <div aria-hidden="true">
          <Row items={items} render={render} gap={gap} />
        </div>
      </div>
    </div>
  );
}
