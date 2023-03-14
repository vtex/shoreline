import { csx, cx } from '@vtex/admin-ui-core'
import type { ComponentPropsWithoutRef, Ref } from 'react'
import React, { forwardRef } from 'react'

const labelTheme = csx({ text: '$body' })

/**
 * Form label component.
 * It renders a label jsx element by default
 * @example
 * <Label>label</Label>
 */
export const Label = forwardRef(
  (props: LabelProps, ref: Ref<HTMLLabelElement>) => {
    const { className = '', ...htmlProps } = props

    return (
      <label ref={ref} className={cx(labelTheme, className)} {...htmlProps} />
    )
  }
)

export type LabelProps = ComponentPropsWithoutRef<'label'>
