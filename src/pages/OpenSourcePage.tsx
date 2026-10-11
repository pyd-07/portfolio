import PageHeader from "@/components/PageHeader";
import Contributions from "@/components/Contributions";
import { usePageMeta } from "@/hooks/usePageMeta";

const OpenSourcePage = () => {
  usePageMeta(
    "Open Source - Piyush Yadav",
    "Pull requests merged and open across public repositories and communities."
  );

  return (
    <>
      <PageHeader
        kicker="contributions"
        title="Open Source"
        intro="Pull requests merged and open across public repositories and communities."
      />
      <Contributions showHeader={false} />
    </>
  );
};

export default OpenSourcePage;
