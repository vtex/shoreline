import Image from 'next/image'
import styles from './contributions.module.css'
import { Bleed, Button, Stack } from '@vtex/shoreline'
import type { Contributor } from '../../__contributions__/stats'

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
        <div className={styles.contributionsHeader}>
          <p className={styles.contributionsLabel}>Contributions</p>
          <Bleed top="$space-2" bottom="$space-2" end="$space-2">
            <Button disabled>2024</Button>
          </Bleed>
        </div>
        <div className={styles.statsContainer}>
          {Object.keys(stats).map((stat) => {
            if (stat === 'rate') return null

            return (
              <div key={stat} className={styles.stat}>
                <p className={styles.statValue}>{stats[stat]}</p>
                <p className={styles.statLabel}>{statsLabels[stat]}</p>
              </div>
            )
          })}
        </div>
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
  contributor: Contributor
}
