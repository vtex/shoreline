import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { Stack } from '../stack'
import { Action } from '../action'
import {
  IconCaretDown,
  IconCaretLeft,
  IconCaretRight,
} from '@vtex/shoreline-icons'
import { AccessibleIcon } from '../accessible-icon'
import { VisuallyHidden } from '../visually-hidden'
import { useId } from '@vtex/shoreline-utils'

/**
 * Pagination triggers allow merchants to view the size of a list and navigate between pages.
 *
 * @example
 *
 * <Pagination
 *   page={page}
 *   onPage={(page, type) => {}}
 *   total={total}
 *   pageSize={size}
 *   sizes={[25, 50, 100]}
 *   onPageSize={(size) => {}}
 * />
 */
export const Pagination = forwardRef<HTMLDivElement, PaginationProps>(
  function Pagination(props, ref) {
    const {
      sizes = [],
      pageSize,
      page,
      total,
      onPageSize,
      onPage,
      ...otherProps
    } = props

    const hasSizes = sizes.length > 0

    const totalPages = Math.ceil(total / pageSize)

    const id = useId()

    return (
      <div data-sl-pagination ref={ref} {...otherProps}>
        <Stack direction="row" space="$space-2">
          {hasSizes && (
            <div data-sl-pagination-size>
              <VisuallyHidden>
                <label htmlFor={id}>Select page size</label>
              </VisuallyHidden>
              <select
                id={id}
                data-sl-pagination-size-select
                value={pageSize}
                onChange={(e) => {
                  onPageSize?.(Number(e.target.value))
                }}
              >
                {sizes.map((size) => (
                  <option value={size}>Show {size}</option>
                ))}
              </select>

              <AccessibleIcon label="Select caret icon">
                <IconCaretDown
                  data-sl-pagination-size-select-icon
                  width={16}
                  height={16}
                />
              </AccessibleIcon>
            </div>
          )}

          <div data-sl-pagination-total-label>{total} items</div>

          <div data-sl-pagination-actions>
            <Action
              iconOnly
              onClick={() => {
                onPage?.(page - 1, 'prev')
              }}
              disabled={page === 1}
              aria-label="Previous page"
              data-sl-pagination-action-prev
            >
              <IconCaretLeft />
            </Action>
            <div data-sl-pagination-page-label>
              {page} of {totalPages}
            </div>
            <Action
              iconOnly
              onClick={() => {
                onPage?.(page + 1, 'next')
              }}
              disabled={page === totalPages}
              aria-label="Next page"
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
  onPage?: (page: number, type: 'next' | 'prev') => void
  onPageSize?: (size: number) => void
  sizes?: number[]
  pageSize: number
  page: number
  total: number
}
