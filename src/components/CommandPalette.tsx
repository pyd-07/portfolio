import { useEffect, useState, useMemo } from "react";
import { Folder, Moon, Github, Linkedin, Search, Briefcase, GitPullRequest } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { PROFILE } from "@/utils/constants";

interface Props {
  open: boolean;
  setOpen: (v: boolean) => void;
}

const CommandPalette = ({ open, setOpen }: Props) => {
  const { toggleTheme } = useTheme();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  // Define all available commands
  const commands = useMemo(
    () => [
      {
        label: "Go to Projects",
        icon: Folder,
        run: () => {
          document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
        },
      },
      {
        label: "Go to Internships",
        icon: Briefcase,
        run: () => {
          document.getElementById("internships")?.scrollIntoView({ behavior: "smooth" });
        },
      },
      {
        label: "Go to Contributions",
        icon: GitPullRequest,
        run: () => {
          document.getElementById("contributions")?.scrollIntoView({ behavior: "smooth" });
        },
      },
      { label: "Toggle Theme", icon: Moon, run: toggleTheme },
      {
        label: "Open GitHub",
        icon: Github,
        run: () => window.open(PROFILE.github, "_blank"),
      },
      {
        label: "Open LinkedIn",
        icon: Linkedin,
        run: () => window.open(PROFILE.linkedin, "_blank"),
      },
    ],
    [toggleTheme]
  );

  const filtered = commands.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  // Keyboard shortcut: Ctrl/Cmd + K
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(!open);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
    }
  }, [open]);

  if (!open) return null;

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const cmd = filtered[active];
      if (cmd) {
        cmd.run();
        setOpen(false);
      }
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-start justify-center pt-[15vh] px-4 bg-background/60 backdrop-blur-sm animate-fade-up"
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-lg rounded-xl border border-border bg-popover shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 border-b border-border">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            autoFocus
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={handleKey}
            placeholder="Type a command..."
            className="flex-1 h-12 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
          />
          <kbd className="text-[10px] font-mono text-muted-foreground border border-border rounded px-1.5 py-0.5">
            ESC
          </kbd>
        </div>
        <ul className="p-2 max-h-80 overflow-auto">
          {filtered.length === 0 && (
            <li className="px-3 py-6 text-center text-sm text-muted-foreground">
              No commands found
            </li>
          )}
          {filtered.map((c, i) => {
            const Icon = c.icon;
            return (
              <li key={c.label}>
                <button
                  onMouseEnter={() => setActive(i)}
                  onClick={() => {
                    c.run();
                    setOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 h-10 rounded-md text-sm text-left transition-colors ${
                    i === active ? "bg-accent text-accent-foreground" : ""
                  }`}
                >
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  {c.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default CommandPalette;
