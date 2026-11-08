export default function LegalView({ page, updatedLabel = "Last updated" }) {
  return (
    <main className="mx-auto max-w-[860px] bg-white px-5 pb-24 pt-28 text-[#0b0b0c] md:px-8">
      <p className="text-xs uppercase tracking-[0.16em] text-[#888]">
        {updatedLabel} {page.updated}
      </p>
      <h1 className="studio-display mt-3 text-[clamp(40px,6vw,72px)] leading-[0.95]">{page.title}</h1>
      <p className="mt-6 text-lg leading-8 text-[#444]">{page.lede}</p>
      <div className="mt-12 space-y-8">
        {page.sections.map((section) => (
          <section key={section.heading} className="border-t border-black/10 pt-6">
            <h2 className="text-xl">{section.heading}</h2>
            <p className="mt-3 text-sm leading-7 text-[#555] md:text-base">{section.text}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
