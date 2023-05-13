import { useState } from "react"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { GithubForm } from "@/components/github-form"
import GithubMonitoring from "@/components/github-monitoring"

const REPO_NAME = "coder"
const GOAL_START_DATE = new Date("2023-05-13T00:00:00.000Z")
const COMMITS = 3
const COMMIT_FREQUENCY = "day"

export default function IndexPage() {
  return (
    <section className="container grid items-center justify-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-center gap-2">
        {/* <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          3 commits everyday
        </h1> */}
        {/* <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
          Accessible and customizable components that you can copy and paste
          into your apps. Free. Open Source. And Next.js 13 Ready.
        </p> */}
      </div>
      <div className="flex gap-4 flex-col">
        {/* <GithubForm></GithubForm> */}
        <GithubMonitoring
          goal="3 commits everyday"
          repoName={REPO_NAME}
          commit={COMMITS}
          commitFrequency={COMMIT_FREQUENCY}
        ></GithubMonitoring>
      </div>
    </section>
  )
}
