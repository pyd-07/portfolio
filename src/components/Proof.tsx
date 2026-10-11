import { PROOF } from "@/utils/constants";

interface Props {
  // Hide the section heading (used when a page header is already rendered)
  showHeader?: boolean;
}

const Proof = ({ showHeader = true }: Props) => (
  <section className="container py-16 md:py-24">
    <div className="grid md:grid-cols-3 gap-10 md:gap-12">
      {showHeader && (
        <div>
          <p className="kicker mb-3">// proof</p>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Proof of work
          </h2>
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
            Systems built, not just frameworks listed.
          </p>
        </div>
      )}

      <ul
        className={`${showHeader ? "md:col-span-2" : "md:col-span-3"} divide-y divide-border border-y border-border`}
      >
        {PROOF.map((item) => (
          <li key={item.title} className="py-6 first:pt-6 last:pb-6">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
              <h3 className="text-base md:text-lg font-medium text-foreground">
                {item.title}
              </h3>
              <div className="flex flex-wrap gap-x-3 gap-y-1 justify-end font-mono text-[11px] text-muted-foreground/80">
                {item.keywords.map((k) => (
                  <span key={k}>{k}</span>
                ))}
              </div>
            </div>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              {item.detail}
            </p>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default Proof;
