import type { ComponentPropsWithoutRef, Ref } from 'react'
import React, { forwardRef } from 'react'
import { useId } from '@vtex/admin-ui-hooks'
import type { StyleProp } from '@vtex/admin-ui-core'

import { SelectInput, SelectInputContainer } from './select-input'
import { VisuallyHidden } from 'ariakit'

export const SelectInline = forwardRef(
  (props: SelectInlineProps, ref: Ref<HTMLSelectElement>) => {
    const { children, label, id: defaultId, csx, ...selectProps } = props

    const id = useId(defaultId)

    return (
      <SelectInputContainer csx={{ width: 'fit-content', ...csx }}>
        <VisuallyHidden>
          <label htmlFor={id}>{label}</label>
        </VisuallyHidden>
        <SelectInput id={id} ref={ref} variant="inline" {...selectProps}>
          {children}
        </SelectInput>
      </SelectInputContainer>
    )
  }
)

type JSXSelectProps = ComponentPropsWithoutRef<'select'>

export interface SelectInlineOptions {
  label: string
  csx?: StyleProp
}
export type SelectInlineProps = SelectInlineOptions &
  Omit<JSXSelectProps, keyof SelectInlineOptions>
