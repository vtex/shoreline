import type { ComponentPropsWithRef } from 'react'
import type * as CSS from 'csstype'
import type { ResponsiveValue } from '@vtex/admin-ui-react'
import { pick, renameKeys } from '@vtex/admin-ui-util'
import { jsx } from '@vtex/admin-ui-react'

export const Flex = jsx('div')(
  {
    display: 'flex',
  },
  {
    options: [
      'align',
      'basis',
      'grow',
      'direction',
      'shrink',
      'justify',
      'wrap',
      'order',
    ],
    useOptions(options: FlexOptions, props) {
      const propertyMap = {
        basis: 'flexBasis',
        direction: 'flexDirection',
        wrap: 'flexWrap',
        align: 'alignItems',
        justify: 'justifyContent',
        grow: 'flexGrow',
        shrink: 'flexShrink',
        order: 'order',
      }

      const { csx, ...htmlProps } = props
      const cssProps = Object.keys(propertyMap)
      const cssPropsStyle = renameKeys(propertyMap, pick(options, cssProps))

      return {
        ...htmlProps,
        csx: { ...cssPropsStyle, ...csx },
      }
    },
  }
)

export interface FlexOptions {
  /** Shorthand for CSS alignItems property */
  align?: ResponsiveValue<CSS.Property.AlignContent>
  /** Shorthand for CSS flexBasis property */
  basis?: ResponsiveValue<CSS.Property.FlexBasis>
  /** Shorthand for CSS flexDirection property */
  direction?: ResponsiveValue<CSS.Property.FlexDirection>
  /** Shorthand for CSS flexGrow property */
  grow?: ResponsiveValue<CSS.Property.FlexGrow>
  /** Shorthand for CSS flexShrink property */
  shrink?: ResponsiveValue<CSS.Property.FlexShrink>
  /** Shorthand for CSS justifyContent property */
  justify?: ResponsiveValue<CSS.Property.JustifyContent>
  /** Shorthand for CSS flexWrap property */
  wrap?: ResponsiveValue<CSS.Property.FlexWrap>
  /** Shorthand for CSS order property */
  order?: ResponsiveValue<CSS.Property.Order>
}

export type FlexProps = ComponentPropsWithRef<typeof Flex>
