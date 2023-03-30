import type { KeyboardEventHandler, ReactNode } from 'react'
import React from 'react'
import { IconX } from '@vtex/phosphor-icons'
import { Focusable } from 'ariakit/focusable'
import { CompositeItem } from 'ariakit/composite'

import { Box } from '../box'
import { messages } from './messages'
import { useMessageFormatter } from '../i18n'
import { Paragraph } from '../components/Paragraph'
import { Flex } from '../flex'
import * as style from './combobox.style'

export function ComboboxMultipleTag(props: ComboboxMultipleTagProps) {
  const { value, onDismiss, ...htmlProps } = props
  const formatMessage = useMessageFormatter(messages)

  return (
    <CompositeItem {...htmlProps}>
      {(compositeProps) => (
        <Box as={Focusable} csx={style.fieldTag} {...compositeProps}>
          <Flex justify="space-between" align="center">
            <Paragraph>{value}</Paragraph>
            <Box
              as="button"
              tabIndex={-1}
              onClick={onDismiss}
              csx={style.fieldTagDismiss}
              aria-label={formatMessage('removeLabel')}
            >
              <IconX size="small" />
            </Box>
          </Flex>
        </Box>
      )}
    </CompositeItem>
  )
}

interface ComboboxMultipleTagProps {
  value: ReactNode
  onDismiss: () => void
  onKeyDown: KeyboardEventHandler<HTMLButtonElement>
}
