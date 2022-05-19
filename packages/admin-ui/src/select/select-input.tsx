import type { ReactNode } from 'react'
import React from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'
import { IconCaretDown, IconCaretUp } from '@vtex/phosphor-icons'
import type { StyleProp } from '@vtex/admin-ui-core'

import * as styles from './select.styles'
import { Stack } from '../stack'
import { Box } from '../box'

export const SelectInput = createComponent<'select', SelectInputOptions>(
  (props) => {
    const {
      error = false,
      value = '',
      children,
      placeholder = '',
      variant = 'default',
      ...restProps
    } = props

    return useElement('select', {
      ...restProps,
      value,
      baseStyle: {
        ...styles.baseline,
        ...styles.variants({ error, selected: !!value, variant }),
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

export function SelectInputContainer(props: SelectInputContainer) {
  const { children, csx } = props

  return (
    <Box csx={{ position: 'relative', width: '100%', ...csx }}>
      {children}
      <Stack space="0" csx={styles.caret}>
        <IconCaretUp width="12" height="12" />
        <IconCaretDown width="12" height="12" />
      </Stack>
    </Box>
  )
}

export interface SelectInputOptions {
  error?: boolean
  variant?: 'default' | 'inline'
}

export interface SelectInputContainer {
  children: ReactNode
  csx?: StyleProp
}
