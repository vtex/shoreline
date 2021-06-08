import React, {
  ElementType,
  forwardRef,
  Fragment,
  ReactElement,
  ReactNode,
} from 'react'
import { StyleObject } from '@vtex/admin-core'

import { PolymorphicProps } from '../types'
import { useStateContext } from '../context'
import { useElementProps } from '../hooks/useElementProps'

export interface MenuOwnProps {
  csx?: StyleObject
  css?: any
  children?: (item: any, index: number, highlighted: boolean) => ReactNode
}

export type MenuProps<E extends ElementType> = PolymorphicProps<E, MenuOwnProps>

const defaultElement = 'ul'

export const Menu: <E extends ElementType = typeof defaultElement>(
  props: MenuProps<E>
) => ReactElement | null = forwardRef(
  <E extends ElementType = typeof defaultElement>(
    { as = defaultElement as any, children, ...restProps }: MenuProps<E>,
    ref: typeof restProps.ref
  ) => {
    const As: any = as

    const {
      combobox: { getMenuProps, isOpen, highlightedIndex },
      collection: { value },
    } = useStateContext()
    const elementProps = useElementProps(As, restProps)

    const menuProps = getMenuProps()

    return (
      <As ref={ref} {...menuProps} {...elementProps}>
        {isOpen &&
          value.map((item, index) => {
            const highlighted = highlightedIndex === index
            return (
              <Fragment key={index}>
                {children?.(item, index, highlighted)}
              </Fragment>
            )
          })}
      </As>
    )
  }
)
