import { SKILLS } from "@/utils/constants";
import { useInView } from "@/hooks/useInView";

const Skills = () => {
  const { ref, inView } = useInView<HTMLElement>();
  return (
    <section
      id="skills"
      ref={ref}
      className={`container py-24 md:py-32 border-t border-border reveal ${inView ? "in-view" : ""}`}
    >
      <div className="mb-12">
        <p className="text-sm font-mono text-muted-foreground mb-2">// skills</p>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Toolkit</h2>
        <p className="mt-3 text-sm text-muted-foreground max-w-xl">
          Tools I reach for — and how I actually use them.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {Object.entries(SKILLS).map(([category, items]) => (
          <div
            key={category}
            className="rounded-xl border border-border p-6 hover:border-foreground/20 transition-colors"
          >
            <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-5">
              {category}
            </h3>
            <ul className="space-y-3.5">
              {items.map((s) => (
                <li key={s.name} className="leading-snug">
                  <div className="text-sm font-medium text-foreground">{s.name}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{s.context}</div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
