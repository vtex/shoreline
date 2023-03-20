import type { ReactNode, Ref } from 'react'
import React, { forwardRef } from 'react'
import { useFieldFocus, useId, useForkRef } from '@vtex/admin-ui-hooks'

import { TextAreaContainer } from './text-area-container'
import type { TextAreaElementProps } from './text-area-element'
import { TextAreaElement } from './text-area-element'
import { Text } from '../components/Text'
import {
  FormControl,
  FormControlLabel,
  FormControlMessage,
} from '../form-control'
import { Flex, FlexSpacer } from '../flex'

import { useTextarea } from './use-text-area'
import { csx } from '@vtex/admin-ui-core'

export const TextArea = forwardRef(function TextArea(
  props: TextAreaProps,
  ref: Ref<HTMLTextAreaElement>
) {
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
  const [focusRef, ensureFocus] = useFieldFocus<HTMLTextAreaElement>()

  const { getTextareaProps, charCount } = useTextarea()

  return (
    <FormControl>
      {label && <FormControlLabel htmlFor={id}>{label}</FormControlLabel>}
      <TextAreaContainer
        onClick={ensureFocus}
        error={error}
        disabled={inputProps.disabled}
      >
        <TextAreaElement
          ref={useForkRef(focusRef, ref)}
          id={id}
          maxLength={maxLength}
          {...getTextareaProps(inputProps)}
        />
      </TextAreaContainer>
      <Flex className={csx({ width: '100%' })}>
        <FormControlMessage
          error={error}
          helpText={helpText}
          errorText={errorText}
        />
        <FlexSpacer />
        {maxLength && (
          <Text variant="detail" tone="secondary">
            {charCount} / {maxLength}
          </Text>
        )}
      </Flex>
    </FormControl>
  )
})

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
  Omit<TextAreaElementProps, keyof TextAreaOptions>
