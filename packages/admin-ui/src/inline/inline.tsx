import { createComponent, useElement } from '@vtex/admin-ui-react'
import type {
  HSpaceTokens,
  VSpaceTokens,
  CSSPropAutocomplete,
} from '@vtex/admin-ui-core'

export const Inline = createComponent<'div', InlineProps>((props) => {
  const { vSpace = '$s', hSpace = '$s', ...htmlProps } = props

  return useElement('div', {
    ...htmlProps,
    baseStyle: {
      display: 'flex',
      flexWrap: 'wrap',
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
}
