import { config } from 'dotenv'
import path from 'node:path'
import fse from 'fs-extra'
import { format } from 'prettier'
import {
  fetchAllPullRequests,
  fetchAllIssues,
  getContributors,
} from './github.mjs'

config()

const statsOutputDirectory = `${path.dirname('')}/__contributions__`
const startDate = new Date('2024-07-22T12:00:00Z').toISOString()

function getStats(issues, pulls) {
  const contributors = getContributors(issues, pulls)

  const resolvedPulls = pulls.filter(
    (pull) =>
      pull.createdAt >= startDate && isHumanContributor(pull.author.login)
  )

  const resolvedIssues = issues.filter(
    (issue) =>
      issue.createdAt >= startDate && isHumanContributor(issue.author.login)
  )

  const participantsStats = contributors
    .map((contributor) => {
      const stats = getParticipantStats(
        contributor.username,
        issues,
        resolvedPulls
      )

      return {
        ...contributor,
        stats,
      }
    })
    .filter((contributor) => contributor.stats.rate > 0)

  participantsStats.sort((a, b) => b.stats.rate - a.stats.rate)

  return {
    participantsStats: participantsStats,
    participants: contributors.length,
    issues: resolvedIssues.length,
    pulls: resolvedPulls.length,
    completedPulls: resolvedPulls.filter((pull) => pull.state === 'MERGED')
      .length,
  }
}

function getParticipantStats(username, issues, pulls) {
  const pullsCreatedByUser = pulls.filter(
    (pull) => pull.author.login === username
  )

  const issuesCreatedByUser = issues.filter(
    (issue) => issue.author.login === username && issue.createdAt >= startDate
  )

  const issuesCommentedByUser = issues.filter((issue) => {
    return issue.comments.nodes.some(
      (comment) =>
        comment.author.login === username && comment.createdAt >= startDate
    )
  })

  const pullsMerged = pullsCreatedByUser.filter(
    (pull) => pull.state === 'MERGED'
  )

  const stats = {
    pulls: pullsCreatedByUser.length,
    completed: pullsMerged.length,
    issues: issuesCreatedByUser.length,
    comments: issuesCommentedByUser.length,
  }

  const rate =
    (stats.pulls * 2 +
      stats.completed * 3 +
      stats.comments +
      stats.issues * 2) /
    4

  return { ...stats, rate }
}

async function main() {
  const pulls = await fetchAllPullRequests()
  const issues = await fetchAllIssues()

  const stats = getStats(issues, pulls)

  /**
   * Generate contributors stats file
   */
  const code = `
export interface Contributor {
  username: string
  image: string
  stats: {
    issues: number
    pulls: number
    comments: number
    completed: number
    rate: number
  }
}

export interface ChallengeStats {
  participantsStats: Contributor[]
  participants: number
  issues: number
  pulls: number
  completedPulls: number
}

export const stats: ChallengeStats = ${JSON.stringify(stats)}

export function getContributor(username: string) {
  return stats.participantsStats.find((participant) => participant.username === username)
}

const maintainers = [
  'matheusps',
  'davicostalf',
  'lucasaarcoverde',
  'beatrizmilhomem',
]

export function getContributors() {
  return stats.participantsStats.filter(
    (participant) =>
      !maintainers.includes(participant.username) && participant.stats.rate > 0
  )
}
  `

  const formattedCode = await format(code, {
    parser: 'typescript',
    semi: false,
    singleQuote: true,
  })

  fse.outputFile(
    `${statsOutputDirectory}/eng-contribution-challenge.ts`,
    formattedCode,
    (err) => {
      if (err) {
        console.log(err)
      } else {
        console.log('✅ Contributor stats generated')
      }
    }
  )
}

function isHumanContributor(username) {
  const bots = [
    'github-actions',
    'changeset-bot',
    'vtexgithubbot',
    'netlify',
    'vercel',
    'dependabot',
    'renovate',
  ]
  return !bots.includes(username)
}

main()
