const REPO_NAME = "next13-portfolio"
const GOAL_START_DATE = new Date("2023-05-13T00:00:00.000Z")
const COMMITS = 3
const COMMIT_FREQUENCY = "day"

async function fetchGithubData() {
  try {
    const data = await fetch(
      `https://api.github.com/repos/puneet-sarhali/${REPO_NAME}/commits`,
      {
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
          Authorization: "bearer " + process.env.GITHUB_API_KEY,
        },
        next: {
          revalidate: 10000,
        },
      }
    )
    const json = await data.json()
    return json
  } catch (error) {
    throw new Error("Error fetching github data")
  }
}

function countCommitsByDate(commits: any, rangeHours: number): number {
  commits = commits.map((commit: any) => commit.commit.author.date) // Extract the commit dates from the commit objects
  const now = new Date() // Get the current date and time
  const rangeStart = new Date(now.getTime() - rangeHours * 60 * 60 * 1000) // Calculate the start of the range
  let count = 0 // Initialize the count

  // Count the number of commits in the range
  for (const commitDate of commits) {
    const commit = new Date(commitDate)
    if (commit >= rangeStart && commit <= now) {
      count++
    }
  }

  return count
}

export default async function githubMonitoring() {
  const commitData = await fetchGithubData()
  const commitCounts = countCommitsByDate(commitData, 168)
  console.log(commitCounts)

  return (
    <section>
      <h2>Repo: {REPO_NAME}</h2>
      <ul>
        <li>Commits last 24 hours {countCommitsByDate(commitData, 24)}</li>
        <li>Commits last 7 days {countCommitsByDate(commitData, 168)}</li>
        <li>Commits last 30 days {countCommitsByDate(commitData, 720)}</li>
      </ul>
    </section>
  )
}
