import { getSite } from "@/lib/getSite";
import ContactBand from "../home/ContactBand";
import ProjectFrames from "../projects/ProjectFrames";
import Reveal from "../ui/Reveal";
import ScrollWords from "../ui/ScrollWords";

export default async function ProjectsView() {
  const { projects, copy } = await getSite();
  return (
    <main className="pt-28">
      <div className="mx-auto max-w-[760px] px-5 pb-14 text-center md:px-8">
        <Reveal>
          <ScrollWords
            as="h1"
            text={copy.projectsPageTitle || copy.projectsTitle}
            className="text-[clamp(2.8rem,6vw,5rem)] uppercase leading-[0.8]"
          />
        </Reveal>
        {copy.projectsPageText ? <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-mist">{copy.projectsPageText}</p> : null}
      </div>
      <ProjectFrames projects={projects} labels={copy} />
      <ContactBand />
    </main>
  );
}
