import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Highlights from "@/components/Highlights";
import Contact from "@/components/Contact";
import { usePageMeta } from "@/hooks/usePageMeta";

const Home = () => {
  usePageMeta(
    "Piyush's Portfolio",
    "Piyush Yadav - backend developer and automation engineer building reliable systems, APIs, and tooling that ships."
  );

  return (
    <>
      <Hero />
      <Projects preview />
      <Highlights />
      <Contact />
    </>
  );
};

export default Home;
