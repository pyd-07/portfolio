import { Star, ExternalLink, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useGithubRepos } from "@/hooks/useGithubRepos";
import { PROFILE, SELECTED_REPOS, REPO_DETAILS, REPO_OWNERS } from "@/utils/constants";

interface Props {
  // Render as a curated preview (first repos + link to the projects page)
  preview?: boolean;
  // Hide the section heading (used when a page header is already rendered)
  showHeader?: boolean;
}

const PREVIEW_COUNT = 2;

const Projects = ({ preview = false, showHeader = true }: Props) => {
  const { repos, loading, error } = useGithubRepos(PROFILE.githubUser, SELECTED_REPOS, REPO_OWNERS);

  const shownRepos = preview ? repos.slice(0, PREVIEW_COUNT) : repos;
  const skeletonCount = preview ? PREVIEW_COUNT : SELECTED_REPOS.length;

  return (
    <section className="container py-16 md:py-24">
      {showHeader && (
        <div className="mb-10">
          <p className="kicker mb-3">// projects</p>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Selected work</h2>
        </div>
      )}

      {loading && (
        <div className="grid md:grid-cols-2 gap-5">
          {Array.from({ length: skeletonCount }).map((_, i) => (
            <div
              key={i}
              className="h-64 card animate-pulse"
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
          {shownRepos.map((repo) => {
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
                className="group card p-6 hover:border-foreground/20 transition-colors duration-200 flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-lg tracking-tight">{repo.name}</h3>
                  <ExternalLink className="h-4 w-4 mt-1 text-muted-foreground/60 group-hover:text-primary transition-colors" />
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                  {repo.description || "No description provided."}
                </p>

                {details?.bullets && (
                  <ul className="mt-5 space-y-2">
                    {details.bullets.map((b) => (
                      <li
                        key={b}
                        className="text-sm text-foreground/75 leading-snug pl-4 relative before:content-['→'] before:absolute before:left-0 before:text-primary/70 before:font-mono"
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
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md border border-border text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-auto pt-6 flex items-center gap-4 text-xs text-muted-foreground font-mono">
                  {repo.language && (
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-primary/70" />
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

      {preview && !loading && !error && (
        <div className="mt-10">
          <Link to="/projects" className="btn-secondary group">
            View all projects
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      )}
    </section>
  );
};

export default Projects;
