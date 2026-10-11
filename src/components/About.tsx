interface Props {
  // Hide the section heading (used when a page header is already rendered)
  showHeader?: boolean;
}

const About = ({ showHeader = true }: Props) => (
  <section id="about" className="container py-16 md:py-24">
    <div className="grid md:grid-cols-3 gap-10 md:gap-12">
      {showHeader && (
        <div>
          <p className="kicker mb-3">// about</p>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">About</h2>
        </div>
      )}
      <div
        className={`${showHeader ? "md:col-span-2" : "md:col-span-3"} max-w-3xl space-y-5 text-base md:text-lg text-muted-foreground leading-[1.75]`}
      >
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

export default About;
