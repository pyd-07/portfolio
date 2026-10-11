import { PROFILE } from "@/utils/constants";

const Footer = () => (
  <footer className="border-t border-border">
    <div className="container py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground font-mono">
      <span>
        © {new Date().getFullYear()} {PROFILE.name}
      </span>
      <span className="flex items-center gap-4">
        <a
          href={PROFILE.github}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground transition-colors"
        >
          GitHub
        </a>
        <a
          href={PROFILE.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground transition-colors"
        >
          LinkedIn
        </a>
      </span>
    </div>
  </footer>
);

export default Footer;
