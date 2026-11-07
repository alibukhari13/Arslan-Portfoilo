import Reveal from "../ui/Reveal";
import ScrollWords from "../ui/ScrollWords";

export default function LegalView({ page, updatedLabel = "Last updated" }) {
  return (
    <main className="mx-auto max-w-[860px] px-5 pb-24 pt-32 md:px-8">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.16em] text-mist">{updatedLabel} {page.updated}</p>
        <ScrollWords
          as="h1"
          text={page.title}
          className="mt-3 text-[clamp(2.6rem,6vw,4.6rem)] font-medium uppercase leading-[0.92] tracking-tight"
        />
        <p className="mt-6 text-lg text-white/75">{page.lede}</p>
      </Reveal>
      <div className="mt-12 space-y-8">
        {page.sections.map((section, index) => (
          <Reveal key={section.heading} as="section" delay={Math.min(index, 4) * 60} className="border-t border-white/10 pt-6">
            <ScrollWords as="h2" text={section.heading} className="text-xl font-medium uppercase tracking-tight" />
            <p className="mt-3 text-sm leading-relaxed text-mist md:text-base">{section.text}</p>
          </Reveal>
        ))}
      </div>
    </main>
  );
}
