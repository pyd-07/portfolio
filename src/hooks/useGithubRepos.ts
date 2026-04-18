import { useEffect, useState } from "react";

export interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
}

// Fetches selected repos from GitHub for a username
export const useGithubRepos = (username: string, selected: string[]) => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const fetchRepos = async () => {
      try {
        setLoading(true);
        setError(null);
        // Fetch each selected repo individually for accurate metadata
        const results = await Promise.all(
          selected.map(async (repo) => {
            const res = await fetch(`https://api.github.com/repos/${username}/${repo}`);
            if (!res.ok) throw new Error(`Failed to fetch ${repo}`);
            return (await res.json()) as Repo;
          })
        );
        if (!cancelled) setRepos(results);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Unknown error");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchRepos();
    return () => {
      cancelled = true;
    };
  }, [username, selected]);

  return { repos, loading, error };
};
