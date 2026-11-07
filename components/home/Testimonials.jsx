import { getSite } from "@/lib/getSite";
import Reveal from "../ui/Reveal";
import StudySlider from "./StudySlider";

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
          <div className="mt-6 flex gap-2">
            {principles.slice(0, 4).map((item) => (
              <img key={item.name} src={item.image} alt="" className="h-12 w-12 rounded-full object-cover" />
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-[60px]">
        <StudySlider items={principles} />
      </div>
    </section>
  );
}
