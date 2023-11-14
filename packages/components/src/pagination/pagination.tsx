import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef, useMemo } from 'react'
import { Stack } from '../stack'
import { Action } from '../action'
import { IconCaretLeft, IconCaretRight } from '@vtex/shoreline-icons'

import './pagination.css'
import { SelectOption } from '../select'
import { Skeleton } from '../skeleton'
import { PaginationSelect } from './pagination-select'
import { createMessageHook } from '../locale'
import { messages } from './messages'

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

    const getMessage = useMessage()

    const hasSizes = sizeOptions.length > 0

    const { totalPages, pageOptions } = useMemo(() => {
      const totalPages = Math.ceil(total / size)
      const pageOptions = Array(totalPages)
        .fill(1)
        .map((_, index) => index + 1)

      return { totalPages, pageOptions }
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
              label={getMessage('size-select', { size })}
              disabled={loading}
            >
              {(option) => (
                <SelectOption value={String(option)}>
                  {getMessage('size-select', { size: option })}
                </SelectOption>
              )}
            </PaginationSelect>
          )}

          <div data-sl-pagination-total-label data-loading={loading}>
            {loading ? <Skeleton /> : getMessage('total-label', { total })}
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

            <PaginationSelect
              data-sl-pagination-page-select
              onValueChange={(value) => onPageChange?.(value, 'selection')}
              value={page}
              options={pageOptions}
              loading={loading}
              label={getMessage('page-select', {
                page,
                pages: totalPages,
              })}
            >
              {(option) => (
                <SelectOption value={String(option)}>{option}</SelectOption>
              )}
            </PaginationSelect>

            <Action
              iconOnly
              onClick={() => {
                onPageChange?.(page + 1, 'next')
              }}
              disabled={page === totalPages || loading}
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
  onPageChange?: (page: number, type: 'next' | 'prev' | 'selection') => void
  onSizeChange?: (size: number) => void
  sizeOptions?: number[]
  size: number
  page: number
  total: number
  loading?: boolean
}
