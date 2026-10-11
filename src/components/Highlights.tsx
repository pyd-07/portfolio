import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { INTERNSHIPS, PROOF } from "@/utils/constants";

// Compact home-page preview linking to the Experience and Open Source pages
const Highlights = () => {
  const internship = INTERNSHIPS[0];
  const openSource = PROOF[0];

  return (
    <section className="container py-16 md:py-24">
      <div className="grid md:grid-cols-2 gap-5">
        <Link
          to="/experience"
          className="group card p-6 hover:border-foreground/20 transition-colors duration-200 flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <p className="kicker mb-3">// experience</p>
          <h3 className="font-semibold text-lg tracking-tight">Experience</h3>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            {internship.role} at {internship.company}, internships and proof of
            work.
          </p>
          <span className="mt-3 text-xs font-mono text-muted-foreground/80">
            {internship.duration}
          </span>
          <span className="mt-6 pt-4 border-t border-border flex items-center gap-2 text-xs font-mono text-muted-foreground group-hover:text-foreground transition-colors">
            View experience
            <ArrowRight className="h-3.5 w-3.5 text-primary/70 transition-transform group-hover:translate-x-0.5" />
          </span>
        </Link>

        <Link
          to="/open-source"
          className="group card p-6 hover:border-foreground/20 transition-colors duration-200 flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <p className="kicker mb-3">// contributions</p>
          <h3 className="font-semibold text-lg tracking-tight">Open Source</h3>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            {openSource.detail}
          </p>
          <span className="mt-3 text-xs font-mono text-muted-foreground/80">
            {openSource.keywords.join(" · ")}
          </span>
          <span className="mt-6 pt-4 border-t border-border flex items-center gap-2 text-xs font-mono text-muted-foreground group-hover:text-foreground transition-colors">
            View open source
            <ArrowRight className="h-3.5 w-3.5 text-primary/70 transition-transform group-hover:translate-x-0.5" />
          </span>
        </Link>
      </div>
    </section>
  );
};

export default Highlights;
