import { Star, ExternalLink } from "lucide-react";
import { useGithubRepos } from "@/hooks/useGithubRepos";
import { PROFILE, SELECTED_REPOS, REPO_DETAILS, REPO_OWNERS } from "@/utils/constants";
import { useInView } from "@/hooks/useInView";

const Projects = () => {
  const { repos, loading, error } = useGithubRepos(PROFILE.githubUser, SELECTED_REPOS, REPO_OWNERS);
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <section
      id="projects"
      ref={ref}
      className={`container py-24 md:py-32 border-t border-border reveal ${inView ? "in-view" : ""}`}
    >
      <div className="flex items-end justify-between mb-12">
        <div>
          <p className="text-sm font-mono text-muted-foreground mb-2">// projects</p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Selected work</h2>
        </div>
      </div>

      {loading && (
        <div className="grid md:grid-cols-2 gap-5">
          {SELECTED_REPOS.map((r) => (
            <div
              key={r}
              className="h-64 rounded-xl border border-border bg-card animate-pulse"
            />
          ))}
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-6 text-sm text-destructive">
          Failed to load repositories: {error}
        </div>
      )}

      {!loading && !error && (
        <div className="grid md:grid-cols-2 gap-5">
          {repos.map((repo) => {
            // GitHub API returns names in lowercase; do a case-insensitive lookup
            const detailKey = Object.keys(REPO_DETAILS).find(
              (k) => k.toLowerCase() === repo.name.toLowerCase()
            );
            const details = detailKey ? REPO_DETAILS[detailKey] : undefined;
            return (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative rounded-xl border border-border bg-card p-6 hover:border-foreground/20 hover:-translate-y-1 hover:shadow-[0_12px_40px_-12px_hsl(var(--foreground)/0.15)] transition-all duration-300 flex flex-col"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-lg tracking-tight">{repo.name}</h3>
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2">
                  {repo.description || "No description provided."}
                </p>

                {details?.bullets && (
                  <ul className="mt-4 space-y-1.5">
                    {details.bullets.map((b) => (
                      <li
                        key={b}
                        className="text-sm text-foreground/80 leading-snug pl-4 relative before:content-['→'] before:absolute before:left-0 before:text-muted-foreground before:font-mono"
                      >
                        {b}
                      </li>
                    ))}
                  </ul>
                )}

                {details?.tags && (
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {details.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-border text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-6 pt-4 border-t border-border/60 flex items-center gap-4 text-xs text-muted-foreground font-mono">
                  {repo.language && (
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-foreground/60" />
                      {repo.language}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5" />
                    {repo.stargazers_count}
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Projects;
