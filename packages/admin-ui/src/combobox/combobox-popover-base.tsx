import React from 'react'
import { ComboboxPopover as AriakitComboboxPopover } from 'ariakit/combobox'
import { createComponent, useElement, tag } from '@vtex/admin-ui-react'

import * as style from './combobox.style'
import { messages } from './combobox.i18n'
import { Paragraph } from '../components/Paragraph'
import { Text } from '../components/Text'
import type { ComboboxState } from './combobox.state'
import { Spinner } from '../components/Spinner'
import { Button } from '../button'
import { useMessageFormatter } from '../i18n'

export const ComboboxPopoverBase = createComponent<
  typeof AriakitComboboxPopover,
  Props
>((props) => {
  const { state, onRetry = () => null, children, ...restProps } = props

  const { deferredValue, status, ...comboboxState } = state

  const formatMessage = useMessageFormatter(messages.popover)

  const renderChildren = () => {
    switch (status) {
      case 'ready': {
        return <>{children}</>
      }

      case 'loading': {
        return (
          <tag.div
            csx={{
              margin: 2,
            }}
          >
            <Spinner />
          </tag.div>
        )
      }

      case 'error': {
        return (
          <tag.div
            csx={{
              margin: 2,
            }}
          >
            <Text as="h2" variant="title2">
              {formatMessage('error')}
            </Text>
            <Button
              csx={{
                // bleed
                // TODO: remove after the button review
                marginLeft: '-4',
              }}
              onClick={onRetry}
              variant="tertiary"
            >
              {formatMessage('retry')}
            </Button>
          </tag.div>
        )
      }

      case 'empty-search': {
        return (
          <tag.div
            csx={{
              margin: 2,
            }}
          >
            <Paragraph
              csx={{
                color: '$secondary',
              }}
            >
              {formatMessage('searchPlaceholder')}
            </Paragraph>
          </tag.div>
        )
      }

      case 'no-result': {
        return (
          <tag.div
            csx={{
              margin: 2,
            }}
          >
            <Text as="h2" variant="title2">
              {formatMessage('noResultsTitle')}
            </Text>
            <Paragraph
              csx={{
                color: '$secondary',
              }}
            >
              {formatMessage('noResultsSubtitle')}
            </Paragraph>
          </tag.div>
        )
      }
    }
  }

  return useElement(AriakitComboboxPopover, {
    ...restProps,
    state: { ...comboboxState, matches: [] },
    baseStyle: style.popover,
    children: renderChildren(),
  })
})

interface Props {
  state: ComboboxState<any>
  onRetry?: () => void
}
