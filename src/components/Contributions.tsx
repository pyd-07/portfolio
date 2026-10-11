import { useGithubPRs, useGithubComments } from "@/hooks/useGithubPRs";
import { PROFILE } from "@/utils/constants";
import {
  GitPullRequest,
  GitMerge,
  ExternalLink,
  Building2,
  MessageSquare,
} from "lucide-react";

interface Props {
  // Hide the section heading (used when a page header is already rendered)
  showHeader?: boolean;
}

const Contributions = ({ showHeader = true }: Props) => {
  const { prs, orgs, loading, error } = useGithubPRs(PROFILE.githubUser);
  const {
    comments,
    loading: commentsLoading,
    error: commentsError,
  } = useGithubComments(PROFILE.githubUser);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <section className="container py-16 md:py-24">
      <div className="grid min-w-0 lg:grid-cols-3 gap-10 lg:gap-12">
        <div className="min-w-0 space-y-8">
          {showHeader && (
            <div>
              <p className="kicker mb-3">
                // contributions
              </p>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
                Open source
              </h2>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-sm">
                Pull requests merged and open across public repositories and
                communities.
              </p>
            </div>
          )}

          <div className="space-y-4">
            <h3 className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
              <Building2 className="h-3.5 w-3.5 shrink-0" aria-hidden />
              Contributed organizations
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
              <div className="flex flex-wrap gap-2">
                {orgs.map((org) => (
                  <a
                    key={org.name}
                    href={org.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex max-w-full items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-card hover:border-foreground/20 hover:bg-accent/40 transition-colors text-xs font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <img
                      src={org.avatarUrl}
                      alt=""
                      className="w-4 h-4 rounded-sm object-cover bg-muted shrink-0"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />
                    <span className="truncate">{org.name}</span>
                    <span className="text-[10px] text-muted-foreground font-mono bg-accent px-1.5 py-0.5 rounded-md shrink-0">
                      {org.prCount}
                    </span>
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-4 pt-6 border-t border-border">
            <h3 className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
              <MessageSquare className="h-3.5 w-3.5 shrink-0" aria-hidden />
              Recent comments
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
                    className="group block min-w-0 card p-3.5 hover:border-foreground/20 transition-colors space-y-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <p className="text-xs text-muted-foreground italic leading-relaxed line-clamp-2 pl-3 border-l-2 border-border group-hover:border-primary/60 transition-colors break-words">
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
          <h3 className="text-xs font-mono text-muted-foreground">
            Pull requests timeline
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
            <div className="card p-6 text-center text-sm text-muted-foreground font-mono">
              // no public pull requests found
            </div>
          )}

          {!loading && !error && prs.length > 0 && (
            <div
              className="overflow-y-auto overscroll-contain pr-1"
              style={{
                maxHeight: "min(650px, 70vh)",
                contain: "paint",
              }}
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
                      className="group flex min-w-0 items-start justify-between gap-4 card p-4 hover:border-foreground/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <div className="flex min-w-0 items-start gap-3">
                        <div className="mt-0.5 shrink-0">
                          {isMerged ? (
                            <div
                              className="h-6 w-6 rounded-md bg-primary/10 text-primary grid place-items-center"
                              title="Merged"
                            >
                              <GitMerge className="h-3.5 w-3.5" />
                              <span className="sr-only">Merged</span>
                            </div>
                          ) : isOpen ? (
                            <div
                              className="h-6 w-6 rounded-md bg-tech/10 text-tech grid place-items-center"
                              title="Open"
                            >
                              <GitPullRequest className="h-3.5 w-3.5" />
                              <span className="sr-only">Open</span>
                            </div>
                          ) : (
                            <div
                              className="h-6 w-6 rounded-md bg-muted text-muted-foreground grid place-items-center"
                              title="Closed"
                            >
                              <GitPullRequest className="h-3.5 w-3.5" />
                              <span className="sr-only">Closed</span>
                            </div>
                          )}
                        </div>

                        <div className="min-w-0 space-y-1">
                          <h4 className="text-sm font-medium text-foreground leading-snug group-hover:text-primary transition-colors break-words">
                            {pr.title}
                          </h4>
                          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-mono text-muted-foreground">
                            <span className="max-w-full truncate text-foreground/70">
                              {pr.repoOwner}/{pr.repoName}#{pr.number}
                            </span>
                            <span className="shrink-0" aria-hidden>·</span>
                            <span className="shrink-0">
                              {formatDate(pr.createdAt)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-1 shrink-0 text-muted-foreground/60 group-hover:text-primary transition-colors">
                        <ExternalLink className="h-3.5 w-3.5" aria-hidden />
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
