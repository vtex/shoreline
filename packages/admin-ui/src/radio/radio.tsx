import type { ReactNode } from 'react'
import React from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'
import { unstable_useId as useId } from 'reakit/Id'

import { Label } from '../components/Label'
import { Set } from '../components/Set'
import { Inline } from '../inline'
import { RadioButton } from './radio-button'
import * as style from './radio.style'
import { Message } from './message'

export const Radio = createComponent<typeof RadioButton, RadioOptions>(
  (props) => {
    const { label, helpText, id, ...radioButtonProps } = props

    const { id: baseId } = useId({ id })

    return useElement('div', {
      children: (
        <Inline hSpace="$m" vSpace="">
          <RadioButton {...radioButtonProps} id={baseId} />
          <Set orientation="vertical" spacing="$s">
            <Label htmlFor={baseId} csx={style.label}>
              {label}
            </Label>
            <Message helpText={helpText} />
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
  helpText?: ReactNode
}

export type RadioProps = React.ComponentPropsWithoutRef<typeof Radio>
