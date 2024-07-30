import type { ComponentPropsWithoutRef } from 'react'
import { forwardRef, useRef } from 'react'
import { IconButton } from '../icon-button'
import { IconMagnifyingGlassSmall, IconXCircle } from '../../icons'
import { useId, useMergeRef } from '@vtex/shoreline-utils'
import { Spinner } from '../spinner'
import { VisuallyHidden } from '../visually-hidden'
import { createMessageHook } from '../locale'
import { messages } from './messages'

const useMessage = createMessageHook(messages)

/**
 * Search is a text input that users can type to narrow down a Collection. Use Filters if values can be classified in predefined options.
 * @status stable
 * @example
 * <Search placeholder="Search" />
 */
export const Search = forwardRef<HTMLInputElement, SearchProps>(
  function Search(props, forwardedRef) {
    const {
      disabled = false,
      loading = false,
      placeholder,
      className,
      value,
      onClear,
      id: defaultId,
      defaultValue,
      ...inputProps
    } = props

    const getMessage = useMessage(placeholder ? { placeholder } : undefined)

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
          placeholder={getMessage('placeholder')}
          defaultValue={defaultValue}
          {...inputProps}
        />
        <VisuallyHidden>
          <label htmlFor={id}>{getMessage('placeholder')}</label>
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
  }
)

export interface SearchOptions {
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

export type SearchProps = SearchOptions & ComponentPropsWithoutRef<'input'>
