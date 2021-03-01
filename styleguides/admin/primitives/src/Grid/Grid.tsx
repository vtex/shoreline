/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ElementType } from 'react'
import * as CSS from 'csstype'
import { omit, pick, ResponsiveValue } from '@vtex/admin-core'

import { Primitive, PrimitiveProps } from '../Primitive'
import { GridItem } from './Item'
import { renameKeys } from '../util'

/**
 * Grid default element
 */
const defaultElement = 'div'

export function Grid<E extends ElementType = typeof defaultElement>(
  props: GridProps<E>
) {
  const gridProps = useGrid(props)

  return <Primitive {...gridProps} />
}

export function useGrid(props: GridProps) {
  const propertyMap = {
    gap: 'gridGap',
    rowGap: 'gridRowGap',
    columnGap: 'gridColumnGap',
    templateAreas: 'gridTemplateAreas',
    templateRows: 'gridTemplateRows',
    templateColumns: 'gridTemplateColumns',
  }

  const { csx, templateAreas, ...PrimitiveProps } = props

  const resolvedAreas = templateAreas?.map((value) => `"${value}"`).join(' ')
  const cssProps = Object.keys(propertyMap)
  const cssPropsStyle = renameKeys(propertyMap, {
    templateAreas: resolvedAreas,
    ...pick(PrimitiveProps, cssProps),
  })

  return {
    csx: { display: 'grid', ...cssPropsStyle, ...csx },
    ...omit(PrimitiveProps, cssProps),
  }
}

Grid.Item = GridItem

export interface GridOwnProps {
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

export type GridProps<E extends ElementType = ElementType> = GridOwnProps &
  PrimitiveProps<E>
