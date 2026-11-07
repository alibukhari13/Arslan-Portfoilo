import { getSite } from "@/lib/getSite";
import Reveal from "../ui/Reveal";
import StudySlider from "./StudySlider";

function studyFaces(items) {
  const source = items.filter((item) => item.image);
  if (!source.length) return [];
  const faces = [];
  while (faces.length < Math.max(4, source.length)) faces.push(...source);
  return faces.slice(0, Math.max(4, source.length));
}

function StudyFaces({ items }) {
  const faces = studyFaces(items);
  if (!faces.length) return null;
  const seconds = (faces.length * 56) / 40;
  const row = [...faces, ...faces];

  return (
    <div className="mt-6 h-12 w-[200px] overflow-hidden">
      <div className="study-ticker flex w-max" style={{ animationDuration: `${seconds}s` }}>
        {row.map((item, index) => (
          <img key={`${item.image}-${index}`} src={item.image} alt="" className="mr-2 h-12 w-12 shrink-0 rounded-full object-cover" />
        ))}
      </div>
    </div>
  );
}

function splitTitle(title) {
  const value = String(title || "");
  const at = value.toLowerCase().indexOf(" that ");
  if (at < 0) return { lead: value, rest: "" };
  return { lead: value.slice(0, at), rest: value.slice(at + 1) };
}

export default async function Testimonials() {
  const { principles, copy } = await getSite();
  const title = splitTitle(copy.principlesTitle);

  return (
    <section className="pb-24 md:pb-[164px]">
      <div className="mx-auto mb-20 flex w-full max-w-[1440px] flex-col gap-8 px-5 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-[60px]">
        <Reveal className="max-w-[608px]">
          <h2
            className="font-pixel text-[40px] uppercase leading-[0.8] sm:text-[56px] lg:text-[80px] lg:leading-[64px]"
            style={{ letterSpacing: "-0.04em" }}
          >
            <span className="text-white">{title.lead} </span>
            {title.rest ? <span className="text-[#666]">{title.rest}</span> : null}
          </h2>
        </Reveal>
        <div className="w-[200px] shrink-0">
          <p className="text-lg leading-[27px] tracking-[-0.01em] text-white">{copy.principlesNote}</p>
          <StudyFaces items={principles} />
        </div>
      </div>
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-[60px]">
        <StudySlider items={principles} />
      </div>
    </section>
  );
}
