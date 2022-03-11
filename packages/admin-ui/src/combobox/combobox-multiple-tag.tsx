import React, { forwardRef } from 'react'
import { IconX } from '@vtex/phosphor-icons'
import { Focusable } from 'ariakit/focusable'
import { tag, useSystem } from '@vtex/admin-ui-react'
import type { CompositeItemProps } from 'ariakit/composite'
import { CompositeItem } from 'ariakit/composite'

import { Paragraph } from '../components/Paragraph'
import { Flex } from '../components/Flex'

import * as style from './combobox.style'

interface ComboboxMultipleTagProps extends CompositeItemProps {
  value: string
  onDismiss: () => void
}

export const ComboboxMultipleTag = forwardRef<
  HTMLButtonElement,
  ComboboxMultipleTagProps
>((props, ref) => {
  const { value, onDismiss, ...htmlProps } = props
  const { cn } = useSystem()

  return (
    <CompositeItem ref={ref} {...htmlProps}>
      {(compositeProps) => (
        <Focusable className={cn(style.fieldTag)} {...compositeProps}>
          <Flex justify="space-between" align="center">
            <Paragraph>{value}</Paragraph>
            <tag.button
              tabIndex={-1}
              onClick={onDismiss}
              csx={{
                padding: 0,
                marginLeft: '$m',
                bg: 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <IconX
                size="small"
                csx={{
                  color: '$secondary',
                }}
              />
            </tag.button>
          </Flex>
        </Focusable>
      )}
    </CompositeItem>
  )
})
