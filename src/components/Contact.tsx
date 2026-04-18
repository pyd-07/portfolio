import { Mail, Linkedin, Github, FileDown } from "lucide-react";
import { PROFILE } from "@/utils/constants";
import { useInView } from "@/hooks/useInView";

const Contact = () => {
  const { ref, inView } = useInView<HTMLElement>();
  return (
  <section
    id="contact"
    ref={ref}
    className={`container py-24 md:py-36 border-t border-border reveal ${inView ? "in-view" : ""}`}
  >
    <div className="max-w-2xl">
      <p className="text-sm font-mono text-muted-foreground mb-2">// contact</p>
      <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
        Let's build something solid.
      </h2>
      <p className="mt-4 text-lg text-muted-foreground">
        Open to backend, automation, and platform engineering roles.
      </p>

      <div className="mt-10 flex flex-wrap gap-3">
        <a
          href={`mailto:${PROFILE.email}`}
          className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Mail className="h-4 w-4" />
          Email
        </a>
        <a
          href={PROFILE.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 h-11 px-5 rounded-full border border-border text-sm font-medium hover:bg-accent transition-colors"
        >
          <Linkedin className="h-4 w-4" />
          LinkedIn
        </a>
        <a
          href={PROFILE.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 h-11 px-5 rounded-full border border-border text-sm font-medium hover:bg-accent transition-colors"
        >
          <Github className="h-4 w-4" />
          GitHub
        </a>
        <a
          href={PROFILE.resume}
          target="_blank"
          rel="noopener noreferrer"
          download
          className="inline-flex items-center gap-2 h-11 px-5 rounded-full border border-border text-sm font-medium hover:bg-accent transition-colors"
        >
          <FileDown className="h-4 w-4" />
          Resume
        </a>
      </div>
    </div>
  </section>
  );
};

export default Contact;
