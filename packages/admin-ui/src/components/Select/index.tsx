import type { Ref } from 'react'
import React from 'react'
import { forwardRef } from '@vtex/admin-ui-util'

import { Box } from '../Box'
import type { SystemComponent } from '../../types'
import { FieldContainer, FieldDetails } from '../Field'

import { IconCaret } from '@vtex/admin-ui-icons'
import { jsx } from '@vtex/admin-ui-react'
import * as style from './Select.style'

import { Label } from '../Label'

const SelectField = jsx('select')({
  ...style.baseline,
  variants: {
    tone: {
      neutral: style.toneVariant('neutral'),
      critical: style.toneVariant('critical'),
    },
  },
})

export const Select = forwardRef(
  (props: SelectProps, ref: Ref<HTMLSelectElement>) => {
    const {
      csx,
      label,
      helperText,
      tone = 'neutral',
      criticalText,
      value,
      id,
      ...selectProps
    } = props

    const message = tone === 'critical' ? criticalText : helperText

    return (
      <FieldContainer>
        <Box csx={{ ...style.container, ...csx }}>
          <Label
            htmlFor={id}
            csx={style.label({
              active: !!value,
            })}
          >
            {label}
          </Label>
          <SelectField
            tone={tone}
            ref={ref}
            value={value}
            id={id}
            {...selectProps}
          />
          <IconCaret direction="down" size={24} csx={style.caret} />
        </Box>

        {message && <FieldDetails message={message} tone={tone} />}
      </FieldContainer>
    )
  }
)

export interface SelectProps
  extends Omit<React.ComponentPropsWithoutRef<'select'>, 'css'>,
    SystemComponent {
  /**
   * Select label
   */
  label: string
  /**
   * Select helper text
   */
  helperText?: string
  /**
   * Select's tone of voice
   * @default primary
   */
  tone?: 'neutral' | 'critical'
  /**
   * Select critical message
   */
  criticalText?: string
}
