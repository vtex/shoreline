import React from 'react'
import { Set } from '../../Set'
import { Skeleton } from '../../Skeleton'

interface SidebarSkeletonProps {
  /**
   * How many skeletons should be displayed
   * @default 7
   */
  amount?: number
}

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
            minHeight: 40,
            maxHeight: 40,
            minWidth: 40,
            maxWidth: 40,
          }}
        />
      ))}
    </Set>
  )
}
