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
    spaceInside = false,
    ...htmlProps
  } = props

  return useElement('div', {
    ...htmlProps,
    baseStyle: {
      display: 'flex',
      flexWrap: noWrap ? 'nowrap' : 'wrap',
      alignItems: align,
      '> *:not(:first-child)': {
        marginLeft: hSpace,
        marginTop: spaceInside ? 0 : vSpace,
      },
      '> *:is(:first-child)': {
        marginLeft: spaceInside ? 0 : hSpace,
        marginTop: spaceInside ? 0 : vSpace,
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
  /**
   * Don't space the container
   * @default false
   */
  spaceInside?: boolean
}
