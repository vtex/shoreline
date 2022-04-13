import type { ReactNode } from 'react'
import React from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'
import { unstable_useIdState as useId } from 'reakit/Id'

import { Label } from '../components/Label'
import { Set } from '../components/Set'
import { Inline } from '../inline'
import { RadioButton } from './radio-button'
import * as style from './radio.style'
import { Message } from './message'

export const Radio = createComponent<typeof RadioButton, RadioOptions>(
  (props) => {
    const { label, helperText, id, ...radioButtonProps } = props

    const { baseId } = useId({ baseId: id })

    return useElement('div', {
      children: (
        <Inline hSpace="$m" vSpace="">
          <RadioButton id={baseId} {...radioButtonProps} />
          <Set orientation="vertical" spacing="$s">
            <Label htmlFor={baseId} csx={style.label}>
              {label}
            </Label>
            <Message helperText={helperText} />
          </Set>
        </Inline>
      ),
    })
  }
)

export interface RadioOptions {
  /**
   * Radio label
   */
  label: ReactNode
  /**
   * Helper text
   */
  helperText?: ReactNode
}

export type RadioProps = React.ComponentPropsWithoutRef<typeof Radio>
