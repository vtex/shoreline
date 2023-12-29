import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { Skeleton } from '../skeleton'
import { Stack } from '../stack'

/**
 * Filter listbox
 * @example
 * <FilterProvider>
 *  <FilterPopover>
 *    <FilterList>
 *      <FilterOption value="option">Option</FilterOption>
 *    </FilterList>
 *  </FilterPopover>
 * </FilterProvider>
 */
export const FilterListSkeleton = forwardRef<
  HTMLDivElement,
  FilterListSkeletonProps
>(function FilterListSkeleton(props, ref) {
  return (
    <Stack space="$space-4" ref={ref} {...props}>
      <Skeleton
        style={{
          width: '8.75rem',
          height: '1.25rem',
          marginTop: 'var(--sl-space-2)',
        }}
      />
      <Skeleton style={{ width: '10rem', height: '1.25rem' }} />
      <Skeleton style={{ width: '7.5rem', height: '1.25rem' }} />
      <Skeleton style={{ width: '8.75rem', height: '1.25rem' }} />
      <Skeleton
        style={{
          width: '10rem',
          height: '1.25rem',
          marginBottom: 'var(--sl-space-2)',
        }}
      />
    </Stack>
  )
})

export type FilterListSkeletonProps = ComponentPropsWithoutRef<'div'>
