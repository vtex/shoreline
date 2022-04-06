import type { ReactNode, Ref } from 'react'
import React, { forwardRef } from 'react'
import { jsx } from '@vtex/admin-ui-react'

import { FloatingLabel, FieldDetails, FieldContainer } from '../Field'
import type { SystemComponentProps } from '../../types'

import * as style from './TextArea.style'

const Reference = jsx('textarea')({
  ...style.baseline,
  variants: {
    tone: {
      neutral: style.toneVariant('neutral'),
      critical: style.toneVariant('critical'),
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
  helperText?: ReactNode
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
