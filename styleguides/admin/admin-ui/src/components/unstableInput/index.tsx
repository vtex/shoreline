import { forwardRef, Ref } from 'react'
import { Input as ReakitInput, InputProps as ReakitInputProps } from 'reakit'

import { useComponent } from '../../hooks/useComponent'
import { Overridable } from '../../types'
import { createElement } from '../../system'

export interface InputProps extends Omit<ReakitInputProps, 'ref'>, Overridable {
  children?: React.ReactNode | ((props: InputProps) => React.ReactNode)
}

export const unstableInput = forwardRef(function Input(
  props: InputProps,
  ref: Ref<HTMLInputElement>
) {
  const inputProps = useComponent({ props, themeKey: 'components.input' })

  return createElement({
    component: ReakitInput,
    element: 'input',
    htmlProps: inputProps,
    ref,
  })
})
