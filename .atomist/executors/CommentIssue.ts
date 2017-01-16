import { Executor } from "@atomist/rug/operations/Executor"
import { Services } from "@atomist/rug/model/Core"
import { Result, Status, Parameter } from "@atomist/rug/operations/RugOperation"

import { GitHubService } from "@atomist/github/core/Core"

interface Parameters {
    number: number
    comment: string
    owner: string
    repo: string
    token: string
}

var commentIssue: Executor = {
    description: "Close a GitHub issue",
    name: "CommentIssue",
    tags: ["atomist/intent=add comment", "atomist/intent=create comment"],
    parameters: [
        // TODO proper patterns and validation
        { name: "number", description: "Issue Number", pattern: "^.*$", maxLength: 100, required: true },
        { name: "comment", description: "Issue Comment", pattern: "^.*$", maxLength: 100, required: true },
        { name: "owner", description: "GitHub Owner", pattern: "^.*$", maxLength: 100, required: false, displayable: false, default: "atomist" },
        { name: "repo", description: "GitHub Repo", pattern: "^.*$", maxLength: 100, required: true, displayable: false, tags: ["atomist/repository"] },
        // TODO marking it required: false will prevent the bot to ask for it
        { name: "token", description: "GitHub Token", pattern: "^.*$", maxLength: 100, required: false, displayable: false, tags: ["atomist/user_token"] }
    ],
    execute(services: Services, p: Parameters): Result {

        let _services: any = services
        let githubService = _services.github() as GitHubService
        let status = githubService.commentIssue(p.number, p.comment, p.owner, p.repo, p.token)
        _services.messageBuilder().say(status.message()).send()
        if (status.success()) {
            return new Result(Status.Success, "OK")
        }
        else {
            return new Result(Status.Error, status.message())
        }
    }
}
