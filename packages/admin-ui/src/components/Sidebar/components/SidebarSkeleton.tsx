import React from 'react'

import { Stack } from '../../../stack'
import { Skeleton } from '../../../skeleton'
import { Center } from '../../../center'

const size = 20

/**
 * Skeleton component for the sidebar.
 * It fits the SidebarItem disclosure button's size.
 */
export function SidebarSkeleton(props: SidebarSkeletonProps) {
  const { amount = 7 } = props

  return (
    <Stack space="$space-2" csx={{ width: '100%' }}>
      {Array.from(new Array(amount)).map(() => (
        <Center
          csx={{
            zIndex: 'sidebarOverlay',
            paddingX: '$space-1',
            width: '100%',
          }}
        >
          <Skeleton
            csx={{
              margin: '$space-2 $space-3',
              minHeight: size,
              maxHeight: size,
              minWidth: size,
              maxWidth: size,
            }}
          />
        </Center>
      ))}
    </Stack>
  )
}

export interface SidebarSkeletonProps {
  /**
   * How many skeletons should be displayed
   * @default 7
   */
  amount?: number
}
