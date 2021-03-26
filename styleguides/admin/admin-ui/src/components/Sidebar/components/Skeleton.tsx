import React from 'react'
import { Set } from '../../Set'
import { Skeleton } from '../../Skeleton'

// size of the skeleton
const size = 40

/**
 * Skeleton component for the sidebar.
 * It fits the <Sidebar.Item /> disclosure button's size.
 */
export function SidebarSkeleton(props: SidebarSkeletonProps) {
  const { amount = 7 } = props

  return (
    <Set spacing={1} orientation="vertical">
      {Array.from(new Array(amount)).map(() => (
        <Skeleton
          csx={{
            minHeight: size,
            maxHeight: size,
            minWidth: size,
            maxWidth: size,
          }}
        />
      ))}
    </Set>
  )
}

export interface SidebarSkeletonProps {
  /**
   * How many skeletons should be displayed
   * @default 7
   */
  amount?: number
}
