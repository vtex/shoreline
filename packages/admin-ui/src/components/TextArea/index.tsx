import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import { jsx } from '@vtex/admin-ui-react'

import { FloatingLabel, FieldDetails, FieldContainer } from '../Field'
import type { SystemComponentProps } from '../../types'

const Reference = jsx('textarea')({
  // ...focusVisible(),
  fontFamily: 'sans',
  paddingTop: 24,
  height: 100,
  resize: 'none',
  fontSettings: 'regular',
  width: 'full',
  borderStyle: 'solid',
  borderWidth: 1,
  paddingLeft: 3,
  paddingRight: 4,
  borderRadius: 'default',
  marginY: 1,
  fontSize: 1,
  color: 'base',
  outline: 0,
  transition: 'snap',
  variants: {
    tone: {
      neutral: {
        bg: 'field.neutral',
        color: 'field.neutral',
        borderColor: 'field.neutral',
        ':not(:focus):hover': {
          borderColor: 'field.neutralHover',
        },
        ':focus': {
          borderColor: 'field.neutralFocus',
          boxShadow: 'ring.neutral',
        },
        ':disabled': {
          bg: 'field.neutralDisabled',
          color: 'field.neutralDisabled',
          borderColor: 'field.neutralDisabled',
        },
      },
      critical: {
        bg: 'field.critical',
        color: 'field.critical',
        borderColor: 'field.critical',
        ':not(:focus):hover': {
          borderColor: 'field.criticalHover',
        },
        ':focus': {
          borderColor: 'field.criticalFocus',
          boxShadow: 'ring.critical',
        },
        ':disabled': {
          bg: 'field.criticalDisabled',
          color: 'field.criticalDisabled',
          borderColor: 'field.criticalDisabled',
        },
      },
    },
  },
})

Reference.defaultProps = {
  tone: 'neutral',
}

export const TextArea = forwardRef(function Textarea(
  props: TextAreaProps,
  ref: Ref<HTMLTextAreaElement>
) {
  const {
    id,
    label,
    csx,
    helperText,
    charLimit,
    value = '',
    tone = 'neutral',
    onChange,
    criticalText,
    ...textareaProps
  } = props

  const message = tone === 'critical' ? criticalText : helperText

  return (
    <FieldContainer
      csx={{
        width: 'full',
      }}
    >
      <Reference
        tone={tone}
        csx={csx}
        id={id}
        ref={ref}
        placeholder=" "
        maxLength={charLimit}
        value={value}
        onChange={onChange}
        {...textareaProps}
      />
      <FloatingLabel htmlFor={id}>{label}</FloatingLabel>
      {(message || !!charLimit) && (
        <FieldDetails
          value={value}
          message={message}
          charLimit={charLimit}
          tone={tone}
        />
      )}
    </FieldContainer>
  )
})

export type TextAreaOwnProps = Omit<
  React.ComponentPropsWithoutRef<'textarea'>,
  'value' | 'onChange' | 'maxLength' | 'onClear'
>

export interface TextAreaProps extends SystemComponentProps<TextAreaOwnProps> {
  /** TextArea label */
  label: string
  /** Unique id of the component */
  id: string
  /** TextArea helper text */
  helperText?: string
  /** TextArea char limit */
  charLimit?: number
  /** onChange TextArea value event */
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
  /** TextArea value */
  value: string | number
  /** TextArea tone of voice
   * @default neutral
   */
  tone?: 'neutral' | 'critical'
  /**
   * TextArea critical message
   */
  criticalText?: string
}
