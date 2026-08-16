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
            I'm a backend developer focused on building
            <span className="text-foreground"> reliable, maintainable systems </span>
            and understanding how they work beneath the surface.
          </p>
          <p>
            My work centers on backend services, API design, databases, and
            <span className="text-foreground"> cloud-native engineering </span> including
            contributing to Kyverno ecosystem through open-source
            development in Go.
          </p>
          <p className="text-foreground font-medium">
            I'm focused on growing into a systems-oriented engineer who can build,
            debug, and improve production software from the application layer down.
          </p>

        </div>
      </div>
    </section>
  );
};

export default About;
