const token = process.env.GITHUB_TOKEN;
const username = 'vikukumar';
async function run() {
  const query = `
    query($login: String!) {
      user(login: $login) {
        createdAt
        contributionsCollection {
          totalCommitContributions
          totalPullRequestContributions
          totalIssueContributions
          totalRepositoriesWithContributedCommits
          contributionCalendar {
            totalContributions
          }
        }
      }
    }
  `;
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables: { login: username } })
  });
  console.log(JSON.stringify(await res.json(), null, 2));
}
run();
