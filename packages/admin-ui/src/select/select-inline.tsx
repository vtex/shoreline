import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import { useId } from '@vtex/admin-ui-hooks'
import type { StyleProp } from '@vtex/admin-ui-core'

import * as styles from './select.styles'
import type { JSXSelectProps } from './select-input'
import { SelectInput, SelectContainer } from './select-input'
import { VisuallyHidden } from 'ariakit'

export const SelectInline = forwardRef(
  (props: SelectInlineProps, ref: Ref<HTMLSelectElement>) => {
    const {
      children,
      label,
      id: defaultId,
      bleedY = false,
      bleedX = false,
      csx,
      ...selectProps
    } = props

    const id = useId(defaultId)
    const variant = 'inline'

    return (
      <SelectContainer csx={csx} variant={variant}>
        <VisuallyHidden>
          <label htmlFor={id}>{label}</label>
        </VisuallyHidden>
        <SelectInput
          id={id}
          ref={ref}
          variant={variant}
          csx={styles.bleed({ bleedX, bleedY })}
          {...selectProps}
        >
          {children}
        </SelectInput>
      </SelectContainer>
    )
  }
)

export interface SelectInlineOptions {
  label: string
  csx?: StyleProp
  bleedY: boolean
  bleedX: boolean
}

export type SelectInlineProps = SelectInlineOptions &
  Omit<JSXSelectProps, keyof SelectInlineOptions>
