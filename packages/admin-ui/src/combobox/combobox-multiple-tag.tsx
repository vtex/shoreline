import React, { forwardRef } from 'react'
import { IconX } from '@vtex/phosphor-icons'
import { Focusable } from 'ariakit/focusable'
import { tag, useSystem } from '@vtex/admin-ui-react'

import { Paragraph } from '../components/Paragraph'
import { Flex } from '../components/Flex'

import * as style from './combobox.style'

interface TagProps {
  value: string
  onDismiss: () => void
}

export const ComboboxMultipleTag = forwardRef<any, any>((props, ref) => {
  const { value, onDismiss, ...htmlProps } = props
  const { cn } = useSystem()

  return (
    <Focusable className={cn(style.fieldTag)} ref={ref} {...htmlProps}>
      <Flex justify="space-between" align="center">
        <Paragraph>{value}</Paragraph>
        <tag.button
          tabIndex={-1}
          onClick={onDismiss}
          csx={{
            padding: 'none',
            margin: 'none',
            bg: 'transparent',
          }}
        >
          <IconX
            size="small"
            csx={{
              // size: 10,
              color: '$secondary',
            }}
          />
        </tag.button>
      </Flex>
    </Focusable>
  )
})
