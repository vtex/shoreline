import type { CheckboxProps as ReakitProps } from 'reakit/Checkbox'
import { Checkbox as ReakitCheckbox } from 'reakit/Checkbox'
import { jsx } from '@vtex/admin-ui-react'

import * as style from './switch.style'
import type { CheckboxStateReturn } from '../components/Checkbox'
import { useCheckboxState } from '../components/Checkbox'
import type { ComponentPropsWithRef } from 'react'

export const Switch = jsx(ReakitCheckbox)(
  {
    ...style.track,
    ':after': style.thumb,
    '&:checked': style.checked,
  },
  {
    options: ['state'],
    useOptions: (options: SwitchOptions, props) => {
      const { state } = options

      return { role: 'switch', ...props, ...state }
    },
  }
)

type State = Pick<ReakitProps, 'state' | 'setState'>

export interface SwitchOptions {
  state?: State
}

export type SwitchProps = ComponentPropsWithRef<typeof Switch> & SwitchOptions

export type SwitchStateReturn = CheckboxStateReturn

export { useCheckboxState as useSwitchState }
