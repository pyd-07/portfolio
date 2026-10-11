import PageHeader from "@/components/PageHeader";
import About from "@/components/About";
import Skills from "@/components/Skills";
import { usePageMeta } from "@/hooks/usePageMeta";

const AboutPage = () => {
  usePageMeta(
    "About - Piyush Yadav",
    "Backend developer focused on reliable, maintainable systems, API design, databases, and cloud-native engineering."
  );

  return (
    <>
      <PageHeader kicker="about" title="About" />
      <About showHeader={false} />
      <Skills />
    </>
  );
};

export default AboutPage;
