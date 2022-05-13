import type { ReactNode, ComponentPropsWithoutRef, Ref } from 'react'
import React, { useState, forwardRef } from 'react'
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

    const [charCount, setCharCount] = useState(0)

    return (
      <FormControl error={error}>
        {label && <FormControlLabel htmlFor={id}>{label}</FormControlLabel>}
        <TextAreaContainer error={error} disabled={disabled}>
          <TextAreaElement
            ref={ref}
            disabled={disabled}
            id={id}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              setCharCount(e.currentTarget.value.toString().length)
              onChange?.(e)
            }}
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
