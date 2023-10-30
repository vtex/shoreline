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
 *   onPageChange={(page, type) => {}}
 *   total={total}
 *   size={size}
 *   sizeOptions={[25, 50, 100]}
 *   onSizeChange={(size) => {}}
 * />
 */
export const Pagination = forwardRef<HTMLDivElement, PaginationProps>(
  function Pagination(props, ref) {
    const {
      sizeOptions = [],
      size,
      page,
      total,
      onSizeChange,
      onPageChange,
      ...otherProps
    } = props

    const hasSizes = sizeOptions.length > 0

    const totalPages = Math.ceil(total / size)

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
                value={size}
                onChange={(e) => {
                  onSizeChange?.(Number(e.target.value))
                }}
              >
                {sizeOptions.map((sizeOption) => (
                  <option value={sizeOption}>Show {sizeOption}</option>
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
                onPageChange?.(page - 1, 'prev')
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
                onPageChange?.(page + 1, 'next')
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
  onPageChange?: (page: number, type: 'next' | 'prev') => void
  onSizeChange?: (size: number) => void
  sizeOptions?: number[]
  size: number
  page: number
  total: number
}
