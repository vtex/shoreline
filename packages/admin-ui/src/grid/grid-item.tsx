import type { ComponentPropsWithRef } from 'react'
import type * as CSS from 'csstype'
import { pick, renameKeys } from '@vtex/admin-ui-util'
import type { ResponsiveProp } from '@vtex/admin-ui-react'
import {
  createComponent,
  createHook,
  useElement,
  useBreakpoint,
  getResponsiveValue,
} from '@vtex/admin-ui-react'

export const GridItem = createComponent<'div', GridItemOptions>((props) => {
  const elementProps = useGridItem(props)

  return useElement('div', elementProps)
})

export const useGridItem = createHook<'div', GridItemOptions>((props) => {
  const { area, ...restProps } = props

  const propertyMap = {
    area: 'gridArea',
  }

  const { breakpoint } = useBreakpoint()

  const responsiveValues = {
    area: getResponsiveValue(area, breakpoint),
  }

  const cssProps = Object.keys(propertyMap)
  const cssPropsStyle = renameKeys(propertyMap, {
    ...pick(responsiveValues, cssProps),
  })

  return { baseStyle: cssPropsStyle, ...restProps }
})

export interface GridItemOptions {
  /** Shorthand for CSS gridArea property */
  area?: ResponsiveProp<CSS.Property.GridArea>
}

export type GridItemProps = ComponentPropsWithRef<typeof GridItem>
