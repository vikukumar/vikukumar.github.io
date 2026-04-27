"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PROFILE } from "@/data/profile";
import { buildDashboard, fetchGitHubEvents, fetchGitHubRepos, fetchGitHubUser, fetchRepoLanguages, type GitHubDashboard } from "@/lib/github";
import { Reveal, RevealItem } from "@/components/reveal";
import { FaGithub, FaStar, FaCodeFork, FaFire, FaCodeCommit, FaCircleExclamation, FaCodePullRequest, FaBookOpen } from "react-icons/fa6";
import { motion } from "framer-motion";

type LoadState =
  | { status: "idle" | "loading" }
  | { status: "ready"; data: GitHubDashboard }
  | { status: "error"; message: string };

function StatCard({ label, value, icon: Icon, colorClass = "text-brand" }: { label: string; value: string | number; icon: any; colorClass?: string }) {
  return (
    <RevealItem>
      <Card className="group relative overflow-hidden p-6 bg-card/40 border-border/50 hover:border-brand/30 transition-all duration-300">
        <div className="flex items-center gap-4">
          <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 ${colorClass}`}>
            <Icon size={20} />
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-muted">{label}</div>
            <div className="text-2xl font-bold text-fg">{value}</div>
          </div>
        </div>
      </Card>
    </RevealItem>
  );
}

export function GitHubStats() {
  const username = PROFILE.githubUsername;
  const [state, setState] = useState<LoadState>({ status: "idle" });
  const [activeTab, setActiveTab] = useState<"year" | "month">("year");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setState({ status: "loading" });
      try {
        const res = await fetch("/github-data.json");
        if (!res.ok) throw new Error("Local data not found");
        const json = await res.json();
        
        const data = buildDashboard(
          json.user, 
          json.repos || [], 
          json.events || [], 
          json.detailedLangs || [],
          json.exactStats,
          json.languages
        );
        
        if (!cancelled) setState({ status: "ready", data });
      } catch (err) {
        console.error("Local GitHub Data Load Error:", err);
        // Fallback to client-side fetch if local data fails (unauthenticated)
        try {
          const [user, repos, events] = await Promise.all([
            fetchGitHubUser(username),
            fetchGitHubRepos(username),
            fetchGitHubEvents(username)
          ]);
          const data = buildDashboard(user, repos, events, [], undefined, undefined);
          if (!cancelled) setState({ status: "ready", data });
        } catch (innerErr) {
          if (!cancelled) setState({ status: "error", message: "Unable to sync GitHub stats" });
        }
      }
    }
    load();
    return () => { cancelled = true; };
  }, [username]);

  const data = useMemo(() => (state.status === "ready" ? state.data : null), [state]);

  if (state.status === "loading") {
    return (
      <div className="grid gap-8 animate-pulse">
        <div className="h-64 rounded-[2.5rem] bg-card/20" />
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="h-32 rounded-3xl bg-card/20" />
          <div className="h-32 rounded-3xl bg-card/20" />
          <div className="h-32 rounded-3xl bg-card/20" />
        </div>
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <Card className="p-10 text-center bg-card/20 border-red-500/20">
        <div className="text-red-400 font-bold mb-4">GitHub API Sync Limited</div>
        <p className="text-sm text-muted mb-6 max-w-md mx-auto">
          The GitHub API rate limit has been reached. To fix this and see all analytics (including private work), please configure a token.
        </p>
        <div className="flex flex-col gap-3 items-center">
          <Badge variant="outline" className="text-[10px] py-1 px-3">
            Add NEXT_PUBLIC_GITHUB_TOKEN to your .env.local
          </Badge>
          <a 
            href="https://github.com/settings/tokens" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs text-brand hover:underline"
          >
            Generate a token on GitHub &rarr;
          </a>
        </div>
      </Card>
    );
  }

  if (!data) return null;

  return (
    <div className="grid gap-12">
      {/* 1. Language Usage */}
      <Reveal variant="slide-up">
        <Card className="p-5 sm:p-10 bg-card/30 border-brand/10 backdrop-blur-xl rounded-[1.5rem] sm:rounded-[2.5rem]">
          <div className="flex justify-between items-center mb-8">
            <h4 className="text-xl font-bold">Language Usage</h4>
            <div className="flex gap-2">
              {process.env.NEXT_PUBLIC_GITHUB_TOKEN && (
                <Badge variant="secondary" className="text-[10px] bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                  Private Access
                </Badge>
              )}
              <Badge variant="outline" className="text-[10px] tracking-widest uppercase opacity-70">By Project Volume</Badge>
            </div>
          </div>
          
          <div className="h-4 w-full flex rounded-full overflow-hidden mb-10 bg-white/5">
            {data.languages.map((l) => (
              <motion.div
                key={l.name}
                initial={{ width: 0 }}
                animate={{ width: `${l.percentage}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                style={{ backgroundColor: l.color }}
                className="h-full first:rounded-l-full last:rounded-r-full"
                title={`${l.name}: ${l.percentage.toFixed(1)}%`}
              />
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-4">
            {data.languages.slice(0, 20).map((l) => (
              <div key={l.name} className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: l.color }} />
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-bold text-fg/90 truncate">{l.name}</span>
                  <span className="text-[10px] text-muted font-bold tabular-nums">
                    {l.percentage.toFixed(2)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </Reveal>

      {/* 2. Main Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard label="Total Stars Earned" value={data.exactStats?.totalStars ?? data.totals.stars} icon={FaStar} colorClass="text-yellow-400" />
        <StatCard label="Total Commits (last year)" value={data.exactStats?.totalCommitsLastYear ?? "-"} icon={FaCodeCommit} colorClass="text-emerald-400" />
        <StatCard label="Total PRs" value={data.exactStats?.totalPRs ?? data.events.filter(e => e.type === "PullRequestEvent").length} icon={FaCodePullRequest} colorClass="text-brand" />
        <StatCard label="Total Issues" value={data.exactStats?.totalIssues ?? "-"} icon={FaCircleExclamation} colorClass="text-rose-400" />
        <StatCard label="Contributed to (last year)" value={data.exactStats?.contributedToLastYear ?? "-"} icon={FaBookOpen} colorClass="text-violet-400" />
        <StatCard label="Followers" value={data.totals.totalFollowers} icon={FaGithub} colorClass="text-fg" />
      </div>

      {/* 3. Streaks */}
      <Reveal variant="scale" delay={0.2}>
        <Card className="bg-card/40 border-brand/5 rounded-[1.5rem] sm:rounded-[2.5rem] overflow-hidden p-6 sm:p-10">
          <div className="grid md:grid-cols-3 gap-12 items-center text-center">
            <div className="space-y-2">
              <div className="text-5xl font-black tracking-tighter text-fg">{data.streak.total.toLocaleString()}</div>
              <div className="text-sm font-bold text-brand uppercase tracking-widest">Total Contributions</div>
              <div className="text-xs text-muted">{data.streak.range.start} - Present</div>
            </div>

            <div className="relative flex flex-col items-center">
              <div className="absolute -top-6 text-orange-500 animate-pulse">
                <FaFire size={24} />
              </div>
              <div className="h-32 w-32 rounded-full border-4 border-brand/20 flex items-center justify-center relative">
                <svg className="absolute inset-0 h-full w-full -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="60"
                    fill="transparent"
                    stroke="currentColor"
                    strokeWidth="4"
                    className="text-brand"
                    strokeDasharray={377}
                    strokeDashoffset={377 - (377 * data.streak.current) / 30}
                  />
                </svg>
                <div className="text-4xl font-black text-fg">{data.streak.current}</div>
              </div>
              <div className="mt-4 text-sm font-bold text-violet-400 uppercase tracking-widest">Current Streak</div>
              <div className="text-xs text-muted">Recent consistency</div>
            </div>

            <div className="space-y-2">
              <div className="text-5xl font-black tracking-tighter text-fg">{data.streak.longest}</div>
              <div className="text-sm font-bold text-emerald-400 uppercase tracking-widest">Longest Streak</div>
              <div className="text-xs text-muted">Best activity period</div>
            </div>
          </div>
        </Card>
      </Reveal>

      {/* 4. Analytics Activity Chart */}
      <Reveal variant="slide-up" delay={0.3}>
        <Card className="p-5 sm:p-10 bg-card/30 border-brand/5 rounded-[1.5rem] sm:rounded-[2.5rem]">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12">
            <div>
              <h4 className="text-xl font-bold">Contribution Analytics</h4>
              <p className="text-sm text-muted mt-1">Detailed activity breakdown across the platform.</p>
            </div>
            <div className="flex bg-white/5 p-1 rounded-xl border border-white/5">
              <button 
                onClick={() => setActiveTab("year")}
                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${activeTab === "year" ? "bg-brand text-bg shadow-glow" : "text-muted hover:text-fg"}`}
              >
                Yearly
              </button>
              <button 
                onClick={() => setActiveTab("month")}
                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${activeTab === "month" ? "bg-brand text-bg shadow-glow" : "text-muted hover:text-fg"}`}
              >
                Monthly
              </button>
            </div>
          </div>

          <div className="h-64 w-full flex items-end gap-1 sm:gap-2 px-1">
            {data.activityChart.map((item, idx) => (
              <div key={item.label} className="flex-1 flex flex-col items-center gap-4 group">
                <div className="relative w-full flex justify-center items-end h-full">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(item.value / 70) * 100}%` }}
                    transition={{ duration: 1, delay: idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full max-w-[32px] rounded-t-lg bg-gradient-to-t from-brand/20 via-brand/40 to-brand group-hover:to-violet-400 transition-colors"
                  />
                  <div className="absolute -top-8 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-bold text-brand">
                    {item.value}
                  </div>
                </div>
                <span className="text-[10px] font-bold text-muted uppercase tracking-tighter">{item.label}</span>
              </div>
            ))}
          </div>
        </Card>
      </Reveal>

      {/* 5. Recent Activity Only */}
      <RevealItem>
        <div className="rounded-[1.5rem] sm:rounded-[2.5rem] border border-white/5 bg-white/5 p-6 sm:p-10">
          <h4 className="text-lg font-bold mb-8">Recent Repository Activity</h4>
          <div className="grid sm:grid-cols-2 gap-4">
            {data.events.slice(0, 6).map(e => (
              <div key={e.id} className="flex items-center justify-between p-5 rounded-3xl bg-white/5 border border-white/5 hover:border-brand/20 transition-all">
                <div className="truncate font-bold text-fg/90">{e.repo.split("/")[1]}</div>
                <Badge variant="secondary" className="text-[9px] px-2 uppercase tracking-tighter">{e.label}</Badge>
              </div>
            ))}
          </div>
        </div>
      </RevealItem>
    </div>
  );
}
