import { PROFILE } from "@/utils/constants";

const Footer = () => (
  <footer className="border-t border-border">
    <div className="container py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground font-mono">
      <span>© {new Date().getFullYear()} {PROFILE.name}</span>
      <span>Press <kbd className="px-1.5 py-0.5 rounded border border-border">⌘K</kbd> for commands</span>
    </div>
  </footer>
);

export default Footer;
