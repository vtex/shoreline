import styles from './contributions.module.css'

export function ContributionList(props: ContributionListProps) {
  const { stats } = props

  return (
    <div className={styles.contributionsList}>
      {Object.keys(stats).map((stat) => {
        if (stat === 'rate' || !statsLabels[stat]) return null

        return (
          <div key={stat} className={styles.stat}>
            <p className={styles.statValue}>{stats[stat]}</p>
            <p className={styles.statLabel}>{statsLabels[stat]}</p>
          </div>
        )
      })}
    </div>
  )
}

const statsLabels = {
  pulls: 'PRs created',
  issues: 'Issues created',
  assigns: 'Issues assigned',
  merged: 'Issues completed',
  comments: 'Comments',
  reviews: 'PRs reviewed',
  participants: 'Participants',
}

interface ContributionListProps {
  stats: Record<string, number>
}
