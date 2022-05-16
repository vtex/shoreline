import type { ReactNode, ComponentPropsWithoutRef, Ref } from 'react'
import React, { useRef, useState, forwardRef } from 'react'
import { useId } from '@vtex/admin-ui-hooks'

import { TextAreaContainer } from './text-area-container'
import { TextAreaElement } from './text-area-element'
import { Text } from '../components/Text'

import {
  FormControl,
  FormControlLabel,
  FormControlMessage,
} from '../form-control'
import { Flex, FlexSpacer } from '..'
import { MAX_HEIGHT } from './text-area.style'

export const TextArea = forwardRef(
  (props: TextAreaProps, ref: Ref<HTMLTextAreaElement>) => {
    const {
      error,
      disabled,
      errorText,
      helpText,
      label,
      charLimit,
      id: defaultId,
      onChange,
      ...inputProps
    } = props

    const id = useId(defaultId)
    const containerRef = useRef<any>(null)

    const [charCount, setCharCount] = useState(0)
    const [lineHeight, setLineHeight] = useState<number>(0)
    const [minScrollHeight, setMinScrollHeight] = useState<number>(0)

    const getLineHeight = (elm: HTMLTextAreaElement) => {
      const savedRows = elm.rows
      const savedValue = elm.value

      elm.value = ''
      elm.rows = 1
      const base1 = elm.scrollHeight

      elm.rows = 2
      const base2 = elm.scrollHeight

      elm.rows = savedRows
      elm.value = savedValue

      const calculatedHeight = base2 - base1

      setLineHeight(calculatedHeight)

      return calculatedHeight
    }

    const getScrollHeight = (elm: HTMLTextAreaElement) => {
      const savedValue = elm.value

      elm.value = ''

      const baseScrollHeight = elm.scrollHeight

      elm.value = savedValue

      setMinScrollHeight(baseScrollHeight)

      return baseScrollHeight
    }

    const onExpandableTextareaInput = (
      e: React.FormEvent<HTMLTextAreaElement>
    ) => {
      const elm = e.target as HTMLTextAreaElement
      const baseRows = 2

      lineHeight || getLineHeight(elm)
      minScrollHeight || getScrollHeight(elm)

      elm.rows = baseRows
      const newHeight = Math.min(elm.scrollHeight, MAX_HEIGHT - lineHeight)

      const extraRows: number = Math.ceil(
        (newHeight - minScrollHeight) / lineHeight
      )

      elm.rows = baseRows + extraRows
    }

    return (
      <FormControl error={error}>
        {label && <FormControlLabel htmlFor={id}>{label}</FormControlLabel>}
        <TextAreaContainer error={error} disabled={disabled} ref={containerRef}>
          <TextAreaElement
            ref={ref}
            disabled={disabled}
            id={id}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              setCharCount(e.currentTarget.value.toString().length)
              onChange?.(e)
            }}
            onInput={onExpandableTextareaInput}
            maxLength={charLimit}
            {...inputProps}
          />
        </TextAreaContainer>
        <Flex csx={{ width: '100%' }}>
          <FormControlMessage helpText={helpText} errorText={errorText} />
          <FlexSpacer />
          {charLimit && (
            <Text variant="detail" tone="secondary">
              {charCount} / {charLimit}
            </Text>
          )}
        </Flex>
      </FormControl>
    )
  }
)

TextArea.displayName = 'TextArea'

type JSXTextAreaProps = ComponentPropsWithoutRef<'textarea'>

interface TextAreaOptions {
  charLimit?: number
  error?: boolean
  errorText?: ReactNode
  helpText?: ReactNode
  label?: ReactNode
}

export type TextAreaProps = TextAreaOptions &
  Omit<JSXTextAreaProps, keyof TextAreaOptions>
