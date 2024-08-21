import styles from './contributions.module.css'
import { getContributors } from '../../__contributions__/stats'
import { Link } from '@vtex/shoreline'
import NextLink from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export function ContributorList<T extends { image: string; username: string }>(
  props: ContributorListProps<T>
) {
  const { contributors = getContributors(), hidden = false } = props
  const [isHidden, setHidden] = useState(hidden)

  return isHidden ? (
    <button className={styles.revealButton} onClick={() => setHidden(false)}>
      Reveal winners!
    </button>
  ) : (
    <div className={styles.container}>
      {contributors.map((contributor) => {
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

interface ContributorListProps<T> {
  contributors: Array<T>
  hidden?: boolean
}
