/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import * as CSS from 'csstype'
import { omit, pick, ResponsiveValue } from '@vtex/admin-ui-system'

import { Box, BoxProps } from '../Box'

export function Grid(props: GridProps) {
  const gridProps = useGrid(props)

  return <Box {...gridProps} />
}

export function GridItem(props: GridItemProps) {
  const { styles, area, ...boxProps } = props

  return <Box styles={{ gridArea: area, ...styles }} {...boxProps} />
}

Grid.Item = GridItem

function useGrid(props: GridProps) {
  const propertyMap = {
    gap: 'gridGap',
    rowGap: 'gridRowGap',
    columnGap: 'gridColumnGap',
    templateAreas: 'gridTemplateAreas',
    templateRows: 'gridTemplateRows',
    templateColumns: 'gridTemplateColumns',
  }

  const { styles, templateAreas, ...boxProps } = props

  const resolvedAreas = templateAreas?.map((value) => `"${value}"`).join(' ')
  const cssProps = Object.keys(propertyMap)
  const cssPropsStyle = renameKeys(propertyMap, {
    templateAreas: resolvedAreas,
    ...pick(boxProps, cssProps),
  })

  function renameKeys(
    keysMap: { [x: string]: any },
    obj: { [x: string]: any }
  ) {
    return Object.keys(obj).reduce(
      (acc, key) => ({
        ...acc,
        ...{ [keysMap[key] || key]: obj[key] },
      }),
      {}
    )
  }

  return {
    styles: {
      display: 'grid',
      ...cssPropsStyle,
      ...styles,
    },
    ...omit(boxProps, cssProps),
  }
}

export interface GridProps extends BoxProps<'div'> {
  /** Shorthand for CSS gridGap property */
  gap?: ResponsiveValue<CSS.Property.GridGap>
  /** Shorthand for CSS gridRowGap property */
  rowGap?: ResponsiveValue<CSS.Property.GridRowGap>
  /** Shorthand for CSS gridColumnGap property */
  columnGap?: ResponsiveValue<CSS.Property.GridColumnGap>
  /** Shorthand for CSS gridTemplateAreas property */
  templateAreas?: string[]
  /** Shorthand for CSS gridTemplateRows property */
  templateRows?: ResponsiveValue<CSS.Property.GridTemplateRows>
  /** Shorthand for CSS gridTemplateColumns property */
  templateColumns?: ResponsiveValue<CSS.Property.GridTemplateColumns>
}

export interface GridItemProps extends BoxProps<'div'> {
  /** Shorthand for CSS gridArea property */
  area?: CSS.Property.GridArea
}
