import type { ComponentPropsWithRef } from 'react'
import type * as CSS from 'csstype'
import { pick, renameKeys } from '@vtex/admin-ui-util'
import { jsx } from '@vtex/admin-ui-react'

const propertyMap = {
  gap: 'gridGap',
  rowGap: 'gridRowGap',
  columnGap: 'gridColumnGap',
  templateAreas: 'gridTemplateAreas',
  templateRows: 'gridTemplateRows',
  templateColumns: 'gridTemplateColumns',
}

export const Grid = jsx('div')(
  {
    display: 'grid',
  },
  {
    options: [
      'gap',
      'rowGap',
      'columnGap',
      'templateAreas',
      'templateRows',
      'templateColumns',
    ],
    useOptions(options: GridOptions, props) {
      const { templateAreas, ...restOptions } = options
      const { csx, ...htmlProps } = props

      const resolvedAreas = templateAreas
        ?.map((value) => `"${value}"`)
        .join(' ')

      const cssProps = Object.keys(propertyMap)
      const cssPropsStyle = renameKeys(propertyMap, {
        templateAreas: resolvedAreas,
        ...pick(restOptions, cssProps),
      })

      return {
        csx: { ...cssPropsStyle, ...csx },
        ...htmlProps,
      }
    },
  }
)

export interface GridOptions {
  /** Shorthand for CSS gridGap property */
  gap?: CSS.Property.GridGap
  /** Shorthand for CSS gridRowGap property */
  rowGap?: CSS.Property.GridRowGap
  /** Shorthand for CSS gridColumnGap property */
  columnGap?: CSS.Property.GridColumnGap
  /** Shorthand for CSS gridTemplateAreas property */
  templateAreas?: string[]
  /** Shorthand for CSS gridTemplateRows property */
  templateRows?: CSS.Property.GridTemplateRows
  /** Shorthand for CSS gridTemplateColumns property */
  templateColumns?: CSS.Property.GridTemplateColumns
}

export type GridProps = ComponentPropsWithRef<typeof Grid>
