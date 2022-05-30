import type { ComponentPropsWithoutRef } from 'react'
import React from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'

import { messages } from './select.i18n'
import * as styles from './select.styles'

import { useMessageFormatter } from '../i18n'

export const SelectInput = createComponent<'select', SelectInputOptions>(
  (props) => {
    const { error = false, value = '', children, ...restProps } = props

    const formatMessage = useMessageFormatter(messages.select)

    return useElement('select', {
      ...restProps,
      value,
      baseStyle: {
        ...styles.baseline,
        ...styles.variants({ error, selected: !!value }),
      },
      children: (
        <>
          <option value="" disabled>
            {formatMessage('placeholder')}
          </option>

          {children}
        </>
      ),
    })
  }
)

export type JSXSelectProps = ComponentPropsWithoutRef<'select'>

export interface SelectInputOptions {
  error?: boolean
}
