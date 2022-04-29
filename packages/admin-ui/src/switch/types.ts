import type { CheckboxProps as ReakitProps } from 'reakit/Checkbox'
import type { ComponentPropsWithRef, ReactNode } from 'react'

import type { CheckboxStateReturn } from '../components/Checkbox'
import type { SwitchButton } from './switch-button'

export type SwitchState = Pick<ReakitProps, 'state' | 'setState'>

export interface SwitchOptions {
  label: ReactNode
  state?: SwitchState
  helpText?: ReactNode
  errorText?: ReactNode
  error?: boolean
}

export type SwitchProps = ComponentPropsWithRef<typeof SwitchButton> &
  SwitchOptions

export type SwitchStateReturn = CheckboxStateReturn
