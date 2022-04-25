import { createComponent, useElement } from '@vtex/admin-ui-react'
import type {
  HSpaceTokens,
  VSpaceTokens,
  CSSPropAutocomplete,
} from '@vtex/admin-ui-core'
import type * as CSS from 'csstype'

export const Inline = createComponent<'div', InlineProps>((props) => {
  const {
    vSpace = '$s',
    hSpace = '$s',
    noWrap = false,
    align = 'start',
    ...htmlProps
  } = props

  return useElement('div', {
    ...htmlProps,
    baseStyle: {
      display: 'flex',
      flexWrap: noWrap ? 'nowrap' : 'wrap',
      alignItems: align,
      '> *': {
        marginLeft: hSpace,
        marginTop: vSpace,
      },
    },
  })
})

export interface InlineProps {
  /**
   * Vertical space
   * @default '$s'
   */
  vSpace?: CSSPropAutocomplete<VSpaceTokens>
  /**
   * Horizontal space
   * @default '$s'
   */
  hSpace?: CSSPropAutocomplete<HSpaceTokens>
  /**
   * Disable wrap
   * @default false
   */
  noWrap?: boolean
  /**
   * Items vertical alignment
   * @default 'start'
   */
  align?: CSS.Properties['alignItems']
}
