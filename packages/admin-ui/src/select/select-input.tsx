import React from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'
import * as styles from './select.styles'

export const SelectInput = createComponent<'select', SelectInputOptions>(
  (props) => {
    const {
      error = false,
      value = '',
      children,
      placeholder = '',
      ...restProps
    } = props

    return useElement('select', {
      ...restProps,
      value,
      baseStyle: {
        ...styles.baseline,
        ...styles.variants({ error, selected: !!value }),
      },
      children: (
        <>
          {placeholder ? (
            <option value="" disabled>
              {placeholder}
            </option>
          ) : null}
          {children}
        </>
      ),
    })
  }
)

export interface SelectInputOptions {
  error?: boolean
}
