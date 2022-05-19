import type { ReactNode, ComponentPropsWithoutRef, Ref } from 'react'
import React, { forwardRef } from 'react'
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

import { useTextarea } from './use-text-area'

export const TextArea = forwardRef(
  (props: TextAreaProps, ref: Ref<HTMLTextAreaElement>) => {
    const {
      error,
      errorText,
      helpText,
      label,
      maxLength,
      id: defaultId,
      ...inputProps
    } = props

    const id = useId(defaultId)

    const { getTextareaProps, charCount } = useTextarea()

    return (
      <FormControl error={error}>
        {label && <FormControlLabel htmlFor={id}>{label}</FormControlLabel>}
        <TextAreaContainer error={error} disabled={inputProps.disabled}>
          <TextAreaElement
            ref={ref}
            id={id}
            maxLength={maxLength}
            {...getTextareaProps(inputProps)}
          />
        </TextAreaContainer>
        <Flex csx={{ width: '100%' }}>
          <FormControlMessage helpText={helpText} errorText={errorText} />
          <FlexSpacer />
          {maxLength && (
            <Text variant="detail" tone="secondary">
              {charCount} / {maxLength}
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
  /** Optional limit for char ammount allowed. */
  maxLength?: number
  /** Wheter there's an error. */
  error?: boolean
  /** Error message. */
  errorText?: ReactNode
  /** Help text that will be rendered bellow input. */
  helpText?: ReactNode
  /** Inputs label. */
  label?: ReactNode
}

export type TextAreaProps = TextAreaOptions &
  Omit<JSXTextAreaProps, keyof TextAreaOptions>
