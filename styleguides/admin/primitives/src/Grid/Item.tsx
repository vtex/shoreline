import React, { ElementType } from 'react'
import * as CSS from 'csstype'
import { omit, pick, ResponsiveValue } from '@vtex/admin-core'

import { Primitive, PrimitiveProps } from '../Primitive'
import { renameKeys } from '../util'

/**
 * Grid default element
 */
const defaultElement = 'div'

export function GridItem<E extends ElementType = typeof defaultElement>(
  props: GridItemProps<E>
) {
  const gridItemProps = useGridItem(props)

  return <Primitive {...gridItemProps} />
}

export function useGridItem(props: GridItemProps) {
  const propertyMap = {
    area: 'gridArea',
  }

  const { csx, ...PrimitiveProps } = props

  const cssProps = Object.keys(propertyMap)
  const cssPropsStyle = renameKeys(propertyMap, {
    ...pick(PrimitiveProps, cssProps),
  })

  return {
    csx: { ...cssPropsStyle, ...csx },
    ...omit(PrimitiveProps, cssProps),
  }
}

export interface GridItemOwnProps {
  /** Shorthand for CSS gridArea property */
  area?: ResponsiveValue<CSS.Property.GridArea>
}

export type GridItemProps<
  E extends ElementType = ElementType
> = GridItemOwnProps & PrimitiveProps<E>
