import type { ReactNode } from 'react'
import React from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'

import type { RadioButtonOptions } from './radio-button'
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

export interface RadioOptions extends RadioButtonOptions {
  label: ReactNode
}

export { useRadioState } from 'reakit/Radio'

export type RadioProps = React.ComponentPropsWithoutRef<typeof Radio>
