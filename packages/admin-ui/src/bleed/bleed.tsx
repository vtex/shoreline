import React from 'react'
import { createComponent, useElement, tag } from '@vtex/admin-ui-react'
import { withUnit, negative } from '@vtex/admin-ui-core'
import type { HSpaceTokens, VSpaceTokens, CSSUnit } from '@vtex/admin-ui-core'

export const Bleed = createComponent<'div', BleedProps>((props) => {
  const {
    top = 0,
    left = 0,
    bottom = 0,
    right = 0,
    unit = 'rem',
    children,
    ...htmlProps
  } = props

  return useElement('div', {
    ...htmlProps,
    children: (
      <tag.div
        csx={{
          position: 'relative',
        }}
      >
        {children}
      </tag.div>
    ),
    baseStyle: {
      marginTop: negative(withUnit(top, unit)),
      marginLeft: negative(withUnit(left, unit)),
      marginBottom: negative(withUnit(bottom, unit)),
      marginRight: negative(withUnit(right, unit)),
    },
  })
})

export interface BleedProps {
  /**
   * Top bleed
   * @default 0
   */
  top?: VSpaceTokens | number
  /**
   * Bottom bleed
   * @default 0
   */
  bottom?: VSpaceTokens | number
  /**
   * Left bleed
   * @default 0
   */
  left?: HSpaceTokens | number
  /**
   * Right bleed
   * @default 0
   */
  right?: HSpaceTokens | number
  /**
   * Unit used in case of a number value
   * @default 'rem'
   */
  unit?: CSSUnit
}
