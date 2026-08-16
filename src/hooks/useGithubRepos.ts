import { useEffect, useState } from "react";

export interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
}

/**
 * Fetches selected repos from GitHub.
 * @param username  - Fallback owner (your GitHub username)
 * @param selected  - Array of repo names to fetch
 * @param owners    - Optional map of { repoName: actualOwner } for repos hosted under orgs
 */
export const useGithubRepos = (
  username: string,
  selected: string[],
  owners: Record<string, string> = {}
) => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const fetchRepos = async () => {
      try {
        setLoading(true);
        setError(null);
        const results = await Promise.all(
          selected.map(async (repo) => {
            const owner = owners[repo] ?? username;
            const res = await fetch(
              `https://api.github.com/repos/${owner}/${repo.toLowerCase()}`
            );
            if (!res.ok) throw new Error(`Failed to fetch ${repo}`);
            return (await res.json()) as Repo;
          })
        );
        if (!cancelled) setRepos(results);
      } catch (e) {
        if (!cancelled)
          setError(e instanceof Error ? e.message : "Unknown error");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchRepos();
    return () => {
      cancelled = true;
    };
  }, [username, JSON.stringify(selected), JSON.stringify(owners)]);

  return { repos, loading, error };
};
