import { INTERNSHIPS } from "@/utils/constants";
import { Calendar, MapPin } from "lucide-react";

interface Props {
  // Hide the section heading (used when a page header is already rendered)
  showHeader?: boolean;
}

const Internships = ({ showHeader = true }: Props) => (
  <section id="internships" className="container py-16 md:py-24">
    <div className="grid md:grid-cols-3 gap-10 md:gap-12">
      {showHeader && (
        <div>
          <p className="kicker mb-3">// experience</p>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Internships
          </h2>
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
            Professional work history and hands-on technical internships.
          </p>
        </div>
      )}

      <div className={`${showHeader ? "md:col-span-2" : "md:col-span-3"}`}>
        {INTERNSHIPS.map((item, index) => (
          <article
            key={`${item.company}-${item.role}-${index}`}
            className="relative pl-6 md:pl-8 border-l border-border"
          >
            {/* Timeline marker */}
            <span
              aria-hidden
              className="absolute left-0 top-1.5 -translate-x-1/2 h-2.5 w-2.5 rounded-full border-2 border-primary bg-background"
            />

            <h3 className="text-lg font-semibold text-foreground tracking-tight">
              {item.role}{" "}
              <span className="text-muted-foreground font-normal">at</span>{" "}
              <span className="text-foreground/90">{item.company}</span>
            </h3>

            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground font-mono">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" aria-hidden />
                {item.duration}
              </span>
              {item.location && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" aria-hidden />
                  {item.location}
                </span>
              )}
            </div>

            <ul className="mt-5 mb-12 space-y-2.5 last:mb-0">
              {item.bullets.map((bullet, bIdx) => (
                <li
                  key={bIdx}
                  className="text-sm text-muted-foreground leading-relaxed pl-4 relative before:content-['→'] before:absolute before:left-0 before:text-primary/70 before:font-mono"
                >
                  {bullet}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Internships;
