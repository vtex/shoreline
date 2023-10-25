import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef, useId } from 'react'
import { IconButton } from '../icon-button'
import { IconMagnifyingGlass, IconXCircle } from '@vtex/shoreline-icons'
import { Spinner } from '../spinner'
import { Bleed } from '../bleed'

export const Search = forwardRef<HTMLInputElement, SearchProps>(function Search(
  props,
  ref
) {
  const {
    disabled = false,
    loading = false,
    placeholder = 'Search',
    className,
    value,
    onClear,
    ...inputProps
  } = props

  const labelId = useId()

  const icon = loading ? (
    <Spinner data-sl-pre-icon />
  ) : (
    <IconMagnifyingGlass data-sl-pre-icon />
  )

  const clear =
    value && typeof onClear !== undefined ? (
      <Bleed horizontal>
        <IconButton label="Clear" onClick={onClear} variant="tertiary">
          <IconXCircle />
        </IconButton>
      </Bleed>
    ) : null

  return (
    <div
      className={className}
      data-disabled={disabled}
      data-loading={loading}
      data-sl-search
    >
      {icon}
      <input
        id={labelId}
        data-sl-input
        ref={ref}
        disabled={disabled}
        value={value}
        placeholder={placeholder}
        {...inputProps}
      />
      {clear}
    </div>
  )
})

export interface SearchProps extends ComponentPropsWithoutRef<'input'> {
  /**
   * Whether input is disabled or not
   * @default false
   */
  disabled?: boolean
  /**
   * Whether component is loading or not
   * @default false
   */
  loading?: boolean
  /**
   * The value of the placeholder text
   * @default "Search"
   */
  placeholder?: string
  /**
   * The value of the input
   * @default undefined
   */
  value?: string
  /**
   * Callback when the input is cleared
   * @default undefined
   */
  onClear?: () => void
}
