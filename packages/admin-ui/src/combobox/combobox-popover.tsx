import type { ReactNode } from 'react'
import React from 'react'
import { ComboboxPopover as BaseComponent } from 'ariakit/combobox'
import { createComponent, useElement, tag } from '@vtex/admin-ui-react'

import * as style from './combobox.style'
import { ComboboxItem } from './combobox-item'
import { Paragraph } from '../components/Paragraph'
import { Text } from '../components/Text'
import type { ComboboxState } from './combobox.state'
import { Spinner } from '../components/Spinner'

export const ComboboxPopover = createComponent<typeof BaseComponent, Props>(
  (props) => {
    const {
      state,
      text = {
        noResultsTitle: 'No options match your search',
        noResultsSubtitle: 'Try using different terms',
        searchPlaceholder: 'Start typing to search',
      },
      ...restProps
    } = props

    const { deferredValue, status, ...comboboxState } = state

    const renderChildren = () => {
      switch (status) {
        case 'ready': {
          return state.matches.map((value) => (
            <ComboboxItem key={value} value={value} />
          ))
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
          return <div>error</div>
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
                {text.searchPlaceholder}
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
                {text.noResultsTitle}
              </Text>
              <Paragraph
                csx={{
                  color: '$secondary',
                }}
              >
                {text.noResultsSubtitle}
              </Paragraph>
            </tag.div>
          )
        }
      }
    }

    return useElement(BaseComponent, {
      ...restProps,
      state: comboboxState,
      baseStyle: style.popover,
      children: renderChildren(),
    })
  }
)

interface Props {
  state: ComboboxState
  text?: {
    searchPlaceholder?: ReactNode
    noResultsTitle?: ReactNode
    noResultsSubtitle?: ReactNode
  }
}
