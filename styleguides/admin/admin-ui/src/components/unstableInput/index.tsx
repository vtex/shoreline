import { SxStyleProp } from '@theme-ui/core'
import { forwardRef, Ref } from 'react'
import { Input as ReakitInput, InputProps as ReakitInputProps } from 'reakit'
import { cleanProps, createElement, useClassName } from '@vtex/admin-ui-system'

export interface InputProps extends Omit<ReakitInputProps, 'ref'> {
  styles?: SxStyleProp
  children?: React.ReactNode | ((props: InputProps) => React.ReactNode)
}

export const unstableInput = forwardRef(function Input(
  props: InputProps,
  ref: Ref<HTMLInputElement>
) {
  const inputProps = useInput(props)

  return createElement({
    component: ReakitInput,
    element: 'input',
    htmlProps: inputProps,
    ref,
  })
})

export function useInput(props: InputProps): InputProps {
  const className = useClassName({ props, themeKey: 'components.input' })
  const htmlProps = cleanProps(props)

  return { ...htmlProps, className }
}
