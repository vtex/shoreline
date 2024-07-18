import styles from './contributions.module.css'
import { getContributors } from '../../__contributions__/stats'
import { Link } from '@vtex/shoreline'
import NextLink from 'next/link'
import Image from 'next/image'

export function ContributorList() {
  return (
    <div className={styles.container}>
      {getContributors().map((contributor) => {
        return (
          <div key={contributor.username}>
            <Link asChild>
              <NextLink href={`/guides/contributor/${contributor.username}`}>
                <Image
                  src={contributor.image}
                  alt={contributor.username}
                  className={styles.avatar}
                  width={64}
                  height={64}
                />
              </NextLink>
            </Link>
          </div>
        )
      })}
    </div>
  )
}
