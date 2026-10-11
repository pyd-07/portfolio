import { Mail, Linkedin, Github, FileDown } from "lucide-react";
import { PROFILE } from "@/utils/constants";

interface Props {
  // Hide the section heading (used when a page header is already rendered)
  showHeader?: boolean;
}

const Contact = ({ showHeader = true }: Props) => (
  <section id="contact" className="container py-16 md:py-24">
    <div className="max-w-2xl">
      {showHeader && (
        <>
          <p className="kicker mb-3">// contact</p>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1]">
            Let's build something solid.
          </h2>
          <p className="mt-4 text-base md:text-lg text-muted-foreground">
            Open to backend, automation, and platform engineering roles.
          </p>
        </>
      )}

      <div className={`${showHeader ? "mt-10" : ""} flex flex-wrap gap-3`}>
        <a
          href={`mailto:${PROFILE.email}`}
          className="btn-primary"
        >
          <Mail className="h-4 w-4" />
          Email
        </a>
        <a
          href={PROFILE.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary"
        >
          <Linkedin className="h-4 w-4" />
          LinkedIn
        </a>
        <a
          href={PROFILE.github}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary"
        >
          <Github className="h-4 w-4" />
          GitHub
        </a>
        <a
          href={PROFILE.resume}
          target="_blank"
          rel="noopener noreferrer"
          download
          className="btn-secondary"
        >
          <FileDown className="h-4 w-4" />
          Resume
        </a>
      </div>
    </div>
  </section>
);

export default Contact;
