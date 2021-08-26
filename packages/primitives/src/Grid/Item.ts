/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ElementType, ReactElement } from 'react'
import type * as CSS from 'csstype'
import type { ResponsiveValue } from '@vtex/onda-core'
import { omit, pick } from '@vtex/onda-util'
import { createComponent } from '@vtex/admin-jsxs'

import type { PrimitiveProps } from '../Primitive'
import { Primitive } from '../Primitive'
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

export type GridItemProps<E extends ElementType = ElementType> =
  GridItemOwnProps & PrimitiveProps<E>
