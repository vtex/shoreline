import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef, useMemo } from 'react'
import { IconCaretLeft, IconCaretRight } from '@vtex/shoreline-icons'
import { createMessageHook } from '@vtex/shoreline-primitives'

import { Skeleton } from '../skeleton'
import { messages } from './messages'
import { IconButton } from '../icon-button'
import { Stack } from '../stack'

const useMessage = createMessageHook(messages)

/**
 * Pagination triggers allow merchants to view the size of a list and navigate between pages.
 *
 * @example
 *
 * <Pagination
 *   page={page}
 *   onPageChange={(page, type) => {}}
 *   total={total}
 * />
 */
export const Pagination = forwardRef<HTMLDivElement, PaginationProps>(
  function Pagination(props, ref) {
    const {
      page,
      total,
      size = 25,
      onPageChange,
      loading = false,
      ...otherProps
    } = props

    const getMessage = useMessage()

    const { firstPosition, lastPosition } = useMemo(() => {
      const minFirstposition = Math.min(total, 1)

      const firstPosition = Math.max(page * size - size, minFirstposition)

      const lastPosition = Math.min(page * size, total)

      return { firstPosition, lastPosition }
    }, [page, total])

    const isSinglePage = total <= size
    const paginationLabel = isSinglePage
      ? 'pagination-label-single-page'
      : 'pagination-label'

    return (
      <div data-sl-pagination ref={ref} {...otherProps}>
        <Stack horizontal space="$space-2">
          <div data-sl-pagination-label data-loading={loading}>
            {loading ? (
              <Skeleton />
            ) : (
              getMessage(paginationLabel, {
                firstPosition,
                lastPosition,
                items: total,
              })
            )}
          </div>

          <div data-sl-pagination-actions>
            <IconButton
              label={getMessage('previous-page-action')}
              variant="tertiary"
              onClick={() => {
                onPageChange?.(page - 1, 'prev')
              }}
              disabled={page === 1 || loading}
              data-sl-pagination-action-prev
            >
              <IconCaretLeft />
            </IconButton>

            <IconButton
              variant="tertiary"
              label={getMessage('next-page-action')}
              onClick={() => {
                onPageChange?.(page + 1, 'next')
              }}
              disabled={lastPosition === total || loading}
              data-sl-pagination-action-next
            >
              <IconCaretRight />
            </IconButton>
          </div>
        </Stack>
      </div>
    )
  }
)

export interface PaginationProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Function called whenever the pagination actions are triggered and the page changes.
   * @param page The new page number reference
   * @param type The type of the action that was triggered
   */
  onPageChange?: (page: number, type: 'next' | 'prev') => void
  /**
   * Pagination current page
   */
  page: number
  /**
   * The total number of items
   */
  total: number
  /**
   * Whether the pagination is loading or not.
   * @default false
   */
  loading?: boolean
  /**
   * Page size
   * @default 25
   */
  size?: number
}
