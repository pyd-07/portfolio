import { useEffect, useState } from "react";

export interface PullRequest {
  id: number;
  title: string;
  url: string;
  state: "open" | "merged" | "closed";
  createdAt: string;
  closedAt: string | null;
  mergedAt: string | null;
  repoOwner: string;
  repoName: string;
  number: number;
}

export interface ContributedOrg {
  name: string;
  avatarUrl: string;
  url: string;
  prCount: number;
}

interface GithubSearchItem {
  id: number;
  title: string;
  html_url: string;
  number: number;
  state: string;
  created_at: string;
  closed_at: string | null;
  pull_request?: {
    merged_at: string | null;
  } | null;
}


const CACHE_KEY = "github_prs_cache_v1";
const CACHE_TIME_KEY = "github_prs_cache_time";
const CACHE_DURATION_MS = 15 * 60 * 1000; // 15 minutes

export const useGithubPRs = (username: string) => {
  const [prs, setPrs] = useState<PullRequest[]>([]);
  const [orgs, setOrgs] = useState<ContributedOrg[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchPRs = async () => {
      try {
        setLoading(true);
        setError(null);

        // Check localStorage cache
        const cachedData = localStorage.getItem(CACHE_KEY);
        const cachedTime = localStorage.getItem(CACHE_TIME_KEY);
        const now = Date.now();

        if (cachedData && cachedTime && now - parseInt(cachedTime) < CACHE_DURATION_MS) {
          const parsed = JSON.parse(cachedData) as PullRequest[];
          if (!cancelled) {
            processPRData(parsed);
            setLoading(false);
            return;
          }
        }

        // Fetch from GitHub Search API
        const response = await fetch(
          `https://api.github.com/search/issues?q=author:${username}+type:pr&per_page=100`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch PRs: ${response.statusText}`);
        }

        const data = await response.json();
        const items = data.items || [];

        // Parse search items to custom PullRequest format
        const parsedPRs: PullRequest[] = items.map((item: GithubSearchItem) => {
          const match = item.html_url.match(/github\.com\/([^/]+)\/([^/]+)\/pull\/(\d+)/);
          const repoOwner = match ? match[1] : "";
          const repoName = match ? match[2] : "";
          const prNumber = match ? parseInt(match[3], 10) : item.number;

          let prState: "open" | "merged" | "closed" = "closed";
          if (item.state === "open") {
            prState = "open";
          } else if (item.pull_request && item.pull_request.merged_at !== null) {
            prState = "merged";
          }

          return {
            id: item.id,
            title: item.title,
            url: item.html_url,
            state: prState,
            createdAt: item.created_at,
            closedAt: item.closed_at || null,
            mergedAt: item.pull_request?.merged_at || null,
            repoOwner,
            repoName,
            number: prNumber,
          };
        });

        // Save to cache
        localStorage.setItem(CACHE_KEY, JSON.stringify(parsedPRs));
        localStorage.setItem(CACHE_TIME_KEY, now.toString());

        if (!cancelled) {
          processPRData(parsedPRs);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Unknown error");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    const processPRData = (prList: PullRequest[]) => {
      setPrs(prList);

      // Extract unique contributed organizations (merged PRs where repoOwner !== username)
      const orgMap: Record<string, number> = {};
      prList.forEach((pr) => {
        if (pr.state === "merged" && pr.repoOwner && pr.repoOwner.toLowerCase() !== username.toLowerCase()) {
          orgMap[pr.repoOwner] = (orgMap[pr.repoOwner] || 0) + 1;
        }
      });

      const contributedOrgs: ContributedOrg[] = Object.keys(orgMap).map((name) => ({
        name,
        avatarUrl: `https://avatars.githubusercontent.com/${name}?s=64`,
        url: `https://github.com/${name}`,
        prCount: orgMap[name],
      })).sort((a, b) => b.prCount - a.prCount); // Sort by highest contributions

      setOrgs(contributedOrgs);
    };

    fetchPRs();

    return () => {
      cancelled = true;
    };
  }, [username]);

  return { prs, orgs, loading, error };
};

export interface GithubComment {
  id: string;
  body: string;
  url: string;
  createdAt: string;
  repoName: string;
  issueTitle: string;
  issueNumber: number;
}

interface GithubEvent {
  id: string;
  type: string;
  repo: {
    name: string;
  };
  payload: {
    issue?: {
      title: string;
      number: number;
      html_url: string;
    };
    pull_request?: {
      title: string;
      number: number;
      html_url: string;
    };
    comment?: {
      id: number;
      body: string;
      html_url: string;
      created_at: string;
    };
  };
}

const COMMENTS_CACHE_KEY = "github_comments_cache_v1";
const COMMENTS_CACHE_TIME_KEY = "github_comments_cache_time";

export const useGithubComments = (username: string) => {
  const [comments, setComments] = useState<GithubComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchComments = async () => {
      try {
        setLoading(true);
        setError(null);

        // Check cache
        const cachedData = localStorage.getItem(COMMENTS_CACHE_KEY);
        const cachedTime = localStorage.getItem(COMMENTS_CACHE_TIME_KEY);
        const now = Date.now();

        if (cachedData && cachedTime && now - parseInt(cachedTime) < CACHE_DURATION_MS) {
          const parsed = JSON.parse(cachedData) as GithubComment[];
          if (!cancelled) {
            setComments(parsed);
            setLoading(false);
            return;
          }
        }

        // Fetch events from GitHub API
        const response = await fetch(`https://api.github.com/users/${username}/events/public`);
        if (!response.ok) {
          throw new Error(`Failed to fetch events: ${response.statusText}`);
        }

        const events = (await response.json()) as GithubEvent[];
        
        // Filter and parse IssueCommentEvent / PullRequestReviewCommentEvent
        const parsedComments: GithubComment[] = [];
        for (const event of events) {
          if (
            (event.type === "IssueCommentEvent" || event.type === "PullRequestReviewCommentEvent") &&
            event.payload.comment
          ) {
            const commentPayload = event.payload.comment;
            const issueTitle = event.payload.issue?.title || event.payload.pull_request?.title || "Issue";
            const issueNumber = event.payload.issue?.number || event.payload.pull_request?.number || 0;

            parsedComments.push({
              id: event.id + "-" + commentPayload.id,
              body: commentPayload.body,
              url: commentPayload.html_url,
              createdAt: commentPayload.created_at,
              repoName: event.repo.name,
              issueTitle,
              issueNumber,
            });

            // Keep only latest 3 comments
            if (parsedComments.length >= 3) {
              break;
            }
          }
        }

        // Save to cache
        localStorage.setItem(COMMENTS_CACHE_KEY, JSON.stringify(parsedComments));
        localStorage.setItem(COMMENTS_CACHE_TIME_KEY, now.toString());

        if (!cancelled) {
          setComments(parsedComments);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Unknown error");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchComments();

    return () => {
      cancelled = true;
    };
  }, [username]);

  return { comments, loading, error };
};

