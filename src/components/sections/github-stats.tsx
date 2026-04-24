"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button-link";
import { Badge } from "@/components/ui/badge";
import { PROFILE } from "@/data/profile";
import { buildDashboard, fetchGitHubEvents, fetchGitHubRepos, fetchGitHubUser, type GitHubDashboard } from "@/lib/github";
import { Reveal } from "@/components/reveal";
import { FaGithub, FaLink } from "react-icons/fa6";

type LoadState =
  | { status: "idle" | "loading" }
  | { status: "ready"; data: GitHubDashboard }
  | { status: "error"; message: string };

function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass muted-glow rounded-2xl p-4">
      <div className="text-xs text-muted">{label}</div>
      <div className="mt-1 text-lg font-semibold text-fg">{value}</div>
    </div>
  );
}

function formatNum(n: number) {
  return Intl.NumberFormat(undefined, { notation: "compact" }).format(n);
}

export function GitHubStats() {
  const username = PROFILE.githubUsername;
  const [state, setState] = useState<LoadState>({ status: "idle" });

  useEffect(() => {
    let cancelled = false;
    const cacheKey = `gh:${username}:dashboard:v1`;

    async function load() {
      setState({ status: "loading" });

      try {
        const cached = (() => {
          try {
            const raw = localStorage.getItem(cacheKey);
            if (!raw) return null;
            const parsed = JSON.parse(raw) as { t: number; data: GitHubDashboard };
            if (!parsed?.t || !parsed?.data) return null;
            const age = Date.now() - parsed.t;
            if (age > 1000 * 60 * 60 * 6) return null; // 6h
            return parsed.data;
          } catch {
            return null;
          }
        })();

        if (cached && !cancelled) {
          setState({ status: "ready", data: cached });
        }

        const [user, repos, events] = await Promise.all([
          fetchGitHubUser(username),
          fetchGitHubRepos(username),
          fetchGitHubEvents(username)
        ]);
        const data = buildDashboard(user, repos, events);

        try {
          localStorage.setItem(cacheKey, JSON.stringify({ t: Date.now(), data }));
        } catch {
          // ignore (storage unavailable)
        }

        if (!cancelled) setState({ status: "ready", data });
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to load GitHub stats";
        if (!cancelled) setState({ status: "error", message });
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [username]);

  const data = useMemo(() => (state.status === "ready" ? state.data : null), [state]);

  return (
    <div className="grid gap-6">
      <Reveal>
        <Card className="overflow-hidden p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div
                  aria-hidden="true"
                  className="absolute -inset-1 rounded-full bg-gradient-to-br from-blue-400/40 via-violet-400/30 to-emerald-400/30 blur"
                />
                <img
                  alt="GitHub avatar"
                  src={data?.user.avatar_url ?? `https://github.com/${username}.png?size=140`}
                  className="relative h-14 w-14 rounded-full border border-border/70"
                  loading="lazy"
                />
              </div>
              <div className="min-w-0">
                <div className="truncate text-base font-semibold">
                  {data?.user.name ?? PROFILE.name}{" "}
                  <span className="text-muted">@{username}</span>
                </div>
                <div className="mt-1 text-sm text-muted">{data?.user.bio ?? "Building in public on GitHub."}</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <ButtonLink href={`https://github.com/${username}`} variant="secondary">
                <FaGithub className="h-4 w-4" />
                Profile
              </ButtonLink>
              {data?.user.blog ? (
                <ButtonLink href={data.user.blog} variant="ghost">
                  <FaLink className="h-4 w-4" />
                  Website
                </ButtonLink>
              ) : null}
            </div>
          </div>

          {state.status === "error" ? (
            <div className="mt-6 rounded-2xl border border-border/70 bg-card/40 p-4 text-sm text-muted">
              {state.message}
            </div>
          ) : null}

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            <StatTile label="Public repos" value={formatNum(data?.user.public_repos ?? 0)} />
            <StatTile label="Followers" value={formatNum(data?.user.followers ?? 0)} />
            <StatTile label="Following" value={formatNum(data?.user.following ?? 0)} />
            <StatTile label="Stars (public)" value={formatNum(data?.totals.stars ?? 0)} />
            <StatTile label="Forks (public)" value={formatNum(data?.totals.forks ?? 0)} />
            <StatTile
              label="On GitHub since"
              value={
                data?.user.created_at
                  ? new Date(data.user.created_at).toLocaleDateString(undefined, { year: "numeric", month: "short" })
                  : "—"
              }
            />
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div className="glass rounded-2xl p-5">
              <div className="flex items-baseline justify-between gap-4">
                <div className="text-sm font-semibold text-fg">Top languages</div>
                <div className="text-xs text-muted">by stars + repos</div>
              </div>
              <div className="mt-4 grid gap-2">
                {(data?.languages ?? Array.from({ length: 5 })).map((l, idx) => {
                  if (!l || typeof l === "number") {
                    return (
                      <div key={idx} className="h-9 rounded-xl border border-border/70 bg-card/40" />
                    );
                  }
                  const max = Math.max(1, data?.languages?.[0]?.stars ?? 1);
                  const pct = Math.round((l.stars / max) * 100);
                  return (
                    <div key={l.name} className="flex items-center gap-3">
                      <div className="w-24 shrink-0 text-xs text-muted">{l.name}</div>
                      <div className="relative h-2 w-full overflow-hidden rounded-full border border-border/70 bg-card/40">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-blue-400 via-violet-400 to-emerald-400"
                          style={{ width: `${Math.max(8, pct)}%` }}
                        />
                      </div>
                      <div className="w-20 shrink-0 text-right text-xs text-muted">
                        {l.repos} repos
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {(data?.languages ?? []).slice(0, 4).map((l) => (
                  <Badge key={l.name} className="text-fg/90">
                    {l.name} • {formatNum(l.stars)}★
                  </Badge>
                ))}
              </div>
            </div>

            <div className="glass rounded-2xl p-5">
              <div className="flex items-baseline justify-between gap-4">
                <div className="text-sm font-semibold text-fg">Recent activity</div>
                <div className="text-xs text-muted">public events</div>
              </div>
              <div className="mt-4 grid gap-2">
                {(data?.events ?? Array.from({ length: 6 })).map((e, idx) => {
                  if (!e || typeof e === "number") {
                    return (
                      <div key={idx} className="h-12 rounded-xl border border-border/70 bg-card/40" />
                    );
                  }
                  return (
                    <a
                      key={e.id}
                      href={e.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-start justify-between gap-4 rounded-xl border border-border/70 bg-card/40 p-3 transition hover:bg-card"
                    >
                      <div className="min-w-0">
                        <div className="text-xs text-muted">{e.label}</div>
                        <div className="truncate text-sm text-fg group-hover:underline">{e.repo}</div>
                      </div>
                      <div className="shrink-0 text-xs text-muted">{e.when}</div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-6 glass rounded-2xl p-5">
            <div className="flex items-baseline justify-between gap-4">
              <div className="text-sm font-semibold text-fg">Top repositories</div>
              <div className="text-xs text-muted">by stars</div>
            </div>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {(data?.topRepos ?? Array.from({ length: 6 })).map((r, idx) => {
                if (!r || typeof r === "number") {
                  return (
                    <div key={idx} className="h-12 rounded-xl border border-border/70 bg-card/40" />
                  );
                }
                return (
                  <a
                    key={r.url}
                    href={r.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-start justify-between gap-4 rounded-xl border border-border/70 bg-card/40 p-3 transition hover:bg-card"
                  >
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold text-fg group-hover:underline">
                        {r.name}
                      </div>
                      <div className="mt-1 text-xs text-muted">
                        {r.language ? r.language : "—"}
                        {" • "}
                        {r.forks ? `${formatNum(r.forks)} forks` : "0 forks"}
                      </div>
                    </div>
                    <div className="shrink-0 text-xs text-muted">{formatNum(r.stars)}★</div>
                  </a>
                );
              })}
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="glass rounded-2xl p-5">
              <div className="text-xs text-muted">Most starred</div>
              <div className="mt-2 flex items-center justify-between gap-3">
                <div className="truncate text-sm font-semibold text-fg">
                  {data?.highlights.mostStarred?.name ?? "—"}
                </div>
                <div className="shrink-0 text-xs text-muted">
                  {data?.highlights.mostStarred ? `${formatNum(data.highlights.mostStarred.stars)}★` : ""}
                </div>
              </div>
              {data?.highlights.mostStarred ? (
                <div className="mt-3">
                  <ButtonLink href={data.highlights.mostStarred.url} variant="ghost">
                    View repo
                  </ButtonLink>
                </div>
              ) : null}
            </div>
            <div className="glass rounded-2xl p-5">
              <div className="text-xs text-muted">Recently updated</div>
              <div className="mt-2 flex items-center justify-between gap-3">
                <div className="truncate text-sm font-semibold text-fg">
                  {data?.highlights.recentlyUpdated?.name ?? "—"}
                </div>
                <div className="shrink-0 text-xs text-muted">
                  {data?.highlights.recentlyUpdated?.pushedAt
                    ? new Date(data.highlights.recentlyUpdated.pushedAt).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "2-digit"
                      })
                    : ""}
                </div>
              </div>
              {data?.highlights.recentlyUpdated ? (
                <div className="mt-3">
                  <ButtonLink href={data.highlights.recentlyUpdated.url} variant="ghost">
                    View repo
                  </ButtonLink>
                </div>
              ) : null}
            </div>
          </div>

          {state.status === "loading" ? (
            <div className="mt-6 text-xs text-muted">Loading live stats from GitHub API…</div>
          ) : null}
        </Card>
      </Reveal>
    </div>
  );
}
