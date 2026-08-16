import { useInView } from "@/hooks/useInView";
import { INTERNSHIPS } from "@/utils/constants";
import { Calendar, MapPin } from "lucide-react";

const Internships = () => {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <section
      id="internships"
      ref={ref}
      className={`container py-24 md:py-32 border-t border-border reveal ${inView ? "in-view" : ""}`}
    >
      <div className="grid md:grid-cols-3 gap-12">
        <div>
          <p className="text-sm font-mono text-muted-foreground mb-2">// experience</p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Internships
          </h2>
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
            Professional work history and hands-on technical internships.
          </p>
        </div>

        <div className="md:col-span-2 space-y-12">
          {INTERNSHIPS.map((item, index) => (
            <div
              key={`${item.company}-${item.role}-${index}`}
              className="group flex flex-col gap-2 transition-colors hover:bg-accent/20 -mx-4 px-4 py-4 rounded-xl"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <h3 className="text-lg font-semibold text-foreground tracking-tight">
                  {item.role}{" "}
                  <span className="text-muted-foreground font-normal">at</span>{" "}
                  <span className="text-foreground/90">{item.company}</span>
                </h3>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground font-mono mt-1">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {item.duration}
                </span>
                {item.location && (
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" />
                    {item.location}
                  </span>
                )}
              </div>

              <ul className="mt-4 space-y-2">
                {item.bullets.map((bullet, bIdx) => (
                  <li
                    key={bIdx}
                    className="text-sm text-muted-foreground leading-relaxed pl-4 relative before:content-['→'] before:absolute before:left-0 before:text-muted-foreground/50 before:font-mono"
                  >
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Internships;
