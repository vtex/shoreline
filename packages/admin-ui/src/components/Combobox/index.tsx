import type { ReactNode } from 'react'
import React from 'react'

import type { ComboboxState } from './hooks/useComboboxState'
import { VisuallyHidden } from '../VisuallyHidden'
import { Input } from './components/Input'
import { Menu } from './components/Menu'
import { Option } from './components/Option'
import { StateContext } from './context'

interface ComboboxProps<T> {
  state: ComboboxState<T>
  label: string
  children?: ReactNode
}

export function _Combobox<T>(props: ComboboxProps<T>) {
  const { state, label, children } = props
  const labelProps = state.combobox.getLabelProps()

  return (
    <StateContext.Provider value={state}>
      <VisuallyHidden>
        <label {...labelProps}>{label}</label>
      </VisuallyHidden>
      {children}
    </StateContext.Provider>
  )
}

export { unstableUseComboboxState } from './hooks/useComboboxState'

export const unstableCombobox = Object.assign(_Combobox, {
  Input,
  Menu,
  Option,
})
