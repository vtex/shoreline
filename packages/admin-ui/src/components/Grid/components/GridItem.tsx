import type { ComponentPropsWithRef } from 'react'
import type * as CSS from 'csstype'
import type { ResponsiveValue } from '@vtex/admin-ui-core'
import { pick, renameKeys } from '@vtex/admin-ui-util'
import { jsx } from '@vtex/admin-ui-react'

const propertyMap = {
  area: 'gridArea',
}

export const GridItem = jsx.div(
  {},
  {
    options: ['area'],
    useOptions(options: GridItemOptions, props) {
      const { csx, ...htmlProps } = props

      const cssProps = Object.keys(propertyMap)
      const cssPropsStyle = renameKeys(propertyMap, {
        ...pick(options, cssProps),
      })

      return {
        csx: { ...cssPropsStyle, ...csx },
        ...htmlProps,
      }
    },
  }
)

export interface GridItemOptions {
  /** Shorthand for CSS gridArea property */
  area?: ResponsiveValue<CSS.Property.GridArea>
}

export type GridItemProps = ComponentPropsWithRef<typeof GridItem>
