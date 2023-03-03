import React, { forwardRef } from 'react'
import type { ComponentPropsWithoutRef, Ref } from 'react'
import { cx } from '@vtex/admin-ui-core'

import { useMessageFormatter } from '../i18n'
import { messages } from './form-control.i18n'
import { labelTheme } from './form-control.css'

export const FormControlLegend = forwardRef(function FormControlLegend(
  props: FormControlLegendProps,
  ref: Ref<HTMLLegendElement>
) {
  const { className = '', children, optional = false, ...labelProps } = props

  const formatMessage = useMessageFormatter(messages.formControl)

  return (
    <legend ref={ref} className={cx(labelTheme, className)} {...labelProps}>
      {children} {optional ? `(${formatMessage('optional')})` : ''}
    </legend>
  )
})

export type FormControlLegendProps = ComponentPropsWithoutRef<'legend'> & {
  optional?: boolean
}
