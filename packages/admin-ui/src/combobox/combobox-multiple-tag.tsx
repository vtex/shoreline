import React from 'react'
import { IconX } from '@vtex/phosphor-icons'
import { Focusable } from 'ariakit/focusable'
import { tag } from '@vtex/admin-ui-react'
import { CompositeItem } from 'ariakit/composite'

import { Paragraph } from '../components/Paragraph'
import { Flex } from '../components/Flex'

import * as style from './combobox.style'

interface ComboboxMultipleTagProps {
  value: string
  onDismiss: () => void
  onKeyDown: (e: any) => void
}

export function ComboboxMultipleTag(props: ComboboxMultipleTagProps) {
  const { value, onDismiss, ...htmlProps } = props

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
            >
              <IconX size="small" />
            </tag.button>
          </Flex>
        </tag.div>
      )}
    </CompositeItem>
  )
}
