import PageHeader from "@/components/PageHeader";
import Internships from "@/components/Internships";
import Proof from "@/components/Proof";
import { usePageMeta } from "@/hooks/usePageMeta";

const ExperiencePage = () => {
  usePageMeta(
    "Experience - Piyush Yadav",
    "Professional work history, hands-on technical internships, and proof of work."
  );

  return (
    <>
      <PageHeader
        kicker="experience"
        title="Experience"
        intro="Professional work history and hands-on technical internships."
      />
      <Internships showHeader={false} />
      <Proof />
    </>
  );
};

export default ExperiencePage;
