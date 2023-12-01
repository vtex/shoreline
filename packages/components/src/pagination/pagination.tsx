import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef, useMemo } from 'react'
import { Stack } from '../stack'
import { Action } from '../action'
import { IconCaretLeft, IconCaretRight } from '@vtex/shoreline-icons'

import './pagination.css'
import { Skeleton } from '../skeleton'
import { createMessageHook } from '../locale'
import { messages } from './messages'

const useMessage = createMessageHook(messages)

const PAGE_SIZE = 25

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
    const { page, total, onPageChange, loading = false, ...otherProps } = props

    const getMessage = useMessage()

    const { firstPosition, lastPosition } = useMemo(() => {
      const minFirstposition = Math.min(total, 1)

      const firstPosition = Math.max(
        page * PAGE_SIZE - PAGE_SIZE,
        minFirstposition
      )

      const lastPosition = Math.min(page * PAGE_SIZE, total)

      return { firstPosition, lastPosition }
    }, [page, total])

    return (
      <div data-sl-pagination ref={ref} {...otherProps}>
        <Stack direction="row" space="$space-2">
          <div data-sl-pagination-label data-loading={loading}>
            {loading ? (
              <Skeleton />
            ) : (
              getMessage('pagination-label', {
                firstPosition,
                lastPosition,
                items: total,
              })
            )}
          </div>

          <div data-sl-pagination-actions>
            <Action
              iconOnly
              onClick={() => {
                onPageChange?.(page - 1, 'prev')
              }}
              disabled={page === 1 || loading}
              aria-label={getMessage('previous-page-action')}
              data-sl-pagination-action-prev
            >
              <IconCaretLeft />
            </Action>

            <Action
              iconOnly
              onClick={() => {
                onPageChange?.(page + 1, 'next')
              }}
              disabled={lastPosition === total || loading}
              aria-label={getMessage('next-page-action')}
              data-sl-pagination-action-next
            >
              <IconCaretRight />
            </Action>
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
}
