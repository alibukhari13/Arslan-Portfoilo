import { notFound } from "next/navigation";
import ProjectDetail from "@/components/views/ProjectDetail";
import { getSite } from "@/lib/getSite";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { projects, profile } = await getSite();
  const project = projects.find((item) => item.slug === slug);
  if (!project) return { title: "Project" };
  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: `${project.title} — ${profile.name}`,
      description: project.summary,
      images: [project.image],
    },
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const { projects, copy, hidden } = await getSite();
  const index = projects.findIndex((item) => item.slug === slug);
  if (index < 0) notFound();

  const current = projects[index];
  const more = [1, 2]
    .map((step) => projects[(index + step) % projects.length])
    .filter((item) => item && item.slug !== current.slug);

  return <ProjectDetail project={current} more={more} copy={copy} hidden={hidden} />;
}
