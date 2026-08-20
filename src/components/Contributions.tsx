import { useGithubPRs, useGithubComments } from "@/hooks/useGithubPRs";
import { PROFILE } from "@/utils/constants";
import { useInView } from "@/hooks/useInView";
import {
  GitPullRequest,
  GitMerge,
  ExternalLink,
  Building2,
  MessageSquare,
} from "lucide-react";

const Contributions = () => {
  const { prs, orgs, loading, error } = useGithubPRs(PROFILE.githubUser);
  const {
    comments,
    loading: commentsLoading,
    error: commentsError,
  } = useGithubComments(PROFILE.githubUser);
  const { ref, inView } = useInView<HTMLElement>();

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <section
      id="contributions"
      ref={ref}
      className={`container py-24 md:py-32 border-t border-border reveal ${
        inView ? "in-view" : ""
      }`}
    >
      <div className="grid min-w-0 lg:grid-cols-3 gap-12">
        <div className="min-w-0 space-y-8">
          <div>
            <p className="text-sm font-mono text-muted-foreground mb-2">
              // contributions
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Open source
            </h2>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-sm">
              Pull requests merged and open across public repositories and
              communities.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <Building2 className="h-3.5 w-3.5 shrink-0" />
              Contributed Organizations
            </h3>

            {loading && (
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-9 w-28 rounded-full border border-border bg-card animate-pulse"
                  />
                ))}
              </div>
            )}

            {!loading && !error && orgs.length === 0 && (
              <p className="text-xs text-muted-foreground italic font-mono">
                // no external organization PRs found
              </p>
            )}

            {!loading && !error && orgs.length > 0 && (
              <div className="flex flex-wrap gap-2.5">
                {orgs.map((org) => (
                  <a
                    key={org.name}
                    href={org.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex max-w-full items-center gap-2 px-3.5 py-1.5 rounded-full border border-border bg-card hover:bg-accent/40 hover:border-foreground/20 transition-all text-xs font-medium text-foreground"
                  >
                    <img
                      src={org.avatarUrl}
                      alt={org.name}
                      className="w-4 h-4 rounded-sm object-cover bg-muted shrink-0"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />
                    <span className="truncate">{org.name}</span>
                    <span className="text-[10px] text-muted-foreground font-mono bg-accent px-1.5 py-0.5 rounded-full shrink-0">
                      {org.prCount}
                    </span>
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-4 pt-6 border-t border-border/60">
            <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <MessageSquare className="h-3.5 w-3.5 shrink-0" />
              Recent Comments
            </h3>

            {commentsLoading && (
              <div className="space-y-3">
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="h-16 rounded-xl border border-border bg-card animate-pulse"
                  />
                ))}
              </div>
            )}

            {!commentsLoading && !commentsError && comments.length === 0 && (
              <p className="text-xs text-muted-foreground italic font-mono">
                // no recent public comments found
              </p>
            )}

            {!commentsLoading && !commentsError && comments.length > 0 && (
              <div className="space-y-3">
                {comments.map((comment) => (
                  <a
                    key={comment.id}
                    href={comment.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block min-w-0 p-3.5 rounded-xl border border-border bg-card/60 hover:bg-accent/20 hover:border-foreground/20 transition-all duration-300 space-y-2"
                  >
                    <p className="text-xs text-muted-foreground italic leading-relaxed line-clamp-2 pl-3 border-l-2 border-border group-hover:border-muted-foreground/60 transition-colors break-words">
                      "{comment.body}"
                    </p>
                    <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-muted-foreground">
                      <span className="min-w-0 truncate text-foreground/80">
                        {comment.repoName}#{comment.issueNumber}
                      </span>
                      <span className="shrink-0">
                        {formatDate(comment.createdAt)}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="min-w-0 lg:col-span-2 space-y-6">
          <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
            Pull Requests Timeline
          </h3>

          {loading && (
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-20 rounded-xl border border-border bg-card animate-pulse"
                />
              ))}
            </div>
          )}

          {error && (
            <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-6 text-sm text-destructive font-mono break-words">
              // failed to load contributions: {error}
            </div>
          )}

          {!loading && !error && prs.length === 0 && (
            <div className="rounded-xl border border-border bg-card/40 p-6 text-center text-sm text-muted-foreground font-mono">
              // no public pull requests found
            </div>
          )}

          {!loading && !error && prs.length > 0 && (
            <div
              className="overflow-y-auto pr-1"
              style={{ maxHeight: "min(650px, 70vh)" }}
            >
              <div className="space-y-3 pb-1">
                {prs.map((pr) => {
                  const isMerged = pr.state === "merged";
                  const isOpen = pr.state === "open";
                  return (
                    <a
                      key={pr.id}
                      href={pr.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex min-w-0 items-start justify-between gap-4 p-4 rounded-xl border border-border bg-card hover:border-foreground/20 hover:bg-accent/10 transition-all duration-300"
                    >
                      <div className="flex min-w-0 items-start gap-3">
                        <div className="mt-1 shrink-0">
                          {isMerged ? (
                            <div
                              className="h-6 w-6 rounded-full bg-purple-500/10 dark:bg-purple-500/15 text-purple-600 dark:text-purple-400 grid place-items-center"
                              title="Merged"
                            >
                              <GitMerge className="h-3.5 w-3.5" />
                            </div>
                          ) : isOpen ? (
                            <div
                              className="h-6 w-6 rounded-full bg-green-500/10 dark:bg-green-500/15 text-green-600 dark:text-green-400 grid place-items-center"
                              title="Open"
                            >
                              <GitPullRequest className="h-3.5 w-3.5" />
                            </div>
                          ) : (
                            <div
                              className="h-6 w-6 rounded-full bg-muted text-muted-foreground grid place-items-center"
                              title="Closed"
                            >
                              <GitPullRequest className="h-3.5 w-3.5" />
                            </div>
                          )}
                        </div>

                        <div className="min-w-0 space-y-1">
                          <h4 className="text-sm font-medium text-foreground leading-snug group-hover:text-foreground transition-colors break-words">
                            {pr.title}
                          </h4>
                          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-mono text-muted-foreground">
                            <span className="max-w-full truncate text-foreground/80 font-medium">
                              {pr.repoOwner}/{pr.repoName}#{pr.number}
                            </span>
                            <span className="shrink-0">•</span>
                            <span className="shrink-0">
                              {formatDate(pr.createdAt)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-1 shrink-0 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                        <ExternalLink className="h-3.5 w-3.5" />
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contributions;
