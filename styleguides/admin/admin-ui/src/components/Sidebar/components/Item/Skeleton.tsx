import React from 'react'
import { Skeleton } from '../../../Skeleton'
import { Set } from '../../../Set'
import { Box } from '@vtex/admin-primitives'
import { SCALES } from '../../consts'

/**
 * The sidebar item skeleton.
 */
export function ItemSkeleton() {
  return (
    <Box
      csx={{
        width: SCALES.COLLAPSIBLE_AREA_WIDTH,
        padding: '1.5rem 0.5rem',
      }}
    >
      {Array.from(new Array(2)).map((_, index) => (
        <Set
          spacing={1}
          orientation="vertical"
          csx={{
            width: SCALES.SIDEBAR_SECTION_WIDTH,
            paddingBottom: 8,
          }}
        >
          <Box
            csx={{
              minHeight: '1rem',
              width: '6rem',
              paddingBottom: '0.8125rem',
            }}
          >
            <Skeleton
              key={`section-title-${index}`}
              csx={{
                height: '1rem',
              }}
            />
          </Box>
          {Array.from(new Array(index % 2 === 0 ? 3 : 5)).map((_, idx) => (
            <Skeleton
              key={`section-item-${2 + idx}`}
              csx={{
                height: '1.5rem',
                width: SCALES.SIDEBAR_SECTION_WIDTH,
              }}
            />
          ))}
        </Set>
      ))}
    </Box>
  )
}
