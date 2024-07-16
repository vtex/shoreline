import styles from './contributions.module.css'
import { getContributors } from '../../__contributions__/stats'
import { Link } from '@vtex/shoreline'
import NextLink from 'next/link'

export function ContributorList() {
  return (
    <div className={styles.container}>
      {getContributors().map((contributor) => {
        return (
          <div key={contributor.username}>
            <Link asChild>
              <NextLink href={`/guides/contributor/${contributor.username}`}>
                <img
                  src={contributor.image}
                  alt={contributor.username}
                  className={styles.avatar}
                />
              </NextLink>
            </Link>
          </div>
        )
      })}
    </div>
  )
}
