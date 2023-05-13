// use form actions to push data to the database
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Button } from "./ui/button"

export function GithubForm() {
  //   async function handleForm(formData: FormData) {
  //     "use server"
  //     console.log(formData)
  //   }
  return (
    <form>
      <Label className="mb-8" htmlFor="github-repo-url">
        Enter repo URL
      </Label>
      <Input
        id="github-repo-url"
        placeholder="https://github.com/user/repo"
        className="w-96 mt-2"
      ></Input>
      <Label className="mb-8" htmlFor="commit-frequency">
        Commit frequency
      </Label>
      <div className="flex items-end">
        <Input
          id="commit-frequency"
          type="number"
          className="w-16 mt-2"
        ></Input>
        <span className="mx-2">commits per</span>
        <Select defaultValue="day">
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">day</SelectItem>
            <SelectItem value="week">week</SelectItem>
            <SelectItem value="month">month</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button className="mt-4" variant={"outline"}>
        Create
      </Button>
    </form>
  )
}
