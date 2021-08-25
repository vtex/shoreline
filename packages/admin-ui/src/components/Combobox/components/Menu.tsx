import type { ElementType, ReactElement, ReactNode } from 'react'
import React, { forwardRef, Fragment } from 'react'
import type { StyleObject } from '@vtex/onda-core'

import type { PolymorphicProps } from '../types'
import { useStateContext } from '../context'
import { useElementProps } from '../hooks/useElementProps'
import { Label } from '../../Label'

export interface MenuOwnProps {
  csx?: StyleObject
  css?: any
  emptyView?: ReactNode
  children?: (item: any, index: number, highlighted: boolean) => ReactNode
}

export type MenuProps<E extends ElementType> = PolymorphicProps<E, MenuOwnProps>

const defaultElement = 'ul'

export const Menu: <E extends ElementType = typeof defaultElement>(
  props: MenuProps<E>
) => ReactElement | null = forwardRef(
  <E extends ElementType = typeof defaultElement>(
    {
      as = defaultElement as any,
      children,
      emptyView = null,
      ...restProps
    }: MenuProps<E>,
    ref: typeof restProps.ref
  ) => {
    const As: any = as

    const {
      combobox: { getMenuProps, isOpen, highlightedIndex },
      collection: { value, label },
    } = useStateContext()

    const elementProps = useElementProps(As, restProps)

    const menuProps = getMenuProps()
    const empty = value.length === 0

    return (
      <Label>
        {isOpen && label}
        <As ref={ref} {...menuProps} {...elementProps}>
          {isOpen
            ? empty
              ? emptyView
              : value.map((item, index) => {
                  const highlighted = highlightedIndex === index

                  return (
                    <Fragment key={index}>
                      {children?.(item, index, highlighted)}
                    </Fragment>
                  )
                })
            : null}
        </As>
      </Label>
    )
  }
)
