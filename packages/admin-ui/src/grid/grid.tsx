import type { ComponentPropsWithRef } from 'react'
import type { ResponsiveProp } from '@vtex/admin-ui-react'
import { pick, renameKeys } from '@vtex/admin-ui-util'

import {
  createComponent,
  useElement,
  createHook,
  useBreakpoint,
  getResponsiveValue,
} from '@vtex/admin-ui-react'
import type * as CSS from 'csstype'

export const Grid = createComponent<'div', GridOptions>((props) => {
  const elementProps = useGrid(props)

  return useElement('div', elementProps)
})

export const useGrid = createHook<'div', GridOptions>((props) => {
  const {
    gap,
    rowGap,
    columnGap,
    templateAreas,
    templateRows,
    templateColumns,
    ...restProps
  } = props

  const propertyMap = {
    gap: 'gridGap',
    rowGap: 'gridRowGap',
    columnGap: 'gridColumnGap',
    templateAreas: 'gridTemplateAreas',
    templateRows: 'gridTemplateRows',
    templateColumns: 'gridTemplateColumns',
  }

  const { breakpoint } = useBreakpoint()

  const responsiveValues = {
    gap: getResponsiveValue(gap, breakpoint),
    rowGap: getResponsiveValue(rowGap, breakpoint),
    columnGap: getResponsiveValue(columnGap, breakpoint),
    templateRows: getResponsiveValue(templateRows, breakpoint),
    templateColumns: getResponsiveValue(templateColumns, breakpoint),
    templateAreas: getResponsiveValue(templateAreas, breakpoint)
      ?.map((value) => `"${value}"`)
      .join(' '),
  }

  const cssProps = Object.keys(propertyMap)
  const cssPropsStyle = renameKeys(
    propertyMap,
    pick(responsiveValues, cssProps)
  )

  return {
    baseStyle: {
      display: 'grid',
      ...cssPropsStyle,
    },
    ...restProps,
  }
})

export interface GridOptions {
  /** Shorthand for CSS gridGap property */
  gap?: ResponsiveProp<CSS.Property.GridGap>
  /** Shorthand for CSS gridRowGap property */
  rowGap?: ResponsiveProp<CSS.Property.GridRowGap>
  /** Shorthand for CSS gridColumnGap property */
  columnGap?: ResponsiveProp<CSS.Property.GridColumnGap>
  /** Shorthand for CSS gridTemplateAreas property */
  templateAreas?: ResponsiveProp<string[]>
  /** Shorthand for CSS gridTemplateRows property */
  templateRows?: ResponsiveProp<CSS.Property.GridTemplateRows>
  /** Shorthand for CSS gridTemplateColumns property */
  templateColumns?: ResponsiveProp<CSS.Property.GridTemplateColumns>
}

export type GridProps = ComponentPropsWithRef<typeof Grid>
