import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef, useRef } from 'react'
import { IconButton } from '../icon-button'
import { IconMagnifyingGlassSmall, IconXCircle } from '@vtex/shoreline-icons'
import { useId, useMergeRef } from '@vtex/shoreline-utils'
import { Spinner } from '../spinner'
import { VisuallyHidden } from '@vtex/shoreline-primitives'
import './search.css'

export const Search = forwardRef<HTMLInputElement, SearchProps>(function Search(
  props,
  forwardedRef
) {
  const {
    disabled = false,
    loading = false,
    placeholder = 'Search',
    className,
    value,
    onClear,
    id: defaultId,
    defaultValue,
    ...inputProps
  } = props

  const id = useId(defaultId)

  const ref = useRef<HTMLInputElement | null>(null)

  const handleFocus = () => {
    if (ref.current) {
      ref.current.focus()
    }
  }

  return (
    <div
      className={className}
      data-disabled={disabled}
      data-loading={loading}
      data-sl-search
      onClick={handleFocus}
    >
      {loading ? (
        <Spinner data-sl-pre-icon />
      ) : (
        <IconMagnifyingGlassSmall data-sl-pre-icon />
      )}
      <input
        id={id}
        data-sl-search-input
        ref={useMergeRef(ref, forwardedRef)}
        disabled={disabled}
        value={value}
        placeholder={placeholder}
        defaultValue={defaultValue}
        {...inputProps}
      />
      <VisuallyHidden>
        <label htmlFor={id}>{placeholder}</label>
      </VisuallyHidden>
      {!disabled &&
      (value || defaultValue) &&
      typeof onClear !== 'undefined' ? (
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
