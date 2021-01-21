/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ElementType } from 'react'
import * as CSS from 'csstype'
import { omit, pick, ResponsiveValue } from '@vtex/admin-core'

import { Box, BoxProps } from '../Box'

/**
 * Grid default element
 */
const defaultElement = 'div'

export function GridItem<E extends ElementType = typeof defaultElement>(
  props: GridItemProps<E>
) {
  const gridItemProps = useGridItem(props)

  return <Box {...gridItemProps} />
}

export function useGridItem(props: GridItemProps) {
  const propertyMap = {
    area: 'gridArea',
  }

  const { styles, ...boxProps } = props

  const cssProps = Object.keys(propertyMap)
  const cssPropsStyle = renameKeys(propertyMap, {
    ...pick(boxProps, cssProps),
  })

  return {
    styles: { ...cssPropsStyle, ...styles },
    ...omit(boxProps, cssProps),
  }
}

function renameKeys(keysMap: { [x: string]: any }, obj: { [x: string]: any }) {
  return Object.keys(obj).reduce(
    (acc, key) => ({
      ...acc,
      ...{ [keysMap[key] || key]: obj[key] },
    }),
    {}
  )
}

export interface GridItemOwnProps {
  /** Shorthand for CSS gridArea property */
  area?: ResponsiveValue<CSS.Property.GridArea>
}

export type GridItemProps<
  E extends ElementType = ElementType
> = GridItemOwnProps & BoxProps<E>
