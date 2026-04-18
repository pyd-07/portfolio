import { useInView } from "@/hooks/useInView";

const About = () => {
  const { ref, inView } = useInView<HTMLElement>();
  return (
    <section
      id="about"
      ref={ref}
      className={`container py-24 md:py-32 border-t border-border reveal ${inView ? "in-view" : ""}`}
    >
      <div className="grid md:grid-cols-3 gap-12">
        <div>
          <p className="text-sm font-mono text-muted-foreground mb-2">// about</p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">About</h2>
        </div>
        <div className="md:col-span-2 space-y-5 text-lg text-muted-foreground leading-[1.7]">
          <p>
            I'm a backend developer and automation engineer focused on systems
            that are <span className="text-foreground">reliable, observable, and quietly efficient</span>.
          </p>
          <p>
            My work centers on backend services, API design, and the kind of
            automation that removes toil — test suites, CI pipelines, and tooling
            that ships value without ceremony.
          </p>
          <p className="text-foreground font-medium">
            I focus on building systems that are easy to maintain and hard to break.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
