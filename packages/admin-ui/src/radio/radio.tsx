import type { ReactNode } from 'react'
import React from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'

import { RadioButton } from './radio-button'
import * as style from './radio.style'

export const Radio = createComponent<typeof RadioButton, RadioOptions>(
  (props) => {
    const { label, ...radioButtonProps } = props

    return useElement('label', {
      baseStyle: style.labelStyle,
      children: (
        <>
          <RadioButton {...radioButtonProps} />
          <span>{label}</span>
        </>
      ),
    })
  }
)

export interface RadioOptions {
  /**
   * Radio label
   */
  label: ReactNode
}

export type RadioProps = React.ComponentPropsWithoutRef<typeof Radio>
