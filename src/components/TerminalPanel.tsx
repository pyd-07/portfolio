import { useEffect, useState } from "react";

// Minimal terminal-style panel showing automation/system logs.
const LINES = [
  { t: "$", text: "system.boot --env=prod", tone: "muted" },
  { t: ">", text: "initializing workers... ok", tone: "default" },
  { t: ">", text: "connecting queue (redis)... ok", tone: "default" },
  { t: ">", text: "running health checks... 12/12 passing", tone: "ok" },
  { t: "!", text: "alert: latency spike on /ingest (p95 412ms)", tone: "warn" },
  { t: ">", text: "auto-scaling workers 4 → 8", tone: "default" },
  { t: ">", text: "retry job#8821 ... success", tone: "ok" },
  { t: ">", text: "drained backlog (1,204 msgs) in 38s", tone: "default" },
  { t: "✓", text: "system stable · uptime 99.98%", tone: "ok" },
];

const toneClass: Record<string, string> = {
  muted: "text-muted-foreground",
  default: "text-foreground/80",
  ok: "text-foreground",
  warn: "text-foreground",
};

const TerminalPanel = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count >= LINES.length) return;
    const t = setTimeout(() => setCount((c) => c + 1), 520);
    return () => clearTimeout(t);
  }, [count]);

  // Loop: after a pause, restart
  useEffect(() => {
    if (count < LINES.length) return;
    const t = setTimeout(() => setCount(0), 4200);
    return () => clearTimeout(t);
  }, [count]);

  return (
    <div className="relative w-full max-w-[560px] mx-auto">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 blur-3xl opacity-60"
        style={{
          background:
            "radial-gradient(60% 50% at 70% 30%, hsl(220 90% 55% / 0.12), transparent 70%), radial-gradient(50% 50% at 30% 80%, hsl(265 80% 60% / 0.10), transparent 70%)",
        }}
      />

      <div className="glass-surface rounded-2xl p-5 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
          </div>
          <span className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
            ops.log
          </span>
        </div>

        <div className="font-mono text-[12.5px] leading-relaxed min-h-[260px]">
          {LINES.slice(0, count).map((l, i) => (
            <div key={i} className="flex gap-2 animate-fade-in">
              <span className="text-muted-foreground select-none w-3">{l.t}</span>
              <span className={toneClass[l.tone]}>{l.text}</span>
            </div>
          ))}
          {count < LINES.length && (
            <div className="flex gap-2">
              <span className="text-muted-foreground select-none w-3">$</span>
              <span className="cursor-blink text-foreground">▋</span>
            </div>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between font-mono text-[10px] text-muted-foreground">
          <span>↳ streaming · structured · observable</span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-foreground/60 animate-pulse" />
            live
          </span>
        </div>
      </div>
    </div>
  );
};

export default TerminalPanel;
