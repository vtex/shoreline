import React from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'
import { negative } from '@vtex/admin-ui-core'
import type {
  HSpaceTokens,
  VSpaceTokens,
  CSSPropAutocomplete,
} from '@vtex/admin-ui-core'
import { Box } from '../box'

const defaultBleed = '0rem'

export const Bleed = createComponent<'div', BleedProps>((props) => {
  const {
    top = defaultBleed,
    left = defaultBleed,
    bottom = defaultBleed,
    right = defaultBleed,
    children,
    ...htmlProps
  } = props

  return useElement('div', {
    ...htmlProps,
    children: (
      <Box
        csx={{
          position: 'relative',
        }}
      >
        {children}
      </Box>
    ),
    baseStyle: {
      marginTop: negative(top),
      marginLeft: negative(left),
      marginBottom: negative(bottom),
      marginRight: negative(right),
    },
  })
})

export interface BleedProps {
  /**
   * Top bleed
   * @default 0
   */
  top?: CSSPropAutocomplete<VSpaceTokens>
  /**
   * Bottom bleed
   * @default 0
   */
  bottom?: CSSPropAutocomplete<VSpaceTokens>
  /**
   * Left bleed
   * @default 0
   */
  left?: CSSPropAutocomplete<HSpaceTokens>
  /**
   * Right bleed
   * @default 0
   */
  right?: CSSPropAutocomplete<HSpaceTokens>
}
