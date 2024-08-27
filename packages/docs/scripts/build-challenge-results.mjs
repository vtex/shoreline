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
const startDate = new Date('2024-08-22T12:00:00Z').toISOString()
const endDate = new Date('2024-08-28T17:00:00Z').toISOString()

function getStats(issues, pulls) {
  const contributors = getContributors(issues, pulls)

  const resolvedPulls = pulls.filter(
    (pull) =>
      pull.createdAt >= startDate &&
      pull.createdAt <= endDate &&
      isHumanContributor(pull.author.login)
  )

  const resolvedIssues = issues.filter(
    (issue) =>
      issue.createdAt >= startDate &&
      issue.createdAt <= endDate &&
      isHumanContributor(issue.author.login)
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

  const comments = participantsStats.reduce(
    (acc, contributor) => contributor.stats.comments + acc,
    0
  )

  return {
    participantsStats: participantsStats,
    participants: participantsStats.length,
    issues: resolvedIssues.length,
    pulls: resolvedPulls.length,
    merged: resolvedPulls.filter((pull) => pull.state === 'MERGED').length,
    comments,
  }
}

function getParticipantStats(username, issues, pulls) {
  const pullsCreatedByUser = pulls.filter(
    (pull) => pull.author.login === username
  )

  const issuesCreatedByUser = issues.filter(
    (issue) =>
      issue.author.login === username &&
      issue.createdAt >= startDate &&
      issue.createdAt <= endDate
  )

  const issuesCommentedByUser = issues.filter((issue) => {
    return issue.comments.nodes.some(
      (comment) =>
        comment.author.login === username &&
        comment.createdAt >= startDate &&
        comment.createdAt <= endDate
    )
  })

  const pullsMerged = pullsCreatedByUser.filter(
    (pull) => pull.state === 'MERGED'
  )

  const stats = {
    pulls: pullsCreatedByUser.length,
    merged: pullsMerged.length,
    issues: issuesCreatedByUser.length,
    comments: issuesCommentedByUser.length,
  }

  const rate =
    stats.pulls * 2 + stats.merged * 3 + stats.comments + stats.issues * 2

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
    merged: number
    rate: number
  }
}

export interface ChallengeStats {
  participantsStats: Contributor[]
  participants: number
  issues: number
  pulls: number
  merged: number
  comments: number
}

export const stats: ChallengeStats = ${JSON.stringify(stats)}

export function getWinners() {
  const winners = getContributors().filter((participant) => !maintainers.includes(participant.username))
  winners.sort((a, b) => b.stats.rate - a.stats.rate)

  return winners.slice(0, 3)
}

const maintainers = [
  'matheusps',
  'davicostalf',
  'lucasaarcoverde',
  'beatrizmilhomem',
]

export function getContributors() {
  return stats.participantsStats
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
