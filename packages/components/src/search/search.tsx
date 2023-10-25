import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef, useId } from 'react'
import { IconButton } from '../icon-button'
import { IconMagnifyingGlass, IconXCircle } from '@vtex/shoreline-icons'
import { Spinner } from '../spinner'
import { Bleed } from '../bleed'
import { VisuallyHidden } from '../visually-hidden'

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

  const id = useId()

  return (
    <div
      className={className}
      data-disabled={disabled}
      data-loading={loading}
      data-sl-search
    >
      {loading ? (
        <Spinner data-sl-pre-icon />
      ) : (
        <IconMagnifyingGlass data-sl-pre-icon />
      )}
      <input
        id={id}
        data-sl-search-input
        ref={ref}
        disabled={disabled}
        value={value}
        placeholder={placeholder}
        {...inputProps}
      />
      <VisuallyHidden>
        <label htmlFor={id}>{placeholder}</label>
      </VisuallyHidden>
      {value && typeof onClear !== undefined ? (
        <Bleed horizontal>
          <IconButton label="Clear" onClick={onClear} variant="tertiary">
            <IconXCircle />
          </IconButton>
        </Bleed>
      ) : null}
    </div>
  )
})

export interface SearchProps extends ComponentPropsWithoutRef<'input'> {
  /**
   * Whether component is loading or not
   * @default false
   */
  loading?: boolean
  /**
   * Callback when the input is cleared
   * @default undefined
   */
  onClear?: () => void
}
