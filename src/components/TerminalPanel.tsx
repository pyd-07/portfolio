import { useEffect, useState } from "react";
import { GitCommit, GitMerge, GitPullRequest, Zap } from "lucide-react";

// Real contribution activity derived from the profile's constants.ts
const COMMITS = [
  {
    hash: "a3f92c1",
    repo: "kyverno/kyverno",
    message: "fix: CEL validation skips for non-validating policies",
    type: "fix",
    time: "2h ago",
  },
  {
    hash: "d81e7b4",
    repo: "kyverno/kyverno",
    message: "feat: add EvalState tracing via AST correlation",
    type: "feat",
    time: "1d ago",
  },
  {
    hash: "c20a9f3",
    repo: "kyverno/kyverno",
    message: "fix: webhook reconciliation race on policy update",
    type: "fix",
    time: "3d ago",
  },
  {
    hash: "f4b182d",
    repo: "kyverno/kyverno",
    message: "fix: background scan skips generated policy rules",
    type: "fix",
    time: "5d ago",
  },
  {
    hash: "9ec3a77",
    repo: "pyd-07/Uptor",
    message: "feat: webhook alert deduplication & noise reduction",
    type: "feat",
    time: "1w ago",
  },
  {
    hash: "b7d561e",
    repo: "pyd-07/api-test-suite",
    message: "feat: structured JSON reporting with per-test metrics",
    type: "feat",
    time: "2w ago",
  },
];

type CommitType = "fix" | "feat" | "chore";

const typeConfig: Record<CommitType, { color: string; Icon: React.FC<{ className?: string }> }> = {
  fix: { color: "text-amber-400", Icon: Zap },
  feat: { color: "text-emerald-400", Icon: GitPullRequest },
  chore: { color: "text-blue-400", Icon: GitCommit },
};

const ContributionPanel = () => {
  const [visibleCount, setVisibleCount] = useState(0);
  const [done, setDone] = useState(false);

  // Reveal commits one by one
  useEffect(() => {
    if (visibleCount >= COMMITS.length) {
      setDone(true);
      return;
    }
    const delay = visibleCount === 0 ? 400 : 480;
    const t = setTimeout(() => setVisibleCount((c) => c + 1), delay);
    return () => clearTimeout(t);
  }, [visibleCount]);

  // Loop after a pause
  useEffect(() => {
    if (!done) return;
    const t = setTimeout(() => {
      setDone(false);
      setVisibleCount(0);
    }, 5000);
    return () => clearTimeout(t);
  }, [done]);

  return (
    <div className="relative w-full max-w-[560px] mx-auto">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 blur-3xl opacity-60"
        style={{
          background:
            "radial-gradient(60% 50% at 70% 30%, hsl(220 90% 55% / 0.12), transparent 70%), radial-gradient(50% 50% at 30% 80%, hsl(265 80% 60% / 0.10), transparent 70%)",
        }}
      />

      <div className="glass-surface rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-border/50">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
          </div>
          <div className="flex items-center gap-2 font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
            <GitMerge className="h-3 w-3" />
            git log --author=pyd-07
          </div>
          <span className="flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80 animate-pulse" />
            active
          </span>
        </div>

        {/* Commit list */}
        <div className="p-4 space-y-0.5 min-h-[264px]">
          {COMMITS.slice(0, visibleCount).map((commit, i) => {
            const type = (commit.type as CommitType) in typeConfig ? (commit.type as CommitType) : "chore";
            const { color, Icon } = typeConfig[type];
            return (
              <div
                key={commit.hash}
                className="group flex items-start gap-3 px-3 py-2.5 rounded-lg hover:bg-accent/40 transition-colors animate-fade-in"
              >
                {/* Graph line */}
                <div className="flex flex-col items-center mt-0.5 shrink-0">
                  <Icon className={`h-3.5 w-3.5 ${color}`} />
                  {i < COMMITS.length - 1 && (
                    <div className="w-px flex-1 mt-1 bg-border/60 min-h-[16px]" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  {/* Repo + hash */}
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-mono text-[10px] text-muted-foreground truncate">
                      {commit.repo}
                    </span>
                    <span className="font-mono text-[10px] text-muted-foreground/60 shrink-0">
                      #{commit.hash}
                    </span>
                  </div>
                  {/* Message */}
                  <p className="font-mono text-[11.5px] text-foreground/85 leading-snug truncate">
                    <span className={`${color} font-medium`}>{commit.type}: </span>
                    {commit.message.replace(/^(fix|feat|chore): /, "")}
                  </p>
                </div>

                <span className="font-mono text-[10px] text-muted-foreground/60 shrink-0 mt-0.5">
                  {commit.time}
                </span>
              </div>
            );
          })}

          {/* Blinking cursor */}
          {!done && (
            <div className="flex items-center gap-3 px-3 py-2.5">
              <GitCommit className="h-3.5 w-3.5 text-muted-foreground/40" />
              <span className="cursor-blink font-mono text-[12px] text-foreground/50">▋</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-border/50 font-mono text-[10px] text-muted-foreground">
          <span>↳ {COMMITS.length} contributions · kyverno + personal</span>
          <span className="flex items-center gap-1.5">
            <GitMerge className="h-3 w-3 text-emerald-400/70" />
            {COMMITS.filter((c) => c.type === "feat").length} merged PRs
          </span>
        </div>
      </div>
    </div>
  );
};

export default ContributionPanel;
