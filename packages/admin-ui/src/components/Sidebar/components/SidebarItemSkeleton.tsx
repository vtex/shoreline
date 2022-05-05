import React from 'react'

import { Box } from '../../../box'
import { Skeleton } from '../../Skeleton'
import { SCALES } from '../consts'

const skeletonWidth = {
  0: '8rem',
  1: '7rem',
  2: '6.5rem',
  3: '8rem',
  4: '7rem',
  5: '8rem',
  6: '6rem',
}

type SkeletonIndex = keyof typeof skeletonWidth

/**
 * The SidebaItem loading state
 */
export function SidebarItemSkeleton() {
  return (
    <Box
      csx={{
        width: SCALES.COLLAPSIBLE_AREA_WIDTH,
        padding: '$s',
      }}
    >
      <Box csx={{ size: '100%', margin: '$s', paddingY: '$l' }}>
        <Skeleton
          key="section-title"
          csx={{
            width: '5rem',
            height: '1.5rem',
          }}
        />
      </Box>
      {Array.from(new Array(7)).map((_, index) => {
        const width = skeletonWidth[index as SkeletonIndex]

        return (
          <Box csx={{ size: '100%', padding: '$s' }}>
            <Skeleton
              key={`section-item-${index}`}
              csx={{
                height: '1rem',
                width,
              }}
            />
          </Box>
        )
      })}
    </Box>
  )
}
