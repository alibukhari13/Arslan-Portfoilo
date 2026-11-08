import { getSite } from "@/lib/getSite";
import { isShown } from "@/lib/shown";
import ProjectBrowser from "./ProjectBrowser";
import StudioForm from "./StudioForm";

export default async function ProjectsView() {
  const { projects, profile, copy, hidden } = await getSite();

  return (
    <main className="bg-white px-5 pb-10 pt-24 text-[#0b0b0c] md:px-10 md:pt-28">
      <div className="mx-auto max-w-[1440px]">
        {isShown(hidden, "projects-intro") ? (
          <header>
            <h1 className="text-[clamp(64px,10vw,120px)] leading-none tracking-[-0.06em]">Projects</h1>
          </header>
        ) : null}
        {isShown(hidden, "projects-all") ? (
          <div className="mt-10">
            <ProjectBrowser projects={projects} intro={copy.projectsPageText || "Every frame is interface design: flows, layout, and a screen someone can use."} />
          </div>
        ) : null}
        {isShown(hidden, "projects-contact") ? (
          <section className="mt-24 grid gap-10 lg:grid-cols-2">
            <h2 className="text-5xl tracking-[-0.05em]">Let’s bring your vision to life</h2>
            <StudioForm source="Projects" email={profile.email} text={copy} />
          </section>
        ) : null}
      </div>
    </main>
  );
}
