import fs from 'fs';
import path from 'path';

const username = "vikukumar";
const token = process.env.GITHUB_TOKEN;

async function fetchGraphQL(query, variables = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` })
  };
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers,
    body: JSON.stringify({ query, variables })
  });
  if (!res.ok) {
    throw new Error(`GraphQL fetch failed: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

async function fetchAll() {
  const headers = {
    Accept: "application/vnd.github+json",
    ...(token && { Authorization: `Bearer ${token}` })
  };

  console.log(`Fetching data for ${username}...`);
  
  try {
    // 1. Fetch Basic Info, Repos, and Current Year Contributions
    const basicQuery = `
      query($login: String!) {
        user(login: $login) {
          createdAt
          followers { totalCount }
          repositories(first: 100, ownerAffiliations: OWNER, isFork: false, orderBy: {field: STARGAZERS, direction: DESC}) {
            totalCount
            nodes {
              name
              stargazerCount
              forkCount
              primaryLanguage { name color }
              pushedAt
              languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
                edges { size node { name color } }
              }
            }
          }
          contributionsCollection {
            totalCommitContributions
            totalRepositoriesWithContributedCommits
          }
        }
        prs: search(query: "author:${username} is:pr", type: ISSUE, first: 0) { issueCount }
        issues: search(query: "author:${username} is:issue", type: ISSUE, first: 0) { issueCount }
      }
    `;
    const basicData = await fetchGraphQL(basicQuery, { login: username });
    if (basicData.errors) {
      console.error("GraphQL Errors:", basicData.errors);
    }
    const user = basicData.data.user;
    const prsCount = basicData.data.prs?.issueCount || 0;
    const issuesCount = basicData.data.issues?.issueCount || 0;

    // 2. Fetch Contribution Calendars for all years to calculate precise streak
    const createdAt = new Date(user.createdAt);
    const startYear = createdAt.getFullYear();
    const currentYear = new Date().getFullYear();
    
    let allDays = [];
    
    for (let year = startYear; year <= currentYear; year++) {
      const from = new Date(Date.UTC(year, 0, 1, 0, 0, 0)).toISOString();
      const to = new Date(Date.UTC(year, 11, 31, 23, 59, 59)).toISOString();
      
      const calQuery = `
        query($login: String!, $from: DateTime!, $to: DateTime!) {
          user(login: $login) {
            contributionsCollection(from: $from, to: $to) {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    contributionCount
                    date
                  }
                }
              }
            }
          }
        }
      `;
      const calData = await fetchGraphQL(calQuery, { login: username, from, to });
      if (calData.data?.user?.contributionsCollection?.contributionCalendar) {
        const weeks = calData.data.user.contributionsCollection.contributionCalendar.weeks;
        for (const week of weeks) {
          for (const day of week.contributionDays) {
            allDays.push(day);
          }
        }
      }
    }

    // Sort days chronologically
    allDays.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    // Calculate Streak & Total Contributions
    let totalContributions = 0;
    let currentStreak = 0;
    let longestStreak = 0;
    let currentStreakTemp = 0;
    
    const todayStr = new Date().toISOString().split('T')[0];

    for (const day of allDays) {
      totalContributions += day.contributionCount;
      if (day.contributionCount > 0) {
        currentStreakTemp++;
        longestStreak = Math.max(longestStreak, currentStreakTemp);
      } else {
        // Break the streak unless it's today and today has no contributions (yet)
        if (day.date !== todayStr && new Date(day.date) < new Date(todayStr)) {
          currentStreakTemp = 0;
        }
      }
      
      if (day.date === todayStr) {
        // If we reached today, the current streak is the temp streak
        currentStreak = currentStreakTemp;
        // Optimization: stop iterating after today
        break;
      }
    }
    
    // Fallback if today's date wasn't hit perfectly
    if (currentStreak === 0 && currentStreakTemp > 0) {
      currentStreak = currentStreakTemp;
    }

    // Process Repos for Top Stars & Languages
    const activeRepos = user.repositories.nodes;
    let totalStars = 0;
    activeRepos.forEach(r => totalStars += r.stargazerCount);
    
    const langMap = new Map();
    activeRepos.forEach(r => {
      r.languages.edges.forEach(e => {
        const name = e.node.name;
        const prev = langMap.get(name) || { size: 0, count: 0, color: e.node.color };
        langMap.set(name, { size: prev.size + e.size, count: prev.count + 1, color: e.node.color });
      });
    });

    const languages = Array.from(langMap.entries())
      .map(([name, val]) => ({ name, ...val }))
      .sort((a, b) => b.size - a.size);
      
    // Create the exact data payload
    const data = {
      exactStats: {
        totalStars,
        totalCommitsLastYear: user.contributionsCollection.totalCommitContributions,
        totalPRs: prsCount,
        totalIssues: issuesCount,
        contributedToLastYear: user.contributionsCollection.totalRepositoriesWithContributedCommits,
        totalContributionsAllTime: totalContributions,
        currentStreak,
        longestStreak,
        followers: user.followers.totalCount,
        createdAt: user.createdAt
      },
      languages,
      repos: activeRepos, // We might still need some repo details
      updatedAt: new Date().toISOString()
    };

    // We also fetch events as the original script did for "Recent Repository Activity"
    const eventsRes = await fetch(`https://api.github.com/users/${username}/events/public?per_page=30`, { headers });
    if (eventsRes.ok) {
      data.events = await eventsRes.json();
    } else {
      data.events = [];
    }
    
    // Also fetch basic user details via REST as the old script did to keep compatibility with old fields if any
    const userRes = await fetch(`https://api.github.com/users/${username}`, { headers });
    if (userRes.ok) {
      data.user = await userRes.json();
    } else {
      data.user = {};
    }

    const outDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);
    
    fs.writeFileSync(
      path.join(outDir, 'github-data.json'),
      JSON.stringify(data, null, 2)
    );

    console.log("GitHub precise data saved to public/github-data.json");
  } catch (error) {
    console.error("Failed to fetch GitHub data:", error);
    process.exit(1);
  }
}

fetchAll();
