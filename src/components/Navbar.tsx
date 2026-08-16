import { Moon, Sun, Command } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

interface Props {
  openPalette: () => void;
}

const links = [
  { href: "#projects", label: "Projects" },
  { href: "#internships", label: "Experience" },
  { href: "#contributions", label: "Contributions" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

const Navbar = ({ openPalette }: Props) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 glass">
      <nav className="container flex h-16 items-center justify-between">
        <a href="#" className="font-semibold tracking-tight text-lg">
          py<span className="text-muted-foreground">.</span>
        </a>

        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hover:text-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={openPalette}
            className="hidden sm:flex items-center gap-2 px-3 h-9 rounded-md border border-border text-xs text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            aria-label="Open command palette"
          >
            <Command className="h-3.5 w-3.5" />
            <span className="font-mono">K</span>
          </button>
          <button
            onClick={toggleTheme}
            className="h-9 w-9 grid place-items-center rounded-md border border-border hover:bg-accent transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
