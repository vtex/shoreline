import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef, useMemo } from 'react'
import { Stack } from '../stack'
import { Action } from '../action'
import {
  IconCaretDown,
  IconCaretLeft,
  IconCaretRight,
} from '@vtex/shoreline-icons'

import './pagination.css'
import { Select, SelectOption, SelectPopover, SelectProvider } from '../select'
import { Bleed } from '../bleed'

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

    const pageOptions = useMemo(
      () => [...Array(totalPages).keys()].slice(1),
      [total, size]
    )

    return (
      <div data-sl-pagination ref={ref} {...otherProps}>
        <Stack direction="row" space="$space-2">
          {hasSizes && (
            <SelectProvider
              value={String(size)}
              setValue={(value) => onSizeChange?.(Number(value))}
            >
              <Select asChild>
                <Action>
                  Show {size} <IconCaretDown width={16} height={16} />
                </Action>
              </Select>
              <Bleed>
                <SelectPopover data-sl-pagination-select-popover>
                  {sizeOptions.map((sizeOption) => (
                    <SelectOption value={String(sizeOption)}>
                      Show {sizeOption}
                    </SelectOption>
                  ))}
                </SelectPopover>
              </Bleed>
            </SelectProvider>
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

            {totalPages === 1 ? (
              <div data-sl-pagination-page-label>
                {page} of {totalPages}
              </div>
            ) : (
              <SelectProvider
                value={String(page)}
                setValue={(value) => onPageChange?.(Number(value), 'selection')}
              >
                <Select asChild>
                  <Action>
                    {page} of {totalPages}
                  </Action>
                </Select>
                <Bleed>
                  <SelectPopover data-sl-pagination-select-popover>
                    {pageOptions.map((pageOption) => (
                      <SelectOption value={String(pageOption)}>
                        {pageOption}
                      </SelectOption>
                    ))}
                  </SelectPopover>
                </Bleed>
              </SelectProvider>
            )}

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
  onPageChange?: (page: number, type: 'next' | 'prev' | 'selection') => void
  onSizeChange?: (size: number) => void
  sizeOptions?: number[]
  size: number
  page: number
  total: number
}
