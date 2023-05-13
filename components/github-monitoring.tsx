import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Badge } from "./ui/badge"

async function fetchGithubData(repoName: string) {
  try {
    const data = await fetch(
      `https://api.github.com/repos/puneet-sarhali/${repoName}/commits`,
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

export default async function githubMonitoring({
  repoName,
  commit,
  commitFrequency,
  goal,
}: {
  repoName: string
  commit: number
  commitFrequency: string
  goal: string
}) {
  const commitData = await fetchGithubData(repoName)
  const commitCounts = countCommitsByDate(commitData, 24)
  console.log(commitCounts)

  return (
    <Card className="flex flex-col sm:flex-row pt-6">
      <CardHeader className="p-0 px-6">
        <Badge className="w-fit mb-4" variant="destructive">
          pending
        </Badge>
        <CardTitle>{goal}</CardTitle>
        <CardDescription>Repository: {repoName}</CardDescription>
      </CardHeader>
      <CardContent className="flex gap-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Completion
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl flex flex-col">
              {Math.round((commitCounts / commit) * 100)}%
              <span className="text-muted-foreground text-sm">
                {commitCounts}/{commit}
              </span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Money on the line
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl flex flex-col">$50</p>
          </CardContent>
        </Card>
      </CardContent>
      <CardFooter>
        <p>Due in 7 hours</p>
      </CardFooter>
    </Card>
  )
}
