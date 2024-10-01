import styles from './contributions.module.css'
import { issuesOnFire } from '../../__contributions__/issues'
import { Stack } from '@vtex/shoreline'
import { IconOpenIssue } from './icon-open-issue'
import { IconChatCircle } from './icon-chat-circle'
import Link from 'next/link'

export function IssuesList() {
  return (
    <div className={styles.issuesContainer}>
      {issuesOnFire.map((issue) => {
        const createdAt = new Date(issue.createdAt)

        return (
          <Link
            href={issue.url}
            target="_blank"
            key={issue.title}
            className={styles.issueContainer}
            rel="noreferrer"
          >
            <div className={styles.issueInfoContainer}>
              <IconOpenIssue aria-label="Icon indicating that the GitHub issue is open" />
              <Stack space="$space-1">
                <span className={styles.issueTitle}>{issue.title}</span>
                <p className={styles.issueInfo}>
                  #{issue.number} opened {formatDateLabel(createdAt)} by{' '}
                  {issue.author.login}
                </p>
              </Stack>
            </div>
            <div className={styles.issueComments}>
              <IconChatCircle aria-label="Icon to indicate that the number below represent the comments" />
              <p>{issue.comments.nodes.length}</p>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

function formatDateLabel(date: Date) {
  const now = new Date().getTime()
  const givenDate = new Date(date).getTime()
  const diffTime = Math.abs(now - givenDate)
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 0) {
    return 'today'
  }

  if (diffDays === 1) {
    return 'yesterday'
  }

  if (diffDays > 7 && diffDays < 15) return 'last week'

  if (diffDays > 14 && diffDays < 22) return '2 weeks ago'

  if (diffDays > 22 && diffDays < 30) return '3 weeks ago'

  if (diffDays > 30) return date.toLocaleDateString()

  return `${diffDays} days ago`
}
