import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { IconButton } from '../icon-button'
import { IconMagnifyingGlassSmall, IconXCircle } from '@vtex/shoreline-icons'
import { useId } from '@vtex/shoreline-utils'
import { Spinner } from '../spinner'
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
    id: defaultId,
    ...inputProps
  } = props

  const id = useId(defaultId)

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
        <IconMagnifyingGlassSmall data-sl-pre-icon />
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
        <IconButton
          label="Clear"
          onClick={onClear}
          variant="tertiary"
          data-sl-search-clear-btn
        >
          <IconXCircle />
        </IconButton>
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
