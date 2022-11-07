import { createComponent, useElement } from '@vtex/admin-ui-react'
import type { SpaceTokens, CSSPropAutocomplete } from '@vtex/admin-ui-core'
import type * as CSS from 'csstype'

export const Inline = createComponent<'div', InlineProps>((props) => {
  const {
    vSpace = '$space-05',
    hSpace = '$space-1',
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
        marginTop: spaceInside ? '$space-0' : vSpace,
      },
      '> *:is(:first-child)': {
        marginLeft: spaceInside ? '$space-0' : hSpace,
        marginTop: spaceInside ? '$space-0' : vSpace,
      },
    },
  })
})

Inline.displayName = 'Inline'

export interface InlineProps {
  /**
   * Vertical space
   * @default '$space-05'
   */
  vSpace?: CSSPropAutocomplete<SpaceTokens>
  /**
   * Horizontal space
   * @default '$space-1'
   */
  hSpace?: CSSPropAutocomplete<SpaceTokens>
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
