import type { ComponentPropsWithoutRef, Ref } from 'react'
import React, { forwardRef } from 'react'
import { ComboboxPopover as AriakitComboboxPopover } from 'ariakit/combobox'

import { popoverTheme } from './combobox.css'
import { Box } from '../box'
import { messages } from './messages'
import { Paragraph } from '../components/Paragraph'
import { Text } from '../text'
import type { ComboboxState } from './combobox.state'
import { Spinner } from '../spinner'
import { Button } from '../button'
import { useMessageFormatter } from '../i18n'
import type { ComboboxMultipleState } from '.'
import { cx } from '@vtex/admin-ui-core'

export const ComboboxPopoverBase = forwardRef(
  (props: ComboboxPopoverBaseProps, ref: Ref<HTMLDivElement>) => {
    const {
      state,
      onRetry = () => null,
      children,
      className = '',
      ...htmlProps
    } = props

    const { deferredValue, status, ...comboboxState } = state

<<<<<<< HEAD
  const formatMessage = useMessageFormatter(messages)
=======
    const formatMessage = useMessageFormatter(messages.popover)
>>>>>>> c4db6ce51 (refactor(combobox): migrate combobox and combobox multiple to new model)

    const renderChildren = () => {
      switch (status) {
        case 'ready': {
          return <>{children}</>
        }

        case 'loading': {
          return (
            <Box
              csx={{
                margin: '$space-2',
              }}
            >
              <Spinner />
            </Box>
          )
        }

        case 'error': {
          return (
            <Box
              csx={{
                margin: '$space-2',
              }}
            >
              <h2>
                <Text variant="title2">{formatMessage('error')}</Text>
              </h2>
              <Button bleedX onClick={onRetry} variant="tertiary">
                {formatMessage('retry')}
              </Button>
            </Box>
          )
        }

        case 'empty': {
          return (
            <Box
              csx={{
                margin: '$space-2',
              }}
            >
              <Paragraph
                csx={{
                  color: '$secondary',
                }}
              >
                {formatMessage('searchPlaceholder')}
              </Paragraph>
            </Box>
          )
        }

        case 'not-found': {
          return (
            <Box
              csx={{
                margin: '$space-2',
              }}
            >
              <h2>
                <Text variant="title2">{formatMessage('noResultsTitle')}</Text>
              </h2>
              <Paragraph
                csx={{
                  color: '$secondary',
                }}
              >
                {formatMessage('noResultsSubtitle')}
              </Paragraph>
            </Box>
          )
        }
      }
    }

    return (
      <AriakitComboboxPopover
        state={{ ...comboboxState, matches: [] }}
        className={cx(popoverTheme, className)}
        ref={ref}
        {...htmlProps}
      >
        {renderChildren()}
      </AriakitComboboxPopover>
    )
  }
)

export interface ComboboxPopoverBaseProps
  extends ComponentPropsWithoutRef<'div'> {
  state: ComboboxState<any> | ComboboxMultipleState<any>
  onRetry?: () => void
}
