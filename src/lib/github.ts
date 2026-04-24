export type GitHubUser = {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  company: string | null;
  location: string | null;
  blog: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
};

export type GitHubRepo = {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  fork: boolean;
  archived: boolean;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  open_issues_count: number;
  language: string | null;
  pushed_at: string | null;
  updated_at: string;
  homepage: string | null;
  topics?: string[];
};

export type GitHubEvent = {
  id: string;
  type: string;
  created_at: string;
  repo: { name: string; url: string };
  payload?: Record<string, unknown>;
};

export type GitHubDashboard = {
  user: GitHubUser;
  totals: {
    stars: number;
    forks: number;
    watchers: number;
    reposScanned: number;
  };
  topRepos: Array<{
    name: string;
    url: string;
    stars: number;
    forks: number;
    language: string | null;
    pushedAt: string | null;
  }>;
  highlights: {
    mostStarred?: { name: string; stars: number; url: string };
    recentlyUpdated?: { name: string; pushedAt?: string | null; url: string };
  };
  languages: Array<{ name: string; repos: number; stars: number }>;
  events: Array<{ id: string; label: string; when: string; repo: string; url: string }>;
};

function safeIso(date: string | null | undefined) {
  if (!date) return null;
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString();
}

export async function fetchGitHubUser(username: string): Promise<GitHubUser> {
  const res = await fetch(`https://api.github.com/users/${username}`, {
    headers: { Accept: "application/vnd.github+json" }
  });
  if (!res.ok) throw new Error(`GitHub user fetch failed: ${res.status}`);
  return (await res.json()) as GitHubUser;
}

export async function fetchGitHubRepos(username: string): Promise<GitHubRepo[]> {
  const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {
    headers: { Accept: "application/vnd.github+json" }
  });
  if (!res.ok) throw new Error(`GitHub repos fetch failed: ${res.status}`);
  return (await res.json()) as GitHubRepo[];
}

export async function fetchGitHubEvents(username: string): Promise<GitHubEvent[]> {
  const res = await fetch(`https://api.github.com/users/${username}/events/public?per_page=30`, {
    headers: { Accept: "application/vnd.github+json" }
  });
  if (!res.ok) throw new Error(`GitHub events fetch failed: ${res.status}`);
  return (await res.json()) as GitHubEvent[];
}

function humanTime(iso: string) {
  const dt = new Date(iso).getTime();
  const now = Date.now();
  const diff = Math.max(0, now - dt);
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 48) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 14) return `${days}d ago`;
  return new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" });
}

function eventLabel(e: GitHubEvent): string | null {
  switch (e.type) {
    case "PushEvent":
      return "Pushed commits";
    case "PullRequestEvent":
      return "Pull request activity";
    case "IssuesEvent":
      return "Issue activity";
    case "IssueCommentEvent":
      return "Commented on issue";
    case "PullRequestReviewEvent":
      return "Reviewed a PR";
    case "CreateEvent":
      return "Created something";
    case "ReleaseEvent":
      return "Published a release";
    case "ForkEvent":
      return "Forked a repo";
    case "WatchEvent":
      return "Starred a repo";
    default:
      return null;
  }
}

export function buildDashboard(user: GitHubUser, repos: GitHubRepo[], events: GitHubEvent[]): GitHubDashboard {
  const publicRepos = repos.filter((r) => !r.fork && !r.archived);

  let stars = 0;
  let forks = 0;
  let watchers = 0;
  for (const r of publicRepos) {
    stars += r.stargazers_count ?? 0;
    forks += r.forks_count ?? 0;
    watchers += r.watchers_count ?? 0;
  }

  const mostStarred = [...publicRepos].sort((a, b) => b.stargazers_count - a.stargazers_count)[0];
  const recentlyUpdated = [...publicRepos].sort((a, b) => {
    const ap = new Date(a.pushed_at ?? a.updated_at).getTime();
    const bp = new Date(b.pushed_at ?? b.updated_at).getTime();
    return bp - ap;
  })[0];

  const langMap = new Map<string, { repos: number; stars: number }>();
  for (const r of publicRepos) {
    const lang = r.language?.trim();
    if (!lang) continue;
    const prev = langMap.get(lang) ?? { repos: 0, stars: 0 };
    langMap.set(lang, { repos: prev.repos + 1, stars: prev.stars + (r.stargazers_count ?? 0) });
  }
  const languages = [...langMap.entries()]
    .map(([name, v]) => ({ name, repos: v.repos, stars: v.stars }))
    .sort((a, b) => b.stars - a.stars || b.repos - a.repos)
    .slice(0, 8);

  const topRepos = [...publicRepos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count || b.forks_count - a.forks_count)
    .slice(0, 6)
    .map((r) => ({
      name: r.name,
      url: r.html_url,
      stars: r.stargazers_count ?? 0,
      forks: r.forks_count ?? 0,
      language: r.language ?? null,
      pushedAt: safeIso(r.pushed_at)
    }));

  const formattedEvents = events
    .map((e) => {
      const label = eventLabel(e);
      if (!label) return null;
      const whenIso = safeIso(e.created_at);
      if (!whenIso) return null;
      return {
        id: e.id,
        label,
        when: humanTime(whenIso),
        repo: e.repo?.name ?? "",
        url: `https://github.com/${e.repo?.name ?? ""}`
      };
    })
    .filter((x): x is NonNullable<typeof x> => Boolean(x))
    .slice(0, 8);

  return {
    user,
    totals: { stars, forks, watchers, reposScanned: publicRepos.length },
    topRepos,
    highlights: {
      mostStarred: mostStarred
        ? { name: mostStarred.name, stars: mostStarred.stargazers_count, url: mostStarred.html_url }
        : undefined,
      recentlyUpdated: recentlyUpdated
        ? { name: recentlyUpdated.name, pushedAt: recentlyUpdated.pushed_at, url: recentlyUpdated.html_url }
        : undefined
    },
    languages,
    events: formattedEvents
  };
}
