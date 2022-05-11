import React from 'react'
import type { ReactNode } from 'react'

import { useFormControlContext } from './context'
import { useMessageFormatter } from '../i18n'

import { messages } from './form-control.i18n'
import { createComponent, useElement } from '@vtex/admin-ui-react'

export const FormControlLabel = createComponent<
  'label',
  FormControlLabelOptions
>((props) => {
  const { children, ...htmlProps } = props

  const { optional } = useFormControlContext()
  const formatMessage = useMessageFormatter(messages.formControl)

  return useElement('label', {
    baseStyle: { color: '$secondary', text: '$detail' },
    children: (
      <>
        {children} {optional ? `(${formatMessage('optional')})` : ''}
      </>
    ),
    ...htmlProps,
  })
})

export interface FormControlLabelOptions {
  children: ReactNode
  as?: any
}
