import Image from 'next/image'
import styles from './contributions.module.css'
import { Stack } from '@vtex/shoreline'

export function ContributorStats(props: ContributorStatsProps) {
  const {
    contributor: { stats, username, image },
  } = props

  return (
    <Stack horizontal space="$space-16">
      <div>
        <Image
          className={styles.contributorImage}
          src={image}
          alt={username}
          width={200}
          height={200}
        />
        <div>@{username}</div>
      </div>
      <Stack className={styles.contributionsContainer} space="$space-8">
        <p className={styles.contributionsLabel}>Contributions</p>
        <Stack horizontal space="$space-4" className={styles.statsContainer}>
          {Object.keys(stats).map((stat) => {
            if (stat === 'rate') return null

            return (
              <div key={stat} className={styles.stat}>
                <p className={styles.statValue}>{stats[stat]}</p>
                <p className={styles.statLabel}>{statsLabels[stat]}</p>
              </div>
            )
          })}
        </Stack>
      </Stack>
    </Stack>
  )
}

const statsLabels = {
  pulls: 'PRs created',
  issues: 'Issues created',
  assigns: 'Issues assigned',
  merged: 'Issues completed',
  comments: 'Comments',
  reviews: 'PRs reviewed',
}
interface ContributorStatsProps {
  contributor: {
    username: string
    image: string
    stats: {
      issues: number
      pulls: number
      reviews: number
      comments: number
      merged: number
      assigns: number
      rate: number
    }
  }
}
