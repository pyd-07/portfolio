import { Cloud, Server, Database, Cpu, Bell, ListOrdered } from "lucide-react";

// Minimal backend system flow visualization.
// Client → API → Queue → Worker → Database, with a branch to Logs/Alerts.
const nodes = [
  { id: "client", label: "Client", icon: Cloud, x: 40, y: 60 },
  { id: "api", label: "API", icon: Server, x: 160, y: 60 },
  { id: "queue", label: "Queue", icon: ListOrdered, x: 280, y: 60 },
  { id: "worker", label: "Worker", icon: Cpu, x: 400, y: 60 },
  { id: "db", label: "Database", icon: Database, x: 400, y: 180 },
  { id: "alerts", label: "Logs / Alerts", icon: Bell, x: 280, y: 180 },
];

const edges = [
  { from: "client", to: "api" },
  { from: "api", to: "queue" },
  { from: "queue", to: "worker" },
  { from: "worker", to: "db", bend: true },
  { from: "worker", to: "alerts", bend: true },
];

const NODE_W = 96;
const NODE_H = 44;

const getAnchor = (
  node: { x: number; y: number },
  side: "left" | "right" | "top" | "bottom"
) => {
  switch (side) {
    case "left":
      return { x: node.x, y: node.y + NODE_H / 2 };
    case "right":
      return { x: node.x + NODE_W, y: node.y + NODE_H / 2 };
    case "top":
      return { x: node.x + NODE_W / 2, y: node.y };
    case "bottom":
      return { x: node.x + NODE_W / 2, y: node.y + NODE_H };
  }
};

const SystemDiagram = () => {
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));

  return (
    <div className="relative w-full max-w-[560px] mx-auto">
      {/* Soft glow backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 blur-3xl opacity-60"
        style={{
          background:
            "radial-gradient(60% 50% at 70% 30%, hsl(220 90% 55% / 0.12), transparent 70%), radial-gradient(50% 50% at 30% 80%, hsl(265 80% 60% / 0.10), transparent 70%)",
        }}
      />

      <div className="glass-surface rounded-2xl p-5 md:p-6">
        {/* Header bar */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
          </div>
          <span className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
            system.flow
          </span>
        </div>

        <svg
          viewBox="0 0 520 260"
          className="w-full h-auto"
          role="img"
          aria-label="Backend system architecture diagram"
        >
          <defs>
            <linearGradient id="edgeGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="hsl(var(--foreground))" stopOpacity="0.15" />
              <stop offset="100%" stopColor="hsl(var(--foreground))" stopOpacity="0.45" />
            </linearGradient>
            <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="1.2" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Edges */}
          {edges.map((e, i) => {
            const a = byId[e.from];
            const b = byId[e.to];
            let path = "";
            if (e.bend) {
              // Right-angle bend from worker (right column) down to db / left to alerts
              const start = getAnchor(a, "bottom");
              const end =
                b.x === a.x ? getAnchor(b, "top") : getAnchor(b, "right");
              const midY = (start.y + end.y) / 2;
              path = `M ${start.x} ${start.y} L ${start.x} ${midY} L ${end.x} ${midY} L ${end.x} ${end.y}`;
            } else {
              const start = getAnchor(a, "right");
              const end = getAnchor(b, "left");
              path = `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
            }
            return (
              <g key={i}>
                <path
                  d={path}
                  fill="none"
                  stroke="url(#edgeGrad)"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                />
                {/* Animated flow pulse */}
                <circle r="2.2" fill="hsl(var(--foreground))" opacity="0.7">
                  <animateMotion
                    dur={`${2.4 + i * 0.3}s`}
                    repeatCount="indefinite"
                    path={path}
                    begin={`${i * 0.4}s`}
                  />
                </circle>
              </g>
            );
          })}

          {/* Nodes */}
          {nodes.map((n) => {
            const Icon = n.icon;
            return (
              <g key={n.id} filter="url(#softGlow)">
                <rect
                  x={n.x}
                  y={n.y}
                  width={NODE_W}
                  height={NODE_H}
                  rx="10"
                  fill="hsl(var(--card))"
                  fillOpacity="0.85"
                  stroke="hsl(var(--foreground) / 0.12)"
                  strokeWidth="1"
                />
                <foreignObject
                  x={n.x}
                  y={n.y}
                  width={NODE_W}
                  height={NODE_H}
                >
                  <div className="w-full h-full flex items-center justify-center gap-1.5 text-foreground">
                    <Icon className="h-3.5 w-3.5 opacity-70" strokeWidth={1.5} />
                    <span className="font-mono text-[11px] tracking-tight">
                      {n.label}
                    </span>
                  </div>
                </foreignObject>
                {/* Subtle pulsing dot */}
                <circle
                  cx={n.x + NODE_W - 8}
                  cy={n.y + 8}
                  r="1.6"
                  fill="hsl(var(--foreground))"
                  opacity="0.5"
                >
                  <animate
                    attributeName="opacity"
                    values="0.2;0.7;0.2"
                    dur="2.6s"
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            );
          })}
        </svg>

        {/* Footer caption */}
        <div className="mt-4 flex items-center justify-between font-mono text-[10px] text-muted-foreground">
          <span>↳ event-driven · idempotent · observable</span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-foreground/60 animate-pulse" />
            healthy
          </span>
        </div>
      </div>
    </div>
  );
};

export default SystemDiagram;
