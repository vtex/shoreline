import React from 'react'
import { IconX } from '@vtex/phosphor-icons'
import { Focusable } from 'ariakit/focusable'
import { createComponent, useElement, tag } from '@vtex/admin-ui-react'

import { Paragraph } from '../components/Paragraph'
import { Flex } from '../components/Flex'

interface TagProps {
  value: string
  onDismiss: () => void
}

export const ComboboxMultipleTag = createComponent<typeof Focusable, TagProps>(
  (props) => {
    const { value, onDismiss, ...htmlProps } = props

    return useElement(Focusable, {
      ...htmlProps,
      baseStyle: {
        bg: '#f4f4f4',
        text: '$body',
        padding: '$narrow.s',
        borderRadius: '$default',
      },
      children: (
        <Flex justify="space-between" align="center">
          <Paragraph>{value}</Paragraph>
          <tag.button
            onClick={onDismiss}
            csx={{
              padding: 'none',
              margin: 'none',
              bg: 'transparent',
            }}
          >
            <IconX
              csx={{
                size: 10,
                color: '$secondary',
              }}
            />
          </tag.button>
        </Flex>
      ),
    })
  }
)
