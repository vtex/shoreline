import type { CheckboxProps as ReakitProps } from 'reakit/Checkbox'
import type { ComponentPropsWithRef } from 'react'

import type { CheckboxStateReturn } from '../components/Checkbox'
import type { SwitchButton } from './switch-button'

type State = Pick<ReakitProps, 'state' | 'setState'>

export interface SwitchOptions {
  label: string
  state?: State
  helpText?: string
  errorText?: string
  error?: boolean
}

export type SwitchProps = ComponentPropsWithRef<typeof SwitchButton> &
  SwitchOptions

export type SwitchStateReturn = CheckboxStateReturn
