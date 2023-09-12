import type { SpaceTokens, CSSPropAutocomplete } from '@vtex/admin-ui-core'
import type * as CSS from 'csstype'
import { inlineStyle, inlineTheme } from './inline.style'
import type { ComponentPropsWithoutRef, Ref } from 'react'
import React, { forwardRef } from 'react'
import { cx } from '@vtex/admin-ui-core'

export const Inline = forwardRef(
  (props: InlineProps, ref: Ref<HTMLDivElement>) => {
    const {
      vSpace = '$space-05',
      hSpace = '$space-1',
      noWrap = false,
      align = 'start',
      spaceInside = false,
      className = '',
      ...htmlProps
    } = props

    const responsiveCssProps = inlineStyle({ vSpace, hSpace, align })

    return (
      <div
        style={responsiveCssProps}
        className={cx(inlineTheme, className)}
        data-wrap={!noWrap}
        data-space-inside={spaceInside}
        ref={ref}
        {...htmlProps}
      />
    )
  }
)

Inline.displayName = 'Inline'

export interface InlineProps extends ComponentPropsWithoutRef<'div'> {
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
