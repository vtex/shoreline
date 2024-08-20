import { graphql } from '@octokit/graphql'
import { config } from 'dotenv'

config()

const VTEX_ORG = 'vtex'
const REPO_NAME = 'shoreline'

const token = process.env.VTEX_GITHUB_BOT_TOKEN

const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `token ${token}`,
  },
})

export async function fetchAllIssues(repo = REPO_NAME, org = VTEX_ORG) {
  let hasNextPage = true
  let endCursor = null
  let allIssues = []

  while (hasNextPage) {
    const query = `
      query ($repoOwner: String!, $repoName: String!, $first: Int!, $after: String) {
        repository(owner: $repoOwner, name: $repoName) {
          issues(first: $first, after: $after, orderBy: {field: CREATED_AT, direction: DESC}) {
            pageInfo {
              hasNextPage
              endCursor
            }
            nodes {
              assignees(first: 10) {
                nodes {
                  login
                }
              }
              url
              number
              title
              createdAt
              author {
                login
                avatarUrl
              }
              state
              comments(first: 100) {
                nodes {
                  author {
                    login
                    avatarUrl
                  }
                }
              }
            }
          }
        }
      }
    `

    try {
      const result = await graphqlWithAuth(query, {
        repoOwner: org,
        repoName: repo,
        first: 100,
        after: endCursor,
      })

      const issuesPage = result.repository.issues

      allIssues = [...allIssues, ...issuesPage.nodes]
      hasNextPage = issuesPage.pageInfo.hasNextPage
      endCursor = issuesPage.pageInfo.endCursor
    } catch (error) {
      console.error('Error fetching issues:', error)
      break
    }
  }

  return allIssues
}

export async function fetchAllPullRequests(repo = REPO_NAME, org = VTEX_ORG) {
  let hasNextPage = true
  let endCursor = null
  let allPullRequests = []

  while (hasNextPage) {
    const query = `
      query ($owner: String!, $name: String!, $cursor: String) {
        repository(owner: $owner, name: $name) {
          pullRequests(first: 100, after: $cursor) {
            nodes {
              title
              state
              author {
                login
                avatarUrl
              }
              createdAt
              closed
              participants(first: 100) {
                nodes {
                  login
                }
              }
              comments(first: 100) {
                nodes {
                  body
                  author {
                    login
                    avatarUrl
                  }
                }
              }
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }
      }
    `

    try {
      const result = await graphqlWithAuth(query, {
        owner: org,
        name: repo,
        cursor: endCursor,
      })

      const pullRequests = result.repository.pullRequests.nodes
      allPullRequests = [...allPullRequests, ...pullRequests]
      hasNextPage = result.repository.pullRequests.pageInfo.hasNextPage
      endCursor = result.repository.pullRequests.pageInfo.endCursor
    } catch (error) {
      console.error('Error fetching pull requests:', error)
      break
    }
  }

  return allPullRequests
}

export class ContributorsSet {
  constructor() {
    this.map = {}
  }

  add(contributor) {
    if (!contributor || !this.isHumanContributor(contributor)) return

    if (!this.map[contributor.username]) {
      this.map[contributor.username] = contributor
    }
  }

  isHumanContributor(contributor) {
    const bots = [
      'github-actions',
      'changeset-bot',
      'vtexgithubbot',
      'netlify',
      'vercel',
      'dependabot',
      'renovate',
    ]
    return !bots.includes(contributor.username)
  }

  toArray() {
    return Object.values(this.map)
  }
}

export function getContributors(issues, pulls) {
  const contributors = new ContributorsSet()

  issues.forEach((issue) => {
    contributors.add({
      username: issue.author.login,
      image: issue.author.avatarUrl,
    })
    issue.comments.nodes.forEach((comment) => {
      contributors.add({
        username: comment.author.login,
        image: comment.author.avatarUrl,
      })
    })
  })

  pulls.forEach((pull) => {
    contributors.add({
      username: pull.author.login,
      image: pull.author.avatarUrl,
    })
    pull.comments.nodes.forEach((comment) => {
      contributors.add({
        username: comment.author.login,
        image: comment.author.avatarUrl,
      })
    })
  })

  return contributors.toArray()
}
