import fs from 'fs';
import path from 'path';

const username = "vikukumar";
const token = process.env.GITHUB_TOKEN;

async function fetchAll() {
  const headers = {
    Accept: "application/vnd.github+json",
    ...(token && { Authorization: `Bearer ${token}` })
  };

  console.log(`Fetching data for ${username}...`);
  
  try {
    const userRes = await fetch(`https://api.github.com/users/${username}`, { headers });
    const user = await userRes.json();

    const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, { headers });
    const repos = await reposRes.json();

    const eventsRes = await fetch(`https://api.github.com/users/${username}/events/public?per_page=30`, { headers });
    const events = await eventsRes.json();

    // Fetch languages for top repos (optional, but keep it light)
    const ownRepos = repos.filter(r => !r.fork && !r.archived).slice(0, 10);
    const detailedLangs = await Promise.all(
      ownRepos.map(async (r) => {
        const res = await fetch(r.languages_url, { headers });
        return res.ok ? res.json() : {};
      })
    );

    const data = {
      user,
      repos,
      events,
      detailedLangs,
      updatedAt: new Date().toISOString()
    };

    const outDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);
    
    fs.writeFileSync(
      path.join(outDir, 'github-data.json'),
      JSON.stringify(data, null, 2)
    );

    console.log("GitHub data saved to public/github-data.json");
  } catch (error) {
    console.error("Failed to fetch GitHub data:", error);
    process.exit(1);
  }
}

fetchAll();
