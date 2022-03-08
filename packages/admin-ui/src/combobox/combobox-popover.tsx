import type { ReactNode } from 'react'
import React from 'react'
import { ComboboxPopover as BaseComponent } from 'ariakit/combobox'
import { createComponent, useElement, tag } from '@vtex/admin-ui-react'

import * as style from './combobox.style'
import { ComboboxItem } from './combobox-item'
import { Paragraph } from '../components/Paragraph'
import { Text } from '../components/Text'

// TODO add default translations to emptyTitle and emptySubtitle
export const ComboboxPopover = createComponent<typeof BaseComponent, Props>(
  (props) => {
    const {
      state,
      emptyTitle = 'No options match your search',
      emptySubtitle = 'Try using different terms',
    } = props

    return useElement(BaseComponent, {
      ...props,
      baseStyle: style.popover,
      children: state.matches.length ? (
        state.matches.map((value) => <ComboboxItem key={value} value={value} />)
      ) : (
        <tag.div
          csx={{
            margin: 2,
          }}
        >
          <Text as="h2" variant="title2">
            {emptyTitle}
          </Text>
          <Paragraph
            csx={{
              color: '$secondary',
            }}
          >
            {emptySubtitle}
          </Paragraph>
        </tag.div>
      ),
    })
  }
)

interface Props {
  emptyTitle?: ReactNode
  emptySubtitle?: ReactNode
}
