import type { ChangeEventHandler } from 'react'
import React, { useMemo } from 'react'
import { createComponent, useElement, tag } from '@vtex/admin-ui-react'
import { IconMagnifyingGlass, IconXCircle } from '@vtex/phosphor-icons'

import * as styles from './search.style'
import { Center } from '../center'
import { Button } from '../button'
import { Spinner } from '../components/Spinner'
import { VisuallyHidden } from '../components/VisuallyHidden'
import { useMessageFormatter } from '../i18n'
import { messages } from './search.i18n'

export const Search = createComponent<'form', SearchOptions>((props) => {
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
    ...formProps
  } = props

  const icon = loading ? (
    <Spinner size={16} csx={styles.icon(disabled)} />
  ) : (
    <IconMagnifyingGlass size="small" csx={styles.icon(disabled)} />
  )

  const hasValue = useMemo(() => value.toString().length > 0, [value])
  const hasClearButton = hasValue && !disabled

  return useElement('form', {
    ...formProps,
    role,
    onSubmit: (e) => {
      e.preventDefault()
      onSubmit?.(e)
    },
    baseStyle: styles.form,
    children: (
      <>
        <Center csx={styles.innerContainer('start')}>{icon}</Center>
        <tag.input
          csx={styles.input}
          placeholder={label}
          aria-label={ariaLabel}
          disabled={disabled}
          value={value}
          onChange={onChange}
        />
        {hasClearButton ? (
          <Center csx={styles.innerContainer('end')}>
            <Button
              aria-label={formatMessage('clearButton')}
              icon={<IconXCircle />}
              variant="neutralTertiary"
              csx={styles.clearButton}
              onClick={onClear}
            />
          </Center>
        ) : null}
        <VisuallyHidden>
          <button type="submit" tabIndex={-1}>
            {label}
          </button>
        </VisuallyHidden>
      </>
    ),
  })
})

export interface SearchOptions {
  disabled?: boolean
  loading?: boolean
  onClear?: () => void
  value?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
}

export type SearchProps = React.ComponentPropsWithRef<typeof Search>
