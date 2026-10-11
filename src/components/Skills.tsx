import { SKILLS } from "@/utils/constants";

interface Props {
  // Hide the section heading (used when a page header is already rendered)
  showHeader?: boolean;
}

// Categories ordered: primary areas of expertise first, supporting tools last
const PRIMARY_CATEGORIES = ["Languages", "Backend", "Kubernetes & Open Source"];
const SECONDARY_CATEGORIES = ["DevOps & Infrastructure", "Tools"];

const Skills = ({ showHeader = true }: Props) => (
  <section id="skills" className="container py-16 md:py-24">
    {showHeader && (
      <div className="mb-10">
        <p className="kicker mb-3">// skills</p>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Toolkit</h2>
        <p className="mt-3 text-sm text-muted-foreground max-w-xl">
          Tools I reach for, and how I actually use them.
        </p>
      </div>
    )}

    {/* Primary areas: full cards with context */}
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
      {PRIMARY_CATEGORIES.filter((c) => SKILLS[c]).map((category) => (
        <div key={category} className="card p-6">
          <h3 className="mb-5 flex items-center gap-2 text-xs font-mono text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
            {category}
          </h3>
          <ul className="space-y-4">
            {SKILLS[category].map((s) => (
              <li key={s.name} className="leading-snug">
                <div className="text-sm font-medium text-foreground">{s.name}</div>
                <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                  {s.context}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    {/* Supporting tools: lighter treatment */}
    <div className="mt-5 grid sm:grid-cols-2 gap-5">
      {SECONDARY_CATEGORIES.filter((c) => SKILLS[c]).map((category) => (
        <div key={category} className="rounded-xl border border-border/60 p-6">
          <h3 className="mb-5 text-xs font-mono text-muted-foreground/80">
            {category}
          </h3>
          <ul className="space-y-4">
            {SKILLS[category].map((s) => (
              <li key={s.name} className="leading-snug">
                <div className="text-sm font-medium text-foreground/90">
                  {s.name}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                  {s.context}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </section>
);

export default Skills;
