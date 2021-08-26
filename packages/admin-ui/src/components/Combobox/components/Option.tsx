import type { ElementType, ReactElement } from 'react'
import React, { forwardRef } from 'react'
import type { StyleObject } from '@vtex/onda-core'

import type { PolymorphicProps } from '../types'
import { useStateContext } from '../context'
import { useElementProps } from '../hooks/useElementProps'

export interface OptionOwnProps {
  csx?: StyleObject
  css?: any
  item?: any
  index?: number
}

export type OptionProps<E extends ElementType> = PolymorphicProps<
  E,
  OptionOwnProps
>

const defaultElement = 'li'

export const Option: <E extends ElementType = typeof defaultElement>(
  props: OptionProps<E>
) => ReactElement | null = forwardRef(
  <E extends ElementType = typeof defaultElement>(
    { as = defaultElement as any, item, index, ...restProps }: OptionProps<E>,
    ref: typeof restProps.ref
  ) => {
    const As: any = as
    const {
      combobox: { getItemProps },
      source: { render },
    } = useStateContext()

    const elementProps = useElementProps(As, restProps)

    const liProps = getItemProps({ item, index })

    return (
      <As ref={ref} {...liProps} {...elementProps}>
        {render(item)}
      </As>
    )
  }
)
