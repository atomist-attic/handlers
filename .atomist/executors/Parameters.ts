import { Parameter } from '@atomist/rug/operations/RugOperation'


// TODO once rug 0.10.0 is released, we can use the following parameters
export var UserToken: { name: "token", description: "GitHub Token", pattern: "^.*$", maxLength: 100, required: false, displayable: false, tags: ["atomist/user_token"] }
export var Owner: { name: "owner", description: "GitHub Owner", pattern: "^.*$", maxLength: 100, required: true, displayable: false, tags: ["atomist/owner"] }
export var Repo: { name: "repo", description: "GitHub Repo", pattern: "^.*$", maxLength: 100, required: true, displayable: false, tags: ["atomist/repository"] }
