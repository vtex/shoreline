import type { ReactNode } from 'react'
import React, { forwardRef } from 'react'

import { Action } from '../action'

import { Select, SelectPopover, SelectProvider } from '../select'
import { Bleed } from '../bleed'
import { Skeleton } from '../skeleton'

export const PaginationSelect = forwardRef<
  HTMLDivElement,
  PaginationSelectProps
>(function Pagination(props, ref) {
  const {
    loading = false,
    value,
    options,
    label,
    onValueChange,
    children,
    disabled = false,
    ...otherProps
  } = props

  if (loading) {
    return (
      <div data-sl-pagination-select data-loading={loading}>
        <Skeleton />
      </div>
    )
  }

  return (
    <div data-sl-pagination-select ref={ref} {...otherProps}>
      {options.length === 1 ? (
        <div data-sl-pagination-label>{label}</div>
      ) : (
        <SelectProvider
          value={String(value)}
          setValue={(value) => onValueChange?.(Number(value))}
        >
          <Select asChild>
            <Action data-sl-pagination-select-action disabled={disabled}>
              {label}
            </Action>
          </Select>
          <Bleed>
            <SelectPopover data-sl-pagination-select-popover>
              {options.map((option) => children(option))}
            </SelectPopover>
          </Bleed>
        </SelectProvider>
      )}
    </div>
  )
})

export interface PaginationSelectProps {
  onValueChange?: (value: number) => void
  value: number
  options: number[]
  children: (option: number) => ReactNode
  loading?: boolean
  label: ReactNode
  disabled?: boolean
}
