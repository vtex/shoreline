import type { KeyboardEventHandler, ReactNode } from 'react'
import React from 'react'
import { IconX } from '@vtex/phosphor-icons'
import { Focusable } from 'ariakit/focusable'
import { tag } from '@vtex/admin-ui-react'
import { CompositeItem } from 'ariakit/composite'

import { messages } from './combobox.i18n'
import { useMessageFormatter } from '../i18n'
import { Paragraph } from '../components/Paragraph'
import { Flex } from '../components/Flex'
import * as style from './combobox.style'

export function ComboboxMultipleTag(props: ComboboxMultipleTagProps) {
  const { value, onDismiss, ...htmlProps } = props
  const formatMessage = useMessageFormatter(messages.tag)

  return (
    <CompositeItem {...htmlProps}>
      {(compositeProps) => (
        <tag.div as={Focusable} csx={style.fieldTag} {...compositeProps}>
          <Flex justify="space-between" align="center">
            <Paragraph>{value}</Paragraph>
            <tag.button
              tabIndex={-1}
              onClick={onDismiss}
              csx={style.fieldTagDismiss}
              aria-label={formatMessage('removeLabel')}
            >
              <IconX size="small" />
            </tag.button>
          </Flex>
        </tag.div>
      )}
    </CompositeItem>
  )
}

interface ComboboxMultipleTagProps {
  value: ReactNode
  onDismiss: () => void
  onKeyDown: KeyboardEventHandler<HTMLButtonElement>
}
