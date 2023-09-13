import type {
  ComponentPropsWithoutRef,
  KeyboardEventHandler,
  ReactNode,
  Ref,
} from 'react'
import React from 'react'
import { IconX } from '@vtex/phosphor-icons'
import { Focusable } from 'ariakit/focusable'
import { CompositeItem } from 'ariakit/composite'

import { messages } from './messages'
import { useMessageFormatter } from '../i18n'
import { Paragraph } from '../paragraph'
import { Flex } from '../flex'
import { cx } from '@vtex/admin-ui-core'
import { fieldTagTheme, fieldTagDismissTheme } from './combobox.style'

export const ComboboxMultipleTag = (
  props: ComboboxMultipleTagProps,
  ref: Ref<HTMLDivElement>
) => {
  const { value, onDismiss, className = '', ...htmlProps } = props
  const formatMessage = useMessageFormatter(messages)

  return (
    <CompositeItem {...htmlProps}>
      {(compositeProps) => (
        <Focusable
          className={cx(fieldTagTheme, className)}
          ref={ref}
          {...compositeProps}
        >
          <Flex justify="space-between" align="center">
            <Paragraph>{value}</Paragraph>
            <button
              tabIndex={-1}
              onClick={onDismiss}
              className={fieldTagDismissTheme}
              aria-label={formatMessage('removeLabel')}
            >
              <IconX size="small" />
            </button>
          </Flex>
        </Focusable>
      )}
    </CompositeItem>
  )
}

interface ComboboxMultipleTagProps
  extends Omit<ComponentPropsWithoutRef<'button'>, 'value'> {
  value: ReactNode
  onDismiss: () => void
  onKeyDown: KeyboardEventHandler<HTMLButtonElement>
}
