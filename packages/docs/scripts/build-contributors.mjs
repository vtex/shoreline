import { graphql } from '@octokit/graphql'
import path from 'node:path'
import fse from 'fs-extra'
import { format } from 'prettier'

const statsOutputDirectory = `${path.dirname('')}/__contributions__`
const contributorsOutputDirectory = `${path.dirname('')}/pages/guides/contributor`
const VTEX_ORG = 'vtex'
const REPO_NAME = 'shoreline'
const token = process.env.GITHUB_TOKEN
const startDate = new Date('2024-01-01T00:00:00Z').toISOString()

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

class ContributorsSet {
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

function getRepositoryContributors() {
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

const contributors = getRepositoryContributors()

function filterPullsByUser(username, pulls = []) {
  const pullsCreatedByUser = pulls.filter(
    (pull) => pull.author.login === username && pull.createdAt >= startDate
  )

  const pullsReviewedByUser = pulls.filter((pull) => {
    return (
      pull.author.login !== username &&
      pull.createdAt >= startDate &&
      pull.participants.nodes.some((participant) => {
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

function getContributorStats(username) {
  const issuesStats = filterIssuesByUser(username, issues)
  const pullsStats = filterPullsByUser(username, pulls)

  const rate =
    (issuesStats.issues +
      issuesStats.assigns +
      issuesStats.comments +
      pullsStats.pulls +
      pullsStats.reviews +
      pullsStats.merged) /
    6

  return { ...issuesStats, ...pullsStats, rate }
}

function getIssuesOnFire() {
  issues.sort((a, b) => b.comments.nodes.length - a.comments.nodes.length)

  const openedIssues = issues.filter((issue) => issue.state === 'OPEN')

  openedIssues.sort((a, b) => b.comments.nodes.length - a.comments.nodes.length)

  const issuesOnFire = openedIssues.slice(0, 4)

  return issuesOnFire
}

async function main() {
  const stats = contributors.map((contributor) => {
    const stats = getContributorStats(contributor.username)
    return {
      ...contributor,
      stats,
    }
  })

  stats.sort((a, b) => b.stats.rate - a.stats.rate)

  const code = `
export const contributors = ${JSON.stringify(stats)}

export function getContributor(username: string) {
  return contributors.find((contributor) => contributor.username === username)
}

const maintainers = [
  'matheusps',
  'davicostalf',
  'lucasaarcoverde',
  'beatrizmilhomem',
]

export function getContributors() {
  return contributors.filter(
    (contributor) => !maintainers.includes(contributor.username)
  )
}
  `

  const formattedCode = await format(code, {
    parser: 'typescript',
    semi: false,
    singleQuote: true,
  })

  fse.outputFile(`${statsOutputDirectory}/stats.ts`, formattedCode, (err) => {
    if (err) {
      console.log(err)
    } else {
      console.log('✅ Contributor stats generated')
    }
  })

  const issuesOnFire = getIssuesOnFire()

  const issuesCode = `
export const issuesOnFire = ${JSON.stringify(issuesOnFire)}
  `

  const formattedIssuesCode = await format(issuesCode, {
    parser: 'typescript',
    semi: false,
    singleQuote: true,
  })

  fse.outputFile(
    `${statsOutputDirectory}/issues.ts`,
    formattedIssuesCode,
    (err) => {
      if (err) {
        console.log(err)
      } else {
        console.log('✅ Issues on fire generated')
      }
    }
  )

  const contributorsPromises = contributors.map((contributor) => {
    const mdxCode = `
---
toc: false
---

import { getContributor } from '../../../__contributions__/stats';

# Contributor

<br/>

<ContributorStats contributor={getContributor("${contributor.username}")} />
    `

    return format(mdxCode, {
      parser: 'mdx',
      semi: false,
      singleQuote: true,
    })
  })

  const contributorsMDX = await Promise.all(contributorsPromises)

  for (const i in contributors) {
    const contributor = contributors[i]
    const contributorMDX = contributorsMDX[i]

    fse.outputFile(
      `${contributorsOutputDirectory}/${contributor.username}.mdx`,
      contributorMDX,
      (err) => {
        if (err) {
          console.log(err)
        } else {
          console.log(`✅ ${contributor.username} page generated`)
        }
      }
    )
  }
}

main()

/**
 * @TODO
 * - Add possibility to customize range of dates
 * - Add this script to the build process
 */
