import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef, useRef } from 'react'
import { IconButton } from '../icon-button'
import { IconMagnifyingGlassSmall, IconXCircle } from '@vtex/shoreline-icons'
import { useId } from '@vtex/shoreline-utils'
import { Spinner } from '../spinner'
import { VisuallyHidden } from '../visually-hidden'
import './search.css'

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
    defaultValue,
    ...inputProps
  } = props

  const id = useId(defaultId)

  let defaultRef = useRef<HTMLInputElement | null>(null)

  if (ref) {
    defaultRef = ref as React.MutableRefObject<HTMLInputElement | null>
  }

  const handleFocusFromParent = () => {
    if (defaultRef.current) {
      defaultRef.current.focus()
    }
  }

  return (
    <div
      className={className}
      data-disabled={disabled}
      data-loading={loading}
      data-sl-search
      onClick={handleFocusFromParent}
    >
      {loading ? (
        <Spinner data-sl-pre-icon />
      ) : (
        <IconMagnifyingGlassSmall data-sl-pre-icon />
      )}
      <input
        id={id}
        data-sl-search-input
        ref={defaultRef}
        disabled={disabled}
        value={value}
        placeholder={placeholder}
        defaultValue={defaultValue}
        {...inputProps}
      />
      <VisuallyHidden>
        <label htmlFor={id}>{placeholder}</label>
      </VisuallyHidden>
      {!disabled && value && typeof onClear !== undefined ? (
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
