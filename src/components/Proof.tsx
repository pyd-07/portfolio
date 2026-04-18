import { useInView } from "@/hooks/useInView";
import { PROOF } from "@/utils/constants";

const Proof = () => {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <section
      id="proof"
      ref={ref}
      className={`container py-24 md:py-32 border-t border-border reveal ${inView ? "in-view" : ""}`}
    >
      <div className="grid md:grid-cols-3 gap-12">
        <div>
          <p className="text-sm font-mono text-muted-foreground mb-2">// proof</p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Proof of work
          </h2>
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
            Systems built, not just frameworks listed.
          </p>
        </div>

        <ul className="md:col-span-2 divide-y divide-border border-y border-border">
          {PROOF.map((item) => (
            <li
              key={item.title}
              className="group py-6 flex flex-col gap-2 transition-colors hover:bg-accent/30 -mx-4 px-4 rounded-md"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-base md:text-lg font-medium text-foreground">
                  {item.title}
                </h3>
                <div className="flex flex-wrap gap-1.5 justify-end">
                  {item.keywords.map((k) => (
                    <span
                      key={k}
                      className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground"
                    >
                      {k}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.detail}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Proof;
