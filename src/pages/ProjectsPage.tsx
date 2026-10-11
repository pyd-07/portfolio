import PageHeader from "@/components/PageHeader";
import Projects from "@/components/Projects";
import { usePageMeta } from "@/hooks/usePageMeta";

const ProjectsPage = () => {
  usePageMeta(
    "Projects - Piyush Yadav",
    "Selected repositories and technical work by Piyush Yadav, with highlights and links to source."
  );

  return (
    <>
      <PageHeader
        kicker="projects"
        title="Selected work"
        intro="Selected repositories with technical highlights, tech tags, and links to the source."
      />
      <Projects showHeader={false} />
    </>
  );
};

export default ProjectsPage;
