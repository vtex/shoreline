import React, { ElementType, forwardRef, ReactElement } from 'react'
import { StyleObject } from '@vtex/admin-core'

import { PolymorphicProps } from '../types'
import { useStateContext } from '../context'
import { useElementProps } from '../hooks/useElementProps'

export interface InputOwnProps {
  csx?: StyleObject
  css?: any
}

export type InputProps<E extends ElementType> = PolymorphicProps<
  E,
  InputOwnProps
>

const defaultElement = 'input'

export const Input: <E extends ElementType = typeof defaultElement>(
  props: InputProps<E>
) => ReactElement | null = forwardRef(
  <E extends ElementType = typeof defaultElement>(
    { as = defaultElement as any, ...restProps }: InputProps<E>,
    ref: typeof restProps.ref
  ) => {
    const As: any = as

    const {
      combobox: { getComboboxProps, getInputProps },
    } = useStateContext()
    const elementProps = useElementProps(As, restProps)

    const comboboxProps = getComboboxProps()
    const inputProps = getInputProps()

    return (
      <div {...comboboxProps}>
        <As ref={ref} {...inputProps} {...elementProps} />
      </div>
    )
  }
)
