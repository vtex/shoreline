import type { ComponentPropsWithoutRef } from 'react'
import { forwardRef } from 'react'
import { Skeleton } from '../skeleton'
import type { StackOptions } from '../stack'
import { Stack } from '../stack'

/**
 * Filter listbox
 * @example
 * <FilterProvider>
 *  <FilterPopover>
 *    <FilterList>
 *      <FilterItem value="option">Option</FilterItem>
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

export type FilterListSkeletonOptions = StackOptions
export type FilterListSkeletonProps = StackOptions &
  ComponentPropsWithoutRef<'div'>
