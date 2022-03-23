import React from 'react'

import { Box } from '../../Box'
import { Skeleton } from '../../Skeleton'
import { SCALES } from '../consts'

const skeletonWidth = {
  0: '8rem',
  1: '7rem',
  2: '6.5rem',
}

type Index = 0 | 1 | 2

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
      {Array.from(new Array(7)).map((_, idx) => {
        const index = idx % 3

        return (
          <Box csx={{ size: '100%', padding: '$s' }}>
            <Skeleton
              key={`section-item-${2 + idx}`}
              csx={{
                height: '1rem',
                width: idx === 6 ? '6rem' : skeletonWidth[index as Index],
              }}
            />
          </Box>
        )
      })}
    </Box>
  )
}
