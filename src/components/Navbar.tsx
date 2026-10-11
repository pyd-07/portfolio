import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Moon, Sun, Command, Menu, X } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { NavLink } from "@/components/NavLink";

interface Props {
  openPalette: () => void;
}

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/projects", label: "Projects" },
  { to: "/experience", label: "Experience" },
  { to: "/open-source", label: "Open Source" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const Navbar = ({ openPalette }: Props) => {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  // Close the mobile menu when the route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Close the mobile menu with Escape
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 glass">
      <nav
        aria-label="Main navigation"
        className="container flex h-16 items-center justify-between"
      >
        <Link
          to="/"
          className="rounded-md font-semibold tracking-tight text-lg"
          aria-label="Home"
        >
          py<span className="text-primary">.</span>
        </Link>

        <div className="hidden md:flex items-center gap-1 text-sm">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className="px-3 py-2 rounded-md text-muted-foreground hover:text-foreground transition-colors"
              activeClassName="text-foreground bg-accent/60"
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={openPalette}
            className="hidden sm:flex items-center gap-2 px-3 h-9 rounded-lg border border-border text-xs text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            aria-label="Open command palette"
          >
            <Command className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={toggleTheme}
            className="h-9 w-9 grid place-items-center rounded-lg border border-border hover:bg-accent transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="md:hidden h-9 w-9 grid place-items-center rounded-lg border border-border hover:bg-accent transition-colors"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>
    </header>

      {menuOpen && (
        <>
          {/* Backdrop: click anywhere below the navbar to close the menu */}
          <div
            className="md:hidden fixed inset-0 top-16 z-30 bg-background/60 backdrop-blur-sm animate-in fade-in duration-200"
            aria-hidden="true"
            onClick={() => setMenuOpen(false)}
          />

          {/* Slide-down panel */}
          <div
            id="mobile-nav"
            className="md:hidden fixed left-0 right-0 top-16 z-30 px-4 pb-4"
          >
            <nav
              aria-label="Mobile navigation"
              className="rounded-xl border border-border bg-popover/95 backdrop-blur-xl shadow-2xl p-2 animate-in fade-in slide-in-from-top-2 duration-200"
            >
              {links.map((l, i) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.end}
                  style={{ animationDelay: `${i * 40}ms` }}
                  className="group flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors animate-in fade-in duration-200"
                  activeClassName="text-foreground bg-accent font-medium"
                >
                  <span>{l.label}</span>
                  <span className="font-mono text-[10px] text-muted-foreground/60 group-hover:text-muted-foreground transition-colors">
                    {l.to === "/" ? "~" : l.to}
                  </span>
                </NavLink>
              ))}
            </nav>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
