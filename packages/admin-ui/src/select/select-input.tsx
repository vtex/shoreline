import type { ReactNode, ComponentPropsWithoutRef } from 'react'
import React from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'
import type { StyleProp } from '@vtex/admin-ui-core'

import { messages } from './select.i18n'
import * as styles from './select.styles'

import { useMessageFormatter } from '../i18n'
import { Box } from '../box'
import { SelectIcon } from './select-icon'

export const SelectInput = createComponent<'select', SelectInputOptions>(
  (props) => {
    const {
      error = false,
      value = '',
      children,
      variant = 'default',
      ...restProps
    } = props

    const formatMessage = useMessageFormatter(messages.select)

    return useElement('select', {
      ...restProps,
      value,
      baseStyle: {
        ...styles.baseline,
        ...styles.variants({ variant, error, selected: !!value }),
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

export function SelectContainer(props: SelectContainer) {
  const { children, csx, variant = 'default' } = props

  return (
    <Box csx={{ ...styles.container({ variant }), ...csx }}>
      {children}
      <Box csx={{ ...styles.caret, ...styles.caretVariants({ variant }) }}>
        <SelectIcon size={variant === 'default' ? 'regular' : 'small'} />
      </Box>
    </Box>
  )
}

export type JSXSelectProps = ComponentPropsWithoutRef<'select'>

export interface SelectInputOptions {
  error?: boolean
  variant?: 'default' | 'inline'
}

export interface SelectContainer extends Pick<SelectInputOptions, 'variant'> {
  children?: ReactNode
  csx?: StyleProp
}
