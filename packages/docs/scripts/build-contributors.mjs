import { graphql } from '@octokit/graphql'
import { Octokit } from '@octokit/rest'
import path from 'node:path'
import fse from 'fs-extra'

const outputDirectory = `${path.dirname('')}/__contributors__`
const VTEX_ORG = 'vtex'
const REPO_NAME = 'shoreline'
const token = process.env.GITHUB_TOKEN
const startDate = new Date('2024-01-01T00:00:00Z').toISOString()

const octokit = new Octokit({ auth: token })
const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `token ${token}`,
  },
})

const pageSize = 100 // Number of issues per page

async function fetchAllIssues() {
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
              title
              createdAt
              author {
                login
              }
              comments(first: 100) {
                nodes {
                  author {
                    login
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
        repoOwner: VTEX_ORG,
        repoName: REPO_NAME,
        first: pageSize,
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

function filterIssuesByUser(username, issues = []) {
  const issuesCreatedByUser = issues.filter(
    (issue) => issue.author.login === username && issue.createdAt >= startDate
  )

  const issuesAssignedByUser = issues.filter((issue) => {
    return (
      issue.createdAt >= startDate &&
      issue.assignees.nodes.some((assign) => assign.login === username)
    )
  })

  const issuesCommentedByUser = issues.filter((issue) => {
    return (
      issue.createdAt >= startDate &&
      issue.comments.nodes.some((comment) => comment.author.login === username)
    )
  })

  return {
    issues: issuesCreatedByUser.length,
    assigns: issuesAssignedByUser.length,
    comments: issuesCommentedByUser.length,
  }
}

const issues = await fetchAllIssues()

console.log(filterIssuesByUser('lucasaarcoverde', issues))

async function fetchRepositoryContributors() {
  try {
    const { data: contributors } = await octokit.repos.listContributors({
      owner: VTEX_ORG,
      repo: REPO_NAME,
      per_page: 100,
    })

    const formattedContributors = contributors.map((contributor) => ({
      image: contributor.avatar_url ?? '',
      username: contributor.login ?? '',
    }))

    const filteredContributors = formattedContributors.filter(
      (contributor) =>
        contributor.username && isHumanContributor(contributor.username)
    )

    return filteredContributors
  } catch (error) {
    console.error('Error fetching contributors:', error)
    return []
  }
}

const contributors = await fetchRepositoryContributors()

async function fetchAllPullRequests() {
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
        owner: VTEX_ORG,
        name: REPO_NAME,
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

const pulls = await fetchAllPullRequests()

function filterPullsByUser(username, pulls = []) {
  const pullsCreatedByUser = pulls.filter(
    (pull) => pull.author.login === username && pull.createdAt >= startDate
  )

  const pullsReviewedByUser = pulls.filter((pull) => {
    return (
      pull.author.login !== username &&
      pull.createdAt >= startDate &&
      pull.participants.nodes.some((participant) => {
        if (participant.login === username) console.log({ participant, pull })
        return participant.login === username
      })
    )
  })

  const pullsMergedByUser = pulls.filter(
    (pull) =>
      pull.author.login === username &&
      pull.createdAt >= startDate &&
      pull.state === 'MERGED'
  )

  return {
    pulls: pullsCreatedByUser.length,
    reviews: pullsReviewedByUser.length,
    merged: pullsMergedByUser.length,
  }
}

function isHumanContributor(username) {
  return (
    username !== 'dependabot[bot]' &&
    username !== 'renovate[bot]' &&
    username !== 'vtexgithubbot'
  )
}

function getContributorStats(username) {
  const issuesStats = filterIssuesByUser(username, issues)
  const pullsStats = filterPullsByUser(username, pulls)

  return { ...issuesStats, ...pullsStats }
}

async function main() {
  const stats = contributors.map((contributor) => {
    const stats = getContributorStats(contributor.username)
    return {
      ...contributor,
      stats,
    }
  })

  fse.outputFile(
    `${outputDirectory}/stats.js`,
    JSON.stringify(stats),
    (err) => {
      if (err) {
        console.log(err)
      } else {
        console.log('✅ Examples generated')
      }
    }
  )
}

main()

/**
 * @TODO
 * - Generate contributor page with stats
 * - Rank contributors by stats
 * - Remove inactive contributors
 * - Add possibility to customize range of dates
 * - Add this script to the build process
 */
