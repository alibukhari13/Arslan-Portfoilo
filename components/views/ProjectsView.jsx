import { getSite } from "@/lib/getSite";
import { isShown } from "@/lib/shown";
import ContactBand from "../home/ContactBand";
import ProjectFrames from "../projects/ProjectFrames";
import Reveal from "../ui/Reveal";
import ScrollWords from "../ui/ScrollWords";

export default async function ProjectsView() {
  const { projects, copy, hidden } = await getSite();
  return (
    <main className="pt-28">
      {isShown(hidden, "projects-intro") ? <div className="mx-auto max-w-[1320px] px-5 pb-16 text-center md:px-10">
        <Reveal>
          <ScrollWords
            as="h1"
            text={copy.projectsPageTitle || copy.projectsTitle}
            className="display-title mx-auto max-w-[692px]"
          />
        </Reveal>
        {copy.projectsPageText ? <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-mist">{copy.projectsPageText}</p> : null}
      </div> : null}
      {isShown(hidden, "projects-all") ? <ProjectFrames projects={projects} labels={copy} /> : null}
      {isShown(hidden, "projects-contact") ? <ContactBand source="Projects" /> : null}
    </main>
  );
}
