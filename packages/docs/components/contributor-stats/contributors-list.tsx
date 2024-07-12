import styles from './contributors.module.css'
import { contributors } from '../../__contributors__/stats'
import {
  Stack,
  TooltipPopover,
  TooltipProvider,
  TooltipTrigger,
} from '@vtex/shoreline'

export function ContributorList() {
  return (
    <div className={styles.container}>
      {contributors.map((contributor) => {
        const { stats } = contributor
        return (
          <TooltipProvider key={contributor.username}>
            <TooltipTrigger asChild>
              <div>
                <img
                  src={contributor.image}
                  alt={contributor.name}
                  className={styles.avatar}
                />
              </div>
            </TooltipTrigger>
            <TooltipPopover>
              <Stack>
                <p>reviews: {stats.reviews}</p>
                <p>issues: {stats.issues}</p>
                <p>assigns: {stats.assigns}</p>
                <p>comments: {stats.comments}</p>
                <p>pulls: {stats.pulls}</p>
                <p>merged: {stats.merged}</p>
              </Stack>
            </TooltipPopover>
          </TooltipProvider>
        )
      })}
    </div>
  )
}

/**
 * stats: {
      issues: 13,
      assigns: 9,
      comments: 18,
      pulls: 70,
      reviews: 81,
      merged: 64,
    },
 */
