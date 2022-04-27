import type { CheckboxProps as ReakitProps } from 'reakit/Checkbox'
import { Checkbox as ReakitCheckbox } from 'reakit/Checkbox'
import { createComponent, useElement } from '@vtex/admin-ui-react'

import * as style from './switch.style'
import type { CheckboxStateReturn } from '../components/Checkbox'
import { useCheckboxState } from '../components/Checkbox'
import type { ComponentPropsWithRef } from 'react'

export const Switch = createComponent<typeof ReakitCheckbox, SwitchOptions>(
  (props) => {
    const { state, ...htmlProps } = props

    return useElement(ReakitCheckbox, {
      role: 'switch',
      baseStyle: {
        ...style.track,
        ':after': style.thumb,
        '&:checked': style.checked,
      },
      ...state,
      ...htmlProps,
    })
  }
)

type State = Pick<ReakitProps, 'state' | 'setState'>

export interface SwitchOptions {
  state?: State
  label?: string
  helperText?: string
  errorText?: string
}

export type SwitchProps = ComponentPropsWithRef<typeof Switch> & SwitchOptions

export type SwitchStateReturn = CheckboxStateReturn

export { useCheckboxState as useSwitchState }
