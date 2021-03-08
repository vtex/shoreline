/* eslint-disable @typescript-eslint/no-explicit-any */
import { ElementType, ReactElement } from 'react'
import * as CSS from 'csstype'
import { createComponent, omit, pick, ResponsiveValue } from '@vtex/admin-core'

import { Primitive, PrimitiveProps } from '../Primitive'
import { renameKeys } from '../util'

/**
 * Grid default element
 */
const defaultElement = 'div'

export const GridItem: <E extends ElementType = typeof defaultElement>(
  props: GridItemProps<E>
) => ReactElement | null = createComponent(Primitive, useGridItem)

export function useGridItem(props: GridItemProps) {
  const propertyMap = {
    area: 'gridArea',
  }

  const { csx, ...boxProps } = props

  const cssProps = Object.keys(propertyMap)
  const cssPropsStyle = renameKeys(propertyMap, {
    ...pick(boxProps, cssProps),
  })

  return {
    csx: { ...cssPropsStyle, ...csx },
    ...omit(boxProps, cssProps),
  }
}

export interface GridItemOwnProps {
  /** Shorthand for CSS gridArea property */
  area?: ResponsiveValue<CSS.Property.GridArea>
}

export type GridItemProps<
  E extends ElementType = ElementType
> = GridItemOwnProps & PrimitiveProps<E>
