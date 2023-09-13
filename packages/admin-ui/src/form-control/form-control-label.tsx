import React, { forwardRef } from 'react'
import type { ComponentPropsWithoutRef, Ref } from 'react'
import { cx } from '@vtex/admin-ui-core'

import { useMessageFormatter } from '../i18n'
import { messages } from './messages'
import { labelTheme } from './form-control.style'

export const FormControlLabel = forwardRef(function FormControlLabel(
  props: LabelProps,
  ref: Ref<HTMLLabelElement>
) {
  const { className = '', children, optional = false, ...labelProps } = props

  const formatMessage = useMessageFormatter(messages)

  return (
    <label ref={ref} className={cx(labelTheme, className)} {...labelProps}>
      {children} {optional ? `(${formatMessage('optional')})` : ''}
    </label>
  )
})

export type LabelProps = ComponentPropsWithoutRef<'label'> & {
  optional?: boolean
}
