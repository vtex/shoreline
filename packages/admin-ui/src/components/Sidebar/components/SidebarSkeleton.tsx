import React from 'react'

import { Set } from '../../Set'
import { Skeleton } from '../../Skeleton'

const size = 20

/**
 * Skeleton component for the sidebar.
 * It fits the SidebarItem disclosure button's size.
 */
export function SidebarSkeleton(props: SidebarSkeletonProps) {
  const { amount = 7 } = props

  return (
    <Set spacing={5} csx={{ paddingY: '1rem' }} orientation="vertical">
      {Array.from(new Array(amount)).map(() => (
        <Skeleton
          csx={{
            zIndex: 999,
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
