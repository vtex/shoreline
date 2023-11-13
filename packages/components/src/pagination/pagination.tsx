import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef, useMemo } from 'react'
import { Stack } from '../stack'
import { Action } from '../action'
import { IconCaretLeft, IconCaretRight } from '@vtex/shoreline-icons'

import './pagination.css'
import { SelectOption } from '../select'
import { Skeleton } from '../skeleton'
import { PaginationSelect } from './pagination-select'

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
      loading = false,
      ...otherProps
    } = props

    const hasSizes = sizeOptions.length > 0

    const totalPages = useMemo(() => Math.ceil(total / size), [total, size])

    const pageOptions = useMemo(() => {
      const totalPages = Math.ceil(total / size)

      return [...Array(totalPages).keys()].slice(1)
    }, [total, size])

    return (
      <div data-sl-pagination ref={ref} {...otherProps}>
        <Stack direction="row" space="$space-2">
          {hasSizes && (
            <PaginationSelect
              data-sl-pagination-size-select
              value={size}
              options={sizeOptions}
              onValueChange={(value) => onSizeChange?.(value)}
              label={`Show ${size}`}
              disabled={loading}
            >
              {sizeOptions.map((option) => (
                <SelectOption value={String(option)}>
                  Show {option}
                </SelectOption>
              ))}
            </PaginationSelect>
          )}

          <div data-sl-pagination-total-label data-loading={loading}>
            {loading ? <Skeleton /> : `${total} items`}
          </div>

          <div data-sl-pagination-actions>
            <Action
              iconOnly
              onClick={() => {
                onPageChange?.(page - 1, 'prev')
              }}
              disabled={page === 1 || loading}
              aria-label="Previous page"
              data-sl-pagination-action-prev
            >
              <IconCaretLeft />
            </Action>

            <PaginationSelect
              data-sl-pagination-page-select
              onValueChange={(value) => onPageChange?.(value, 'selection')}
              value={page}
              options={pageOptions}
              loading={loading}
              label={`${page} of ${pageOptions.length}`}
            >
              {pageOptions.map((option) => (
                <SelectOption value={String(option)}>{option}</SelectOption>
              ))}
            </PaginationSelect>

            <Action
              iconOnly
              onClick={() => {
                onPageChange?.(page + 1, 'next')
              }}
              disabled={page === totalPages || loading}
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
  loading?: boolean
}
