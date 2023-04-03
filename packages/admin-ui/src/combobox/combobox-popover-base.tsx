import type { ComponentPropsWithoutRef, Ref } from 'react'
import React, { forwardRef } from 'react'
import { ComboboxPopover as AriakitComboboxPopover } from 'ariakit/combobox'

import { popoverStatusContainerTheme, popoverTheme } from './combobox.css'

import { messages } from './messages'
import { Paragraph } from '../components/Paragraph'
import { Text } from '../text'
import type { ComboboxState } from './combobox.state'
import { Spinner } from '../spinner'
import { Button } from '../button'
import { useMessageFormatter } from '../i18n'
import type { ComboboxMultipleState } from '.'
import { csx, cx } from '@vtex/admin-ui-core'

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

    const formatMessage = useMessageFormatter(messages)

    const renderChildren = () => {
      switch (status) {
        case 'ready': {
          return <>{children}</>
        }

        case 'loading': {
          return (
            <div className={popoverStatusContainerTheme}>
              <Spinner />
            </div>
          )
        }

        case 'error': {
          return (
            <div className={popoverStatusContainerTheme}>
              <h2>
                <Text variant="title2">{formatMessage('error')}</Text>
              </h2>
              <Button bleedX onClick={onRetry} variant="tertiary">
                {formatMessage('retry')}
              </Button>
            </div>
          )
        }

        case 'empty': {
          return (
            <div className={popoverStatusContainerTheme}>
              <Paragraph
                className={csx({
                  color: '$secondary',
                })}
              >
                {formatMessage('searchPlaceholder')}
              </Paragraph>
            </div>
          )
        }

        case 'not-found': {
          return (
            <div className={popoverStatusContainerTheme}>
              <h2>
                <Text variant="title2">{formatMessage('noResultsTitle')}</Text>
              </h2>
              <Paragraph
                className={csx({
                  color: '$secondary',
                })}
              >
                {formatMessage('noResultsSubtitle')}
              </Paragraph>
            </div>
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
