import type { ChangeEventHandler, Ref } from 'react'
import React, { forwardRef, useMemo } from 'react'
import { IconMagnifyingGlass, IconXCircle } from '@vtex/phosphor-icons'
import { useFieldFocus } from '@vtex/admin-ui-hooks'

import { Center } from '../center'
import { Button } from '../button'
import { Spinner } from '../spinner'
import { VisuallyHidden } from '../visually-hidden'
import { useMessageFormatter } from '../i18n'
import { messages } from './search.i18n'
import { cx } from '@vtex/admin-ui-core'
import {
  clearButtonTheme,
  formTheme,
  iconTheme,
  innerContainerTheme,
  inputTheme,
} from './search.css'

export const Search = forwardRef(function Search(
  props: SearchProps,
  ref: Ref<HTMLFormElement>
) {
  const formatMessage = useMessageFormatter(messages)
  const label = formatMessage('search')

  const {
    role = 'search',
    'aria-label': ariaLabel = label,
    disabled = false,
    value = '',
    onChange,
    loading = false,
    onSubmit,
    onClear = () => {},
    placeholder = label,
    className = '',
    ...htmlProps
  } = props

  const [inputRef, ensureFocus] = useFieldFocus<HTMLInputElement>()
  const hasValue = useMemo(() => value.toString().length > 0, [value])
  const hasClearButton = hasValue && !disabled

  const icon = loading ? (
    <Spinner size={16} data-disabled={disabled} className={iconTheme} />
  ) : (
    <IconMagnifyingGlass
      size="small"
      data-disabled={disabled}
      className={iconTheme}
    />
  )

  return (
    <form
      ref={ref}
      className={cx(formTheme, className)}
      role={role}
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit?.(e)
      }}
      {...htmlProps}
    >
      <Center
        className={innerContainerTheme}
        onClick={ensureFocus}
        data-position="start"
      >
        {icon}
      </Center>
      <input
        ref={inputRef}
        className={inputTheme}
        placeholder={placeholder}
        aria-label={ariaLabel}
        disabled={disabled}
        value={value}
        onChange={onChange}
      />
      {hasClearButton ? (
        <Center className={innerContainerTheme} data-position="end">
          <Button
            aria-label={formatMessage('clearButton')}
            icon={<IconXCircle />}
            variant="neutralTertiary"
            className={clearButtonTheme}
            data-clear
            onClick={() => {
              onClear()
              ensureFocus()
            }}
          />
        </Center>
      ) : null}
      <VisuallyHidden>
        <button type="submit" tabIndex={-1}>
          {label}
        </button>
      </VisuallyHidden>
    </form>
  )
})

export type SearchOptions = {
  disabled?: boolean
  loading?: boolean
  onClear?: () => void
  value?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  placeholder?: string
}

export type SearchProps = Omit<
  React.ComponentPropsWithRef<'form'>,
  keyof SearchOptions
> &
  SearchOptions
