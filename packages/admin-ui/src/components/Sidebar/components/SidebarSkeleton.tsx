import React from 'react'

import { Set } from '../../Set'
import { Skeleton } from '../../Skeleton'
import { Center } from '../../../center'

const size = 20

/**
 * Skeleton component for the sidebar.
 * It fits the SidebarItem disclosure button's size.
 */
export function SidebarSkeleton(props: SidebarSkeletonProps) {
  const { amount = 7 } = props

  return (
    <Set spacing="$l" csx={{ width: '100%' }} orientation="vertical">
      {Array.from(new Array(amount)).map(() => (
        <Center
          csx={{ zIndex: 'sidebarOverlay', paddingX: '$s', width: '100%' }}
        >
          <Skeleton
            csx={{
              margin: '$s',
              minHeight: size,
              maxHeight: size,
              minWidth: size,
              maxWidth: size,
            }}
          />
        </Center>
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
